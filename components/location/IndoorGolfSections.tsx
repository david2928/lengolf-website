import { Monitor, MapPin, Zap } from 'lucide-react'
import type { LocationPage } from '@/lib/locations'
import { parseList, parseSemicolonList } from '@/lib/locations'

interface Props {
  data: LocationPage
}

export default function IndoorGolfSections({ data }: Props) {
  const specs = parseSemicolonList(data.simulator_specs)
  const hotels = parseList(data.nearby_hotels)

  return (
    <>
      {/* Pain Point */}
      {data.area_pain_point && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[900px] px-5">
            <blockquote className="border-l-4 border-[#d4a843] pl-6 text-lg italic text-muted-foreground">
              {data.area_pain_point}
            </blockquote>
          </div>
        </section>
      )}

      {/* Simulator Specs */}
      {specs.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              Simulator Technology
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {specs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-start gap-3 rounded-lg border bg-white p-4"
                >
                  <Zap className="h-5 w-5 mt-0.5 shrink-0 text-[#d4a843]" />
                  <p className="text-sm text-muted-foreground">{spec}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LENGOLF Pitch */}
      {data.lengolf_pitch && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-4">
              Indoor Golf Near {data.location_name}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.lengolf_pitch}
            </p>
          </div>
        </section>
      )}

      {/* Nearby Hotels */}
      {hotels.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              Nearby Hotels
            </h2>
            <div className="flex flex-wrap gap-2">
              {hotels.map((hotel) => (
                <span
                  key={hotel}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1.5 text-sm text-[#2d6a4f]"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {hotel}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
