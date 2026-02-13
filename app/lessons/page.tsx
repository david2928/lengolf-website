import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ImageGallery from '@/components/shared/ImageGallery'
import { storageUrl, SITE_URL, BUSINESS_INFO } from '@/lib/constants'
import { coaches } from '@/data/coaches'
import { lessonPricing, lessonNotes, lessonsFaqItems } from '@/data/pricing'
import { getLessonsPricingJsonLd, getFaqPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqLinkStyle = 'font-medium underline underline-offset-2 hover:text-primary transition-colors'

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
  '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  'Google Maps': { href: BUSINESS_INFO.googleMapsUrl, external: true },
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
  title: 'Golf Lessons & Coaching',
  description: 'Take golf lessons at LENGOLF Bangkok from Thailand PGA professionals. Personalized instruction for all skill levels. Packages from 1,800 THB.',
  alternates: { canonical: `${SITE_URL}/lessons/` },
  openGraph: { images: [{ url: storageUrl('lessons/promo-free-trial.jpg'), alt: 'Golf lessons with PGA Pro at LENGOLF' }] },
}

const promoImages = [
  { src: storageUrl('lessons/promo-free-trial.jpg'), alt: 'Free 1-hour trial lesson with a PGA Pro — simple techniques, solid fundamentals, get course-ready fast' },
  { src: storageUrl('lessons/promo-starter-package.jpg'), alt: 'Starter Package — 5 hours coaching plus 5 hours practice with free golf glove for 11,000 THB' },
  { src: storageUrl('lessons/promo-coaching-package.jpg'), alt: 'Coaching package options with hourly and multi-hour lesson bundles at LENGOLF' },
  { src: storageUrl('lessons/promo-lesson.jpg'), alt: 'Golf lesson promotion with PGA-certified coach on simulator bay' },
]

const studentImages = [
  { src: storageUrl('lessons/student-01.jpg'), alt: 'Student practicing iron shots with PRO Boss on golf simulator', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-02.jpg'), alt: 'Adult student working on swing technique during a coaching session', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-03.jpg'), alt: 'Coach analyzing student swing data on simulator screen', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-04.jpg'), alt: 'Student and coach reviewing shot trajectory after a drive', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-05.jpg'), alt: 'Beginner golfer learning proper grip and stance fundamentals', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-06.jpg'), alt: 'Junior golfer learning swing fundamentals with coach guidance', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-07.jpg'), alt: 'Young golfer practicing on simulator during junior development program', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-08.jpg'), alt: 'Student improving driving distance with simulator feedback', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-09.jpg'), alt: 'Student working on short game technique with coach', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-10.jpg'), alt: 'Advanced player refining shot shaping skills on simulator', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-11.jpg'), alt: 'Student receiving real-time swing feedback during lesson', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-kids-01.jpg'), alt: 'Kids group lesson with age-appropriate golf instruction', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-kids-02.jpg'), alt: 'Child learning to swing with junior-sized clubs on simulator', width: 1200, height: 800 },
  { src: storageUrl('lessons/student-kids-03.jpg'), alt: 'Junior coaching session focused on building proper swing mechanics', width: 1200, height: 800 },
]

