# Pattaya Phase 2 — Batch 1 Verification Report

Prepared: 2026-04-20
Courses: 10
Status: **1 BLOCKED · 8 REVIEW_REQUIRED · 1 APPROVED (provisional)**

---

## Summary table

| # | Course | Slug | Status | Key issues |
|---|---|---|---|---|
| 1 | Pattana Golf Club & Resort | `pattana-golf-club-resort` | REVIEW_REQUIRED | Green fee is all-in package (caddie + cart included) — fee structure needs clarification |
| 2 | Eastern Star Country Club & Resort | `eastern-star-country-club` | REVIEW_REQUIRED | Fee rate type ambiguous (Club Thailand member vs visitor rate); caddie/cart fee unknown |
| 3 | Crystal Bay Golf Club | `crystal-bay-golf-resort` | REVIEW_REQUIRED | Designer unconfirmed; weekday/weekend split assumed same; no official website |
| 4 | Pattaya Country Club & Resort | `pattaya-country-club` | REVIEW_REQUIRED | No phone, no website; weekday/weekend fee split unclear; designer unknown |
| 5 | Phoenix Gold Golf & Country Club | `phoenix-gold-golf-club-pattaya` | APPROVED (provisional) | Fees confirmed from official website; caddie/cart fee split not published |
| 6 | St Andrews 2000 Golf Club | `st-andrews-2000` | **BLOCKED** | Green fees null; course was closed for renovation (Dec 2025 reopen planned) — operational status unconfirmed |
| 7 | Khao Kheow Country Club | `khao-kheow-country-club` | REVIEW_REQUIRED | Year opened unknown; low-season green fee not confirmed |
| 8 | Mountain Shadow Golf Club | `mountain-shadow-golf-club` | REVIEW_REQUIRED | Weekday/weekend green fee split unclear; no official website |
| 9 | Pleasant Valley Golf & Country Club | `pleasant-valley-golf-country-club` | REVIEW_REQUIRED | Weekday/weekend green fee split unclear; no official website; cart policy needs confirmation |
| 10 | Rayong Green Valley Country Club | `rayong-green-valley` | REVIEW_REQUIRED | Phone may be shared with nearby St Andrews 2000 (same number in search results); no website |

---

## Course-by-course detail

---

### Course 1 — Pattana Golf Club & Resort

**Slug:** `pattana-golf-club-resort`
**Status:** REVIEW_REQUIRED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Pattana Golf Club & Resort | official-website | High |
| Province | Chonburi | web-search | High |
| Designer | Gasson | web-search | Medium — full firm name not confirmed |
| Holes | 27 | official-website | High |
| Par | 72 (for 18 holes) | web-search | High |
| Year opened | 2004 | web-search | High |
| Green fee weekday | 2,300 THB | web-search (fairwaysofeden.com) | Medium — **all-in package** (caddie + cart included) |
| Green fee weekend | 3,000 THB | web-search (fairwaysofeden.com) | Medium — all-in package |
| Caddie fee | 0 (included) | derived | Low — not confirmed as a standalone figure |
| Cart fee | 0 (included) | derived | Low — not confirmed as a standalone figure |
| Caddie required | true | web-search | High |
| Cart required | true | web-search | High |
| Website | pattana.co.th | official-website | High |
| Phone | +66 38 318 999 | web-search | High |
| Latitude/longitude | 13.19, 101.06 | model | Low — approximate |
| Distance from Bangkok | 95 km / 75 min | model | Medium |
| Google Maps URL | null | — | Not found |

**Disputes requiring your input:**

