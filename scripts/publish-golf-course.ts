#!/usr/bin/env tsx
/**
 * publish-golf-course.ts
 *
 * Stage 5 of the course guide pipeline.
 * Converts an approved course JSON file from docs/course-guide/data/4.approved/
 * into a TypeScript data object and writes it to data/golf-courses/<region>/<slug>.ts
 *
 * This script contains NO AI calls — it is a pure mechanical formatter.
 *
 * Usage:
 *   npx tsx scripts/publish-golf-course.ts <region> <slug>
 *   npx tsx scripts/publish-golf-course.ts <region> --all
 */

import * as fs from 'fs'
import * as path from 'path'

const REPO_ROOT = path.join(__dirname, '..')
const GUIDE_ROOT = path.join(REPO_ROOT, 'docs', 'course-guide')
const APPROVED_DIR = path.join(GUIDE_ROOT, 'data', '4.approved')
const OUTPUT_DIR = path.join(REPO_ROOT, 'data', 'golf-courses')

const [region, slugArg] = process.argv.slice(2)

if (!region || !slugArg) {
  console.error('Usage:')
  console.error('  npx tsx scripts/publish-golf-course.ts <region> <slug>')
  console.error('  npx tsx scripts/publish-golf-course.ts <region> --all')
  process.exit(1)
}

// ── Helpers ───────────────────────────────────────────────────────────────

function escapeForTs(str: string | null | undefined): string {
  if (!str) return ''
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

function v(field: Record<string, unknown> | null | undefined): unknown {
  if (!field) return null
  return (field as { value: unknown }).value ?? null
}

// ── Schema JSON-LD builder ────────────────────────────────────────────────

function buildSchemaMarkup(fields: Record<string, Record<string, unknown>>, slug: string, region: string): string {
  const amenities: { name: string; field: string }[] = [
    { name: 'Driving Range', field: 'driving_range' },
    { name: 'Caddie Required', field: 'caddie_required' },
    { name: 'Golf Cart', field: 'cart_required' },
  ]

  const lat = v(fields['latitude'])
  const lng = v(fields['longitude'])
  const googleMapsUrl = v(fields['google_maps_url'])
  const website = v(fields['website'])
  const phone = v(fields['phone'])

  const sameAs: string[] = []
  if (googleMapsUrl) sameAs.push(String(googleMapsUrl))
  if (website) sameAs.push(String(website))

  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'GolfCourse',
      name: v(fields['name']),
      url: `https://www.len.golf/golf-courses/${region}/${slug}/`,
      description: null, // filled from prose.overview at render time
      address: {
        '@type': 'PostalAddress',
        addressLocality: v(fields['province']),
        addressCountry: 'TH',
      },
      geo:
        lat && lng
          ? {
              '@type': 'GeoCoordinates',
              latitude: lat,
              longitude: lng,
            }
          : undefined,
      telephone: phone || undefined,
      priceRange: '฿฿฿',
      sameAs: sameAs.length ? sameAs : undefined,
      amenityFeature: amenities
        .filter((a) => v(fields[a.field]) !== null)
        .map((a) => ({
          '@type': 'LocationFeatureSpecification',
          name: a.name,
          value: v(fields[a.field]),
        })),
    },
    null,
    2
  )
}

// ── Course TS object builder ──────────────────────────────────────────────

