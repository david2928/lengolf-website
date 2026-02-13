import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ContactInfo from '@/components/shared/ContactInfo'
import ContactForm from '@/components/about/ContactForm'
import BookingCTA from '@/components/shared/BookingCTA'
import { storageUrl, SITE_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { aboutFaqItems } from '@/data/pricing'
import { getFaqPageJsonLd, getAggregateRatingJsonLd } from '@/lib/jsonld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getGoogleReviews, type GoogleReview } from '@/lib/google-reviews'

export const metadata: Metadata = {
  title: 'About Us — Indoor Golf Simulator & Bar',
  description: 'LENGOLF — founded by golf-loving expats at BTS Chidlom, Bangkok. 4 simulator bays, full bar, PGA coaching, and a relaxed social vibe. Open daily 10 AM – 11 PM.',
  alternates: { canonical: `${SITE_URL}/about-us/` },
}

const faqLinkStyle = 'font-medium underline underline-offset-2 hover:text-primary transition-colors'

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
  '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  'Google Maps': { href: BUSINESS_INFO.googleMapsUrl, external: true },
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

const whyChooseUs = [
  {
    title: 'State-of-the-Art Simulators',
    description: 'Experience the best in virtual golf with our advanced Korean simulators for realistic gameplay. Enjoy the convenience of our auto-tee system and choose from hundreds of international courses.',
  },
  {
    title: 'Located in Central Bangkok',
    description: "Conveniently located inside The Mercury Ville at Chidlom BTS, we're easily accessible from anywhere in Bangkok. Enjoy 3 hours of free parking.",
  },
  {
    title: 'Warm and Inviting Staff',
    description: 'Our friendly, attentive staff ensure you feel welcome and have everything you need.',
  },
  {
    title: 'Fun & Relaxed Environment',
    description: 'Enjoy a perfect blend of excitement and relaxation in our lively, yet laid-back atmosphere.',
  },
  {
    title: 'Great Food and Drinks',
    description: 'Savor delicious food and a wide selection of drinks to complement your golfing experience.',
  },
  {
    title: 'Golf Lessons from a Pro',
    description: 'Improve your game with expert lessons from our professional golf instructors.',
  },
]

export const revalidate = 86400

function StarIcon({ filled, size = 'sm' }: { filled: boolean; size?: 'sm' | 'md' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? '#FBBC04' : '#E0E0E0'}
      className={size === 'md' ? 'h-5 w-5' : 'h-4 w-4'}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon key={star} filled={star <= rating} />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initial = review.reviewer_name.charAt(0).toUpperCase()
  const maxLen = 180
  const truncated = review.text.length > maxLen
    ? review.text.slice(0, maxLen).replace(/\s+\S*$/, '') + '...'
    : review.text

  return (
    <div className="rounded-lg border border-border/60 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{review.reviewer_name}</p>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} />
          </div>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{truncated}</p>
    </div>
  )
}

export default async function AboutPage() {
  const faqJsonLd = getFaqPageJsonLd(aboutFaqItems)
  const reviewsData = await getGoogleReviews()

  return (
    <>
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* JSON-LD AggregateRating */}
      {reviewsData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getAggregateRatingJsonLd(reviewsData.rating, reviewsData.totalReviews)) }}
        />
      )}

      {/* ── Hero ── */}
      <section className="relative flex h-[50vh] min-h-[400px] max-h-[550px] items-center text-white overflow-hidden">
        <Image
          src={storageUrl('venue/venue-interior-01.jpg')}
          alt="LENGOLF interior"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,90,50,0.55) 0%, rgba(0,122,69,0.45) 40%, rgba(0,90,50,0.3) 100%)',
          }}
        />
        <div className="relative z-10 w-full text-left px-[4%]">
          <span className="inline-block rounded bg-[#7CB342] px-6 py-2 text-lg font-bold uppercase tracking-widest text-white mb-5 md:text-xl">
            About Us
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            Golf, Drinks &amp; Good Times in Bangkok
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            Founded by golf-loving expats at BTS Chidlom
          </p>
        </div>
      </section>

      {/* ── Our Story + Stat Chips ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>OUR</span>{' '}
            <span className="text-foreground">STORY</span>
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Our story began as a group of golf-loving expats in Bangkok who just wanted to play golf. But we often found that traffic and weather got in the way. Frustrated, we sought out golf simulators as a convenient alternative. While the technology was impressive, the private room and closed off nature of the available options in Bangkok left much to be desired. We envisioned a place that combined the excitement of golf with a lively, social atmosphere.
            </p>
            <p>
              Determined to create something unique, we decided to take matters into our own hands. We tore down the walls, added a bar, and infused the space with a welcoming, relaxed vibe. The result is <strong className="text-foreground">LENGOLF</strong>, a haven for golf enthusiasts of all skill levels. Located at the Chidlom BTS stop, we offer state-of-the-art Korean simulators, delicious food and drinks, and a break from the Bangkok heat. At <strong className="text-foreground">LENGOLF</strong>, we&apos;re more than just a golf simulator; we&apos;re a community where fun and golf thrive.
            </p>
          </div>

          {/* Stat Chips */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { stat: 'Est. 2024', label: 'founded' },
              { stat: '4', label: 'simulator bays' },
              { stat: '3', label: 'PGA coaches' },
              { stat: '100+', label: 'golf courses' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-4">
                <div className="text-2xl font-bold" style={{ color: '#007429' }}>{item.stat}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Why Choose Us ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>WHY</span>{' '}
            <span className="text-foreground">CHOOSE US</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Reviews ── */}
      {reviewsData && reviewsData.reviews.length > 0 && (
        <SectionWrapper>
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-2 text-center text-3xl font-bold italic lg:text-4xl">
              <span style={{ color: '#007429' }}>WHAT OUR GUESTS</span>{' '}
              <span className="text-foreground">SAY</span>
            </h2>

            {/* Overall rating */}
            <div className="mb-10 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= Math.round(reviewsData.rating)} size="md" />
                  ))}
                </div>
                <span className="text-lg font-bold text-foreground">{reviewsData.rating}</span>
                <span className="text-sm text-muted-foreground">/ 5.0</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {reviewsData.totalReviews.toLocaleString()}+ Reviews on Google
              </p>
            </div>

            {/* Review cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviewsData.reviews.map((review) => (
                <ReviewCard key={`${review.reviewer_name}-${review.review_created_at}`} review={review} />
              ))}
            </div>

            {/* Link to Google */}
            <div className="mt-8 text-center">
              <a
                href="https://maps.app.goo.gl/4eCe3XNUWEf7QPcL7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                See all reviews on Google
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* ── CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">Come Visit Us</h2>
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

      {/* ── Contact (merged info + form side by side) ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>GET IN</span>{' '}
          <span className="text-foreground">TOUCH</span>
        </h2>
        <div className="mx-auto max-w-5xl flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="w-full lg:w-5/12">
            <ContactInfo />
          </div>
          <div className="w-full lg:w-7/12">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>FREQUENTLY ASKED</span>{' '}
            <span className="text-foreground">QUESTIONS</span>
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {aboutFaqItems.map((item, i) => (
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
