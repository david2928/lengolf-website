/**
 * Price tiers for the /golf-courses/under-[price]-baht/ pages.
 *
 * Tier values are weekday green fee ceilings in THB. The "framing" copy is
 * shown as the page intro — kept honest and specific so each tier reads
 * as a different page (not just five copies of the same template).
 */
export interface PriceTier {
  thb: number
  slug: string
  title: string
  framing: string
  catch: string
}

export const PRICE_TIERS: readonly PriceTier[] = [
  {
    thb: 1500,
    slug: 'under-1500-baht',
    title: 'Best Bangkok-Area Golf Courses Under ฿1,500',
    framing:
      'At the very low end of the Thai green-fee market. These rounds are typically at older municipal or government layouts (EGAT power-plant courses, military clubs) where a foreign visitor can play 18 holes for the price of a buffet brunch.',
    catch:
      'Expect basic clubhouse facilities, no driving range at most venues, and conditioning that varies sharply with rainfall. Golf carts may not be available; many of these courses are walking-only.',
  },
  {
    thb: 2500,
    slug: 'under-2500-baht',
    title: 'Best Bangkok-Area Golf Courses Under ฿2,500',
    framing:
      'Honest mid-budget golf within 90 minutes of central Bangkok. Most courses in this band are 15+ years old and run by the same ownership group that built them, with weekday rates aimed at the Thai retail golfer rather than the inbound tourist.',
    catch:
      'Booking is often phone-only, with limited English on the line. Conditioning is solid in the dry season but green speeds vary. Caddies and carts are usually mandatory and bundled in.',
  },
  {
    thb: 3500,
    slug: 'under-3500-baht',
    title: 'Best Bangkok-Area Golf Courses Under ฿3,500',
    framing:
      'The sweet spot for the budget-conscious visiting golfer — modern layouts within an hour of Bangkok at a price most international markets would consider impossibly low for an 18-hole round with caddie and cart.',
    catch:
      'Weekend rates often jump 30–40%, so this tier is most useful for weekday play. Some venues at the top of the band introduce caddie tipping conventions that quietly add 300–500 THB to the published green fee.',
  },
  {
    thb: 5000,
    slug: 'under-5000-baht',
    title: 'Best Bangkok-Area Golf Courses Under ฿5,000',
    framing:
      'Premium daily-fee golf without crossing into trophy-course territory. This band covers the better Bangkok-region courses that international tour groups regularly use — well-conditioned, tournament-ready, and book-able online in English.',
    catch:
      'Several courses in this range are popular enough that weekday tee times need 3–7 days’ advance booking. Caddie etiquette is more formal; expect uniformed caddies and structured tipping at the end of the round.',
  },
  {
    thb: 7500,
    slug: 'under-7500-baht',
    title: 'Best Bangkok-Area Golf Courses Under ฿7,500',
    framing:
      'The top end of the visiting-tourist market. Trophy courses here include all-inclusive premium experiences (Nikanti), former Asian Tour venues, and the marquee Schmidt-Curley and Nicklaus designs that put Thailand on the world golf map.',
    catch:
      'Weekend rates frequently exceed the headline tier on these courses; if your trip dates are flexible, weekday play is dramatically better value. Dress codes are enforced and online booking through the course’s own site is usually cheapest.',
  },
] as const

export const PRICE_TIER_SLUGS = PRICE_TIERS.map((t) => t.slug)
