import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { SITE_URL } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import { getCourseRoundupJsonLd } from '@/lib/jsonld-courses'
import { PRICE_TIERS } from '@/data/price-tiers'
import { getCoursesUnderPrice, getPriceTierSlugs } from '@/lib/golf-courses-derived'
import RoundupList from '@/components/golf-courses/RoundupList'
import CrossLinkBlock from '@/components/golf-courses/CrossLinkBlock'
import RentalCtaBanner from '@/components/golf-courses/RentalCtaBanner'

interface Props {
  params: Promise<{ locale: string; tier: string }>
}

export const revalidate = 86400

export async function generateStaticParams() {
  return getPriceTierSlugs().map((tier) => ({ tier }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tier } = await params
  const meta = PRICE_TIERS.find((t) => t.slug === tier)
  if (!meta) return { title: 'Price Tier Not Found' }

  const description = `Top Bangkok-area golf courses with weekday green fees under ฿${meta.thb.toLocaleString('en-US')}, with what to expect at this price band.`
  const canonicalUrl = `${SITE_URL}/golf-courses/under/${tier}/`

  return {
    title: meta.title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title: meta.title, description, url: canonicalUrl, type: 'website' },
  }
}

export default async function CoursesUnderPricePage({ params }: Props) {
  const { locale, tier } = await params
  setRequestLocale(locale)

  const meta = PRICE_TIERS.find((t) => t.slug === tier)
  if (!meta) notFound()

  const courses = await getCoursesUnderPrice(meta.thb, 12)
  if (courses.length === 0) notFound()

  const canonicalUrl = `${SITE_URL}/golf-courses/under/${tier}/`
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Golf Courses', url: `${SITE_URL}/golf-courses/` },
    { name: meta.title, url: canonicalUrl },
  ])
  const listJsonLd = getCourseRoundupJsonLd(courses, canonicalUrl, meta.title)

  const otherTiers = PRICE_TIERS.filter((t) => t.slug !== tier)

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
            <span className="text-white/70">Under ฿{meta.thb.toLocaleString('en-US')}</span>
          </nav>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            Weekday green fee · Under ฿{meta.thb.toLocaleString('en-US')}
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75">
            {meta.framing}
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
        {/* What's the catch */}
        <section className="rounded-2xl border border-accent/30 bg-accent/5 p-5">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: '#b8892e' }}>
            What&apos;s the catch?
          </h2>
          <p className="text-sm leading-relaxed text-foreground/85">{meta.catch}</p>
        </section>

        <section>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
            Top {courses.length} courses, weekday fee under ฿{meta.thb.toLocaleString('en-US')}
          </h2>
          <RoundupList
            items={courses.map((c) => ({
              course: c,
              reason:
                c.green_fee_weekday_thb !== null
                  ? `Weekday from ${c.green_fee_weekday_thb.toLocaleString('en-US')} THB.`
                  : '',
            }))}
          />
        </section>

        <RentalCtaBanner />

        <CrossLinkBlock
          heading="Other price bands"
          items={otherTiers.map((t) => ({
            label: t.title.replace('Best Bangkok-Area Golf Courses ', ''),
            href: `/golf-courses/under/${t.slug}`,
          }))}
        />
      </div>
    </>
  )
}
