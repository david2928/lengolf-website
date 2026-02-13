import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import AqiWidget from '@/components/shared/AqiWidget'
import { storageUrl, SITE_URL, BUSINESS_INFO } from '@/lib/constants'
import { bayRates, bayRateNotes, monthlyPackages, monthlyPackageNotes, golfFaqItems } from '@/data/pricing'
import { getGolfPricingJsonLd, getFaqPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqLinkStyle = 'font-medium underline underline-offset-2 hover:text-primary transition-colors'

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
  '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  'Google Maps': { href: BUSINESS_INFO.googleMapsUrl, external: true },
  'lessons page': { href: '/lessons' },
  'club rental page': { href: '/golf-club-rental' },
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

export const metadata: Metadata = {
  title: 'Golf Simulator Rentals & Bay Rates',
  description: 'Book a golf simulator bay at LENGOLF Bangkok. Korean Bravo Golf tech, 500–900 THB/hr for up to 5 players. 100+ courses and free club rental included.',
  alternates: { canonical: `${SITE_URL}/golf/` },
  openGraph: { images: [{ url: storageUrl('golf/driving-range.png'), alt: 'LENGOLF indoor golf simulator bay' }] },
}

const waysToPlay = [
  {
    title: 'DRIVING RANGE',
    description: 'Get real swing data — club speed, ball speed, launch angle — and see exactly where to improve. Practice with music or drill down on the numbers.',
    image: storageUrl('golf/driving-range.png'),
  },
  {
    title: 'COURSE PLAY',
    description: 'Play 100+ championship courses like Pebble Beach and TPC Sawgrass in stunning HD. No lost balls, no sunburn.',
    image: storageUrl('golf/course-play.png'),
  },
  {
    title: 'GAMES & COMPETITIONS',
    description: 'Closest to the pin, longest drive, and more. Perfect for game night with friends — fun for beginners and pros alike.',
    image: storageUrl('golf/games-competitions.png'),
  },
]

const ourSetup = [
  {
    title: 'Auto Tee System',
    subtitle: 'Focus on your swing, not setup',
    description: 'Automatic ball placement with realistic surface mats that simulate fairway, rough, and bunker conditions.',
    image: storageUrl('golf/setup-auto-tee.png'),
  },
  {
    title: '99% Accuracy Simulator',
    subtitle: 'Korean Bravo Golf technology',
    description: 'Captures club speed, ball speed, launch angle, and spin for detailed swing analysis and feedback.',
    image: storageUrl('golf/setup-simulator.jpg'),
  },
  {
    title: 'Putting Green',
    subtitle: 'Dedicated practice area',
    description: 'Large graded turf green with realistic slopes that closely mimic real course conditions.',
    image: storageUrl('golf/setup-putting-green.png'),
  },
]

const promoImages = [
  { src: storageUrl('promotions/promo-new-customer.jpg'), alt: 'New customer offer: buy 1 hour get 1 hour free' },
  { src: storageUrl('promotions/promo-early-bird.jpg'), alt: 'Early Bird special: discounted rates before 2 PM' },
  { src: storageUrl('promotions/promo-03.jpg'), alt: 'LENGOLF AI Lab: AI-powered swing analysis and 4K course play' },
  { src: storageUrl('promotions/promotion-1.jpg'), alt: '20% extra hours on monthly packages until March' },
]

const locationLinks = [
  { name: 'Sathorn', href: '/location/indoor-golf-sathorn' },
  { name: 'Phaya Thai', href: '/location/indoor-golf-phaya-thai' },
  { name: 'Ari', href: '/location/indoor-golf-ari' },
  { name: 'Ekkamai', href: '/location/indoor-golf-ekkamai' },
  { name: 'Thong Lo', href: '/location/indoor-golf-thong-lo' },
  { name: 'Phrom Phong', href: '/location/indoor-golf-phrom-phong' },
  { name: 'Nana', href: '/location/indoor-golf-nana' },
  { name: 'Asok', href: '/location/indoor-golf-asok' },
  { name: 'Silom', href: '/location/indoor-golf-silom' },
  { name: 'Sukhumvit', href: '/location/indoor-golf-sukhumvit' },
  { name: 'Ratchadamri', href: '/location/indoor-golf-ratchadamri' },
  { name: 'Siam', href: '/location/indoor-golf-siam' },
  { name: 'Ploenchit', href: '/location/indoor-golf-ploenchit' },
  { name: 'Chidlom', href: '/location/indoor-golf-chidlom' },
]

export default function GolfPage() {
  const pricingJsonLd = getGolfPricingJsonLd()
  const faqJsonLd = getFaqPageJsonLd(golfFaqItems)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Bay Rates', url: `${SITE_URL}/golf/` },
  ])

  return (
    <>
      {/* JSON-LD Pricing Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
          alt="LENGOLF simulator bay"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Green gradient overlay matching len.golf original */}
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
            Simulator Rentals
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            Indoor Golf Anytime
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            Book Your Bay Now at LENGOLF
          </p>
        </div>
      </section>

      {/* ── Intro + CTA Buttons ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            At <strong className="text-foreground">LENGOLF</strong>, enjoy Bangkok&apos;s premier indoor golf experience with state-of-the-art Korean Bravo Golf simulators. Play 100+ championship courses, practice on the driving range, or challenge friends with interactive games — all included in the hourly rate.
          </p>

          {/* Highlight stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { stat: '500–900', label: 'THB / hour' },
              { stat: 'Up to 5', label: 'players per bay' },
              { stat: '100+', label: 'golf courses' },
              { stat: 'Free', label: 'club rental' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-4">
                <div className="text-2xl font-bold" style={{ color: '#007429' }}>{item.stat}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <AqiWidget />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookingCTA />
            <a
              href="#bayrate"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
              RATES
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Our Rates + Monthly Packages (single section) ── */}
      <section
        id="bayrate"
        className="py-16 lg:py-24"
        style={{ backgroundColor: '#F6FFFA' }}
      >
        <div className="section-max-width section-padding space-y-16 lg:space-y-24">
          {/* Bay Rates */}
          <div>
            <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
              <span style={{ color: '#007429' }}>OUR</span>{' '}
              <span className="text-foreground">RATES</span>
            </h2>
            <div className="mx-auto max-w-lg">
              <Image
                src={storageUrl('golf/bay-rates.jpg')}
                alt="LENGOLF bay rates: weekday 500–700 THB/hr, weekend 700–900 THB/hr, up to 5 players per bay, golf club rental included"
                width={512}
                height={512}
                className="w-full rounded-lg shadow-sm"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </div>
            {/* Screen-reader / crawler-visible pricing table */}
            <div className="sr-only">
              <table>
                <caption>LENGOLF Simulator Bay Rates (per hour, per bay)</caption>
                <thead>
                  <tr>
                    <th>Time Slot</th>
                    <th>Weekday (Mon–Thu)</th>
                    <th>Weekend (Fri–Sun & Public Holidays)</th>
                  </tr>
                </thead>
                <tbody>
                  {bayRates.map((row) => (
                    <tr key={row.timeSlot}>
                      <td>{row.timeSlot}</td>
                      <td>{row.weekday}</td>
                      <td>{row.weekend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul>
                {bayRateNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Monthly Packages */}
          <div>
            <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
              <span style={{ color: '#007429' }}>OUR MONTHLY</span>{' '}
              <span className="text-foreground">PACKAGES</span>
            </h2>
            <div className="mx-auto max-w-lg">
              <Image
                src={storageUrl('golf/monthly-packages.jpg')}
                alt="LENGOLF monthly packages: Bronze 3,000 THB, Silver 8,000 THB, Gold 14,000 THB, Diamond 8,000 THB, Diamond+ 18,000 THB"
                width={512}
                height={512}
                className="w-full rounded-lg shadow-sm"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </div>
            {/* Screen-reader / crawler-visible packages table */}
            <div className="sr-only">
              <table>
                <caption>LENGOLF Monthly Simulator Packages</caption>
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>Hours</th>
                    <th>Validity</th>
                    <th>Perks</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyPackages.map((pkg) => (
                    <tr key={pkg.name}>
                      <td>{pkg.name}</td>
                      <td>{pkg.hours}</td>
                      <td>{pkg.validity}</td>
                      <td>{pkg.perks}</td>
                      <td>{pkg.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul>
                {monthlyPackageNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Book Now CTA ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">Ready to play?</h2>
          <p className="mb-6 text-white/80">Book your bay online or contact us on LINE</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookingCTA text="BOOK YOUR BAY" className="bg-white text-primary hover:bg-white/90" />
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

      {/* ── Our Promotion ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>OUR</span>{' '}
          <span className="text-foreground">PROMOTIONS</span>
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {promoImages.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg shadow-sm transition-transform hover:scale-[1.02]">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={600}
                className="w-full"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Ways To Play ── */}
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: '#F6FFFA' }}
      >
        <div className="section-max-width section-padding">
          <h2 className="mb-14 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>WAYS</span>{' '}
            <span className="text-foreground">TO PLAY</span>
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {waysToPlay.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={420}
                    height={520}
                    className="w-full aspect-[4/5] object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3
                  className="mb-3 text-xl font-bold italic"
                  style={{ color: '#007429' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Setup ── */}
      <SectionWrapper>
        <h2 className="mb-14 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>OUR</span>{' '}
          <span className="text-foreground">SETUP</span>
        </h2>
        <div className="mx-auto max-w-4xl space-y-8">
          {ourSetup.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col overflow-hidden rounded-xl bg-muted/40 md:flex-row md:items-stretch ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
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
                <h3
                  className="mb-1 text-xl font-bold"
                  style={{ color: '#007429' }}
                >
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
      </SectionWrapper>

      {/* ── Choose Your Bay ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-4 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>CHOOSE YOUR</span>{' '}
            <span className="text-foreground">BAY</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-muted-foreground">
            We offer two distinct bay experiences — pick the one that matches your game
          </p>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Social Bays */}
            <div className="flex flex-col overflow-hidden rounded-xl border border-primary/15 bg-white shadow-sm">
              <div className="relative">
                <Image
                  src={storageUrl('golf/bay-social.jpg')}
                  alt="Social Bays at LENGOLF — spacious simulator bays for groups and beginners"
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold" style={{ color: '#007429' }}>
                    3 Bays
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-foreground">Social Bays</h3>
                <p className="mb-5 text-sm text-muted-foreground">Korean Bravo Golf simulators — perfect for beginners, groups &amp; social play</p>

                <div className="mb-5">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Ideal For</h4>
                  <ul className="space-y-1.5">
                    {['New golfers & beginners', 'Groups of 1–5 players', 'Casual, fun experiences', 'Celebrations & parties'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Features</h4>
                  <ul className="space-y-1.5">
                    {['Auto tee system', '100+ courses available', 'Multiple game modes', 'Social atmosphere'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <BookingCTA className="w-full justify-center" />
                </div>
              </div>
            </div>

            {/* LENGOLF AI Lab */}
            <div className="flex flex-col overflow-hidden rounded-xl border shadow-sm" style={{ borderColor: 'rgba(124, 58, 237, 0.15)' }}>
              <div className="relative">
                <Image
                  src={storageUrl('golf/bay-ai-lab.jpg')}
                  alt="LENGOLF AI Lab — Uneekor EYE Mini Lite launch monitor with AI swing analysis and 4K BenQ projector"
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Powered by Uneekor strip */}
              <div className="flex items-center gap-3 border-b px-5 py-3" style={{ borderColor: 'rgba(124, 58, 237, 0.1)', backgroundColor: 'rgba(124, 58, 237, 0.03)' }}>
                <Image
                  src={storageUrl('branding/uneekor-logo.png')}
                  alt="Uneekor logo"
                  width={90}
                  height={24}
                  className="h-6 w-auto shrink-0"
                />
                <div className="h-5 w-px bg-border/60 shrink-0" />
                <p className="text-[11px] leading-snug text-muted-foreground">EYE Mini Lite launch monitor — used by PGA tour pros and top fitting studios worldwide</p>
              </div>

              <div className="flex flex-1 flex-col p-6" style={{ backgroundColor: 'white' }}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED' }}>
                    1 Bay
                  </span>
                  <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: '#7C3AED' }}>
                    New
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-foreground">LENGOLF AI Lab</h3>
                <p className="mb-5 text-sm text-muted-foreground">Uneekor-powered bay for serious improvement</p>

                <div className="mb-5">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Ideal For</h4>
                  <ul className="space-y-1.5">
                    {['Intermediate+ players', 'Solo or duo (1–2 players)', 'Serious improvement focus', 'Left & right-handed optimized'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Features</h4>
                  <ul className="space-y-1.5">
                    {['Uneekor EYE Mini Lite launch monitor', 'Dual-angle video replay', '4K BenQ projector', 'AI swing analysis'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <a
                    href="https://booking.len.golf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md px-8 text-sm font-semibold text-white transition-colors hover:opacity-90"
                    style={{ backgroundColor: '#7C3AED' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    BOOK AI LAB
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Club Rental Cross-Link ── */}
      <section className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>CLUB</span>{' '}
            <span className="text-foreground">RENTAL</span>
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm md:flex-row md:items-stretch">
              <div className="md:w-2/5 shrink-0">
                <Image
                  src={storageUrl('venue/venue-simulator-01.jpg')}
                  alt="Premium golf club rental at LENGOLF"
                  width={480}
                  height={320}
                  className="h-52 w-full object-cover md:h-full"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <h3 className="mb-3 text-xl font-bold" style={{ color: '#007429' }}>
                  Premium Clubs, No Commitment
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Free standard clubs are included with every booking. Upgrade to premium Callaway Warbird or Majesty Shuttle full sets from just 150 THB/hr — use in-house or take to any Bangkok golf course with same-day delivery.
                </p>
                <Link
                  href="/golf-club-rental"
                  className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: '#007429' }}
                >
                  View Club Rental Options
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>FREQUENTLY ASKED</span>{' '}
            <span className="text-foreground">QUESTIONS</span>
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {golfFaqItems.map((item, i) => (
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

      {/* ── Who We Serve ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
        <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>Indoor Golf</span>{' '}
          <span className="text-foreground">Near You</span>
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">Conveniently located at BTS Chidlom, serving golfers across Bangkok</p>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {locationLinks.map((loc) => (
              <Link
                key={loc.name}
                href={loc.href}
                className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-white"
                style={{ color: '#007429' }}
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
        </div>
      </section>
    </>
  )
}
