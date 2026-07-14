import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseBySlug, getAllCourseParams, getCoursesByRegion, REGION_META } from '@/lib/golf-courses'
import type { Region } from '@/lib/golf-courses'
import { SITE_URL } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import CoursePage from '@/components/golf-courses/CoursePage'
import { getComparisonPairs, pairSlug } from '@/lib/golf-courses-derived'
import { BTS_STATIONS } from '@/data/bts-stations'
import { USE_CASE_RULES, USE_CASES } from '@/data/golf-courses-use-cases'
import { haversineKm } from '@/lib/geo'
import type { CrossLink } from '@/components/golf-courses/CrossLinkBlock'

interface Props {
  params: Promise<{ locale: string; region: string; slug: string }>
}

export async function generateStaticParams() {
  return getAllCourseParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, slug } = await params
  const course = await getCourseBySlug(region, slug)

  if (!course) return { title: 'Course Not Found' }

  const { title, meta_description } = course.locales.en
  const canonicalUrl = `${SITE_URL}/golf-courses/${region}/${slug}/`

  return {
    title,
    description: meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: meta_description,
      url: canonicalUrl,
      type: 'website',
    },
  }
}

export default async function CoursePageRoute({ params }: Props) {
  const { locale, region, slug } = await params
  setRequestLocale(locale)

  const course = await getCourseBySlug(region, slug)
  if (!course) notFound()

  const regionLabel = REGION_META[region as Region]?.label ?? (region.charAt(0).toUpperCase() + region.slice(1))

  // Fetch up to 3 sibling courses in the same region for the "More in Region" section
  const allRegionCourses = await getCoursesByRegion(region)
  const relatedCourses = allRegionCourses
    .filter((c) => c.slug !== slug)
    .slice(0, 3)
  const canonicalUrl = `${SITE_URL}/golf-courses/${region}/${slug}/`

  // ── Cross-links into the workstream-A programmatic-SEO pages ─────────────
  // 1) Comparisons featuring this course (max 2)
  const comparisonPairs = await getComparisonPairs()
  const courseComparisons = comparisonPairs
    .filter((p) => p.region === region && (p.slugA === slug || p.slugB === slug))
    .slice(0, 2)
  const courseNamesById: Record<string, string> = Object.fromEntries(
    allRegionCourses.map((c) => [c.slug, c.name])
  )

  // 2) Nearest BTS station (only if the course has lat/lng)
  let nearestStationLink: CrossLink | null = null
  if (course.latitude !== null && course.longitude !== null) {
    const stations = Object.values(BTS_STATIONS)
    const nearest = stations.reduce(
      (best, s) => {
        const km = haversineKm(
          { lat: course.latitude!, lng: course.longitude! },
          { lat: s.lat, lng: s.lng }
        )
        return km < best.km ? { km, station: s } : best
      },
      { km: Infinity, station: stations[0] }
    )
    nearestStationLink = {
      label: `Best courses near ${nearest.station.name} BTS`,
      href: `/golf-courses/near/${nearest.station.slug}`,
      description: `${nearest.km.toFixed(1)} km from ${nearest.station.name} — same district as ${course.name}.`,
    }
  }

  // 3) First use-case this course matches
  const matchedUseCase = USE_CASES.find((u) => USE_CASE_RULES[u].predicate(course))
  const useCaseLink: CrossLink | null = matchedUseCase
    ? {
        label: USE_CASE_RULES[matchedUseCase].title.replace('Best Bangkok-Area Golf Courses ', ''),
        href: `/golf-courses/best-for/${matchedUseCase}`,
      }
    : null

  const crossLinks: CrossLink[] = [
    ...courseComparisons.map((p) => ({
      label: `${courseNamesById[p.slugA] ?? p.slugA} vs ${courseNamesById[p.slugB] ?? p.slugB}`,
      href: `/golf-courses/compare/${p.region}/${pairSlug(p.slugA, p.slugB)}`,
    })),
    ...(nearestStationLink ? [nearestStationLink] : []),
    ...(useCaseLink ? [useCaseLink] : []),
  ]

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Golf Courses', url: `${SITE_URL}/golf-courses/` },
    { name: regionLabel, url: `${SITE_URL}/golf-courses/${region}/` },
    { name: course.name, url: canonicalUrl },
  ])

  // Wrap JSON.parse in try/catch: a malformed schema_markup in one data file
  // must not crash the entire detail page with a 500.
  let schemaMarkup: Record<string, unknown> | null = null
  try {
    schemaMarkup = JSON.parse(course.schema_markup) as Record<string, unknown>
    // Fill in the description and canonical URL at render time
    schemaMarkup.description = course.prose.overview
    schemaMarkup.url = canonicalUrl   // bug_022: use www canonical, not apex domain from static data
  } catch {
    // Log server-side so we can detect bad data files without crashing the page
    console.error(`[CoursePage] Failed to parse schema_markup for ${region}/${slug}`)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      )}
      <CoursePage
        course={course}
        regionLabel={regionLabel}
        relatedCourses={relatedCourses}
        crossLinks={crossLinks}
      />
    </>
  )
}
