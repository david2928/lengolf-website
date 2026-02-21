import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import { storageUrl, SITE_URL, BUSINESS_INFO } from '@/lib/constants'
import { getClubRentalPricingJsonLd, getClubRentalServiceJsonLd, getFaqPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld'
import FaqSection from '@/components/shared/FaqSection'

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
  '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  'Google Maps': { href: BUSINESS_INFO.googleMapsUrl, external: true },
  'bay rates page': { href: '/golf' },
}

const gearIconMap: Record<string, React.ReactNode> = {
  hand: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 17"/></svg>
  ),
  circle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
  ),
  truck: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
  ),
}

const whyChooseIconMap: Record<string, React.ReactNode> = {
  award: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
  ),
  'map-pin': (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
  ),
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Clubs at LENGOLF | Premium Golf Club Rental for Simulator Sessions',
    description: 'Upgrade your LENGOLF bay session with premium golf clubs. Free standard sets included. Callaway Warbird & Majesty Shuttle from 150 THB/hr — in-house simulator use only.',
    alternates: {
      canonical: `${SITE_URL}${locale === 'th' ? '/th' : ''}/golf-club-rental/`,
      languages: { en: `${SITE_URL}/golf-club-rental/`, th: `${SITE_URL}/th/golf-club-rental/` },
    },
    openGraph: { images: [{ url: storageUrl('venue/venue-simulator-01.jpg'), alt: 'Golf club rental at LENGOLF Bangkok' }] },
  }
}

const FAQ_COUNT = 6

