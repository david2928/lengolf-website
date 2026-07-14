import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

interface Props {
  /** Override the eyebrow text (default: "No clubs? No problem."). */
  eyebrow?: string
  /** Override the body line (default: the standard rental pitch). */
  body?: React.ReactNode
}

/**
 * The standard LENGOLF club-rental CTA banner reused across the
 * programmatic-SEO course pages. Mirrors the inline pattern in
 * components/golf-courses/CoursePage.tsx so the visual identity stays
 * consistent across the section.
 */
export default function RentalCtaBanner({ eyebrow, body }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#003d22] to-[#005a32] p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-6 left-1/3 h-28 w-28 rounded-full bg-accent/10" aria-hidden="true" />
      <p className="relative mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow ?? 'No clubs? No problem.'}
      </p>
      <p className="relative mb-5 text-base font-medium leading-snug text-white sm:text-lg">
        {body ?? (
          <>
            Rent premium clubs delivered to your Bangkok hotel — Callaway Paradym, Warbird,
            Majesty. From <strong className="text-white">1,200 THB/day</strong>. No baggage
            fees, no airport hassle.
          </>
        )}
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
        <Link
          href="/golf-course-club-rental"
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Learn more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
