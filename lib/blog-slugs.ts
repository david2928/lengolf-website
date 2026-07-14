/**
 * Legacy WordPress blog post slugs that lived at root level.
 * These are now redirected to /blog/{slug}/ via next.config.js
 * and excluded from locale handling in middleware.ts
 */
export const LEGACY_BLOG_SLUGS = [
  'bangkok-golf-centre-vs-lengolf',
  'bangkok-rainy-season-indoor-golf',
  'corporate-team-building-bangkok-golf-simulator',
  'couple-activities-in-bangkok',
  'exploring-bangkok-with-kids',
  'exploring-golf-in-bangkok',
  'fairway-golf-city-club-vs-lengolf',
  'finding-your-perfect-bangkok-retreat',
  'first-time-golf-simulator-beginners-guide',
  'fix-your-golf-swing-bangkok',
  'fun-activities-in-bangkok',
  'fun-activities-in-bangkok-2',
  'golf-lessons-in-bangkok',
  'golf-point-center-vs-lengolf',
  'golf-simulator-in-bangkok',
  'guide-to-the-best-driving-ranges-in-bangkok',
  'learn-to-golf-here-in-bangkok',
  'lengolf-and-front9-bangkoks-premier-indoor-golf-venues',
  'mastering-the-golf-driving-range',
  'planning-the-perfect-thailand-retreat',
  'plan-your-family-trip-to-bangkok',
  'romantic-things-to-do-in-bangkok-for-couples',
  'setting-up-and-maintaining-an-indoor-golf-course',
  'skygolf-club-vs-lengolf',
  'topgolf-bangkok-vs-lengolf',
  'ultimate-guide-to-golf-courses-in-bangkok',
  'what-to-do-in-bangkok',
] as const
