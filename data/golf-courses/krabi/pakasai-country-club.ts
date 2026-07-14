import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'pakasai-country-club',
  region: 'krabi',
  name: `Pakasai Country Club`,
  province: `Krabi`,
  designer: null,
  holes: 18,
  par: 72,
  year_opened: null,
  green_fee_weekday_thb: 2500,  // provisional — aggregator data, single source; no weekend differential confirmed
  green_fee_weekend_thb: 2500,  // provisional — no weekend surcharge found
  caddie_fee_thb: 300,          // provisional — consistent with comparable southern Thailand resort courses
  cart_fee_thb: 500,            // provisional
  caddie_required: true,
  cart_required: false,
  driving_range: true,
  website: null,
  phone: null,
  latitude: 8.0953,
  longitude: 98.9072,
  distance_from_bangkok_km: 820,
  drive_time_from_bangkok_min: 600,
  google_maps_url: null,
  club_rental_available: true,
  club_rental_fee_thb: null,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"Pakasai Country Club\",\n  \"url\": \"https://len.golf/golf-courses/krabi/pakasai-country-club\",\n  \"description\": \"Krabi's only 18-hole championship golf course, set in a tropical rubber plantation valley with limestone karst mountain views.\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Krabi\",\n    \"addressRegion\": \"Krabi\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 8.0953,\n    \"longitude\": 98.9072\n  },\n  \"priceRange\": \"฿฿\",\n  \"amenityFeature\": [\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Caddie Required\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Golf Cart\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Driving Range\",\n      \"value\": true\n    },\n    {\n      \"@type\": \"LocationFeatureSpecification\",\n      \"name\": \"Club Rental\",\n      \"value\": true\n    }\n  ]\n}",
  prose: {
    overview: `Pakasai Country Club is Krabi province's only 18-hole championship golf course — a par-72 layout set in a tropical rubber plantation valley approximately 8 km from Krabi town, with the province's iconic limestone karst formations rising above the treeline on every horizon. The course is the natural base for golfers visiting Ao Nang, Krabi town, and the wider Andaman coastline: accessible from the airport in under 20 minutes, and an easy detour for day-trippers from Phuket (roughly 2.5 hours by road). Rubber trees line the fairways, the sky is framed by karst peaks, and the atmosphere is a relaxed resort-town mix of local golfers and visiting tourists. Green fees for foreign visitors are approximately 2,500 THB (provisional; confirm with the club directly), with caddie fee 300 THB and cart 500 THB available separately. Club rental is available on site.`,
    layout_and_experience: `Pakasai Country Club routes 18 holes through a tropical valley floor that was planted with rubber trees long before the first fairway was cut. The setting is quintessentially southern Thai: flat-to-gently-rolling terrain, dense tropical vegetation between holes, and the abrupt vertical drama of Krabi's limestone karst peaks rising from the valley rim. On clear mornings the mountain silhouettes against the sky are among the most photogenic backdrops in Thai golf.\n\nAt par 72 over 18 holes, the layout is full-length and suited to a wide range of handicaps. The rubber plantation terrain is more forgiving than the steep hillside layouts of Phuket or Chiang Mai — the challenge here comes from accuracy through the tree corridors and reading greens on a course that sees significant year-round tropical weather. Fairways are maintained to a standard appropriate for a provincial resort course: well-kept and playable throughout the year, with peak presentation in the dry-season months of November to April.\n\nCaddies are mandatory and provide useful local course knowledge — particularly for first-time visitors unfamiliar with the micro-topography of greens that can look flat but play with subtle borrows. The driving range is available for warm-up before the round.`,
    tips: `Call ahead to confirm current green fees and tee time availability — Pakasai has no confirmed online booking system and rates should be verified directly with the club before arrival. The 2,500 THB green fee figure is provisional; the course will quote current rates on request.\n\nKrabi International Airport (KBV) is served by multiple daily flights from Bangkok's Suvarnabhumi and Don Mueang airports (approximately 1.5 hours), as well as connections from Phuket, Kuala Lumpur, and Singapore. From Krabi Airport to Pakasai: approximately 15–20 minutes by Grab or taxi. From Ao Nang beach: approximately 25–30 minutes east. From Phuket: approximately 2.5 hours south-west (165 km via Route 402 and Route 4).\n\nThe Andaman coast dry season runs November to April — this is the best window for golf in Krabi, with reliable sunshine, lower humidity, and minimal rain. The wet season (May to October) brings heavy afternoon downpours; morning tee times generally play before the rain arrives. The course is playable year-round but book early-morning slots during the monsoon months.\n\nKrabi combines well with golf: Tiger Cave Temple (Wat Tham Seua) and its 1,237-step staircase climb above the karst ridge, Ao Nang beach and the long-tail boat transfers to Railay, and the full-moon limestone formations of Thung Teao Forest Natural Park (Crystal Pool) are all within 30–60 minutes of the course.`,
    location_and_access: `Pakasai Country Club is located approximately 8 km from Krabi town, off Route 4 in the Krabi valley — Krabi province, southern Thailand. Nearest airport: Krabi International Airport (KBV), approximately 15–20 minutes by car. From Ao Nang beach resort area: approximately 25–30 minutes east via Route 4. From Phuket Airport: approximately 2.5 hours south (165 km via Route 402 south to Route 4 east). From Bangkok: approximately 820 km by road (~10 hours) — the practical route is a 1.5-hour flight to KBV followed by a short transfer.`,
    rental_cta_context: `Flying into Krabi for a round at Pakasai? LENGOLF can set you up with premium rental clubs in Bangkok before you fly south — travel light through Krabi Airport and skip the airline baggage fees on a bag of clubs you'll only use for one round.`,
  },
  locales: {
    en: {
      title: `Pakasai Country Club Krabi — Green Fees, Course Guide & Club Rentals`,
      meta_description: `Pakasai Country Club: Krabi's only 18-hole championship golf course. ฿2,500 green fee (provisional). Rubber plantation valley, limestone karst views. Caddie required. Club rentals available from Bangkok.`,
    },
    ko: null,
    zh: null,
    ja: null,
  },
  status: 'published',
  published_at: '2026-04-21',
}
