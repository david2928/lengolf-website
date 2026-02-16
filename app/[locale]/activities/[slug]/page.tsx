import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageSlugs, getSeoPageBySlug } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getActivityPageJsonLd } from '@/lib/jsonld'
import ActivityPageComponent from '@/components/activities/ActivityPage'
import type { ActivityOccasionSeoPage } from '@/types/seo-pages'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSeoPageSlugs('activity_occasion')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getSeoPageBySlug(slug, 'activity_occasion')

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.title,
    description: page.meta_description || undefined,
    openGraph: {
      title: page.title,
      description: page.meta_description || undefined,
      url: `${SITE_URL}/activities/${slug}/`,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/activities/${slug}/`,
    },
  }
}

export const revalidate = 3600

export default async function ActivityPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const page = await getSeoPageBySlug(slug, 'activity_occasion') as ActivityOccasionSeoPage | null

  if (!page) {
    notFound()
  }

  const jsonLd = getActivityPageJsonLd(page)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ActivityPageComponent data={page} />
    </>
  )
}
