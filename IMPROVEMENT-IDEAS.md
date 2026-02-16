# LENGOLF Website — Improvement Ideas

> Full-site audit conducted 2026-02-16 across all pages (home, golf, lessons, events, about-us, golf-club-rental, blog, blog posts, location pages) and shared infrastructure.

---

## HIGH PRIORITY — SEO & Discoverability

### 1. Add Person JSON-LD schema for coaches
- **Pages:** lessons, about-us, location/lessons template
- **Details:** 3 PGA coaches have names, credentials, achievements in `data/coaches.ts` but zero schema markup. Add `Person` schema with `hasCredential`, `knowsAbout`, `affiliation` for each coach.
- **Impact:** Major local SEO signal for "golf coach Bangkok" queries, knowledge panel eligibility.
- **Files:** `lib/jsonld.ts`, `app/[locale]/lessons/page.tsx`, `data/coaches.ts`

### 2. Add EventVenue JSON-LD schema
- **Pages:** events
- **Details:** Venue capacity (50+), amenities (8 items), accessibility info — none in structured data. Add `EventVenue` schema with `maximumAttendeeCapacity`, `amenityFeature`, `containsPlace`.
- **Impact:** Critical for event planner searches and Google rich results.
- **Files:** `lib/jsonld.ts`, `app/[locale]/events/page.tsx`

### 3. Add Organization JSON-LD to about-us
- **Pages:** about-us
- **Details:** `foundingDate`, `numberOfEmployees`, `founder` info exists in content but no Organization schema. Add alongside existing FAQ/Breadcrumb/AggregateRating schemas.
- **Impact:** Helps Knowledge Graph, branded search visibility.
- **Files:** `lib/jsonld.ts`, `app/[locale]/about-us/page.tsx`

### 4. Sitemap hreflang for blog + location pages
- **Pages:** sitemap.ts
- **Details:** Blog posts and 84 location pages only have EN URLs in sitemap — missing `/th/` alternates entirely. Need to add `alternates.languages` with both `en` and `th` variants.
- **Impact:** Thai versions of these pages may not be indexed properly.
- **Files:** `app/sitemap.ts`

### 5. Add `inLanguage` and `wordCount` to Article schema
- **Pages:** blog/[slug]
- **Details:** Article JSON-LD missing `inLanguage`, `articleSection`, `wordCount`, `mainEntityOfPage`. Easy additions to existing schema.
- **Impact:** Richer SERP display, better content understanding by crawlers.
- **Files:** `lib/jsonld.ts` (getArticleJsonLd or inline in blog post page)

### 6. sr-only stat chips on all pages
- **Pages:** home, golf, lessons, events, about-us, club-rental
- **Details:** 6 pages have visual stat chips (e.g., "4 bays", "3 PGA coaches", "100+ courses") with no sr-only equivalent. Golf page pioneered sr-only tables but this pattern wasn't applied to stat sections. Add `<dl>`/`<dt>`/`<dd>` or sr-only summary paragraph.
- **Impact:** Crawler/LLM discoverability of key business facts.
- **Files:** All 6 page files

---

## HIGH PRIORITY — Accessibility

### 7. StarRating component missing aria-label
- **Pages:** home, about-us
- **Details:** `StarRating` in `components/shared/StarRating.tsx` renders SVG stars with zero accessible text. Screen readers can't determine rating value. WCAG 1.1.1 failure.
- **Fix:** Add `aria-label={`Rated ${rating} out of 5 stars`}` to wrapper div, or sr-only span.
- **Files:** `components/shared/StarRating.tsx`

### 8. SVG icons site-wide missing accessible names
- **Pages:** all pages
- **Details:** Inline SVGs for LINE chat, external links, arrows, stat icons have no `<title>` or `aria-label`. Dozens of instances across all pages.
- **Fix:** Add `aria-hidden="true"` for decorative icons (when adjacent text provides context), or `aria-label` for functional icons.
- **Files:** Multiple page files, `components/layout/Header.tsx`, `components/layout/Footer.tsx`

### 9. Hero video missing aria-label
- **Pages:** home
- **Details:** Autoplay `<video>` element in home hero has no `aria-label`, `title`, or descriptive text for screen readers.
- **Files:** `app/[locale]/page.tsx`

