import 'server-only'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient<Database> | null = null

/**
 * Server-only Supabase client using the service_role key.
 * Bypasses RLS — only use from trusted server code (API routes, server
 * components, server actions). NEVER import from client components — the
 * `server-only` import above will fail the build if you do.
 *
 * Name is `createClient` for historical reasons (was originally misusing the
 * anon key here, which left every server-side consumer — blog, clubs,
 * locations, promotions, Google reviews, contact form — hitting PostgREST as
 * `anon` and silently depending on over-permissive grants). Swapping the env
 * var in place was the minimal fix that closes the security hole without
 * touching 6+ call sites.
 *
 * Client components that reference this module must only use `import type`
 * (e.g. `import type { UsedClub } from '@/lib/clubs'`) — type-only imports are
 * erased at build time. Any runtime import from a client component will fail
 * the build via the `server-only` package.
 */
export function createClient(): SupabaseClient<Database> {
  if (supabaseInstance) {
    return supabaseInstance
  }

  supabaseInstance = createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  )

  return supabaseInstance
}
