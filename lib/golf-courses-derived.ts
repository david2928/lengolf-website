import 'server-only'
import type { GolfCourse } from '@/types/golf-courses'
import { getCoursesByRegion, REGION_META, type Region } from '@/lib/golf-courses'
import { BTS_STATIONS, type BtsStation } from '@/data/bts-stations'
import { PRICE_TIERS } from '@/data/price-tiers'
import { USE_CASE_RULES, type UseCase } from '@/data/golf-courses-use-cases'
import { haversineKm } from '@/lib/geo'

/**
 * Composite popularity score used to rank courses across all derivations.
 * Deterministic — depends only on existing GolfCourse fields.
 *
 * Scaling rationale: green fee is the dominant signal (premium courses get
 * more search demand), boosted by editorial-completeness and external
 * authority signals. We deliberately do NOT use prose.overview length
 * since every course has 200-400 words of overview by data-team contract.
 */
export function popularityScore(c: GolfCourse): number {
  let score = 0
  score += c.green_fee_weekend_thb ?? 0
  if (c.prose.layout_and_experience.length > 200) score += 1000
  if (c.website) score += 500
  if (c.driving_range) score += 300
  return score
}

async function getAllPublishedCourses(): Promise<GolfCourse[]> {
  const regions = Object.keys(REGION_META) as Region[]
  const arrays = await Promise.all(regions.map((r) => getCoursesByRegion(r)))
  return arrays.flat().filter((c) => c.status === 'published')
}

/** Top N courses in a region by composite popularity score. */
export async function getTopCoursesByRegion(
  region: Region,
  n: number
): Promise<GolfCourse[]> {
  const courses = await getCoursesByRegion(region)
  return courses
    .filter((c) => c.status === 'published')
    .sort((a, b) => popularityScore(b) - popularityScore(a))
    .slice(0, n)
}

/**
 * Comparison pair list. For each region with ≥2 courses, takes the top 3
 * by popularity and emits all C(3,2) pairs canonicalised as slugA < slugB.
 * Used by both `generateStaticParams` and the sitemap loop.
 */
export async function getComparisonPairs(): Promise<
  { region: Region; slugA: string; slugB: string }[]
> {
  const regions = Object.keys(REGION_META) as Region[]
  const out: { region: Region; slugA: string; slugB: string }[] = []
  for (const region of regions) {
    const top = await getTopCoursesByRegion(region, 3)
    for (let i = 0; i < top.length; i++) {
      for (let j = i + 1; j < top.length; j++) {
        const [slugA, slugB] =
          top[i].slug < top[j].slug ? [top[i].slug, top[j].slug] : [top[j].slug, top[i].slug]
        out.push({ region, slugA, slugB })
      }
    }
  }
  return out
}

/** Derives the pair URL slug `[a]-vs-[b]` (canonical alphabetical). */
export function pairSlug(slugA: string, slugB: string): string {
  const [a, b] = slugA < slugB ? [slugA, slugB] : [slugB, slugA]
  return `${a}-vs-${b}`
}

/** Inverts `pairSlug` against a list of known pairs in a region. Returns null if unknown. */
export function parsePairSlug(
  region: Region,
  pair: string,
  pairs: { region: Region; slugA: string; slugB: string }[]
): { slugA: string; slugB: string } | null {
  const found = pairs.find((p) => p.region === region && pairSlug(p.slugA, p.slugB) === pair)
  return found ? { slugA: found.slugA, slugB: found.slugB } : null
}

export interface CourseWithDistance {
  course: GolfCourse
  km: number
}

/**
 * Top N courses ranked by haversine distance from a BTS station.
 * Courses missing latitude/longitude are excluded (no `?? 0` fallback —
 * we never want to mis-rank by treating null coords as the equator).
 */
export async function getCoursesNearStation(
  stationSlug: string,
  n: number
): Promise<CourseWithDistance[]> {
  const station: BtsStation | undefined = BTS_STATIONS[stationSlug]
  if (!station) return []
  const all = await getAllPublishedCourses()
  return all
    .filter((c) => c.latitude !== null && c.longitude !== null)
    .map((c) => ({
      course: c,
      km: haversineKm(
        { lat: station.lat, lng: station.lng },
        { lat: c.latitude!, lng: c.longitude! }
      ),
    }))
    .sort((a, b) => a.km - b.km)
    .slice(0, n)
}

/**
 * Top N courses with weekday green fee ≤ tier, ranked by composite score.
 * Courses without a weekday fee are excluded.
 */
export async function getCoursesUnderPrice(
  thb: number,
  n: number
): Promise<GolfCourse[]> {
  const all = await getAllPublishedCourses()
  return all
    .filter(
      (c) =>
        c.green_fee_weekday_thb !== null && c.green_fee_weekday_thb <= thb
    )
    .sort((a, b) => popularityScore(b) - popularityScore(a))
    .slice(0, n)
}

/**
 * Top N courses matching a use-case predicate, ranked by composite score.
 */
export async function getCoursesForUseCase(
  useCase: UseCase,
  n: number
): Promise<GolfCourse[]> {
  const meta = USE_CASE_RULES[useCase]
  if (!meta) return []
  const all = await getAllPublishedCourses()
  return all
    .filter(meta.predicate)
    .sort((a, b) => popularityScore(b) - popularityScore(a))
    .slice(0, n)
}

/** Static-params slug list for `/golf-courses/under-[price]-baht/`. */
export function getPriceTierSlugs(): string[] {
  return PRICE_TIERS.map((t) => t.slug)
}

/** All BTS station slugs that have a proximity page generated. */
export function getStationSlugs(): string[] {
  return Object.keys(BTS_STATIONS)
}
