import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageSlugs, getSeoPageBySlug } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getBestOfListiclePageJsonLd } from '@/lib/jsonld'
import BestOfListiclePageComponent from '@/components/best/BestOfListiclePage'
import type { BestOfListicleSeoPage } from '@/types/seo-pages'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  // EN-only: these pages have no translations (not in lib/translated-routes.ts),
  // so the middleware 301s every non-EN URL to English — building locale
  // copies was dead weight.
  const slugs = await getAllSeoPageSlugs('best_of_listicle')
  return slugs.map((slug) => ({ locale: 'en', slug }))
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
