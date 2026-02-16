import type { SeoPageType, ActivityOccasionSeoPage } from '@/types/seo-pages'
import { activityOccasionPages } from '@/data/activity-occasions'

// Static data lookup (no DB dependency)
// When seo_pages table is created in Supabase, swap these to DB queries

export async function getAllSeoPageSlugs(pageType: SeoPageType): Promise<string[]> {
  if (pageType === 'activity_occasion') {
    return activityOccasionPages
      .filter((p) => p.status === 'published')
      .map((p) => p.slug)
  }
  return []
}

export async function getSeoPageBySlug(
  slug: string,
  pageType: SeoPageType
): Promise<ActivityOccasionSeoPage | null> {
  if (pageType === 'activity_occasion') {
    const page = activityOccasionPages.find(
      (p) => p.slug === slug && p.status === 'published'
    )
    return page || null
  }
  return null
}

export async function getSeoPagesByType(
  pageType: SeoPageType
): Promise<ActivityOccasionSeoPage[]> {
  if (pageType === 'activity_occasion') {
    return activityOccasionPages.filter((p) => p.status === 'published')
  }
  return []
}
