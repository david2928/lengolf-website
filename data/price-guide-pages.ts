import type { PriceGuideSeoPage } from '@/types/seo-pages'

const now = new Date().toISOString()

// Curated Google Reviews about value (all 5-star, English)
const VALUE_REVIEWS = {
  nathan_marina: {
    reviewer_name: 'Suuaap',
    text: 'It was our first time holding a golf club and Nate took his time to teach us the basics and more. Price was totally worth it and fair. We know we\'ll come back!',
  },
  chidbhan: {
    reviewer_name: 'Chidbhan T.',
    text: 'Lengolf is a hidden gem right in the heart of Bangkok — super convenient location! The simulator is modern, high-quality, and incredibly accurate. Prices are very reasonable for the top-notch experience you get.',
  },
  b_screen_golf: {
    reviewer_name: 'B',
    text: 'Happy to have found a great screen golf spot in BKK! The staff were super kind and spoke good English. The machines are new, and the rates are really reasonable especially if you go for the unlimited morning plan.',
  },
  jack: {
    reviewer_name: 'Jack S.',
    text: 'Me and 2 friends came here for some golf after not playing for a while. The technology was fantastic and the staff were very helpful and friendly. For a very reasonable price I would definitely recommend!',
  },
  ray: {
    reviewer_name: 'Ray S.',
    text: 'Had a lesson with Pro Min and he was very kind and helpful. Left me with a few tips to work on at the range. The facility is very nice and they\'re very friendly. Prices are very affordable compared to other similar places in the area.',
  },
  fritz: {
    reviewer_name: 'Fritz P.',
    text: 'So much fun!! Great price, great service, amazing experience.',
  },
  tttnatorn: {
    reviewer_name: 'tttnatorn',
    text: 'Great spot for a golf sim! Accurate tracking, good vibes, and helpful staff. Fair prices too. Perfect for practice or a fun round.',
  },
}

// Shared venue comparison data
const SIMULATOR_VENUES = {
  lengolf: {
    name: 'LENGOLF',
    location: 'Mercury Ville, BTS Chidlom',
    tech: 'Bravo',
    players_per_bay: 5,
    cheapest_rate: '500 THB/hr',
    peak_rate: '900 THB/hr',
    price_includes_tax: true,
    notes: 'Free standard club rental included. Open daily 10:00–23:00.',
  },
  front9: {
    name: 'Front 9',
    location: 'Sukhumvit 47 (Rainhill)',
    tech: 'Trackman',
    players_per_bay: 4,
    cheapest_rate: '600 THB/hr',
    peak_rate: '900 THB/hr (promo)',
    price_includes_tax: true,
    notes: '+200 THB/hr for private bay. +100 THB/hr per person from 5th player.',
  },
  fairway: {
    name: 'Fairway Golf & City Club',
    location: 'Sukhumvit 24, BTS Phrom Phong',
    tech: 'Trackman',
    players_per_bay: 8,
    cheapest_rate: '1,000 THB/hr',
    peak_rate: '1,400 THB/hr',
    price_includes_tax: false,
    notes: 'Prices exclude VAT. Membership packages from 11,000 THB / 10 hours.',
  },
  topgolf: {
    name: 'Topgolf Megacity',
    location: 'Mega Bangna (Bang Phli)',
    tech: 'Topgolf',
    players_per_bay: 6,
    cheapest_rate: '550 THB/hr',
    peak_rate: '1,250 THB/hr',
    price_includes_tax: false,
    notes: 'Prices exclude service charge + VAT (~17%). 150 THB one-time joining fee. Located 30–45 min from central Bangkok.',
  },
}

