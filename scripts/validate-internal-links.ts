#!/usr/bin/env tsx

/**
 * Internal-link validator for SEO pages.
 *
 * Root cause it guards against (GSC "Not found (404)" cluster, 2026):
 * cross-type related links hardcode the wrong route prefix — e.g. a FAQ page
 * (served at /faq/{slug}) linked as /guide/{slug}, or a guide page (served at
 * /guide/{slug}) linked as /faq/{slug}. Nothing validated that a related link
 * actually resolved to a built page, so these shipped as live 404s that Google
 * then indexed.
 *
 * This script builds the real page inventory from the data modules (the same
 * source generateStaticParams uses) and asserts that every outbound internal
 * link pointing at an SEO section (/faq, /guide, /cost, /best, /activities,
 * /hotels) resolves to a published page at that exact path.
 *
 * Scope note: /location and /golf-courses links are NOT validated here — those
 * inventories are DB-driven (Supabase location_pages) or large data sets, and
 * this script must run server-free in the CI lint job. That class of link
 * (e.g. the near-chidlom typos) is covered by smoke-test section K
 * (scripts/smoke-test.ts), which live-fetches every related_slugs path
 * outside the prefixes validated here.
 *
 * Exit code 1 on any broken link so CI fails.
 *
 * Usage: npx tsx scripts/validate-internal-links.ts
 */

import { PAGE_DATA_MAP, ROUTE_PREFIX_TO_TYPE } from '@/lib/seo-pages'
import { relatedQuestionPath } from '@/lib/seo-links'
import type { SeoPage } from '@/types/seo-pages'

// route prefix -> the page array served there, derived from the canonical
// section map in lib/seo-pages.ts — a new SEO section added there is picked
// up here automatically instead of being silently skipped.
const SECTIONS: Record<string, SeoPage[]> = Object.fromEntries(
  Object.entries(ROUTE_PREFIX_TO_TYPE).map(([prefix, type]) => [
    prefix,
    PAGE_DATA_MAP[type] ?? [],
  ])
)

// The set of first-path-segments that identify an SEO section we can validate.
const SEO_PREFIXES = new Set(Object.keys(SECTIONS))

// Build the inventory of valid 2-segment SEO paths: `/{prefix}/{slug}`.
//
// Only EN-published pages define a valid ROOT path: related links are written
// as root paths, and app/[locale]/{section}/[slug] only builds a root (EN)
// page when an EN entry exists — a slug published only in ja/ko/zh would 404
// at the root path. The reverse direction is safe without locale checks:
// a link rendered on a ja/ko/zh page to an EN-only root path works because
// middleware.ts (13-21) 301-redirects untranslated /{locale}/{path} to the
// English root path. So: inventory = EN-published; no per-locale modelling.
const validPaths = new Set<string>()
for (const [prefix, pages] of Object.entries(SECTIONS)) {
  for (const p of pages) {
    if (p.status === 'published' && p.locale === 'en') {
      validPaths.add(`/${prefix}/${p.slug}`)
    }
  }
}

/** Where is this slug actually published? Suggestion text for the error path. */
function suggest(rawLink: string): string {
  const slug = norm(rawLink).split('/').filter(Boolean).pop() ?? ''
  const prefixes = Object.keys(SECTIONS).filter((p) => validPaths.has(`/${p}/${slug}`))
  if (prefixes.length === 0) return '→ NOT PUBLISHED anywhere (remove or create the page)'
  return `→ actually at ${prefixes.map((p) => `/${p}/${slug}`).join(' or ')}`
}

interface Broken {
  from: string // "faq:grab-vs-taxi-bangkok-golf (en)" (source page)
  field: string
  link: string
  reason?: string
}
const broken: Broken[] = []

/**
 * Normalize a link the way a browser resolves it: drop ?query/#fragment,
 * strip a trailing slash. Deliberately does NOT add a missing leading slash —
 * a related_slugs entry like 'guide/foo' renders as a RELATIVE href that
 * resolves against the current page and 404s; normalizing it here would hide
 * exactly the bug class this script exists to catch.
 */
function norm(link: string): string {
  let s = link.trim().split(/[?#]/)[0]
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1)
  return s
}

/** Check one outbound link from a source page. */
function check(fromLabel: string, field: string, rawLink: string) {
  if (!rawLink.trim().startsWith('/')) {
    broken.push({
      from: fromLabel,
      field,
      link: rawLink,
      reason: 'no leading slash — renders as a relative URL',
    })
    return
  }
  const path = norm(rawLink)
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) return
  // Case-insensitive prefix detection: '/Guide/x' is NOT out of scope — the
  // route is case-sensitive, so it is a broken SEO link, not an unknown one.
  if (!SEO_PREFIXES.has(segments[0].toLowerCase())) return // non-SEO prefix (/, /golf, /location, ...)
  // Anything under an SEO prefix that isn't exactly /{prefix}/{slug} in the
  // inventory is broken: wrong case, extra segments, unknown slug, bare
  // section link with a slug missing, etc.
  if (!validPaths.has(path)) {
    broken.push({ from: fromLabel, field, link: rawLink })
  }
}

for (const [prefix, pages] of Object.entries(SECTIONS)) {
  for (const page of pages) {
    if (page.status !== 'published') continue
    const label = `${prefix}:${page.slug} (${page.locale})`

    // related_slugs: full root paths, rendered as href={path}
    for (const link of page.related_slugs ?? []) {
      check(label, 'related_slugs', link)
    }

    // faq related_questions resolve through the SAME shared helper the
    // renderer (FaqPage.tsx) and JSON-LD builder (lib/jsonld.ts) use, so the
    // guard cannot drift from what the site actually emits.
    if (page.page_type === 'faq') {
      for (const rq of page.content.related_questions) {
        check(label, 'related_questions', relatedQuestionPath(rq.slug))
      }
    }
  }
}

if (broken.length === 0) {
  console.log('✅ validate-internal-links: all SEO cross-links resolve to published pages.')
  process.exit(0)
}

console.error(`❌ validate-internal-links: ${broken.length} broken internal link(s):\n`)
for (const b of broken) {
  const why = b.reason ? `(${b.reason}) ` : ''
  console.error(`  • [${b.from}]  ${b.field}: ${b.link}  ${why}${suggest(b.link)}`)
}
console.error(
  '\nFix: point each link at the section where the target slug is actually published' +
    ' (a FAQ slug lives at /faq/{slug}, a guide slug at /guide/{slug}, etc.),' +
    ' or remove the link if the target no longer exists.'
)
process.exit(1)
