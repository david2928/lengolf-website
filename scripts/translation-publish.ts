/**
 * Publish ready translations into messages/<locale>.json on disk.
 *
 * Usage:
 *   tsx --env-file=.env.local scripts/translation-publish.ts --locale=th --dry-run   # preview diff
 *   tsx --env-file=.env.local scripts/translation-publish.ts --locale=th --write     # apply
 *
 * Reads rows where status='ready', deep-merges them into the existing
 * messages/<locale>.json (preserving any existing keys), and writes back.
 * After successful write, marks rows as status='published'.
 *
 * Net-new contract: keys already present in the catalog are NEVER overwritten —
 * only newly-added keys land. This is what guarantees existing TH translations
 * aren't regressed by the pipeline.
 */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { listReady, setStatus } from '../lib/translations/db'
import { ALL_TARGET_LOCALES, type Locale, type TranslationRow } from '../lib/translations/types'

interface CliArgs {
  locale: Locale
  write: boolean
}

function parseArgs(argv: string[]): CliArgs {
  let locale: Locale | null = null
  let write = false

  for (const a of argv) {
    if (a === '--write') write = true
    else if (a === '--dry-run') write = false
    else if (a.startsWith('--locale=')) {
      const v = a.slice('--locale='.length) as Locale
      if (!ALL_TARGET_LOCALES.includes(v)) {
        console.error(
          `Invalid --locale=${v}. Allowed: ${ALL_TARGET_LOCALES.join('|')}.`,
        )
        process.exit(2)
      }
      locale = v
    }
  }
  if (!locale) {
    console.error('Usage: translation-publish.ts --locale=<th|ko|ja> [--dry-run|--write]')
    process.exit(2)
  }
  return { locale, write }
}

/**
 * Reserved keys that, if traversed, would mutate Object.prototype or other
 * built-in slots. Source EN keys are trusted today, but the runner pipes
 * untrusted-shape strings (third-party JSON imports, future EN edits) into
 * setAtPath, so we defend at the boundary. See PR #26 review C1.
 */
const FORBIDDEN_KEY_SEGMENTS = new Set([
  '__proto__',
  'prototype',
  'constructor',
])

function isForbiddenKey(k: string): boolean {
  return FORBIDDEN_KEY_SEGMENTS.has(k)
}

function hasOwn(obj: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * Set a value at a dot-notation path. Creates intermediate objects.
 * For array-indexed keys (e.g. "Lessons.coaches.boss.expertise.0"), creates
 * arrays and inserts at index. Returns false if a conflict arises (string-leaf
 * path collision, would overwrite, or the path traverses a prototype-poison
 * segment).
 */
function setAtPath(
  root: Record<string, unknown>,
  parts: string[],
  value: string,
): boolean {
  // Guard every segment first — reject the whole path if any segment is forbidden.
  for (const p of parts) if (isForbiddenKey(p)) return false

  let node: Record<string, unknown> | unknown[] = root
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    const isArrayIdx = /^\d+$/.test(parts[i + 1])

    if (Array.isArray(node)) {
      const idx = Number(key)
      if (!Number.isInteger(idx)) return false
      if (node[idx] === undefined) node[idx] = isArrayIdx ? [] : {}
      const next = node[idx]
      if (typeof next !== 'object' || next === null) return false
      node = next as Record<string, unknown> | unknown[]
    } else {
      // hasOwn check — `in` walks the prototype chain and would falsely
      // think e.g. node['toString'] exists on every plain object.
      if (!hasOwn(node, key)) {
        node[key] = isArrayIdx ? [] : {}
      }
      const next = node[key]
      if (typeof next !== 'object' || next === null) return false
      node = next as Record<string, unknown> | unknown[]
    }
  }

  const last = parts[parts.length - 1]
  if (Array.isArray(node)) {
    const idx = Number(last)
    if (!Number.isInteger(idx)) return false
    node[idx] = value
  } else {
    if (hasOwn(node, last)) return false // would overwrite — net-new contract violated
    node[last] = value
  }
  return true
}

