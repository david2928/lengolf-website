import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageParams, getSeoPageBySlug } from '@/lib/seo-pages'
import { getAlternates, getCanonical } from '@/lib/translated-routes'
import { getExplainerPageJsonLd } from '@/lib/jsonld'
import ExplainerPageComponent from '@/components/guides/ExplainerPage'
import type { ExplainerSeoPage } from '@/types/seo-pages'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  // Only build locale×slug combos that have published content — untranslated
  // locale URLs 301 to English via the middleware (lib/translated-routes.ts).
  return getAllSeoPageParams('explainer')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const page = await getSeoPageBySlug(slug, 'explainer', locale)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      url: getCanonical(locale, `/guide/${slug}/`),
      type: 'article',
    },
    alternates: {
      canonical: getCanonical(locale, `/guide/${slug}/`),
      languages: getAlternates(`/guide/${slug}/`),
    },
  }
}

export default async function ExplainerPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getSeoPageBySlug(slug, 'explainer', locale) as ExplainerSeoPage | null

  if (!page) {
    notFound()
  }

  const jsonLd = getExplainerPageJsonLd({
    title: page.title,
    slug: page.slug,
    meta_description: page.meta_description,
    created_at: page.created_at,
    updated_at: page.updated_at,
    content: page.content,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExplainerPageComponent data={page} />
    </>
  )
}
