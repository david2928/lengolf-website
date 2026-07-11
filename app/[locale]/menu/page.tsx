import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import FaqSection from '@/components/shared/FaqSection'
import MenuImageCard from '@/components/shared/MenuImageCard'
import { storageUrl, SITE_URL, BUSINESS_INFO } from '@/lib/constants'
import { getFoodMenuJsonLd, getFaqPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld'
import { menuGroups, menuImages, foodMenuFaqItems, type MenuSection } from '@/data/food-menu'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const prefix = locale === 'en' ? '' : `/${locale}`
  return {
    title: 'Food & Drinks Menu with Prices',
    description:
      'LENGOLF food and drinks menu with prices: Smith & Co burgers from 320 THB, Sexy Pizza from 380 THB, cocktails from 250 THB, beer, wine, and unlimited soft drinks.',
    alternates: {
      canonical: `${SITE_URL}${prefix}/menu/`,
    },
    openGraph: {
      images: [{ url: storageUrl('menus/food-drinks-cover.jpg'), alt: 'Food and drinks at LENGOLF Bangkok' }],
    },
  }
}

const faqLinks = {
  'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
  '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  'events page': { href: '/events' },
  'bay rates page': { href: '/golf' },
}

function MenuSectionCard({ section }: { section: MenuSection }) {
  return (
    <div className="break-inside-avoid rounded-xl border border-primary/10 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-xl font-bold italic uppercase" style={{ color: '#007429' }}>
        {section.title}
      </h3>
      {section.note && <p className="mt-1 text-xs text-muted-foreground">{section.note}</p>}
      <ul className="mt-3 divide-y divide-border/60">
        {section.items.map((menuItem) => (
          <li key={menuItem.name} className="py-3">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-semibold text-foreground">{menuItem.name}</span>
              <span className="shrink-0 whitespace-nowrap text-sm font-bold" style={{ color: '#007429' }}>
                {menuItem.priceLabel}
              </span>
            </div>
            {menuItem.description && (
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{menuItem.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const menuJsonLd = getFoodMenuJsonLd(menuGroups)
  const faqJsonLd = getFaqPageJsonLd(foodMenuFaqItems)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Food & Drinks Menu', url: `${SITE_URL}/menu/` },
  ])

  const stats = [
    { stat: 'From 320 THB', label: 'Burgers by Smith & Co' },
    { stat: 'From 380 THB', label: 'Pizzas by Sexy Pizza' },
    { stat: 'From 250 THB', label: 'Signature cocktails' },
    { stat: '100 THB / hr', label: 'Unlimited soft drinks' },
  ]

  const groupMeta: Record<string, { titlePrimary: string; titleSuffix: string; logo: string; logoAlt: string }> = {
    food: {
      titlePrimary: 'FOOD',
      titleSuffix: 'BY SMITH & CO',
      logo: storageUrl('branding/partner-smith-co.png'),
      logoAlt: 'Smith & Co logo',
    },
    pizza: {
      titlePrimary: 'PIZZA',
      titleSuffix: 'BY SEXY PIZZA',
      logo: storageUrl('branding/partner-sexy-pizza.png'),
      logoAlt: 'Sexy Pizza logo',
    },
    drinks: {
      titlePrimary: 'DRINKS',
      titleSuffix: '& BAR',
      logo: storageUrl('branding/logo-avatar.png'),
      logoAlt: 'LENGOLF logo',
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Hero ── */}
      <section className="relative flex h-[50vh] min-h-[400px] max-h-[550px] items-center text-white overflow-hidden">
        {/* Food photo: full-bleed on mobile, right half on desktop (source is 800px wide, so never stretch it full-bleed on desktop) */}
        <div className="absolute inset-0 md:left-1/2">
          <Image
            src={storageUrl('menus/food-drinks-cover.jpg')}
            alt="Smith & Co smash burger, katsu sandwich, and calamari served at LENGOLF Bangkok"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Mobile: green wash over the photo */}
        <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, rgba(0,64,37,0.78) 0%, rgba(0,90,50,0.55) 100%)' }} />
        {/* Desktop: solid brand panel on the left, blending into the photo */}
        <div className="absolute inset-y-0 left-0 hidden w-1/2 md:block" style={{ background: 'linear-gradient(135deg, #004025 0%, #005a32 100%)' }} />
        <div className="absolute inset-y-0 left-1/2 hidden w-40 md:block" style={{ background: 'linear-gradient(90deg, #005a32 0%, rgba(0,90,50,0) 100%)' }} />
        <div className="relative z-10 w-full text-left md:w-1/2" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          <span
            className="inline-block rounded px-6 py-2 text-lg font-bold uppercase tracking-widest text-white mb-5 md:text-xl"
            style={{ backgroundColor: '#7CB342' }}
          >
            EAT. DRINK. PLAY.
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            FOOD & DRINKS MENU
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            Burgers, pizza, cocktails, and more, served straight to your simulator bay
          </p>
        </div>
      </section>

      {/* ── Intro + Stats ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            LENGOLF is a golf simulator bar, so the food and drinks matter as much as the golf. Our kitchen partners
            Smith & Co (burgers, sliders, sharing plates) and Sexy Pizza (wood-fired Neapolitan pizzas) cook to order,
            and our full bar pours signature cocktails, Japanese highballs, beer, and wine. Everything arrives at your
            bay at {BUSINESS_INFO.addressShort}, open {BUSINESS_INFO.hours}.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-4">
                <div className="text-xl font-bold sm:text-2xl" style={{ color: '#007429' }}>{item.stat}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {menuGroups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-[#007429] transition-colors hover:bg-primary hover:text-white"
              >
                {group.title}
              </a>
            ))}
            <BookingCTA />
          </div>
        </div>
      </SectionWrapper>

      {/* ── Menu groups ── */}
      {menuGroups.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          className="py-16 lg:py-24"
          style={groupIndex % 2 === 0 ? { backgroundColor: '#F6FFFA' } : undefined}
        >
          <div className="section-max-width section-padding">
            <div className="mb-5 flex justify-center">
              <Image
                src={groupMeta[group.id].logo}
                alt={groupMeta[group.id].logoAlt}
                width={512}
                height={512}
                className="h-16 w-16 rounded-2xl border border-border/60 object-cover shadow-sm md:h-20 md:w-20"
              />
            </div>
            <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
              <span style={{ color: '#007429' }}>{groupMeta[group.id].titlePrimary}</span>{' '}
              <span className="text-foreground">{groupMeta[group.id].titleSuffix}</span>
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground">{group.subtitle}</p>
            <div className={group.sections.length === 1 ? 'mx-auto max-w-2xl' : 'mx-auto max-w-5xl columns-1 gap-6 space-y-6 md:columns-2'}>
              {group.sections.map((section) => (
                <MenuSectionCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Book Now CTA ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">Hungry? Book a bay and order at your seat</h2>
          <p className="mb-6 text-white/80">
            Simulator bays from 550 THB per hour for up to 5 players, with food and drinks served while you play
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookingCTA className="bg-white text-primary hover:bg-white/90" />
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

      {/* ── Printed menus ── */}
      <SectionWrapper>
        <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>THE PRINTED</span>{' '}
          <span className="text-foreground">MENUS</span>
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground">
          The same menus you will find at your bay. Tap any menu to view it full size.
        </p>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {menuImages.map((img) => (
            <MenuImageCard
              key={img.src}
              src={img.src}
              alt={img.alt}
              title={img.title}
              width={img.width}
              height={img.height}
              previewPosition={img.previewPosition}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ── FAQ ── */}
      <FaqSection
        items={foodMenuFaqItems}
        links={faqLinks}
        title="FOOD & DRINKS"
        titleSuffix="FAQ"
        bgColor="#F6FFFA"
      />

      {/* ── Cross-links ── */}
      <section className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>MAKE IT</span>{' '}
            <span className="text-foreground">A SESSION</span>
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Pair the menu with a simulator bay, a lesson, or a private event.
          </p>
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: 'Bay Rates & Packages', href: '/golf' },
                { label: 'Private Events & Parties', href: '/events' },
                { label: 'Golf Lessons', href: '/lessons' },
                { label: 'Things To Do in Bangkok', href: '/activities' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href as Parameters<typeof Link>[0]['href']}
                  className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-[#007429] transition-colors hover:bg-primary hover:text-white"
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
