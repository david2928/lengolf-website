import { StarRating } from '@/components/shared/StarRating'

interface Testimonial {
  text: string
  name: string
  nationality: string
  flag: string
  course: string
}

interface TestimonialsProps {
  title: string
  titleSuffix: string
  items: Testimonial[]
}

export default function Testimonials({ title, titleSuffix, items }: TestimonialsProps) {
  return (
    <section className="py-16 lg:py-24 bg-muted/40">
      <div className="section-max-width section-padding">
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>{title}</span>{' '}
          <span className="text-foreground">{titleSuffix}</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-xl border border-border/60 bg-white p-6 shadow-sm"
            >
              <StarRating rating={5} />
              <p className="flex-1 text-sm leading-relaxed text-foreground/80 italic">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="border-t border-border/40 pt-3">
                <p className="text-sm font-semibold text-foreground">{item.flag} {item.name}</p>
                <p className="text-xs text-muted-foreground">{item.nationality} · {item.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
