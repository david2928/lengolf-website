import type { GolfCourse } from '@/types/golf-courses'

export const course: GolfCourse = {
  slug: 'mae-moh-golf-course',
  region: 'north-misc',
  name: `Mae Moh Golf Course`,
  province: `Lampang`,
  designer: `Electricity Generating Authority of Thailand (EGAT)`,
  holes: 18,
  par: 72,
  year_opened: null,
  green_fee_weekday_thb: null,  // unknown — contact course directly; government/EGAT rate expected
  green_fee_weekend_thb: null,  // unknown
  caddie_fee_thb: null,
  cart_fee_thb: null,
  caddie_required: false,
  cart_required: false,
  driving_range: null,
  website: null,
  phone: null,  // EGAT Mae Moh compound switchboard — direct golf line not found
  latitude: 18.3345,
  longitude: 99.6712,
  distance_from_bangkok_km: 604,
  drive_time_from_bangkok_min: 450,
  google_maps_url: null,
  club_rental_available: null,
  club_rental_fee_thb: null,
  club_rental_brands: null,
  schema_markup: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"GolfCourse\",\n  \"name\": \"Mae Moh Golf Course\",\n  \"url\": \"https://len.golf/golf-courses/north-misc/mae-moh-golf-course\",\n  \"description\": \"18-hole EGAT government golf course at Thailand's largest coal-fired power plant, Mae Moh district, Lampang province.\",\n  \"address\": {\n    \"@type\": \"PostalAddress\",\n    \"addressLocality\": \"Mae Moh\",\n    \"addressRegion\": \"Lampang\",\n    \"addressCountry\": \"TH\"\n  },\n  \"geo\": {\n    \"@type\": \"GeoCoordinates\",\n    \"latitude\": 18.3345,\n    \"longitude\": 99.6712\n  },\n  \"priceRange\": \"฿\"\n}",
  prose: {
    overview: `Mae Moh Golf Course is one of Thailand's most unusual golf settings — an 18-hole EGAT government course built within the Mae Moh Power Plant compound, the largest coal-fired power station in Thailand and one of the largest in Southeast Asia. Located in Mae Moh district, Lampang province, roughly 80 kilometres south-west of Lampang city, the course serves the township of several thousand EGAT employees who live and work within the plant complex, and is open to visiting civilian golfers following the same model as EGAT's government courses at Ubolratana Dam in Khon Kaen and Rajjaprabha Dam in Surat Thani. The Mae Moh compound is a self-contained town — complete with housing, schools, a hospital, and sports facilities — set against the forested mountains of western Lampang. The golf course occupies green space within the compound grounds, with a mountain backdrop that contrasts sharply with the industrial scale of the plant itself. Green fees are at government rates; contact the course directly for current pricing as no official booking website exists.`,
    layout_and_experience: `The Mae Moh Golf Course occupies the compound grounds of EGAT's Mae Moh township, a self-contained residential and industrial settlement in the hills of western Lampang province. The setting is unlike anything else in Thai golf: from certain holes, the cooling towers and generation units of the Mae Moh plant form the skyline backdrop, while the course itself is framed by the wooded mountains of the Mae Moh valley — forested ridges that rise above the township on three sides.\n\nAt 18 holes and par 72 per the EGAT standard township layout, the course is full-length and suitable for regular play. Like EGAT's other government layouts, the fairways follow the terrain of the compound rather than a purpose-engineered resort site: natural-grade holes, maintenance consistent with a well-kept staff course, and none of the manicured precision of Thailand's private clubs. The atmosphere is genuinely local — rounds are played at a relaxed pace alongside EGAT employees and occasional visitors from Lampang city or Chiang Mai.\n\nThe Mae Moh course is the only golf course in Thailand at a coal-fired power plant, and one of very few in the world. For golfers who have played the dam-compound EGAT courses at Ubolratana, Rajjaprabha, or Bhumibol, Mae Moh adds a dramatically different industrial context — the open-cast lignite mine that feeds the plant is visible from the surrounding hills, and the scale of the Mae Moh operation (mining and power generation on the same site) gives this a character no other Thai course can match.\n\nCaddie and cart availability follows EGAT convention: both are expected to be available at government rates, and neither is mandatory. Call ahead to confirm current policy and tee time availability before making the drive.`,
    tips: `There is no official website for Mae Moh Golf Course and no online booking system. Call the Mae Moh Power Plant compound directly — the EGAT Mae Moh switchboard can direct you to the golf course office. Confirm current green fees, tee time availability, and caddie/cart rates before visiting: this is a remote course with a long drive from any major city, and confirming everything in advance avoids a wasted journey.\n\nThe nearest airport is Lampang Airport (LPT), served by Bangkok Airways from Suvarnabhumi (approximately 1.5 hours flying time). From Lampang Airport, Mae Moh is approximately 80 km by road (roughly 1.5 hours via Route 11 south-west, then Route 1035). Rental cars are available at Lampang Airport. From Chiang Mai: approximately 200 km south-west (~2.5 hours by car via Route 11 south and Route 1035 west). From Bangkok: approximately 604 km (~7.5 hours north).\n\nThe Mae Moh mine viewpoint is publicly accessible and worth combining with a round here — the open-cast lignite mine is an extraordinary industrial landscape and a striking photography subject. The EGAT visitor centre at Mae Moh Power Plant also offers guided tours of the generation facilities on weekdays.\n\nLampang province is otherwise known for its horse-drawn carriage culture (unique among Thai cities), Wat Phra That Lampang Luang (one of northern Thailand's finest Lanna temple complexes, 18 km south of Lampang city), and the Thai Elephant Conservation Center at Thung Kwian. Combining a round at Mae Moh with one or more of these makes for a full northern itinerary from Chiang Mai.`,
    location_and_access: `Mae Moh Golf Course is located within the EGAT Mae Moh Power Plant compound, Mae Moh district, Lampang province — approximately 80 km south-west of Lampang city and 604 km north of Bangkok. Nearest airport: Lampang Airport (LPT), served by Bangkok Airways from Suvarnabhumi (approximately 1.5 hours). From Lampang city: follow Route 11 south then Route 1035 south-west towards Mae Moh district, approximately 80 km, ~1.5 hours. From Chiang Mai: approximately 200 km south-west via Route 11, ~2.5 hours. From Bangkok: approximately 604 km north on Highway 1 to Tak junction, then north-east through Wang Nua to Lampang, ~7.5 hours. There is no public transport to the Mae Moh compound — a rental car or private vehicle is required.`,
    rental_cta_context: `Heading north to Lampang or Chiang Mai with a Mae Moh round on the itinerary? Rent premium clubs from LENGOLF in Bangkok before you fly — travel light on the Bangkok Airways hop to Lampang Airport and pick up a Callaway set rather than checking a bag through northern Thailand.`,
  },
  locales: {
    en: {
      title: `Mae Moh Golf Course — Course Guide & Green Fees`,
      meta_description: `Mae Moh Golf Course Lampang: 18-hole EGAT government course at Thailand's largest coal power plant. Remote northern setting, government green fees. Contact course for current rates. Club rentals available from Bangkok.`,
    },
    ko: null,
    zh: null,
    ja: null,
  },
  status: 'published',
  published_at: '2026-04-21',
}
