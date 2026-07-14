import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageSlugs, getSeoPageBySlug } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getBestOfListiclePageJsonLd } from '@/lib/jsonld'
import BestOfListiclePageComponent from '@/components/best/BestOfListiclePage'
import type { BestOfListicleSeoPage } from '@/types/seo-pages'
import { routing } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSeoPageSlugs('best_of_listicle')
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getSeoPageBySlug(slug, 'best_of_listicle')

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      url: `${SITE_URL}/best/${slug}/`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/best/${slug}/`,
    },
  }
}

export default async function BestOfListiclePage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getSeoPageBySlug(slug, 'best_of_listicle') as BestOfListicleSeoPage | null

  if (!page) {
    notFound()
  }

  const jsonLd = getBestOfListiclePageJsonLd(page)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BestOfListiclePageComponent data={page} />
    </>
  )
}
