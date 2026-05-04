/**
 * Interactive review CLI for flagged translations.
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/translation-review.ts --locale=th
 *
 * Walks through flagged rows one at a time. For each row, prompts:
 *   [a] accept the translation as-is and promote to 'ready'
 *   [r] reject — promote to 'rejected' (won't be published)
 *   [e] edit the translation, then promote to 'ready'
 *   [s] skip (leave flagged for later)
 *   [v] show full row JSON for context
 *   [q] quit
 */

import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { listFlagged, setStatus } from '../lib/translations/db'
import { ALL_TARGET_LOCALES, type Locale, type TranslationRow } from '../lib/translations/types'

function parseArgs(argv: string[]): { locale: Locale } {
  for (const a of argv) {
    if (a.startsWith('--locale=')) {
      const v = a.slice('--locale='.length) as Locale
      if (!ALL_TARGET_LOCALES.includes(v)) {
        console.error(`Unknown locale: ${v}`)
        process.exit(2)
      }
      return { locale: v }
    }
  }
  console.error('Usage: translation-review.ts --locale=<th|ko|ja>')
  process.exit(2)
}

function previewNotes(row: TranslationRow): string {
  const lines: string[] = []
  const n = row.notes
  if (n.lexicon && !n.lexicon.passed) {
    lines.push('  LEXICON:')
    n.lexicon.reasons?.forEach((r) => lines.push(`    - ${r}`))
    if (n.lexicon.missing_brand_terms?.length)
      lines.push(`    missing brand: ${n.lexicon.missing_brand_terms.join(', ')}`)
    if (n.lexicon.missing_preferred?.length)
      lines.push(`    missing preferred: ${n.lexicon.missing_preferred.join(', ')}`)
    if (n.lexicon.placeholder_drift?.length)
      lines.push(`    placeholder drift: ${n.lexicon.placeholder_drift.join('; ')}`)
  }
  if (n.tone && !n.tone.passed) {
    lines.push('  TONE:')
    n.tone.reasons?.forEach((r) => lines.push(`    - ${r}`))
    if (n.tone.suggested_rewrite)
      lines.push(`    suggested: ${n.tone.suggested_rewrite}`)
  }
  if (n.native && !n.native.passed) {
    lines.push('  NATIVE:')
    n.native.reasons?.forEach((r) => lines.push(`    - ${r}`))
    if (n.native.suggested_rewrite)
      lines.push(`    suggested: ${n.native.suggested_rewrite}`)
  }
  if (n.error) lines.push(`  ERROR: ${n.error}`)
  return lines.join('\n') || '  (no agent notes)'
}

async function main() {
  const { locale } = parseArgs(process.argv.slice(2))
  const rows = await listFlagged(locale)
  if (rows.length === 0) {
    console.log(`No flagged rows for ${locale}.`)
    return
  }
  console.log(`${rows.length} flagged rows for ${locale}.`)

  const rl = readline.createInterface({ input, output })

  let acted = 0
  let skipped = 0
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    console.log(`\n──────── [${i + 1}/${rows.length}] ${row.source_key} ────────`)
    console.log(`EN: ${row.source_text}`)
    console.log(`${locale.toUpperCase()}: ${row.translation ?? '(no translation)'}`)
    console.log('Agent flags:')
    console.log(previewNotes(row))

    let action = ''
    while (!['a', 'r', 'e', 's', 'q'].includes(action)) {
      const ans = (await rl.question('[a]ccept / [r]eject / [e]dit / [s]kip / [v]iew / [q]uit > ')).trim().toLowerCase()
      if (ans === 'v') {
        console.log(JSON.stringify(row, null, 2))
        continue
      }
      action = ans
    }

    if (action === 'q') break

    if (action === 'a') {
      await setStatus(row.id, 'ready')
      acted++
      console.log('  → ready')
    } else if (action === 'r') {
      await setStatus(row.id, 'rejected')
      acted++
      console.log('  → rejected')
    } else if (action === 'e') {
      const newText = (await rl.question('  edited translation: ')).trim()
      if (!newText) {
        console.log('  empty input — leaving flagged')
        skipped++
      } else {
        await setStatus(row.id, 'ready', {
          translation: newText,
          notes: { ...row.notes, manual_edit: true },
        })
        acted++
        console.log('  → ready (manually edited)')
      }
    } else {
      skipped++
    }
  }

  rl.close()
  console.log(`\nDone. Acted on ${acted} rows, skipped ${skipped}.`)
}

main().catch((err) => {
  console.error('Review CLI failed:', err)
  process.exit(1)
})