### 10. ImageGallery lightbox lacks keyboard nav
- **Pages:** events, lessons, home, golf-club-rental (all gallery pages)
- **Details:** No arrow key support for prev/next, no Escape to close lightbox. Keyboard-only users are stuck.
- **Fix:** Add `keydown` event listener for ArrowLeft, ArrowRight, Escape.
- **Files:** `components/shared/ImageGallery.tsx`

### 11. Form error handling is silent
- **Pages:** about-us (ContactForm), events (EventInquiryForm)
- **Details:** Both forms catch errors silently — user gets no feedback on submission failure. Also missing `role="alert"` and `aria-live="polite"` on success message.
- **Fix:** Add error state, display error message with `role="alert"`, add `aria-live` to success div.
- **Files:** `components/about/ContactForm.tsx`, `components/events/EventInquiryForm.tsx`

### 12. Semantic `<time>` elements for dates
- **Pages:** blog/[slug], location pages
- **Details:** Dates rendered as `<span>` instead of `<time dateTime="...">`. Applies to blog post published date and location BTS travel time.
- **Files:** `app/[locale]/blog/[slug]/page.tsx`, `app/[locale]/location/[slug]/page.tsx`

---

## MEDIUM PRIORITY — Content & Conversion

### 13. About-us page severely lacks visual content
- **Pages:** about-us
- **Details:** Only 1 hero image for entire page. No venue gallery, no team photos, no coach bios. Weakest page visually. Home page has `ImageGallery` component — about-us should too.
- **Suggestion:** Add venue photo gallery (bays, bar, food, putting green) and team/coach section.
- **Files:** `app/[locale]/about-us/page.tsx`

### 14. No testimonials on events page
- **Pages:** events
- **Details:** Social proof section shows "30+ events, 500+ guests" stats and client logos but zero actual quotes or reviews. 72% of consumers trust recommendations over ads.
- **Suggestion:** Add 2-3 testimonial blockquotes with company attribution.
- **Files:** `app/[locale]/events/page.tsx`

### 15. No testimonials on lessons page
- **Pages:** lessons
- **Details:** 14 student gallery photos but zero quotes or success stories. No social proof text.
- **Suggestion:** Add "Student Success Stories" section with quotes, improvement metrics.
- **Files:** `app/[locale]/lessons/page.tsx`

### 16. About-us missing team/coach bios
- **Pages:** about-us
- **Details:** "3 PGA coaches" stat shown but no names, photos, or credentials. Lessons page has full coach data — about-us should at least introduce them with links to lessons page.
- **Files:** `app/[locale]/about-us/page.tsx`

### 17. Location pages: unused `gallery_images` and `featured_image` fields
- **Pages:** location/[slug]
- **Details:** DB has `gallery_images` and `featured_image` fields, but template renders only a CSS gradient hero. Gallery images are never rendered. Significant missed content opportunity across 84 pages.
- **Files:** `app/[locale]/location/[slug]/page.tsx`, `lib/locations.ts`

### 18. Location pages missing FAQ sections
- **Pages:** location/[slug]
- **Details:** Every other page type has FAQ — 84 location pages have none. Could add location-specific FAQs like "How long from {location}?", "What are nearby parking options?"
- **Files:** `app/[locale]/location/[slug]/page.tsx`, location template components

### 19. Blog listing needs pagination
- **Pages:** blog
- **Details:** `getAllPosts()` returns everything at once. Fine with 24 posts, but won't scale past 50+.
- **Suggestion:** Implement pagination (12 posts per page) or "Load More" button.
- **Files:** `app/[locale]/blog/page.tsx`, `lib/blog.ts`

### 20. Blog posts: no prev/next navigation
- **Pages:** blog/[slug]
- **Details:** Related posts shown but no chronological prev/next links or `<link rel="prev/next">` in metadata.
- **Files:** `app/[locale]/blog/[slug]/page.tsx`

---

## MEDIUM PRIORITY — Internal Linking & Content Depth

### 21. About-us story paragraphs have zero internal links
- **Pages:** about-us
- **Details:** Story mentions "simulators", "PGA coaching", "social atmosphere" but nothing links to /golf, /lessons, /events. Dead-end narrative.
- **Suggestion:** Add contextual links within the two story paragraphs.
- **Files:** `app/[locale]/about-us/page.tsx`, `messages/en.json`, `messages/th.json`

### 22. About-us "Why Choose Us" cards have no links
- **Pages:** about-us
- **Details:** 6 feature cards are text-only dead ends. "State-of-the-Art Simulators" should link to /golf, "Golf Lessons from a Pro" to /lessons.
- **Suggestion:** Add "Learn more" links or make card titles clickable.
- **Files:** `app/[locale]/about-us/page.tsx`

