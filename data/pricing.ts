import { storageUrl } from '@/lib/constants'

export interface LessonPackage {
  name: string
  oneGolfer: string
  twoGolfers: string
  threeToFiveGolfers: string
  remark: string
}

export const lessonPricing: LessonPackage[] = [
  { name: '1 Hour', oneGolfer: '1,800 THB', twoGolfers: '2,400 THB', threeToFiveGolfers: '2,900 THB', remark: '-' },
  { name: '5 Hour', oneGolfer: '8,500 THB', twoGolfers: '11,000 THB', threeToFiveGolfers: '13,650 THB', remark: 'Valid for 6 months' },
  { name: '10 Hour', oneGolfer: '16,000 THB', twoGolfers: '20,500 THB', threeToFiveGolfers: '25,500 THB', remark: 'Valid for 12 months' },
  { name: '20 Hour', oneGolfer: '31,000 THB', twoGolfers: '39,000 THB', threeToFiveGolfers: '49,000 THB', remark: 'Valid for 24 months' },
  { name: '30 Hour', oneGolfer: '45,000 THB', twoGolfers: '57,000 THB', threeToFiveGolfers: '72,000 THB', remark: 'Valid for 24 months' },
  { name: '50 Hour', oneGolfer: '72,000 THB', twoGolfers: '92,500 THB', threeToFiveGolfers: '117,500 THB', remark: 'Valid for 24 months' },
  { name: 'Starter Package*', oneGolfer: '11,000 THB', twoGolfers: '13,500 THB', threeToFiveGolfers: '-', remark: 'Valid for 6 months & Free 1 golf glove/golfer' },
  { name: 'Sim to Fairway*', oneGolfer: '13,499 THB', twoGolfers: '-', threeToFiveGolfers: '-', remark: 'On courses fee for both student and coach must be covered by the customer' },
]

export const lessonNotes = [
  '*Starter Package: 5 Hrs Coaching + 5 Hrs Practice',
  '*Sim to Fairway: 5 Hrs Coaching + 1 On-course Lesson',
  '*Golf Simulator Usage included in all Lesson Packages',
]

export const services = [
  { title: 'Golf', image: storageUrl('venue/venue-simulator-01.jpg'), href: '/golf' },
  { title: 'Food & Drinks', image: storageUrl('menus/food-drinks-cover.jpg'), href: storageUrl('menus/food-drink-menu.png') },
  { title: 'Lessons', image: storageUrl('lessons/lessons-cover.jpg'), href: '/lessons' },
  { title: 'Events', image: storageUrl('events/events-cover.jpg'), href: '/events' },
]

export const amenities = [
  'Full site rental',
  '50+ Pack event space',
  'Full bar',
  'Customizable catering packages',
  '4 simulator bays',
  'Free club usage',
  'Large putting green',
  'Contact our events team to learn more',
]

export const eventTypes = [
  { title: 'Corporate events', icon: storageUrl('icons/icon-corporate.png') },
  { title: 'Company parties', icon: storageUrl('icons/icon-party.png') },
  { title: 'Team building', icon: storageUrl('icons/icon-team-building.png') },
  { title: 'Meet & Greets', icon: storageUrl('icons/icon-meet-greet.png') },
  { title: 'Birthdays or Special celebrations', icon: storageUrl('icons/icon-birthday.png') },
  { title: 'Filming & Photoshoots', icon: storageUrl('icons/icon-filming.png') },
]

// ── Event Packages ──

export interface EventPackage {
  name: string
  guests: string
  bays: string
  duration: string
  beers: string
  cocktails: string
  softDrinks: string
  food: string[]
  caterer: string
  price: string
  exclusive: boolean
}

export const eventPackages: EventPackage[] = [
  {
    name: 'Small Package',
    guests: '10–15 people',
    bays: '2 Golf Bays',
    duration: '3 Hours',
    beers: '10 Beers (Singha or Asahi)',
    cocktails: '5 Cocktails',
    softDrinks: 'Unlimited Soft Drinks',
    food: ['1 Calamari', '1 French Fries', '3 Burgers', '2 Toast', 'Crab or Shrimp Ebiko', '2 Sliders', 'Crispy Chicken & BBQ Brisket', '1 Salad'],
    caterer: 'Smith & Co.',
    price: '9,999 THB',
    exclusive: false,
  },
  {
    name: 'Medium Package',
    guests: '15–25 people',
    bays: '4 Golf Bays',
    duration: '3 Hours',
    beers: '20 Beers (Singha or Asahi)',
    cocktails: '10 Cocktails',
    softDrinks: 'Unlimited Soft Drinks',
    food: ['2 Calamari', '2 French Fries', '3 Large Pizzas', '4 Toast', 'Crab or Shrimp Ebiko', '4 Sliders', 'Crispy Chicken & BBQ Brisket', '2 Salads'],
    caterer: 'Smith & Co. & Pizza Mania',
    price: '21,999 THB',
    exclusive: true,
  },
]

