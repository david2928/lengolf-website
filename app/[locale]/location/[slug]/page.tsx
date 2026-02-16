import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocationBySlug, getAllLocationSlugs } from '@/lib/locations'
import { SITE_URL } from '@/lib/constants'
import LocationPageComponent from '@/components/location/LocationPage'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllLocationSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getLocationBySlug(slug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.h1_title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.h1_title,
      description: page.meta_description || undefined,
      url: `${SITE_URL}/location/${slug}/`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/location/${slug}/`,
      languages: {
        en: `${SITE_URL}/location/${slug}/`,
        th: `${SITE_URL}/th/location/${slug}/`,
      },
    },
  }
}

export const revalidate = 3600

export default async function LocationPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getLocationBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      {/* JSON-LD Schema */}
      {page.schema_markup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema_markup) }}
        />
      )}
      <LocationPageComponent data={page} />
    </>
  )
}