/**
 * Check whether a dot-notation path already has an own-property leaf in the
 * existing tree. Uses hasOwn so inherited properties (toString, etc.) don't
 * cause false positives.
 */
function existsAtPath(root: Record<string, unknown>, parts: string[]): boolean {
  for (const p of parts) if (isForbiddenKey(p)) return false

  let node: unknown = root
  for (const p of parts) {
    if (typeof node !== 'object' || node === null) return false
    if (Array.isArray(node)) {
      const idx = Number(p)
      if (!Number.isInteger(idx)) return false
      node = node[idx]
    } else {
      const obj = node as Record<string, unknown>
      if (!hasOwn(obj, p)) return false
      node = obj[p]
    }
    if (node === undefined) return false
  }
  return true
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const file = path.resolve(process.cwd(), 'messages', `${args.locale}.json`)
  const existingRaw = await fs.readFile(file, 'utf8')
  const existing = JSON.parse(existingRaw) as Record<string, unknown>

  const rows = await listReady(args.locale)
  console.log(`${rows.length} ready rows for ${args.locale}.`)
  if (rows.length === 0) return

  // Sort: array elements need stable order so .0 lands before .1.
  rows.sort((a, b) => a.source_key.localeCompare(b.source_key))

  // Build a deep clone we'll mutate.
  const next = JSON.parse(existingRaw) as Record<string, unknown>
  const skipped: TranslationRow[] = []
  const applied: TranslationRow[] = []

  for (const row of rows) {
    if (row.translation === null || row.translation === '') {
      console.warn(
        `  skip ${row.source_key}: empty translation (status=ready but no text)`,
      )
      skipped.push(row)
      continue
    }
    const parts = row.source_key.split('.')
    if (existsAtPath(existing, parts)) {
      console.warn(
        `  skip ${row.source_key}: key already present in messages/${args.locale}.json (net-new contract)`,
      )
      skipped.push(row)
      continue
    }
    const ok = setAtPath(next, parts, row.translation)
    if (!ok) {
      console.warn(`  skip ${row.source_key}: path conflict (could not set)`)
      skipped.push(row)
      continue
    }
    applied.push(row)
  }

  console.log(`  applied: ${applied.length}, skipped: ${skipped.length}`)

  if (applied.length === 0) {
    console.log('Nothing to write.')
    return
  }

  const nextJson = JSON.stringify(next, null, 2) + '\n'

  if (!args.write) {
    // Print a unified diff using git diff --no-index between two temp files.
    const tmpDir = path.resolve(process.cwd(), '.next', 'translation-publish')
    await fs.mkdir(tmpDir, { recursive: true })
    const beforeFile = path.join(tmpDir, `${args.locale}.before.json`)
    const afterFile = path.join(tmpDir, `${args.locale}.after.json`)
    await fs.writeFile(beforeFile, existingRaw, 'utf8')
    await fs.writeFile(afterFile, nextJson, 'utf8')

    try {
      const out = execFileSync(
        'git',
        ['diff', '--no-index', '--no-color', beforeFile, afterFile],
        { encoding: 'utf8' },
      )
      console.log(out)
    } catch (err: unknown) {
      // git diff --no-index exits 1 when files differ — that's expected.
      const e = err as { status?: number; stdout?: Buffer | string }
      if (e.status === 1 && e.stdout) {
        console.log(typeof e.stdout === 'string' ? e.stdout : e.stdout.toString('utf8'))
      } else {
        throw err
      }
    }
    console.log(
      `\nDry run. Re-run with --write to apply ${applied.length} new key(s) to messages/${args.locale}.json.`,
    )
    return
  }

  await fs.writeFile(file, nextJson, 'utf8')
  console.log(`Wrote ${applied.length} new key(s) to ${file}.`)

  // Mark applied rows as published.
  for (const row of applied) {
    await setStatus(row.id, 'published')
  }
  console.log(`Marked ${applied.length} rows status='published'.`)
}

main().catch((err) => {
  console.error('Publish failed:', err)
  process.exit(1)
})
