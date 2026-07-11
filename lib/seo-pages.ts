import type { SeoPageType, SeoPage } from '@/types/seo-pages'
import { activityOccasionPages } from '@/data/activity-occasions'
import { faqPages } from '@/data/faq-pages'
import { hotelConciergePages } from '@/data/hotel-pages'
import { priceGuidePages } from '@/data/price-guide-pages'
import { explainerPages } from '@/data/explainer-pages'
import { bestOfListiclePages } from '@/data/best-of-listicle-pages'

// Static data lookup (no DB dependency)
// When seo_pages table is created in Supabase, swap these to DB queries

const PAGE_DATA_MAP: Partial<Record<SeoPageType, SeoPage[]>> = {
  activity_occasion: activityOccasionPages,
  faq: faqPages,
  hotel_concierge: hotelConciergePages,
  price_guide: priceGuidePages,
  explainer: explainerPages,
  best_of_listicle: bestOfListiclePages,
}

export async function getAllSeoPageSlugs(
  pageType: SeoPageType,
  locale: string = 'en'
): Promise<string[]> {
  const pages = PAGE_DATA_MAP[pageType]
  if (!pages) return []
  return pages
    .filter((p) => p.status === 'published' && p.locale === locale)
    .map((p) => p.slug)
}

export async function getSeoPageBySlug(
  slug: string,
  pageType: SeoPageType,
  locale: string = 'en'
): Promise<SeoPage | null> {
  const pages = PAGE_DATA_MAP[pageType]
  if (!pages) return null
  const page = pages.find(
    (p) => p.slug === slug && p.status === 'published' && p.locale === locale
  )
  return page || null
}

export async function getSeoPagesByType(
  pageType: SeoPageType,
  locale: string = 'en'
): Promise<SeoPage[]> {
  const pages = PAGE_DATA_MAP[pageType]
  if (!pages) return []
  return pages.filter((p) => p.status === 'published' && p.locale === locale)
}

/**
 * All (locale, slug) pairs that have published content for this page type.
 * Use in generateStaticParams so only translated locale×slug combos are built —
 * untranslated locale URLs are 301-redirected by the middleware instead.
 */
export async function getAllSeoPageParams(
  pageType: SeoPageType
): Promise<{ locale: string; slug: string }[]> {
  const pages = PAGE_DATA_MAP[pageType]
  if (!pages) return []
  return pages
    .filter((p) => p.status === 'published')
    .map((p) => ({ locale: p.locale, slug: p.slug }))
}
