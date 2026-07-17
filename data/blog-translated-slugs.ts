/**
 * Per-locale list of blog slugs that have a PUBLISHED translation.
 *
 * This mirrors `public.blog_post_translations` (joined to published
 * `blog_posts`) in the Supabase DB. It exists because lib/translated-routes.ts
 * — which is bundled into the edge middleware — needs a slug-accurate answer to
 * "does /blog/<slug> have a <locale> translation?" without importing the DB.
 *
 * This is a PLAIN data module — deliberately NOT `import 'server-only'` and it
 * does NOT import the Supabase client — because lib/translated-routes.ts imports
 * it and that module runs in the edge middleware. Keep it dependency-free, the
 * same way data/golf-courses-i18n.ts stays a plain module for the smoke-test
 * cross-check.
 *
 * DO NOT hand-edit the slug lists. Regenerate from the DB with:
 *   npx tsx scripts/sync-blog-translated-slugs.ts
 * The CI check `npm run validate:blog-slugs` asserts this file matches the DB
 * and fails the build if they drift.
 */
export const BLOG_TRANSLATED_SLUGS: Record<'th' | 'ko' | 'ja' | 'zh', readonly string[]> = {
  th: [],
  ko: [
    'bangkok-rainy-season-indoor-golf',
    'corporate-team-building-bangkok-golf-simulator',
    'couple-activities-in-bangkok',
    'exploring-bangkok-with-kids',
    'first-time-golf-simulator-beginners-guide',
    'golf-lessons-in-bangkok',
    'golf-simulator-in-bangkok',
    'learn-to-golf-here-in-bangkok',
    'what-to-do-in-bangkok',
  ],
  ja: [
    'bangkok-rainy-season-indoor-golf',
    'corporate-team-building-bangkok-golf-simulator',
    'couple-activities-in-bangkok',
    'exploring-bangkok-with-kids',
    'first-time-golf-simulator-beginners-guide',
    'golf-lessons-in-bangkok',
    'golf-simulator-in-bangkok',
    'learn-to-golf-here-in-bangkok',
    'what-to-do-in-bangkok',
  ],
  zh: [
    'bangkok-rainy-season-indoor-golf',
    'corporate-team-building-bangkok-golf-simulator',
    'couple-activities-in-bangkok',
    'exploring-bangkok-with-kids',
    'first-time-golf-simulator-beginners-guide',
    'golf-lessons-in-bangkok',
    'golf-simulator-in-bangkok',
    'learn-to-golf-here-in-bangkok',
    'what-to-do-in-bangkok',
  ],
}
