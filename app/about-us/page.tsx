import type { Metadata } from 'next'
import Image from 'next/image'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ContactInfo from '@/components/shared/ContactInfo'
import ContactForm from '@/components/about/ContactForm'
import { storageUrl, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about LENGOLF - a premier golf simulator and bar in Bangkok. Founded by golf-loving expats, we combine exciting golf with a lively social atmosphere.',
  alternates: { canonical: `${SITE_URL}/about-us/` },
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

export default function AboutPage() {
  return (
    <>
      {/* Hero + History - Side by Side Layout */}
      <SectionWrapper>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="w-full lg:w-5/12">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src={storageUrl('venue/venue-interior-01.jpg')}
                alt="LENGOLF interior"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="w-full lg:w-7/12">
            <h2 className="mb-6 text-3xl font-bold"><span className="text-primary">OUR</span> HISTORY</h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Our story began as a group of golf-loving expats in Bangkok who just wanted to play golf. But we often found that traffic and weather got in the way. Frustrated, we sought out golf simulators as a convenient alternative. While the technology was impressive, the private room and closed off nature of the available options in Bangkok left much to be desired. We envisioned a place that combined the excitement of golf with a lively, social atmosphere.
              </p>
              <p>
                Determined to create something unique, we decided to take matters into our own hands. We tore down the walls, added a bar, and infused the space with a welcoming, relaxed vibe. The result is <strong>LENGOLF</strong>, a haven for golf enthusiasts of all skill levels. Located at the Chidlom BTS stop, we offer state-of-the-art Korean simulators, delicious food and drinks, and a break from the Bangkok heat. At <strong>LENGOLF</strong>, we&apos;re more than just a golf simulator; we&apos;re a community where fun and golf thrive.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper className="bg-muted">
        <h2 className="mb-10 text-3xl font-bold"><span className="text-primary">WHY</span> CHOOSE US</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-primary">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact Info */}
      <SectionWrapper>
        <div className="mx-auto max-w-2xl">
          <ContactInfo />
        </div>
      </SectionWrapper>

      {/* Contact Form */}
      <SectionWrapper className="bg-muted">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Get in Touch</h2>
          <ContactForm />
        </div>
      </SectionWrapper>
    </>
  )
}