**1a. Green fee structure**
- JSON stores 2,300/3,000 THB as the "green fee" but these are all-in package rates (caddie + cart bundled).
- The Club Thailand member rate is 2,800/3,500 THB — also all-in per the source.
- We do not have a confirmed green-fee-only rate.
- **Your call:** Accept 2,300/3,000 as the published rate (noting it's all-inclusive), OR note as unknown and ask a golf agent.

**Prose flags:**
- No superlatives found. No fabricated specifics. PASS.

**Schema completeness:**
- `google_maps_url` — null (tracked in data-gaps)
- All other required fields: present

**SEO:**
- Proposed meta description: "Play Pattana Golf Club & Resort's 27-hole championship course in Sriracha, Chonburi. Green fees, caddie info, and club rental for Bangkok golfers." — 151 chars ✓

---

### Course 2 — Eastern Star Country Club & Resort

**Slug:** `eastern-star-country-club`
**Status:** REVIEW_REQUIRED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Eastern Star Country Club & Resort | official-website | High |
| Province | Rayong | web-search | High |
| Designer | Robert Trent Jones Jr. | web-search | High — confirmed by multiple sources |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Year opened | 1992 | web-search | High |
| Green fee weekday | 2,550 THB | web-search (Club Thailand) | **Medium — member rate, not walk-in visitor rate** |
| Green fee weekend | 2,750 THB | web-search (Club Thailand) | **Medium — member rate** |
| Caddie fee | null | — | Not confirmed |
| Cart fee | null | — | Not confirmed |
| Website | easternstargolfcourse.com | official-website | High |
| Phone | +66 38 630 4103 | web-search | High |
| Latitude/longitude | 12.80, 101.36 | model | Low — approximate |
| Distance from Bangkok | 185 km / 130 min | model | Medium |

**Disputes requiring your input:**

**2a. Green fee rate type**
- JSON uses Club Thailand low-season member rate (2,550/2,750 THB).
- Visitor all-in rate: 4,350 THB weekday / 4,850 THB weekend (includes green fee + caddie + cart).
- Green fee only (separate from caddie/cart) not confirmed.
- **Your call:** Accept 2,550/2,750 as an approximate green-fee-only rate and note caddie/cart separate (likely ~400/700 THB standard) — OR flag as needing direct confirmation.

**Prose flags:**
- "one of only five courses in Thailand bearing a Jones Jr. design" — sourced from golfasian.com web search result; treat as verified claim. PASS.

**Schema completeness:**
- `google_maps_url` — null
- `caddie_fee_thb`, `cart_fee_thb` — null (not required for publishing, tracked)

**SEO:**
- Proposed meta description: "Eastern Star Country Club — Robert Trent Jones Jr. design in Rayong. Green fees, 18-hole course guide, and Bangkok golf club rental." — 138 chars ✓

---

### Course 3 — Crystal Bay Golf Club

**Slug:** `crystal-bay-golf-resort`
**Status:** REVIEW_REQUIRED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Crystal Bay Golf Club | web-search | High |
| Province | Chonburi | web-search | High |
| Designer | null | — | **Not confirmed** |
| Holes | 27 | web-search | High |
| Par | 72 (for 18 holes) | web-search | High |
| Year opened | 1988 | web-search | High |
| Green fee weekday | 1,350 THB | web-search | Medium |
| Green fee weekend | 1,350 THB | web-search (assumed same) | Low — weekday/weekend split not confirmed |
| Caddie fee | null | — | Not confirmed |
| Cart fee | null | — | Not confirmed |
| Website | null | — | No official website found |
| Phone | +66 38 349 370 | web-search | Medium |

**Disputes requiring your input:**

**3a. Designer**
- One web source cited "Thai Takenaka" — this is unverified and the name format is unusual (Takenaka is a Japanese firm, not typically operating as "Thai Takenaka"). Could not confirm from official sources. Marked null.
- **Your call:** Accept null, or provide the correct designer name if you have it.

**3b. Weekend green fee**
- Only a single rate of 1,350 THB found; weekday/weekend distinction not confirmed.
- **Your call:** Accept 1,350/1,350 (same rate) or note as unknown.

**Schema completeness:**
- `google_maps_url` — null
- `website` — null (required for sameAs schema; can omit if genuinely absent)
- `designer` — null (non-required; noted)

**SEO:**
- Proposed meta description: "Crystal Bay Golf Club — 27-hole course in Sriracha, Chonburi, open since 1988. Green fees, course guide, and golf club rental from Bangkok." — 145 chars ✓

---

### Course 4 — Pattaya Country Club & Resort

**Slug:** `pattaya-country-club`
**Status:** REVIEW_REQUIRED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Pattaya Country Club & Resort | web-search | High |
| Province | Chonburi | web-search | High |
| Designer | null | — | Not found |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Year opened | 1993 | web-search | High |
| Green fee weekday | 2,000 THB | web-search | Medium |
| Green fee weekend | 2,000 THB | assumed same | Low |
| Caddie fee | null | — | Not confirmed |
| Cart fee | null | — | Not confirmed |
| Club rental | 1,200 THB | web-search (golfasian) | Medium |
| Website | null | — | No official website found |
| Phone | null | — | Not found |

**Disputes requiring your input:**

**4a. Fee split**
- 2,000 THB rate found but weekday/weekend distinction not confirmed.
- **Your call:** Accept 2,000/2,000 or note unknown.

**4b. Contact**
- No phone or website found. Facebook page (@pattayacountryclub) exists. This course is hard to book directly.
- **Your call:** Accept null for both (will be omitted from structured data) or provide direct contact details.

**Prose flags:**
- "extensively renovated" — mentioned per booking agents' descriptions. Specific year 2014 came from web search result. No fabrication found. PASS.

**Schema completeness:**
- `google_maps_url` — null
- `website` — null
- `phone` — null
- All other required fields: present (with model-sourced coordinates)

**SEO:**
- Proposed meta description: "Pattaya Country Club & Resort — 18-hole par-72 course 25 minutes from Pattaya city. Green fees, course guide, and golf club rental." — 140 chars ✓

---

### Course 5 — Phoenix Gold Golf & Country Club

**Slug:** `phoenix-gold-golf-club-pattaya`
**Status:** APPROVED (provisional)

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Phoenix Gold Golf & Country Club | official-website | High |
| Province | Chonburi | official-website | High |
| Designer | Dennis Griffith | web-search | High — confirmed by multiple sources |
| Holes | 27 | official-website | High |
| Par | 72 (for 18 holes) | web-search | High |
| Year opened | 1993 | web-search | High |
| Green fee weekday | 3,000 THB | **official-website** | High — confirmed from phoenixgoldgolf.com/price-list |
| Green fee weekend | 3,500 THB | **official-website** | High |
| Caddie fee | null | — | Not published on official site |
| Cart fee | null | — | Not published on official site |
| Website | phoenixgoldgolf.com | official-website | High |
| Phone | +66 38 239 391 | official-website | High |

**Notes:**
- Green fees confirmed directly from official price list — highest confidence in this batch.
- Caddie and cart fees not separately listed on the official site; standard Pattaya-area rates (~400 caddie, ~700 cart) are likely but not confirmed. Non-blocking.
- Coordinates model-sourced — approximate.
- Google Maps URL null — tracked in data-gaps.

**Prose flags:**
- "signature hole is the par-5 9th (493 yards)" — sourced from web search (theclassroompattaya.com). Treat as verified. PASS.

**Schema completeness:** All required fields present (latitude/longitude approximate).

**SEO:**
- Proposed meta description: "Phoenix Gold Golf & Country Club — 27-hole parkland course in Pattaya, 3,000 THB weekday. Course guide and golf club rental from Bangkok." — 145 chars ✓

---

### Course 6 — St Andrews 2000 Golf Club

**Slug:** `st-andrews-2000`
**Status:** ⛔ BLOCKED

| Field | Value | Source | Confidence |
|---|---|---|---|
| Name | St Andrews 2000 Golf Club | web-search | High |
| Province | Rayong | web-search | High |
| Designer | Desmond Muirhead | web-search | High |
| Holes | 18 | web-search | High |
| Par | 74 | web-search | High — unusual par due to two par-6 holes |
| Year opened | 2000 | web-search | High |
| Green fee weekday | **null** | — | **BLOCKER** |
| Green fee weekend | **null** | — | **BLOCKER** |
| Cart fee | 900 THB/pax | web-search | Medium |
| Website | Wix site (unverified) | web-search | Low |
| Phone | null | — | Not confirmed |

**Blockers:**
- **B1. Green fees null:** Course was listed on GolfDD as "closed for renovation, opens Dec" (December 2025). As of April 2026, operational status is unconfirmed. Green fees cannot be published as null.
- **B2. Phone number not confirmed:** Search results returned the same phone numbers as Rayong Green Valley Country Club — these courses are adjacent in Samnakthon, Ban Chang. The shared number is suspicious and needs independent verification.

**Your call on St Andrews 2000:**
- a) Confirm the course is open as of April 2026 and provide a current green fee → removes blocker
- b) Hold this course from the batch and publish remaining 9 → recommended if you cannot confirm

