import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'

export const metadata: Metadata = {
  title: 'Golf Simulator Rentals & Bay Rates',
  description: 'Book your bay at LENGOLF. State-of-the-art Korean Bravo Golf simulators, 400-700 THB per hour, up to 5 players per bay. Indoor golf in Bangkok.',
}

const waysToPlay = [
  {
    title: 'DRIVING RANGE',
    description: "Experience top-notch accuracy and get valuable golf swing data. Learn your distances and see exactly where you can improve. Whether you're in the mood for a relaxed practice session with music or want to focus on your data, this is the place for you.",
    image: '/images/WAYS_TO_PLAY_1-min.png',
  },
  {
    title: 'COURSE PLAY',
    description: 'Choose from over 100 championship courses, including renowned ones like Pebble Beach and TPC Sawgrass. Enjoy stunning high-definition graphics and take on challenges without the fear of losing your ball. Be daring and try to carry the water!',
    image: '/images/WAYS_TO_PLAY_2-min.png',
  },
  {
    title: 'GAMES & COMPETITIONS',
    description: "Challenge yourself with different modes like closest to the pin and longest drive. Perfect for a fun and competitive game night with family and friends, whether you're a beginner or a seasoned golfer. This is golf entertainment for everyone.",
    image: '/images/WAYS_TO_PLAY_3-min.png',
  },
]

const ourSetup = [
  {
    title: 'Auto Tee System & Surface Mats',
    description: 'Our simulators feature an easy-to-use auto tee system that streamlines your game, allowing you to focus on your swing. Practice on realistic surface mats that simulate green, rough, and bunker conditions, providing a true-to-course experience.',
    image: '/images/OUR_SETUP_1-min.png',
  },
  {
    title: 'High Precision Simulator',
    description: 'Experience 99% accuracy with our simulators, capturing key swing metrics like club speed, ball speed, and launch angle. This precision offers detailed feedback to help you refine your technique and elevate your game.',
    image: '/images/210210_0.jpg',
  },
  {
    title: 'Putting Green',
    description: 'Practice your putting on our large putting green, featuring high-quality graded turf and realistic slopes. This dedicated area allows you to hone your skills with conditions that closely mimic those on a real course.',
    image: '/images/OUR_SETUP_3-min.png',
  },
]

const promoImages = [
  '/images/New-Customer_TV.jpg',
  '/images/Early-Bird.jpg',
  '/images/003-01.jpg',
  '/images/Buy-2H-get-2H_2_Social-Media-copy-4.jpg',
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
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex h-[50vh] min-h-[400px] max-h-[550px] items-center text-white overflow-hidden">
        <Image
          src="/images/Store-Picture-for-Google-Maps-07.png"
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
            At <strong className="text-foreground">LENGOLF</strong>, enjoy Bangkok&apos;s premier indoor golf simulators. Our top-notch Korean Bravo Golf simulators are designed for fun and excitement, featuring an auto tee system and various surfaces. Each simulator is available for rent at 400-700 baht per hour, depending on the time of day. Perfect for groups, each bay can comfortably host up to 5 people. Experience precision analysis on the dynamic range or play on world-class courses with stunning high-definition graphics. You can also challenge yourself with interactive games and different play modes, all included in the hourly rate. Planning for a larger group or multiple simulators? Contact us or visit our events page for more details.
          </p>
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
                src="/images/Bay-Rate_Social.jpg"
                alt="LENGOLF Bay Rates"
                width={768}
                height={768}
                className="w-full rounded-lg shadow-sm"
              />
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
                src="/images/Monthly-Packages_Social.jpg"
                alt="LENGOLF Monthly Packages"
                width={768}
                height={768}
                className="w-full rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Promotion ── */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>OUR</span>{' '}
          <span className="text-foreground">PROMOTION</span>
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          {promoImages.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg">
              <Image
                src={img}
                alt={`Promotion ${i + 1}`}
                width={600}
                height={600}
                className="w-full"
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
      <section
        className="py-16 lg:py-24"
        style={{ backgroundColor: '#F6FFFA' }}
      >
        <div className="section-max-width section-padding">
          <h2 className="mb-14 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>OUR</span>{' '}
            <span className="text-foreground">SETUP</span>
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {ourSetup.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={420}
                    height={520}
                    className="w-full aspect-[4/5] object-cover"
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

      {/* ── Who We Serve ── */}
      <section className="py-14 lg:py-20" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-8 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>Who</span>{' '}
            <span className="text-foreground">we serve:</span>
          </h2>
          <div className="mx-auto max-w-3xl">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3 lg:grid-cols-5">
              {locationLinks.map((loc) => (
                <li key={loc.name} className="text-center sm:text-left">
                  <Link
                    href={loc.href}
                    className="text-sm font-medium transition-colors hover:underline"
                    style={{ color: '#007429' }}
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
