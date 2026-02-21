import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageSlugs, getSeoPageBySlug } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getPriceGuidePageJsonLd } from '@/lib/jsonld'
import PriceGuidePageComponent from '@/components/prices/PriceGuidePage'
import type { PriceGuideSeoPage } from '@/types/seo-pages'
import { routing } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSeoPageSlugs('price_guide')
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getSeoPageBySlug(slug, 'price_guide')

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      url: `${SITE_URL}/cost/${slug}/`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/cost/${slug}/`,
    },
  }
}

export default async function PriceGuidePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getSeoPageBySlug(slug, 'price_guide') as PriceGuideSeoPage | null

  if (!page) {
    notFound()
  }

  const jsonLd = getPriceGuidePageJsonLd(page)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PriceGuidePageComponent data={page} />
    </>
  )
}