---

### Course 7 — Khao Kheow Country Club

**Slug:** `khao-kheow-country-club`
**Status:** REVIEW_REQUIRED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Khao Kheow Country Club | official-website | High |
| Province | Chonburi | official-website | High |
| Designer | Perry Dye and Peter Dye | web-search | High |
| Holes | 27 | web-search | High |
| Par | 72 (for 18 holes) | web-search | High |
| Year opened | null | — | Not confirmed |
| Green fee weekday | 1,250 THB | web-search (high season) | Medium — high season (Nov–Mar) only |
| Green fee weekend | 1,650 THB | web-search (high season) | Medium — high season only |
| Caddie fee | 400 THB | web-search | Medium |
| Cart fee | 700 THB | web-search | Medium |
| Website | khaokheowgolf.com | official-website | High |
| Phone | +66 38 318 000 | official-website | High |

**Disputes requiring your input:**

**7a. Low-season green fee**
- Only high-season (Nov–Mar) rates confirmed: 1,250/1,650 THB.
- Low-season rate not found. Given it's currently April (start of low season), the rate may already be lower.
- **Your call:** Accept high-season rate as the published figure (note seasonal variation), or confirm low-season rate.

**7b. Year opened**
- Not found in searches. Non-blocking but leaves a gap.
- **Your call:** Accept null, or provide if known.