export const eventPackageNotes = [
  'Food options can be fully customized to suit your preferences and event needs',
  'Medium Package includes exclusive full-location rental',
]

// ── Events FAQs ──

export const eventsFaqItems = [
  {
    question: 'How many people can LENGOLF accommodate for events?',
    answer: 'Our venue can comfortably host events for up to 50+ guests. We have 4 golf simulator bays, a full bar area, and flexible seating arrangements that can be configured to suit your event layout.',
  },
  {
    question: 'What event packages do you offer?',
    answer: 'We offer two main packages: the Small Package (9,999 THB) for 10–15 guests with 2 golf bays, and the Medium Package (21,999 THB) for 15–25 guests with all 4 golf bays and exclusive full-location rental. Both include 3 hours, beer, cocktails, unlimited soft drinks, and a catered food spread.',
  },
  {
    question: 'Can I customize the food and drinks for my event?',
    answer: 'Absolutely! Our standard packages include curated food platters from Smith & Co. (and Pizza Mania for the Medium Package), but all food and drink options can be fully customized to suit your preferences, dietary requirements, and event theme. We also offer add-ons like sound system and DJ packages for a complete party experience.',
  },
  {
    question: 'What types of events can you host?',
    answer: 'We host corporate events, company parties, team building activities, meet & greets, birthdays, special celebrations, and filming or photoshoots. Our venue is versatile enough for both professional and social occasions.',
  },
  {
    question: 'How do I book an event at LENGOLF?',
    answer: 'Fill out the inquiry form on this page, or contact us directly on LINE @lengolf. Our events team will get back to you to discuss your requirements, customize your package, and confirm your booking.',
  },
  {
    question: 'Where is LENGOLF located?',
    answer: 'We\'re located on the 4th floor of The Mercury Ville at BTS Chidlom, 540 Ploenchit Road, Lumpini, Pathumwan, Bangkok 10330. We\'re directly accessible from the BTS Chidlom Skytrain station. See us on Google Maps.',
  },
  {
    question: 'Do guests need golf experience?',
    answer: 'Not at all! Our simulators are fun for everyone, from complete beginners to experienced golfers. We offer games like closest to the pin and longest drive that anyone can enjoy. Our golf pros can also provide mini-lessons and tips during your event.',
  },
  {
    question: 'Can I get a custom event package?',
    answer: 'Yes! Beyond our Small and Medium packages, we can create fully custom packages for larger groups, longer durations, or specific requirements. Add-ons include additional catering options, sound system and DJ setup, custom decorations, and more. Contact our events team on LINE @lengolf to discuss your needs.',
  },
]

// ── Bay Rates ──

export interface BayRateRow {
  timeSlot: string
  weekday: string
  weekend: string
}

export const bayRates: BayRateRow[] = [
  { timeSlot: 'Before 14:00', weekday: '500 THB', weekend: '700 THB' },
  { timeSlot: '14:00 – 17:00', weekday: '700 THB', weekend: '900 THB' },
  { timeSlot: '17:00 – 23:00 (Promo)', weekday: '700 THB', weekend: '900 THB' },
]

export const bayRateNotes = [
  'Price per hour, per bay (up to 5 players)',
  'Weekday = Mon–Thu, Weekend = Fri–Sun & Public Holidays',
  'Open daily 10:00 – 23:00',
  'Free golf club rental included',
]

// ── Monthly Packages ──

export interface MonthlyPackageRow {
  name: string
  hours: string
  validity: string
  perks: string
  price: string
}

export const monthlyPackages: MonthlyPackageRow[] = [
  { name: 'Early Bird*', hours: '10', validity: '6 months', perks: '—', price: '4,800 THB' },
  { name: 'Early Bird+*', hours: 'Unlimited', validity: '1 month', perks: '5% Off F&D', price: '5,000 THB' },
  { name: 'Bronze', hours: '5', validity: '1 month', perks: '—', price: '3,000 THB' },
  { name: 'Silver', hours: '15', validity: '3 months', perks: '5% Off F&D', price: '8,000 THB' },
  { name: 'Gold', hours: '30', validity: '6 months', perks: '10% Off F&D', price: '14,000 THB' },
  { name: 'Diamond', hours: 'Unlimited', validity: '1 month', perks: '5% Off F&D', price: '8,000 THB' },
  { name: 'Diamond+', hours: 'Unlimited', validity: '3 months', perks: '10% Off F&D', price: '18,000 THB' },
]

export const monthlyPackageNotes = [
  '*Early Bird packages can only be used before 14:00',
]

// ── Golf Page FAQs ──