export default async function ClubRentalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('ClubRental')
  const tFaq = await getTranslations('ClubRentalFaq')
  const tCommon = await getTranslations('Common')

  const faqItems = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: tFaq(`q${i + 1}`),
    answer: tFaq(`a${i + 1}`),
  }))

  const pricingJsonLd = getClubRentalPricingJsonLd()
  const serviceJsonLd = getClubRentalServiceJsonLd()
  const faqJsonLd = getFaqPageJsonLd(faqItems)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: t('metaTitle'), url: `${SITE_URL}/golf-club-rental/` },
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
      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
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
          alt="Premium golf club rental at LENGOLF Bangkok"
          fill
          className="object-cover object-center"
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
            {t('heroBadge')}
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            {t('heroTitle')}
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* ── Intro + Stat Chips ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t('introText')}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-4">
                <div className="text-2xl font-bold" style={{ color: '#007429' }}>{t(`stat${i}Value`)}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t(`stat${i}Label`)}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookingCTA />
            <a
              href="#pricing"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
              {t('pricing')}
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Club Rental Tiers ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('tiersTitle')}</span>{' '}
            <span className="text-foreground">{t('tiersTitleSuffix')}</span>
          </h2>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-xl border p-6 transition-shadow hover:shadow-md ${
                  i > 1
                    ? 'border-primary/30 bg-white shadow-sm'
                    : 'border-border/60 bg-white'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      i === 1
                        ? 'bg-primary/10 text-primary'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {t(`tier${i}Tag`)}
                  </span>
                </div>
                <h3 className="mb-1 text-xl font-bold" style={{ color: '#007429' }}>{t(`tier${i}Name`)}</h3>
                <p className="mb-1 text-sm font-semibold text-foreground">{t(`tier${i}Brand`)}</p>
                <p className="mb-4 text-xs text-muted-foreground">{t(`tier${i}Type`)}</p>
                <ul className="mb-5 space-y-2">
                  {[1, 2, 3].map((j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                      {t(`tier${i}Spec${j}`)}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border/40 pt-4">
                  <p className="text-lg font-bold" style={{ color: '#007429' }}>{t(`tier${i}Price`)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* sr-only table for crawlers */}
          <div className="sr-only">
            <table>
              <caption>LENGOLF Golf Club Rental Options</caption>
              <thead>
                <tr>
                  <th>Set</th>
                  <th>Brand</th>
                  <th>Type</th>
                  <th>Includes</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td>{t(`tier${i}Name`)}</td>
                    <td>{t(`tier${i}Brand`)}</td>
                    <td>{t(`tier${i}Type`)}</td>
                    <td>{[1, 2, 3].map(j => t(`tier${i}Spec${j}`)).join('; ')}</td>
                    <td>{t(`tier${i}Price`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Premium Pricing ── */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('premiumPricingTitle')}</span>{' '}
            <span className="text-foreground">{t('premiumPricingTitleSuffix')}</span>
          </h2>
          <div className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-3 text-sm font-semibold">{t('duration')}</th>
                    <th className="px-6 py-3 text-sm font-semibold text-right">{t('price')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className={i % 2 !== 0 ? 'bg-white' : 'bg-muted/30'}>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{t(`pricingRow${i}Duration`)}</td>
                      <td className="px-6 py-4 text-sm font-bold text-right" style={{ color: '#007429' }}>{t(`pricingRow${i}Price`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {t('premiumPricingNote')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Gear-Up Add-Ons ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('gearUpTitle')}</span>{' '}
            <span className="text-foreground">{t('gearUpTitleSuffix')}</span>
          </h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
            {([
              { key: 1, icon: 'hand' },
              { key: 2, icon: 'circle' },
              { key: 3, icon: 'truck' },
            ] as const).map((item) => (
              <div key={item.key} className="rounded-lg border border-primary/15 bg-white px-5 py-6 text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
                  {gearIconMap[item.icon]}
                </div>
                <h3 className="mb-1 text-base font-bold text-foreground">{t(`gear${item.key}Name`)}</h3>
                <p className="mb-2 text-lg font-bold" style={{ color: '#007429' }}>{t(`gear${item.key}Price`)}</p>
                <p className="text-xs text-muted-foreground">{t(`gear${item.key}Description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose LENGOLF ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('whyChooseTitle')}</span>{' '}
            <span className="text-foreground">{t('whyChooseTitleSuffix')}</span>
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {([
              { key: 1, icon: 'award' },
              { key: 2, icon: 'map-pin' },
              { key: 3, icon: 'clock' },
              { key: 4, icon: 'calendar' },
            ] as const).map((item) => (
              <div key={item.key} className="rounded-xl border border-border/60 bg-white p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
                  {whyChooseIconMap[item.icon]}
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{t(`why${item.key}Title`)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(`why${item.key}Description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">{t('ctaTitle')}</h2>
          <p className="mb-6 text-white/80">{t('ctaSubtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookingCTA text={tCommon('bookNow')} className="bg-white text-primary hover:bg-white/90" />
            <a
              href="https://lin.ee/uxQpIXn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              {tCommon('lineAtLengolf')}
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection items={faqItems} links={faqLinks} title={t('faqTitle')} titleSuffix={t('faqTitleSuffix')} bgColor="#F6FFFA" />

      {/* ── Also Need Clubs? Cross-links ── */}
      <SectionWrapper>
        <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>{t('exploreTitle')}</span>{' '}
          <span className="text-foreground">{t('exploreTitleSuffix')}</span>
        </h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">{t('exploreSubtitle')}</p>
        <div className="mx-auto max-w-3xl grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/golf-course-club-rental"
            className="group rounded-xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
            </div>
            <h3 className="mb-1 font-bold text-foreground group-hover:text-primary transition-colors">{t('crossLinkCourseLabel')}</h3>
            <p className="text-sm text-muted-foreground">{t('crossLinkCourseDesc')}</p>
          </Link>
          <Link
            href="/second-hand-golf-clubs-bangkok"
            className="group rounded-xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <h3 className="mb-1 font-bold text-foreground group-hover:text-primary transition-colors">{t('crossLinkSecondHandLabel')}</h3>
            <p className="text-sm text-muted-foreground">{t('crossLinkSecondHandDesc')}</p>
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
