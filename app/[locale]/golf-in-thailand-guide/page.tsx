import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { setRequestLocale } from 'next-intl/server'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import { getSeoPagesByType } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import type { SeoPage } from '@/types/seo-pages'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const prefix = locale === 'en' ? '' : `/${locale}`
  return {
    title: 'Plan Your Golf Trip to Thailand | Prices, FAQs & Guides',
    description:
      'Everything you need to plan your golf trip to Thailand — how much it costs, what to expect, club rental, lessons, and corporate events. Updated 2026.',
    alternates: {
      canonical: `${SITE_URL}${prefix}/golf-in-thailand-guide/`,
    },
  }
}

type Section = {
  heading: string
  description: string
  pages: SeoPage[]
  urlPrefix: string
}

const CATEGORY_LABELS: Record<string, string> = {
  rental: 'Club Rental',
  pricing: 'Pricing',
  general: 'General',
  lessons: 'Lessons',
  events: 'Corporate Events',
}

function CategoryPill({ category }: { category: string | null }) {
  if (!category) return null
  const label = CATEGORY_LABELS[category] ?? category
  return (
    <span
      className="inline-block rounded-full px-3 py-0.5 text-xs font-medium"
      style={{ backgroundColor: '#E6F4EC', color: '#005a32' }}
    >
      {label}
    </span>
  )
}

function PageCard({ page, urlPrefix }: { page: SeoPage; urlPrefix: string }) {
  return (
    <Link
      href={`${urlPrefix}/${page.slug}` as Parameters<typeof Link>[0]['href']}
      className="group flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3">
        <CategoryPill category={page.category} />
      </div>
      <h2 className="mb-2 text-base font-semibold leading-snug group-hover:text-[#005a32] transition-colors">
        {page.title}
      </h2>
      {page.meta_description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mt-auto pt-2">
          {page.meta_description}
        </p>
      )}
    </Link>
  )
}

function SectionBlock({ section }: { section: Section }) {
  if (section.pages.length === 0) return null
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#005a32' }}>{section.heading}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {section.pages.map((page) => (
          <PageCard key={page.id} page={page} urlPrefix={section.urlPrefix} />
        ))}
      </div>
    </div>
  )
}

export default async function PlanningHubPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const [faqPages, costPages, guidePages] = await Promise.all([
    getSeoPagesByType('faq'),
    getSeoPagesByType('price_guide'),
    getSeoPagesByType('explainer'),
  ])

  const sections: Section[] = [
    {
      heading: 'Frequently Asked Questions',
      description: 'Quick answers to the most common questions about indoor golf in Bangkok.',
      pages: faqPages,
      urlPrefix: '/faq',
    },
    {
      heading: 'Pricing & Cost Guides',
      description: 'Detailed breakdowns of what golf costs in Bangkok — simulators, lessons, club rental, and corporate events.',
      pages: costPages,
      urlPrefix: '/cost',
    },
    {
      heading: 'In-Depth Guides',
      description: 'Everything you need to know about how golf simulators work and what to expect.',
      pages: guidePages,
      urlPrefix: '/guide',
    },
  ]

  const totalPages = faqPages.length + costPages.length + guidePages.length

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Plan Your Golf Trip to Thailand', url: `${SITE_URL}/golf-in-thailand-guide/` },
  ])

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Plan Your Golf Trip to Thailand',
    description:
      'Pricing guides, FAQs, and in-depth explainers to help you plan the perfect golf experience in Bangkok.',
    url: `${SITE_URL}/golf-in-thailand-guide/`,
    numberOfItems: totalPages,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      {/* Hero */}
      <section
        className="flex items-center text-white"
        style={{
          background: 'linear-gradient(135deg, #003d1f 0%, #005a32 50%, #007429 100%)',
          minHeight: '280px',
          padding: '60px 6% 50px',
        }}
      >
        <div className="w-full">
          <span
            className="inline-block rounded px-5 py-1.5 text-sm font-bold uppercase tracking-widest text-white mb-4"
            style={{ backgroundColor: '#7CB342' }}
          >
            Golf Travel Guide
          </span>
          <h1 className="text-4xl font-black uppercase leading-tight md:text-5xl lg:text-6xl mb-4">
            Plan Your Golf Trip<br />
            <span style={{ color: '#7CB342' }}>to Thailand</span>
          </h1>
          <p className="text-base text-white/80 max-w-xl">
            {totalPages} guides covering costs, FAQs, club rental, lessons, and everything else you need to know before you visit LENGOLF.
          </p>
        </div>
      </section>

      {/* Sections */}
      <SectionWrapper>
        <div className="flex flex-col gap-16">
          {sections.map((section) => (
            <SectionBlock key={section.urlPrefix} section={section} />
          ))}
        </div>
      </SectionWrapper>

      {/* CTA band */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
            Ready to Book Your Bay?
          </h2>
          <p className="mb-6 text-white/80">
            LENGOLF at Mercury Ville (BTS Chidlom) — open daily 9am–11pm, no experience needed.
          </p>
          <BookingCTA text="Book a Bay" className="bg-white text-primary hover:bg-white/90" />
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-6 text-xl font-semibold" style={{ color: '#005a32' }}>
            Explore more
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Things To Do in Bangkok', href: '/activities/' },
              { label: 'Near Your Hotel', href: '/hotels/' },
              { label: 'Bay Rates', href: '/golf' },
              { label: 'Events & Packages', href: '/events' },
              { label: 'Golf Lessons', href: '/lessons' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href as Parameters<typeof Link>[0]['href']}
                className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-primary hover:text-white"
                style={{ color: '#007429' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
