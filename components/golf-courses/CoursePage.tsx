import { MapPin, Clock, Phone, Globe, Check, X, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { GolfCourse } from '@/types/golf-courses'

interface Props {
  course: GolfCourse
}

function thb(n: number | null): string | null {
  if (n === null) return null
  return n.toLocaleString('en-US') + ' THB'
}

export default function CoursePage({ course }: Props) {
  const regionLabel = course.region.charAt(0).toUpperCase() + course.region.slice(1)

  // Quick-fact chips shown in the hero
  const chips = [
    course.holes ? `${course.holes} holes · Par ${course.par}` : null,
    course.designer ? `Designed by ${course.designer}` : null,
    course.year_opened ? `Est. ${course.year_opened}` : null,
    course.drive_time_from_bangkok_min
      ? `~${course.drive_time_from_bangkok_min} min from Bangkok`
      : null,
  ].filter(Boolean) as string[]

  const proseSections = [
    { label: 'Layout & playing experience', content: course.prose.layout_and_experience },
    { label: 'Tips & what to know before you go', content: course.prose.tips },
    { label: 'Location & getting there', content: course.prose.location_and_access },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#003d22]">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#005a32]/50" />
          <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[#007a45]/25" />
          <div className="absolute right-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-accent/10" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-white/50">
            <Link href="/golf-courses" className="transition-colors hover:text-white/80">Golf Courses</Link>
            <span>/</span>
            <Link href={`/golf-courses/${course.region}`} className="capitalize transition-colors hover:text-white/80">{regionLabel}</Link>
            <span>/</span>
            <span className="text-white/70">{course.name}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              {/* Province badge */}
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                <MapPin className="h-3 w-3" />
                {course.province}
              </div>

              <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {course.name}
              </h1>

              {/* Chip row */}
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Green fee highlight — shown when data is available */}
            {course.green_fee_weekday_thb && (
              <div className="shrink-0 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-right backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">Weekday green fee</p>
                <p className="mt-0.5 text-3xl font-black text-white">
                  {course.green_fee_weekday_thb.toLocaleString('en-US')}
                  <span className="ml-1 text-base font-semibold text-white/70">THB</span>
                </p>
                {course.green_fee_weekend_thb && (
                  <p className="mt-1 text-xs text-white/50">
                    Weekend: {course.green_fee_weekend_thb.toLocaleString('en-US')} THB
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 40V0c240 26.7 480 40 720 40S1200 26.7 1440 0v40H0z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── Left column ── */}
          <div className="min-w-0 space-y-8">

            {/* Overview prose */}
            <p className="text-base leading-relaxed text-foreground/85">
              {course.prose.overview}
            </p>

            {/* Stat strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Holes', value: course.holes ? String(course.holes) : null },
                { label: 'Par', value: course.par ? String(course.par) : null },
                {
                  label: 'From Bangkok',
                  value: course.distance_from_bangkok_km
                    ? `${course.distance_from_bangkok_km} km`
                    : null,
                },
                {
                  label: 'Drive time',
                  value: course.drive_time_from_bangkok_min
                    ? `~${course.drive_time_from_bangkok_min} min`
                    : null,
                },
              ]
                .filter((s) => s.value)
                .map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3"
                  >
                    <p className="text-xl font-black" style={{ color: '#007429' }}>
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
            </div>

            {/* Prose sections */}
            <div className="space-y-6">
              {proseSections.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-white p-5 shadow-sm">
                  <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
                    {s.label}
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground/80">{s.content}</p>
                </div>
              ))}
            </div>

            {/* Rental CTA banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#003d22] to-[#005a32] p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
              <div className="pointer-events-none absolute -bottom-6 left-1/3 h-28 w-28 rounded-full bg-accent/10" />
              <p className="relative mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
                No clubs? No problem.
              </p>
              <p className="relative mb-5 text-base font-medium leading-snug text-white sm:text-lg">
                {course.prose.rental_cta_context}
              </p>
              <div className="relative flex flex-wrap gap-3">
                <a
                  href="https://booking.len.golf/course-rental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-[#1a1a1a] transition-all hover:bg-accent/90 hover:shadow-lg"
                >
                  Book now
                </a>
                <a
                  href="https://www.len.golf/golf-course-club-rental/"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <aside className="space-y-5">

            {/* Green fees card */}
            {(course.green_fee_weekday_thb || course.green_fee_weekend_thb) && (
              <div className="overflow-hidden rounded-2xl border shadow-sm">
                <div className="bg-primary px-5 py-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-white/80">
                    Green Fees
                  </h2>
                </div>
                <div className="divide-y bg-white">
                  {course.green_fee_weekday_thb && (
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-sm text-muted-foreground">Weekday</span>
                      <span className="font-bold text-foreground">
                        {course.green_fee_weekday_thb.toLocaleString('en-US')} THB
                      </span>
                    </div>
                  )}
                  {course.green_fee_weekend_thb && (
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-sm text-muted-foreground">Weekend</span>
                      <span className="font-bold text-foreground">
                        {course.green_fee_weekend_thb.toLocaleString('en-US')} THB
                      </span>
                    </div>
                  )}
                  {course.caddie_fee_thb !== null && course.caddie_fee_thb > 0 && (
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-sm text-muted-foreground">Caddie</span>
                      <span className="font-bold text-foreground">
                        {course.caddie_fee_thb.toLocaleString('en-US')} THB
                      </span>
                    </div>
                  )}
                  {course.cart_fee_thb !== null && course.cart_fee_thb > 0 && (
                    <div className="flex items-center justify-between px-5 py-3.5">
                      <span className="text-sm text-muted-foreground">Cart</span>
                      <span className="font-bold text-foreground">
                        {course.cart_fee_thb.toLocaleString('en-US')} THB
                      </span>
                    </div>
                  )}
                </div>
                <p className="bg-muted/50 px-5 py-2.5 text-[11px] text-muted-foreground">
                  Verify with the course before booking.
                </p>
              </div>
            )}

            {/* Facilities */}
            <div className="overflow-hidden rounded-2xl border shadow-sm">
              <div className="bg-[#f6fffa] px-5 py-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                  Facilities
                </h2>
              </div>
              <div className="divide-y bg-white">
                {[
                  { label: 'Caddie required', value: course.caddie_required },
                  { label: 'Cart required', value: course.cart_required },
                  { label: 'Driving range', value: course.driving_range },
                ]
                  .filter((f) => f.value !== null)
                  .map((f) => (
                    <div key={f.label} className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-muted-foreground">{f.label}</span>
                      {f.value ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          <Check className="h-3 w-3" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                          <X className="h-3 w-3" /> No
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Contact */}
            {(course.phone || course.website || course.google_maps_url) && (
              <div className="overflow-hidden rounded-2xl border shadow-sm">
                <div className="bg-[#f6fffa] px-5 py-3">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                    Contact & Links
                  </h2>
                </div>
                <div className="divide-y bg-white">
                  {course.phone && (
                    <a
                      href={`tel:${course.phone}`}
                      className="flex items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-muted/40"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-primary" />
                      <span>{course.phone}</span>
                    </a>
                  )}
                  {course.website && (
                    <a
                      href={course.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-muted/40"
                    >
                      <Globe className="h-4 w-4 shrink-0 text-primary" />
                      <span>Official website</span>
                    </a>
                  )}
                  {course.google_maps_url && (
                    <a
                      href={course.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-muted/40"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span>Google Maps</span>
                    </a>
                  )}
                  {course.drive_time_from_bangkok_min && (
                    <div className="flex items-center gap-3 px-5 py-3.5 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span>~{course.drive_time_from_bangkok_min} min from Bangkok</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LENGOLF rental nudge */}
            <div className="rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 to-accent/5 p-5">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-accent" style={{ color: '#b8892e' }}>
                LENGOLF Club Rental
              </p>
              <p className="mb-3 text-sm leading-relaxed text-foreground">
                Premium clubs delivered to your Bangkok hotel. Callaway Paradym, Warbird, Majesty. From <strong>1,200 THB/day</strong>.
              </p>
              <Link
                href="/golf-course-club-rental"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
              >
                See packages <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