### 23. Home page missing "Latest from Blog" section
- **Pages:** home
- **Details:** No link to /blog in body content (only in nav/footer). 24 blog posts get zero homepage visibility. Could add 3 most recent posts.
- **Files:** `app/[locale]/page.tsx`

### 24. Home page missing location page links
- **Pages:** home
- **Details:** 84 published location pages, zero linked from home. Could add "Serving Bangkok" section with area links (Sukhumvit, Silom, Asok, etc.).
- **Files:** `app/[locale]/page.tsx`

### 25. About-us FAQ could expand from 6 to 8-10
- **Pages:** about-us
- **Details:** Other pages have 8-10 FAQs (golf=10, lessons=9, events=8). About-us has fewest at 6. Could add: "What makes LENGOLF different?", "Are there membership options?", "Can non-golfers visit?"
- **Files:** `messages/en.json`, `messages/th.json`

### 26. Lessons FAQ missing internal page links
- **Pages:** lessons
- **Details:** `faqLinks` only has 3 external links (booking, LINE, Google Maps). No internal links to /golf, /events, /about-us in FAQ answers despite contextual mentions.
- **Files:** `app/[locale]/lessons/page.tsx`

---

## MEDIUM PRIORITY — Performance

### 27. ImageGallery doesn't lazy-load images
- **Pages:** events (22 imgs), lessons (14 imgs), home (8 imgs)
- **Details:** All gallery images load eagerly. Events page alone is ~4.4MB of images. Add `loading="lazy"` to images below first visible row.
- **Files:** `components/shared/ImageGallery.tsx`

### 28. FloorPlanDialog loads full-size image immediately
- **Pages:** events
- **Details:** 1200x900 floor plan image loads even if dialog never opened. Should defer loading until dialog is actually opened.
- **Files:** `components/events/FloorPlanDialog.tsx`

### 29. Instagram embeds missing `preconnect`
- **Pages:** events
- **Details:** 4 Instagram embeds load external scripts with no resource hints. Add `<link rel="preconnect" href="https://www.instagram.com">` to layout or page head.
- **Files:** `components/events/InstagramEmbed.tsx` or `app/[locale]/layout.tsx`

### 30. Home hero video could use IntersectionObserver
- **Pages:** home
- **Details:** Autoplay video loads full MP4 immediately. Could defer video loading until element is in viewport using IntersectionObserver for better initial page load.
- **Files:** `app/[locale]/page.tsx`

---

## LOW PRIORITY — Polish & Nice-to-Haves

### 31. Add Twitter Card metadata to all pages
- **Pages:** all pages
- **Details:** Only OpenGraph present. No `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`. Add to `generateMetadata` on each page or in layout defaults.
- **Files:** All page files or `app/[locale]/layout.tsx`