function buildCourseObject(data: Record<string, unknown>): string {
  const fields = data['fields'] as Record<string, Record<string, unknown>>
  const prose = data['prose'] as Record<string, string>
  const slug = data['slug'] as string
  const region = data['region'] as string

  const schema = buildSchemaMarkup(fields, slug, region)

  return `import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: '${slug}',
  region: '${region}',
  name: \`${escapeForTs(String(v(fields['name']) ?? ''))}\`,
  province: \`${escapeForTs(String(v(fields['province']) ?? ''))}\`,
  designer: ${v(fields['designer']) ? `\`${escapeForTs(String(v(fields['designer'])))}\`` : 'null'},
  holes: ${v(fields['holes']) ?? 18},
  par: ${v(fields['par']) ?? 72},
  year_opened: ${v(fields['year_opened']) ?? null},
  green_fee_weekday_thb: ${v(fields['green_fee_weekday_thb']) ?? null},
  green_fee_weekend_thb: ${v(fields['green_fee_weekend_thb']) ?? null},
  caddie_fee_thb: ${v(fields['caddie_fee_thb']) ?? null},
  cart_fee_thb: ${v(fields['cart_fee_thb']) ?? null},
  caddie_required: ${v(fields['caddie_required']) ?? true},
  cart_required: ${v(fields['cart_required']) ?? false},
  driving_range: ${v(fields['driving_range']) ?? null},
  website: ${v(fields['website']) ? `'${v(fields['website'])}'` : 'null'},
  phone: ${v(fields['phone']) ? `'${v(fields['phone'])}'` : 'null'},
  latitude: ${v(fields['latitude']) ?? null},
  longitude: ${v(fields['longitude']) ?? null},
  distance_from_bangkok_km: ${v(fields['distance_from_bangkok_km']) ?? null},
  drive_time_from_bangkok_min: ${v(fields['drive_time_from_bangkok_min']) ?? null},
  google_maps_url: ${v(fields['google_maps_url']) ? `'${v(fields['google_maps_url'])}'` : 'null'},
  club_rental_available: ${v(fields['club_rental_available']) ?? null},
  club_rental_fee_thb: ${v(fields['club_rental_fee_thb']) ?? null},
  club_rental_brands: ${v(fields['club_rental_brands']) ? `'${v(fields['club_rental_brands'])}'` : 'null'},
  schema_markup: ${JSON.stringify(schema)},
  prose: {
    overview: \`${escapeForTs(prose?.['overview'] ?? '')}\`,
    layout_and_experience: \`${escapeForTs(prose?.['layout_and_experience'] ?? '')}\`,
    tips: \`${escapeForTs(prose?.['tips'] ?? '')}\`,
    location_and_access: \`${escapeForTs(prose?.['location_and_access'] ?? '')}\`,
    rental_cta_context: \`${escapeForTs(prose?.['rental_cta_context'] ?? '')}\`,
  },
  locales: {
    en: {
      title: \`${escapeForTs(String(v(fields['name']) ?? ''))} — Green Fees, Course Guide & Golf Club Rentals\`,
      meta_description: \`${escapeForTs(String(v(fields['name']) ?? ''))} green fees, course overview, tips, and how to arrange golf club rentals for your round.\`,
    },
    ko: null,
    zh: null,
    ja: null,
  },
  status: 'published',
  published_at: '${new Date().toISOString().split('T')[0]}',
}
`
}

// ── Process one course ────────────────────────────────────────────────────

function publishCourse(region: string, slug: string): void {
  const approvedPath = path.join(APPROVED_DIR, region, `${slug}.json`)

  if (!fs.existsSync(approvedPath)) {
    console.error(`\n❌  No approved course found at docs/course-guide/data/4.approved/${region}/${slug}.json`)
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(approvedPath, 'utf-8'))
  const tsContent = buildCourseObject(data)

  const outDir = path.join(OUTPUT_DIR, region)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const outPath = path.join(outDir, `${slug}.ts`)
  fs.writeFileSync(outPath, tsContent, 'utf-8')

  console.log(`✅  Published: data/golf-courses/${region}/${slug}.ts`)
  console.log(`    Live at:   /golf-courses/${region}/${slug}/`)
}

// ── Main ──────────────────────────────────────────────────────────────────

function main() {
  if (slugArg === '--all') {
    const regionDir = path.join(APPROVED_DIR, region)
    if (!fs.existsSync(regionDir)) {
      console.error(`❌  No approved courses found for region: ${region}`)
      process.exit(1)
    }
    const files = fs.readdirSync(regionDir).filter((f) => f.endsWith('.json'))
    if (!files.length) {
      console.error(`❌  No JSON files in docs/course-guide/data/4.approved/${region}/`)
      process.exit(1)
    }
    console.log(`\n📦  Publishing ${files.length} courses for region: ${region}\n`)
    for (const file of files) {
      const slug = file.replace('.json', '')
      publishCourse(region, slug)
    }
    console.log(`\n✅  Done. Run \`npm run build\` to check for TypeScript errors.`)
  } else {
    console.log(`\n📦  Publishing: ${region}/${slugArg}\n`)
    publishCourse(region, slugArg)
    console.log(`\nRun \`npm run build\` to check for TypeScript errors.`)
  }
}

main()
