import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageSlugs, getSeoPageBySlug } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getExplainerPageJsonLd } from '@/lib/jsonld'
import ExplainerPageComponent from '@/components/guides/ExplainerPage'
import type { ExplainerSeoPage } from '@/types/seo-pages'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSeoPageSlugs('explainer')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getSeoPageBySlug(slug, 'explainer')

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      url: `${SITE_URL}/guide/${slug}/`,
      type: 'article',
    },
    alternates: {
      canonical: `${SITE_URL}/guide/${slug}/`,
    },
  }
}

export const revalidate = 3600

export default async function ExplainerPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getSeoPageBySlug(slug, 'explainer') as ExplainerSeoPage | null

  if (!page) {
    notFound()
  }

  const jsonLd = getExplainerPageJsonLd(page)

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
