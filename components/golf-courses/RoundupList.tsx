import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { GolfCourse } from '@/types/golf-courses'
import { driveTimeLabel } from '@/lib/format'

export interface RoundupItem {
  course: GolfCourse
  /** 1-line reason composed by the parent page (use-case fit, distance km, etc.). */
  reason: string
}

interface Props {
  items: RoundupItem[]
}

/** First sentence of `prose.overview` — used as the pull quote. */
function firstSentence(text: string): string {
  const m = text.match(/^[^.!?]*[.!?]/)
  return (m ? m[0] : text).trim()
}

export default function RoundupList({ items }: Props) {
  return (
    <ol className="space-y-4">
      {items.map((item, idx) => {
        const c = item.course
        return (
          <li key={c.slug}>
            <Link
              href={`/golf-courses/${c.region}/${c.slug}`}
              className="group flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-px hover:border-primary/30 hover:shadow-md sm:p-5"
            >
              {/* Rank */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-black text-primary">
                {idx + 1}
              </div>

              {/* Body */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <h3 className="text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    {c.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    <MapPin className="h-2.5 w-2.5" />
                    {c.province}
                  </span>
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-foreground/80 line-clamp-2">
                  {firstSentence(c.prose.overview)}
                </p>

                {/* Chips: fee + drive time + reason */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  {c.green_fee_weekday_thb !== null && (
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      from {c.green_fee_weekday_thb.toLocaleString('en-US')} THB
                    </span>
                  )}
                  {c.drive_time_from_bangkok_min && (
                    <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                      {driveTimeLabel(c.drive_time_from_bangkok_min, false)}
                    </span>
                  )}
                </div>

                {item.reason && (
                  <p className="mt-2 text-xs italic text-muted-foreground">
                    {item.reason}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
