import type { SeoPageType, SeoPage } from '@/types/seo-pages'
import { activityOccasionPages } from '@/data/activity-occasions'
import { faqPages } from '@/data/faq-pages'
import { hotelConciergePages } from '@/data/hotel-pages'
import { priceGuidePages } from '@/data/price-guide-pages'
import { explainerPages } from '@/data/explainer-pages'

// Static data lookup (no DB dependency)
// When seo_pages table is created in Supabase, swap these to DB queries

const PAGE_DATA_MAP: Partial<Record<SeoPageType, SeoPage[]>> = {
  activity_occasion: activityOccasionPages,
  faq: faqPages,
  hotel_concierge: hotelConciergePages,
  price_guide: priceGuidePages,
  explainer: explainerPages,
}

export async function getAllSeoPageSlugs(pageType: SeoPageType): Promise<string[]> {
  const pages = PAGE_DATA_MAP[pageType]
  if (!pages) return []
  return pages
    .filter((p) => p.status === 'published')
    .map((p) => p.slug)
}

export async function getSeoPageBySlug(
  slug: string,
  pageType: SeoPageType
): Promise<SeoPage | null> {
  const pages = PAGE_DATA_MAP[pageType]
  if (!pages) return null
  const page = pages.find(
    (p) => p.slug === slug && p.status === 'published'
  )
  return page || null
}

export async function getSeoPagesByType(pageType: SeoPageType): Promise<SeoPage[]> {
  const pages = PAGE_DATA_MAP[pageType]
  if (!pages) return []
  return pages.filter((p) => p.status === 'published')
}
