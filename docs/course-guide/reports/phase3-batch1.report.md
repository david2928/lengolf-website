# Phase 3 Batch 1 — Verification Report
Generated: 2026-04-21
Courses attempted: 3
Courses proceeding: 2
Skipped: 1

---

## Summary

| # | Course | Region | Status | Issues |
|---|---|---|---|---|
| 1 | Rancho Charnvee Resort & Country Club | `khao-yai` | REVIEW_REQUIRED | Green fee dispute (3 sources); google_maps_url missing; re-regioned from Bangkok |
| 2 | Kabinburi Sport Club | `pattaya` | REVIEW_REQUIRED | caddie/cart mandatory status provisional; google_maps_url missing; drive time estimated |
| 3 | Suranaree Golf Club | — | SKIP | 9 holes + military (Camp Suranaree army base) — not suitable for publication |

---

## Region corrections

### Rancho Charnvee — Bangkok → Khao Yai
The course is in Pak Chong district, Nakhon Ratchasima — the Khao Yai corridor, not the Bangkok region. All golf booking platforms (GolfAsian, GolfOrient, GolfSavers, GolfOrient, greenfee365) categorise it as Khao Yai. Re-regioned to `khao-yai` consistent with how Life Privilege CC was moved.

**Updates made:**
- regions.md Bangkok row 71 → `skip` with re-region note
- New row added to Khao Yai section (row 12, status `verified`)
- Raw file written to `data/1.raw/khao-yai/` (not Bangkok)

**No redirect needed** — course was never published in Bangkok.

### Suranaree Golf Club — SKIP (both entries)
Confirmed 9-hole military course at Camp Suranaree, Nakhon Ratchasima. Multiple sources (1golf.eu, golflux.com, golfdd.com) confirm 9-hole layout. The kolfers.com figure of 18 holes appears to be a doubled 9-hole count error.

**Updates made:**
- Khao Yai section row 8 → `skip` (9H + MIL)
- Isan section row 10 (`suranaree-golf-club-isan`) → `skip` (same course, duplicate listing)

---

## Disputes requiring your input

### 1. Rancho Charnvee — green_fee_weekday_thb
- Stage 1 found: 1,050 THB (golfsavers.com)
- 1golf.eu found: 1,000 THB weekday
- 2025 web snippet: 2,000 THB weekday (possibly updated pricing)
- **Recommendation:** Use 1,050 THB as provisional, caveat in prose. Verify by calling +66 44 756 210 or +66 88 375 4466 (golf line).
- **Your call:** Accept 1,050 provisional / Provide correct value

### 2. Rancho Charnvee — green_fee_weekend_thb
- Stage 1 found: 1,850 THB (golfsavers.com)
- 1golf.eu found: 2,000 THB weekend
- **Recommendation:** Use 1,850 THB as provisional.
- **Your call:** Accept 1,850 provisional / Provide correct value

---

## Data gaps (non-blocking)

| # | Course | Field | Note |
|---|---|---|---|
| 1 | Rancho Charnvee | `google_maps_url` | Address: 333/2 Moo 12, Khanong Phra, Pak Chong, NR 30130 |
| 2 | Rancho Charnvee | `club_rental_brands` | Club rental confirmed at 1,000 THB; brands unknown |
| 3 | Kabinburi | `google_maps_url` | Address: 196 Moo 11, Suwannasorn Rd, Wang Dan, Kabin Buri, Prachin Buri 25110 |
| 4 | Kabinburi | `drive_time_from_bangkok_min` | 150 min estimated from model; verify via Google Maps |
| 5 | Kabinburi | `club_rental_fee_thb` | Club rental available but fee not found on official site |
| 6 | Kabinburi | `caddie_required` / `cart_required` | True per golfdigg.com only — single source, provisional |

---

## Prose flags (non-blocking)

None — prose for both courses uses only verified facts from the fields object. No unsubstantiated superlatives.

---

## Blocked courses

None — both proceeding courses have all required fields populated (with provisional caveats on green fees for Rancho Charnvee).

---

## Ready to approve

Say: **"Approve Phase 3 Batch 1"**

Or resolve disputes first:
- "Fix Rancho Charnvee weekday fee — it's [X] THB"
- "Fix Rancho Charnvee weekend fee — it's [X] THB"
- "Kabinburi caddie is not required" / "Kabinburi cart is not required"

Once approved, Stage 5 will:
1. Publish `rancho-charnvee-country-club.ts` to `data/golf-courses/khao-yai/`
2. Publish `kabinburi-sportclub.ts` to `data/golf-courses/pattaya/`
3. Add both slugs to the respective region `index.ts` files
4. Add smoke tests for both routes
5. Add data gaps to `data-gaps.md`
