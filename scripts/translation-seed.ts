/**
 * CLI entry for the translation seed step.
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/translation-seed.ts                   # all 3 locales
 *   tsx --env-file=.env.local scripts/translation-seed.ts --locales=th,ko   # subset
 *   tsx --env-file=.env.local scripts/translation-seed.ts --dry-run         # no DB writes
 *
 * Reads messages/en.json + messages/<locale>.json for each target locale,
 * computes the EN \ target diff, and inserts pending rows into the
 * `translations` table. Idempotent — re-running picks up only new keys.
 */

import { runSeed, formatReport } from '../lib/translations/seed'
import { ALL_TARGET_LOCALES, type Locale } from '../lib/translations/types'

interface CliArgs {
  locales: readonly Locale[]
  dryRun: boolean
}

function parseArgs(argv: string[]): CliArgs {
  let locales: readonly Locale[] = ALL_TARGET_LOCALES
  let dryRun = false
  for (const a of argv) {
    if (a === '--dry-run') dryRun = true
    else if (a.startsWith('--locales=')) {
      const list = a.slice('--locales='.length).split(',') as Locale[]
      const allowed = new Set<string>(ALL_TARGET_LOCALES)
      for (const l of list) {
        if (!allowed.has(l)) {
          console.error(`Unknown locale: ${l}. Allowed: ${ALL_TARGET_LOCALES.join(',')}`)
          process.exit(2)
        }
      }
      locales = list
    } else if (a === '--help' || a === '-h') {
      console.log(
        'Usage: translation-seed.ts [--locales=th,ko,ja] [--dry-run]\n' +
          '\n' +
          'Reads messages/en.json + messages/<locale>.json for each target locale,\n' +
          'computes the EN \\ target diff, and inserts pending rows into the\n' +
          '`translations` Supabase table. Idempotent.\n',
      )
      process.exit(0)
    }
  }
  return { locales, dryRun }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  console.log(
    `Seeding translations for: ${args.locales.join(', ')}${args.dryRun ? ' (dry run)' : ''}`,
  )
  const reports = await runSeed(args.locales, { dryRun: args.dryRun })
  console.log(formatReport(reports))
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
