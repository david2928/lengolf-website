import type { Metadata } from 'next'
import Image from 'next/image'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import ImageGallery from '@/components/shared/ImageGallery'
import ServicesCarousel from '@/components/home/ServicesCarousel'
import { services } from '@/data/pricing'
import { BUSINESS_INFO, BOOKING_URL, storageUrl } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'LENGOLF | Premier Indoor Golf Simulator & Bar in Bangkok',
  description: 'LENGOLF is a premier golf simulator and bar in the heart of Bangkok, located inside The Mercury Ville @ BTS Chidlom. Perfect for all skill levels.',
}

const galleryImages = [
  { src: storageUrl('venue/venue-simulator-01.jpg'), alt: 'LENGOLF indoor golf simulator', width: 1024, height: 683 },
  { src: storageUrl('venue/venue-interior-01.png'), alt: 'LENGOLF store', width: 1024, height: 1024 },
  { src: storageUrl('venue/venue-interior-02.png'), alt: 'LENGOLF interior', width: 1024, height: 1024 },
  { src: storageUrl('venue/venue-interior-03.png'), alt: 'LENGOLF setup', width: 1024, height: 1024 },
  { src: storageUrl('venue/venue-bay-01.jpg'), alt: 'LENGOLF simulator bay', width: 1024, height: 683 },
  { src: storageUrl('venue/venue-bar-01.jpg'), alt: 'LENGOLF bar area', width: 683, height: 1024 },
  { src: storageUrl('venue/venue-event-space.jpg'), alt: 'LENGOLF event space', width: 1024, height: 683 },
  { src: storageUrl('venue/venue-simulator-02.jpg'), alt: 'LENGOLF golf simulator', width: 1024, height: 683 },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Video */}
      <section
        className="relative flex items-center justify-center text-white overflow-hidden"
        style={{ minHeight: '620px', backgroundColor: '#30884E' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={storageUrl('videos/hero-video.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center" style={{ paddingLeft: '20%', paddingRight: '20%' }}>
          <Image
            src={storageUrl('branding/logo-typo.png')}
            alt="LENGOLF"
            width={400}
            height={100}
            className="mx-auto mb-8 h-auto w-64 sm:w-80 lg:w-96"
            priority
          />
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white transition-colors hover:bg-[#045923]"
            style={{
              backgroundColor: '#007429',
              borderRadius: '4px',
              width: '200px',
              padding: '10px',
              fontFamily: '"Poppins", sans-serif',
              fontSize: '13px',
              fontWeight: 400,
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            BOOK NOW
          </a>
        </div>
      </section>

      {/* About & What We Offer */}
      <div style={{ paddingTop: '80px', paddingLeft: '5%', paddingRight: '5%' }}>
        <div className="flex flex-col lg:flex-row lg:flex-nowrap">
          {/* Mobile: WE ARE text + BOOK NOW first */}
          <div className="lg:hidden text-center mb-10">
            <h2 className="text-3xl font-bold mb-5" style={{ color: '#063B39' }}>
              WE ARE <span style={{ color: '#005a32' }}>LENGOLF</span>
            </h2>
            <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: '26px', color: '#666666' }}>
              <strong style={{ color: '#063B39' }}>LENGOLF</strong> is a premier golf simulator and bar in the heart of Bangkok, located inside The Mercury Ville @ BTS Chidlom. Perfect for all skill levels, we offer a fun, relaxed environment to enjoy golf. Whether you&apos;re a seasoned pro or a beginner, <strong style={{ color: '#063B39' }}>LENGOLF</strong> is your go-to destination for golfing excitement and entertainment. Experience the joy of social golfing with friends and be part of a vibrant community that shares your passion for the game.
            </p>
            <div className="mt-8 flex justify-center">
              <BookingCTA />
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[42%] flex-shrink-0 mb-10 lg:mb-0">
            <Image
              src={storageUrl('venue/venue-interior-01.png')}
              alt="LENGOLF interior"
              width={800}
              height={1000}
              className="w-full h-full object-cover"
              style={{ borderRadius: '0 200px 0 0' }}
            />
          </div>

          {/* Desktop: both text sections alongside image */}
          <div className="hidden lg:flex w-full lg:w-[58%] flex-col justify-center pl-[5%]">
            <div>
              <h2 className="text-4xl font-bold mb-5" style={{ color: '#063B39' }}>
                WE ARE <span style={{ color: '#005a32' }}>LENGOLF</span>
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: '26px', color: '#666666' }}>
                <strong style={{ color: '#063B39' }}>LENGOLF</strong> is a premier golf simulator and bar in the heart of Bangkok, located inside The Mercury Ville @ BTS Chidlom. Perfect for all skill levels, we offer a fun, relaxed environment to enjoy golf. Whether you&apos;re a seasoned pro or a beginner, <strong style={{ color: '#063B39' }}>LENGOLF</strong> is your go-to destination for golfing excitement and entertainment. Experience the joy of social golfing with friends and be part of a vibrant community that shares your passion for the game.
              </p>
              <div className="mt-8">
                <BookingCTA />
              </div>
            </div>

            <div className="mt-14">
              <h2 className="text-4xl font-bold mb-5" style={{ color: '#063B39' }}>
                WHAT WE <span style={{ color: '#005a32' }}>OFFER</span>
              </h2>
              <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: '26px', color: '#666666' }}>
                At <strong style={{ color: '#063B39' }}>LENGOLF</strong>, we offer state-of-the-art Korean golf simulators, providing a top-notch golfing experience. Enjoy a fun and relaxed atmosphere with a great selection of food and drinks. Escape the Bangkok heat and unwind while playing golf in our comfortable, climate-controlled environment. Perfect for all skill levels!
              </p>
            </div>
          </div>

          {/* Mobile: WHAT WE OFFER after image */}
          <div className="lg:hidden text-center">
            <h2 className="text-3xl font-bold mb-5" style={{ color: '#063B39' }}>
              WHAT WE <span style={{ color: '#005a32' }}>OFFER</span>
            </h2>
            <p style={{ fontSize: '16px', fontWeight: 400, lineHeight: '26px', color: '#666666' }}>
              At <strong style={{ color: '#063B39' }}>LENGOLF</strong>, we offer state-of-the-art Korean golf simulators, providing a top-notch golfing experience. Enjoy a fun and relaxed atmosphere with a great selection of food and drinks. Escape the Bangkok heat and unwind while playing golf in our comfortable, climate-controlled environment. Perfect for all skill levels!
            </p>
          </div>
        </div>
      </div>

      {/* Services Carousel */}
      <div style={{ marginTop: '4%', paddingBottom: '6%' }}>
        <ServicesCarousel services={services} />
      </div>

      {/* Top-Rated Banner */}
      <section className="relative overflow-hidden text-white py-8 lg:py-12" style={{ background: 'linear-gradient(to right, #003d1f, #005a32, #007a45)' }}>
        <div className="section-max-width section-padding flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <h2 className="font-semibold text-center lg:text-left tracking-wide italic" style={{ fontSize: '26px' }}>
            TOP-RATED INDOOR GOLF SIMULATOR EXPERIENCE IN BANGKOK
          </h2>
          <Image
            src={storageUrl('branding/logo-symbol.png')}
            alt="LENGOLF symbol"
            width={200}
            height={200}
            className="flex-shrink-0"
          />
        </div>
        {/* Curved bottom edge — dips down in the middle */}
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -bottom-[1px] left-0 w-full h-[40px] lg:h-[60px] block">
          <path d="M0 0 Q720 80 1440 0 L1440 80 L0 80 Z" fill="white" />
        </svg>
      </section>

      {/* Gallery */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold lg:text-4xl"><span className="text-primary">LENGOLF</span> GALLERY</h2>
        <ImageGallery images={galleryImages} rows={[5, 3]} />
      </SectionWrapper>

      {/* Location Map */}
      <SectionWrapper className="bg-muted">
        <h2 className="mb-10 text-center text-3xl font-bold lg:text-4xl"><span className="text-primary">LENGOLF</span> LOCATION</h2>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-lg">
          <iframe
            src={BUSINESS_INFO.googleMapsEmbed}
            title="LENGOLF Location"
            aria-label="LENGOLF"
            className="h-[400px] w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </SectionWrapper>
    </>
  )
}
