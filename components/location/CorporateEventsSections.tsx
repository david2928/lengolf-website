import { Users, Utensils, Building, MapPin, Trophy } from 'lucide-react'
import type { LocationPage } from '@/lib/locations'
import { parseList, parseSemicolonList } from '@/lib/locations'

interface Props {
  data: LocationPage
}

export default function CorporateEventsSections({ data }: Props) {
  const packages = parseSemicolonList(data.corporate_packages)
  const catering = parseSemicolonList(data.catering_options)
  const offices = parseList(data.nearby_offices)

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

      {/* Corporate Packages */}
      {packages.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              Event Packages
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {packages.map((pkg) => (
                <div
                  key={pkg}
                  className="flex items-start gap-3 rounded-lg border bg-white p-4"
                >
                  <Trophy className="h-5 w-5 mt-0.5 shrink-0 text-[#d4a843]" />
                  <p className="text-sm text-muted-foreground">{pkg}</p>
                </div>
              ))}
            </div>
            {data.max_capacity && (
              <div className="mt-6 flex items-center gap-2 rounded-lg bg-[#e8f5e9] p-4">
                <Users className="h-5 w-5 text-[#2d6a4f]" />
                <p className="text-sm font-medium text-[#2d6a4f]">
                  Maximum capacity: {data.max_capacity} guests
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Catering */}
      {catering.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              Food & Beverage
            </h2>
            <div className="space-y-3">
              {catering.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border bg-white p-4"
                >
                  <Utensils className="h-5 w-5 mt-0.5 shrink-0 text-[#d4a843]" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LENGOLF Pitch */}
      {data.lengolf_pitch && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-4">
              Corporate Events Near {data.location_name}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.lengolf_pitch}
            </p>
          </div>
        </section>
      )}

      {/* Nearby Offices */}
      {offices.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              Office Buildings Near {data.location_name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {offices.map((office) => (
                <span
                  key={office}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5e9] px-3 py-1.5 text-sm text-[#2d6a4f]"
                >
                  <Building className="h-3.5 w-3.5" />
                  {office}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
