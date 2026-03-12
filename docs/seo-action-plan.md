# SEO Action Plan
**Document:** DOC-07
**Status:** 🟡 In Progress
**Last Updated:** 2026-03-11
**Data Basis:** GSC data Nov 2025 – Feb 2026 (90 days, 92 pages with impressions)

---

## Table of Contents

1. [Status Summary](#1-status-summary)
2. [Priority 1 — Critical: Zero-Click & Broken Pages](#2-priority-1--critical-zero-click--broken-pages)
3. [Priority 2 — High: CTR Optimization (existing pages)](#3-priority-2--high-ctr-optimization-existing-pages)
4. [Priority 3 — Medium: Content Gaps](#4-priority-3--medium-content-gaps)
5. [Priority 4 — Technical SEO](#5-priority-4--technical-seo)
6. [Priority 5 — Indexation & Crawl Health](#6-priority-5--indexation--crawl-health)
7. [Strategic Notes: Internal Linking & LLM Optimization](#7-strategic-notes-internal-linking--llm-optimization)
8. [SEO Expansion Strategy](#8-seo-expansion-strategy)
9. [Monitoring](#9-monitoring)
10. [Baseline & Targets](#10-baseline--targets)

---

## 1. Status Summary

| § | Area | Items | Done | Remaining |
|---|------|-------|------|-----------|
| §2 | Critical 404/zero-click fixes | 8 | 3 | 5 |
| §3 | CTR optimization | 6 | 2 | 4 |
| §4 | New content creation | 3 | 0 | 3 |
| §5 | Technical SEO | 5 | 0 | 5 |
| §6 | Indexation / crawl health | 4 | 0 | 4 |
| §7 | Strategic notes (internal linking, LLM) | — | — | — |
| §8 | Expansion: Phase 1 drafts → publish | 5 waves | 0 | 5 waves |
| §8 | Expansion: Phase 2 new pages | 101 pages | 0 | 101 |
| §8 | Expansion: Phase 3 multi-language | 3 languages | 0 | 3 |

**Completed:**
- ✅ `/lesson/` → `/lessons/` redirect (PR #5, merged)
- ✅ `/th/blog/*` → `/blog/*` redirect for untranslated posts (5xx fix, Feb 21)
- ✅ `/topgolf-bangkok-vs-lengolf/` → 301 to `/blog/topgolf-bangkok-vs-lengolf/` (post exists, good quality)
- ✅ Blog URL duplicates — all root `/{slug}/` paths 301 to `/blog/{slug}/` (GSC will clear old entries over time)

---

## 2. Priority 1 — Critical: Zero-Click & Broken Pages

Pages appearing in search results with significant impressions but **zero clicks**. Each wasted impression = a ranking signal being thrown away.

### 2.1 Food Menu Image

**URL:** `booking.len.golf/images/food_menu.jpg`
**GSC Data (90 days, Dec 2025–Mar 2026):** ~6,700 impressions / ~20 clicks / ~0.3% CTR / position ~2.0 (web search)

> Note: Earlier audit docs cited 9,188 impressions — that figure was likely from a different date range or data pull. The 90-day figure from the live API is ~6,700 across web search.

**What keywords is it ranking for?**

The image URL is appearing in web search results (NOT Google Images) as a sitelink or rich result associated with LENGOLF's Google Business Profile / brand searches. The top queries are all brand/venue searches:

| Keyword | Impressions | Clicks | Position |
|---------|-------------|--------|----------|
| "lengolf" | 5,899 | 8 | 1.9 |
| "len golf" | 304 | 1 | 3.5 |
| "lengolf bangkok" | 161 | 2 | 4.2 |
| "golf simulator bangkok" | 33 | 1 | 1.5 |
| "golf land" | 31 | 0 | 3.6 |
| "driving range bangkok" | 26 | 1 | 1.2 |
| "golf simulator" | 16 | 0 | 1.0 |
| "indoor golf bangkok" | 14 | 1 | 1.2 |
| "golf simulator near me" | 13 | 1 | 1.2 |
| "golf lessons bangkok" | 12 | 0 | 1.2 |

**What's actually happening:** ~88% of impressions are from brand searches for "lengolf". The image file is being surfaced as a thumbnail/image result alongside LENGOLF's branded search results. Nobody is searching for "food menu" and finding this — it's attached to your brand SERP.

**Implication:** The 9,188 impression figure was likely inflated or from a longer window. The problem is real but much smaller than stated. Fixing this won't unlock 180 clicks/month. It's a tidy-up task, not a top priority.

**Actions:**
- [ ] Add redirect in `next.config.js` on `booking.len.golf` (or contact booking system provider):
  ```javascript
  { source: '/images/food_menu.jpg', destination: '/food-and-drinks/', permanent: true }
  ```
- [ ] Note: the redirect needs to be on `booking.len.golf`, not `www.len.golf` — check if you control that subdomain's config
- [ ] If a food/drinks page is built anyway (for UX reasons), link to it from the main nav

---

### 2.2 Golf Simulator in Bangkok

**URL:** `/golf-simulator-in-bangkok/` (and `/blog/golf-simulator-in-bangkok/`)
**GSC Data:** 711 impressions / 0 clicks / position 9.6
**Problem:** Page either 404s or has poor meta. High-value keyword.
**Estimated gain:** +35 clicks/month

- [ ] Confirm whether page 404s or has content (check in browser)
- [ ] If 404: Create `/guide/golf-simulator-in-bangkok/` with:
  - Comparison table of Bangkok venues (LENGOLF, Front9, Fairway, Bangkok Golf Centre)
  - Pricing and technology comparison (Trackman vs Bravo vs SkyTrak)
  - FAQs section
  - Internal links from `/golf/` and `/lessons/`
- [ ] If exists: update title/meta to be more compelling, add comparison table
- [ ] Add FAQ schema markup
- [ ] Submit to GSC for indexing

---

### 2.3 SkyGolf Club vs LENGOLF

**URL:** `/skygolf-club-vs-lengolf/` (and `/blog/skygolf-club-vs-lengolf/`)
**GSC Data:** 440 impressions / 0 clicks / position 9.9
**Problem:** Page 404s or has poor meta. Competitor comparison = high-intent traffic.
**Estimated gain:** +35 clicks/month

- [ ] Confirm whether page 404s or has content
- [ ] If 404: Create `/blog/skygolf-club-vs-lengolf/` comparison post (1,200–1,500 words)
  - Research SkyGolf: location, technology, pricing/hr, bays, food, group size
  - Use `fairway-golf-city-club-vs-lengolf` as structural template
  - Add comparison table
- [ ] If exists: update meta title/description, refresh 2026 pricing, add comparison table if missing
- [ ] Add FAQ + Article schema
- [ ] Submit to GSC

---

### 2.4 Events Page

**URL:** `/events/`
**GSC Data:** 352 impressions / 0 clicks / position 7.7
**Problem:** Page exists but 0% CTR — meta is likely missing or generic.
**Estimated gain:** +10 clicks/month

- [ ] Update title tag:
  ```
  Corporate Events & Team Building Golf | LENGOLF Bangkok
  ```
- [ ] Update meta description (target 155 chars):
  ```
  Host your corporate event at LENGOLF. Indoor golf simulators perfect for team building, parties, and group activities. BTS Chidlom. Book now.
  ```
- [ ] Add Event schema markup

---

### 2.5 TopGolf Bangkok vs LENGOLF ✅

**URL:** `/topgolf-bangkok-vs-lengolf/` → 301 redirects to `/blog/topgolf-bangkok-vs-lengolf/`
**Status:** Done — redirect in place, post exists and is good quality.
**GSC Data:** 91 impressions / 0 clicks / position 21.4

No action needed on structure. If CTR remains low after a few months, consider updating the meta title/description to be more compelling (e.g. lean into "TopGolf doesn't exist in Bangkok — here's the alternative").

---

### 2.6 Blog URL Duplicates (Canonical Issues) ✅

**Status:** Done — all root paths (`/{slug}/`) 301 redirect to `/blog/{slug}/`.

GSC may still show some old root URLs with impressions while it works through re-crawling. No code action needed. If old root URLs are still indexed after 60+ days, submit removal requests in GSC for the specific root-path versions.

---

### 2.7 Location Pages Audit

**GSC Data:** 143 impressions across 7 location URLs, 0 clicks each

| URL | Impressions | Position |
|-----|-------------|----------|
| `/location/golf-lessons-ekkamai/` | 37 | 7.9 |
| `/location/indoor-golf-thong-lo/` | 32 | 17.3 |
| `/location/golf-near-thong-lo/` | 23 | 18.0 |
| `/location/things-to-do-ploenchit/` | 15 | 11.8 |
| `/location/indoor-golf-sathorn/` | 13 | 16.8 |
| `/location/indoor-golf-phaya-thai/` | 12 | 17.6 |
| `/location/golf-club-rental-nana/` | 11 | 4.8 |

- [ ] Test each URL — confirm 200 OK or 404
- [ ] For 404s: either create the page or add 301 redirect to the nearest valid location page
  - Example: `/location/indoor-golf-thong-lo/` → `/location/indoor-golf-ploenchit/`
- [ ] Verify valid location pages are in sitemap
- [ ] Add internal links to location pages from relevant blog posts

> **Note:** Existing location pages are performing well (Ploenchit: 15.79% CTR, Thong Lo: 33% CTR). These new ones just need time + internal links.

---

### 2.8 WordPress wp-content Images Still Indexed

**URL:** `/wp-content/uploads/2024/08/FOOD_DRINK_MENU.png`
**GSC Data:** 162 impressions / 0 clicks

- [ ] Add to `robots.txt`:
  ```
  User-agent: *
  Disallow: /wp-content/
  ```
- [ ] Submit URL removal request in GSC for `/wp-content/` paths

---

## 3. Priority 2 — High: CTR Optimization (Existing Pages)

These pages rank and get impressions but have very low click-through rates. Meta tag updates are fast, high-ROI fixes.

### 3.1 About Us Page ✅

**URL:** `/about-us/`
**GSC Data:** 1,821 impressions / 9 clicks / 0.49% CTR / position 7.5

**Current meta (verified live):**
- **Title:** `About Us — Indoor Golf Simulator & Bar | LENGOLF`
- **Description:** `Founded by golf-loving expats at BTS Chidlom, Bangkok. 4 simulator bays, full bar, PGA coaching, and a social vibe you won't find anywhere else.`
- **OG image:** venue interior photo ✅

Meta is good — specific, has personality, mentions BTS Chidlom. No action needed. The low CTR is likely positional (7.5 avg) rather than a meta quality issue. Monitor for improvement as position rises.

---

### 3.2 Mastering the Golf Driving Range ✅

**URL:** `/mastering-the-golf-driving-range/`
**GSC Data:** 1,460 impressions / 2 clicks / 0.14% CTR / position 8.0

- ✅ Title + H1 updated: `Golf Driving Range Tips: Improve Your Game in Bangkok (2026)`
- ✅ Broken Unsplash credit image removed from top of content
- [ ] Update meta description to include Bangkok + year

---

### 3.3 Comparison Blog Posts (Low CTR)

| URL | Impressions | CTR |
|-----|-------------|-----|
| `/fairway-golf-city-club-vs-lengolf/` | 707 | 0.42% |
| `/golf-point-center-vs-lengolf/` | 293 | 0.34% |

- [ ] Update meta descriptions to be more compelling and specific
- [ ] Add 2026 pricing/details to content
- [ ] Ensure comparison tables are present

---

### 3.4 Couple Activities in Bangkok

**URL:** `/blog/couple-activities-in-bangkok/`
**CTR:** 0.42%

- [ ] Update title:
  ```
  11 Romantic Date Night Activities in Bangkok for Couples
  ```
- [ ] Update meta description

---

### 3.5 Blog Index Page

**URL:** `/blog/`
**GSC Data:** 149 impressions / low clicks

- [ ] Audit current meta tags
- [ ] Write compelling title and meta description that conveys the variety of content

---

### 3.6 Blog Pagination

**URL:** `/blog/page/2/` appearing in GSC with impressions

- [ ] Add canonical tag on paginated pages pointing to `/blog/`
- [ ] Add prev/next link tags:
  ```html
  <link rel="prev" href="/blog/" />
  <link rel="next" href="/blog/page/3/" />
  ```

---

## 4. Priority 3 — Medium: Content Gaps

Content that doesn't exist yet but has demonstrated search demand in GSC.

### 4.1 Golf Simulator in Bangkok Guide

(See also §2.2 — create this if the existing page 404s)

**Target URL:** `/guide/golf-simulator-in-bangkok/`
**Demand:** 711 impressions already with zero content
**Target keywords:** "golf simulator bangkok", "indoor golf bangkok"
**Target word count:** 1,800–2,200 words

Content outline:
- What are golf simulators? (link to existing guide)
- Best venues in Bangkok comparison table
- Pricing comparison
- Technology comparison (Trackman vs Bravo vs SkyTrak)
- Which venue for what purpose (beginners / groups / serious practice)
- FAQs

---

### 4.2 SkyGolf Club vs LENGOLF

(See also §2.3 — create this if the existing page 404s)

**Target URL:** `/blog/skygolf-club-vs-lengolf/`
**Demand:** 440 impressions with zero content
**Word count:** 1,200–1,500 words

---

### 4.3 TopGolf Bangkok Alternative

(See also §2.5 — create this if the existing page 404s)

**Target URL:** `/blog/topgolf-bangkok-alternative/`
**Demand:** 91 impressions
**Angle:** TopGolf doesn't exist in Bangkok — LENGOLF is the best alternative

---

## 5. Priority 4 — Technical SEO

### 5.1 Robots.txt Update

- [ ] Add to `public/robots.txt`:
  ```
  User-agent: *
  Disallow: /wp-content/
  Disallow: /search/
  Disallow: /api/
  Disallow: /_next/

  Sitemap: https://www.len.golf/sitemap.xml
  ```
- [ ] Verify with GSC robots.txt tester after deploy

---

### 5.2 Trailing Slash Consistency

Some URLs appear in GSC both with and without trailing slashes (e.g., `/activities/birthday-party-venues-bangkok` and `/activities/birthday-party-venues-bangkok/`).

- [ ] Verify all non-trailing-slash URLs 301 redirect to trailing-slash versions
- [ ] Confirm sitemap only includes trailing-slash versions
- [ ] Request removal of non-trailing-slash duplicates in GSC if still indexed

---

### 5.3 Sitemap Audit

- [ ] Regenerate sitemap
- [ ] Confirm all valid pages use trailing slashes
- [ ] Exclude: `/wp-content/` paths, raw image files, old WordPress paths
- [ ] Submit updated sitemap to GSC

---

### 5.4 Structured Data (Schema) Rollout

- [ ] Add `LocalBusiness` schema to homepage (if not already present)
- [ ] Add `FAQPage` schema to: `/about-us/`, `/events/`, key guide pages
- [ ] Add `Article` schema to all blog posts
- [ ] Add `Menu` schema to `/food-and-drinks/` (once created)

---

### 5.5 Core Web Vitals & Crawl Budget

- [ ] Run PageSpeed Insights on homepage and top 5 pages
- [ ] Check GSC Crawl Stats report for crawl frequency and errors
- [ ] Block unnecessary URL params in robots.txt (e.g., `?sort=`)

---

## 6. Priority 5 — Indexation & Crawl Health

From the Feb 2026 site audit: 102 URLs in "Discovered – not indexed", 16 in "Crawled – not indexed".

### 6.1 Discovered – Not Indexed (102 URLs)

Mostly location/service cluster pages (e.g., `/location/corporate-events-ari/`, `/location/golf-club-rental-sukhumvit/`, etc.) and activity pages.

**Root cause:** Google sees large clusters of similar pages and deprioritizes thin/templated content.

- [ ] Audit a sample of 10–20 pages for unique content (>500 words of non-templated copy)
- [ ] For thin pages: add local-specific details, unique walking directions, FAQs
- [ ] Build internal links from already-indexed hub pages to 2–3 priority location pages each
- [ ] Do NOT bulk-request indexing — pick one representative URL, request indexing after improvements, wait 10–14 days
- [ ] Indexation gate: only proceed if ≥70% of requested pages index and <5% are "Crawled – not indexed"

### 6.2 Crawled – Not Indexed (16 URLs)

Includes: `/fun-activities-in-bangkok/`, `/exploring-bangkok-with-kids/`, `/learn-to-golf-here-in-bangkok/`, `/privacy-policy/`, `/terms-of-service/`, and several `_next/static/media/` font files.

- [ ] Remove font/asset URLs from sitemap if present (Google won't index `.woff2` files)
- [ ] For content pages: check for duplicate content vs `/blog/` versions, add unique depth, verify self-canonical
- [ ] For `/privacy-policy/` and `/terms-of-service/`: intentionally noindex these if not already

### 6.3 5xx Errors (Previously Affecting Blog Posts)

- ✅ Fixed Feb 21 — `/th/blog/*` routes now redirect to `/blog/*`
- [ ] Confirm GSC validation has passed (check "Server error (5xx)" section in GSC Page Indexing)
- [ ] Monitor for any new 5xx errors in GSC Crawl Stats

### 6.4 Request URL Removal for Old Assets

- [ ] Submit removal requests in GSC for:
  - `/wp-content/uploads/` directory
  - Non-trailing-slash duplicate URLs (if still indexed)
  - Old WordPress feed URLs (`/feed/`, `/category/uncategorized/`)

---

## 7. Strategic Notes: Internal Linking & LLM Optimization

### 7.1 Internal Linking Architecture

At the current scale (~1,000 pages multilingual), internal links are the primary ranking lever. Define hub → spoke relationships explicitly:

**Hubs (main service pages) should link to:**
- 3–5 relevant location pages
- 1–2 comparison blog posts
- 1 FAQ or guide page

**Location pages should link to:**
- 1 activity/service hub
- 1 nearby BTS location page
- 1 pricing or comparison page

**Activity pages should link to:**
- 1 location page
- 1 comparison page

**Goal:** Every important page reachable in ≤3 clicks from homepage.

- [ ] Audit top 20 most-impressioned pages — do they have at least 3 internal links pointing to them?
- [ ] Add internal links from blog posts to relevant location pages (especially new location pages in §2.7)
- [ ] Document hub → spoke structure as a reference for content creation

---

### 7.2 E-E-A-T Signals

Google is increasingly selective due to AI content proliferation. Real-world signals matter.

- [ ] Add "Updated by LENGOLF Bangkok" + date to guide pages
- [ ] Add photo galleries from the actual venue to: activity pages, team building, private parties
- [ ] Embed 2–3 real Google Reviews snippets on key pages
- [ ] Add author/attribution to blog posts

---

### 7.3 LLM / AI Search Optimization

ChatGPT, Perplexity, and Gemini are increasingly driving discovery. The site is already well-positioned (comparison pages, FAQs, cost guides), but:

**Formatting rules to enforce on new content:**
- First paragraph answers the implied question directly (40–70 words max, no fluff intro)
- Repeat key facts verbatim across pages: "500 THB/hr for up to 5 people", "BTS Chidlom, 5-minute walk", "air-conditioned, rain-proof"
- Add comparison tables to activity pages, hotel/concierge pages, and seasonal pages (not just `/compare`)
- Neutral tone > marketing tone: explicitly say when a competitor is better for a specific use case — this increases citation likelihood

**Content to add for LLM trust:**
- [ ] Ensure "What is a golf simulator and how does it work?" explainer exists (check `/guide/what-is-a-golf-simulator/`)
- [ ] Add "Is indoor golf realistic?" and "Can non-golfers enjoy golf simulators?" to FAQ or guide pages

---

### 7.4 Hotel / Thin Content Prevention

If hotel concierge pages are created in future:
- Each hotel page must have a unique intro paragraph, unique walking directions text, and a different nearby restaurant mix
- Rule: if two hotel pages share >30% identical body copy, do not publish

---

## 8. SEO Expansion Strategy

Full technical details (SQL schema, TypeScript types, JSONB shapes, routing patterns) are in [seo-expansion-strategy.md](./seo-expansion-strategy.md).

### 8.1 Progress Tracker

| Phase | Task | Status | Pages | Date |
|-------|------|--------|-------|------|
| **1A** | Activity-Occasion Pages | ✅ Done | 10/10 | 2026-02-16 |
| **1B** | FAQ / Answer Pages | 🔵 Built (draft) | 15/15 | 2026-02-16 |
| **1C** | Hotel Concierge Pages | 🔵 Built (draft) | 12/12 | 2026-02-17 |
| **1D** | Price / Cost Guide Pages | 🔵 Built (draft) | 6/6 | 2026-02-19 |
| **1E** | Explainer Pages (LLM) | 🔵 Built (draft) | 3/3 | 2026-02-19 |
| 2A | Best Of Listicles | ⬜ Not started | 0/7 | — |
| 2B | Comparison Pages | ⬜ Not started | 0/6 | — |
| 2C | Seasonal / Event Pages | ⬜ Not started | 0/9 | — |
| 2D | Team Building + Private Party | ⬜ Not started | 0/16 | — |
| 2E | New Location Pages (Tier 3/4) | ⬜ Not started | 0/63 | — |
| 3 | Multi-Language (Thai) | ⬜ Not started | — | — |
| 3 | Multi-Language (Chinese) | ⬜ Not started | — | — |
| 3 | Multi-Language (Japanese) | ⬜ Not started | — | — |
| — | AQI Widget | ✅ Done | — | 2026-02-15 |
| — | Supabase `seo_pages` table | ⬜ Not started | — | — |

**English pages shipped: 10 / 147** (+36 built as draft across phases 1B–1E)

---

### 8.2 Immediate: Publish Phase 1 Drafts

46 pages are built but in `draft` status. These need to be published in waves of 10–20 with indexation gates between each wave.

**Indexation gate (must pass before next wave):**
- ≥70% of wave pages indexed
- ≤5% marked "Crawled – currently not indexed"
- No spike in "Duplicate, Google chose different canonical"
- No site-wide traffic decline or manual action in GSC

**If gate fails:** pause publishing, improve internal linking + content depth, resubmit sitemap, wait 10–14 more days.

- [ ] Create `seo_pages` Supabase table (SQL migration in `seo-expansion-strategy.md` §Technical Architecture)
- [ ] Wave 1 (10 pages): Publish Phase 1A Activity-Occasion pages
  - `/activities/rainy-day-activities-bangkok/`
  - `/activities/date-night-ideas-bangkok/`
  - `/activities/bachelor-party-ideas-bangkok/`
  - `/activities/birthday-party-venues-bangkok/`
  - `/activities/things-to-do-bangkok-at-night/`
  - `/activities/group-activities-bangkok/`
  - `/activities/indoor-activities-bangkok/`
  - `/activities/weekend-activities-bangkok/`
  - `/activities/golf-simulator-for-non-golfers/`
  - `/activities/family-activities-bangkok/`
- [ ] Wait 10–14 days, check indexation gate
- [ ] Wave 2 (10 pages): Publish first 10 FAQ pages (Phase 1B)
- [ ] Wave 3 (5 pages): Publish remaining 5 FAQ pages
- [ ] Wait 10–14 days, check gate
- [ ] Wave 4 (12 pages): Publish Hotel Concierge pages (Phase 1C)
- [ ] Wave 5 (9 pages): Publish Price Guide (1D) + Explainer pages (1E)
- [ ] Update sitemap after each wave
- [ ] Submit sitemap to GSC after each wave

---

### 8.3 Phase 2: Listicles, Comparisons, Seasonal, New Templates

Not started. Begin after Phase 1 drafts are published and indexed.

**Phase 2A — Best Of Listicles (7 pages, URL: `/best/{slug}/`):**
- [ ] Best team building activities Bangkok
- [ ] Best bars near BTS Chidlom
- [ ] Best corporate event venues Bangkok
- [ ] Best indoor entertainment Bangkok
- [ ] Best birthday party venues adults Bangkok
- [ ] Best golf experiences Bangkok
- [ ] Best things to do near Chidlom/Ploenchit

**Phase 2B — Comparison Pages (6 pages, URL: `/compare/{slug}/`):**
- [ ] Indoor golf vs driving range
- [ ] Indoor golf vs outdoor golf Bangkok
- [ ] Golf simulator bar vs karaoke for group outings
- [ ] Golf simulator vs escape room for team building
- [ ] Renting vs bringing golf clubs to Thailand
- [ ] LENGOLF packages compared

**Phase 2C — Seasonal Pages (9 pages, URL: `/seasonal/{slug}/`):**
> Pre-publish 2–3 months before each event season.
- [ ] Christmas party venue Bangkok (publish by Oct)
- [ ] New Year's Eve activities Bangkok (publish by Oct)
- [ ] Valentine's Day date ideas Bangkok (publish by Dec)
- [ ] Songkran indoor activities Bangkok (publish by Feb)
- [ ] Rainy season activities Bangkok (publish by Apr)
- [ ] Halloween party venue Bangkok (publish by Aug)
- [ ] Year-end party venue Bangkok (publish by Oct)
- [ ] Indoor activities Bangkok hot season (publish by Feb)
- [ ] School holiday activities Bangkok (publish by Feb)

**Phase 2D — New Location Templates (16 pages):**
- [ ] Build Team Building template (for Chidlom, Siam, Sukhumvit, Silom, Sathorn, Asok, Nana, Thong Lo)
- [ ] Build Private Party template (same 8 locations)
> See `seo-expansion-strategy.md` §Phase 2D for unique content requirements per template.

**Phase 2E — New Locations (63 pages):**

| Location | Tier | Templates | Pages |
|----------|------|-----------|-------|
| Ratchaprasong | 1 | All 8 | 8 |
| Pathum Wan | 1 | All 8 | 8 |
| Lang Suan | 1 | All 8 | 8 |
| Pratunam | 2 | 5 templates | 5 |
| Lumphini | 2 | 5 templates | 5 |
| Wireless Road | 2 | 5 templates | 5 |
| National Stadium | 2 | 4 templates | 4 |
| Bang Rak | 3 | 3 templates | 3 |
| On Nut | 3 | 3 templates | 3 |
| Victory Monument | 3 | 3 templates | 3 |
| Sam Yan | 3 | 3 templates | 3 |
| Ratchathewi | 3 | 2 templates | 2 |
| Phra Khanong | 4 | 2 templates | 2 |
| Rama 9 / Ratchadaphisek | 4 | 2 templates | 2 |
| Udom Suk / Bang Na | 4 | 2 templates | 2 |

---

### 8.4 Phase 3: Multi-Language

Infrastructure not yet started. Priority order: Thai → Chinese → Japanese.

- [ ] Install `next-intl`, restructure `app/` to `app/[locale]/`
- [ ] Extract UI strings to `messages/en.json`
- [ ] Add `locale` + `canonical_slug` columns to `location_pages` table
- [ ] Thai: translate UI strings + top-traffic location pages, launch `/th/`
- [ ] Chinese: translate all location pages, launch `/zh/`
- [ ] Japanese: translate all location pages, launch `/ja/`

> URL structure: `/th/`, `/zh/`, `/ja/` subdirectory prefixes. English has no prefix.
> Technical details in `seo-expansion-strategy.md` §Phase 3.

---

### 8.5 Content Quality Rules (Apply to All New Pages)

These apply to all Phase 2+ content. Phase 1 pages built as drafts should be audited against these before publishing.

**Answer-first formatting:** First paragraph must directly answer the implied query in 40–70 words. No fluff intros.

**Consistent facts (use verbatim, don't rewrite):**
- Price: "500 THB/hour for up to 5 people"
- Location: "Mercury Ville, BTS Chidlom (Exit 4)"
- Positioning: "air-conditioned, rain-proof, open until late"
- Rentals: "Premium club rental from 150 THB/hour"

**Neutral tone over marketing tone:** Admit when competitors are better for specific use cases. Include honest pros/cons alongside competitors. No superlatives without evidence.

**Hotel concierge pages — thin content rule:** If two hotel pages share >30% identical body copy, do not publish the second until differentiated. Each page requires: unique intro paragraph, unique walking directions text with specific landmarks, different nearby restaurant mix (min 3 unique), hotel-specific guest profile.

**E-E-A-T on all content pages:**
- "Updated by LENGOLF Bangkok" + date on guides and cost pages
- Real venue photos (not stock) on activity, team building, private party pages
- Embed 2–3 real Google Reviews on high-traffic pages
- Last verified date on price guide pages

---

## 9. Monitoring

### Weekly (Every Monday)
- Run GSC scripts:
  ```bash
  npx tsx scripts/fetch-gsc-errors.ts
  npx tsx scripts/fetch-gsc-404s.ts
  ```
- Check zero-click pages — are counts decreasing?
- Check CTR on recently updated pages

### Monthly
- Compare MoM: total clicks, impressions, avg CTR, avg position, zero-click page count
- Review new 404s and crawl errors
- Update comparison blog posts with latest pricing
- Plan next content batch based on search demand

---

## 10. Baseline & Targets

### Baseline (Feb 26, 2026)
| Metric | Value |
|--------|-------|
| Total pages with impressions | 92 |
| Total clicks (30 days) | ~330 |
| Total impressions (30 days) | ~15,000 |
| Average CTR | 2.2% |
| Zero-click pages | 34 |
| Low-CTR pages (<0.5%) | 32 |

### Month 1 Target (March 26, 2026)
| Metric | Target |
|--------|--------|
| Total clicks | 500+ |
| Total impressions | 18,000+ |
| Average CTR | 2.8% |
| Zero-click pages | <20 |

### Month 3 Target (May 26, 2026)
| Metric | Target |
|--------|--------|
| Total clicks | 750+ |
| Total impressions | 25,000+ |
| Average CTR | 3% |
| Zero-click pages | <10 |

### Expected Impact (if all actions completed)
| Category | Est. Gain |
|----------|-----------|
| Food menu redirect (tidy-up, not a traffic driver) | +5 clicks/month |
| Zero-click page fixes (meta) | +90 clicks/month |
| CTR optimization (existing pages) | +100 clicks/month |
| New content | +25 clicks/month |
| **Total** | **~+220 clicks/month** |

---

*Consolidated from: `gsc-seo-action-plan.md`, `gsc-seo-checklist.md`, `gsc-site-audit-2026-02-27.md`, `gsc-quick-wins.md`, `Existing page SEO tweaks`, `SEO notes`, `seo-expansion-strategy.md` — all archived to `docs/old/`*
