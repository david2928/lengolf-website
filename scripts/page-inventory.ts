#!/usr/bin/env tsx

/**
 * Page inventory by language.
 *
 * Prints a table of every site section (/guide, /location, /golf-courses, …)
 * and the number of published pages available in each language (EN/TH/JA/KO/ZH).
 *
 * Source of truth: the rendered sitemap.xml. Each <url> carries the canonical
 * (EN) <loc> plus <xhtml:link hreflang="…"> alternates for every language it's
 * translated into. Counting the canonical locs gives EN; counting hreflang
 * alternates per locale gives the rest. Reading the sitemap (instead of
 * re-deriving from data files) means this never duplicates app routing/data
 * logic, so it can't drift when sections are added.
 *
 * Usage:  npx tsx scripts/page-inventory.ts [base-url]
 * Default base: http://localhost:3000
 *
 * IMPORTANT: point it at a server with production data. Blog posts and location
 * pages are DB-driven (Supabase) — a dev server without real Supabase creds
 * renders a sitemap missing those sections, so they'll read 0. Run against
 * `npm run dev`/`start` with a real .env.local, against CI, or against prod
 * (https://www.len.golf) from a networked machine.
 *
 * Zero dependencies beyond tsx + Node.js built-in fetch.
 */

const BASE = process.argv[2] || 'http://localhost:3000'
const LOCALES = ['en', 'th', 'ja', 'ko', 'zh'] as const
type Locale = (typeof LOCALES)[number]

/**
 * Map a canonical path (locale prefix already absent — sitemap locs are the EN
 * canonical) to a human section label. Order of checks matters: more specific
 * golf-courses sub-types before the generic region/course fallback.
 */
function sectionOf(path: string): string {
  const p = path.replace(/\/$/, '')
  if (p === '' || p === '/') return 'Core & static'
  const seg = p.split('/').filter(Boolean)
  const top = seg[0]

  if (top === 'golf-courses') {
    if (seg.length === 1) return '/golf-courses (hub)'
    if (seg[1] === 'compare') return '/golf-courses/compare'
    if (seg[1] === 'near') return '/golf-courses/near [station]'
    if (seg[1] === 'under') return '/golf-courses/under [price]'
    if (seg[1] === 'best-for') return '/golf-courses/best-for'
    if (seg.length === 2) return '/golf-courses/[region]'
    return '/golf-courses/[region]/[course]'
  }

  switch (top) {
    case 'guide': return '/guide'
    case 'faq': return '/faq'
    case 'cost': return '/cost'
    case 'best': return '/best'
    case 'blog': return '/blog'
    case 'location': return '/location'
    case 'activities': return '/activities'
    case 'hotels': return '/hotels'
    // Core marketing/product statics + standalone hubs
    default: return 'Core & static'
  }
}

// Fixed display order; anything unexpected is appended after.
const SECTION_ORDER = [
  'Core & static',
  '/guide',
  '/faq',
  '/cost',
  '/activities',
  '/hotels',
  '/best',
  '/blog',
  '/location',
  '/golf-courses (hub)',
  '/golf-courses/[region]',
  '/golf-courses/[region]/[course]',
  '/golf-courses/compare',
  '/golf-courses/near [station]',
  '/golf-courses/under [price]',
  '/golf-courses/best-for',
]

async function main() {
  const url = `${BASE}/sitemap.xml`
  let xml: string
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    xml = await res.text()
  } catch (err) {
    console.error(`\x1b[31mCannot fetch ${url}: ${(err as Error).message}\x1b[0m`)
    console.error('Start the server first (npm run dev / npm run start) or pass a reachable base URL.')
    process.exit(1)
  }

  // counts[section][locale]
  const counts = new Map<string, Record<Locale, number>>()
  const bump = (section: string, locale: Locale) => {
    let row = counts.get(section)
    if (!row) {
      row = { en: 0, th: 0, ja: 0, ko: 0, zh: 0 }
      counts.set(section, row)
    }
    row[locale]++
  }

  // Split into <url>…</url> blocks so hreflang alternates stay associated with
  // their canonical loc.
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? []
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]
    if (!loc) continue
    const path = loc.replace(/^https?:\/\/[^/]+/, '')
    const section = sectionOf(path)

    // EN is the canonical loc itself.
    bump(section, 'en')

    // Non-EN come from hreflang alternates on this url (ignore the self en link
    // and x-default).
    const hreflangs = new Set(
      [...block.matchAll(/hreflang="([a-z-]+)"/g)].map((m) => m[1])
    )
    for (const l of ['th', 'ja', 'ko', 'zh'] as const) {
      if (hreflangs.has(l)) bump(section, l)
    }
  }

  if (blocks.length === 0) {
    console.error('\x1b[31mNo <url> entries found in sitemap — is the URL correct?\x1b[0m')
    process.exit(1)
  }

  // Order sections
  const seen = new Set(SECTION_ORDER)
  const extras = [...counts.keys()].filter((s) => !seen.has(s)).sort()
  const ordered = [...SECTION_ORDER.filter((s) => counts.has(s)), ...extras]

  // Render table
  const pad = (s: string, n: number) => s.padEnd(n)
  const padL = (s: string, n: number) => s.padStart(n)
  const w = Math.max(20, ...ordered.map((s) => s.length))

  console.log(`\x1b[1mLENGOLF page inventory by language\x1b[0m  (source: ${url})`)
  console.log(`${pad('Section', w)}  ${LOCALES.map((l) => padL(l.toUpperCase(), 5)).join('')}`)
  console.log('─'.repeat(w + 2 + 5 * LOCALES.length))

  const totals: Record<Locale, number> = { en: 0, th: 0, ja: 0, ko: 0, zh: 0 }
  for (const section of ordered) {
    const row = counts.get(section)!
    for (const l of LOCALES) totals[l] += row[l]
    console.log(`${pad(section, w)}  ${LOCALES.map((l) => padL(String(row[l]), 5)).join('')}`)
  }
  console.log('─'.repeat(w + 2 + 5 * LOCALES.length))
  console.log(`${pad('TOTAL', w)}  ${LOCALES.map((l) => padL(String(totals[l]), 5)).join('')}`)

  if (totals.en > 0 && counts.get('/blog')?.en === 1 && !counts.has('/location')) {
    console.log(
      '\n\x1b[33mNote:\x1b[0m /blog shows only the index and /location is absent — the target ' +
      'server has no DB access (Supabase), so DB-driven pages are missing. Run against a ' +
      'server with a real .env.local for complete counts.'
    )
  }
}

main().catch((err) => {
  console.error('page-inventory crashed:', err)
  process.exit(1)
})
