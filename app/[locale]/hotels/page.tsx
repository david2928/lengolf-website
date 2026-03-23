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

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="text-xs" style={{ color: '#7CB342' }}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  )
}

function HotelCard({ page }: { page: HotelConciergeSeoPage }) {
  const { hotel_name, hotel_distance_m, walking_time_mins, hotel_star_rating } = page.content
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

  // Sort by walking distance
  const sorted = [...pages].sort(
    (a, b) => a.content.hotel_distance_m - b.content.hotel_distance_m
  )

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
    numberOfItems: sorted.length,
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
          <p className="text-base text-white/80 max-w-xl">
            LENGOLF is a short walk from {sorted.length} of Bangkok&apos;s top hotels. Find step-by-step walking directions from your hotel.
          </p>
        </div>
      </section>

      {/* Card grid */}
      <SectionWrapper>
        <p className="mb-8 text-sm text-muted-foreground">Sorted by walking distance to LENGOLF</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((page) => (
            <HotelCard key={page.id} page={page} />
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
