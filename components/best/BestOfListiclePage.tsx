import Link from 'next/link'
import { ArrowRight, Check, ExternalLink, MapPin, ThumbsDown, ThumbsUp, Trophy } from 'lucide-react'
import { BOOKING_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import type { BestOfListicleSeoPage } from '@/types/seo-pages'

interface Props {
  data: BestOfListicleSeoPage
}

export default function BestOfListiclePage({ data }: Props) {
  const { content } = data

  return (
    <div className="best-of-listicle-page">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] py-16 md:py-24 text-white">
        <div className="mx-auto max-w-[900px] px-5">
          <p className="text-sm font-medium uppercase tracking-wider text-[#d4a843] mb-3">
            Bangkok Guide · {content.year}
          </p>
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

      {/* ── Intro ────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[900px] px-5">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.intro}
          </p>
        </div>
      </section>

      {/* ── Ranked List ──────────────────────────────────────────────────── */}
      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-8">
            Ranked: The Best Options
          </h2>

          <div className="space-y-6">
            {content.list_items.map((item) =>
              item.is_lengolf ? (
                <LengolfCard key={item.rank} item={item} />
              ) : (
                <CompetitorCard key={item.rank} item={item} />
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Verdict ──────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-4">
            Our Verdict
          </h2>
          <div className="rounded-xl border bg-white p-6 md:p-8">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {content.conclusion}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] text-white text-center">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold md:text-3xl mb-4">
            Ready to Visit LENGOLF?
          </h2>
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

      {/* ── Related Links ────────────────────────────────────────────────── */}
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

// ── Sub-components ──────────────────────────────────────────────────────────

type ListItem = BestOfListicleSeoPage['content']['list_items'][number]

function LengolfCard({ item }: { item: ListItem }) {
  return (
    <div className="relative rounded-xl border-2 border-[#2d6a4f] bg-white p-6 shadow-md">
      {/* Editor's Pick badge */}
      <div className="absolute -top-3 left-6 flex items-center gap-1.5 rounded-full bg-[#d4a843] px-3 py-1 text-xs font-bold text-white shadow">
        <Trophy className="h-3 w-3" />
        Editor&apos;s Pick
      </div>

      <div className="flex items-start gap-4 mt-2">
        <RankBadge rank={item.rank} highlighted />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <h3 className="text-lg font-bold text-[#1a472a]">{item.name}</h3>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            {item.description}
          </p>

          <ProsConsGrid pros={item.pros} cons={item.cons} />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border mt-4">
            {item.address && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-[#d4a843]" />
                <span>{item.address}</span>
              </div>
            )}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d4a843] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#c49a3a]"
            >
              Book a Bay
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompetitorCard({ item }: { item: ListItem }) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="flex items-start gap-4">
        <RankBadge rank={item.rank} highlighted={false} />

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#1a472a] mb-3">{item.name}</h3>

          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            {item.description}
          </p>

          <ProsConsGrid pros={item.pros} cons={item.cons} />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border mt-4">
            {item.address && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                <span>{item.address}</span>
              </div>
            )}
            {item.website && (
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[#2d6a4f] hover:underline"
              >
                Visit website <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function RankBadge({ rank, highlighted }: { rank: number; highlighted: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm ${
        highlighted
          ? 'bg-[#1a472a] text-white'
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      #{rank}
    </div>
  )
}

function ProsConsGrid({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <p className="text-xs font-semibold text-[#2d6a4f] flex items-center gap-1 mb-2">
          <ThumbsUp className="h-3.5 w-3.5" /> Pros
        </p>
        <ul className="space-y-1.5">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-sm text-[#2d6a4f]">
              <Check className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 flex items-center gap-1 mb-2">
          <ThumbsDown className="h-3.5 w-3.5" /> Cons
        </p>
        <ul className="space-y-1.5">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