### 32. BackToTop button missing focus ring
- **Pages:** blog/[slug]
- **Details:** No `focus-visible` outline for keyboard users. Add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`.
- **Files:** `components/blog/BackToTop.tsx`

### 33. Blog post inline images lack `<figure>`/`<figcaption>`
- **Pages:** blog/[slug]
- **Details:** Migrated HTML content likely has bare `<img>` tags without semantic wrappers. Would need to be fixed in migration script or post-processing.
- **Files:** `scripts/migrate-blog-posts.ts` or content in Supabase

### 34. Club rental: second-hand image/alt mismatch
- **Pages:** golf-club-rental
- **Details:** Alt says "second-hand golf clubs available for purchase" but image source is `venue-simulator-01.jpg` (generic venue photo). Either get dedicated photo or fix alt to match image.
- **Files:** `app/[locale]/golf-club-rental/page.tsx`

### 35. Add `<dl>` semantic markup to stat chips
- **Pages:** all pages with stats
- **Details:** Currently plain divs. `<dl><dt><dd>` would be more semantic and help screen readers understand the value/label relationship.
- **Files:** All 6 page files with stat chips

### 36. Events amenity #8 is a CTA, not an amenity
- **Pages:** events
- **Details:** "Contact our events team to learn more" listed as one of 8 amenities — should be a separate CTA below the amenities grid.
- **Files:** `app/[locale]/events/page.tsx`, `messages/en.json`, `messages/th.json`

### 37. Inline `style={{ color: '#007429' }}` repeated everywhere
- **Pages:** all pages
- **Details:** ~15+ instances per page of `style={{ color: '#007429' }}`. Could be a Tailwind utility class like `text-cta-green` for cleaner code and better caching.
- **Files:** `tailwind.config.ts`, all page files

### 38. ReviewCard component duplicated between home and about-us
- **Pages:** home, about-us
- **Details:** Same ReviewCard pattern exists in both page files. Should be extracted to `components/shared/ReviewCard.tsx`.
- **Files:** `app/[locale]/page.tsx`, `app/[locale]/about-us/page.tsx`

### 39. About-us "Why Choose Us" cards lack images
- **Pages:** about-us
- **Details:** Text-only cards while golf page has image+text horizontal cards. Could add venue/feature images to make the section more engaging.
- **Files:** `app/[locale]/about-us/page.tsx`

### 40. Blog listing: no reading time in post cards
- **Pages:** blog
- **Details:** Reading time shown on individual blog post pages but not in listing preview cards. Could add "{X} min read" badge.
- **Files:** `app/[locale]/blog/page.tsx`

---

## INFRASTRUCTURE

### 41. SITE_URL is `www.len.golf` but should be `len.golf` *(CRITICAL)*
- **Details:** `lib/constants.ts:2` defines `SITE_URL = 'https://www.len.golf'` but the canonical domain is the bare domain `https://len.golf`. Every canonical URL, sitemap entry, OG tag, and JSON-LD schema uses the wrong domain.
- **Impact:** Potential duplicate content issues, canonical confusion for search engines.
- **Files:** `lib/constants.ts`

### 42. Add security headers to next.config
- **Details:** No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Strict-Transport-Security, or Permissions-Policy configured. Only cache-control headers exist.
- **Files:** `next.config.js` (headers function)

### 43. OG locale hardcoded to `en_US` in root layout
- **Details:** `app/[locale]/layout.tsx:43` has `locale: 'en_US'` — should be dynamic based on actual locale. Thai pages incorrectly report `en_US`.
- **Files:** `app/[locale]/layout.tsx`

### 44. LocalBusiness JSON-LD missing fields
- **Details:** No `description`, `hasMap`, `paymentAccepted`, `currenciesAccepted`. `sameAs` array missing LINE URL (only has Facebook and Instagram).
- **Files:** `lib/jsonld.ts` (getLocalBusinessJsonLd)

### 45. Sitemap `lastModified` always `new Date()`
- **Details:** All pages (including blog posts) show "modified today" instead of actual dates. Blog posts should use `published_at` from database.
- **Files:** `app/sitemap.ts`

### 46. Mobile menu missing `aria-expanded` state
- **Details:** Header mobile menu button has no `aria-expanded` attribute toggling between true/false. Also no focus trap in the mobile overlay menu.
- **Files:** `components/layout/Header.tsx`

### 47. Missing web app manifest
- **Details:** No `app/manifest.ts` or `manifest.json`. Prevents add-to-homescreen on mobile, no theme color for browser UI, no PWA capability.
- **Files:** New file: `app/manifest.ts`

---

## Quick Reference — Files Most Affected

| File | Items |
|------|-------|
| `lib/jsonld.ts` | 1, 2, 3, 5, 44 |
| `app/[locale]/about-us/page.tsx` | 6, 13, 16, 21, 22, 25, 38, 39 |
| `app/[locale]/events/page.tsx` | 2, 6, 14, 28, 36 |
| `app/[locale]/lessons/page.tsx` | 1, 6, 15, 26 |
| `app/[locale]/page.tsx` | 6, 9, 23, 24, 30, 38 |
| `app/[locale]/location/[slug]/page.tsx` | 12, 17, 18 |
| `app/[locale]/blog/page.tsx` | 19, 40 |
| `app/[locale]/blog/[slug]/page.tsx` | 5, 12, 20, 32 |
| `app/[locale]/golf-club-rental/page.tsx` | 6, 34 |
| `components/shared/ImageGallery.tsx` | 10, 27 |
| `components/shared/StarRating.tsx` | 7 |
| `app/sitemap.ts` | 4, 45 |
| `lib/constants.ts` | 41 |
| `next.config.js` | 42 |
| `app/[locale]/layout.tsx` | 31, 43 |
| `components/layout/Header.tsx` | 8, 46 |
| `messages/en.json` + `messages/th.json` | 25, 36 |
