/**
 * Single source of truth for resolving a FAQ related_questions slug to a
 * root-relative path.
 *
 * Convention: a bare slug (`how-to-pack-golf-clubs-flight-thailand`) is a
 * sibling FAQ and resolves to /faq/{slug}; a full path (`/guide/{slug}`)
 * points at another section and is used as-is.
 *
 * Every consumer of related_questions MUST resolve through this helper —
 * when the logic lived inline it drifted: FaqPage.tsx was fixed to honor
 * full paths while lib/jsonld.ts kept prepending /faq/, emitting malformed
 * /faq//guide/... URLs in FAQPage structured data (the GSC-404 bug class).
 * Consumers: components/faq/FaqPage.tsx (hrefs), lib/jsonld.ts (schema URLs),
 * scripts/validate-internal-links.ts (CI guard).
 */
export function relatedQuestionPath(slug: string): string {
  return slug.startsWith('/') ? slug : `/faq/${slug}`
}