export default function LessonsPage() {
  const pricingJsonLd = getLessonsPricingJsonLd()
  const faqJsonLd = getFaqPageJsonLd(lessonsFaqItems)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Golf Lessons & Coaching', url: `${SITE_URL}/lessons/` },
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
          src={storageUrl('lessons/hero-lessons.jpg')}
          alt="Golf coaching at LENGOLF"
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
        <div className="relative z-10 w-full text-left" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          <span
            className="inline-block rounded px-6 py-2 text-lg font-bold uppercase tracking-widest text-white mb-5 md:text-xl"
            style={{ backgroundColor: '#7CB342' }}
          >
            Golf Coaching
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            Improve Your Game
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            Take golf lessons at LENGOLF
          </p>
        </div>
      </section>

      {/* ── Intro + Stat Chips ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            At <strong className="text-foreground">LENGOLF</strong>, our Thailand PGA-certified coaches offer personalized golf instruction for every skill level — and you can try it with a <strong className="text-foreground">free 1-hour trial lesson</strong>. Whether you&apos;re a beginner building fundamentals or an advanced player refining your technique, lessons use our state-of-the-art simulators for data-driven swing analysis and faster improvement.
          </p>

          {/* Stat chips */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { stat: '3', label: 'PGA coaches' },
              { stat: '1,800', label: 'THB / lesson' },
              { stat: 'All Levels', label: 'beginner to advanced' },
              { stat: 'Simulator', label: 'included free' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-4">
                <div className="text-2xl font-bold" style={{ color: '#007429' }}>{item.stat}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://lin.ee/uxQpIXn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              BOOK A LESSON
            </a>
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

      {/* ── Our Coach ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-12 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>OUR</span>{' '}
            <span className="text-foreground">COACH</span>
          </h2>
          <div className="space-y-20">
            {coaches.map((coach, i) => (
              <div key={coach.nickname} className={`flex flex-col items-start gap-8 lg:flex-row ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/3">
                  <Image
                    src={coach.photo}
                    alt={coach.name}
                    width={400}
                    height={600}
                    className="w-full rounded-lg object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="w-full lg:w-2/3">
                  <h3
                    className="text-2xl font-bold italic"
                    style={{ color: '#007429' }}
                  >
                    {coach.name}
                  </h3>
                  <p className="text-muted-foreground">({coach.fullName})</p>

                  <div className="mt-6 grid gap-6 sm:grid-cols-3">
                    <div>
                      <h4 className="mb-2 font-semibold" style={{ color: '#007429' }}>Coaching Expertise</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {coach.expertise.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold" style={{ color: '#007429' }}>Career Achievements</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {coach.achievements.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold" style={{ color: '#007429' }}>Education</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {coach.education.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-2">
                    {coach.gallery.map((img, j) => (
                      <Image
                        key={j}
                        src={img}
                        alt={`${coach.name} photo ${j + 1}`}
                        width={200}
                        height={150}
                        className="rounded-lg object-cover aspect-[4/3]"
                        sizes="(max-width: 1024px) 25vw, 16vw"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Lessons ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>OUR</span>{' '}
            <span className="text-foreground">LESSONS</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Our <strong className="text-foreground">Swing Building and Improvement Program</strong> uses advanced video analysis and simulator data to identify and correct technique. Lessons cover swing fundamentals, physical strength, lateral rotation, and course strategy — giving you the confidence and consistency to play better on real courses.
          </p>
        </div>
      </SectionWrapper>

      {/* ── Pricing Table ── */}
      <section id="pricing" className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>LESSON</span>{' '}
            <span className="text-foreground">PRICING</span>
          </h2>
          <div className="mx-auto max-w-lg">
            <Image
              src={storageUrl('lessons/lesson-packages.jpg')}
              alt="LENGOLF lesson packages: 1 hour from 1,800 THB, 5–50 hour packages available, Starter Package 11,000 THB, Sim to Fairway 13,499 THB"
              width={512}
              height={512}
              className="w-full rounded-lg shadow-sm"
              sizes="(max-width: 512px) 100vw, 512px"
            />
          </div>
          {/* Screen-reader / crawler-visible pricing table */}
          <div className="sr-only">
            <table>
              <caption>LENGOLF Lesson Packages (golf simulator usage included)</caption>
              <thead>
                <tr>
                  <th>Course Package</th>
                  <th>1 Golfer</th>
                  <th>2 Golfers</th>
                  <th>3-5 Golfers</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {lessonPricing.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.oneGolfer}</td>
                    <td>{row.twoGolfers}</td>
                    <td>{row.threeToFiveGolfers}</td>
                    <td>{row.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul>
              {lessonNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">Ready to improve your game?</h2>
          <p className="mb-6 text-white/80">Book a lesson with our PGA-certified coaches</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://booking.len.golf/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-white text-primary px-8 text-sm font-semibold transition-colors hover:bg-white/90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              BOOK A LESSON
            </a>
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

      {/* ── Our Packages & Promotions ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>OUR PACKAGES &amp;</span>{' '}
          <span className="text-foreground">PROMOTIONS</span>
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {promoImages.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-lg">
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

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>FREQUENTLY ASKED</span>{' '}
            <span className="text-foreground">QUESTIONS</span>
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {lessonsFaqItems.map((item, i) => (
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

      {/* ── Our Students ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>OUR</span>{' '}
          <span className="text-foreground">STUDENTS</span>
        </h2>
        <ImageGallery images={studentImages} rows={[3, 2, 2, 2, 2, 3]} />
      </SectionWrapper>

      {/* ── Explore More ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>EXPLORE</span>{' '}
            <span className="text-foreground">MORE</span>
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">Check out everything LENGOLF has to offer</p>
          <div className="mx-auto max-w-xl">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: 'Bay Rates', href: '/golf' },
                { label: 'Events', href: '/events' },
                { label: 'Club Rental', href: '/golf-club-rental' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-primary hover:text-white"
                  style={{ color: '#007429' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
