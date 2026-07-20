// Content for the /faq/ hub page (app/[locale]/faq/page.tsx) in EN + TH.
//
// WHY A DATA FILE (not messages/*.json): the [locale] layout statically builds
// every locale, so a messages-driven page translated to only en+th would emit
// MISSING_MESSAGE errors for ja/ko/zh during SSG. This module instead falls
// back to English for locales without content — those URLs are unreachable
// anyway (the middleware 301s unregistered locale routes to English; see
// lib/translated-routes.ts).
//
// The quick-answer FAQs below are the plain-language answers Google's AI
// surfaces (AI Overviews, Gemini "Ask Maps") read now that GBP Q&A is gone —
// keep answers self-contained, number-rich, and in sync with data/pricing.ts.
//
// House style (PR #39/#61): no em dashes in the user-facing strings.

export interface FaqHubQa {
  question: string
  answer: string
}

export interface FaqHubDirections {
  title: string
  titleSuffix: string
  intro: string
  faqQuestion: string
  /** Full sentences — rendered as numbered steps AND joined into the FAQ answer. */
  steps: string[]
  grabTip: string
  parkingTip: string
  mapCta: string
}

export interface FaqHubBucket {
  label: string
  categories: string[]
  /** Pages whose category matches no bucket land in the catchAll bucket. */
  catchAll?: boolean
}

export interface FaqHubContent {
  metaTitle: string
  metaDescription: string
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  /** Entity statement for AI grounding — keep the first sentence verbatim. */
  entityStatement: string
  stats: { stat: string; label: string }[]
  faqTitle: string
  faqTitleSuffix: string
  quickFaqs: FaqHubQa[]
  /** Phrases in quickFaqs answers rendered as links (see FaqSection). */
  faqLinks: Record<string, { href: string; external?: boolean }>
  directions: FaqHubDirections
  browseTitle: string
  browseTitleSuffix: string
  browseSubtitle: string
  browseBuckets: FaqHubBucket[]
  ctaTitle: string
  ctaSubtitle: string
}

