import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import SectionWrapper from '@/components/shared/SectionWrapper'
import FaqSection from '@/components/shared/FaqSection'
import { storageUrl, SITE_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { getCourseClubRentalServiceJsonLd, getFaqPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld'
import {
  MessageCircle,
  CalendarDays,
  CheckCircle2,
  Truck,
  Phone,
  MapPin,
  Package,
} from 'lucide-react'

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  '@lengolf': { href: SOCIAL_LINKS.line, external: true },
  'LINE @lengolf': { href: SOCIAL_LINKS.line, external: true },
  'Google Maps': { href: BUSINESS_INFO.googleMapsUrl, external: true },
}

const FAQ_COUNT = 6

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'CourseClubRental' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${SITE_URL}${locale === 'th' ? '/th' : ''}/golf-course-club-rental/`,
      languages: {
        en: `${SITE_URL}/golf-course-club-rental/`,
        th: `${SITE_URL}/th/golf-course-club-rental/`,
      },
    },
    openGraph: { images: [{ url: storageUrl('golf/hero-golf.jpg'), alt: 'Golf course club rental Bangkok' }] },
  }
}

export default async function GolfCourseClubRentalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('CourseClubRental')
  const tFaq = await getTranslations('CourseClubRentalFaq')
  const tCommon = await getTranslations('Common')

  const faqItems = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: tFaq(`q${i + 1}`),
    answer: tFaq(`a${i + 1}`),
  }))

  const serviceJsonLd = getCourseClubRentalServiceJsonLd()
  const faqJsonLd = getFaqPageJsonLd(faqItems)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Club Rental', url: `${SITE_URL}/golf-club-rental/` },
    { name: t('metaTitle'), url: `${SITE_URL}/golf-course-club-rental/` },
  ])

  // Pre-filled LINE message
  const lineMessage = encodeURIComponent(t('ctaLinePrefill'))
  const lineUrl = `https://line.me/R/oaMessage/%40lengolf/?${lineMessage}`

  const steps = [
    {
      num: 1,
      icon: <Package size={22} className="text-primary/60" />,
      title: t('step1Title'),
      desc: t('step1Desc'),
    },
    {
      num: 2,
      icon: <MessageCircle size={22} className="text-primary/60" />,
      title: t('step2Title'),
      desc: t('step2Desc'),
    },
    {
      num: 3,
      icon: <CheckCircle2 size={22} className="text-primary/60" />,
      title: t('step3Title'),
      desc: t('step3Desc'),
    },
    {
      num: 4,
      icon: <Truck size={22} className="text-primary/60" />,
      title: t('step4Title'),
      desc: t('step4Desc'),
    },
  ]

  const pricingRows: { duration: string; price: string; note?: string }[] = [
    { duration: t('pricingRow1Duration'), price: t('pricingRow1Price') },
    { duration: t('pricingRow2Duration'), price: t('pricingRow2Price'), note: t('pricingRow2Note') },
    { duration: t('pricingRow3Duration'), price: t('pricingRow3Price'), note: t('pricingRow3Note') },
    { duration: t('pricingRow4Duration'), price: t('pricingRow4Price'), note: t('pricingRow4Note') },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="relative flex h-[50vh] min-h-[400px] max-h-[550px] items-center text-white overflow-hidden">
        <Image
          src={storageUrl('golf/hero-golf.jpg')}
          alt="Golf course club rental Bangkok"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,90,50,0.60) 0%, rgba(0,122,69,0.45) 40%, rgba(0,90,50,0.30) 100%)',
          }}
        />
        <div className="relative z-10 w-full text-left" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          <div className="flex flex-wrap gap-2 mb-5">
            <span
              className="inline-block rounded px-5 py-2 text-base font-bold uppercase tracking-widest text-white md:text-lg"
              style={{ backgroundColor: '#7CB342' }}
            >
              {t('heroBadge')}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              {t('heroResponseBadge')}
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-black uppercase leading-none md:text-5xl lg:text-6xl max-w-3xl">
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
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md px-8 text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: '#00B900' }}
            >
              <MessageCircle size={16} />
              {t('ctaLineButton')}
            </a>
            <a
              href="#pricing"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              {t('pricingTitle')}
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* ── How It Works (4-step infographic) ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-12 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('howItWorksTitle')}</span>{' '}
            <span className="text-foreground">{t('howItWorksTitleSuffix')}</span>
          </h2>

          {/* Desktop: horizontal with connectors. Mobile: vertical. */}
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-0">
              {steps.map((step, idx) => (
                <div key={step.num} className="flex md:flex-col md:flex-1 md:items-center md:text-center gap-4 md:gap-0">
                  {/* Step circle + connector row (desktop) */}
                  <div className="flex items-center gap-0 md:w-full md:justify-center md:mb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-lg" style={{ color: '#007429' }}>
                      {step.num}
                    </div>
                    {/* Connector line — only between steps, desktop only */}
                    {idx < steps.length - 1 && (
                      <div className="hidden md:block flex-1 border-t-2 border-dashed border-primary/20 mx-2" />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex flex-col gap-1.5 md:items-center md:px-3">
                    <div className="flex items-center gap-2 md:flex-col md:gap-1.5">
                      {step.icon}
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming-soon note */}
          <p className="mt-10 text-center text-sm italic text-muted-foreground max-w-lg mx-auto">
            {t('comingSoonNote')}
          </p>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('pricingTitle')}</span>{' '}
            <span className="text-foreground">{t('pricingTitleSuffix')}</span>
          </h2>
          <div className="mx-auto max-w-xl space-y-6">
            {/* Pricing table */}
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-3 text-sm font-semibold">{t('duration')}</th>
                    <th className="px-6 py-3 text-sm font-semibold text-right">{t('price')}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-foreground">{row.duration}</span>
                        {row.note && (
                          <span className="ml-2 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                            {row.note}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-right" style={{ color: '#007429' }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* sr-only table for crawlers */}
            <div className="sr-only">
              <table>
                <caption>LENGOLF Golf Course Club Rental Pricing</caption>
                <thead><tr><th>Duration</th><th>Price</th><th>Note</th></tr></thead>
                <tbody>
                  {pricingRows.map((row, i) => (
                    <tr key={i}><td>{row.duration}</td><td>{row.price}</td><td>{row.note || ''}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground">{t('pricingNote')}</p>

            {/* Delivery callout */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 shrink-0 text-primary" size={20} />
                <div>
                  <p className="font-semibold text-foreground">{t('deliveryTitle')} — <span style={{ color: '#007429' }}>{t('deliveryPrice')}</span></p>
                  <p className="mt-1 text-sm text-muted-foreground">{t('deliveryDesc')}</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic">{t('prepaymentNote')}</p>
          </div>
        </div>
      </section>

      {/* ── Clubs Available ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('clubsTitle')}</span>{' '}
            <span className="text-foreground">{t('clubsTitleSuffix')}</span>
          </h2>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {([1, 2] as const).map((i) => (
              <div key={i} className="rounded-xl border border-primary/20 bg-white p-6">
                <h3 className="mb-1 text-xl font-bold" style={{ color: '#007429' }}>{t(`club${i}Name`)}</h3>
                <p className="mb-4 text-sm font-semibold text-muted-foreground">{t(`club${i}Gender`)}</p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                      {t(`club${i}Spec${j}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection items={faqItems} links={faqLinks} title={t('faqTitle')} titleSuffix={t('faqTitleSuffix')} />

      {/* ── CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">{t('ctaTitle')}</h2>
          <p className="mb-6 text-white/80">{t('ctaSubtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#00B900' }}
            >
              <MessageCircle size={16} />
              {t('ctaLineButton')}
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone size={16} />
              {t('ctaPhoneButton')}
            </a>
          </div>
        </div>
      </section>

      {/* ── Cross-links ── */}
      <SectionWrapper>
        <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>{t('crossLinksTitle')}</span>{' '}
          <span className="text-foreground">{t('crossLinksTitleSuffix')}</span>
        </h2>
        <div className="mx-auto mt-8 max-w-3xl grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/golf-club-rental"
            className="group rounded-xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
              <MapPin size={20} />
            </div>
            <h3 className="mb-1 font-bold text-foreground group-hover:text-primary transition-colors">{t('crossLink1Label')}</h3>
            <p className="text-sm text-muted-foreground">{t('crossLink1Desc')}</p>
          </Link>
          <Link
            href="/second-hand-golf-clubs-bangkok"
            className="group rounded-xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <h3 className="mb-1 font-bold text-foreground group-hover:text-primary transition-colors">{t('crossLink2Label')}</h3>
            <p className="text-sm text-muted-foreground">{t('crossLink2Desc')}</p>
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
