import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import ImageGallery from '@/components/shared/ImageGallery'
import ServicesCarousel from '@/components/home/ServicesCarousel'
import { services, homeFaqItems } from '@/data/pricing'
import { BUSINESS_INFO, BOOKING_URL, SITE_URL, SOCIAL_LINKS, storageUrl, storageImageUrl } from '@/lib/constants'
import { getFaqPageJsonLd } from '@/lib/jsonld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Indoor Golf Simulator & Bar in Bangkok',
  description: 'LENGOLF — indoor golf simulator bar at BTS Chidlom, Bangkok. 4 bays, 100+ courses, from 500 THB/hr. Free club rental, full bar, PGA coaching. Book your bay now.',
  alternates: { canonical: `${SITE_URL}/` },
}

const faqLinkStyle = 'font-medium underline underline-offset-2 hover:text-primary transition-colors'

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
  '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  'Google Maps': { href: BUSINESS_INFO.googleMapsUrl, external: true },
  'bay rates page': { href: '/golf' },
  'club rental page': { href: '/golf-club-rental' },
  'lessons page': { href: '/lessons' },
  'events page': { href: '/events' },
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

const galleryImages = [
  { src: storageUrl('venue/venue-simulator-01.jpg'), alt: 'LENGOLF indoor golf simulator', width: 1024, height: 683 },
  { src: storageUrl('venue/venue-interior-01.jpg'), alt: 'LENGOLF store', width: 1024, height: 1024 },
  { src: storageUrl('venue/venue-interior-02.jpg'), alt: 'LENGOLF interior', width: 1024, height: 1024 },
  { src: storageUrl('venue/venue-interior-03.jpg'), alt: 'LENGOLF setup', width: 1024, height: 1024 },
  { src: storageUrl('venue/venue-bay-01.jpg'), alt: 'LENGOLF simulator bay', width: 1024, height: 683 },
  { src: storageUrl('venue/venue-bar-01.jpg'), alt: 'LENGOLF bar area', width: 683, height: 1024 },
  { src: storageUrl('venue/venue-event-space.jpg'), alt: 'LENGOLF event space', width: 1024, height: 683 },
  { src: storageUrl('venue/venue-simulator-02.jpg'), alt: 'LENGOLF golf simulator', width: 1024, height: 683 },
]

const whyLengolf = [
  {
    title: 'State-of-the-Art Simulators',
    subtitle: 'Korean Bravo Golf technology',
    description: '4 private bays with 99% accuracy tracking — club speed, ball speed, launch angle, and spin. Play 100+ championship courses like Pebble Beach and TPC Sawgrass in stunning HD.',
    image: storageUrl('venue/venue-simulator-01.jpg'),
  },
  {
    title: 'Full Bar & Food',
    subtitle: 'Cold drinks, great food & good vibes',
    description: 'Enjoy ice-cold beers, refreshing drinks, burgers, sliders, and bar snacks while you play. Our full-service bar and kitchen mean you never have to leave the bay.',
    image: storageUrl('venue/venue-bar-01.jpg'),
  },
  {
    title: 'PGA-Certified Coaching',
    subtitle: '3 Thailand PGA pros on staff',
    description: 'Whether you\'re picking up a club for the first time or fine-tuning your short game, our coaches tailor every lesson to your goals. Free trial lesson available.',
    image: storageUrl('lessons/lessons-cover.jpg'),
  },
]

const serviceLinks = [
  {
    title: 'Bay Rates',
    description: 'Hourly simulator rentals from 500 THB. Up to 5 players per bay with free club rental.',
    image: storageUrl('golf/hero-golf.jpg'),
    href: '/golf',
  },
  {
    title: 'Golf Lessons',
    description: 'PGA-certified coaching for all levels. Free trial lesson available. Packages from 1,800 THB.',
    image: storageUrl('lessons/lessons-cover.jpg'),
    href: '/lessons',
  },
  {
    title: 'Events & Parties',
    description: 'Corporate events, team building, and private parties for 10–50+ guests from 9,999 THB.',
    image: storageUrl('events/events-cover.jpg'),
    href: '/events',
  },
  {
    title: 'Club Rental',
    description: 'Free standard sets included. Premium Callaway & Majesty rentals from 150 THB/hr.',
    image: storageUrl('venue/venue-simulator-01.jpg'),
    href: '/golf-club-rental',
  },
]