**Prose flags:**
- "The first 18-hole combination is considered the more challenging pairing" — sourced from booking site description. PASS.

**Schema completeness:** All required fields present (year null non-blocking; coords approximate).

**SEO:**
- Proposed meta description: "Khao Kheow Country Club — Perry & Peter Dye 27-hole design in Sriracha. Green fees from 1,250 THB, course guide, and golf club rental." — 144 chars ✓

---

### Course 8 — Mountain Shadow Golf Club

**Slug:** `mountain-shadow-golf-club`
**Status:** REVIEW_REQUIRED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Mountain Shadow Golf Club | web-search | High |
| Province | Chonburi | web-search | High |
| Designer | Ronald Fream / Golfplan | web-search | High |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Year opened | 1993 (as Natural Park Hill) | web-search | High |
| Green fee weekday | 1,400 THB | web-search | Medium — single rate, split unclear |
| Green fee weekend | 1,400 THB | assumed same | Low |
| Caddie fee | null | — | Not confirmed |
| Cart fee | null | — | Not confirmed |
| Website | null | — | No official website found |
| Phone | +66 85 228 0642 | web-search | Medium |

**Disputes requiring your input:**

**8a. Weekend green fee**
- Only a single rate of 1,400 THB found; weekday/weekend distinction not confirmed.
- **Your call:** Accept 1,400/1,400 (same rate) or note as unknown.

**Prose flags:**
- "four island greens" — sourced from web-search (golfasian). PASS.
- No superlatives found. PASS.

**Schema completeness:**
- `google_maps_url` — null
- `website` — null
- All other required fields: present

**SEO:**
- Proposed meta description: "Mountain Shadow Golf Club — Ronald Fream's 18-hole parkland design halfway between Bangkok and Pattaya. Green fees, course guide, and club rental." — 152 chars ✓

---

### Course 9 — Pleasant Valley Golf & Country Club

**Slug:** `pleasant-valley-golf-country-club`
**Status:** REVIEW_REQUIRED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Pleasant Valley Golf & Country Club | web-search | High |
| Province | Chonburi | web-search | High |
| Designer | Golf East | web-search | High |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Year opened | 2008 | web-search | High |
| Green fee weekday | 1,600 THB | web-search | Medium — split unclear |
| Green fee weekend | 1,600 THB | assumed same | Low |
| Caddie fee | null | — | Not confirmed |
| Cart fee | null | — | Not confirmed (carts compulsory weekend AM) |
| Website | null | — | No official website found |
| Phone | +66 81 410 5522 | web-search | Medium |

**Disputes requiring your input:**

**9a. Weekend green fee**
- Only a single rate of 1,600 THB found. Weekend/weekday split not confirmed.
- **Your call:** Accept 1,600/1,600 or note unknown.

**9b. Cart policy**
- Sources indicate carts are compulsory on weekend mornings. Cart fee not confirmed.
- **Your call:** Accept null for cart fee (pending phone confirmation) or provide if known.

