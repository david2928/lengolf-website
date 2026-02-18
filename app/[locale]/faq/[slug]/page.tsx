import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageSlugs, getSeoPageBySlug } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getSeoFaqPageJsonLd } from '@/lib/jsonld'
import FaqPageComponent from '@/components/faq/FaqPage'
import type { FaqSeoPage } from '@/types/seo-pages'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSeoPageSlugs('faq')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getSeoPageBySlug(slug, 'faq')

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      url: `${SITE_URL}/faq/${slug}/`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/faq/${slug}/`,
    },
  }
}

export const revalidate = 3600

export default async function FaqPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getSeoPageBySlug(slug, 'faq') as FaqSeoPage | null

  if (!page) {
    notFound()
  }

  const jsonLd = getSeoFaqPageJsonLd(page)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqPageComponent data={page} />
    </>
  )
}
