import Link from 'next/link'
import { ArrowRight, Check, HelpCircle } from 'lucide-react'
import { BOOKING_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import type { FaqSeoPage } from '@/types/seo-pages'

interface Props {
  data: FaqSeoPage
}

export default function FaqPageComponent({ data }: Props) {
  const { content } = data

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] py-16 md:py-24 text-white">
        <div className="mx-auto max-w-[900px] px-5">
          <p className="text-sm font-medium uppercase tracking-wider text-[#d4a843] mb-4">
            Frequently Asked Question
          </p>
          <h1 className="text-3xl font-bold md:text-5xl mb-8">{data.title}</h1>
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

      {/* Direct Answer (answer-first) */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[900px] px-5">
          <div className="rounded-xl border-l-4 border-[#2d6a4f] bg-[#f0f7f2] p-6 md:p-8">
            <p className="text-base font-medium leading-relaxed text-[#1a472a] md:text-lg">
              {content.answer_intro}
            </p>
          </div>
        </div>
      </section>

      {/* Expanded Content */}
      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-[900px] px-5">
          <div className="prose prose-lg max-w-none text-muted-foreground prose-headings:text-[#1a472a] prose-strong:text-[#1a472a]">
            {content.answer_body.split('\n\n').map((paragraph, i) => {
              // Handle markdown-style bold headers
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                const text = paragraph.replace(/\*\*/g, '')
                return (
                  <h3 key={i} className="text-xl font-bold text-[#1a472a] mt-8 mb-3">
                    {text}
                  </h3>
                )
              }
              // Handle paragraphs that start with a bold header
              if (paragraph.startsWith('**')) {
                const match = paragraph.match(/^\*\*(.+?)\*\*\n?([\s\S]*)$/)
                if (match) {
                  return (
                    <div key={i}>
                      <h3 className="text-xl font-bold text-[#1a472a] mt-8 mb-3">{match[1]}</h3>
                      {match[2] && renderParagraph(match[2], `${i}-body`)}
                    </div>
                  )
                }
              }
              return renderParagraph(paragraph, i)
            })}
          </div>
        </div>
      </section>

      {/* LENGOLF Feature Pills */}
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
            About LENGOLF
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#e8f5e9] px-4 py-2 text-sm text-[#2d6a4f]">
              <Check className="h-4 w-4" />
              500 THB/hour for up to 5 people
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#e8f5e9] px-4 py-2 text-sm text-[#2d6a4f]">
              <Check className="h-4 w-4" />
              Mercury Ville, BTS Chidlom (Exit 4)
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#e8f5e9] px-4 py-2 text-sm text-[#2d6a4f]">
              <Check className="h-4 w-4" />
              Air-conditioned, rain-proof, open until late
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] text-white text-center">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold md:text-3xl mb-4">Ready to Try It?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Book a bay at LENGOLF, {BUSINESS_INFO.addressShort}. Open {BUSINESS_INFO.hours}.
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

      {/* Related Questions */}
      {content.related_questions.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">Related Questions</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {content.related_questions.map((rq) => (
                <Link
                  key={rq.slug}
                  href={`/faq/${rq.slug}`}
                  className="group flex items-start gap-3 rounded-lg border p-4 transition-colors hover:border-[#2d6a4f] hover:bg-[#e8f5e9]"
                >
                  <HelpCircle className="h-5 w-5 mt-0.5 shrink-0 text-[#d4a843] group-hover:text-[#2d6a4f]" />
                  <span className="text-sm font-medium text-[#1a472a] group-hover:text-[#2d6a4f]">
                    {rq.question}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Pages */}
      {data.related_slugs && data.related_slugs.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
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
                    className="group flex items-center justify-between rounded-lg border bg-white p-4 transition-colors hover:border-[#2d6a4f] hover:bg-[#e8f5e9]"
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

/** Render a content paragraph, handling bullet lists and inline bold */
function renderParagraph(text: string, key: string | number) {
  // Check if it's a list (lines starting with -)
  const lines = text.split('\n')
  const isList = lines.every((line) => line.trim().startsWith('- ') || line.trim() === '')

  if (isList) {
    const items = lines.filter((line) => line.trim().startsWith('- '))
    return (
      <ul key={key} className="my-4 space-y-2">
        {items.map((item, j) => (
          <li key={j} className="text-muted-foreground flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d6a4f]" />
            <span dangerouslySetInnerHTML={{ __html: inlineBold(item.replace(/^-\s*/, '')) }} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <p
      key={key}
      className="my-4 text-muted-foreground leading-relaxed"
      dangerouslySetInnerHTML={{ __html: inlineBold(text) }}
    />
  )
}

/** Convert **text** to <strong>text</strong> */
function inlineBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#1a472a]">$1</strong>')
}
