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
 * It intentionally does NOT validate non-SEO prefixes (/location, /golf-courses,
 * /blog, core static pages) — those are DB-driven or numerous, and were not the
 * source of the bug. Keeping scope tight avoids false positives.
 *
 * Exit code 1 on any broken link so CI fails.
 *
 * Usage: npx tsx scripts/validate-internal-links.ts
 */

import { faqPages } from '@/data/faq-pages'
import { explainerPages } from '@/data/explainer-pages'
import { priceGuidePages } from '@/data/price-guide-pages'
import { bestOfListiclePages } from '@/data/best-of-listicle-pages'
import { activityOccasionPages } from '@/data/activity-occasions'
import { hotelConciergePages } from '@/data/hotel-pages'
import type { SeoPage, FaqSeoPage } from '@/types/seo-pages'

// route prefix -> the page array served there
const SECTIONS: Record<string, SeoPage[]> = {
  faq: faqPages,
  guide: explainerPages,
  cost: priceGuidePages,
  best: bestOfListiclePages,
  activities: activityOccasionPages,
  hotels: hotelConciergePages,
}

// The set of first-path-segments that identify an SEO section we can validate.
const SEO_PREFIXES = new Set(Object.keys(SECTIONS))

// Build the inventory of valid 2-segment SEO paths: `/{prefix}/{slug}`.
// A path is valid if ANY locale publishes that slug. This is deliberately
// locale-BLIND and is correct: related links are written as root paths, and
// middleware.ts (13-21) 301-redirects an untranslated /{locale}/{path} to the
// English root path. So a link from a ja/ko/zh page to a slug only published in
// EN does not 404 — it 301s to the EN page (200). Making this check
// locale-strict would therefore produce FALSE POSITIVES on valid cross-locale
// links. Do not "harden" it to per-locale without also modelling that redirect.
const validPaths = new Set<string>()
// slug -> set of prefixes where that slug is actually published (for suggestions)
const slugToPrefixes = new Map<string, Set<string>>()
for (const [prefix, pages] of Object.entries(SECTIONS)) {
  for (const p of pages) {
    if (p.status !== 'published') continue
    validPaths.add(`/${prefix}/${p.slug}`)
    if (!slugToPrefixes.has(p.slug)) slugToPrefixes.set(p.slug, new Set())
    slugToPrefixes.get(p.slug)!.add(prefix)
  }
}

/** Where is this slug actually published? "" if nowhere. */
function suggest(rawLink: string): string {
  const segments = norm(rawLink).split('/').filter(Boolean)
  const slug = segments[segments.length - 1]
  const prefixes = slugToPrefixes.get(slug)
  if (!prefixes || prefixes.size === 0) return '→ NOT PUBLISHED anywhere (remove or create the page)'
  return `→ actually at ${[...prefixes].map((p) => `/${p}/${slug}`).join(' or ')}`
}

interface Broken {
  from: string // "faq:grab-vs-taxi-bangkok-golf" (source page)
  field: string
  link: string
}
const broken: Broken[] = []

/** Normalize a link to a root path with a leading slash and no trailing slash. */
function norm(link: string): string {
  let s = link.trim()
  if (!s.startsWith('/')) s = `/${s}`
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1)
  return s
}

/** Check one outbound link from a source page. */
function check(fromLabel: string, field: string, rawLink: string) {
  const path = norm(rawLink)
  const segments = path.split('/').filter(Boolean)
  // Only validate 2-segment SEO-section links; skip static/DB-driven prefixes.
  if (segments.length !== 2) return
  if (!SEO_PREFIXES.has(segments[0])) return
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

    // faq related_questions mirror FaqPage's link logic exactly: a bare slug is
    // a sibling FAQ (/faq/{slug}); a full path (starts with "/") points at
    // another section and is rendered as-is.
    if (page.page_type === 'faq') {
      const rqs = (page as FaqSeoPage).content?.related_questions ?? []
      for (const rq of rqs) {
        const href = rq.slug.startsWith('/') ? rq.slug : `/faq/${rq.slug}`
        check(label, 'related_questions', href)
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
  console.error(`  • [${b.from}]  ${b.field}: ${b.link}  ${suggest(b.link)}`)
}
console.error(
  '\nFix: point each link at the section where the target slug is actually published' +
    ' (a FAQ slug lives at /faq/{slug}, a guide slug at /guide/{slug}, etc.),' +
    ' or remove the link if the target no longer exists.'
)
process.exit(1)
