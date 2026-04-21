import 'server-only'
import type { GolfCourse } from '@/types/golf-courses'

// Supported regions — extend as new batches are published
const REGIONS = ['bangkok', 'pattaya', 'hua-hin', 'phuket', 'khao-yai', 'kanchanaburi', 'chiang-mai', 'isan', 'southern-thailand', 'koh-samui', 'chiang-rai', 'north-misc', 'khao-lak', 'krabi'] as const
type Region = (typeof REGIONS)[number]

/** Display metadata for each published region — used by index and hub pages. */
export const REGION_META: Record<string, { label: string; province: string; description: string; courseCount: number }> = {
  bangkok: {
    label: 'Bangkok',
    province: 'Bangkok & surrounding provinces',
    description: 'Bangkok and its surrounding provinces are home to some of Thailand\'s finest golf courses — from championship-grade layouts in Pathum Thani to accessible resort courses within 90 minutes of the city centre.',
    courseCount: 58,
  },
  pattaya: {
    label: 'Pattaya',
    province: 'Chonburi & Eastern Seaboard',
    description: 'Pattaya and Thailand\'s Eastern Seaboard offer some of the country\'s most spectacular golf — championship venues that have hosted Asian Tour events, coastal courses with sea views, and private members\' clubs set among tropical hills.',
    courseCount: 24,
  },
  'hua-hin': {
    label: 'Hua Hin',
    province: 'Prachuap Khiri Khan & Phetchaburi',
    description: 'Hua Hin and Cha-am are home to some of Thailand\'s most celebrated golf courses — from the Golf Digest top-100 Black Mountain to the world-ranked Pineapple Valley, all set against a backdrop of mountain ranges and the Gulf of Thailand.',
    courseCount: 11,
  },
  phuket: {
    label: 'Phuket',
    province: 'Phuket',
    description: 'Phuket\'s golf scene is defined by dramatic former tin mine landscapes, iconic tournament venues, and resort courses set along the island\'s famous coastline — from the acclaimed Red Mountain to Blue Canyon\'s Johnnie Walker Classic fairways.',
    courseCount: 8,
  },
  'khao-yai': {
    label: 'Khao Yai',
    province: 'Nakhon Ratchasima & Nakhon Nayok',
    description: 'Khao Yai and the Central Highlands offer courses within two to three hours of Bangkok — from Jack Nicklaus Signature designs at Kirimaya and Khao Yai Golf Club to Seve Ballesteros\'s only Thailand layout at Mountain Creek, budget-friendly woodland rounds at Bonanza and Seoul Siam, and the veteran Rooks Korat course in Pak Thong Chai.',
    courseCount: 11,
  },
  kanchanaburi: {
    label: 'Kanchanaburi',
    province: 'Kanchanaburi & Ratchaburi',
    description: 'Kanchanaburi and the River Kwai corridor offer some of Thailand\'s most atmospheric golf — from a remote jungle course accessible only by ferry crossing to a 36-hole resort built on flooded sapphire mines, motorsport-themed layouts in Bo Phloi, and rugged hillside courses designed by Jim Engh and Artanan Yomchinda within 90 minutes of Bangkok.',
    courseCount: 7,
  },
  'chiang-mai': {
    label: 'Chiang Mai',
    province: 'Chiang Mai',
    description: 'Chiang Mai offers Northern Thailand\'s most varied golf — from the Gassan group\'s three distinct championship layouts to the Peter Thomson-designed Royal Chiang Mai, the in-city 27-hole Lanna course, and the value-for-money Chiangmai Inthanon resort near Doi Inthanon National Park. All courses are a short flight from Bangkok.',
    courseCount: 12,
  },
  isan: {
    label: 'Isan',
    province: 'Khon Kaen, Udon Thani & Nong Khai',
    description: 'Isan — Thailand\'s vast northeastern plateau — offers golf at the extremes of value and scenery: the Asian Tour-standard Singha Park in Khon Kaen, walk-only rounds at the EGAT dam course above the Ubolratana Reservoir, a Mekong riverside club in Nong Khai near the Laos border, and one of the few courses in Thailand where neither caddie nor cart is mandatory.',
    courseCount: 5,
  },
  'southern-thailand': {
    label: 'Southern Thailand',
    province: 'Songkhla & Trang',
    description: 'Southern Thailand\'s golf runs from Perry Dye\'s jungle valley championship layout at Southern Hills — the most acclaimed course in the lower south, with a strong cross-border crowd from Malaysia — to Hat Yai city\'s budget Robert McFarland layout, and the deeply off-the-beaten-track Sri Trang Golf Club in Trang province, one of the cheapest 18-hole rounds in the country.',
    courseCount: 3,
  },
  'koh-samui': {
    label: 'Koh Samui',
    province: 'Surat Thani',
    description: 'Koh Samui\'s golf spans two very different experiences: the island\'s only championship course at Santiburi Samui Country Club — a mountainous par-72 with mandatory caddies who drive the carts, Gulf views, and a Bangkok Airways Open pedigree — and the Rajjaprabha Dam Golf Course near Khao Sok, one of Thailand\'s most scenic EGAT government layouts, where foreign visitors play a full 18 holes for around 1,000 THB beside Cheow Lan reservoir.',
    courseCount: 2,
  },
  'chiang-rai': {
    label: 'Chiang Rai',
    province: 'Chiang Rai',
    description: 'Chiang Rai\'s golf is anchored by Santiburi Country Club — a Robert Trent Jones Jr. Signature design widely considered the best course in Northern Thailand — set among the highland hills that give the region its cool climate and scenic mountain backdrops. The province also offers the 27-hole Happy City Resort with three distinct nine-hole loops, the valley-set Waterford Valley Club, and the exceptional-value Wiang Ko Sai in neighbouring Phrae. Chiang Rai is a short 1 hour 15 minute flight from Bangkok, making a two- or three-round golf trip easily achievable as a long weekend.',
    courseCount: 4,
  },
  'north-misc': {
    label: 'Northern Thailand',
    province: 'Lampang & remote northern provinces',
    description: 'Northern Thailand\'s most remote golf reaches deep into provinces that see only a handful of visiting golfers each year. The standout is Mae Moh Golf Course in Lampang — Thailand\'s only golf course at a coal-fired power plant, built within the vast EGAT Mae Moh Power Station township and open to the public at government rates. An unusual destination for golfers who want to combine a round with the industrial tourism of Thailand\'s largest power generation facility.',
    courseCount: 1,
  },
  'khao-lak': {
    label: 'Khao Lak',
    province: 'Phang Nga',
    description: 'Khao Lak and Phang Nga province sit on the Andaman coast roughly 80 kilometres north of Phuket Airport — close enough for a day trip from Phuket but distinct in character, with quieter beaches, Similan Islands diving, and a more relaxed resort atmosphere. The flagship course is Katathong Golf Resort & Spa, a 2015 par-72 layout carved through a dramatic former tin mine valley and widely rated as the best golf in the region. Golfers flying into HKT can reach the course in around 60–70 minutes.',
    courseCount: 1,
  },
  krabi: {
    label: 'Krabi',
    province: 'Krabi',
    description: 'Krabi\'s golf centres on Pakasai Country Club — the province\'s only 18-hole championship layout, set in a tropical rubber plantation valley with the iconic limestone karst formations rising above the fairways. The course is the natural choice for golfers visiting Ao Nang and the wider Krabi coastline, combining a round with island beaches, sea kayaking, and rock climbing on one of Thailand\'s most spectacular stretches of Andaman coastline.',
    courseCount: 1,
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
