# LENGOLF SEO Expansion Strategy

## Research Date: 2026-02-13

> **Related Documents:**
> - [lengolf-seo-strategy.md](lengolf-seo-strategy.md) - Original SEO strategy & keyword research
> - [architecture.md](architecture.md) - Technical architecture overview

---

## Table of Contents

- [Executive Summary](#executive-summary)
- [Current State](#current-state)
- [Phase 1: New Page Types (Priority)](#phase-1-new-page-types)
- [Phase 2: New Location Templates + Locations](#phase-2-new-location-templates--locations)
- [Phase 3: Multi-Language Expansion](#phase-3-multi-language-expansion)
- [AQI Widget Feature](#aqi-widget-feature)
- [Technical Architecture](#technical-architecture)
- [Rollout Timeline](#rollout-timeline)
- [Internal Linking Architecture](#internal-linking-architecture)
- [Content Quality Controls](#content-quality-controls)
- [E-E-A-T & Real-World Signals](#e-e-a-t--real-world-signals)
- [Technical Quality Controls](#technical-quality-controls)
- [LLM Search Optimization](#llm-search-optimization)
- [Appendix: Complete Page Inventories](#appendix-complete-page-inventories)

---

## Progress Tracker

| Phase | Task | Status | Pages | Date |
|---|---|---|---|---|
| **1A** | Activity-Occasion Pages | **Done** | 10/10 | 2026-02-16 |
| 1B | FAQ / Answer Pages | Not Started | 0/15 | — |
| 1C | Hotel Concierge Pages | Not Started | 0/12 | — |
| 1D | Price / Cost Guide Pages | Not Started | 0/6 | — |
| 1E | Explainer Pages (LLM) | Not Started | 0/3 | — |
| 2A | Best Of Listicles | Not Started | 0/7 | — |
| 2B | Comparison Pages | Not Started | 0/6 | — |
| 2C | Seasonal / Event Pages | Not Started | 0/9 | — |
| 2D | Team Building + Private Party | Not Started | 0/16 | — |
| 2E | New Location Pages | Not Started | 0/63 | — |
| 3 | Multi-Language (Thai) | Not Started | — | — |
| 3 | Multi-Language (Chinese) | Not Started | — | — |
| 3 | Multi-Language (Japanese) | Not Started | — | — |
| — | AQI Widget | **Done** | — | 2026-02-15 |
| — | Supabase `seo_pages` table | Not Started | — | — |

**Total English pages shipped: 10 / 147**

---

## Executive Summary

We currently have **85 location pages** (6 templates x 14 locations) driving programmatic SEO. This strategy adds **147 new English pages** across three phases, then multiplies across 3 additional languages for a total of **968 pages**. The expansion has three dimensions:

1. **New page types** (non-location) -- FAQ, Activity-Occasion, Hotel Concierge, "Best Of" listicles, Comparisons, Seasonal, Price Guides, Explainer pages
2. **New location templates + locations** -- Team Building, Private Party templates; Tier 3/4 Bangkok locations
3. **Multi-language** -- Thai, Chinese (Simplified), Japanese

Additionally, a **live AQI (Air Quality Index) widget** using Google's Air Quality API will promote indoor golf during Bangkok's pollution season (Nov-Mar).

**Key principles:**
- Build content in phases, deploy in **waves of 10–20 pages** with explicit indexation gates between each wave
- Quality over quantity — enforce thin-content prevention rules and E-E-A-T signals
- Structured internal linking architecture (hub-spoke, max 3 clicks from homepage)
- Optimize for both traditional Google SEO and LLM search (ChatGPT, Perplexity, Gemini)

---

## Current State

- **Site**: len.golf (Next.js 15 on Vercel)
- **Location**: Mercury Ville, BTS Chidlom, Bangkok
- **Existing pages**: 9 core pages + ~85 location pages + blog
- **Existing templates**: Golf Near, Things To Do, Indoor Golf, Golf Lessons, Corporate Events, Golf Club Rental
- **Existing locations**: Tier 1 (Chidlom, Ploenchit, Siam, Ratchadamri, Sukhumvit, Silom, Sathorn) + Tier 2 (Asok, Nana, Phrom Phong, Thong Lo, Ekkamai, Ari, Phaya Thai)
- **Rankings**: #1 for "golf simulator bangkok", #3 for "indoor golf bangkok"

---

## Phase 1: New Page Types

These capture audiences who would **never search for "golf"** but whose needs LENGOLF solves. This is the highest-impact expansion.

### Phase 1A: Activity-Occasion Pages (Highest Impact)

**What:** Pages targeting people searching by occasion or situation rather than by activity type.

**URL pattern:** `/activities/{slug}/`

**Why highest priority:** Massive search volume, zero current visibility. Bangkok gets 5+ months of heavy rain -- "rainy day activities bangkok" alone could be our biggest traffic driver.

| # | Slug | Page Title (H1) | Target Keywords | Target Audience |
|---|---|---|---|---|
| 1 | `rainy-day-activities-bangkok` | Best Rainy Day Activities in Bangkok | "rainy day activities bangkok", "what to do in bangkok when it rains" | Tourists, locals during May-Oct monsoon |
| 2 | `date-night-ideas-bangkok` | Date Night Ideas in Bangkok | "date night bangkok", "romantic things to do bangkok" | Couples |
| 3 | `bachelor-party-ideas-bangkok` | Bachelor Party Ideas Bangkok | "bachelor party bangkok", "stag do bangkok" | Groups planning celebrations |
| 4 | `birthday-party-venues-bangkok` | Birthday Party Venues in Bangkok | "birthday party venue bangkok", "birthday ideas adults bangkok" | Individuals planning parties |
| 5 | `things-to-do-bangkok-at-night` | Fun Things to Do in Bangkok at Night | "things to do bangkok at night", "nightlife activities bangkok" | Tourists, locals seeking evening activities |
| 6 | `group-activities-bangkok` | Group Activities in Bangkok for 10+ People | "group activities bangkok", "things to do with friends bangkok" | Friend groups, informal teams |
| 7 | `indoor-activities-bangkok` | Indoor Activities in Bangkok | "indoor activities bangkok", "air conditioned activities bangkok" | Heat/rain refugees |
| 8 | `weekend-activities-bangkok` | Weekend Activities in Bangkok | "things to do in bangkok on weekend", "weekend plans bangkok" | Weekend planners |
| 9 | `golf-simulator-for-non-golfers` | Fun Things for Non-Golfers at a Golf Simulator | "golf simulator for non golfers", "golf simulator beginners" | Non-golfers considering visiting |
| 10 | `family-activities-bangkok` | Family Activities in Bangkok | "family things to do bangkok", "activities with kids bangkok" | Families with kids |

**Total: 10 pages**

### Phase 1B: FAQ / Answer Pages

**What:** Single-question pages targeting "People Also Ask" boxes and featured snippets. H1 is the question, first paragraph is the direct answer, then expanded content with CTA.

**URL pattern:** `/faq/{slug}/`

**Why high priority:** We already have FAQ content in `data/pricing.ts` (10 golf FAQs, 8 event FAQs, 6 tournament FAQs). Each just needs expanding into standalone pages. Low effort, high intent.

| # | Slug | Question (H1) | Category | Intent Level |
|---|---|---|---|---|
| 1 | `can-i-rent-golf-clubs-in-bangkok` | Can I Rent Golf Clubs in Bangkok? | rental | High |
| 2 | `how-much-does-indoor-golf-cost-in-bangkok` | How Much Does Indoor Golf Cost in Bangkok? | pricing | Very High |
| 3 | `can-you-play-golf-in-bangkok-when-it-rains` | Can You Play Golf in Bangkok When It Rains? | general | High |
| 4 | `do-i-need-experience-to-play-golf-simulator` | Do I Need Golf Experience to Play a Golf Simulator? | general | High |
| 5 | `where-to-play-golf-at-night-in-bangkok` | Where Can I Play Golf at Night in Bangkok? | general | High |
| 6 | `how-accurate-are-golf-simulators` | How Accurate Are Golf Simulators Compared to Real Golf? | general | Medium |
| 7 | `how-long-does-simulator-golf-take` | How Long Does a Round of Simulator Golf Take? | general | Medium |
| 8 | `what-to-wear-to-indoor-golf-bar` | What Should I Wear to an Indoor Golf Bar? | general | Medium |
| 9 | `can-kids-play-golf-simulators` | Can Kids Play Golf Simulators? | general | Medium |
| 10 | `can-beginners-play-golf-simulators` | Can Beginners Play Golf Simulators? | general | High |
| 11 | `best-way-to-learn-golf-in-bangkok` | What Is the Best Way to Learn Golf in Bangkok? | lessons | High |
| 12 | `should-i-bring-golf-clubs-to-thailand-or-rent` | Should I Bring My Golf Clubs to Thailand or Rent? | rental | Very High |
| 13 | `cost-to-fly-with-golf-clubs-to-thailand` | How Much Does It Cost to Fly with Golf Clubs to Thailand? | rental | High |
| 14 | `practice-golf-swing-without-driving-range-bangkok` | Can I Practice My Golf Swing Without a Driving Range in Bangkok? | general | High |
| 15 | `how-much-does-corporate-golf-event-cost-bangkok` | How Much Does a Corporate Golf Event Cost in Bangkok? | events | Very High |

**Total: 15 pages**

### Phase 1C: Hotel Concierge Pages

**What:** Pages targeting tourists staying at specific nearby hotels. Target query: "{hotel name} things to do nearby".

**URL pattern:** `/hotels/{slug}/`

**Why high priority:** Hotel guests are the highest-value walk-in audience. Near-zero competition for these queries. Grand Hyatt Erawan is 500m from LENGOLF.

| # | Slug | Hotel | Distance | Star Rating | Guest Profile |
|---|---|---|---|---|---|
| 1 | `things-to-do-near-arnoma-grand-bangkok` | Arnoma Grand Bangkok | 300m | 4-star | Mid-range business/tourist |
| 2 | `things-to-do-near-sindhorn-midtown` | Sindhorn Midtown Hotel | 400m | 4-star | Mid-range, newer property |
| 3 | `things-to-do-near-grand-hyatt-erawan` | Grand Hyatt Erawan Bangkok | 500m | 5-star | Luxury, high-spending tourists |
| 4 | `things-to-do-near-athenee-hotel` | The Athenee Hotel Bangkok | 600m | 5-star | Luxury, events |
| 5 | `things-to-do-near-intercontinental-bangkok` | InterContinental Bangkok | 600m | 5-star | Business travelers |
| 6 | `things-to-do-near-hotel-indigo-wireless-road` | Hotel Indigo Bangkok Wireless Road | 700m | 4-star | Boutique, younger demographic |
| 7 | `things-to-do-near-novotel-ploenchit` | Novotel Bangkok Ploenchit Sukhumvit | 800m | 4-star | Business travelers |
| 8 | `things-to-do-near-renaissance-ratchaprasong` | Renaissance Bangkok Ratchaprasong | 800m | 5-star | Business/tourist |
| 9 | `things-to-do-near-okura-prestige-bangkok` | The Okura Prestige Bangkok | 900m | 5-star | Japanese business travelers (golf culture!) |
| 10 | `things-to-do-near-anantara-siam` | Anantara Siam Bangkok | 1km | 5-star | Luxury tourists |
| 11 | `things-to-do-near-mercure-siam` | Mercure Bangkok Siam | 1km | 3-star | Mid-range tourists |
| 12 | `things-to-do-near-kimpton-maa-lai` | Kimpton Maa-Lai Bangkok | 1.2km | 5-star | Trendy, activity-seeking |

Each page includes:
- Walking directions from the specific hotel (with estimated time)
- Google Maps embed showing the route
- "What to do near {hotel}" framing with LENGOLF as featured activity
- 3-5 nearby restaurants for pre/post visit
- BTS directions as backup transport
- Booking CTA

**Total: 12 pages**

**Offline opportunity:** Print one-page versions and physically deliver to hotel concierge desks.

### Phase 1D: Price / Cost Guide Pages

**What:** Detailed pricing breakdowns targeting high-intent "how much" and "cost" queries. Highest purchase intent of any content type.

**URL pattern:** `/cost/{slug}/`

| # | Slug | Page Title | Content Strategy |
|---|---|---|---|
| 1 | `how-much-does-golf-cost-bangkok` | How Much Does Golf Cost in Bangkok? (2026 Complete Guide) | Compare outdoor course green fees, driving ranges, vs our simulator rates (500 THB/hour / 5 people = 100 THB/person) |
| 2 | `golf-simulator-prices-bangkok` | Golf Simulator Prices in Bangkok Compared | Honest comparison with any other simulator venues |
| 3 | `lengolf-pricing-guide` | LENGOLF Pricing Guide: Bay Rates, Packages & Lessons | One comprehensive pricing page, internally linking to /golf, /lessons, /events |
| 4 | `cost-of-renting-golf-clubs-bangkok` | Cost of Renting Golf Clubs in Bangkok | Compare our premium rental (150 THB/hour) vs standalone rental services vs course rentals |
| 5 | `corporate-golf-event-cost-bangkok` | How Much Does a Corporate Golf Event Cost in Bangkok? | Break down our 9,999 and 21,999 packages, per-person cost, inclusions |
| 6 | `golf-lesson-prices-bangkok` | Bangkok Golf Lesson Prices (2026) | Compare our rates with other coaching options |

**Total: 6 pages**

### Phase 1E: Explainer Pages (LLM-Optimized)

**What:** Reference pages targeting LLM citation rather than Google search volume. These become the "source of truth" pages that AI systems (ChatGPT, Perplexity, Gemini) lean on when answering questions about golf simulators in Bangkok.

**URL pattern:** `/guide/{slug}/`

**Why:** LLMs prefer clear, neutral, educational content. These pages won't drive massive Google traffic but will build AI trust in LENGOLF as an authoritative entity.

| # | Slug | Page Title | Content Focus |
|---|---|---|---|
| 1 | `what-is-a-golf-simulator` | What Is a Golf Simulator and How Does It Work? | Technology explained, Trackman/launch monitors, how courses are rendered, accuracy |
| 2 | `is-indoor-golf-realistic` | Is Indoor Golf Realistic? Simulator Accuracy Explained | Honest assessment of simulator vs real golf, what transfers, what doesn't |
| 3 | `golf-simulator-for-non-golfers-guide` | Can Non-Golfers Enjoy Golf Simulators? A Complete Guide | Why it's fun without golf experience, party atmosphere, games beyond golf |

**Total: 3 pages**

---

## Phase 2: New Location Templates + Locations

### Phase 2A: "Best Of" Listicle Pages

**URL pattern:** `/best/{slug}/`

**Key rule:** Must include real alternatives (not just LENGOLF) to rank. Google rewards comprehensive, genuinely useful listicles.

| # | Slug | Page Title | Approach |
|---|---|---|---|
| 1 | `best-team-building-activities-bangkok` | Best Team Building Activities in Bangkok (2026) | 7-10 real options: escape rooms, cooking classes, muay thai, LENGOLF, etc. Position LENGOLF at #1 or #2 with honest pros/cons. |
| 2 | `best-bars-near-bts-chidlom` | Best Bars Near BTS Chidlom | 8-10 actual bars in the Chidlom area. LENGOLF is a bar with a twist. |
| 3 | `best-corporate-event-venues-bangkok` | Best Corporate Event Venues in Bangkok | Hotels, rooftops, activity venues. LENGOLF fills "unique activity venue" slot. |
| 4 | `best-indoor-entertainment-bangkok` | Best Indoor Entertainment in Bangkok | Bowling, escape rooms, VR, karaoke, arcades, LENGOLF. |
| 5 | `best-birthday-party-venues-adults-bangkok` | Best Birthday Party Venues for Adults in Bangkok | Rooftop bars, private dining, karaoke, LENGOLF. |
| 6 | `best-golf-experiences-bangkok` | Best Golf Experiences in Bangkok | Outdoor courses, driving ranges, simulators. |
| 7 | `best-things-to-do-near-chidlom` | Best Things to Do Near Ploenchit / Chidlom | Hyper-local guide: shopping, dining, LENGOLF, spas, galleries. |

**Total: 7 pages**

### Phase 2B: Comparison Pages

**URL pattern:** `/compare/{slug}/`

| # | Slug | Page Title | What's Being Compared | Key Selling Point |
|---|---|---|---|---|
| 1 | `indoor-golf-vs-driving-range` | Indoor Golf vs Driving Range: Which Is Better for Practice? | Simulator golf vs outdoor ranges | Weather-proof, swing data, play full courses |
| 2 | `indoor-golf-vs-outdoor-golf-bangkok` | Indoor Golf vs Outdoor Golf in Bangkok | Simulator vs course play | Air-conditioned, no tee time, playable at night, cheaper |
| 3 | `golf-simulator-bar-vs-karaoke-group-outings` | Golf Simulator Bar vs Karaoke for Group Outings | Two popular group entertainment options | Active vs passive, inclusive, food & drink at both |
| 4 | `golf-simulator-vs-escape-room-team-building` | Golf Simulator vs Escape Room for Team Building | Two popular corporate options | Scales better for large groups, drinks included |
| 5 | `renting-vs-bringing-golf-clubs-thailand` | Renting Golf Clubs vs Bringing Your Own to Thailand | The traveler's dilemma | Airline fees vs rental cost, hassle, quality |
| 6 | `lengolf-packages-compared` | LENGOLF Packages Compared: Which Monthly Plan Is Right for You? | Our own Bronze/Silver/Gold/Diamond packages | Helps customers decide, reduces inquiry friction |

**Total: 6 pages**

### Phase 2C: Seasonal / Event-Tied Pages

**URL pattern:** `/seasonal/{slug}/`

**Strategy:** Pre-build and publish 2-3 months before each season so Google has time to rank them.

| # | Slug | Page Title | Peak Season | Search Spike |
|---|---|---|---|---|
| 1 | `christmas-party-venue-bangkok` | Christmas Party Venue Bangkok | Nov-Dec | Year-end corporate parties |
| 2 | `new-years-eve-activities-bangkok` | New Year's Eve Activities Bangkok | Dec | Tourists and locals planning NYE |
| 3 | `valentines-day-date-ideas-bangkok` | Valentine's Day Date Ideas Bangkok | Jan-Feb | Couples planning dates |
| 4 | `songkran-indoor-activities-bangkok` | Songkran Indoor Activities Bangkok | Apr | Everyone seeking indoor options during water festival |
| 5 | `rainy-season-activities-bangkok` | Rainy Season Activities Bangkok | May-Oct | 6 months of "what to do when it rains" |
| 6 | `halloween-party-venue-bangkok` | Halloween Party Venue Bangkok | Sep-Oct | Growing holiday in BKK expat community |
| 7 | `year-end-party-venue-bangkok` | Year-End Party Venue Bangkok | Oct-Dec | Thai corporate "party pee mai" culture |
| 8 | `indoor-activities-bangkok-hot-season` | Cool Indoor Activities During Bangkok Hot Season | Mar-May | People seeking air-conditioned venues |
| 9 | `school-holiday-activities-bangkok` | School Holiday Activities Bangkok | Mar-Apr, Oct | Family searches spike during breaks |

**Total: 9 pages**

### Phase 2D: New Location Templates

**Team Building** and **Private Party** are genuinely different search intents from the existing Corporate Events template:

| Template | Who Searches | Decision Maker | Budget | Timeline |
|---|---|---|---|---|
| **Team Building** (NEW) | HR managers, team leads | Department head | 500-2,000 THB/person | 2-4 weeks out |
| **Corporate Events** (EXISTING) | Executive assistants, event coordinators | C-suite/marketing | 20,000-100,000+ THB | 1-3 months out |
| **Private Party** (NEW) | Individuals planning birthdays/farewells/bachelor parties | The person/friend organizing | 5,000-30,000 THB total | 1-2 weeks out |

**Unique content each template needs:**

**Team Building:**
- How the golf tournament format works for teams
- Scoring systems (closest to pin, longest drive, team scramble)
- How non-golfers participate and enjoy it
- Testimonials about team bonding
- Suggested 2-hour team tournament format
- Comparison with other team building options

**Private Party:**
- Atmosphere photos (moody lighting, cocktails, fun group shots)
- Cocktail and drink menu highlights
- Decoration customization options
- Photo/video opportunities
- Small package pricing (9,999 THB package)
- "Surprise party" logistics

**Rollout:** Build for the 8 highest-traffic existing locations (Chidlom, Siam, Sukhumvit, Silom, Sathorn, Asok, Nana, Thong Lo) = 16 new pages.

| # | Template | Locations | Pages |
|---|---|---|---|
| 1-8 | Team Building | Chidlom, Siam, Sukhumvit, Silom, Sathorn, Asok, Nana, Thong Lo | 8 |
| 9-16 | Private Party | Chidlom, Siam, Sukhumvit, Silom, Sathorn, Asok, Nana, Thong Lo | 8 |

**Total: 16 pages**

### Phase 2E: New Locations (Tier 3/4)

**Revised tier structure based on research:**

#### Promoted to Tier 1 (build all templates)
- **Ratchaprasong** -- 300m from LENGOLF, CentralWorld, 5 luxury hotels within walking distance
- **Pathum Wan** -- our home district, tourists search by district name
- **Lang Suan** -- the street behind Mercury Ville, upscale dining/residential

#### Promoted to Tier 2 (build 5-6 templates)
- **Pratunam** -- 1.5km, massive tourist hotel density, closer than Ari/Thong Lo/Ekkamai
- **Lumphini** -- 2km, major landmark (Lumphini Park), expat residential area
- **Wireless Road** -- 1km walk, US/UK embassies, Conrad Bangkok, Sindhorn Village
- **National Stadium** -- 2 BTS stops, MBK Center, Jim Thompson House, BACC

#### New Tier 3 (build 3-4 templates selectively)
- **Bang Rak** -- Charoen Krung creative district, boutique hotels
- **On Nut** -- Primary budget expat residential area, BTS accessible
- **Victory Monument** -- Major transport hub, 12 min BTS from Chidlom
- **Sam Yan** -- Samyan Mitrtown, Chulalongkorn University
- **Ratchathewi** -- BTS station between Siam and Phaya Thai

#### New Tier 4 (build 2 templates, data-dependent)
- **Phra Khanong** -- Growing expat residential
- **Rama 9 / Ratchadaphisek** -- MRT Rama 9, office district
- **Udom Suk / Bang Na** -- BITEC convention center

**New location pages breakdown:**

| Location | Tier | Templates | Pages |
|---|---|---|---|
| Ratchaprasong | 1 | Golf Near, Things To Do, Indoor Golf, Golf Lessons, Corporate Events, Golf Club Rental, Team Building, Private Party | 8 |
| Pathum Wan | 1 | Golf Near, Things To Do, Indoor Golf, Golf Lessons, Corporate Events, Golf Club Rental, Team Building, Private Party | 8 |
| Lang Suan | 1 | Golf Near, Things To Do, Indoor Golf, Golf Lessons, Corporate Events, Golf Club Rental, Team Building, Private Party | 8 |
| Pratunam | 2 | Golf Near, Things To Do, Indoor Golf, Golf Club Rental, Team Building | 5 |
| Lumphini | 2 | Golf Near, Things To Do, Indoor Golf, Golf Lessons, Team Building | 5 |
| Wireless Road | 2 | Golf Near, Things To Do, Corporate Events, Team Building, Private Party | 5 |
| National Stadium | 2 | Golf Near, Things To Do, Indoor Golf, Golf Club Rental | 4 |
| Bang Rak | 3 | Golf Near, Things To Do, Indoor Golf | 3 |
| On Nut | 3 | Golf Near, Indoor Golf, Golf Lessons | 3 |
| Victory Monument | 3 | Golf Near, Things To Do, Indoor Golf | 3 |
| Sam Yan | 3 | Golf Near, Things To Do, Indoor Golf | 3 |
| Ratchathewi | 3 | Golf Near, Things To Do | 2 |
| Phra Khanong | 4 | Golf Near, Indoor Golf | 2 |
| Rama 9 / Ratchadaphisek | 4 | Golf Near, Corporate Events | 2 |
| Udom Suk / Bang Na | 4 | Golf Near, Things To Do | 2 |

**Total: 63 new location pages**

---

## Phase 3: Multi-Language Expansion

### Language Priority

| Language | Priority | Rationale |
|---|---|---|
| **Thai** | 1st | Largest local audience. Most competitors are English-only. First-mover advantage for Thai SEO. |
| **Chinese (Simplified)** | 2nd | #1 international tourist demographic in Bangkok. High-value golfers. |
| **Japanese** | 3rd | Significant Bangkok golf demographic. High spending power. Lower volume but high conversion. |

### URL Structure

Subdirectory prefixes with no prefix for English (default):

```
English:   www.len.golf/location/golf-near-chidlom/
Thai:      www.len.golf/th/location/golf-near-chidlom/
Chinese:   www.len.golf/zh/location/golf-near-chidlom/
Japanese:  www.len.golf/ja/location/golf-near-chidlom/
```

**Why subdirectories:**
- All existing English URLs remain unchanged -- zero SEO disruption
- All link equity and backlinks on `len.golf` are inherited by `/th/`, `/zh/`, `/ja/`
- Subdomains would create separate domain authorities starting from zero
- Slugs stay in English across all locales (industry standard: Airbnb, Booking.com, TripAdvisor all do this)

### Technical Approach: `next-intl`

- Next.js 15 App Router's recommended i18n library
- `[locale]` dynamic segment wrapping all page routes
- `localePrefix: 'as-needed'` -- English gets no prefix, others get `/th/`, `/zh/`, `/ja/`
- Middleware handles locale detection and routing

**Directory restructure:**
```
app/
  layout.tsx              <-- Minimal root layout
  [locale]/
    layout.tsx            <-- Current root layout, now locale-aware
    page.tsx              <-- Homepage
    golf/page.tsx
    events/page.tsx
    location/[slug]/page.tsx
    faq/[slug]/page.tsx
    activities/[slug]/page.tsx
    hotels/[slug]/page.tsx
    best/[slug]/page.tsx
    compare/[slug]/page.tsx
    seasonal/[slug]/page.tsx
    cost/[slug]/page.tsx
    ...
  sitemap.ts              <-- Stays at root (not under [locale])
  robots.ts               <-- Stays at root
  api/                    <-- API routes stay at root
i18n/
  routing.ts              <-- Locale configuration
  request.ts              <-- next-intl server request config
  navigation.ts           <-- Locale-aware Link/router
messages/
  en.json                 <-- UI strings: nav, footer, buttons, section headers
  th.json
  zh.json
  ja.json
middleware.ts             <-- Locale detection and routing
```

### Database Schema for Translations

**Approach: Separate rows per locale** (not JSONB columns)

Add `locale` and `canonical_slug` columns to `location_pages` (and future `seo_pages`):

```sql
ALTER TABLE location_pages ADD COLUMN locale TEXT NOT NULL DEFAULT 'en';
ALTER TABLE location_pages ADD COLUMN canonical_slug TEXT;
CREATE UNIQUE INDEX idx_location_pages_slug_locale ON location_pages(canonical_slug, locale);
```

Each translation is a separate row:
| canonical_slug | locale | h1_title | status |
|---|---|---|---|
| golf-near-chidlom | en | Indoor Golf Near Chidlom | published |
| golf-near-chidlom | th | กอล์ฟจำลองใกล้ชิดลม | published |
| golf-near-chidlom | zh | 奇隆附近的室内高尔夫 | draft |

**Why separate rows:**
- `LocationPage` TypeScript type gains one field (`locale: string`), nothing else changes
- Every query adds one `.eq('locale', locale)` filter
- Components receive the same data shape -- no refactoring needed
- Can publish translations independently (each row has its own `status`)
- English fallback: if visitor hits `/zh/location/golf-near-chidlom/` but Chinese isn't published, show English instead of 404

### Hreflang Tags

Every page declares all language variants via Next.js `Metadata.alternates.languages`:

```html
<link rel="alternate" hreflang="en" href="https://www.len.golf/golf/" />
<link rel="alternate" hreflang="th" href="https://www.len.golf/th/golf/" />
<link rel="alternate" hreflang="zh" href="https://www.len.golf/zh/golf/" />
<link rel="alternate" hreflang="ja" href="https://www.len.golf/ja/golf/" />
<link rel="alternate" hreflang="x-default" href="https://www.len.golf/golf/" />
```

### What Gets Translated Where

| Content Type | Source | Translation Storage |
|---|---|---|
| Navigation, buttons, section headers | `messages/en.json` | `messages/th.json`, `messages/zh.json`, `messages/ja.json` |
| Location page body content (18 text fields) | Supabase `location_pages` | Separate Supabase rows with `locale` column |
| New SEO pages (FAQ, Activities, etc.) | Supabase `seo_pages` | Separate Supabase rows with `locale` column |
| Blog posts | Supabase `blog_posts` | Separate rows (Phase 3+) |
| Homepage / core page marketing copy | Hardcoded in page components | Message keys in `messages/*.json` |
| JSON-LD structured data | `lib/jsonld.ts` | Locale-aware functions with `inLanguage` field |

### Multi-Language Rollout

| Step | Timeline | Scope |
|---|---|---|
| Infrastructure | Week 1-2 of Phase 3 | Install `next-intl`, restructure app directory, extract UI strings |
| Thai | Week 2-4 | Translate UI strings + top-traffic location pages, launch `/th/` |
| Chinese | Week 5-8 | Translate UI strings + all location pages, launch `/zh/` |
| Japanese | Week 9-12 | Translate UI strings + all location pages, launch `/ja/` |
| Blog translations | Month 4+ | Translate top-performing blog posts if location pages show traction |

---

## AQI Widget Feature

### Concept

Display live Air Quality Index data on the website to promote indoor golf during Bangkok's pollution season (Nov-Mar). When outdoor AQI is unhealthy, the widget becomes a compelling marketing message: "Outdoor AQI: 167 (Unhealthy) -- Play golf indoors at LENGOLF."

### Technical Details

**API:** Google Air Quality API (part of Google Maps Platform)

**Data available:** US EPA AQI (0-500 scale), PM2.5, PM10, O3, NO2, SO2, CO, health recommendations

**Cost:** Free. With 30-minute caching: ~1,488 requests/month. Google gives 40,000 free requests/month ($200 credit). Total cost: $0.

**API key:** Use existing `GOOGLE_MAPS_API_KEY` from `.env.local`. Just enable "Air Quality API" on the Google Cloud Console project.

**Data freshness:** Source data updates hourly. 30-minute server-side cache is ideal.

### Implementation Architecture

```
.env.local
  GOOGLE_MAPS_API_KEY=...         (server-side only, no NEXT_PUBLIC_ prefix)

app/api/aqi/route.ts              (API route with in-memory cache + CDN headers)
components/AqiWidget.tsx           (client component, fetches from /api/aqi/)
```

- API route calls Google Air Quality API for lat/lng 13.7441, 100.5410 (Mercury Ville)
- In-memory cache prevents redundant API calls
- `Cache-Control: public, s-maxage=1800, stale-while-revalidate=3600` for Vercel CDN caching
- Client component fetches from `/api/aqi/` and renders conditionally

### Widget Messaging Tiers

| AQI Range | Category | Widget Behavior |
|---|---|---|
| 0-50 | Good | Hide widget entirely, or show minimal "AQI: 35 (Good)" |
| 51-100 | Moderate | Small banner: "Air quality is moderate. Enjoy golf in air-conditioned comfort." |
| 101-150 | Unhealthy for Sensitive Groups | Visible banner: "Outdoor AQI: 128 -- Sensitive to pollution? Play golf indoors." |
| 151-200 | Unhealthy | Prominent banner: "Outdoor AQI: 167 (Unhealthy) -- Skip the haze. Play indoors." |
| 201+ | Very Unhealthy / Hazardous | Most prominent: "Outdoor AQI: 234 (Very Unhealthy) -- Stay indoors. Book a bay." |

### Placement

- **Homepage** -- banner near hero or just below
- **Golf page** -- most relevant context for people deciding where to play
- **All pages** -- subtle top ribbon during pollution season (AQI > 100)

### Bangkok AQI Seasonality

| Period | Typical US EPA AQI | Widget Impact |
|---|---|---|
| Nov-Mar (pollution season) | 100-200+ | Maximum impact -- widget is a powerful marketing tool |
| Peak bad days (Jan-Feb) | 150-250 | Widget sells itself |
| Apr-May | 50-100 | Moderate impact |
| Jun-Oct (monsoon) | 20-60 | Low impact -- widget hidden or minimal |

### Google Cloud Console Setup

1. Go to console.cloud.google.com
2. Select the project where the existing Maps API key lives
3. APIs & Services > Library > search "Air Quality API" > Enable
4. APIs & Services > Credentials > click API key > verify Air Quality API is allowed

---

## Technical Architecture

### New Supabase Table: `seo_pages`

A single new table for all new page types, using a `page_type` discriminator and JSONB `content` field for type-specific data. The existing `location_pages` table stays as-is.

**Why single table with JSONB:**
- All page types share the same query patterns: `getBySlug`, `generateStaticParams`, filter by type/status
- 7 separate tables would duplicate columns, RLS policies, indexes, triggers, and TypeScript types
- Common fields (slug, title, status, meta) are indexed real columns for fast queries
- Type-specific content goes in JSONB `content` field -- only read as a blob, never filtered on

### SQL Migration

```sql
-- Enums
CREATE TYPE seo_page_type AS ENUM (
  'faq',
  'activity_occasion',
  'hotel_concierge',
  'best_of_listicle',
  'comparison',
  'seasonal_event',
  'price_guide',
  'explainer'
);

CREATE TYPE seo_page_status AS ENUM (
  'draft',
  'published',
  'archived'
);

-- Table
CREATE TABLE seo_pages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type       seo_page_type    NOT NULL,
  slug            TEXT             NOT NULL,
  title           TEXT             NOT NULL,
  meta_description TEXT,
  featured_image  TEXT,
  schema_markup   JSONB,
  status          seo_page_status  NOT NULL DEFAULT 'draft',
  category        TEXT,
  locale          TEXT             NOT NULL DEFAULT 'en',
  content         JSONB            NOT NULL DEFAULT '{}'::jsonb,
  related_slugs   TEXT[],
  created_at      TIMESTAMPTZ      NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ      NOT NULL DEFAULT now(),

  CONSTRAINT seo_pages_slug_locale_unique UNIQUE (slug, locale)
);

-- Indexes
CREATE INDEX idx_seo_pages_slug_status ON seo_pages (slug, status);
CREATE INDEX idx_seo_pages_type_status ON seo_pages (page_type, status);
CREATE INDEX idx_seo_pages_category ON seo_pages (category) WHERE status = 'published';
CREATE INDEX idx_seo_pages_content_gin ON seo_pages USING GIN (content);

-- Auto-update trigger
CREATE OR REPLACE FUNCTION update_seo_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_seo_pages_updated_at
  BEFORE UPDATE ON seo_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_seo_pages_updated_at();

-- RLS
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can read published seo_pages"
  ON seo_pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "Service role full access on seo_pages"
  ON seo_pages FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

### JSONB `content` Shape Per Page Type

#### `faq`
```json
{
  "answer_intro": "Direct answer, first paragraph",
  "answer_body": "Expanded content (markdown)",
  "related_questions": [{ "slug": "...", "question": "..." }],
  "related_service_pages": ["/golf", "/lessons"]
}
```

#### `activity_occasion`
```json
{
  "occasion_type": "rainy-day",
  "intro": "...",
  "why_lengolf": "...",
  "other_activities": [{ "name": "...", "description": "..." }],
  "seasonal_relevance": [6, 7, 8, 9, 10],
  "target_audience": "couples"
}
```

#### `hotel_concierge`
```json
{
  "hotel_name": "Grand Hyatt Erawan Bangkok",
  "hotel_distance_m": 450,
  "walking_time_mins": 6,
  "walking_directions": "...",
  "hotel_star_rating": 5,
  "hotel_type": "luxury",
  "guest_profile": "...",
  "nearby_restaurants": [{ "name": "...", "cuisine": "...", "distance_m": 100 }],
  "nearby_activities": [{ "name": "...", "type": "...", "distance_m": 100 }],
  "google_maps_embed": "..."
}
```

#### `best_of_listicle`
```json
{
  "year": 2026,
  "intro": "...",
  "list_items": [{
    "rank": 1,
    "name": "...",
    "description": "...",
    "pros": ["..."],
    "cons": ["..."],
    "is_lengolf": true,
    "address": "...",
    "website": "..."
  }],
  "conclusion": "..."
}
```

#### `comparison`
```json
{
  "option_a": { "name": "...", "description": "...", "pros": ["..."], "cons": ["..."] },
  "option_b": { "name": "...", "description": "...", "pros": ["..."], "cons": ["..."] },
  "verdict": "...",
  "comparison_table": [{ "feature": "...", "option_a": "...", "option_b": "..." }]
}
```

#### `seasonal_event`
```json
{
  "season_months": [12],
  "event_type": "christmas",
  "intro": "...",
  "why_lengolf": "...",
  "packages_relevant": ["corporate_event", "party_package"],
  "booking_deadline_note": "..."
}
```

#### `price_guide`
```json
{
  "intro": "...",
  "price_breakdown": [{ "item": "...", "price": "...", "notes": "..." }],
  "comparison_with_alternatives": "...",
  "value_proposition": "...",
  "last_verified": "2026-02-01"
}
```

#### `explainer`
```json
{
  "intro": "Direct answer (40-70 words)",
  "sections": [{ "heading": "...", "body": "... (markdown)" }],
  "key_takeaways": ["..."],
  "related_services": ["/golf", "/lessons"],
  "comparison_table": [{ "feature": "...", "simulator": "...", "real_golf": "..." }]
}
```

### Next.js Routing for New Page Types

Each page type gets its own route folder:

```
app/[locale]/faq/[slug]/page.tsx
app/[locale]/activities/[slug]/page.tsx
app/[locale]/hotels/[slug]/page.tsx
app/[locale]/best/[slug]/page.tsx
app/[locale]/compare/[slug]/page.tsx
app/[locale]/seasonal/[slug]/page.tsx
app/[locale]/cost/[slug]/page.tsx
app/[locale]/guide/[slug]/page.tsx
```

All follow the same pattern as `app/location/[slug]/page.tsx`:
- `generateStaticParams()` fetches slugs from `seo_pages` filtered by `page_type`
- `generateMetadata()` builds SEO tags from the row data
- `revalidate = 3600` for ISR
- Component renders type-specific sections based on `content` JSONB

### TypeScript Types

Discriminated union on `page_type` provides full type safety:

```typescript
// types/seo-pages.ts
export type SeoPageType = 'faq' | 'activity_occasion' | 'hotel_concierge' | 'best_of_listicle' | 'comparison' | 'seasonal_event' | 'price_guide' | 'explainer'

interface SeoPageBase {
  id: string
  page_type: SeoPageType
  slug: string
  title: string
  meta_description: string | null
  featured_image: string | null
  schema_markup: Record<string, unknown> | null
  status: 'draft' | 'published' | 'archived'
  category: string | null
  locale: string
  related_slugs: string[] | null
  created_at: string
  updated_at: string
}

// Each page type = SeoPageBase & { page_type: 'faq'; content: FaqContent }
// Type guard functions: isFaqPage(page), isHotelConciergePage(page), etc.
```

### Sitemap Updates

`app/sitemap.ts` must include all new page types. Query `seo_pages` grouped by `page_type` and generate entries with proper URL prefixes and hreflang alternates.

---

## Rollout Timeline

### Phase 1: New Page Types (Weeks 1-8)

| Week | Milestone | Pages |
|---|---|---|
| 1 | Create `seo_pages` table in Supabase. Build TypeScript types and query library. | 0 |
| 2 | Build page components: FAQ template, Activity-Occasion template | 0 |
| 3 | Build page components: Hotel Concierge template, Price Guide template | 0 |
| 3-4 | Generate content for Phase 1A (Activity-Occasion pages) | 10 |
| 4-5 | Generate content for Phase 1B (FAQ pages) | 15 |
| 5-6 | Generate content for Phase 1C (Hotel Concierge pages) | 12 |
| 6-7 | Generate content for Phase 1D (Price Guide pages) | 6 |
| 7 | Generate content for Phase 1E (Explainer pages) | 3 |
| 7-8 | Deploy Phase 1 pages in waves (10-20 per wave). Update sitemap. Submit to Search Console. | -- |

**Phase 1 total: 46 new pages**

### Phase 2: Listicles, Comparisons, Seasonal, New Templates + Locations (Weeks 9-16)

| Week | Milestone | Pages |
|---|---|---|
| 9-10 | Build page components: Best Of, Comparison, Seasonal templates | 0 |
| 10-11 | Generate content for Phase 2A (Best Of listicles) | 7 |
| 11-12 | Generate content for Phase 2B (Comparison pages) | 6 |
| 12-13 | Generate content for Phase 2C (Seasonal pages) | 9 |
| 13-14 | Build Team Building + Private Party location templates. Generate content for 8 locations each. | 16 |
| 14-16 | Generate content for new location pages (Tier 1-4 additions) | 63 |

**Phase 2 total: 101 new pages**

### Phase 3: Multi-Language (Weeks 17-28)

| Week | Milestone |
|---|---|
| 17-18 | i18n infrastructure: install `next-intl`, restructure app directory, extract UI strings |
| 19-20 | Thai launch: translate UI strings + top-traffic pages, launch `/th/` |
| 21-24 | Chinese launch: translate UI strings + all pages, launch `/zh/` |
| 25-28 | Japanese launch: translate UI strings + all pages, launch `/ja/` |

### AQI Widget (Can be built anytime -- independent of phases)

| Step | Effort |
|---|---|
| Enable Air Quality API on Google Cloud Console | 10 minutes |
| Build `app/api/aqi/route.ts` | 1-2 hours |
| Build `components/AqiWidget.tsx` | 1-2 hours |
| Add to homepage + golf page | 30 minutes |

---

## Appendix: Complete Page Inventories

### Total New Pages by Phase

| Phase | Page Type | Count |
|---|---|---|
| 1A | Activity-Occasion | 10 |
| 1B | FAQ / Answer | 15 |
| 1C | Hotel Concierge | 12 |
| 1D | Price / Cost Guide | 6 |
| 1E | Explainer (LLM-optimized) | 3 |
| **Phase 1 subtotal** | | **46** |
| 2A | Best Of Listicles | 7 |
| 2B | Comparison | 6 |
| 2C | Seasonal / Event | 9 |
| 2D | Team Building + Private Party (location) | 16 |
| 2E | New locations with existing + new templates | 63 |
| **Phase 2 subtotal** | | **101** |
| 3 | Multi-language (translations of all above) | x3 languages |
| **Total (English only)** | | **147 new pages** |

### Combined with existing pages:
- Existing: 9 core + 85 location + blog = ~95 pages
- After Phase 1: +46 pages = 141 pages
- After Phase 2: +101 pages = 242 pages
- After Phase 3: x4 languages = 968 pages (including translations)

### Indexation Gates (Required to Proceed Between Waves)

Publish pages in waves of 10–20 pages. After each wave, wait **10–14 days** before publishing the next.

**Minimum thresholds to proceed:**
- ≥70% of wave pages indexed
- ≤5% marked "Crawled – currently not indexed"
- No spike in "Duplicate, Google chose different canonical"
- No site-wide traffic decline
- No manual action in Search Console

**If thresholds not met:**
- Pause publishing immediately
- Improve internal linking to underperforming pages
- Increase content depth on pages stuck in "Crawled – currently not indexed"
- Re-submit sitemap to Search Console
- Wait another 10–14 days before re-evaluating

**Red flags (stop all publishing and investigate):**
- Indexation below 40% for any wave
- Engagement 50%+ below site average
- Duplicate content warnings in Search Console
- Manual action in Search Console

---

## Internal Linking Architecture

At ~1,000 pages (multilingual), internal links become the ranking engine. All pages must follow structured hub-spoke relationships. **Max clicks from homepage: ≤3.**

### Hub → Spoke Relationships

```
Homepage
├── /golf (hub) → location pages, price guides, comparison pages
├── /events (hub) → corporate event locations, seasonal pages, team building
├── /lessons (hub) → lesson location pages, FAQ pages
├── /activities/ (hub index) → all activity-occasion pages
├── /faq/ (hub index) → all FAQ pages
├── /hotels/ (hub index) → all hotel concierge pages
├── /best/ (hub index) → all listicle pages
├── /compare/ (hub index) → all comparison pages
├── /seasonal/ (hub index) → all seasonal pages
└── /cost/ (hub index) → all price guide pages
```

### Cross-Type Linking Rules

Every page must include contextual links to related pages across types:

**Activity-Occasion pages link to:**
- 1 relevant location page (e.g., "indoor activities" → "indoor-golf-near-chidlom")
- 1 price guide page (e.g., → "how-much-does-golf-cost-bangkok")
- 1 comparison page (e.g., → "indoor-golf-vs-outdoor-golf-bangkok")

**FAQ pages link upward to:**
- 1 service page (/golf, /lessons, /events)
- 1 location page (nearest relevant location)
- 1 related FAQ page (via `related_questions` in JSONB)

**Hotel Concierge pages link to:**
- "Best Things to Do Near Chidlom" listicle
- /golf page (booking CTA)
- 1 activity-occasion page (e.g., "rainy-day-activities" or "things-to-do-at-night")

**Price Guide pages link to:**
- Relevant service page (/golf, /lessons, /events)
- 1 comparison page
- 2-3 location pages

**Best Of / Listicle pages link to:**
- Relevant service page
- 1 price guide page
- 2-3 location pages

**Comparison pages link to:**
- Both service pages being compared
- 1 price guide page
- 1 FAQ page

**Seasonal pages link to:**
- Relevant activity-occasion page
- /events page
- 1 price guide page

**Location pages link to:**
- Hub service page
- 1-2 nearby hotel concierge pages
- 1 relevant activity or seasonal page

### Implementation

Store cross-links in the `related_slugs` field on `seo_pages` and render them as contextual in-content links (not just a "Related pages" footer block). Each page template must include a `RelatedContent` component that renders 3-5 contextual links within the body copy.

---

## Content Quality Controls

### Hotel Concierge Thin-Content Prevention

Hotel concierge pages are high risk for being algorithmically discounted as "doorway pages" if too similar.

**Minimum unique content per hotel page:**
- Hotel-specific intro paragraph (not templated)
- Unique walking directions text with specific landmarks
- Different nearby restaurant mix (minimum 3 unique restaurants per page)
- Hotel-specific guest profile and activity suggestions
- "Is this walkable?" section with honest assessment per hotel

**Hard rule:** If two hotel pages share more than 30% identical body copy, do not publish the second page until differentiated.

### Answer-First Formatting (All Page Types)

For every page type, the first paragraph must directly answer the implied search query:
- 40–70 words maximum
- No fluff intros or preambles
- State the key fact immediately

**Example:** "Indoor golf in Bangkok typically costs 500–1,000 THB per hour, depending on venue, time, and group size. At LENGOLF, bay rental starts at 500 THB/hour for up to 5 people — just 100 THB per person."

### Consistent Factual Claims

Key facts must be repeated **verbatim** across all pages (not creatively rewritten) to build trust with both Google and LLMs:
- Price: "500 THB/hour for up to 5 people"
- Location: "Mercury Ville, BTS Chidlom (Exit 4)"
- Indoor positioning: "air-conditioned, rain-proof, open until late"
- Equipment: "Premium club rental from 150 THB/hour"

### Neutral Tone > Marketing Tone

All content, especially listicles and comparisons, must maintain a neutral, helpful tone:
- Admit when competitors are better for certain use cases
- Explicitly say "If you want X, choose Y — if you want Z, choose us"
- Include honest pros/cons for LENGOLF alongside competitors
- No superlatives without evidence

---

## E-E-A-T & Real-World Signals

Google is increasingly sensitive to "real business proof," especially for local intent. Programmatic SEO pages need real-world signals to survive.

### Required on All Guide/Content Pages

- **Author attribution:** "Updated by LENGOLF Bangkok" with date on all guides and cost pages
- **Photo galleries:** Real venue photos (not stock) on activity pages, team building, private party, and seasonal pages
- **Google Reviews:** Embed 2-3 selected Google Reviews on high-traffic pages (activity-occasion, hotel concierge, best-of)
- **Last updated dates:** Visible on price guides and seasonal pages

### Page-Type Specific E-E-A-T

| Page Type | Required Real-World Signals |
|---|---|
| Activity-Occasion | 2+ venue photos, 1 customer testimonial |
| Hotel Concierge | Walking route photo, hotel exterior photo |
| Price Guide | "Prices last verified: {date}", competitor price sources cited |
| Best Of Listicle | Author attribution, photos of listed venues |
| Comparison | Side-by-side real photos, cited sources for competitor data |
| Seasonal | Past event photos, booking count social proof |

---

## Technical Quality Controls

### Canonical Strategy

- All pages are **self-canonical** (including FAQ pages)
- Location pages with locale variants: canonical points to the locale-specific URL
- No cross-locale canonicalization (each language version is its own canonical)

### Noindex Policy

Apply `noindex` to:
- All pages with `status = 'draft'` (enforced at the layout level)
- Draft translations (pages where the locale version exists but isn't `published`)
- Empty seasonal pages that are out of season (optional — evaluate per page)

### Image Optimization

Hotel concierge and listicle pages will be image-heavy. Required standards:
- All images served via Next.js `<Image>` component (automatic WebP/AVIF, lazy loading, srcset)
- Maximum image width: 1200px for hero images, 800px for inline images
- Alt text required on all images (descriptive, keyword-aware, not stuffed)
- Consider a shared image CDN or Supabase Storage bucket for venue/hotel photos

---

## LLM Search Optimization

LLM search (ChatGPT, Perplexity, Gemini) feeds on traditional SEO signals but has distinct preferences. Our content strategy is already well-aligned — these additions tune it specifically for AI citation.

### Why Our Strategy Already Works for LLMs

- **FAQ pages** = perfect answer units (LLMs love direct Q&A)
- **Comparison pages** = LLM gold (structured pros/cons are easy to cite)
- **Cost guides** = high-confidence citation material (specific numbers)
- **Honest listicles** (with real competitors) = trust signal for AI systems

### Additional LLM-Specific Tactics

**1. Comparison tables everywhere**
Not just on `/compare/` pages. Add mini comparison tables to:
- Activity-occasion pages ("Why choose indoor golf vs. other options")
- Hotel concierge pages ("Activities near {hotel}: comparison")
- Seasonal pages ("Indoor vs outdoor options this season")

LLMs extract structured differences from tables extremely easily.

**2. Consistent entity association**
Ensure "LENGOLF" + "Bangkok" + "indoor golf" + "golf simulator" appear together consistently across pages so LLMs strongly associate the entity with these concepts.

**3. Structured data (JSON-LD)**
Maximize schema markup on all page types:
- FAQ pages: `FAQPage` schema
- Price guides: `Product` + `Offer` schema
- Hotel concierge: `LocalBusiness` + `Place` schema
- Comparisons: `ItemList` schema
- Activity pages: `Event` or `LocalBusiness` schema

---

**Status:** Strategy documented with quality controls, linking architecture, and LLM optimization. Ready for Phase 1 implementation.
