import { getTranslations } from 'next-intl/server'
import { GraduationCap, DollarSign, User } from 'lucide-react'
import type { LocationPage } from '@/lib/locations'
import { parseLessonPackages, parseSemicolonList } from '@/lib/locations'

interface Props {
  data: LocationPage
}

export default async function GolfLessonsSections({ data }: Props) {
  const t = await getTranslations('Location')
  const packages = parseLessonPackages(data.lesson_packages)
  const instructorLines = parseSemicolonList(data.instructor_info)

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

      {/* Instructors */}
      {instructorLines.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              {t('ourInstructors')}
            </h2>
            <div className="space-y-4">
              {instructorLines.map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-3 rounded-lg border bg-white p-5"
                >
                  <User className="h-6 w-6 mt-0.5 shrink-0 text-[#2d6a4f]" />
                  <p className="text-sm text-muted-foreground">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lesson Packages */}
      {packages.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[900px] px-5">
            <h2 className="text-2xl font-bold text-[#1a472a] md:text-3xl mb-6">
              {t('lessonPackages')}
            </h2>
            <div className="space-y-3">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border bg-white p-4"
                >
                  <DollarSign className="h-5 w-5 mt-0.5 shrink-0 text-[#d4a843]" />
                  <div>
                    {pkg.category && (
                      <p className="font-medium text-[#1a472a] mb-1">{pkg.category}</p>
                    )}
                    <p className="text-sm text-muted-foreground">{pkg.details}</p>
                  </div>
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
              {t('golfLessonsNear', { location: data.location_name })}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.lengolf_pitch}
            </p>
          </div>
        </section>
      )}
    </>
  )
}
