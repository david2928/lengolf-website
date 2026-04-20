# Hua Hin Phase 2 Batch 1 — Verification Report

Date: 2026-04-20  
Courses assessed: 11 (from regions.md rows 7–17)  
Pipeline stage: Stage 3 — Verification

---

## Region corrections (5 courses)

These courses were listed under Hua Hin in regions.md but research confirms they are in different regions entirely.

| # | Course | Assigned region | Actual location | Action |
|---|---|---|---|---|
| 1 | Milford Golf Club | Hua Hin | **Same property as Korea Golf Club** — original 1992 name, now Korea Golf Club | `skip` (duplicate) |
| 2 | Royal Dusit Golf Club | Hua Hin | Central Bangkok, Dusit district — next to Royal Turf Club. Par 65. Possibly closed. | `skip` (wrong region + closed) |
| 3 | Treasure Hill Golf & Country Club | Hua Hin | Ban Bueng, **Chon Buri** — 60 km from Pattaya (~120 km from Bangkok) | Move to Pattaya region |
| 4 | Royal Hills Golf Resort & Spa | Hua Hin | Sarika, **Nakhon Nayok** — ~90 km northeast of Bangkok (Khao Yai corridor) | Move to Khao Yai region |
| 5 | Southern Hills Golf & Country Club | Hua Hin | Ban Phru, **Hat Yai, Songkhla** — ~950 km from Bangkok (far south) | Move to Southern Thailand region |

---

## Courses proceeding to enrichment (6)

| # | Course | Slug | Status | Key data |
|---|---|---|---|---|
| 1 | Sea Pines Golf Resort | `sea-pines-golf-resort` | enriched | 18H/72, 1,500 THB, Army Golf Club II |
| 2 | Royal Hua Hin Golf Course | `royal-hua-hin-golf-course` | enriched | 18H/72, 1,000/1,350 THB, est. 1924 |
| 3 | Lake View Resort & Golf Club | `lake-view-resort-golf-club` | enriched | 36H, 1,000/1,350 THB, Phetchaburi |
| 4 | Korea Golf Club Hua Hin | `korea-golf-club-hua-hin` | enriched | 18H/72, ~800 THB all-in, budget |
| 5 | Sawang Resort & Golf Course | `sawang-resort-golf-course` | enriched | 27H, 1,150/1,800 THB, Phetchaburi |
| 6 | Kaeng Krachan Country Club | `kaeng-krachan-country-club` | enriched | 27H, 1,199/1,399 THB all-in |

---

## Disputes requiring user decision

### Dispute 1 — Sea Pines: MIL-owned, public accessible?
Sea Pines Golf Resort (aka Sea Pine Golf Club, Army Golf Club II) is operated by the Royal Thai Army within the Suan Son Pradiphat military beach complex. However, it is openly marketed on booking sites (GolfSavers, golfhuahin.com, 1golf.eu), has a public website (seapine.co.th), and is widely played by non-military visitors. Army personnel have tee-time priority — public golfers may be asked to yield if military groups arrive.

This is different from our standard MIL skips (Plutaluang Navy, Bangna Navy, etc.) which are purely internal/not marketed to the public.

**Options:**
- A: Publish — it is commercially marketed to tourists and functions as a public course
- B: Skip — it is MIL-owned and army priority creates unreliable access

### Dispute 2 — Korea Golf Club fee structure
Sources disagree:
- golfdd.com (2025): green fee 400 THB + caddie 300 THB + cart 500 THB separately = 1,200 THB total
- Same source also states "all-in package 800 THB (green fee + caddie + cart everyday)"
- 400 + 300 + 500 ≠ 800, so one set of figures must be incorrect or refer to different packages

**Options:**
- A: Use 800 THB all-in (green fee = 800, caddie/cart null) — the "package" price is likely the real marketed rate
- B: Use 1,200 THB total (green fee 400 + caddie 300 + cart 500 as separate line items)
- C: Set green fee to null and note fees unconfirmed (very conservative)

### Dispute 3 — Sawang: caddie/cart fees confirmed?
The green fees (1,150 weekday / 1,800 weekend) are confirmed. Cart is mandatory. However, the raw data could not confirm whether caddie and cart are included in those green fees or charged additionally. If extra, the all-in cost would be significantly higher.

**Options:**
- A: Publish with green fee as stated (1,150/1,800) and note caddie/cart may be additional — add to data-gaps
- B: Hold and confirm by phone before publishing

### Dispute 4 — Treasure Hill: move to Pattaya region?
Located in Ban Bueng, Chon Buri — clearly Pattaya/Eastern Seaboard territory. Good data available: 18H/72, Yoshikazu Kato design (1994), weekday 1,000 / weekend 1,500 THB.

**Options:**
- A: Add to Pattaya region rows in regions.md and include in a future Pattaya batch
- B: Skip entirely (not Hua Hin, and Pattaya Phase 2 is complete)

### Dispute 5 — Royal Hills: move to Khao Yai region?
Located in Nakhon Nayok (~90 km from Bangkok, Khao Yai corridor). Only Nelson & Wright-designed course in Thailand. Green fees unclear (GAD member rates only, ~400/500 THB). Some sources suggest it may not be easily bookable for general public.

**Options:**
- A: Add to Khao Yai region rows in regions.md for a future batch
- B: Skip

### Dispute 6 — Southern Hills: move to Southern Thailand region?
Located in Hat Yai, Songkhla — 950 km from Bangkok. Already have a "Southern Thailand" region section in regions.md. Good data: Perry Dye design (1999), 18H/72, 950/1,400 THB.

**Options:**
- A: Add to Southern Thailand region rows in regions.md
- B: Skip

---

## Data gaps (post-approval)

| # | Course | Field | Gap |
|---|---|---|---|
| 1 | Korea Golf Club | `phone` | No phone found; Facebook only |
| 2 | Korea Golf Club | `green_fee_weekday_thb` | Fee structure disputed (see Dispute 2) |
| 3 | Sawang Resort | `caddie_fee_thb`, `cart_fee_thb` | Not confirmed whether included in green fee |
| 4 | Lake View Resort | `designer` | Roger Packard confirmed; Ronald Fream 2006 redesign cited by some sources — not confirmed |
| 5 | Kaeng Krachan | `green_fee_*` | All-in package price; base green fee not separable. Some platforms show course as closed — advise calling ahead |
| 6 | All 6 courses | GPS coordinates | Approximate; not verified against official course addresses |