export const priceGuidePages: PriceGuideSeoPage[] = [
  // ─── Page 1: How Much Does Golf Cost in Bangkok? ───
  {
    id: 'price-1',
    page_type: 'price_guide',
    slug: 'how-much-does-golf-cost-bangkok',
    title: 'How Much Does Golf Cost in Bangkok? (2026 Complete Guide)',
    meta_description:
      'Golf in Bangkok costs 500–4,000 THB depending on format. Compare indoor simulator rates (from 500 THB/hr for 5 people) vs outdoor course green fees, driving ranges, and lessons.',
    featured_image: null,
    schema_markup: null,
    status: 'draft',
    category: 'pricing',
    locale: 'en',
    related_slugs: ['/cost/golf-simulator-prices-bangkok', '/cost/lengolf-pricing-guide', '/cost/golf-lesson-prices-bangkok', '/golf'],
    created_at: now,
    updated_at: now,
    content: {
      intro:
        'Golf in Bangkok typically costs between 500 and 4,000 THB, depending on whether you play indoors on a simulator or outdoors on a course. Indoor golf simulators start at 500 THB per hour for up to 5 people — just 100 THB per person. Outdoor courses range from 1,500 to 4,000 THB per round, plus caddie fees and transport.',
      price_breakdown: [
        { item: 'Indoor golf simulator (LENGOLF)', price: '500–900 THB/hr', notes: 'Per bay, up to 5 players. Free club rental included. BTS Chidlom.' },
        { item: 'Indoor golf simulator (other venues)', price: '550–1,400 THB/hr', notes: 'Varies by venue, time, and day. Some exclude tax.' },
        { item: 'Outdoor course green fee (weekday)', price: '1,500–3,000 THB', notes: 'Per round. Courses like Alpine, Lakewood, Bangkok Golf Club.' },
        { item: 'Outdoor course green fee (weekend)', price: '2,500–4,000 THB', notes: 'Premium rates on Sat–Sun and public holidays.' },
        { item: 'Caddie fee (outdoor courses)', price: '300–400 THB', notes: 'Required at most Thai courses. Tip of 300–500 THB is customary.' },
        { item: 'Golf cart (outdoor courses)', price: '600–800 THB', notes: 'Optional at most courses. Shared between 2 players.' },
        { item: 'Driving range', price: '100–300 THB', notes: 'Per bucket of balls (50–100 balls). No club rental usually.' },
        { item: 'Golf lessons (indoor)', price: '1,800 THB/hr', notes: 'Private lesson with a pro. LENGOLF offers a free 1-hour trial.' },
        { item: 'Golf club rental (outdoor courses)', price: '500–1,500 THB', notes: 'Per round. Quality varies significantly.' },
      ],
      comparison_with_alternatives:
        'The cost difference between indoor and outdoor golf in Bangkok is significant. An outdoor round at a mid-range course costs approximately 2,500 THB (green fee) + 400 THB (caddie) + 700 THB (cart) + 500 THB (club rental if needed) = 4,100 THB minimum per person, plus 1–2 hours of transport each way. At LENGOLF, a group of 5 can play for 500 THB total per hour — 100 THB per person — in air-conditioned comfort at BTS Chidlom. For practice, social outings, or anyone who wants to experience golf without the full-day commitment, indoor simulators are dramatically more accessible.',
      value_proposition:
        'At 100 THB per person per hour (group of 5), LENGOLF is the most affordable way to play golf in Bangkok. No caddie fees, no transport costs, no dress code. Just show up at BTS Chidlom and play.',
      last_verified: '2026-02-19',
      venue_comparison: {
        venues: [
          SIMULATOR_VENUES.lengolf,
          SIMULATOR_VENUES.front9,
          SIMULATOR_VENUES.fairway,
          SIMULATOR_VENUES.topgolf,
        ],
        summary:
          'LENGOLF offers the lowest per-person cost of any simulator venue in central Bangkok. For a group of 5 at off-peak rates, that\'s 100 THB per person per hour — less than a driving range bucket. Topgolf\'s headline rates look competitive but exclude service charge and VAT (adding ~17%), and the venue is 30–45 minutes from central Bangkok. Fairway Golf & City Club uses premium Trackman technology but at 2x the base rate. Front 9 is closest in pricing to LENGOLF but caps at 4 players per bay.',
      },
      sections: [
        {
          heading: 'Outdoor Golf: Full Cost Breakdown',
          body: 'A typical outdoor golf day in Bangkok includes: green fees (1,500–4,000 THB), caddie fee (300–400 THB + 300–500 THB tip), golf cart (600–800 THB, often shared), club rental if you don\'t have your own (500–1,500 THB), and transport (taxi to most courses is 400–800 THB each way, or join a van service for 200–400 THB). The total for a solo player renting clubs comes to 4,000–7,000 THB for a single round. Outdoor courses are generally 45–90 minutes from central Bangkok, which means a full golf day is a 6–8 hour commitment.',
        },
        {
          heading: 'Indoor Simulator Golf: What You Get',
          body: 'Indoor golf simulators let you play famous courses like Pebble Beach, St Andrews, and TPC Sawgrass in air-conditioned comfort. Modern simulators track ball speed, launch angle, spin, and carry distance with high accuracy. At LENGOLF, each bay accommodates up to 5 players, and the price covers the bay — not per person. A 2-hour session for 4 friends costs 1,000 THB weekday morning (250 THB each). Free standard club rental is included, so you don\'t need to bring or rent equipment.',
        },
        {
          heading: 'Which Option Is Best for You?',
          body: 'Choose outdoor courses if you want the full golf experience — fresh air, manicured fairways, and 4–5 hours of walking or riding. Choose indoor simulators if you want convenience (central Bangkok location, no travel), affordability (fraction of the cost), flexibility (play 1 hour or 4), and weather-proof golf any time of day. For beginners, tourists, and social groups, indoor simulators are usually the better value.',
        },
      ],
      curated_reviews: [
        VALUE_REVIEWS.chidbhan,
        VALUE_REVIEWS.jack,
        VALUE_REVIEWS.fritz,
      ],
    },
  },

  // ─── Page 2: Golf Simulator Prices Bangkok Compared ───
  {
    id: 'price-2',
    page_type: 'price_guide',
    slug: 'golf-simulator-prices-bangkok',
    title: 'Golf Simulator Prices in Bangkok Compared (2026)',
    meta_description:
      'Compare golf simulator prices in Bangkok: LENGOLF (from 500 THB/hr), Front 9, Fairway Golf & City Club, and Topgolf Megacity. Full rate cards, packages, and per-person costs.',
    featured_image: null,
    schema_markup: null,
    status: 'draft',
    category: 'pricing',
    locale: 'en',
    related_slugs: ['/cost/how-much-does-golf-cost-bangkok', '/cost/lengolf-pricing-guide', '/faq/how-much-does-indoor-golf-cost-in-bangkok', '/golf'],
    created_at: now,
    updated_at: now,
    content: {
      intro:
        'Golf simulator prices in Bangkok range from 500 to 1,400 THB per hour per bay, depending on the venue, time of day, and day of week. LENGOLF starts at 500 THB/hour for up to 5 players. Here\'s an honest comparison of every major simulator venue in central Bangkok.',
      price_breakdown: [
        { item: 'LENGOLF — Weekday before 14:00', price: '500 THB/hr', notes: 'Up to 5 players. Free standard clubs. BTS Chidlom. VAT included.' },
        { item: 'LENGOLF — Weekday 14:00–23:00', price: '700 THB/hr', notes: 'Up to 5 players. Free standard clubs. VAT included.' },
        { item: 'LENGOLF — Weekend / Holiday', price: '700–900 THB/hr', notes: 'Fri–Sun & PH. Up to 5 players. VAT included.' },
        { item: 'Front 9 — Weekday before 12:00', price: '600 THB/hr', notes: 'Up to 4 players. Trackman. Sukhumvit 47. VAT included.' },
        { item: 'Front 9 — Weekday 12:00–17:00', price: '700 THB/hr', notes: 'Up to 4 players. VAT included.' },
        { item: 'Front 9 — Weekday 17:00–22:00 (promo)', price: '800 THB/hr', notes: 'Promo rate (regular: 1,200 THB). VAT included.' },
        { item: 'Front 9 — Weekend', price: '800–900 THB/hr', notes: 'Up to 4 players. +200 THB/hr private bay. VAT included.' },
        { item: 'Fairway Golf — Weekday off-peak', price: '1,000 THB/hr', notes: 'Up to 8 players. Trackman. Sukhumvit 24. Excludes VAT.' },
        { item: 'Fairway Golf — Weekend peak', price: '1,400 THB/hr', notes: 'Up to 8 players. Excludes VAT.' },
        { item: 'Topgolf — Mon–Tue', price: '550–650 THB/hr', notes: 'Up to 6 players. Mega Bangna. Excludes SC + VAT (~17%).' },
        { item: 'Topgolf — Fri–Sat peak', price: '1,150–1,250 THB/hr', notes: 'Up to 6 players. Excludes SC + VAT. 150 THB joining fee.' },
      ],
      comparison_with_alternatives:
        'When comparing prices, always check whether tax is included. LENGOLF and Front 9 quote VAT-inclusive prices. Fairway Golf & City Club excludes VAT (add ~7%), and Topgolf Megacity excludes both service charge and VAT (add ~17%), which makes their posted rates 17% lower than the actual cost you\'ll pay. Location also matters: Topgolf is in Mega Bangna — a 30–45 minute drive from central Bangkok — while LENGOLF, Front 9, and Fairway are all on the BTS Sukhumvit line.',
      value_proposition:
        'LENGOLF offers the lowest bay rate in central Bangkok at 500 THB/hour, and the lowest per-person rate at 100 THB (group of 5). With free standard club rental, no joining fees, and prices inclusive of tax, what you see is what you pay.',
      last_verified: '2026-02-19',
      venue_comparison: {
        venues: [
          SIMULATOR_VENUES.lengolf,
          SIMULATOR_VENUES.front9,
          SIMULATOR_VENUES.fairway,
          SIMULATOR_VENUES.topgolf,
        ],
        summary:
          'For per-person value, LENGOLF is the clear winner at 100 THB per person (5 players, weekday off-peak). Front 9 is the closest competitor at 150 THB per person (4 players). Fairway Golf\'s higher capacity (8 players) helps its per-person cost (125 THB at off-peak), but the base rate is double LENGOLF\'s. Topgolf\'s true cost after tax is 643–1,463 THB/hr, and the Bangna location adds significant transport time and cost from central Bangkok.',
      },
      sections: [
        {
          heading: 'LENGOLF: Full Rate Card',
          body: 'LENGOLF is at Mercury Ville, directly connected to BTS Chidlom (Exit 4). Weekday rates: 500 THB/hr before 14:00, 700 THB/hr from 14:00–23:00. Weekend/holiday rates: 700 THB/hr before 14:00, 900 THB/hr from 14:00–23:00. All prices per bay (up to 5 players), inclusive of VAT. Free standard club rental is included with every booking. Premium club rental (Callaway, Majesty) is available from 150 THB/hr. Monthly packages: Bronze (5 hrs, 3,000 THB), Silver (15 hrs, 8,000 THB), Gold (30 hrs, 14,000 THB), Diamond Unlimited (8,000 THB/month), Diamond+ Unlimited (18,000 THB/3 months). Early Bird packages (before 14:00 only): 10 hrs for 4,800 THB, or unlimited for 5,000 THB/month.',
        },
        {
          heading: 'Front 9: Full Rate Card',
          body: 'Front 9 is at Rainhill on Sukhumvit 47, between BTS Phrom Phong and Thong Lo. Weekday rates: 600 THB/hr before 12:00, 700 THB/hr from 12:00–17:00, 800 THB/hr from 17:00–22:00 (promo, regular 1,200 THB). Weekend rates: 800 THB/hr before 12:00, 900 THB/hr from 12:00 onward. All prices per bay (up to 4 players), inclusive of VAT. Private bay is +200 THB/hr. 5th player onwards is +100 THB/hr per person. Packages: Early Rise 10x1hr (before noon, 5,490 THB), Anytime 10x1hr (6,990 THB), 20x1hr (12,900 THB), 50x1hr (29,900 THB). Powered by Trackman.',
        },
        {
          heading: 'Fairway Golf & City Club: Full Rate Card',
          body: 'Fairway Golf & City Club is on Sukhumvit 24, near BTS Phrom Phong. Weekday rates: 1,000 THB/hr off-peak (8am–6pm), 1,200 THB/hr on-peak (6pm–close). Weekend rates: 1,200 THB/hr off-peak, 1,400 THB/hr on-peak. All prices per room (up to 8 players), excluding VAT. Membership packages: 10 hrs (11,000 THB / 2 months), 25 hrs (23,500 THB / 4 months, 5% F&B discount), 50 hrs (41,000 THB / 8 months, 8% F&B discount), 100 hrs (75,000 THB / 12 months, 10% F&B discount). Powered by Trackman. Fairway also has a bar, DJs on weekends, and karaoke.',
        },
        {
          heading: 'Topgolf Megacity: Full Rate Card',
          body: 'Topgolf Megacity is in Bang Phli near Mega Bangna — approximately 30–45 minutes from central Bangkok by car. It\'s a very different experience from the simulator bars above: it\'s an outdoor multi-story driving range with target-based games, not a traditional enclosed golf simulator. Standard bay rates: Mon–Tue 550–650 THB/hr, Wed–Thu 550–850 THB/hr, Fri 550–1,150 THB/hr, Sat 850–1,250 THB/hr, Sun 850–1,150 THB/hr. VIP bays (up to 12 players): 1,500–2,750 THB/hr with 10,000 THB minimum F&B spend. All prices exclude service charge and VAT — add approximately 17% to posted rates. One-time joining fee of 150 THB for new players. Students receive 50% discount on weekdays.',
        },
        {
          heading: 'Which Venue Is Right for You?',
          body: 'Choose LENGOLF if you want the best value in central Bangkok — lowest per-person cost, free clubs, BTS access, and a social bar atmosphere. Choose Front 9 if you\'re a serious golfer who values Trackman data and lives near Sukhumvit 47. Choose Fairway Golf & City Club if you want a premium experience with Trackman, have a larger group (up to 8), and don\'t mind paying more. Choose Topgolf Megacity if you want the Topgolf experience — an outdoor driving range with games, food, and a party atmosphere — and don\'t mind traveling to Bangna.',
        },
      ],
      curated_reviews: [
        VALUE_REVIEWS.b_screen_golf,
        VALUE_REVIEWS.tttnatorn,
        VALUE_REVIEWS.chidbhan,
      ],
    },
  },

  // ─── Page 3: LENGOLF Pricing Guide ───
  {
    id: 'price-3',
    page_type: 'price_guide',
    slug: 'lengolf-pricing-guide',
    title: 'LENGOLF Pricing Guide: Bay Rates, Packages & Lessons (2026)',
    meta_description:
      'Complete LENGOLF pricing: bay rental from 500 THB/hr (up to 5 people), monthly packages from 3,000 THB, lessons from 1,800 THB/hr, event packages from 9,999 THB. All rates for 2026.',
    featured_image: null,
    schema_markup: null,
    status: 'draft',
    category: 'pricing',
    locale: 'en',
    related_slugs: ['/golf', '/lessons', '/events', '/golf-club-rental', '/cost/golf-simulator-prices-bangkok'],
    created_at: now,
    updated_at: now,
    content: {
      intro:
        'LENGOLF bay rental starts at 500 THB per hour for up to 5 people — that\'s 100 THB per person. We also offer monthly packages, golf lessons, event packages, and premium club rental. Here\'s our complete 2026 pricing.',
      price_breakdown: [
        { item: 'Bay rental — Weekday before 14:00', price: '500 THB/hr', notes: 'Mon–Thu. Per bay, up to 5 players.' },
        { item: 'Bay rental — Weekday 14:00–23:00', price: '700 THB/hr', notes: 'Mon–Thu. Per bay, up to 5 players.' },
        { item: 'Bay rental — Weekend before 14:00', price: '700 THB/hr', notes: 'Fri–Sun & public holidays. Per bay, up to 5 players.' },
        { item: 'Bay rental — Weekend 14:00–23:00', price: '900 THB/hr', notes: 'Fri–Sun & public holidays. Per bay, up to 5 players.' },
        { item: 'Bronze Package (5 hrs / 1 month)', price: '3,000 THB', notes: '600 THB/hr effective rate. Good for occasional visitors.' },
        { item: 'Silver Package (15 hrs / 3 months)', price: '8,000 THB', notes: '533 THB/hr effective rate. 5% off food & drinks.' },
        { item: 'Gold Package (30 hrs / 6 months)', price: '14,000 THB', notes: '467 THB/hr effective rate. 10% off food & drinks.' },
        { item: 'Diamond Unlimited (1 month)', price: '8,000 THB', notes: 'Unlimited hours. 5% off food & drinks.' },
        { item: 'Diamond+ Unlimited (3 months)', price: '18,000 THB', notes: 'Unlimited hours. 10% off food & drinks. Best value for regulars.' },
        { item: 'Early Bird (10 hrs / 6 months)', price: '4,800 THB', notes: 'Before 14:00 only. 480 THB/hr effective rate.' },
        { item: 'Early Bird+ Unlimited (1 month)', price: '5,000 THB', notes: 'Before 14:00 only. Unlimited hours. 5% off food & drinks.' },
        { item: 'Private lesson (1 golfer, 1 hr)', price: '1,800 THB', notes: 'With a PGA-qualified pro.' },
        { item: 'Starter Package (5 coaching + 5 practice hrs)', price: '11,000 THB', notes: 'Best for beginners. Includes free golf glove. 6-month validity.' },
        { item: 'Free trial lesson', price: '0 THB', notes: '1 hour with a pro. No obligation. Book via LINE or website.' },
        { item: 'Small Event Package (10–15 guests)', price: '9,999 THB', notes: '2 bays, 3 hours. Includes 10 beers, 5 cocktails, unlimited soft drinks, food.' },
        { item: 'Medium Event Package (15–25 guests)', price: '21,999 THB', notes: '4 bays (exclusive), 3 hours. Includes 20 beers, 10 cocktails, unlimited soft drinks, food.' },
        { item: 'Standard club rental', price: 'Free', notes: 'Included with every bay booking. Men\'s and ladies\' sets available.' },
        { item: 'Premium club rental (Callaway / Majesty)', price: '150 THB/hr', notes: '250 THB/2hr, 400 THB/4hr, 1,200 THB/day. Can be taken off-site.' },
      ],
      comparison_with_alternatives:
        'All LENGOLF prices are inclusive of VAT. What you see is what you pay — no hidden fees, no joining fees, no minimum spend requirements. Standard club rental is free with every bay booking, which is unique among Bangkok simulator venues. Our monthly packages provide the best per-hour rates in the city: the Diamond+ Unlimited package at 18,000 THB for 3 months of unlimited play is unmatched for regular golfers.',
      value_proposition:
        'LENGOLF is designed to make golf accessible. At 100 THB per person (group of 5, weekday morning), it\'s less than a movie ticket. Free standard clubs mean you can walk in with nothing and play immediately. And with a free 1-hour trial lesson, there\'s zero risk to try.',
      last_verified: '2026-02-19',
      sections: [
        {
          heading: 'Best Value: Which Package Is Right for You?',
          body: 'If you visit once or twice a month, the Bronze package (5 hrs, 3,000 THB) saves you over walk-in rates. If you\'re building a regular habit, the Silver (15 hrs, 8,000 THB) drops your effective rate to 533 THB/hr with a 5% food & drink discount. For serious golfers, the Diamond Unlimited at 8,000 THB/month is extraordinary value — if you play just 12 hours in a month, you\'re paying 667 THB/hr. Play 20+ hours and it drops below 400 THB/hr. The Early Bird+ Unlimited (5,000 THB/month, before 14:00) is the best deal for anyone with a flexible schedule.',
        },
        {
          heading: 'Food, Drinks & On-Site Dining',
          body: 'LENGOLF shares Mercury Ville with Smith & Co. (Western cafe) and Pizza Mania (Italian). Both deliver directly to your bay. Our own bar serves craft beer, cocktails, wine, soft drinks, and snacks. Silver, Gold, Diamond, and Diamond+ package holders get 5–10% off all food and beverage purchases.',
        },
      ],
      curated_reviews: [
        VALUE_REVIEWS.nathan_marina,
        VALUE_REVIEWS.ray,
        VALUE_REVIEWS.b_screen_golf,
      ],
    },
  },

  // ─── Page 4: Cost of Renting Golf Clubs Bangkok ───
  {
    id: 'price-4',
    page_type: 'price_guide',
    slug: 'cost-of-renting-golf-clubs-bangkok',
    title: 'Cost of Renting Golf Clubs in Bangkok (2026 Guide)',
    meta_description:
      'Golf club rental in Bangkok costs 150–1,500 THB depending on where you rent. Compare LENGOLF (free standard, 150 THB/hr premium), course rentals, and standalone services.',
    featured_image: null,
    schema_markup: null,
    status: 'draft',
    category: 'pricing',
    locale: 'en',
    related_slugs: ['/golf-club-rental', '/cost/how-much-does-golf-cost-bangkok', '/faq/should-i-bring-golf-clubs-to-thailand-or-rent', '/faq/cost-to-fly-with-golf-clubs-to-thailand'],
    created_at: now,
    updated_at: now,
    content: {
      intro:
        'Golf club rental in Bangkok ranges from free (at LENGOLF, included with every bay booking) to 1,500 THB per round at outdoor courses. If you\'re a tourist deciding whether to bring your own clubs or rent, this guide breaks down every option and cost.',
      price_breakdown: [
        { item: 'LENGOLF — Standard set (in-house)', price: 'Free', notes: 'Included with every bay booking. Men\'s and ladies\' sets. In-house use only.' },
        { item: 'LENGOLF — Premium set (Callaway / Majesty)', price: '150 THB/hr', notes: '250 THB/2hr, 400 THB/4hr, 1,200 THB/day. Can be taken to any Bangkok course.' },
        { item: 'Outdoor course rental (budget)', price: '500–800 THB/round', notes: 'Basic sets at public courses. Quality is hit-or-miss.' },
        { item: 'Outdoor course rental (premium)', price: '1,000–1,500 THB/round', notes: 'Brand-name sets at top courses. Usually Callaway or TaylorMade.' },
        { item: 'Standalone rental service', price: '800–1,500 THB/day', notes: 'Delivered to your hotel or course. Higher quality, more selection.' },
        { item: 'Flying clubs to Thailand (airline fees)', price: '2,000–6,000+ THB each way', notes: 'Varies by airline. AirAsia: ~4,200–6,300 THB each way. Full-service carriers may include in checked luggage.' },
        { item: 'Hard travel case for clubs', price: '5,000–15,000 THB', notes: 'One-time purchase. Essential for protecting clubs in transit.' },
        { item: 'Golf gloves (LENGOLF)', price: '600 THB', notes: 'Available for purchase at LENGOLF.' },
        { item: 'Golf balls (LENGOLF)', price: '400 THB / 6 balls', notes: 'Srixon quality. Available at LENGOLF.' },
      ],
      comparison_with_alternatives:
        'For tourists visiting Bangkok, the math is clear: flying with golf clubs costs 4,000–12,000 THB round-trip in airline fees alone, plus the hassle and risk of damage. LENGOLF\'s free standard club rental eliminates this entirely for simulator golf. If you want to play outdoor courses too, our premium rental at 1,200 THB/day for Callaway or Majesty sets is competitive with standalone rental services and significantly cheaper than most course pro shop rentals.',
      value_proposition:
        'LENGOLF is the only simulator venue in Bangkok that includes free standard club rental with every bay booking. Walk in empty-handed, play immediately. For outdoor courses, our premium club delivery service (1,200 THB/day + 500 THB delivery within Bangkok) is the most convenient option — we bring the clubs to your hotel or the course.',
      last_verified: '2026-02-19',
      sections: [
        {
          heading: 'Should You Bring Your Clubs or Rent?',
          body: 'If you\'re playing 3+ outdoor rounds during your trip and have your own clubs, it may be worth flying with them — especially on full-service airlines that include golf bags in checked luggage. For everyone else, renting in Bangkok is cheaper and easier. Our recommendation: use LENGOLF\'s free standard clubs for simulator sessions, and rent premium clubs for any outdoor course days.',
        },
        {
          heading: 'LENGOLF Club Delivery Service',
          body: 'Our premium club sets (Callaway Warbird for men, Majesty Shuttle for women) can be rented for the full day at 1,200 THB and delivered anywhere in Bangkok for a flat 500 THB fee. Same-day delivery is available if booked before noon. This means you can rent from LENGOLF, have clubs delivered to your hotel, play an outdoor course, and return them — no need to visit a separate rental shop.',
        },
      ],
      curated_reviews: [
        VALUE_REVIEWS.ray,
        VALUE_REVIEWS.chidbhan,
        VALUE_REVIEWS.jack,
      ],
    },
  },

  // ─── Page 5: Corporate Golf Event Cost Bangkok ───
  {
    id: 'price-5',
    page_type: 'price_guide',
    slug: 'corporate-golf-event-cost-bangkok',
    title: 'How Much Does a Corporate Golf Event Cost in Bangkok? (2026)',
    meta_description:
      'Corporate golf events in Bangkok cost 9,999–21,999 THB at LENGOLF (all-inclusive for 10–25 guests) vs 3,000–7,000 THB per person at outdoor courses. Full cost comparison inside.',
    featured_image: null,
    schema_markup: null,
    status: 'draft',
    category: 'pricing',
    locale: 'en',
    related_slugs: ['/events', '/cost/lengolf-pricing-guide', '/cost/how-much-does-golf-cost-bangkok', '/activities/group-activities-bangkok'],
    created_at: now,
    updated_at: now,
    content: {
      intro:
        'A corporate golf event in Bangkok costs between 9,999 THB (all-inclusive for 10–15 guests at LENGOLF) and 100,000+ THB for an outdoor course outing. At LENGOLF, the per-person cost is 667–1,000 THB including food, drinks, and 3 hours of golf — a fraction of outdoor alternatives.',
      price_breakdown: [
        { item: 'LENGOLF Small Package (10–15 guests)', price: '9,999 THB total', notes: '2 bays, 3 hours. Includes 10 beers, 5 cocktails, unlimited soft drinks, food from Smith & Co.' },
        { item: 'LENGOLF Medium Package (15–25 guests)', price: '21,999 THB total', notes: '4 bays (full venue), 3 hours. Includes 20 beers, 10 cocktails, unlimited soft drinks, food from Smith & Co. & Pizza Mania.' },
        { item: 'LENGOLF per-person cost (Small, 15 guests)', price: '~667 THB', notes: 'All-inclusive. No hidden fees.' },
        { item: 'LENGOLF per-person cost (Medium, 25 guests)', price: '~880 THB', notes: 'All-inclusive. No hidden fees.' },
        { item: 'Outdoor course — per person (budget)', price: '3,000–4,000 THB', notes: 'Green fee + caddie + cart. Food and transport separate.' },
        { item: 'Outdoor course — per person (premium)', price: '5,000–7,000 THB', notes: 'Top courses. Still excludes event catering and prizes.' },
        { item: 'Outdoor course — full event (20 people)', price: '80,000–150,000+ THB', notes: 'Includes green fees, caddies, transport van, lunch, prizes.' },
        { item: 'Hotel event space + catering (no golf)', price: '50,000–200,000 THB', notes: 'Conference hotels. Passive event format.' },
      ],
      comparison_with_alternatives:
        'An outdoor corporate golf day for 20 people typically costs 80,000–150,000 THB when you add up green fees (40,000–80,000 THB), caddie fees (8,000 THB), transport (10,000–15,000 THB for a chartered van), lunch (15,000–25,000 THB), and prizes. It also requires 6–8 hours including travel. At LENGOLF, the Medium Package at 21,999 THB covers everything for up to 25 people in a 3-hour format, right at BTS Chidlom. That\'s approximately 85% cheaper and half the time commitment.',
      value_proposition:
        'LENGOLF event packages are all-inclusive: golf, food, drinks, and venue — one price, no surprises. At 667–880 THB per person, it\'s the most affordable corporate golf experience in Bangkok. Book a bay or the full venue for a team building session that everyone can enjoy — golfers and non-golfers alike.',
      last_verified: '2026-02-19',
      sections: [
        {
          heading: 'What\'s Included in LENGOLF Event Packages',
          body: 'Both packages include: exclusive bay access, golf simulator play on 100+ world-famous courses, a tournament format with scoring and leaderboards, beer (Singha and Asahi), cocktails, unlimited soft drinks, and food platters from Smith & Co. (and Pizza Mania for Medium packages). The venue handles all setup — tournament formatting, scoring, music — so the organizer just shows up with their team. Customization options include: decorations, custom trophies, branded scorecards, and tailored food menus.',
        },
        {
          heading: 'Why Non-Golfers Love It Too',
          body: 'The biggest advantage of LENGOLF over outdoor corporate golf is inclusivity. At an outdoor course, non-golfers have nothing to do. At LENGOLF, the simulator makes golf accessible and fun for complete beginners — the technology tracks shots and provides a game-like experience regardless of skill level. Add cocktails, competitive leaderboards, and a party atmosphere, and you have a team activity that actually engages everyone.',
        },
        {
          heading: 'How to Book a Corporate Event',
          body: 'Contact us via LINE (@lengolf) or call 02-658-6633 to discuss your event. We recommend booking at least 2 weeks in advance for Medium packages (full venue). Small packages can often be arranged within a few days. Custom packages are available for groups larger than 25 or with specific requirements.',
        },
      ],
      curated_reviews: [
        VALUE_REVIEWS.fritz,
        VALUE_REVIEWS.nathan_marina,
        VALUE_REVIEWS.tttnatorn,
      ],
    },
  },

  // ─── Page 6: Golf Lesson Prices Bangkok ───
  {
    id: 'price-6',
    page_type: 'price_guide',
    slug: 'golf-lesson-prices-bangkok',
    title: 'Bangkok Golf Lesson Prices (2026): Indoor & Outdoor Compared',
    meta_description:
      'Golf lesson prices in Bangkok: LENGOLF from 1,800 THB/hr (free 1-hour trial), outdoor pros from 2,000–5,000 THB/hr. Compare indoor simulator coaching vs driving range lessons.',
    featured_image: null,
    schema_markup: null,
    status: 'draft',
    category: 'pricing',
    locale: 'en',
    related_slugs: ['/lessons', '/cost/lengolf-pricing-guide', '/cost/how-much-does-golf-cost-bangkok', '/faq/best-way-to-learn-golf-in-bangkok'],
    created_at: now,
    updated_at: now,
    content: {
      intro:
        'Golf lessons in Bangkok cost between 1,800 and 5,000 THB per hour, depending on the instructor, venue, and format. LENGOLF offers private lessons from 1,800 THB/hour with a PGA-qualified pro — and your first hour is free as a trial lesson.',
      price_breakdown: [
        { item: 'LENGOLF — Private lesson (1 golfer)', price: '1,800 THB/hr', notes: 'With a PGA-qualified pro. Simulator provides detailed swing data.' },
        { item: 'LENGOLF — Semi-private (2 golfers)', price: '2,400 THB/hr', notes: '1,200 THB per person. Same pro, shared session.' },
        { item: 'LENGOLF — Group lesson (3–5 golfers)', price: '2,900 THB/hr', notes: '580–967 THB per person. Great for friends learning together.' },
        { item: 'LENGOLF — 5-hour package (1 golfer)', price: '8,500 THB', notes: '1,700 THB/hr effective. 6-month validity.' },
        { item: 'LENGOLF — 10-hour package (1 golfer)', price: '16,000 THB', notes: '1,600 THB/hr effective. 12-month validity.' },
        { item: 'LENGOLF — Starter Package', price: '11,000 THB', notes: '5 hrs coaching + 5 hrs practice. Free golf glove. Best for complete beginners. 6-month validity.' },
        { item: 'LENGOLF — Sim to Fairway Package', price: '13,499 THB', notes: '5 hrs indoor coaching + 1 on-course lesson. On-course fees extra.' },
        { item: 'LENGOLF — Free trial lesson', price: '0 THB', notes: '1 hour with a pro. No obligation. Book via LINE or website.' },
        { item: 'Outdoor driving range lesson', price: '2,000–3,500 THB/hr', notes: 'Varies by instructor and range. Range balls usually extra.' },
        { item: 'Premium outdoor coaching (top pros)', price: '3,500–5,000 THB/hr', notes: 'PGA-certified coaches at top facilities. Often require course membership.' },
        { item: 'Group clinic at outdoor range', price: '1,000–2,000 THB/person', notes: 'Groups of 4–8. Less individual attention.' },
      ],
      comparison_with_alternatives:
        'Indoor simulator lessons have a significant advantage over outdoor driving range coaching: real-time swing data. LENGOLF\'s Bravo simulators measure ball speed, launch angle, spin rate, carry distance, and club path on every shot. This data-driven feedback accelerates learning in a way that outdoor range lessons — where you watch the ball fly and guess — simply cannot match. The air-conditioned indoor environment also means comfortable, focused practice regardless of Bangkok\'s heat, rain, or pollution.',
      value_proposition:
        'LENGOLF\'s free 1-hour trial lesson removes all risk. Try a lesson, see the swing data, and decide if it\'s right for you — at zero cost. For ongoing coaching, our Starter Package (11,000 THB for 5 hours of coaching plus 5 hours of practice time plus a free golf glove) is the best-value beginner package in Bangkok.',
      last_verified: '2026-02-19',
      sections: [
        {
          heading: 'What Makes Simulator Lessons Different',
          body: 'A simulator lesson at LENGOLF gives you instant, precise feedback after every swing: ball speed, launch angle, backspin, sidespin, carry distance, total distance, and club path. Your coach uses this data to diagnose issues and track improvement over time. In outdoor range lessons, you\'re essentially guessing at these numbers by watching ball flight. For beginners, this data-driven approach dramatically speeds up the learning process. For experienced golfers, it helps fine-tune specific aspects of your swing with clinical precision.',
        },
        {
          heading: 'LENGOLF Coaching Team',
          body: 'LENGOLF\'s coaches are PGA-qualified professionals with experience teaching all skill levels, from complete beginners to single-digit handicappers. Lessons are conducted in English and Thai. Each lesson includes a digital summary of your session data that you can review at home. The coaching bay is identical to the regular bays — same simulator, same club selection — so you can immediately practice what you\'ve learned in a subsequent self-practice session.',
        },
        {
          heading: 'Best Path for Beginners',
          body: 'If you\'ve never played golf: start with the free trial lesson. If you enjoy it, the Starter Package (11,000 THB) is the most structured path — 5 hours of coaching to build fundamentals, plus 5 hours of practice to reinforce them, with a free golf glove to get you started. The 6-month validity means no pressure to rush. After completing the Starter Package, most students move to the 5-hour or 10-hour coaching packages for continued improvement.',
        },
      ],
      curated_reviews: [
        VALUE_REVIEWS.ray,
        VALUE_REVIEWS.nathan_marina,
        VALUE_REVIEWS.fritz,
      ],
    },
  },
]
