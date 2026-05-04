// Note: this module is consumed by `tsx scripts/translation-*.ts` runners,
// which evaluate the `server-only` guard at import time and crash. We
// therefore instantiate a dedicated service-role Supabase client here rather
// than reuse `@/lib/supabase/client` (which is correctly server-only-guarded
// for the Next.js bundle path). Both clients use the same env vars and the
// same service-role key — the security invariant ("no anon key in client
// code") is preserved.
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type {
  TranslationRow,
  NewTranslationRow,
  Locale,
  Status,
  TranslationNotes,
} from './types'

/**
 * Supabase wrapper for the website translation pipeline tables. These live in
 * `public` with a `website_` prefix to avoid colliding with the pre-existing
 * `public.translations` system used by lengolf-forms / lengolf-booking-new
 * for staff back-office i18n. (A dedicated schema would have been cleaner,
 * but PostgREST's exposed-schemas list isn't reachable via service_role SQL,
 * and the `public` placement still gives full RLS + grant isolation.)
 *
 * Both tables are service_role-only: REVOKEd from anon/authenticated, RLS
 * enabled, no policies. The only legitimate writer is this module via the
 * service-role client below.
 *
 * Tables aren't in the auto-generated `types/supabase.ts`; we strip typing at
 * the boundary and rely on each helper's typed return value.
 */

const TABLE = 'website_translations'
const GLOSSARY_TABLE = 'website_glossary_candidates'

type RawClient = {
  from(table: string): any
}

let clientInstance: RawClient | null = null

function db(): RawClient {
  if (clientInstance) return clientInstance
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local',
    )
  }
  clientInstance = createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  }) as unknown as RawClient
  return clientInstance
}

export async function listPending(
  locale: Locale,
  limit = 50,
): Promise<TranslationRow[]> {
  const { data, error } = await db()
    .from(TABLE)
    .select('*')
    .eq('locale', locale)
    .in('status', ['pending', 'flagged'])
    .order('created_at', { ascending: true })
    .limit(limit)

  if (error) {
    throw new Error(`listPending(${locale}) failed: ${error.message}`)
  }
  return (data ?? []) as TranslationRow[]
}

export async function listReady(locale: Locale): Promise<TranslationRow[]> {
  const { data, error } = await db()
    .from(TABLE)
    .select('*')
    .eq('locale', locale)
    .eq('status', 'ready')
    .order('source_key', { ascending: true })

  if (error) {
    throw new Error(`listReady(${locale}) failed: ${error.message}`)
  }
  return (data ?? []) as TranslationRow[]
}

export async function listFlagged(locale: Locale): Promise<TranslationRow[]> {
  const { data, error } = await db()
    .from(TABLE)
    .select('*')
    .eq('locale', locale)
    .eq('status', 'flagged')
    .order('source_key', { ascending: true })

  if (error) {
    throw new Error(`listFlagged(${locale}) failed: ${error.message}`)
  }
  return (data ?? []) as TranslationRow[]
}

/**
 * Insert pending rows. Idempotent — relies on the UNIQUE constraint on
 * (source_type, source_key, locale, field). Existing rows are silently skipped
 * via `onConflict: 'source_type,source_key,locale,field'` + `ignoreDuplicates`.
 */
export async function upsertPending(
  rows: NewTranslationRow[],
): Promise<{ inserted: number }> {
  if (rows.length === 0) return { inserted: 0 }

  // Chunk inserts to avoid PostgREST payload limits.
  const CHUNK = 500
  let inserted = 0

  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK).map((r) => ({
      ...r,
      status: 'pending' as const,
      notes: {},
      cost_usd: 0,
    }))

    const { error, count } = await db()
      .from(TABLE)
      .upsert(chunk, {
        onConflict: 'source_type,source_key,locale,field',
        ignoreDuplicates: true,
        count: 'exact',
      })

    if (error) {
      throw new Error(
        `upsertPending: chunk ${i / CHUNK} of ${Math.ceil(rows.length / CHUNK)} failed: ${error.message}`,
      )
    }
    inserted += count ?? 0
  }

  return { inserted }
}

export async function setStatus(
  id: string,
  status: Status,
  patch: Partial<{
    translation: string | null
    notes: TranslationNotes
    cost_usd: number
  }> = {},
): Promise<void> {
  const update: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  }
  if (patch.translation !== undefined) update.translation = patch.translation
  if (patch.notes !== undefined) update.notes = patch.notes
  if (patch.cost_usd !== undefined) update.cost_usd = patch.cost_usd

  const { error } = await db().from(TABLE).update(update).eq('id', id)
  if (error) {
    throw new Error(`setStatus(${id}, ${status}) failed: ${error.message}`)
  }
}

/**
 * Atomically merge new notes into existing notes. Reads-modifies-writes —
 * only safe because the runner is single-process. If you ever parallelize the
 * runner, replace with an RPC that does jsonb merge server-side.
 */
export async function mergeNotes(
  id: string,
  patch: TranslationNotes,
  status?: Status,
  cost?: number,
): Promise<void> {
  const { data, error: readErr } = await db()
    .from(TABLE)
    .select('notes, cost_usd')
    .eq('id', id)
    .single()

  if (readErr) {
    throw new Error(`mergeNotes(${id}) read failed: ${readErr.message}`)
  }

  const merged: TranslationNotes = { ...(data?.notes ?? {}), ...patch }
  const update: Record<string, unknown> = {
    notes: merged,
    updated_at: new Date().toISOString(),
  }
  if (status) update.status = status
  if (cost !== undefined) update.cost_usd = (data?.cost_usd ?? 0) + cost

  const { error: writeErr } = await db().from(TABLE).update(update).eq('id', id)
  if (writeErr) {
    throw new Error(`mergeNotes(${id}) write failed: ${writeErr.message}`)
  }
}

export async function totalCost(locale?: Locale): Promise<number> {
  let q = db().from(TABLE).select('cost_usd')
  if (locale) q = q.eq('locale', locale)
  const { data, error } = await q
  if (error) throw new Error(`totalCost failed: ${error.message}`)
  return (data ?? []).reduce(
    (sum: number, row: { cost_usd: number | null }) => sum + (row.cost_usd ?? 0),
    0,
  )
}

export async function countByStatus(): Promise<
  Record<Locale, Record<Status, number>>
> {
  const { data, error } = await db().from(TABLE).select('locale, status')
  if (error) throw new Error(`countByStatus failed: ${error.message}`)

  const counts: Record<string, Record<string, number>> = {}
  for (const row of (data ?? []) as { locale: Locale; status: Status }[]) {
    counts[row.locale] ??= {}
    counts[row.locale][row.status] = (counts[row.locale][row.status] ?? 0) + 1
  }
  return counts as Record<Locale, Record<Status, number>>
}

/**
 * Insert a glossary candidate row. Used when the translator (or a reviewer)
 * encounters a brand/domain term that isn't in the glossary yet. Idempotent
 * via UNIQUE (locale, source_term).
 */
export async function recordGlossaryCandidate(
  locale: Locale,
  source_term: string,
  proposed: string,
  context?: string,
): Promise<void> {
  const { error } = await db()
    .from(GLOSSARY_TABLE)
    .upsert(
      [
        {
          locale,
          source_term,
          proposed,
          context,
          status: 'pending',
        },
      ],
      { onConflict: 'locale,source_term', ignoreDuplicates: true },
    )

  if (error) {
    // Don't fail the run on glossary tracking errors — log and continue.
    console.warn(
      `recordGlossaryCandidate(${locale}, "${source_term}") failed: ${error.message}`,
    )
  }
}
