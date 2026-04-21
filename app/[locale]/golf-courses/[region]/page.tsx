import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { getCoursesByRegion, REGION_META } from '@/lib/golf-courses'
import { SITE_URL } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import { ArrowRight } from 'lucide-react'
import CourseMapExplorer from '@/components/golf-courses/CourseMapExplorer'

interface Props {
  params: Promise<{ locale: string; region: string }>
}

export async function generateStaticParams() {
  return Object.keys(REGION_META).map((region) => ({ region }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params
  const meta = REGION_META[region]
  if (!meta) return { title: 'Region Not Found' }

  const canonicalUrl = `${SITE_URL}/golf-courses/${region}/`
  const title = `Golf Courses in ${meta.label} — Green Fees & Course Guides`
  const description = `Explore ${meta.courseCount} golf courses in ${meta.label}. Compare green fees, course ratings, and arrange golf club rental delivered to your hotel.`

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, type: 'website' },
  }
}

export default async function RegionIndexPage({ params }: Props) {
  const { locale, region } = await params
  setRequestLocale(locale)

  const meta = REGION_META[region]
  if (!meta) notFound()

  const courses = await getCoursesByRegion(region)
  if (courses.length === 0) notFound()

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Golf Courses', url: `${SITE_URL}/golf-courses/` },
    { name: meta.label, url: `${SITE_URL}/golf-courses/${region}/` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#003d22]">
        {/* Grain texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#005a32]/60 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#007a45]/30 blur-2xl" />
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#c8a96e]/5 blur-2xl" />
        </div>

        {/* Thin diagonal rule — luxury editorial accent */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(135deg, #c8a96e 0px, #c8a96e 1px, transparent 1px, transparent 60px)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[11px] font-medium tracking-wider text-white/40">
            <Link href="/golf-courses" className="uppercase transition-colors hover:text-white/70">Golf Courses</Link>
            <span className="opacity-40">/</span>
            <span className="uppercase text-white/60">{meta.label}</span>
          </nav>

          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#c8a96e]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8a96e]">
                {meta.province}
              </span>
            </div>

            <h1 className="mb-5 font-sans text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Golf Courses<br />
              <span className="text-white/60">in {meta.label}</span>
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-white/60">{meta.description}</p>
          </div>
        </div>

      </section>

      {/* ── Map explorer + roster ── */}
      <div className="bg-[#f8faf9] pb-8 pt-0">
        {/* Map card overlaps hero — negative margin pulls it up into the dark section */}
        <div className="mx-auto -mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
            <CourseMapExplorer courses={courses} region={region} />
          </div>
        </div>

        {/* ── LENGOLF rental CTA ── */}
        <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#003d22] px-6 py-8 sm:px-10">
            {/* Diagonal accent lines */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'repeating-linear-gradient(135deg, #c8a96e 0px, #c8a96e 1px, transparent 1px, transparent 40px)',
              }}
            />
            <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#c8a96e]/10 blur-2xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-px w-5 bg-[#c8a96e]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8a96e]">
                    No clubs? No problem.
                  </span>
                </div>
                <p className="max-w-md text-base font-medium leading-relaxed text-white/90 sm:text-lg">
                  Rent premium clubs from our Bangkok simulator —{' '}
                  <span className="font-bold text-white">Callaway Paradym, Warbird, Majesty.</span>{' '}
                  From <span className="font-bold text-[#c8a96e]">1,200 THB/day</span>.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href="https://booking.len.golf/course-rental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c8a96e] px-6 py-3 text-sm font-bold text-[#1a1a1a] transition-all hover:bg-[#d4b87e] hover:shadow-lg"
                >
                  Book now
                </a>
                <Link
                  href="/golf-course-club-rental"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
