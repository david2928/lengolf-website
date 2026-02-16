import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getPostSlugs } from '@/lib/blog'
import { getAllLocationSlugs } from '@/lib/locations'
import { getAllSeoPageSlugs } from '@/lib/seo-pages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, locationSlugs, activitySlugs] = await Promise.all([
    getPostSlugs(),
    getAllLocationSlugs(),
    getAllSeoPageSlugs('activity_occasion'),
  ])

  // Pages with Thai translations get hreflang alternates
  const translatedPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${SITE_URL}/`,
          th: `${SITE_URL}/th/`,
        },
      },
    },
    {
      url: `${SITE_URL}/golf/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${SITE_URL}/golf/`,
          th: `${SITE_URL}/th/golf/`,
        },
      },
    },
  ]

  // Pages with Thai translations
  const newlyTranslatedPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/events/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { en: `${SITE_URL}/events/`, th: `${SITE_URL}/th/events/` } },
    },
    {
      url: `${SITE_URL}/golf-club-rental/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { en: `${SITE_URL}/golf-club-rental/`, th: `${SITE_URL}/th/golf-club-rental/` } },
    },
    {
      url: `${SITE_URL}/lessons/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: { en: `${SITE_URL}/lessons/`, th: `${SITE_URL}/th/lessons/` } },
    },
    {
      url: `${SITE_URL}/about-us/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { en: `${SITE_URL}/about-us/`, th: `${SITE_URL}/th/about-us/` } },
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: { en: `${SITE_URL}/blog/`, th: `${SITE_URL}/th/blog/` } },
    },
  ]

  // English-only pages (no Thai content yet)
  const englishOnlyPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/privacy-policy/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-of-service/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${SITE_URL}/location/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const activityPages: MetadataRoute.Sitemap = activitySlugs.map((slug) => ({
    url: `${SITE_URL}/activities/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...translatedPages, ...newlyTranslatedPages, ...englishOnlyPages, ...blogPages, ...locationPages, ...activityPages]
}
