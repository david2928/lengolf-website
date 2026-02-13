import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import { storageUrl, SITE_URL, BUSINESS_INFO } from '@/lib/constants'
import {
  clubRentalTiers,
  premiumClubPricing,
  gearUpItems,
  secondHandClubPoints,
  clubRentalWhyChoose,
  clubRentalFaqItems,
} from '@/data/pricing'
import { getClubRentalPricingJsonLd, getFaqPageJsonLd } from '@/lib/jsonld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqLinkStyle = 'font-medium underline underline-offset-2 hover:text-primary transition-colors'

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
  '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  'Google Maps': { href: BUSINESS_INFO.googleMapsUrl, external: true },
  'bay rates page': { href: '/golf' },
}

function renderFaqAnswer(answer: string) {
  const pattern = new RegExp(`(${Object.keys(faqLinks).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  const parts = answer.split(pattern)
  return parts.map((part, i) => {
    const link = faqLinks[part]
    if (link) {
      if (link.external) {
        return <a key={i} href={link.href} className={faqLinkStyle} target="_blank" rel="noopener noreferrer">{part}</a>
      }
      return <Link key={i} href={link.href} className={faqLinkStyle}>{part}</Link>
    }
    return part
  })
}

const gearIconMap: Record<string, React.ReactNode> = {
  hand: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 17"/></svg>
  ),
  circle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
  ),
  truck: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
  ),
}

const whyChooseIconMap: Record<string, React.ReactNode> = {
  award: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
  ),
  'map-pin': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
  ),
}

export const metadata: Metadata = {
  title: 'Golf Club Rental in Bangkok',
  description: 'Rent golf clubs in Bangkok at LENGOLF. Free standard sets with every booking, premium Callaway Warbird & Majesty Shuttle from 150 THB/hr. Delivery available.',
  alternates: { canonical: `${SITE_URL}/golf-club-rental/` },
}

export default function ClubRentalPage() {
  const pricingJsonLd = getClubRentalPricingJsonLd()
  const faqJsonLd = getFaqPageJsonLd(clubRentalFaqItems)

  return (
    <>
      {/* JSON-LD Pricing Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative flex h-[50vh] min-h-[400px] max-h-[550px] items-center text-white overflow-hidden">
        <Image
          src={storageUrl('golf/hero-golf.jpg')}
          alt="Premium golf club rental at LENGOLF Bangkok"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,90,50,0.55) 0%, rgba(0,122,69,0.45) 40%, rgba(0,90,50,0.3) 100%)',
          }}
        />
        <div className="relative z-10 w-full text-left" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          <span
            className="inline-block rounded px-6 py-2 text-lg font-bold uppercase tracking-widest text-white mb-5 md:text-xl"
            style={{ backgroundColor: '#7CB342' }}
          >
            Club Rental
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            Premium Clubs, No Commitment
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            Free Standard Sets &bull; Callaway &amp; Majesty Upgrades
          </p>
        </div>
      </section>

      {/* ── Intro + Stat Chips ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Every bay booking at <strong className="text-foreground">LENGOLF</strong> includes free standard golf clubs. Want premium gear? Rent Callaway Warbird or Majesty Shuttle full sets starting at just 150 THB per hour — use them in-house or take them to any golf course in Bangkok.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { stat: 'Free', label: 'standard clubs' },
              { stat: '150', label: 'THB/hr premium' },
              { stat: 'Callaway', label: '& Majesty brands' },
              { stat: 'Delivery', label: 'in Bangkok' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-4">
                <div className="text-2xl font-bold" style={{ color: '#007429' }}>{item.stat}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookingCTA />
            <a
              href="#pricing"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
              PRICING
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Club Rental Tiers ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>CLUB RENTAL</span>{' '}
            <span className="text-foreground">OPTIONS</span>
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {clubRentalTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl border p-6 transition-shadow hover:shadow-md ${
                  tier.highlight
                    ? 'border-primary/30 bg-white shadow-sm'
                    : 'border-border/60 bg-white'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      tier.tag === 'Free'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {tier.tag}
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-bold" style={{ color: '#007429' }}>{tier.name}</h3>
                <p className="mb-1 text-sm font-semibold text-foreground">{tier.brand}</p>
                <p className="mb-4 text-xs text-muted-foreground">{tier.type}</p>
                <ul className="mb-5 space-y-2">
                  {tier.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                      {spec}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border/40 pt-4">
                  <p className="text-lg font-bold" style={{ color: '#007429' }}>{tier.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* sr-only table for crawlers */}
          <div className="sr-only">
            <table>
              <caption>LENGOLF Golf Club Rental Options</caption>
              <thead>
                <tr>
                  <th>Set</th>
                  <th>Brand</th>
                  <th>Type</th>
                  <th>Includes</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {clubRentalTiers.map((tier) => (
                  <tr key={tier.name}>
                    <td>{tier.name}</td>
                    <td>{tier.brand}</td>
                    <td>{tier.type}</td>
                    <td>{tier.specs.join('; ')}</td>
                    <td>{tier.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Premium Pricing ── */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>PREMIUM CLUB</span>{' '}
            <span className="text-foreground">PRICING</span>
          </h2>
          <div className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-3 text-sm font-semibold">Duration</th>
                    <th className="px-6 py-3 text-sm font-semibold text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {premiumClubPricing.map((row, i) => (
                    <tr key={row.duration} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{row.duration}</td>
                      <td className="px-6 py-4 text-sm font-bold text-right" style={{ color: '#007429' }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              *Standard clubs are always free with any bay booking. Premium pricing applies to Callaway Warbird &amp; Majesty Shuttle sets.
            </p>
          </div>
        </div>
      </section>

      {/* ── Gear-Up Add-Ons ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>GEAR-UP</span>{' '}
            <span className="text-foreground">ADD-ONS</span>
          </h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
            {gearUpItems.map((item) => (
              <div key={item.name} className="rounded-lg border border-primary/15 bg-white px-5 py-6 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
                  {gearIconMap[item.icon]}
                </div>
                <h3 className="mb-1 text-base font-bold text-foreground">{item.name}</h3>
                <p className="mb-2 text-lg font-bold" style={{ color: '#007429' }}>{item.price}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Second-Hand Clubs ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>SECOND-HAND</span>{' '}
          <span className="text-foreground">CLUBS</span>
        </h2>
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col overflow-hidden rounded-xl bg-muted/40 md:flex-row md:items-stretch">
            <div className="md:w-2/5 shrink-0">
              <Image
                src={storageUrl('venue/venue-simulator-01.jpg')}
                alt="LENGOLF second-hand golf clubs available for purchase"
                width={480}
                height={320}
                className="h-52 w-full object-cover md:h-full"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <ul className="mb-5 space-y-2.5">
                {secondHandClubPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-center">
                <p className="text-sm font-bold" style={{ color: '#007429' }}>
                  Try Before You Buy — FREE!
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Rent premium clubs in-house at no cost when considering a purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Why Choose LENGOLF ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>WHY CHOOSE</span>{' '}
            <span className="text-foreground">LENGOLF</span>
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {clubRentalWhyChoose.map((feature) => (
              <div key={feature.title} className="rounded-xl border border-border/60 bg-white p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
                  {whyChooseIconMap[feature.icon]}
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">Ready to gear up?</h2>
          <p className="mb-6 text-white/80">Book your bay online — standard clubs included free, or reserve premium sets</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookingCTA text="BOOK NOW" className="bg-white text-primary hover:bg-white/90" />
            <a
              href="https://lin.ee/uxQpIXn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              LINE @lengolf
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>FREQUENTLY ASKED</span>{' '}
            <span className="text-foreground">QUESTIONS</span>
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {clubRentalFaqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60 px-1">
                  <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline" style={{ color: '#007429' }}>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {renderFaqAnswer(item.answer)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