export default function HomePage() {
  const faqJsonLd = getFaqPageJsonLd(homeFaqItems)

  return (
    <>
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── 1. Video Hero ── */}
      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-[#30884E] text-white md:min-h-[620px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={storageImageUrl('venue/venue-simulator-01.jpg', { width: 1280, quality: 60 })}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={storageUrl('videos/hero-video.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#005a32]/60" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Image
            src={storageUrl('branding/logo-typo.png')}
            alt="LENGOLF"
            width={400}
            height={100}
            className="mx-auto mb-6 h-auto w-48 sm:w-56 lg:w-64"
            priority
          />
          <h1 className="mb-4 text-3xl font-black uppercase leading-tight sm:text-4xl md:text-5xl">
            Indoor Golf Simulator &amp; Bar in Bangkok
          </h1>
          <p className="mb-8 text-base font-medium text-white/85 sm:text-lg">
            Play 100+ courses, grab cold drinks and great food, and sharpen your game — all at BTS Chidlom
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookingCTA text="BOOK YOUR BAY" className="bg-white text-primary hover:bg-white/90" />
            <a
              href={SOCIAL_LINKS.line}
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

      {/* ── 2. Intro + Stat Chips ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            <strong className="text-foreground">LENGOLF</strong> is Bangkok&apos;s premier indoor golf simulator and bar, located inside The Mercury Ville @ BTS Chidlom. Whether you&apos;re a seasoned player or picking up a club for the first time, enjoy state-of-the-art Korean Bravo Golf simulators, a full-service bar, and PGA-certified coaching — all in a fun, relaxed environment.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { stat: '4', label: 'simulator bays' },
              { stat: '100+', label: 'golf courses' },
              { stat: 'From 500', label: 'THB / hour' },
              { stat: 'Free', label: 'club rental' },
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
              href={SOCIAL_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-primary px-8 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              LINE @lengolf
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── 3. Services Carousel ── */}
      <div className="mt-[-2rem] pb-16 lg:pb-24">
        <ServicesCarousel services={services} />
      </div>

      {/* ── 4. Why LENGOLF ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-14 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>WHY</span>{' '}
            <span className="text-foreground">LENGOLF</span>
          </h2>
          <div className="mx-auto max-w-4xl space-y-8">
            {whyLengolf.map((item, i) => (
              <div
                key={item.title}
                className={`flex flex-col overflow-hidden rounded-xl bg-white shadow-sm md:flex-row md:items-stretch ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-2/5 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={480}
                    height={320}
                    className="h-52 w-full object-cover md:h-full"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <h3 className="mb-1 text-xl font-bold" style={{ color: '#007429' }}>
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-muted-foreground/70">{item.subtitle}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">Ready to play?</h2>
          <p className="mb-6 text-white/80">Book your bay online or contact us on LINE</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookingCTA text="BOOK YOUR BAY" className="bg-white text-primary hover:bg-white/90" />
            <a
              href={SOCIAL_LINKS.line}
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

      {/* ── 6. Gallery ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>OUR</span>{' '}
          <span className="text-foreground">GALLERY</span>
        </h2>
        <ImageGallery images={galleryImages} rows={[5, 3]} />
      </SectionWrapper>

      {/* ── 7. Explore Our Services ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>EXPLORE OUR</span>{' '}
            <span className="text-foreground">SERVICES</span>
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {serviceLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold" style={{ color: '#007429' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: '#007429' }}>
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Find Us ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>FIND</span>{' '}
          <span className="text-foreground">US</span>
        </h2>
        <div className="mx-auto max-w-5xl flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full overflow-hidden rounded-lg lg:w-3/5">
            <iframe
              src={BUSINESS_INFO.googleMapsEmbed}
              title="LENGOLF Location"
              aria-label="LENGOLF"
              className="h-[350px] w-full border-0 lg:h-[400px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col gap-5 lg:w-2/5">
            <div>
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-foreground">Address</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{BUSINESS_INFO.address}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-foreground">Opening Hours</h3>
              <p className="text-sm text-muted-foreground">{BUSINESS_INFO.hours}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-foreground">Phone</h3>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-sm font-medium text-primary hover:underline">{BUSINESS_INFO.phone}</a>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-foreground">Email</h3>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="text-sm font-medium text-primary hover:underline">{BUSINESS_INFO.email}</a>
            </div>
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
              style={{ color: '#007429' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Get Directions on Google Maps
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── 9. FAQ ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>FREQUENTLY ASKED</span>{' '}
            <span className="text-foreground">QUESTIONS</span>
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {homeFaqItems.map((item, i) => (
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
