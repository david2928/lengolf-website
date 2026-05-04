import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { SITE_URL } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import { getCourseRoundupJsonLd } from '@/lib/jsonld-courses'
import { BTS_STATIONS } from '@/data/bts-stations'
import { getCoursesNearStation, getStationSlugs } from '@/lib/golf-courses-derived'
import RoundupList from '@/components/golf-courses/RoundupList'
import CrossLinkBlock from '@/components/golf-courses/CrossLinkBlock'
import RentalCtaBanner from '@/components/golf-courses/RentalCtaBanner'
import { MapPin } from 'lucide-react'

interface Props {
  params: Promise<{ locale: string; station: string }>
}

export const revalidate = 86400

export async function generateStaticParams() {
  return getStationSlugs().map((station) => ({ station }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { station } = await params
  const meta = BTS_STATIONS[station]
  if (!meta) return { title: 'Station Not Found' }

  const title = `Best Golf Courses Near ${meta.name} BTS — Drive Times & Green Fees`
  const description = `Top golf courses ranked by distance from ${meta.name} BTS station, with drive times, weekday/weekend green fees, and on-site facilities.`
  const canonicalUrl = `${SITE_URL}/golf-courses/near/${station}/`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: 'website' },
  }
}

export default async function CoursesNearStationPage({ params }: Props) {
  const { locale, station } = await params
  setRequestLocale(locale)

  const meta = BTS_STATIONS[station]
  if (!meta) notFound()

  const items = await getCoursesNearStation(station, 8)
  if (items.length === 0) notFound()

  const canonicalUrl = `${SITE_URL}/golf-courses/near/${station}/`
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Golf Courses', url: `${SITE_URL}/golf-courses/` },
    { name: `Near ${meta.name}`, url: canonicalUrl },
  ])
  const listJsonLd = getCourseRoundupJsonLd(
    items.map((i) => i.course),
    canonicalUrl,
    `Best golf courses near ${meta.name} BTS`
  )

  // Sibling station cross-links
  const siblingStations = Object.values(BTS_STATIONS).filter((s) => s.slug !== station)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#003d22]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#005a32]/50" />
          <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[#007a45]/25" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-white/50">
            <Link href="/golf-courses" className="transition-colors hover:text-white/80">Golf Courses</Link>
            <span>/</span>
            <span className="text-white/70">Near {meta.name}</span>
          </nav>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            <MapPin className="h-3 w-3" /> {meta.name} · Bangkok
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Best Golf Courses Near {meta.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75">
            {meta.description}
          </p>
        </div>
        <div className="absolute -bottom-px left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 40V0c240 26.7 480 40 720 40S1200 26.7 1440 0v40H0z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <h2 className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
            Top {items.length} courses ranked by straight-line distance from {meta.name}
          </h2>
          <p className="mb-5 text-xs italic text-muted-foreground">
            Straight-line distance, not drive time. Bangkok traffic and expressway access can change actual travel
            time significantly — check Google Maps before tee-off.
          </p>
          <RoundupList
            items={items.map(({ course, km }) => ({
              course,
              reason: `${km.toFixed(1)} km from ${meta.name} BTS (straight line).`,
            }))}
          />
        </section>

        <RentalCtaBanner
          eyebrow={`No clubs in your ${meta.name} hotel?`}
          body={
            <>
              We deliver premium club sets to your hotel and pick them up after your round —
              from <strong className="text-white">1,200 THB/day</strong>. Or skip the drive entirely and
              practice at the LENGOLF simulator in Chidlom.
            </>
          }
        />

        <CrossLinkBlock
          heading="Other Bangkok BTS / district guides"
          items={siblingStations.map((s) => ({
            label: `Golf courses near ${s.name}`,
            href: `/golf-courses/near/${s.slug}`,
          }))}
        />

        {meta.areaSlug && (
          <CrossLinkBlock
            heading={`Hotels & things to do in ${meta.name}`}
            items={[
              {
                label: `${meta.name} area guide`,
                href: `/location/${meta.areaSlug}` as `/${string}`,
                description: 'Hotels, restaurants, and golf-friendly transit options in the area.',
              },
            ]}
          />
        )}
      </div>
    </>
  )
}
