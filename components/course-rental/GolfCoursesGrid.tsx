import { BANGKOK_GOLF_COURSES } from '@/lib/bangkok-golf-courses'

interface GolfCoursesGridProps {
  title: string
  titleSuffix: string
  subtitle: string
  ctaText: string
  bookingUrl: string
}

export default function GolfCoursesGrid({ title, titleSuffix, subtitle, ctaText, bookingUrl }: GolfCoursesGridProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="section-max-width section-padding">
        <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>{title}</span>{' '}
          <span className="text-foreground">{titleSuffix}</span>
        </h2>
        <p className="mb-10 text-center text-muted-foreground">{subtitle}</p>
        <div className="mx-auto max-w-4xl grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-10">
          {BANGKOK_GOLF_COURSES.map((course) => (
            <div
              key={course.name}
              className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-center"
            >
              <p className="text-sm font-semibold text-foreground leading-tight">{course.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{course.location}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: '#007429' }}
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}