export const golfFaqItems = [
  {
    question: 'How much does it cost to play at LENGOLF?',
    answer: 'Our simulator bays start at 500 THB per hour on weekdays (Mon–Thu) before 14:00, and go up to 900 THB per hour on weekends (Fri–Sun & public holidays) after 14:00. Each bay holds up to 5 players, and standard golf club rental is included at no extra charge.',
  },
  {
    question: 'Do I need to bring my own golf clubs?',
    answer: 'No, standard club sets are provided free with every bay rental, including ladies\' sets. We also offer premium club rentals — Callaway Warbird (men\'s) and Majesty Shuttle (women\'s) — starting at 150 THB per hour. Premium clubs can be used in-house or taken to any golf course in Bangkok. You\'re always welcome to bring your own clubs too.',
  },
  {
    question: 'How many people can play per bay?',
    answer: 'Each simulator bay comfortably fits up to 5 players. The hourly rate is per bay, not per person, making it great value for groups.',
  },
  {
    question: 'What are your opening hours?',
    answer: 'LENGOLF is open daily from 10:00 AM to 11:00 PM, Monday through Sunday, including public holidays.',
  },
  {
    question: 'What golf courses can I play on the simulator?',
    answer: 'Our Korean Bravo Golf simulators feature over 100 championship courses, including world-famous venues like Pebble Beach and TPC Sawgrass, all rendered in high-definition graphics.',
  },
  {
    question: 'How do I book a bay?',
    answer: 'You can book online at booking.len.golf or add us on LINE @lengolf to reserve your bay. Walk-ins are also welcome, subject to availability.',
  },
  {
    question: 'Where is LENGOLF located?',
    answer: 'We\'re located on the 4th floor of The Mercury Ville at BTS Chidlom, 540 Ploenchit Road, Lumpini, Pathumwan, Bangkok 10330. We\'re directly accessible from the BTS Chidlom Skytrain station. See us on Google Maps.',
  },
  {
    question: 'What monthly packages do you offer?',
    answer: 'We offer 7 monthly packages ranging from 3,000 THB (Bronze, 5 hours) to 18,000 THB (Diamond+, unlimited hours for 3 months). Packages include perks like food & drink discounts. We also have Early Bird packages starting at 4,800 THB for use before 14:00.',
  },
  {
    question: 'Do you offer golf lessons?',
    answer: 'Yes, we have three Thailand PGA-certified professional coaches on staff — PRO Boss, PRO Ratchavin, and PRO Min. They offer personalized instruction for all skill levels, from beginners to advanced players, including junior golf development. Lessons use our simulators for swing analysis and data-driven improvement. Visit our lessons page for details.',
  },
  {
    question: 'How much do golf lessons cost?',
    answer: 'Lesson packages start at 1,800 THB for a 1-hour session (1 golfer). Multi-hour packages offer better value: 10 hours for 16,000 THB (valid 12 months) or 30 hours for 45,000 THB (valid 24 months). We also have a Starter Package at 11,000 THB which includes 5 hours of coaching plus 5 hours of practice. Golf simulator usage is included in all lesson packages.',
  },
]

// ── Tournament FAQs ──

export const faqItems = [
  {
    question: 'HOW DO I JOIN?',
    answer: 'Add us on LINE @lengolf and let us know when you\'d like to play your qualification round.',
  },
  {
    question: 'HOW DOES THE QUALIFICATION ROUND WORK?',
    answer: 'The qualification phase runs until 26th October. All registered pairs will play 18 holes on a course selected by LENGOLF, with their score determined by the Stableford system and the best ball format (the best score on each hole). The 8 teams with the highest scores will automatically qualify for the finals, and 4 additional teams will be randomly selected to join, playing with a handicap.',
  },
  {
    question: "WHAT'S THE STABLEFORD SYSTEM?",
    answer: 'The Stableford system is a points-based scoring method in golf. Instead of counting the total number of strokes, you earn points based on how you perform on each hole compared to par. Birdie: 3 points, Par: 2 points, Bogey: 1 point, Double bogey or worse: 0 points, Eagle: 4 points. The goal is to earn as many points as possible across all 18 holes.',
  },
  {
    question: 'HOW DOES HANDICAP SYSTEM WORK?',
    answer: "For the finals, we'll compare the scores of the randomly selected teams with the average score of the qualifying finalists. Based on this comparison, we'll assign a number of extra strokes (handicap) to the random teams to give them a fair chance in the competition.",
  },
  {
    question: 'DO I NEED TO BRING GOLF CLUBS?',
    answer: "No, we've got you covered with full sets, including ladies' sets. However, you are welcome to bring your own clubs if you prefer.",
  },
  {
    question: 'HOW DO I KEEP TRACK OF THE SCORE?',
    answer: 'Our staff will handle all scorekeeping for you.',
  },
  {
    question: 'HOW ARE THE FINALS PLAYED OUT?',
    answer: 'The finals will feature the 8 best-qualified teams and 4 randomly selected teams. Round 1: 9-hole knockout (scramble format). Round 2: 9 holes (best ball format). Final Round: 9-hole scramble to decide the winner.',
  },
]
