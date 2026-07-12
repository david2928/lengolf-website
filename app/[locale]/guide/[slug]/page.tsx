import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSeoPageParams, getSeoPageBySlug, ROUTE_PREFIX_TO_TYPE } from '@/lib/seo-pages'
import { getAlternates, getCanonical } from '@/lib/translated-routes'
import { getExplainerPageJsonLd } from '@/lib/jsonld'
import ExplainerPageComponent from '@/components/guides/ExplainerPage'
import type { ExplainerSeoPage } from '@/types/seo-pages'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

// Related-link paths that point at other SEO pages resolve their label from
// the target page's (localized) title instead of title-casing the URL slug.
// Uses the canonical section map — a local copy here previously drifted
// (omitted activities/hotels), leaving those links with fallback labels.

// Core static pages referenced from related_slugs — labels come from the
// ExplainerPage.pathLabels i18n namespace (messages/*.json).
const STATIC_LABEL_PATHS = new Set([
  'golf',
  'lessons',
  'events',
  'golf-club-rental',
  'golf-course-club-rental',
  'golf-in-thailand-guide',
])

async function buildRelatedLabels(
  paths: string[] | null,
  locale: string
): Promise<Record<string, string>> {
  if (!paths || paths.length === 0) return {}
  const t = await getTranslations('ExplainerPage')
  const entries = await Promise.all(
    paths.map(async (path): Promise<[string, string] | null> => {
      const segments = path.split('/').filter(Boolean)
      // SEO pages (/guide/x, /faq/x, ...): localized title, EN fallback
      if (segments.length === 2 && ROUTE_PREFIX_TO_TYPE[segments[0]]) {
        const type = ROUTE_PREFIX_TO_TYPE[segments[0]]
        const target =
          (await getSeoPageBySlug(segments[1], type, locale)) ??
          (await getSeoPageBySlug(segments[1], type, 'en'))
        return target ? [path, target.title] : null
      }
      // Core static pages: label from the pathLabels namespace
      if (segments.length === 1 && STATIC_LABEL_PATHS.has(segments[0])) {
        return [path, t(`pathLabels.${segments[0]}`)]
      }
      return null // unknown paths keep the component's slug-derived fallback
    })
  )
  return Object.fromEntries(entries.filter((e): e is [string, string] => e !== null))
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

  // Only emit hreflang when a translation actually exists — a lone
  // self-referential hreflang="en" cluster is audit noise and would
  // contradict the sitemap, which applies the same guard.
  const languages = getAlternates(`/guide/${slug}/`)
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
      ...(Object.keys(languages).length > 1 ? { languages } : {}),
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
  }, locale)

  const relatedLabels = await buildRelatedLabels(page.related_slugs, locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExplainerPageComponent data={page} relatedLabels={relatedLabels} />
    </>
  )
}
