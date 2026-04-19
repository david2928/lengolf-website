import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import SectionWrapper from '@/components/shared/SectionWrapper'
import FaqSection from '@/components/shared/FaqSection'
import StickyBookCTA from '@/components/clubs/StickyBookCTA'
import CollapsibleClubCard from '@/components/course-rental/CollapsibleClubCard'
import TrustBar from '@/components/course-rental/TrustBar'
import Testimonials from '@/components/course-rental/Testimonials'
import MultiChannelContact from '@/components/course-rental/MultiChannelContact'
import { storageUrl, SITE_URL, BUSINESS_INFO, SOCIAL_LINKS, BOOKING_URL } from '@/lib/constants'
import { getAlternates, getCanonical } from '@/lib/translated-routes'
import { getCourseClubRentalServiceJsonLd, getCourseClubRentalPricingJsonLd, getFaqPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld'
import { getRentalClubPricing } from '@/lib/clubs'
export const revalidate = 3600

import { getApproxCurrency } from '@/lib/currency-rates'
import {
  ExternalLink,
  Truck,
  Phone,
  MapPin,
  CreditCard,
  ShoppingBag,
} from 'lucide-react'

const FAQ_COUNT = 5

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  '@lengolf': { href: SOCIAL_LINKS.line, external: true },
  'LINE @lengolf': { href: SOCIAL_LINKS.line, external: true },
  'Google Maps': { href: BUSINESS_INFO.googleMapsUrl, external: true },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'CourseClubRental' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: getCanonical(locale, '/rent-golf-clubs-bangkok/'),
      languages: getAlternates('/rent-golf-clubs-bangkok/'),
    },
    openGraph: {
      images: [{ url: storageUrl('golf/hero-course-rental.webp'), alt: 'Rent premium golf clubs for any Bangkok golf course — Callaway Paradym, Warbird, Majesty from 1,200 THB/day' }],
    },
  }
}

export default async function RentGolfClubsBangkokPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('CourseClubRental')
  const tFaq = await getTranslations('CourseClubRentalFaq')

  const faqItems = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: tFaq(`q${i + 1}`),
    answer: tFaq(`a${i + 1}`),
  }))

  const courseRentalUrl = `${BOOKING_URL}course-rental`
  const approxCurrency = getApproxCurrency(1200, locale)

  const serviceJsonLd = getCourseClubRentalServiceJsonLd()
  const pricingJsonLd = getCourseClubRentalPricingJsonLd()
  const faqJsonLd = getFaqPageJsonLd(faqItems)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Club Rental', url: `${SITE_URL}/golf-club-rental/` },
    { name: t('metaTitle'), url: `${SITE_URL}/rent-golf-clubs-bangkok/` },
  ])

  const { course: pricingRows } = await getRentalClubPricing()

  const testimonials = [
    {
      text: t('testimonial1Text'),
      name: t('testimonial1Name'),
      nationality: t('testimonial1Nationality'),
      flag: '🇬🇧',
      course: t('testimonial1Course'),
    },
    {
      text: t('testimonial2Text'),
      name: t('testimonial2Name'),
      nationality: t('testimonial2Nationality'),
      flag: '🇰🇷',
      course: t('testimonial2Course'),
    },
    {
      text: t('testimonial3Text'),
      name: t('testimonial3Name'),
      nationality: t('testimonial3Nationality'),
      flag: '🇯🇵',
      course: t('testimonial3Course'),
    },
  ]

  const contactLanguageNote = locale === 'en' || locale === 'th' ? null : t('contactLanguageNote')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ── Sticky mobile CTA ── */}
      <StickyBookCTA label={t('stickyBookCta')} href={courseRentalUrl} />

      {/* ── 1. Hero ── */}
      <section className="relative flex items-start pt-10 pb-10 text-white overflow-hidden md:items-center md:py-16">
        <Image
          src={storageUrl('golf/hero-course-rental.webp')}
          alt="Rent Callaway Paradym, Warbird or Majesty golf clubs for Bangkok golf courses — from 1,200 THB/day with delivery"
          fill
          className="object-cover object-[center_35%]"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(0,90,50,0.65) 0%, rgba(0,122,69,0.50) 40%, rgba(0,90,50,0.35) 100%)' }}
        />
        <div className="relative z-10 w-full text-left" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          {/* Google rating + response badge */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded bg-white/95 px-3 py-1.5 text-sm font-bold text-gray-800 shadow-sm">
              <span className="text-yellow-400 tracking-tight">★★★★★</span>
              <span>{BUSINESS_INFO.googleRating}</span>
              <span className="font-normal text-gray-500">· {BUSINESS_INFO.googleReviewCount} Google reviews</span>
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
            href={courseRentalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-16 items-center gap-2.5 rounded-lg bg-white px-10 text-lg font-extrabold uppercase tracking-wide text-[#005a32] shadow-lg transition-all hover:scale-105 hover:shadow-xl md:text-xl"
          >
            <ExternalLink size={18} />
            {t('stickyBookCta')}
          </a>
          <p className="mt-3 text-sm text-white/70">{t('heroCancellationNote')}</p>
        </div>
      </section>

      {/* ── 2. Trust Bar ── */}
      <TrustBar
        deliveryLabel={t('trustBarDeliveryLabel')}
        stat1Value={t('stat1Value')}
        stat1Label={t('stat1Label')}
        stat2Value={t('stat2Value')}
        stat2Label={t('stat2Label')}
        stat3Value={t('stat3Value')}
        stat3Label={t('stat3Label')}
        stat4Value={t('stat4Value')}
        stat4Label={t('stat4Label')}
        approxCurrency={approxCurrency}
      />

      {/* ── 3. How It Works ── */}
      <section className="py-12 lg:py-16">
        <div className="section-max-width section-padding">
          <h2 className="mb-8 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('howItWorksTitle')}</span>{' '}
            <span className="text-foreground">{t('howItWorksTitleSuffix')}</span>
          </h2>
          <div className="mx-auto max-w-2xl">
            <ol className="space-y-5">
              {[1, 2, 3].map((step) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold" style={{ color: '#007429' }}>
                    {step}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground pt-1.5">{t(`howStep${step}`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 4. Club Sets ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('clubsTitle')}</span>{' '}
            <span className="text-foreground">{t('clubsTitleSuffix')}</span>
          </h2>

          {/* Premium+ Paradym — collapsible */}
          <CollapsibleClubCard
            badge={t('premiumBadge')}
            name={t('premiumName')}
            gender={t('premiumGender')}
            specs={[1, 2, 3, 4, 5].map((j) => t(`premiumSpec${j}`))}
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

          {/* Standard sets */}
          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 sm:grid-cols-2">
            <CollapsibleClubCard
              name={t('club1Name')}
              gender={t('club1Gender')}
              specs={[1, 2, 3].map((j) => t(`club1Spec${j}`))}
              images={[
                { src: storageUrl('clubs/warbird/warbird-full-set.webp'), alt: 'Callaway Warbird full set with Odyssey putter' },
              ]}
            />
            <CollapsibleClubCard
              name={t('club2Name')}
              gender={t('club2Gender')}
              specs={[1, 2, 3].map((j) => t(`club2Spec${j}`))}
              images={[
                { src: storageUrl('clubs/warbird/warbird-full-set.webp'), alt: 'Majesty Shuttle full set' },
              ]}
              majestyCallout={locale === 'ja' ? { title: t('majestyCalloutTitle'), text: t('majestyCalloutText') } : undefined}
            />
          </div>
        </div>
      </section>

      {/* ── 5. Pricing ── */}
      <section id="pricing" className="py-16 lg:py-24">
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('pricingTitle')}</span>{' '}
            <span className="text-foreground">{t('pricingTitleSuffix')}</span>
          </h2>
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full min-w-[320px] text-left">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 text-sm font-semibold">{t('duration')}</th>
                    <th className="px-4 py-3 text-sm font-semibold text-center whitespace-nowrap">{t('pricingColPremium')}</th>
                    <th className="px-4 py-3 text-sm font-semibold text-center whitespace-nowrap">{t('pricingColPremiumPlus')}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                      <td className="px-4 py-4 align-top">
                        <span className="text-sm font-medium text-foreground whitespace-nowrap">{row.duration}</span>
                        {row.note && (
                          <div className="mt-1">
                            <span className="whitespace-nowrap rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                              {row.note}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-center align-top whitespace-nowrap" style={{ color: '#007429' }}>{row.premium}</td>
                      <td className="px-4 py-4 text-sm font-bold text-center align-top whitespace-nowrap" style={{ color: '#007429' }}>{row.premiumPlus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Currency approximation for CJK locales */}
            {approxCurrency && (
              <p className="text-xs text-muted-foreground text-center bg-muted/40 rounded-lg px-4 py-2">
                {t('pricingCurrencyNote', { price: '1,200', approx: approxCurrency })}
              </p>
            )}

            <p className="text-sm text-muted-foreground">{t('pricingNote')}</p>

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

      {/* ── 6. Testimonials ── */}
      <Testimonials
        title={t('testimonialsTitle')}
        titleSuffix={t('testimonialsTitleSuffix')}
        items={testimonials}
      />


      {/* ── 8. Multi-Channel Contact ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <div className="mx-auto max-w-md">
            <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
              <span style={{ color: '#007429' }}>{t('formTitle')}</span>
            </h2>
            <p className="mb-8 text-center text-muted-foreground">{t('formSubtitle')}</p>
            <div className="mb-6">
              <a
                href={courseRentalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full h-14 items-center justify-center gap-2.5 rounded-lg text-base font-bold text-white transition-opacity hover:opacity-90 shadow-md mb-6"
                style={{ backgroundColor: '#007429' }}
              >
                <ExternalLink size={18} />
                {t('stickyBookCta')}
              </a>
              <MultiChannelContact
                lineLabel={t('contactLineLabel')}
                emailLabel={t('contactEmailLabel')}
                phoneLabel={t('contactPhoneLabel')}
                languageNote={contactLanguageNote}
                lineHandle="@lengolf"
                email={BUSINESS_INFO.email}
                phone={BUSINESS_INFO.phone}
                lineUrl={SOCIAL_LINKS.line}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <FaqSection items={faqItems} links={faqLinks} title={t('faqTitle')} titleSuffix={t('faqTitleSuffix')} bgColor="#ffffff" />

      {/* ── 10. CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">{t('ctaTitle')}</h2>
          <p className="mb-6 text-white/80">{t('ctaSubtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={courseRentalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-8 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ color: '#005a32' }}
            >
              <ExternalLink size={16} />
              {t('stickyBookCta')}
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

      {/* ── 11. Cross-links ── */}
      <SectionWrapper>
        <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>{t('crossLinksTitle')}</span>{' '}
          <span className="text-foreground">{t('crossLinksTitleSuffix')}</span>
        </h2>
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          <Link
            href="/golf-course-club-rental"
            className="group rounded-xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md block"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
              <MapPin size={20} />
            </div>
            <h3 className="mb-1 font-bold text-foreground group-hover:text-primary transition-colors">{t('crossLink1Label')}</h3>
            <p className="text-sm text-muted-foreground">{t('crossLink1Desc')}</p>
          </Link>
          <Link
            href="/second-hand-golf-clubs-bangkok"
            className="group rounded-xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md block"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
              <ShoppingBag size={20} />
            </div>
            <h3 className="mb-1 font-bold text-foreground group-hover:text-primary transition-colors">{t('crossLink2Label')}</h3>
            <p className="text-sm text-muted-foreground">{t('crossLink2Desc')}</p>
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
