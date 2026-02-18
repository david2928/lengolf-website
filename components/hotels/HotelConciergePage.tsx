import Link from 'next/link'
import { ArrowRight, Check, MapPin, Clock, Star, Utensils, Navigation, Calendar } from 'lucide-react'
import { BOOKING_URL, BUSINESS_INFO, SOCIAL_LINKS } from '@/lib/constants'
import type { HotelConciergeSeoPage } from '@/types/seo-pages'

interface Props {
  data: HotelConciergeSeoPage
}

function renderStars(count: number) {
  return Array.from({ length: count }, (_, i) => (
    <Star key={i} className="h-4 w-4 fill-[#d4a843] text-[#d4a843]" />
  ))
}

export default function HotelConciergePage({ data }: Props) {
  const { content } = data

  return (
    <div className="hotel-concierge-page">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] py-16 md:py-24 text-white">
        <div className="mx-auto max-w-[900px] px-5">
          <p className="text-sm font-medium uppercase tracking-wider text-[#d4a843] mb-4">
            Hotel Guest Guide
          </p>
          <h1 className="text-3xl font-bold md:text-5xl mb-4">{data.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-8 text-white/80">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{content.hotel_distance_m}m from LENGOLF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{content.walking_time_mins} min walk</span>
            </div>
            <div className="flex items-center gap-1">
              {renderStars(content.hotel_star_rating)}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d4a843] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#c49a3a]"
            >
              Book a Bay
            </a>
            <a
              href={SOCIAL_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              LINE Us
            </a>
          </div>
        </div>
      </section>

      {/* Walking Directions */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-4">
            <Navigation className="inline h-6 w-6 mr-2 text-[#2d6a4f]" />
            How to Walk to LENGOLF
          </h2>
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2d6a4f] font-bold text-xs">
                {content.walking_time_mins} min
              </div>
              <div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {content.walking_directions}
                </p>
                <p className="mt-3 text-sm font-medium text-[#2d6a4f]">
                  Distance: {content.hotel_distance_m}m · Walking time: {content.walking_time_mins} minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why LENGOLF Section */}
      <section className="py-12 md:py-16 bg-[#f8f9fa]">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-4">
            Why Visit LENGOLF During Your Stay
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg mb-6">
            LENGOLF is an indoor golf simulator bar at Mercury Ville, BTS Chidlom — just a {content.walking_time_mins}-minute
            walk from {content.hotel_name}. With premium Bravo golf simulators, a full bar, and air-conditioning,
            it&apos;s a great activity for hotel guests — whether you&apos;re a golfer or have never picked up a club.
            Bay rental starts at 500 THB/hour for up to 5 people.
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-[#e8f5e9] px-4 py-2 text-sm text-[#2d6a4f]">
              <Check className="h-4 w-4" />
              500 THB/hour for up to 5 people
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#e8f5e9] px-4 py-2 text-sm text-[#2d6a4f]">
              <Check className="h-4 w-4" />
              Mercury Ville, BTS Chidlom (Exit 4)
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#e8f5e9] px-4 py-2 text-sm text-[#2d6a4f]">
              <Check className="h-4 w-4" />
              Air-conditioned, rain-proof, open until late
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#e8f5e9] px-4 py-2 text-sm text-[#2d6a4f]">
              <Check className="h-4 w-4" />
              Premium club rental from 150 THB/hour
            </div>
          </div>
        </div>
      </section>

      {/* Is This Walkable? */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-4">
            Is LENGOLF Walkable from {content.hotel_name}?
          </h2>
          <div className="rounded-xl border bg-white p-6">
            {content.hotel_distance_m <= 500 ? (
              <p className="text-base leading-relaxed text-muted-foreground">
                <strong className="text-[#1a472a]">Yes — very easily.</strong> At just {content.hotel_distance_m}m,
                LENGOLF is a {content.walking_time_mins}-minute walk from {content.hotel_name}. The route is
                straightforward along covered sidewalks with BTS Chidlom as a clear landmark. You won&apos;t
                even need a taxi.
              </p>
            ) : content.hotel_distance_m <= 800 ? (
              <p className="text-base leading-relaxed text-muted-foreground">
                <strong className="text-[#1a472a]">Yes — a comfortable walk.</strong> At {content.hotel_distance_m}m,
                LENGOLF is about a {content.walking_time_mins}-minute walk from {content.hotel_name}. The route
                follows main roads with sidewalks. In Bangkok&apos;s heat, you might prefer taking the BTS
                (1-2 stops) — it&apos;s faster and air-conditioned.
              </p>
            ) : (
              <p className="text-base leading-relaxed text-muted-foreground">
                <strong className="text-[#1a472a]">Walkable, but BTS is better in the heat.</strong> At {content.hotel_distance_m}m,
                the walk takes about {content.walking_time_mins} minutes. In Bangkok&apos;s heat (35°C+), we
                recommend taking the BTS — it&apos;s just 1-2 stops to BTS Chidlom, where The Mercury Ville
                is directly connected. A short taxi or Grab ride takes about 5-8 minutes and costs around 60-80 THB.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Area Guide — unique per hotel */}
      {content.area_guide && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-4">
              <MapPin className="inline h-6 w-6 mr-2 text-[#2d6a4f]" />
              Exploring the Area Around {content.hotel_name}
            </h2>
            <div className="rounded-xl border bg-white p-6 md:p-8">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {content.area_guide}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Suggested Itinerary — unique per hotel */}
      {content.suggested_itinerary && content.suggested_itinerary.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              <Calendar className="inline h-6 w-6 mr-2 text-[#2d6a4f]" />
              Suggested Day Itinerary from {content.hotel_name}
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-[#d4a843]/30 hidden sm:block" />
              <div className="space-y-4">
                {content.suggested_itinerary.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a472a] text-white text-xs font-bold relative z-10">
                      {idx + 1}
                    </div>
                    <div className="rounded-xl border bg-white p-4 flex-1">
                      <p className="text-sm font-semibold text-[#d4a843] mb-1">{item.time}</p>
                      <p className="text-base text-[#1a472a]">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Nearby Restaurants */}
      {content.nearby_restaurants.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              <Utensils className="inline h-6 w-6 mr-2 text-[#2d6a4f]" />
              Where to Eat Near {content.hotel_name}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.nearby_restaurants.map((restaurant) => (
                <div
                  key={restaurant.name}
                  className="rounded-xl border bg-white p-5"
                >
                  <h3 className="font-semibold text-[#1a472a] mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
                  <p className="text-xs text-[#2d6a4f] font-medium">
                    {restaurant.distance_m === 0 ? 'In hotel' : `${restaurant.distance_m}m away`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Activities */}
      {content.nearby_activities.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              Other Things to Do Near {content.hotel_name}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.nearby_activities.map((activity) => (
                <div
                  key={activity.name}
                  className="rounded-xl border bg-white p-5"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-[#d4a843]" />
                    <div>
                      <h3 className="font-semibold text-[#1a472a] mb-1">{activity.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{activity.type}</p>
                      <p className="text-xs text-[#2d6a4f] font-medium mt-1">
                        {activity.distance_m}m from hotel
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#1a472a] to-[#2d6a4f] text-white text-center">
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold md:text-3xl mb-4">
            Visit LENGOLF During Your Stay
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Just a {content.walking_time_mins}-minute walk from {content.hotel_name}. Book a bay at LENGOLF, {BUSINESS_INFO.addressShort}. Open {BUSINESS_INFO.hours}.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d4a843] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#c49a3a]"
            >
              Book Now
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Call {BUSINESS_INFO.phone}
            </a>
            <a
              href={SOCIAL_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              LINE Us
            </a>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      {data.related_slugs && data.related_slugs.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">Explore More</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {data.related_slugs.map((path) => {
                const label = path
                  .split('/')
                  .filter(Boolean)
                  .pop()!
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())
                return (
                  <Link
                    key={path}
                    href={path}
                    className="group flex items-center justify-between rounded-lg border p-4 transition-colors hover:border-[#2d6a4f] hover:bg-[#e8f5e9]"
                  >
                    <span className="text-sm font-medium text-[#1a472a] group-hover:text-[#2d6a4f]">
                      {label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-[#2d6a4f]" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
