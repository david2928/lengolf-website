import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCourseBySlug, getAllCourseParams } from '@/lib/golf-courses'
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

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Golf Courses', url: `${SITE_URL}/golf-courses/` },
    {
      name: region.charAt(0).toUpperCase() + region.slice(1),
      url: `${SITE_URL}/golf-courses/${region}/`,
    },
    { name: course.name, url: `${SITE_URL}/golf-courses/${region}/${slug}/` },
  ])

  const schemaMarkup = JSON.parse(course.schema_markup)
  // Fill in the description from prose at render time
  schemaMarkup.description = course.prose.overview

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <CoursePage course={course} />
    </>
  )
}
