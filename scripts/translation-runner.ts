/**
 * Translation pipeline orchestrator (Workstream B).
 *
 * Calls Anthropic API directly via the official SDK — Claude Code is not in
 * the loop. Reads pending rows from Supabase, runs each through translate →
 * lexicon → (sampled tone+native) → ready/flagged, and logs a JSONL audit
 * trail under scripts/translation-runs/.
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/translation-runner.ts --locale=all
 *   tsx --env-file=.env.local scripts/translation-runner.ts --locale=th --limit=5
 *   tsx --env-file=.env.local scripts/translation-runner.ts --locale=th --dry-run
 *
 * Cost cap is read from TRANSLATION_MAX_COST_USD (default 20). Cap is checked
 * BEFORE every API call; on cap hit the runner exits non-zero with a summary.
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import {
  listPending,
  setStatus,
  mergeNotes,
  totalCost,
  countByStatus,
} from '../lib/translations/db'
import {
  translate,
  lexiconCheck,
  toneCheck,
  nativeCheck,
  loadGlossary,
} from '../lib/translations/agents'
import { shouldDeepReview } from '../lib/translations/sample'
import { maxCostUsd } from '../lib/translations/budget'
import {
  ALL_TARGET_LOCALES,
  type Locale,
  type RunSummary,
  type Glossary,
  type TranslationRow,
} from '../lib/translations/types'

interface CliArgs {
  locales: readonly Locale[]
  limit?: number
  dryRun: boolean
}

function parseArgs(argv: string[]): CliArgs {
  let locales: readonly Locale[] = ALL_TARGET_LOCALES
  let limit: number | undefined
  let dryRun = false

  for (const a of argv) {
    if (a === '--dry-run') dryRun = true
    else if (a === '--locale=all') locales = ALL_TARGET_LOCALES
    else if (a.startsWith('--locale=')) {
      const v = a.slice('--locale='.length) as Locale
      if (!ALL_TARGET_LOCALES.includes(v)) {
        console.error(`Unknown locale: ${v}`)
        process.exit(2)
      }
      locales = [v]
    } else if (a.startsWith('--limit=')) {
      limit = Number(a.slice('--limit='.length))
      if (!Number.isInteger(limit) || limit <= 0) {
        console.error(`Invalid --limit: ${a}`)
        process.exit(2)
      }
    } else if (a === '--help' || a === '-h') {
      console.log(
        'Usage: translation-runner.ts [--locale=th|ko|ja|all] [--limit=N] [--dry-run]',
      )
      process.exit(0)
    }
  }

  return { locales, limit, dryRun }
}

interface JsonlEvent {
  ts: string
  row_id: string
  locale: Locale
  source_key: string
  status: string
  cost_usd: number
  flagged_by?: string
  error?: string
}

async function appendJsonl(file: string, ev: JsonlEvent): Promise<void> {
  await fs.appendFile(file, JSON.stringify(ev) + '\n', 'utf8')
}

class CostCapExceeded extends Error {}

async function processRow(
  row: TranslationRow,
  glossary: Glossary,
  log: (ev: JsonlEvent) => Promise<void>,
  budget: { spent: number; cap: number },
): Promise<{ outcome: 'ready' | 'flagged' | 'errored'; rowCost: number }> {
  let rowCost = 0

  // Charge a cost into the cumulative budget AND check the cap. Called after
  // every API call returns. The cap is "no more API calls after the cap is
  // reached" — so we charge first (we already paid for this call), then the
  // next ensureBudget call before the next API call sees the updated total.
  function chargeAndCheck(cost: number): void {
    rowCost += cost
    budget.spent += cost
  }
  function ensureBudget(): void {
    if (budget.spent >= budget.cap) {
      throw new CostCapExceeded(
        `Cost cap reached: spent $${budget.spent.toFixed(4)} / cap $${budget.cap}`,
      )
    }
  }

  try {
    // Stage 1: translate
    ensureBudget()
    const { translation, cost_usd: tCost } = await translate(row, glossary)
    chargeAndCheck(tCost)
    await setStatus(row.id, 'draft', { translation, cost_usd: tCost })

    // Stage 2: lexicon (deterministic, no API call)
    const lex = lexiconCheck(row, translation, glossary)
    if (!lex.passed) {
      await mergeNotes(row.id, { lexicon: lex.notes }, 'flagged', 0)
      await log({
        ts: new Date().toISOString(),
        row_id: row.id,
        locale: row.locale,
        source_key: row.source_key,
        status: 'flagged',
        cost_usd: rowCost,
        flagged_by: 'lexicon',
      })
      return { outcome: 'flagged', rowCost }
    }
    await mergeNotes(row.id, { lexicon: { passed: true } }, 'lexicon_passed', 0)

    // Stage 3+4: deep review on sampled rows only
    if (shouldDeepReview(row)) {
      ensureBudget()
      const tone = await toneCheck(row, translation, glossary)
      chargeAndCheck(tone.cost_usd)
      if (!tone.passed) {
        await mergeNotes(row.id, { tone: tone.notes }, 'flagged', tone.cost_usd)
        await log({
          ts: new Date().toISOString(),
          row_id: row.id,
          locale: row.locale,
          source_key: row.source_key,
          status: 'flagged',
          cost_usd: rowCost,
          flagged_by: 'tone',
        })
        return { outcome: 'flagged', rowCost }
      }
      await mergeNotes(row.id, { tone: { passed: true } }, 'tone_passed', tone.cost_usd)

      ensureBudget()
      const native = await nativeCheck(row, translation, glossary)
      chargeAndCheck(native.cost_usd)
      if (!native.passed) {
        await mergeNotes(
          row.id,
          { native: native.notes },
          'flagged',
          native.cost_usd,
        )
        await log({
          ts: new Date().toISOString(),
          row_id: row.id,
          locale: row.locale,
          source_key: row.source_key,
          status: 'flagged',
          cost_usd: rowCost,
          flagged_by: 'native',
        })
        return { outcome: 'flagged', rowCost }
      }
      await mergeNotes(
        row.id,
        { native: { passed: true } },
        'native_passed',
        native.cost_usd,
      )
    }

    // Promote to ready
    await setStatus(row.id, 'ready')
    await log({
      ts: new Date().toISOString(),
      row_id: row.id,
      locale: row.locale,
      source_key: row.source_key,
      status: 'ready',
      cost_usd: rowCost,
    })
    return { outcome: 'ready', rowCost }
  } catch (err) {
    if (err instanceof CostCapExceeded) throw err

    const msg = err instanceof Error ? err.message : String(err)
    try {
      // Pass cost=0: any costs incurred during this row were already merged
      // into the row's cost_usd via setStatus/mergeNotes calls before the
      // throw site. Adding rowCost again would double-count.
      await mergeNotes(row.id, { error: msg }, 'flagged', 0)
    } catch {
      // If we can't even write the flag, swallow — main loop continues.
    }
    try {
      await log({
        ts: new Date().toISOString(),
        row_id: row.id,
        locale: row.locale,
        source_key: row.source_key,
        status: 'flagged',
        cost_usd: rowCost,
        error: msg,
      })
    } catch {
      // log-write failures should never crash the run.
    }
    return { outcome: 'errored', rowCost }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env. Run with --env-file=.env.local.',
    )
    process.exit(1)
  }
  if (!process.env.ANTHROPIC_API_KEY && !args.dryRun) {
    console.error('Missing ANTHROPIC_API_KEY in env. Run with --env-file=.env.local.')
    process.exit(1)
  }

  const cap = maxCostUsd()
  const startedAt = new Date()
  const runId = startedAt.toISOString().replace(/[:.]/g, '-')
  const logDir = path.resolve(process.cwd(), 'scripts', 'translation-runs')
  await fs.mkdir(logDir, { recursive: true })
  const logFile = path.join(logDir, `${runId}.jsonl`)

  const log = async (ev: JsonlEvent) => appendJsonl(logFile, ev)

  // Print header
  console.log(`Translation runner started ${startedAt.toISOString()}`)
  console.log(`  locales:  ${args.locales.join(', ')}`)
  console.log(`  cost cap: $${cap}`)
  console.log(`  log file: ${logFile}`)
  if (args.dryRun) console.log('  dry run:  true (no API calls, no DB writes)')

  if (args.dryRun) {
    for (const locale of args.locales) {
      const rows = await listPending(locale, args.limit ?? 9999)
      console.log(`  ${locale}: ${rows.length} pending rows`)
    }
    process.exit(0)
  }

  const startSpent = await totalCost()
  const budget = { spent: startSpent, cap }
  console.log(`  prior spent (all-time across all locales): $${startSpent.toFixed(4)}`)

  // Pre-load glossaries.
  const glossaries: Record<string, Glossary> = {}
  for (const locale of args.locales) {
    glossaries[locale] = await loadGlossary(locale)
  }

  let processed = 0
  let ready = 0
  let flagged = 0
  let errored = 0
  let capHit = false

  outer: for (const locale of args.locales) {
    while (true) {
      // listPending returns only 'pending' rows now (see review L4 fix),
      // so no filter needed. Flagged rows are handled by the review CLI.
      const rows = await listPending(locale, 50)
      if (rows.length === 0) break

      for (const row of rows) {
        if (args.limit !== undefined && processed >= args.limit) break outer

        let outcome: 'ready' | 'flagged' | 'errored'
        let rowCost = 0
        try {
          // processRow updates `budget.spent` directly via chargeAndCheck,
          // so we MUST NOT add rowCost again here (would double-count).
          const r = await processRow(row, glossaries[locale], log, budget)
          outcome = r.outcome
          rowCost = r.rowCost
        } catch (err) {
          if (err instanceof CostCapExceeded) {
            capHit = true
            console.error(`\n${err.message}`)
            // Append a final marker event so post-mortem readers see the abort.
            try {
              await log({
                ts: new Date().toISOString(),
                row_id: '_runner_',
                locale: row.locale,
                source_key: '_cost_cap_aborted_',
                status: 'aborted',
                cost_usd: budget.spent,
                error: err.message,
              })
            } catch {
              // ignore — we're exiting anyway
            }
            break outer
          }
          // Any other error from processRow (e.g. DB outage during mergeNotes)
          // — count it, log it, continue to the next row. Don't crash the run.
          const msg = err instanceof Error ? err.message : String(err)
          console.error(`\n[fatal-row] ${row.source_key}: ${msg}`)
          errored++
          processed++
          continue
        }

        processed++
        if (outcome === 'ready') ready++
        else if (outcome === 'flagged') flagged++
        else if (outcome === 'errored') errored++

        process.stdout.write(
          `[${processed}] ${locale}/${row.source_key.slice(0, 50).padEnd(50)} → ${outcome} ($${rowCost.toFixed(4)}, total $${budget.spent.toFixed(4)})\n`,
        )
      }
    }
  }

  // Build summary.
  const finishedAt = new Date()
  const counts = await countByStatus()
  const remaining: Record<Locale, number> = { th: 0, ko: 0, ja: 0 }
  for (const locale of ALL_TARGET_LOCALES) {
    const c = counts[locale] ?? {}
    remaining[locale] =
      (c.pending ?? 0) + (c.flagged ?? 0)
  }

  const summary: RunSummary = {
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    rowsProcessed: processed,
    rowsReady: ready,
    rowsFlagged: flagged,
    rowsRejected: errored,
    totalCostUsd: budget.spent - startSpent,
    remainingByLocale: remaining,
  }

  console.log('\n=== Run summary ===')
  console.log(JSON.stringify(summary, null, 2))
  console.log(`Log file: ${logFile}`)

  if (capHit) {
    console.log('\nCost cap hit — exiting non-zero so CI/cron can alert.')
    process.exit(2)
  }
}

main().catch((err) => {
  console.error('Runner crashed:', err)
  process.exit(1)
})
