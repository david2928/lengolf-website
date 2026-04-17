import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getAlternates } from '@/lib/translated-routes'
import { getPostSlugs } from '@/lib/blog'
import { getAllLocationSlugs } from '@/lib/locations'
import { getAllSeoPageSlugs } from '@/lib/seo-pages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, locationSlugs, activitySlugs, faqSlugs, hotelSlugs, costSlugs, explainerSlugs, bestOfSlugs] = await Promise.all([
    getPostSlugs(),
    getAllLocationSlugs(),
    getAllSeoPageSlugs('activity_occasion'),
    getAllSeoPageSlugs('faq'),
    getAllSeoPageSlugs('hotel_concierge'),
    getAllSeoPageSlugs('price_guide'),
    getAllSeoPageSlugs('explainer'),
    getAllSeoPageSlugs('best_of_listicle'),
  ])

  // Pages with translations — hreflang alternates sourced from translated-routes registry
  const translatedPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: { languages: getAlternates('/') },
    },
    {
      url: `${SITE_URL}/golf/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: getAlternates('/golf/') },
    },
    {
      url: `${SITE_URL}/events/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: getAlternates('/events/') },
    },
    {
      url: `${SITE_URL}/golf-club-rental/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: getAlternates('/golf-club-rental/') },
    },
    {
      url: `${SITE_URL}/golf-course-club-rental/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: getAlternates('/golf-course-club-rental/') },
    },
    {
      url: `${SITE_URL}/lessons/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: getAlternates('/lessons/') },
    },
    {
      url: `${SITE_URL}/about-us/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: getAlternates('/about-us/') },
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: getAlternates('/blog/') },
    },
    {
      url: `${SITE_URL}/rent-golf-clubs-bangkok/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: getAlternates('/rent-golf-clubs-bangkok/') },
    },
  ]

  // Hub / index pages for SEO section groups
  const hubPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/activities/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/golf-in-thailand-guide/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/hotels/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
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

  // TODO: Activity pages are English-only in Phase 1A. Add Thai translations in Phase 1B.
  const activityPages: MetadataRoute.Sitemap = activitySlugs.map((slug) => ({
    url: `${SITE_URL}/activities/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${SITE_URL}/activities/${slug}/`,
        // th: `${SITE_URL}/th/activities/${slug}/`, // TODO: Add when Thai content is ready
      },
    },
  }))

  const faqPageEntries: MetadataRoute.Sitemap = faqSlugs.map((slug) => ({
    url: `${SITE_URL}/faq/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const hotelPages: MetadataRoute.Sitemap = hotelSlugs.map((slug) => ({
    url: `${SITE_URL}/hotels/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const costPages: MetadataRoute.Sitemap = costSlugs.map((slug) => ({
    url: `${SITE_URL}/cost/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const explainerPageEntries: MetadataRoute.Sitemap = explainerSlugs.map((slug) => ({
    url: `${SITE_URL}/guide/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const bestOfPageEntries: MetadataRoute.Sitemap = bestOfSlugs.map((slug) => ({
    url: `${SITE_URL}/best/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...translatedPages, ...hubPages, ...englishOnlyPages, ...blogPages, ...locationPages, ...activityPages, ...faqPageEntries, ...hotelPages, ...costPages, ...explainerPageEntries, ...bestOfPageEntries]
}
