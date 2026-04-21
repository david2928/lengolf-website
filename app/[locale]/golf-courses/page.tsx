import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { SITE_URL } from '@/lib/constants'
import { REGION_META, getCoursesByRegion } from '@/lib/golf-courses'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import { MapPin, ArrowRight, Flag } from 'lucide-react'
import HubMapExplorer from '@/components/golf-courses/HubMapExplorer'

interface Props {
  params: Promise<{ locale: string }>
}

const TITLE = 'Golf Courses in Thailand — Green Fees, Course Guides & Club Rental'
const DESCRIPTION =
  'Browse golf courses across Thailand by region. Compare green fees, read course guides, and arrange premium club rental for your round.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/golf-courses/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/golf-courses/`,
    type: 'website',
  },
}

export default async function GolfCoursesHubPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  // Load all regions dynamically from REGION_META — no manual list to maintain.
  const regionSlugs = Object.keys(REGION_META) as Array<keyof typeof REGION_META>
  const courseArrays = await Promise.all(regionSlugs.map((slug) => getCoursesByRegion(slug)))

  const hubRegions = regionSlugs.map((slug, i) => ({
    region: slug,
    label:    REGION_META[slug].label,
    courses:  courseArrays[i],
    pinColor: REGION_META[slug].pinColor,
  }))

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Golf Courses', url: `${SITE_URL}/golf-courses/` },
  ])

  const totalCourses = Object.values(REGION_META).reduce((sum, r) => sum + r.courseCount, 0)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#003d22]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#005a32]/50" />
          <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[#007a45]/25" />
          <div className="absolute right-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-accent/10" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
              <Flag className="h-3 w-3" aria-hidden="true" />
              Thailand Golf Guide
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Golf Courses in Thailand
            </h1>
            <p className="mb-6 text-base leading-relaxed text-white/75">
              Comprehensive guides for every tourist-facing golf course in Thailand — green fees, course layouts, tips, and how to get there. Currently covering {totalCourses} courses across {regionSlugs.length} region{regionSlugs.length !== 1 ? 's' : ''}.
            </p>
          </div>
        </div>

        {/* Bottom wave — decorative */}
        <div className="absolute -bottom-px left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 40V0c240 26.7 480 40 720 40S1200 26.7 1440 0v40H0z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Region cards */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regionSlugs.map((slug) => {
            const meta = REGION_META[slug]
            return (
              <Link
                key={slug}
                href={`/golf-courses/${slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-white shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
                      {meta.province}
                    </div>
                    <h3 className="mt-1 text-base font-black leading-snug text-foreground group-hover:text-primary">
                      {meta.label}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {meta.description}
                    </p>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-border/60 px-5 py-3.5">
                  <p className="text-sm font-bold text-foreground">
                    {meta.courseCount} <span className="font-medium text-muted-foreground">courses</span>
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                    View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Hub map */}
        <div className="mb-12">
          <HubMapExplorer regions={hubRegions} locale={locale} />
        </div>

        {/* LENGOLF rental CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#003d22] to-[#005a32] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-6 left-1/3 h-28 w-28 rounded-full bg-accent/10" aria-hidden="true" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                No clubs? No problem.
              </p>
              <p className="text-base font-medium text-white sm:text-lg">
                Rent premium clubs from our Bangkok simulator — Callaway Paradym, Warbird, Majesty. From <strong className="text-white">1,200 THB/day</strong>.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href="https://booking.len.golf/course-rental"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-[#1a1a1a] transition-all hover:bg-accent/90 hover:shadow-lg"
              >
                Book now
              </a>
              <Link
                href="/golf-course-club-rental"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
