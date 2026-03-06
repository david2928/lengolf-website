import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import SectionWrapper from '@/components/shared/SectionWrapper'
import FaqSection from '@/components/shared/FaqSection'
import { storageUrl, SITE_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { getCourseClubRentalServiceJsonLd, getFaqPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld'
import ImageLightbox from '@/components/shared/ImageLightbox'
import RentalInquiryForm from '@/components/clubs/RentalInquiryForm'
import StickyBookCTA from '@/components/clubs/StickyBookCTA'
import {
  MessageCircle,
  Truck,
  Phone,
  MapPin,
  CreditCard,
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

  const lineUrl = `https://line.me/R/oaMessage/%40lengolf/?${encodeURIComponent(t('ctaLinePrefill'))}`

  const pricingRows: { duration: string; premium: string; premiumPlus: string; note?: string }[] = [
    { duration: t('pricingRow1Duration'), premium: t('pricingRow1Premium'), premiumPlus: t('pricingRow1PremiumPlus') },
    { duration: t('pricingRow2Duration'), premium: t('pricingRow2Premium'), premiumPlus: t('pricingRow2PremiumPlus'), note: t('pricingRow2Note') },
    { duration: t('pricingRow3Duration'), premium: t('pricingRow3Premium'), premiumPlus: t('pricingRow3PremiumPlus'), note: t('pricingRow3Note') },
    { duration: t('pricingRow4Duration'), premium: t('pricingRow4Premium'), premiumPlus: t('pricingRow4PremiumPlus'), note: t('pricingRow4Note') },
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

      {/* ── Sticky mobile CTA ── */}
      <StickyBookCTA label={t('stickyBookCta')} targetId="inquiry-form" />

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
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg mb-6">
            {t('heroSubtitle')}
          </p>
          <a
            href="#inquiry-form"
            className="inline-flex h-12 items-center gap-2 rounded-md px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#00B900' }}
          >
            <MessageCircle size={16} />
            {t('stickyBookCta')}
          </a>
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
        </div>
      </SectionWrapper>

      {/* ── Clubs Available ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('clubsTitle')}</span>{' '}
            <span className="text-foreground">{t('clubsTitleSuffix')}</span>
          </h2>

          {/* ── Premium+ Paradym Set ── */}
          <div className="mx-auto max-w-4xl mb-10">
            <div className="rounded-2xl border-2 border-primary/30 bg-white overflow-hidden">
              <div className="bg-primary/5 px-6 py-4 flex items-center gap-3 border-b border-primary/10">
                <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {t('premiumBadge')}
                </span>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: '#007429' }}>{t('premiumName')}</h3>
                  <p className="text-sm font-semibold text-muted-foreground">{t('premiumGender')}</p>
                </div>
              </div>

              <div className="p-6">
                <ImageLightbox
                  className="mb-6"
                  images={[
                    { src: storageUrl('clubs/premium-plus/2.png'), alt: 'Callaway Paradym full set in bag' },
                    { src: storageUrl('clubs/premium-plus/4.png'), alt: 'Callaway Paradym Forged Carbon driver' },
                    { src: storageUrl('clubs/premium-plus/11.png'), alt: 'Callaway Paradym irons set' },
                    { src: storageUrl('clubs/premium-plus/9.png'), alt: 'Callaway Paradym fairway wood' },
                    { src: storageUrl('clubs/premium-plus/13.png'), alt: 'Callaway Jaws Raw wedges' },
                    { src: storageUrl('clubs/premium-plus/15.png'), alt: 'Odyssey White Hot Black Series putter' },
                    { src: storageUrl('clubs/premium-plus/12.png'), alt: 'Ventus TR shaft by Fujikura' },
                    { src: storageUrl('clubs/premium-plus/1.png'), alt: 'Callaway camo golf bag' },
                  ]}
                />

                <ul className="space-y-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                      {t(`premiumSpec${j}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Standard Sets ── */}
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {([1, 2] as const).map((i) => (
              <div key={i} className="rounded-xl border border-primary/20 bg-white p-6">
                {i === 1 && (
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-4 -mx-1">
                    <Image
                      src={storageUrl('clubs/warbird/warbird-full-set.webp')}
                      alt="Callaway Warbird full set with Odyssey putter"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 90vw, 45vw"
                    />
                  </div>
                )}
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

      {/* ── Pricing ── */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('pricingTitle')}</span>{' '}
            <span className="text-foreground">{t('pricingTitleSuffix')}</span>
          </h2>
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Pricing table */}
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-5 py-3 text-sm font-semibold">{t('duration')}</th>
                    <th className="px-5 py-3 text-sm font-semibold text-center">{t('pricingColPremium')}</th>
                    <th className="px-5 py-3 text-sm font-semibold text-center">{t('pricingColPremiumPlus')}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-foreground">{row.duration}</span>
                        {row.note && (
                          <span className="ml-2 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                            {row.note}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-center" style={{ color: '#007429' }}>{row.premium}</td>
                      <td className="px-5 py-4 text-sm font-bold text-center" style={{ color: '#007429' }}>{row.premiumPlus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* sr-only table for crawlers */}
            <div className="sr-only">
              <table>
                <caption>LENGOLF Golf Course Club Rental Pricing</caption>
                <thead><tr><th>Duration</th><th>Premium</th><th>Premium+</th><th>Note</th></tr></thead>
                <tbody>
                  {pricingRows.map((row, i) => (
                    <tr key={i}><td>{row.duration}</td><td>{row.premium}</td><td>{row.premiumPlus}</td><td>{row.note || ''}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground">{t('pricingNote')}</p>

            {/* Delivery + Payment info cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 shrink-0 text-primary" size={20} />
                  <div>
                    <p className="font-semibold text-foreground">{t('deliveryTitle')} — <span style={{ color: '#007429' }}>{t('deliveryPrice')}</span></p>
                    <p className="mt-1 text-sm text-muted-foreground">{t('deliveryDesc')}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 shrink-0 text-primary" size={20} />
                  <div>
                    <p className="font-semibold text-foreground">{t('paymentTitle')}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t('paymentDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground italic">{t('prepaymentNote')}</p>
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <section id="inquiry-form" className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <div className="mx-auto max-w-xl">
            <RentalInquiryForm
              lineFallbackUrl={SOCIAL_LINKS.line}
              lineOaMessageUrl="https://line.me/R/oaMessage/%40lengolf"
              email={BUSINESS_INFO.email}
              labels={{
                title: t('formTitle'),
                subtitle: t('formSubtitle'),
                clubLabel: t('formClubLabel'),
                clubPlaceholder: t('formClubPlaceholder'),
                dateLabel: t('formDateLabel'),
                durationLabel: t('formDurationLabel'),
                deliveryLabel: t('formDeliveryLabel'),
                deliveryYes: t('formDeliveryYes'),
                deliveryNo: t('formDeliveryNo'),
                addressLabel: t('formAddressLabel'),
                addressPlaceholder: t('formAddressPlaceholder'),
                lineButton: t('formLineButton'),
                emailButton: t('formEmailButton'),
                copiedToast: t('formCopiedToast'),
                addOnsLabel: t('formAddOnsLabel'),
                estimatedTotalLabel: t('formEstimatedTotal'),
                deliveryFeeNum: 500,
                msgGreeting: t('msgGreeting'),
                msgClubsPrefix: t('msgClubsPrefix'),
                msgDatePrefix: t('msgDatePrefix'),
                msgDurationPrefix: t('msgDurationPrefix'),
                msgDeliveryPrefix: t('msgDeliveryPrefix'),
                msgDeliveryYes: t('msgDeliveryYes'),
                msgDeliveryAddressTbc: t('msgDeliveryAddressTbc'),
                msgDeliveryPickup: t('msgDeliveryPickup'),
                msgAddOnsPrefix: t('msgAddOnsPrefix'),
                emailSubject: t('msgEmailSubject'),
                breakdownDelivery: t('msgBreakdownDelivery'),
                clubOptions: [
                  { value: 'paradym', tier: 'premiumPlus' as const, label: t('formClubParadym') },
                  { value: 'warbird', tier: 'premium' as const, label: t('formClubWarbird') },
                  { value: 'majesty', tier: 'premium' as const, label: t('formClubMajesty') },
                ],
                durationOptions: [
                  { value: '1', label: t('pricingRow1Duration'), premium: t('pricingRow1Premium'), premiumPlus: t('pricingRow1PremiumPlus') },
                  { value: '3', label: t('pricingRow2Duration'), premium: t('pricingRow2Premium'), premiumPlus: t('pricingRow2PremiumPlus') },
                  { value: '7', label: t('pricingRow3Duration'), premium: t('pricingRow3Premium'), premiumPlus: t('pricingRow3PremiumPlus') },
                  { value: '14', label: t('pricingRow4Duration'), premium: t('pricingRow4Premium'), premiumPlus: t('pricingRow4PremiumPlus') },
                ],
                addOns: [
                  { key: 'gloves', label: t('formAddonGloves'), price: t('formAddonGlovesPrice'), priceNum: 600 },
                  { key: 'balls', label: t('formAddonBalls'), price: t('formAddonBallsPrice'), priceNum: 400 },
                ],
              }}
            />
          </div>
        </div>
      </section>

      {/* ── How It Works (compact) ── */}
      <section className="py-12 lg:py-16">
        <div className="section-max-width section-padding">
          <h2 className="mb-8 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('howItWorksTitle')}</span>{' '}
            <span className="text-foreground">{t('howItWorksTitleSuffix')}</span>
          </h2>
          <div className="mx-auto max-w-2xl">
            <ol className="space-y-4">
              {[1, 2, 3].map((step) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold" style={{ color: '#007429' }}>
                    {step}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground pt-1">{t(`howStep${step}`)}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-center text-sm italic text-muted-foreground">
              {t('comingSoonNote')}
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection items={faqItems} links={faqLinks} title={t('faqTitle')} titleSuffix={t('faqTitleSuffix')} bgColor="#F6FFFA" />

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
        <div className="mx-auto mt-8 max-w-md">
          <Link
            href="/golf-club-rental"
            className="group rounded-xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md block"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
              <MapPin size={20} />
            </div>
            <h3 className="mb-1 font-bold text-foreground group-hover:text-primary transition-colors">{t('crossLink1Label')}</h3>
            <p className="text-sm text-muted-foreground">{t('crossLink1Desc')}</p>
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
