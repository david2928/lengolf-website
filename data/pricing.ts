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
  '3 simulator bays',
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
