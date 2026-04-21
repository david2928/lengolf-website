import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseBySlug, getAllCourseParams, REGION_META } from '@/lib/golf-courses'
import type { Region } from '@/lib/golf-courses'
import { SITE_URL } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import CoursePage from '@/components/golf-courses/CoursePage'

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
  const canonicalUrl = `${SITE_URL}/golf-courses/${region}/${slug}/`

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
      <CoursePage course={course} regionLabel={regionLabel} />
    </>
  )
}
