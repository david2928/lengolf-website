import Link from 'next/link'
import { ArrowRight, Check, BookOpen } from 'lucide-react'
import { BOOKING_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import type { ExplainerSeoPage } from '@/types/seo-pages'

interface Props {
  data: ExplainerSeoPage
}

export default function ExplainerPageComponent({ data }: Props) {
  const { content } = data

  return (
    <div className="explainer-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] py-16 md:py-24 text-white">
        <div className="mx-auto max-w-[900px] px-5">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <BookOpen className="h-4 w-4" />
            <span>LENGOLF Guide</span>
          </div>
          <h1 className="text-3xl font-bold md:text-5xl mb-6">{data.title}</h1>
          <div className="flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d4a843] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#c49a3a]"
            >
              Book a Bay
            </a>
            <a
              href={SOCIAL_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              LINE Us
            </a>
          </div>
        </div>
      </section>

      {/* Intro Section (answer-first) */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[900px] px-5">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.intro}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      {content.sections.map((section, index) => (
        <section
          key={section.heading}
          className={`py-12 md:py-16 ${index % 2 === 0 ? 'bg-[#f8f9fa]' : ''}`}
        >
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-4">
              {section.heading}
            </h2>
            <div className="text-base leading-relaxed text-muted-foreground md:text-lg space-y-4">
              {section.body.split('\n\n').map((paragraph, pIdx) => {
                // Handle paragraphs that contain **bold** markers as sub-headings
                if (paragraph.startsWith('**') && paragraph.includes('** —')) {
                  const match = paragraph.match(/^\*\*(.+?)\*\*\s*—\s*(.+)$/)
                  if (match) {
                    return (
                      <p key={pIdx}>
                        <strong className="text-[#1a472a]">{match[1]}</strong> — {match[2]}
                      </p>
                    )
                  }
                }
                return <p key={pIdx}>{paragraph}</p>
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Comparison Table */}
      {content.comparison_table.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              Simulator vs Real Golf
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-[#2d6a4f]">
                    <th className="py-3 pr-4 text-left font-semibold text-[#1a472a]">Feature</th>
                    <th className="py-3 px-4 text-left font-semibold text-[#2d6a4f]">Golf Simulator</th>
                    <th className="py-3 pl-4 text-left font-semibold text-muted-foreground">Real Golf</th>
                  </tr>
                </thead>
                <tbody>
                  {content.comparison_table.map((row) => (
                    <tr key={row.feature} className="border-b border-border">
                      <td className="py-3 pr-4 font-medium text-[#1a472a]">{row.feature}</td>
                      <td className="py-3 px-4 text-[#2d6a4f]">{row.simulator}</td>
                      <td className="py-3 pl-4 text-muted-foreground">{row.real_golf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      {content.key_takeaways.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {content.key_takeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[#2d6a4f]" />
                  <span className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {takeaway}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] text-white text-center">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold md:text-3xl mb-4">Try It Yourself</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Experience indoor golf at LENGOLF, {BUSINESS_INFO.addressShort}. Open {BUSINESS_INFO.hours}. No experience needed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d4a843] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#c49a3a]"
            >
              Book Now
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {BUSINESS_INFO.phone}
            </a>
            <a
              href={SOCIAL_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              LINE Us
            </a>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      {data.related_slugs && data.related_slugs.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">Explore More</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {data.related_slugs.map((path) => {
                const label = path
                  .split('/')
                  .filter(Boolean)
                  .pop()!
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())
                return (
                  <Link
                    key={path}
                    href={path}
                    className="group flex items-center justify-between rounded-lg border p-4 transition-colors hover:border-[#2d6a4f] hover:bg-[#e8f5e9]"
                  >
                    <span className="text-sm font-medium text-[#1a472a] group-hover:text-[#2d6a4f]">
                      {label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#2d6a4f]" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
