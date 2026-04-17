import 'server-only'
import type { GolfCourse } from '@/types/golf-courses'

// Supported regions — extend as new batches are published
const REGIONS = ['bangkok'] as const
type Region = (typeof REGIONS)[number]

/** Display metadata for each published region — used by index and hub pages. */
export const REGION_META: Record<string, { label: string; province: string; description: string; courseCount: number }> = {
  bangkok: {
    label: 'Bangkok',
    province: 'Bangkok & surrounding provinces',
    description: 'Bangkok and its surrounding provinces are home to some of Thailand\'s finest golf courses — from championship-grade layouts in Pathum Thani to accessible resort courses within 90 minutes of the city centre.',
    courseCount: 11,
  },
}

function isRegion(s: string): s is Region {
  return (REGIONS as readonly string[]).includes(s)
}

/**
 * Dynamically imports a single course from the static data files.
 * Returns null if the region or slug is unknown.
 */
export async function getCourseBySlug(
  region: string,
  slug: string
): Promise<GolfCourse | null> {
  if (!isRegion(region)) return null
  try {
    const mod = await import(`@/data/golf-courses/${region}/${slug}`)
    return (mod.course as GolfCourse) ?? null
  } catch {
    return null
  }
}

/**
 * Returns all [region, slug] pairs for generateStaticParams.
 * Uses require.context is not available in Node — we enumerate via a
 * hard-coded registry that 5.publish.ts keeps up to date.
 */
export async function getAllCourseParams(): Promise<{ region: string; slug: string }[]> {
  const results: { region: string; slug: string }[] = []

  for (const region of REGIONS) {
    let index: Record<string, string[]>
    try {
      const mod = await import(`@/data/golf-courses/${region}/index`)
      index = mod.default ?? mod
    } catch {
      continue
    }
    const slugs: string[] = index.slugs ?? []
    for (const slug of slugs) {
      results.push({ region, slug })
    }
  }

  return results
}

/**
 * Returns all courses for a given region (for region listing pages).
 */
export async function getCoursesByRegion(region: string): Promise<GolfCourse[]> {
  if (!isRegion(region)) return []

  let index: { slugs: string[] }
  try {
    const mod = await import(`@/data/golf-courses/${region}/index`)
    index = mod.default ?? mod
  } catch {
    return []
  }

  const courses = await Promise.all(
    index.slugs.map((slug) => getCourseBySlug(region, slug))
  )
  return courses.filter((c): c is GolfCourse => c !== null)
}
