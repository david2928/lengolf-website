import { getTranslations } from 'next-intl/server'
import { MapPin, Clock, Car, PersonStanding, Train } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { BOOKING_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import type { LocationPage as LocationPageType } from '@/lib/locations'
import { parseInternalLinks } from '@/lib/locations'
import GolfNearSections from './GolfNearSections'
import ThingsToDoSections from './ThingsToDoSections'
import IndoorGolfSections from './IndoorGolfSections'
import GolfLessonsSections from './GolfLessonsSections'
import CorporateEventsSections from './CorporateEventsSections'
import GolfClubRentalSections from './GolfClubRentalSections'

interface Props {
  data: LocationPageType
}

export default async function LocationPageComponent({ data }: Props) {
  const t = await getTranslations('Location')
  const internalLinks = parseInternalLinks(data.internal_links)

  return (
    <div className="location-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] py-16 md:py-24 text-white">
        <div className="mx-auto max-w-[900px] px-5">
          <h1 className="text-3xl font-bold md:text-5xl mb-4">{data.h1_title}</h1>
          {data.bts_time_mins != null && (
            <p className="text-lg text-white/80 mb-8">
              <Train className="inline-block h-5 w-5 mr-1 -mt-0.5" />
              {t('minByBts', { mins: data.bts_time_mins })}
              {data.distance_km != null && ` · ${t('kmAway', { km: data.distance_km })}`}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d4a843] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#c49a3a]"
            >
              {t('bookNow')}
            </a>
            <a
              href={SOCIAL_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t('lineUs')}
            </a>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      {data.unique_intro && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.unique_intro}
            </p>
          </div>
        </section>
      )}

      {/* Template-specific sections */}
      {renderTemplateSections(data)}

      {/* Directions Section */}
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-8">
            {t('howToGetHere', { location: data.location_name })}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
            {/* BTS Card */}
            {data.bts_route && (
              <div className="rounded-xl border bg-white p-5 text-center">
                <Train className="mx-auto mb-3 h-8 w-8 text-[#2d6a4f]" />
                <h3 className="font-semibold text-[#1a472a] mb-1">{t('btsSkytrain')}</h3>
                {data.bts_time_mins != null && (
                  <p className="text-sm text-[#d4a843] font-medium mb-2">{data.bts_time_mins} min</p>
                )}
                <p className="text-sm text-muted-foreground">{data.bts_route}</p>
              </div>
            )}
            {/* Taxi Card */}
            {data.taxi_time_mins != null && (
              <div className="rounded-xl border bg-white p-5 text-center">
                <Car className="mx-auto mb-3 h-8 w-8 text-[#2d6a4f]" />
                <h3 className="font-semibold text-[#1a472a] mb-1">{t('taxiGrab')}</h3>
                <p className="text-sm text-[#d4a843] font-medium mb-2">
                  ~{data.taxi_time_mins} min · {data.taxi_fare_estimate} THB
                </p>
              </div>
            )}
            {/* Walking Card */}
            {data.walking_directions && (
              <div className="rounded-xl border bg-white p-5 text-center">
                <PersonStanding className="mx-auto mb-3 h-8 w-8 text-[#2d6a4f]" />
                <h3 className="font-semibold text-[#1a472a] mb-1">{t('walking')}</h3>
                {data.walking_time_mins != null && (
                  <p className="text-sm text-[#d4a843] font-medium mb-2">{data.walking_time_mins} min</p>
                )}
                <p className="text-sm text-muted-foreground">{data.walking_directions}</p>
              </div>
            )}
          </div>

          {/* Google Maps Embed */}
          {data.google_maps_embed && (
            <div className="overflow-hidden rounded-xl border">
              <iframe
                src={data.google_maps_embed}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing directions from ${data.location_name} to LENGOLF`}
              />
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] text-white text-center">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold md:text-3xl mb-4">{t('readyToPlay')}</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            {t('ctaText', { address: BUSINESS_INFO.addressShort, hours: BUSINESS_INFO.hours })}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d4a843] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#c49a3a]"
            >
              {t('bookNow')}
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t('call', { phone: BUSINESS_INFO.phone })}
            </a>
            <a
              href={SOCIAL_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t('lineUs')}
            </a>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      {internalLinks.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">{t('exploreMore')}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {internalLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={link.href}
                  className="group rounded-lg border p-4 transition-colors hover:border-[#2d6a4f] hover:bg-[#e8f5e9]"
                >
                  <span className="text-sm font-medium text-[#1a472a] group-hover:text-[#2d6a4f]">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function renderTemplateSections(data: LocationPageType) {
  switch (data.template_type) {
    case 'Golf Near':
      return <GolfNearSections data={data} />
    case 'Things To Do':
      return <ThingsToDoSections data={data} />
    case 'Indoor Golf':
      return <IndoorGolfSections data={data} />
    case 'Golf Lessons':
      return <GolfLessonsSections data={data} />
    case 'Corporate Events':
      return <CorporateEventsSections data={data} />
    case 'Golf Club Rental':
      return <GolfClubRentalSections data={data} />
    default:
      return null
  }
}
