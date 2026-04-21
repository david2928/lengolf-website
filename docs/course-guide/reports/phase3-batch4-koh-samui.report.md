# Phase 3 — Batch 4: Koh Samui & Gulf South
**Date:** 2026-04-21
**Stage:** 3 (Verified) → Awaiting approval for Stage 5 (Publish)

---

## Summary

| # | Slug | Status | Verification |
|---|------|--------|-------------|
| 1 | `santiburi-samui-country-club` | ✅ PUBLISH_WITH_PROVISIONAL | Green fee multi-source conflict resolved; caddie/cart mandatory confirmed |
| 2 | `rajjaprabha-dam-golf-course` | ✅ PUBLISH_WITH_PROVISIONAL | Green fee foreigner rate consistent; caddie/cart mandatory status unconfirmed |

**Skipped (2):**
- `the-beach-golf-club-chumphon` — **CLOSED since 2021** + 9-hole; double skip
- `royal-samui-golf-country-club` — 9-hole; already marked skip in regions.md

---

## Course Detail

### 1. Santiburi Samui Country Club
- **Province:** Surat Thani (Koh Samui island)
- **Designer:** Edward Thiele & Pirapon Namatra | **Year:** 2003 | **Holes:** 18 | **Par:** 72
- **Green fee:** 3,800 THB base (PROVISIONAL — phuketgolfcourse.com 2026 itemized breakdown)
  - Official site (santiburigolfsamui.com) bundles at **5,800 THB all-in** (no weekday/weekend split)
  - 1golf.eu: 5,600 THB; govigolf: 4,859 THB; golfsavers: 2,600–4,500 range
  - **→ See Q1 below**
- **Caddie fee:** 350 THB (provisional) + tip 400–500 THB recommended
- **Cart fee:** 750 THB (provisional, one cart per golfer mandatory — steep terrain)
- **Caddie required:** Yes (confirmed — official site)
- **Cart required:** Yes (confirmed — official site, caddie ladies drive carts)
- **GPS:** 9.5600, 99.9766 (confirmed — phuketgolfcourse.com/maps)
- **Phone:** +66 77 421700 | **Website:** santiburigolfsamui.com
- **Club rental:** Yes, 600–1,500 THB
- **Tournament note:** Hosted 2006 Bangkok Airways Open

### 2. Rajjaprabha Dam Golf Course
- **Province:** Surat Thani (Ban Ta Khun / Khao Sok area)
- **Designer:** EGAT | **Year:** 2000 | **Holes:** 18 | **Par:** 72
- **Green fee:** 1,000 THB (foreigner rate — PROVISIONAL; dual pricing confirmed)
  - Thai nationals: ~500 THB weekday / 1,000 THB weekend per 1golf.eu
  - Foreigner rate ~1,000 THB confirmed across multiple aggregators + TripAdvisor 2019–2023
- **Caddie fee:** 300 THB (golfasian.com, provisional)
- **Cart fee:** 600 THB (golfasian.com, provisional — strongly recommended, hilly terrain)
- **Caddie/cart required:** Unconfirmed — published as null
- **GPS:** 8.9582, 98.8029 (confirmed — golfkhaolak.com)
- **Phone:** +66 77 242562 (primary) / +66 77 240 7405 (1golf.eu conflict)
- **Website:** None
- **Club rental:** Yes, 700 THB
- **Note:** One of Thailand's most scenic and affordable government courses — Khao Sok jungle setting

---

## Questions for Approval

**Q1 — Santiburi green fee: 3,800 THB base vs 5,800 THB all-in?**
The official site packages everything at 5,800 THB (green fee + caddie + cart + possibly service charge). phuketgolfcourse.com 2026 itemizes: 3,800 + 350 + 750 = 4,900 THB. Should I:
- (a) Publish **3,800 THB** as `green_fee_weekday_thb` with caddie 350 and cart 750 as separate fields (= 4,900 total, close to the 5,000–5,800 range from other sources), and note the 5,800 official bundle in prose, **or**
- (b) Publish **5,800 THB** as a single all-in `green_fee_weekday_thb` (like Wangjuntr foreigner rate) with caddie/cart set to null since they're already bundled?

**Q2 — Rajjaprabha dual pricing display:** The green fee is 1,000 THB for foreigners but ~500 THB for Thai nationals on weekdays. The prose already explains the dual pricing. No further action needed — confirm you're comfortable with 1,000 THB as the published figure for our (mostly foreign tourist) audience.

---

## Provisional items for data-gaps.md (if approved)

1. Santiburi — `green_fee_weekday_thb`: 3,800 THB base (OR 5,800 all-in — see Q1) — confirm via santiburigolfsamui.com or phone +66 77 421700
2. Santiburi — `caddie_fee_thb`: 350 THB (provisional — phuketgolfcourse.com 2026)
3. Santiburi — `cart_fee_thb`: 750 THB (provisional — phuketgolfcourse.com 2026)
4. Rajjaprabha — `green_fee_weekday_thb`: 1,000 THB foreigner rate (confirm via phone +66 77 242562)
5. Rajjaprabha — `green_fee_weekend_thb`: 1,000 THB (same as weekday assumed — unconfirmed)
6. Rajjaprabha — `caddie_fee_thb`: 300 THB (golfasian.com, provisional)
7. Rajjaprabha — `cart_fee_thb`: 600 THB (golfasian.com, provisional)
8. Rajjaprabha — `caddie_required` / `cart_required`: unknown — confirm by phone
9. Rajjaprabha — `phone`: conflict (+66 77 242562 vs +66 77 240 7405) — try both