**Prose flags:**
- "a carry of approximately 200 yards is required" on hole 12 — sourced from golfasian.com description. PASS.

**Schema completeness:**
- `google_maps_url` — null
- `website` — null
- All other required fields: present

**SEO:**
- Proposed meta description: "Pleasant Valley Golf & Country Club — challenging 18-hole course in Sriracha with natural swamp hazards. Green fees and Bangkok golf club rental." — 153 chars ✓

---

### Course 10 — Rayong Green Valley Country Club

**Slug:** `rayong-green-valley`
**Status:** REVIEW_REQUIRED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Rayong Green Valley Country Club | web-search | High |
| Province | Rayong | web-search | High |
| Designer | Peter Thomson | web-search | High |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Year opened | 1992 | web-search | High |
| Green fee weekday | 3,350 THB | web-search (GolfDD) | Medium |
| Green fee weekend | 3,550 THB | web-search (GolfDD) | Medium |
| Caddie fee | null | — | Not confirmed |
| Cart fee | null | — | Not confirmed |
| Website | null | — | No official website found |
| Phone | +66 38 030 660 | web-search | **Low — possibly shared with St Andrews 2000** |

**Disputes requiring your input:**

**10a. Phone number**
- The phone numbers found for Rayong Green Valley (038-030660-2, 081-940-8181) are identical to those returned in searches for St Andrews 2000 Golf Club. Both courses are in the Samnakthon/Ban Chang area, Rayong. It is possible they share a booking office, or this is a search-result cross-contamination.
- **Your call:** Accept the phone number with a data-gap note, or flag as needing verification before publishing.

**Prose flags:**
- "one of the most picturesque and famous golf courses in Pattaya" — this phrasing came from a source (GolfAsian) and was reproduced in prose. Per pipeline rules, superlatives without a ranked source should be softened.
- **Recommendation:** Change to "Rayong Green Valley is consistently noted for its scenic hillside setting and mature design" (removes unverifiable superlative).
- **Your call:** Accept recommendation or keep.

**Schema completeness:**
- `google_maps_url` — null
- `website` — null
- All other required fields: present

**SEO:**
- Proposed meta description: "Rayong Green Valley Country Club — Peter Thomson design on Rayong hillside, 3,350 THB weekday. Course guide and golf club rental from Bangkok." — 148 chars ✓

---

## Blocked courses (missing required fields)

### St Andrews 2000 — GREEN FEES NULL + OPERATIONAL STATUS UNKNOWN
- Green fee fields cannot be null for a published page.
- Course was closed for renovation as of the last confirmed update; December 2025 reopening was planned but April 2026 status is unconfirmed.
- **Options:**
  a. Confirm the course is open and provide current green fees → unlocks for publishing
  b. Hold the page from this batch — the other 9 courses can proceed independently

---

## Prose flags requiring your input

### Rayong Green Valley — layout_and_experience
- **Claim:** "one of the most picturesque and famous golf courses in Pattaya"
- **Issue:** Superlative without ranked source
- **Recommendation:** Soften to "consistently noted for its scenic hillside setting among Pattaya-area golf writers"
- **Your call:** Accept / Keep original

---

## Data gaps (non-blocking, tracked)

All 10 courses are missing:
- `google_maps_url` — all null, coordinates approximate
- `caddie_fee_thb` / `cart_fee_thb` — null for most courses (except Khao Kheow)
- `year_opened` — null for Khao Kheow

Additional per-course gaps:
- Courses 3, 4, 8, 9, 10: `website` null — no official website found
- Course 4: `phone` null
- Course 6: `phone` null, `website` unverified

These will be added to `data/data-gaps.md` after approval.

---

## Ready to approve

Once you've reviewed the disputes above, say:

**"Approve Pattaya P2 Batch 1"** — accepting all recommendations above, holding St Andrews 2000 for now, and softening the Rayong Green Valley superlative.

Or resolve disputes individually:
- "Pattana green fee — accept 2,300/3,000 as all-in rate"
- "Eastern Star — use 2,550/2,750 as green-fee-only estimate"
- "Crystal Bay designer is [X]"
- "St Andrews 2000 is open — green fee is [X] THB weekday / [X] THB weekend"
- "Rayong Green Valley superlative — accept softened version"
- etc.
