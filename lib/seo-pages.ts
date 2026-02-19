import type { SeoPageType, SeoPage } from '@/types/seo-pages'
import { activityOccasionPages } from '@/data/activity-occasions'
import { faqPages } from '@/data/faq-pages'
import { hotelConciergePages } from '@/data/hotel-pages'
import { priceGuidePages } from '@/data/price-guide-pages'

// Static data lookup (no DB dependency)
// When seo_pages table is created in Supabase, swap these to DB queries

export async function getAllSeoPageSlugs(pageType: SeoPageType): Promise<string[]> {
  if (pageType === 'activity_occasion') {
    return activityOccasionPages
      .filter((p) => p.status === 'published')
      .map((p) => p.slug)
  }
  if (pageType === 'faq') {
    return faqPages
      .filter((p) => p.status === 'published')
      .map((p) => p.slug)
  }
  if (pageType === 'hotel_concierge') {
    return hotelConciergePages
      .filter((p) => p.status === 'published')
      .map((p) => p.slug)
  }
  if (pageType === 'price_guide') {
    return priceGuidePages
      .filter((p) => p.status === 'published')
      .map((p) => p.slug)
  }
  return []
}

export async function getSeoPageBySlug(
  slug: string,
  pageType: SeoPageType
): Promise<SeoPage | null> {
  if (pageType === 'activity_occasion') {
    const page = activityOccasionPages.find(
      (p) => p.slug === slug && p.status === 'published'
    )
    return page || null
  }
  if (pageType === 'faq') {
    const page = faqPages.find(
      (p) => p.slug === slug && p.status === 'published'
    )
    return page || null
  }
  if (pageType === 'hotel_concierge') {
    const page = hotelConciergePages.find(
      (p) => p.slug === slug && p.status === 'published'
    )
    return page || null
  }
  if (pageType === 'price_guide') {
    const page = priceGuidePages.find(
      (p) => p.slug === slug && p.status === 'published'
    )
    return page || null
  }
  return null
}

export async function getSeoPagesByType(
  pageType: SeoPageType
): Promise<SeoPage[]> {
  if (pageType === 'activity_occasion') {
    return activityOccasionPages.filter((p) => p.status === 'published')
  }
  if (pageType === 'faq') {
    return faqPages.filter((p) => p.status === 'published')
  }
  if (pageType === 'hotel_concierge') {
    return hotelConciergePages.filter((p) => p.status === 'published')
  }
  if (pageType === 'price_guide') {
    return priceGuidePages.filter((p) => p.status === 'published')
  }
  return []
}
