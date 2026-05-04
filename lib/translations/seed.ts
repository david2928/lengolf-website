// (No `import 'server-only'` — see lib/translations/db.ts for context.)
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { Locale, NewTranslationRow } from './types'
import { ALL_TARGET_LOCALES } from './types'
import { upsertPending } from './db'

/**
 * Net-new key enumeration: read messages/en.json + messages/<locale>.json,
 * flatten both, and emit pending rows for keys that exist in EN but NOT in
 * the target locale.
 *
 * "Net-new only" semantics:
 *   - We never re-translate keys that already exist in messages/<locale>.json
 *     even if their EN value changed. (If you want to refresh a stale TH key,
 *     delete it from th.json and re-seed.)
 *   - Keys present in target but NOT in EN are orphans (probably stale from
 *     prior auto-translation passes); we log them but don't delete.
 *   - Arrays of strings (e.g. `Lessons.coaches.boss.expertise`) are flattened
 *     to one row per element using `.0`, `.1`, etc. as the suffix.
 */

type LeafValue = string

interface FlattenedCatalog {
  // Map from dot-notation key → string leaf value.
  // Array elements use ".N" indexing: 'Lessons.coaches.boss.expertise.0'.
  leaves: Map<string, LeafValue>
  // Keys that are arrays — recorded so the publish step can re-assemble them.
  arrayKeys: Set<string>
  // Skipped (numbers/booleans/null) — logged for visibility.
  skipped: string[]
}

export function flattenCatalog(obj: unknown, prefix = ''): FlattenedCatalog {
  const leaves = new Map<string, LeafValue>()
  const arrayKeys = new Set<string>()
  const skipped: string[] = []

  function walk(v: unknown, p: string): void {
    if (typeof v === 'string') {
      leaves.set(p, v)
      return
    }
    if (Array.isArray(v)) {
      arrayKeys.add(p)
      for (let i = 0; i < v.length; i++) {
        walk(v[i], `${p}.${i}`)
      }
      return
    }
    if (v !== null && typeof v === 'object') {
      for (const k of Object.keys(v as Record<string, unknown>)) {
        walk((v as Record<string, unknown>)[k], p ? `${p}.${k}` : k)
      }
      return
    }
    // numbers, booleans, null
    skipped.push(p)
  }

  walk(obj, prefix)
  return { leaves, arrayKeys, skipped }
}

async function readCatalog(locale: 'en' | Locale): Promise<unknown> {
  const file = path.resolve(process.cwd(), 'messages', `${locale}.json`)
  const raw = await fs.readFile(file, 'utf8')
  return JSON.parse(raw) as unknown
}

interface LocaleSeedReport {
  locale: Locale
  netNewCount: number
  upsertedCount: number
  orphanCount: number
  orphanKeys: string[]
  skippedSourceKeys: string[]
}

async function enumerateNetNew(locale: Locale): Promise<{
  rows: NewTranslationRow[]
  report: Omit<LocaleSeedReport, 'upsertedCount'>
}> {
  const enRaw = await readCatalog('en')
  const targetRaw = await readCatalog(locale)

  const en = flattenCatalog(enRaw)
  const target = flattenCatalog(targetRaw)

  const rows: NewTranslationRow[] = []
  for (const [key, sourceText] of en.leaves) {
    if (target.leaves.has(key)) continue
    rows.push({
      source_type: 'message',
      source_key: key,
      locale,
      field: 'value',
      source_text: sourceText,
    })
  }

  const orphanKeys: string[] = []
  for (const key of target.leaves.keys()) {
    if (!en.leaves.has(key)) orphanKeys.push(key)
  }

  return {
    rows,
    report: {
      locale,
      netNewCount: rows.length,
      orphanCount: orphanKeys.length,
      orphanKeys,
      skippedSourceKeys: en.skipped,
    },
  }
}

export async function runSeed(
  locales: readonly Locale[] = ALL_TARGET_LOCALES,
  options: { dryRun?: boolean } = {},
): Promise<LocaleSeedReport[]> {
  const reports: LocaleSeedReport[] = []
  for (const locale of locales) {
    const { rows, report } = await enumerateNetNew(locale)

    let upserted = 0
    if (!options.dryRun && rows.length > 0) {
      const result = await upsertPending(rows)
      upserted = result.inserted
    }

    reports.push({ ...report, upsertedCount: upserted })
  }
  return reports
}

export function formatReport(reports: LocaleSeedReport[]): string {
  const lines: string[] = []
  lines.push('Translation seed report')
  lines.push('=======================')
  for (const r of reports) {
    lines.push(`\n[${r.locale.toUpperCase()}]`)
    lines.push(`  net-new keys (EN \\ ${r.locale}): ${r.netNewCount}`)
    lines.push(`  upserted to translations table:  ${r.upsertedCount}`)
    if (r.orphanCount > 0) {
      lines.push(
        `  orphans in ${r.locale}.json (not in en.json): ${r.orphanCount}`,
      )
      const sample = r.orphanKeys.slice(0, 5)
      if (sample.length) lines.push(`    sample: ${sample.join(', ')}${r.orphanKeys.length > 5 ? ', ...' : ''}`)
    }
    if (r.skippedSourceKeys.length > 0) {
      lines.push(
        `  skipped non-string EN leaves (${r.skippedSourceKeys.length}): ${r.skippedSourceKeys.slice(0, 3).join(', ')}${r.skippedSourceKeys.length > 3 ? ', ...' : ''}`,
      )
    }
  }
  return lines.join('\n')
}
