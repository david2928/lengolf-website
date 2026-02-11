import type { Metadata } from 'next'
import Image from 'next/image'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ImageGallery from '@/components/shared/ImageGallery'
import { eventTypes } from '@/data/pricing'
import EventInquiryForm from '@/components/events/EventInquiryForm'

export const metadata: Metadata = {
  title: 'Events & Parties',
  description: 'Host a memorable indoor golf party at LENGOLF. Corporate events, team building, birthdays & more. Full site rental, 50+ capacity, customizable packages.',
}

const amenities = [
  'Full site rental',
  '50+ Pack event space',
  'Full bar',
  'Customizable catering packages',
  '3 simulator bays',
  'Free club usage',
  'Large putting green',
  'Contact our events team to learn more',
]

const eventGallery = [
  { src: '/images/0B4A1494-1.jpg', alt: 'LENGOLF event', width: 1200, height: 800 },
  { src: '/images/0B4A1451-1.jpg', alt: 'LENGOLF party', width: 1200, height: 800 },
  { src: '/images/0B4A1443-1.jpg', alt: 'LENGOLF corporate event', width: 1200, height: 800 },
  { src: '/images/0B4A1399-1.jpg', alt: 'LENGOLF team building', width: 1200, height: 800 },
  { src: '/images/0B4A1339-1.jpg', alt: 'LENGOLF event space', width: 1200, height: 800 },
  { src: '/images/0B4A1240-1.jpg', alt: 'LENGOLF gathering', width: 1200, height: 800 },
  { src: '/images/0B4A0538-1.jpg', alt: 'LENGOLF golf event', width: 1200, height: 800 },
  { src: '/images/DSC00210-1-scaled.jpg', alt: 'LENGOLF event photo', width: 1200, height: 800 },
  { src: '/images/DSC00191-1-scaled.jpg', alt: 'LENGOLF party photo', width: 1200, height: 800 },
  { src: '/images/Copy_of_IMG_8925-scaled.jpg', alt: 'LENGOLF celebration', width: 1200, height: 800 },
  { src: '/images/DSC00168-1-scaled.jpg', alt: 'LENGOLF event guests', width: 1200, height: 800 },
  { src: '/images/Copy_of_IMG_8931-scaled.jpg', alt: 'LENGOLF group event', width: 1200, height: 800 },
  { src: '/images/DSC00137-1-scaled.jpg', alt: 'LENGOLF venue', width: 1200, height: 800 },
  { src: '/images/DSC00129-1-scaled.jpg', alt: 'LENGOLF food and drinks', width: 1200, height: 800 },
  { src: '/images/DSC00126-1-scaled.jpg', alt: 'LENGOLF event dining', width: 1200, height: 800 },
  { src: '/images/Copy-of-Copy-of-20240907_213537-1-scaled.jpg', alt: 'LENGOLF night event', width: 1200, height: 800 },
  { src: '/images/DJI_20241121124426_0165_D-1-scaled.jpg', alt: 'LENGOLF aerial view', width: 1200, height: 800 },
  { src: '/images/DSC00165-1-scaled.jpg', alt: 'LENGOLF party atmosphere', width: 1200, height: 800 },
  { src: '/images/DSC00155-1-scaled.jpg', alt: 'LENGOLF event fun', width: 1200, height: 800 },
  { src: '/images/DSC00150-1-scaled.jpg', alt: 'LENGOLF simulator party', width: 1200, height: 800 },
  { src: '/images/20240907_194856-1-scaled.jpg', alt: 'LENGOLF catering', width: 1200, height: 800 },
  { src: '/images/DSC00183-1-scaled.jpg', alt: 'LENGOLF event space view', width: 1200, height: 800 },
]

export default function EventsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex h-[50vh] min-h-[400px] max-h-[550px] items-center text-white overflow-hidden">
        <Image
          src="/images/0B4A1494-1.jpg"
          alt="LENGOLF event party"
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
            Events &amp; Parties
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            Golf. Party. Fun.
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            Host a memorable indoor golf party at LENGOLF
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>LOOKING TO HOST</span>{' '}
            <span className="text-foreground">A UNIQUE AND EXCITING EVENT?</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            <strong className="text-foreground">LENGOLF</strong> is the place to be. Our state-of-the-art Korean Bravo Golf simulators, combined with a full bar and delicious menu, create the perfect setting for fun and social gatherings.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Tackle world-famous courses or challenge yourself with games like closest to the pin and longest drive. Ideal for golfers of all levels! Our event packages feature fantastic food and drink options, plus golf pros ready to offer mini-lessons, run engaging contests, and provide expert tips to elevate your game.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#booknowsection"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              BOOK NOW
            </a>
            <a
              href="/images/LENGOLF_Floorplan-min.png"
              target="_blank"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
              FLOOR PLAN
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Amenities ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-12 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>WHY HAVE YOUR NEXT EVENT</span>{' '}
            <span className="text-foreground">AT LENGOLF</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {amenities.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center rounded-md px-4 py-6 text-center font-bold uppercase text-primary transition-colors hover:bg-primary/5"
                style={{ border: '2px solid #007429' }}
              >
                <p className="text-sm md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Event Types ── */}
      <SectionWrapper>
        <h2 className="mb-12 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>Any Event, Any Time</span>{' '}
          <span className="text-foreground">– We&apos;ve Got You Covered</span>
        </h2>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {eventTypes.map((event) => (
            <div key={event.title} className="flex flex-col items-center gap-4 text-center">
              <Image
                src={event.icon}
                alt={event.title}
                width={80}
                height={80}
                className="opacity-80"
                style={{ filter: 'hue-rotate(0deg) saturate(1.2)' }}
              />
              <p className="text-sm font-medium">{event.title}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Event Packages ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>OUR EVENT</span>{' '}
            <span className="text-foreground">PACKAGES</span>
          </h2>
          <div className="mx-auto max-w-lg">
            <Image
              src="/images/S__71934019.jpg"
              alt="LENGOLF Event Packages"
              width={768}
              height={1086}
              className="w-full rounded-lg shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <SectionWrapper id="booknowsection">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>Host</span>{' '}
            <span className="text-foreground">an Event</span>
          </h2>
          <EventInquiryForm />
        </div>
      </SectionWrapper>

      {/* ── Event Gallery ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <ImageGallery images={eventGallery} rows={[2, 3, 3, 2, 3, 3, 2, 2, 2]} />
        </div>
      </section>
    </>
  )
}
