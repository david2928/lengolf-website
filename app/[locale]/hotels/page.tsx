import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { setRequestLocale } from 'next-intl/server'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import { getSeoPagesByType } from '@/lib/seo-pages'
import { SITE_URL } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import type { HotelConciergeSeoPage } from '@/types/seo-pages'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const prefix = locale === 'en' ? '' : `/${locale}`
  return {
    title: 'Things To Do Near Your Hotel in Bangkok | LENGOLF',
    description:
      'Staying near BTS Chidlom? LENGOLF is minutes from Bangkok\'s top hotels — Grand Hyatt, InterContinental, Anantara, Okura and more. Find walking directions from your hotel.',
    alternates: {
      canonical: `${SITE_URL}${prefix}/hotels/`,
    },
  }
}

// Neighbourhood display order and BTS context
const NEIGHBOURHOOD_ORDER = [
  'Ratchaprasong / Chidlom',
  'Langsuan / Chidlom',
  'Ratchadamri / Ratchaprasong',
  'Wireless Road / Ploenchit',
  'Sukhumvit / Ploenchit',
  'Siam / CentralWorld',
] as const

const NEIGHBOURHOOD_BTS: Record<string, string> = {
  'Ratchaprasong / Chidlom': 'BTS Chidlom — walk direct',
  'Langsuan / Chidlom': 'BTS Chidlom — short walk',
  'Ratchadamri / Ratchaprasong': 'BTS Ratchadamri or Chidlom',
  'Wireless Road / Ploenchit': 'BTS Ploenchit — 1 stop or walk',
  'Sukhumvit / Ploenchit': 'BTS Ploenchit — 1 stop to Chidlom',
  'Siam / CentralWorld': 'BTS Siam — 1 stop to Chidlom',
}

function neighbourhoodAnchor(n: string) {
  return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="text-xs" style={{ color: '#7CB342' }}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  )
}

function HotelCard({ page }: { page: HotelConciergeSeoPage }) {
  const { hotel_name, hotel_distance_m, walking_time_mins, hotel_star_rating, hotel_neighbourhood } = page.content
  return (
    <Link
      href={`/hotels/${page.slug}` as Parameters<typeof Link>[0]['href']}
      className="group flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <StarRating stars={hotel_star_rating} />
        <span className="text-xs text-muted-foreground">{hotel_distance_m}m walk</span>
      </div>
      <h2 className="mb-1 text-base font-semibold leading-snug group-hover:text-[#005a32] transition-colors">
        {hotel_name}
      </h2>
      <p className="text-xs text-muted-foreground mb-1">
        {hotel_neighbourhood}
      </p>
      <p className="text-xs text-muted-foreground mb-3">
        {walking_time_mins} min walk to LENGOLF
      </p>
      {page.meta_description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mt-auto pt-1 border-t border-border">
          {page.meta_description}
        </p>
      )}
    </Link>
  )
}

export default async function HotelsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const pages = (await getSeoPagesByType('hotel_concierge')) as HotelConciergeSeoPage[]

  // Group by neighbourhood, then sort each group by distance
  const grouped = new Map<string, HotelConciergeSeoPage[]>()
  for (const n of NEIGHBOURHOOD_ORDER) grouped.set(n, [])

  for (const page of pages) {
    const n = page.content.hotel_neighbourhood
    if (!grouped.has(n)) grouped.set(n, [])
    grouped.get(n)!.push(page)
  }
  for (const [, hotels] of grouped) {
    hotels.sort((a, b) => a.content.hotel_distance_m - b.content.hotel_distance_m)
  }

  const totalCount = pages.length

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Near Your Hotel', url: `${SITE_URL}/hotels/` },
  ])

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Things To Do Near Your Hotel in Bangkok',
    description:
      'Walking directions and activity guides from Bangkok\'s top hotels to LENGOLF at Mercury Ville, BTS Chidlom.',
    url: `${SITE_URL}/hotels/`,
    numberOfItems: totalCount,
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
            Hotel Concierge
          </span>
          <h1 className="text-4xl font-black uppercase leading-tight md:text-5xl lg:text-6xl mb-4">
            Near Your Hotel<br />
            <span style={{ color: '#7CB342' }}>in Bangkok</span>
          </h1>
          <p className="text-base text-white/80 max-w-xl mb-8">
            LENGOLF is a short walk from {totalCount} of Bangkok&apos;s top hotels. Find step-by-step walking directions from your hotel.
          </p>
          {/* Neighbourhood jump links */}
          <div className="flex flex-wrap gap-2">
            {NEIGHBOURHOOD_ORDER.filter((n) => (grouped.get(n)?.length ?? 0) > 0).map((n) => (
              <a
                key={n}
                href={`#${neighbourhoodAnchor(n)}`}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              >
                {n}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Neighbourhood sections */}
      <SectionWrapper>
        <div className="flex flex-col gap-16">
          {NEIGHBOURHOOD_ORDER.filter((n) => (grouped.get(n)?.length ?? 0) > 0).map((n) => (
            <div key={n} id={neighbourhoodAnchor(n)} style={{ scrollMarginTop: '100px' }}>
              {/* Section header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 pb-4 border-b border-border">
                <div>
                  <p
                    className="text-[11px] uppercase tracking-widest font-semibold mb-1"
                    style={{ color: '#7CB342' }}
                  >
                    {NEIGHBOURHOOD_BTS[n] ?? 'BTS accessible'}
                  </p>
                  <h2 className="text-xl font-bold text-[#004225]">{n}</h2>
                </div>
                <span className="text-sm text-muted-foreground">
                  {grouped.get(n)!.length} hotel{grouped.get(n)!.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {grouped.get(n)!.map((page) => (
                  <HotelCard key={page.id} page={page} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA band */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
            Open Daily 10am–11pm
          </h2>
          <p className="mb-6 text-white/80">
            Walk-ins welcome. Floor 4, Mercury Ville, BTS Chidlom. No golf experience needed.
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
              { label: 'Pricing & FAQs', href: '/faq/' },
              { label: 'Bay Rates', href: '/golf' },
              { label: 'Events & Packages', href: '/events' },
              { label: 'Club Rental', href: '/golf-club-rental' },
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
