# Phuket Batch Verification Report
Generated: 2026-04-19
Courses: 5
Status: 5 REVIEW_REQUIRED, 0 APPROVED, 0 BLOCKED

---

## Summary

| # | Course | Status | Issues |
|---|---|---|---|
| 1 | Red Mountain Golf Club | REVIEW_REQUIRED | High season green fee missing; GPS model; prose superlative |
| 2 | Blue Canyon — Canyon Course | REVIEW_REQUIRED | High season green fee missing; GPS model; prose superlative |
| 3 | Blue Canyon — Lakes Course | REVIEW_REQUIRED | High season green fee missing; caddie fee minor dispute; GPS model |
| 4 | Loch Palm Golf Club | REVIEW_REQUIRED | High season green fee missing; year opened minor dispute; GPS/address model |
| 5 | Laguna Golf Phuket | REVIEW_REQUIRED | Designer dispute; year opened minor dispute; GPS/address model; Google Maps URL missing |

---

## Context: Phuket pricing structure

Unlike Bangkok and Pattaya courses, Phuket courses use **seasonal pricing** (high season Nov–Mar / low season Apr–Oct) rather than weekday/weekend pricing. For this batch:

- `green_fee_weekday_thb` = confirmed low season green fee (Apr–Oct, green fee only excl. caddie/cart)
- `green_fee_weekend_thb` = high season green fee — **only confirmed for Laguna Golf Phuket**

All 5 courses are flagged REVIEW_REQUIRED rather than BLOCKED because the low season rates are confirmed and publishing is viable. The high season rate is a data gap rather than a hard blocker. You may want to publish with a note in the schema or hold for the high season research. See below for my recommendation.

---

## Disputes requiring your input

### 1–4. High season green fees (all courses except Laguna)

Current web sources all show Apr–Oct 2026 low season rates only. High season rates have rolled off the live pages.

| # | Course | Low season GF (confirmed) | High season GF (status) | Recommended action |
|---|---|---|---|---|
| 1 | Red Mountain | ฿3,500 | Unknown | Call +66 76 326880 or check mbkgolf.com in November |
| 2 | Blue Canyon Canyon | ฿3,400 | Unknown | Call +66 76 328 088 or check bluecanyonphuket.com in November |
| 3 | Blue Canyon Lakes | ฿1,850 | Unknown | Same as Canyon Course |
| 4 | Loch Palm | ฿3,300 | Unknown | Call +66 76 326880 or check mbkgolf.com in November |
| 5 | Laguna Golf Phuket | ฿3,700 | ฿5,200 ✅ confirmed | — |

**Your call:** Accept publication with low season rates only (noting seasonal pricing in the page), or hold until high season rates are sourced.

---

### 5. Loch Palm — year_opened

- Stage 1 value: 1996
- Dispute source: Golfsavers cites 1993
- Recommendation: Accept **1996** — confirmed by phuketgolfcourse.com and phuketgolfleisure.com
- **Your call:** Accept 1996 / Investigate further

---

### 6. Blue Canyon Lakes — caddie_fee_thb

- Stage 1 value: ฿400
- Dispute source: Golfsavers cites ฿350
- Recommendation: Accept **฿400** — confirmed by phuketgolfcourse.com and phuketgolfholidays.com
- **Your call:** Accept ฿400 / Confirm by calling Blue Canyon

---

### 7. Laguna Golf Phuket — designer

- Stage 1 value: "Max Wexler and David Abell (1992); redesigned Paul Jansen (2014)"
- Dispute: GolfAsian names Paul Jansen; other sources name Wexler/Abell
- Recommendation: The 2014 redesign by Paul Jansen is the current playing course. The field value includes both. Acceptable as-is.
- **Your call:** Accept as-is / Simplify to "Paul Jansen (2014 redesign)" / Confirm via official site

---

### 8. Laguna Golf Phuket — year_opened

- Stage 1 value: 1992
- Dispute: GolfAsian cites 1993
- Recommendation: Accept **1992** — worldsbestgolfdestinations.com and thailandgolfers.com both cite 1992
- **Your call:** Accept 1992 / Investigate further

---

## Prose flags (non-blocking)

### 1. Red Mountain Golf Club — overview
- Claim: "widely considered Phuket's finest golf course and one of the best in Southeast Asia"
- Issue: Superlative without a formal ranking citation
- Recommendation: Change to "consistently ranked among Phuket's top courses by visiting golfers and booking agents" — or find a Golf Digest / Golf Asia ranking to cite
- **Your call:** Accept recommendation / Ignore / Add ranking citation

### 2. Blue Canyon Canyon Course — overview
- Claim: "one of the most decorated golf courses in Asia"
- Issue: Superlative. The Johnnie Walker Classic history supports "prestigious tournament venue" but not definitively "most decorated."
- Recommendation: Change to "one of the most historically significant tournament venues in Southeast Asia, having hosted the Johnnie Walker Classic in 1994 and 1998"
- **Your call:** Accept recommendation / Ignore

---

## Data gaps (non-blocking, tracked separately)

All 5 courses are missing:
- `google_maps_url` — retrieve from Google Maps for each course
- `latitude` / `longitude` — GPS coordinates are model estimates; verify via Google Maps
- `club_rental_fee_thb` and `club_rental_brands` — not confirmed for any Phuket course

Loch Palm: `address` field is a model estimate — confirm via mbkgolf.com or Google Maps.
Laguna Golf Phuket: `address` field is a model estimate.

---

## Ready to approve?

Once you resolve the disputes above:

- Accept/reject each **Your call** item above
- Say: **"Approve Phuket batch"** to move to Stage 5 publish
- Or fix disputes first: **"Red Mountain high season green fee is ฿X,XXX"**, etc.

All 5 courses are REVIEW_REQUIRED. None are hard-BLOCKED — if you're comfortable publishing with seasonal low/high pricing noted where available, all 5 can proceed.
