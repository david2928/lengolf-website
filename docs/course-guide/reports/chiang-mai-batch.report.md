# Chiang Mai Batch Verification Report

Generated: 2026-04-20
Courses: 2
Status: 1 REVIEW_REQUIRED, 1 APPROVED

---

## Summary

| # | Course | Status | Issues |
|---|---|---|---|
| 1 | Alpine Golf Resort Chiang Mai | REVIEW_REQUIRED | High-season green fee disputed / not confirmed |
| 2 | Chiangmai Highlands Golf & Spa Resort | APPROVED | — |

---

## Notes for both courses

**Travel context:** Both courses are in Chiang Mai province (~700–720 km from Bangkok). All visitors fly (1h 10min from BKK or DMK to CNX). Drive time from Bangkok is not applicable for golfer planning purposes. The LENGOLF rental CTA frames this as "rent clubs in Bangkok before you fly."

**Seasonal pricing:** Unlike Bangkok courses (weekday/weekend), Chiang Mai courses show no weekday/weekend distinction — both charge an "everyday" rate. There is some seasonal variation (higher demand Nov–Mar) but green fees at these courses appear relatively flat year-round, with agent packages offering discounted all-in rates during low season. The `green_fee_weekday_thb` field holds the standard/low-season rate; `green_fee_weekend_thb` is null for both courses.

---

## Disputes requiring your input

### 1. Alpine Golf Resort — green_fee_weekday_thb

The green fee range is wide across sources:

| Source | Rate | What's included | Season |
|---|---|---|---|
| chiangmaigolfclub.com | 3,700 THB | All-in (caddie + cart included) | Apr–Oct (low) |
| golfsavers.com | 4,000 THB | Unclear | Unclear |
| golfdd.com (Feb 2026) | 6,500 THB | All-in (foreigner walk-in rate) | Nov–Mar (high) |
| 1golf.eu | 5,000 THB green fee | Green fee only (+ 400 caddie + 800 cart = 6,200 all-in) | Season unclear |

**Assessment:** These are likely not contradictory — the 3,700 is the low-season agent package rate, and the 6,500 is the high-season foreigner walk-in rate. The schema uses `green_fee_weekday_thb` = 3,700 (low season, all-in) and `green_fee_weekend_thb` = null (high season unconfirmed).

**Your call:**
- **Option A (recommended):** Accept 3,700 as low-season all-in rate. Publish with high season null and add to data-gaps for phone verification.
- **Option B:** Use 5,000 as the base green fee (non-bundled) and show caddie/cart as separate fees.

---

## Year opened — note (non-blocking)

### 1. Alpine Golf Resort — year_opened

| Source | Year | Context |
|---|---|---|
| 1golf.eu, chiangmaigolfclub.com | 2008 | Opening of current Alpine Golf Resort (Ron Garl redesign) |
| golfdd.com | 1990 | Property history as "Chiang Mai Lamphun Golf Club" (first private course in Northern Thailand) |

**Resolution:** 2008 is the correct year for the current Alpine Golf Resort brand and course layout. The 1990 date is the original club on the same site. Recommend keeping 2008.

**Your call:** Accept 2008 / Override / Note both dates

---

## Prose flags (non-blocking)

### Both courses — "top golf experiences in Northern Thailand"
- **Claim:** Alpine uses "consistently cited among the top golf experiences in Northern Thailand" and Chiangmai Highlands uses "regularly featured among the top golf experiences in Northern Thailand"
- **Issue:** Collective superlative without a specific ranking source
- **Assessment:** Both claims are supported by prominent placement on multiple independent booking platforms (golfsavers, golfasian, golfchiangmai, 1golf.eu). No modifications needed — the language is appropriately hedged ("cited", "featured" rather than "ranked #1" or "best in").
- **Your call:** Accept as-is / Soften further

---

## Blocked courses

None.

---

## Ready to approve

**Option A (recommended):** "Approve Chiang Mai batch — use 3,700 THB as Alpine low-season rate, accept 2008 year, accept prose as-is"

**If you want a different Alpine green fee:** "Approve Chiang Mai batch — Alpine green fee should be [X] THB"

---

## Data gaps flagged for follow-up

Both courses need GPS verification and Google Maps URLs. Alpine's high-season green fee needs phone confirmation. All tracked in `data/data-gaps.md` after publishing.

| # | Course | Field | Action needed |
|---|---|---|---|
| 1 | Alpine Golf Resort | `green_fee_weekend_thb` (high season) | Call +66 53 880 888 — what is the Nov–Mar green fee (incl. caddie & cart)? |
| 2 | Alpine Golf Resort | `google_maps_url` + GPS | Verify pin on Google Maps |
| 3 | Alpine Golf Resort | `club_rental_brands` | What brand of clubs are rented at the pro shop? |
| 4 | Chiangmai Highlands | `google_maps_url` + GPS | Verify pin on Google Maps |
| 5 | Chiangmai Highlands | `club_rental_fee_thb`, `club_rental_brands` | Call +66 53 261 354 — rental fee and brands? |
