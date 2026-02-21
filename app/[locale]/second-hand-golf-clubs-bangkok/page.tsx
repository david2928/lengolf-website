import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import SectionWrapper from '@/components/shared/SectionWrapper'
import FaqSection from '@/components/shared/FaqSection'
import { storageUrl, SITE_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { getUsedClubsListJsonLd, getFaqPageJsonLd, getBreadcrumbJsonLd } from '@/lib/jsonld'
import { getAvailableUsedClubs } from '@/lib/clubs'
import type { UsedClub } from '@/lib/clubs'
import { MessageCircle, MapPin, Tag } from 'lucide-react'

export const revalidate = 3600

const faqLinks: Record<string, { href: string; external?: boolean }> = {
  '@lengolf': { href: SOCIAL_LINKS.line, external: true },
  'LINE @lengolf': { href: SOCIAL_LINKS.line, external: true },
}

const FAQ_COUNT = 5

const conditionBadge: Record<string, { bg: string; text: string; dot: string }> = {
  Excellent: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  Good: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  Fair: { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' },
}

function ClubCard({ club, enquireLabel }: { club: UsedClub; enquireLabel: string }) {
  const badge = conditionBadge[club.condition] ?? conditionBadge['Fair']
  const lineMsg = encodeURIComponent(
    `Hi LENGOLF! I'm interested in the ${club.brand}${club.model ? ` ${club.model}` : ''} (${club.club_type}) listed on your website. Is it still available?`
  )
  const lineUrl = `https://line.me/R/oaMessage/%40lengolf/?${lineMsg}`

  return (
    <div className="rounded-xl border border-border/60 bg-white p-5 shadow-sm transition-shadow hover:shadow-md flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-foreground">
            {club.brand}{club.model ? ` ${club.model}` : ''}
          </h3>
          <p className="text-sm text-muted-foreground">{club.club_type} · {club.gender}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.bg} ${badge.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
          {club.condition}
        </span>
      </div>
      {club.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{club.description}</p>
      )}
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/40">
        <span className="flex items-center gap-1 text-lg font-bold" style={{ color: '#007429' }}>
          <Tag size={14} className="shrink-0" />
          {club.price.toLocaleString()} THB
        </span>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#00B900' }}
        >
          <MessageCircle size={13} />
          {enquireLabel}
        </a>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'SecondHandClubs' })
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${SITE_URL}${locale === 'th' ? '/th' : ''}/second-hand-golf-clubs-bangkok/`,
      languages: {
        en: `${SITE_URL}/second-hand-golf-clubs-bangkok/`,
        th: `${SITE_URL}/th/second-hand-golf-clubs-bangkok/`,
      },
    },
    openGraph: { images: [{ url: storageUrl('venue/venue-simulator-01.jpg'), alt: 'Second-hand golf clubs Bangkok' }] },
  }
}

export default async function SecondHandGolfClubsBangkokPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [t, tFaq, clubs] = await Promise.all([
    getTranslations('SecondHandClubs'),
    getTranslations('SecondHandClubsFaq'),
    getAvailableUsedClubs(),
  ])

  const faqItems = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: tFaq(`q${i + 1}`),
    answer: tFaq(`a${i + 1}`),
  }))

  const listJsonLd = getUsedClubsListJsonLd(clubs)
  const faqJsonLd = getFaqPageJsonLd(faqItems)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Club Rental', url: `${SITE_URL}/golf-club-rental/` },
    { name: t('metaTitle'), url: `${SITE_URL}/second-hand-golf-clubs-bangkok/` },
  ])

  const lineUrl = `https://line.me/R/oaMessage/%40lengolf/?${encodeURIComponent('Hi LENGOLF! I\'m interested in your second-hand golf clubs. What sets do you have available?')}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #003d22 0%, #005a32 50%, #007429 100%)' }}>
        <div className="section-max-width section-padding text-center text-white">
          <span
            className="inline-block rounded px-5 py-2 text-base font-bold uppercase tracking-widest text-white mb-5 md:text-lg"
            style={{ backgroundColor: '#7CB342' }}
          >
            {t('heroBadge')}
          </span>
          <h1 className="mb-4 text-4xl font-black uppercase leading-none md:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/85 md:text-lg">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* ── Intro + Trust chips ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t('introText')}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-4">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground leading-snug">{t(`stat${i}Label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Inventory Grid ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>{t('inventoryTitle')}</span>{' '}
            <span className="text-foreground">{t('inventoryTitleSuffix')}</span>
          </h2>

          {clubs.length === 0 ? (
            <div className="mx-auto max-w-md text-center rounded-xl border border-border/60 bg-white p-10">
              <MessageCircle className="mx-auto mb-4 text-primary/40" size={40} />
              <h3 className="mb-2 text-lg font-bold text-foreground">{t('emptyStateTitle')}</h3>
              <p className="mb-6 text-sm text-muted-foreground">{t('emptyStateText')}</p>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#00B900' }}
              >
                <MessageCircle size={15} />
                {t('emptyStateCta')}
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {clubs.map((club: UsedClub) => (
                <ClubCard key={club.id} club={club} enquireLabel={t('enquireButton')} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Test Before You Buy ── */}
      <SectionWrapper>
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col overflow-hidden rounded-xl bg-primary/5 border border-primary/15 md:flex-row md:items-stretch">
            <div className="flex flex-col justify-center p-8 md:p-10 flex-1">
              <h2 className="mb-4 text-2xl font-bold italic lg:text-3xl">
                <span style={{ color: '#007429' }}>{t('testTitle')}</span>{' '}
                <span className="text-foreground">{t('testTitleSuffix')}</span>
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {t('testText')}
              </p>
              <div className="mt-6">
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#00B900' }}
                >
                  <MessageCircle size={15} />
                  {t('ctaLineButton')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── FAQ ── */}
      <FaqSection items={faqItems} links={faqLinks} title={t('faqTitle')} titleSuffix={t('faqTitleSuffix')} bgColor="#F6FFFA" />

      {/* ── CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">{t('ctaTitle')}</h2>
          <p className="mb-6 text-white/80">{t('ctaSubtitle')}</p>
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-8 text-sm font-semibold transition-colors hover:bg-white/90"
            style={{ color: '#007429' }}
          >
            <MessageCircle size={16} />
            {t('ctaLineButton')}
          </a>
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
            href="/golf-course-club-rental"
            className="group rounded-xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" style={{ color: '#007429' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
            </div>
            <h3 className="mb-1 font-bold text-foreground group-hover:text-primary transition-colors">{t('crossLink2Label')}</h3>
            <p className="text-sm text-muted-foreground">{t('crossLink2Desc')}</p>
          </Link>
        </div>
      </SectionWrapper>
    </>
  )
}
