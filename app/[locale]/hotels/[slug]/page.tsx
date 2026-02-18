import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageSlugs, getSeoPageBySlug } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getHotelConciergePageJsonLd } from '@/lib/jsonld'
import HotelConciergePage from '@/components/hotels/HotelConciergePage'
import type { HotelConciergeSeoPage } from '@/types/seo-pages'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSeoPageSlugs('hotel_concierge')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getSeoPageBySlug(slug, 'hotel_concierge')

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      url: `${SITE_URL}/hotels/${slug}/`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/hotels/${slug}/`,
    },
  }
}

export const revalidate = 3600

export default async function HotelConciergeSeoPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getSeoPageBySlug(slug, 'hotel_concierge') as HotelConciergeSeoPage | null

  if (!page) {
    notFound()
  }

  const jsonLd = getHotelConciergePageJsonLd(page)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HotelConciergePage data={page} />
    </>
  )
}
