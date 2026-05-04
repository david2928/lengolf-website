import type { GolfCourse } from '@/types/golf-courses'
import { SITE_URL } from '@/lib/constants'

/**
 * Schema.org GolfCourse representation for a course summary card on a list
 * or comparison page. Compact — full GolfCourse schema lives on the
 * detail page via course.schema_markup.
 */
function golfCourseItem(c: GolfCourse): Record<string, unknown> {
  const item: Record<string, unknown> = {
    '@type': 'GolfCourse',
    name: c.name,
    url: `${SITE_URL}/golf-courses/${c.region}/${c.slug}/`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: c.province,
      addressCountry: 'TH',
    },
  }
  if (c.latitude !== null && c.longitude !== null) {
    item.geo = {
      '@type': 'GeoCoordinates',
      latitude: c.latitude,
      longitude: c.longitude,
    }
  }
  if (c.green_fee_weekday_thb !== null) {
    // Schema.org / Google Rich Results convention is for `price` to be a
    // string ("1500"), not a number. The validator accepts both but warns
    // on the numeric form; matches the existing pattern in `lib/jsonld.ts`.
    item.offers = {
      '@type': 'Offer',
      price: String(c.green_fee_weekday_thb),
      priceCurrency: 'THB',
      description: 'Weekday green fee',
    }
  }
  return item
}

/**
 * ItemList JSON-LD for a comparison page (two courses).
 */
export function getCourseComparisonJsonLd(
  a: GolfCourse,
  b: GolfCourse,
  pageUrl: string,
  listName: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    url: pageUrl,
    numberOfItems: 2,
    itemListElement: [
      { '@type': 'ListItem', position: 1, item: golfCourseItem(a) },
      { '@type': 'ListItem', position: 2, item: golfCourseItem(b) },
    ],
  }
}

/**
 * ItemList JSON-LD for a roundup page (proximity, price-tier, use-case).
 */
export function getCourseRoundupJsonLd(
  courses: GolfCourse[],
  pageUrl: string,
  listName: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    url: pageUrl,
    numberOfItems: courses.length,
    itemListElement: courses.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: golfCourseItem(c),
    })),
  }
}
