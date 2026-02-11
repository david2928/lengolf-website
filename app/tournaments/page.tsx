import type { Metadata } from 'next'
import Image from 'next/image'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ContactInfo from '@/components/shared/ContactInfo'
import ImageGallery from '@/components/shared/ImageGallery'
import { storageUrl } from '@/lib/constants'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqItems } from '@/data/pricing'

export const metadata: Metadata = {
  title: 'Tournaments',
  description: 'Join exciting golf competitions at LENGOLF Bangkok. Compete, win prizes, and enjoy our indoor golf tournaments. Open to all skill levels.',
}

const pastTournamentImages = [
  { src: storageUrl('tournaments/tournament-01.jpg'), alt: 'Past tournament', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-02.jpg'), alt: 'Tournament players', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-03.jpg'), alt: 'Tournament event', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-04.jpg'), alt: 'Golf tournament', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-05.jpg'), alt: 'Tournament winners', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-06.jpg'), alt: 'Tournament group', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-07.jpg'), alt: 'Tournament play', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-08.jpg'), alt: 'Tournament photo', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-09.jpg'), alt: 'Tournament action', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-10.jpg'), alt: 'Tournament participants', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-11.jpg'), alt: 'Tournament celebration', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-12.jpg'), alt: 'Tournament prizes', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-13.jpg'), alt: 'Tournament award', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-14.jpg'), alt: 'Golf competition', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-15.jpg'), alt: 'Tournament finale', width: 1200, height: 800 },
  { src: storageUrl('tournaments/tournament-16.jpg'), alt: 'Tournament group photo', width: 1200, height: 800 },
]

export default function TournamentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center text-white overflow-hidden">
        <Image
          src={storageUrl('events/event-15.jpg')}
          alt="LENGOLF venue exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-left sm:px-6 lg:px-8">
          <span className="inline-block rounded bg-primary px-4 py-1 text-sm font-bold uppercase tracking-wider text-white mb-4">Tournaments</span>
          <h1 className="mb-4 text-4xl font-black uppercase lg:text-5xl">Compete and Win</h1>
          <p className="text-lg text-gray-200">Join our exciting golf competitions at LENGOLF</p>
        </div>
      </section>

      {/* Active Tournament */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold">Active Tournament</h2>
        <div className="mx-auto max-w-2xl">
          <Image
            src={storageUrl('tournaments/coming-soon.png')}
            alt="Tournament Coming Soon"
            width={800}
            height={600}
            className="w-full rounded-lg"
          />
        </div>
      </SectionWrapper>

      {/* FAQs */}
      <SectionWrapper className="bg-muted">
        <h2 className="mb-10 text-center text-3xl font-bold">FAQS</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>

      {/* Past Tournaments */}
      <SectionWrapper>
        <h2 className="mb-10 text-center text-3xl font-bold">Past Tournaments</h2>
        <ImageGallery images={pastTournamentImages} />
      </SectionWrapper>

      {/* Contact */}
      <SectionWrapper className="bg-muted">
        <div className="mx-auto max-w-2xl">
          <ContactInfo />
        </div>
      </SectionWrapper>
    </>
  )
}