const en: FaqHubContent = {
  metaTitle: 'FAQ: Prices, Booking & Directions',
  metaDescription:
    'Prices, booking, club rental, group events, and step-by-step directions from BTS Chidlom: quick answers about LENGOLF, the indoor golf simulator venue at The Mercury Ville, Bangkok.',
  heroBadge: 'Frequently Asked Questions',
  heroTitle: 'Everything You Need to Know',
  heroSubtitle:
    'Prices, booking, what to bring, and how to find us. The questions guests ask most, answered in one place.',
  entityStatement:
    'LENGOLF is an indoor golf simulator venue at The Mercury Ville @ BTS Chidlom, Bangkok, on the 4th floor at Unit 407, directly connected to the BTS station. We combine four Korean Bravo Golf simulator bays with a full bar and kitchen, free club rental, and Thailand PGA-certified coaching, open 9am to 11pm every day of the week.',
  stats: [
    { stat: '550 THB', label: 'per bay-hour, from' },
    { stat: '5 players', label: 'share one bay' },
    { stat: '9am–11pm', label: 'open every day' },
    { stat: 'Unit 407', label: '4th floor, Mercury Ville' },
  ],
  faqTitle: 'Quick',
  faqTitleSuffix: 'Answers',
  quickFaqs: [
    {
      question: 'How much does a golf simulator bay cost at LENGOLF?',
      answer:
        'Bay rental is 550–950 THB per hour for the whole bay (not per person), and up to 5 players can share one bay. Weekdays (Mon–Thu) are 550 THB/hour before 2pm and 750 THB/hour after 2pm; Fridays, weekends, and public holidays are 750 THB/hour before 2pm and 950 THB/hour after 2pm. Free standard golf clubs are always included. See the bay rates page for details and monthly packages.',
    },
    {
      question: 'How much do golf lessons cost?',
      answer:
        'Private lessons with our Thailand PGA-certified coaches start at 1,800 THB per hour, with simulator time and clubs included. Multi-hour packages lower the rate (for example 10 hours for 16,000 THB), and new students can book a free trial lesson. See the lessons page or message us on LINE @lengolf.',
    },
    {
      question: 'Do I need to bring my own golf clubs or equipment?',
      answer:
        'No. Free standard club sets for men and ladies are included with every bay booking, so most guests arrive empty-handed. If you want better equipment, premium Callaway and Majesty sets rent from 150 THB per hour; see the golf club rental page.',
    },
    {
      question: 'What should I wear? Do I need golf shoes or a glove?',
      answer:
        "Wear anything comfortable you can swing in: a t-shirt, jeans, and sneakers are perfectly fine. There is no dress code, and you don't need golf shoes or a glove. Golf gloves are available to buy on-site if you'd like one.",
    },
    {
      question: 'Can I walk in, or do I need to book?',
      answer:
        'Walk-ins are welcome whenever a bay is free. Evenings and weekends often sell out, though, so booking ahead at booking.len.golf or on LINE @lengolf is the safest way to guarantee your bay. It takes under a minute.',
    },
    {
      question: "What are LENGOLF's opening hours?",
      answer:
        'We are open 9am to 11pm every day of the week, including weekends and public holidays; there is no weekly closing day. Evenings after 5pm are the busiest, so book ahead for those slots.',
    },
    {
      question: 'How many people can play together? Do you host parties and corporate events?',
      answer:
        'Up to 5 players share one bay at no extra per-person cost, and we have 4 bays in total. For bigger occasions the whole venue hosts private and corporate events for 50+ guests (tournaments, team building, birthdays) with food and drink packages. See the events page for details.',
    },
    {
      question: 'Do you serve food and drinks?',
      answer:
        'Yes. LENGOLF has a full bar with cocktails, beer, and wine, plus a food menu with Smith & Co burgers, pizza, and snacks, all served directly to your bay while you play. See the menu page for dishes and prices.',
    },
    {
      question: 'Are lessons available in English or Thai?',
      answer:
        'Both. Our Thailand PGA-certified coaches teach in English and Thai, including PRO Boss, who studied and competed in the United States. Just tell us your preferred language when you book and we will match you with the right coach.',
    },
    // The directions question is appended at render time from directions.steps
    // (single source for the visible step list and the FAQ/JSON-LD answer).
    {
      question: 'Is there parking at LENGOLF?',
      answer:
        'Yes. Park at The Mercury Ville and you get 3 hours of free parking. The car park entrance is off Ploenchit Road; take the lift or escalators up to the 4th floor and look for Unit 407.',
    },
    {
      question: 'Do I need golf experience to play?',
      answer:
        'Not at all. Around half of our guests are complete beginners. The simulator tracks every shot automatically and our staff will have you hitting balls within a couple of minutes. If you would like structured help, book a free trial lesson with one of our coaches.',
    },
  ],
  faqLinks: {
    'bay rates page': { href: '/golf' },
    'lessons page': { href: '/lessons' },
    'golf club rental page': { href: '/golf-club-rental' },
    'events page': { href: '/events' },
    'menu page': { href: '/menu' },
    'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
    '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  },
  directions: {
    title: 'How to',
    titleSuffix: 'Find Us',
    intro:
      'LENGOLF is inside The Mercury Ville, the mall attached to BTS Chidlom, about 3 minutes from the train platform and entirely under cover.',
    faqQuestion: 'How do I get to LENGOLF from BTS Chidlom?',
    steps: [
      'Ride the BTS to Chidlom station (Sukhumvit Line, one stop east of Siam).',
      'Follow the signs for Exit 4. The skywalk connects the station directly to The Mercury Ville, so you never need to cross the street.',
      'Enter The Mercury Ville and take the escalators or the lift to the 4th floor.',
      'LENGOLF is at Unit 407; look for the green LENGOLF sign. The walk from the platform takes about 3 minutes.',
    ],
    grabTip:
      'Coming by Grab or taxi? Tell the driver "The Mercury Ville, Chidlom" (เดอะ เมอร์คิวรี่ วิลล์ ชิดลม). The drop-off is on Ploenchit Road at the mall entrance.',
    parkingTip:
      'Driving? Park at The Mercury Ville (3 hours free) and take the lift straight up to the 4th floor.',
    mapCta: 'Open in Google Maps',
  },
  browseTitle: 'Browse All',
  browseTitleSuffix: 'Questions',
  browseSubtitle:
    'Deeper answers on renting clubs, learning golf, and planning a golf trip to Thailand.',
  browseBuckets: [
    { label: 'Playing at LENGOLF', categories: ['general', 'pricing', 'events'] },
    { label: 'Golf Club Rental', categories: ['rental', 'clubs-rental'] },
    { label: 'Lessons & Coaching', categories: ['lessons', 'golf-lessons'] },
    {
      label: 'Golf Travel in Thailand',
      categories: [
        'airlines-baggage',
        'packing-preparation',
        'visa-entry',
        'on-the-ground',
        'getting-around',
        'golf-courses',
        'tee-time-booking',
        'golf-in-thailand',
      ],
      catchAll: true,
    },
  ],
  ctaTitle: 'Still have a question?',
  ctaSubtitle:
    'Message us on LINE, give us a call, or just book a bay. We reply fast, in English and Thai.',
}

const th: FaqHubContent = {
  metaTitle: 'คำถามที่พบบ่อย: ราคา การจอง และวิธีเดินทาง',
  metaDescription:
    'รวมคำตอบเรื่องราคา การจอง เช่าไม้กอล์ฟ จัดปาร์ตี้ และวิธีเดินทางจาก BTS ชิดลมทีละขั้นตอน จาก LENGOLF สถานที่กอล์ฟซิมมูเลเตอร์ในร่มที่ The Mercury Ville ชั้น 4 กรุงเทพฯ',
  heroBadge: 'คำถามที่พบบ่อย',
  heroTitle: 'ทุกเรื่องที่อยากรู้ ก่อนมา LENGOLF',
  heroSubtitle:
    'ราคา การจอง ต้องเตรียมอะไรมาบ้าง และเดินทางมาอย่างไร รวมคำถามที่ลูกค้าถามบ่อยที่สุด พร้อมคำตอบครบในหน้าเดียว',
  entityStatement:
    'LENGOLF คือสถานที่กอล์ฟซิมมูเลเตอร์ในร่มที่ The Mercury Ville @ BTS ชิดลม กรุงเทพฯ ตั้งอยู่ที่ชั้น 4 ยูนิต 407 เชื่อมต่อกับสถานีรถไฟฟ้าโดยตรง ภายในมีเบย์ซิมมูเลเตอร์ Bravo Golf จากเกาหลี 4 เบย์ พร้อมบาร์และครัวเต็มรูปแบบ ไม้กอล์ฟให้ยืมฟรี และโค้ชมืออาชีพที่ได้รับการรับรองจาก Thailand PGA เปิดทุกวัน 9:00-23:00 น.',
  stats: [
    { stat: '550 บาท', label: 'ต่อชั่วโมง เริ่มต้น' },
    { stat: '5 คน', label: 'ต่อ 1 เบย์' },
    { stat: '9:00-23:00', label: 'เปิดทุกวัน' },
    { stat: 'ยูนิต 407', label: 'ชั้น 4 Mercury Ville' },
  ],
  faqTitle: 'คำตอบ',
  faqTitleSuffix: 'แบบรวดเร็ว',
  quickFaqs: [
    {
      question: 'ค่าเช่าเบย์กอล์ฟซิมมูเลเตอร์ที่ LENGOLF ราคาเท่าไหร่',
      answer:
        'ค่าเช่าเบย์อยู่ที่ 550-950 บาทต่อชั่วโมง คิดต่อเบย์ ไม่ใช่ต่อคน และเล่นร่วมกันได้สูงสุด 5 คนต่อเบย์ วันจันทร์-พฤหัสฯ ราคา 550 บาท/ชม. ก่อน 14:00 น. และ 750 บาท/ชม. หลัง 14:00 น. ส่วนวันศุกร์-อาทิตย์และวันหยุดนักขัตฤกษ์ ราคา 750 บาท/ชม. ก่อน 14:00 น. และ 950 บาท/ชม. หลัง 14:00 น. มีไม้กอล์ฟมาตรฐานให้ใช้ฟรีทุกการจอง ดูรายละเอียดและแพ็กเกจรายเดือนได้ที่หน้าอัตราค่าบริการเบย์',
    },
    {
      question: 'เรียนกอล์ฟที่ LENGOLF ราคาเท่าไหร่',
      answer:
        'คอร์สเรียนส่วนตัวกับโค้ชที่ได้รับการรับรองจาก Thailand PGA เริ่มต้นที่ 1,800 บาทต่อชั่วโมง รวมค่าเบย์ซิมมูเลเตอร์และไม้กอล์ฟแล้ว แพ็กเกจหลายชั่วโมงคุ้มกว่า เช่น 10 ชั่วโมง 16,000 บาท และนักเรียนใหม่จองทดลองเรียนฟรี 1 ชั่วโมงได้ ดูรายละเอียดที่หน้าคอร์สเรียนกอล์ฟ หรือทักไลน์ @lengolf',
    },
    {
      question: 'ต้องนำไม้กอล์ฟหรืออุปกรณ์มาเองไหม',
      answer:
        'ไม่ต้องนำมาเอง ทุกการจองเบย์มีชุดไม้มาตรฐานทั้งของผู้ชายและผู้หญิงให้ใช้ฟรี ลูกค้าส่วนใหญ่มาตัวเปล่าได้เลย หากต้องการอุปกรณ์ที่ดีขึ้น มีชุดพรีเมียม Callaway และ Majesty ให้เช่าเริ่มต้น 150 บาทต่อชั่วโมง ดูรายละเอียดที่หน้าเช่าไม้กอล์ฟ',
    },
    {
      question: 'ต้องแต่งตัวอย่างไร ต้องมีรองเท้ากอล์ฟหรือถุงมือไหม',
      answer:
        'ใส่ชุดอะไรก็ได้ที่สบายและสวิงได้สะดวก เสื้อยืด กางเกงยีนส์ รองเท้าผ้าใบ ได้ทั้งหมด ไม่มีกฎการแต่งกาย ไม่ต้องใช้รองเท้ากอล์ฟหรือถุงมือ หากต้องการถุงมือ มีจำหน่ายที่ร้าน',
    },
    {
      question: 'เดินเข้ามาเล่นเลยได้ไหม หรือต้องจองล่วงหน้า',
      answer:
        'Walk-in ได้เสมอเมื่อมีเบย์ว่าง แต่ช่วงเย็นและวันหยุดสุดสัปดาห์มักเต็ม การจองล่วงหน้าที่ booking.len.golf หรือทางไลน์ @lengolf จึงเป็นวิธีที่ชัวร์ที่สุด ใช้เวลาจองไม่ถึงนาที',
    },
    {
      question: 'LENGOLF เปิดกี่โมง',
      answer:
        'เปิดทุกวัน 9:00-23:00 น. รวมวันหยุดสุดสัปดาห์และวันหยุดนักขัตฤกษ์ ไม่มีวันหยุดประจำสัปดาห์ ช่วงหลัง 17:00 น. คนเยอะที่สุด แนะนำให้จองล่วงหน้า',
    },
    {
      question: 'มากันหลายคนได้ไหม รับจัดปาร์ตี้หรืออีเวนต์บริษัทหรือเปล่า',
      answer:
        'เล่นร่วมกันได้สูงสุด 5 คนต่อเบย์โดยไม่มีค่าใช้จ่ายเพิ่มต่อคน และเรามีทั้งหมด 4 เบย์ สำหรับงานใหญ่ เรารับจัดอีเวนต์ส่วนตัวและงานบริษัทรองรับ 50+ คน ทั้งทัวร์นาเมนต์ ทีมบิลดิ้ง วันเกิด พร้อมแพ็กเกจอาหารและเครื่องดื่ม ดูรายละเอียดที่หน้าอีเวนต์',
    },
    {
      question: 'มีอาหารและเครื่องดื่มไหม',
      answer:
        'มีครบ LENGOLF มีบาร์เต็มรูปแบบทั้งค็อกเทล เบียร์ ไวน์ พร้อมเมนูอาหารอย่างเบอร์เกอร์ Smith & Co พิซซ่า และของทานเล่น เสิร์ฟถึงเบย์ระหว่างเล่นได้เลย ดูเมนูและราคาที่หน้าเมนูอาหาร',
    },
    {
      question: 'มีสอนกอล์ฟเป็นภาษาอังกฤษหรือภาษาไทยไหม',
      answer:
        'มีทั้งสองภาษา โค้ชของเราทุกคนได้รับการรับรองจาก Thailand PGA สอนได้ทั้งภาษาไทยและภาษาอังกฤษ รวมถึงโปรบอส (PRO Boss) ที่เคยเรียนและแข่งขันที่สหรัฐอเมริกา แจ้งภาษาที่สะดวกตอนจองได้เลย เราจะจัดโค้ชที่เหมาะสมให้',
    },
    {
      question: 'ที่ LENGOLF มีที่จอดรถไหม',
      answer:
        'มี จอดรถที่ The Mercury Ville ได้ฟรี 3 ชั่วโมง ทางเข้าลานจอดรถอยู่ฝั่งถนนเพลินจิต จากนั้นขึ้นลิฟต์หรือบันไดเลื่อนมาที่ชั้น 4 มองหายูนิต 407',
    },
    {
      question: 'ไม่เคยเล่นกอล์ฟมาก่อน เล่นได้ไหม',
      answer:
        'เล่นได้แน่นอน ลูกค้าประมาณครึ่งหนึ่งของเราเป็นมือใหม่ที่ไม่เคยจับไม้กอล์ฟมาก่อน ระบบซิมมูเลเตอร์บันทึกทุกช็อตให้อัตโนมัติ และทีมงานจะช่วยให้เริ่มตีได้ภายในไม่กี่นาที หากอยากเรียนแบบจริงจัง จองทดลองเรียนฟรีกับโค้ชของเราได้',
    },
  ],
  faqLinks: {
    'หน้าอัตราค่าบริการเบย์': { href: '/golf' },
    'หน้าคอร์สเรียนกอล์ฟ': { href: '/lessons' },
    'หน้าเช่าไม้กอล์ฟ': { href: '/golf-club-rental' },
    'หน้าอีเวนต์': { href: '/events' },
    'หน้าเมนูอาหาร': { href: '/menu' },
    'booking.len.golf': { href: 'https://booking.len.golf/', external: true },
    '@lengolf': { href: 'https://lin.ee/uxQpIXn', external: true },
  },
  directions: {
    title: 'วิธีเดินทาง',
    titleSuffix: 'มาหาเรา',
    intro:
      'LENGOLF อยู่ใน The Mercury Ville ห้างที่เชื่อมต่อกับ BTS ชิดลมโดยตรง เดินจากชานชาลาประมาณ 3 นาที มีหลังคาตลอดทาง',
    faqQuestion: 'เดินทางมา LENGOLF จาก BTS ชิดลมอย่างไร',
    steps: [
      'นั่ง BTS สายสุขุมวิทมาลงสถานีชิดลม (ถัดจากสยาม 1 สถานี)',
      'เดินตามป้ายทางออก 4 สกายวอล์กเชื่อมจากสถานีเข้าสู่ The Mercury Ville โดยตรง ไม่ต้องข้ามถนน',
      'เข้าห้าง The Mercury Ville แล้วขึ้นบันไดเลื่อนหรือลิฟต์มาที่ชั้น 4',
      'LENGOLF อยู่ที่ยูนิต 407 มองหาป้าย LENGOLF สีเขียว เดินจากชานชาลาประมาณ 3 นาที',
    ],
    grabTip:
      'หากมาด้วย Grab หรือแท็กซี่ บอกคนขับว่า "เดอะ เมอร์คิวรี่ วิลล์ ชิดลม" จุดจอดรับ-ส่งอยู่บนถนนเพลินจิตหน้าทางเข้าห้าง',
    parkingTip: 'หากขับรถมา จอดที่ The Mercury Ville ได้ฟรี 3 ชั่วโมง แล้วขึ้นลิฟต์มาที่ชั้น 4 ได้เลย',
    mapCta: 'เปิดใน Google Maps',
  },
  browseTitle: 'ดูคำถาม',
  browseTitleSuffix: 'ทั้งหมด',
  browseSubtitle: 'คำตอบเชิงลึกเรื่องการเช่าไม้กอล์ฟ การเรียนกอล์ฟ และการวางแผนทริปกอล์ฟในประเทศไทย',
  browseBuckets: [
    { label: 'เล่นกอล์ฟที่ LENGOLF', categories: ['general', 'pricing', 'events'] },
    { label: 'เช่าไม้กอล์ฟ', categories: ['rental', 'clubs-rental'] },
    { label: 'เรียนกอล์ฟ', categories: ['lessons', 'golf-lessons'] },
    {
      label: 'ทริปกอล์ฟในประเทศไทย',
      categories: [
        'airlines-baggage',
        'packing-preparation',
        'visa-entry',
        'on-the-ground',
        'getting-around',
        'golf-courses',
        'tee-time-booking',
        'golf-in-thailand',
      ],
      catchAll: true,
    },
  ],
  ctaTitle: 'ยังมีคำถามอื่นอีกไหม',
  ctaSubtitle: 'ทักไลน์ โทรหาเรา หรือจองเบย์ได้เลย เราตอบเร็วทั้งภาษาไทยและภาษาอังกฤษ',
}

const CONTENT: Record<string, FaqHubContent> = { en, th }

/**
 * Content for `locale`, falling back to English. The fallback only renders at
 * build time for ja/ko/zh — the middleware 301s those URLs to /faq/ at request
 * time because they are not registered in lib/translated-routes.ts. To launch
 * the hub in another locale: add its content block to CONTENT above AND
 * register "/faq" in that locale's staticRoutes (lib/translated-routes.ts) —
 * the registry, not this file, drives hreflang and the middleware.
 */
export function getFaqHubContent(locale: string): FaqHubContent {
  return CONTENT[locale] ?? CONTENT.en
}
