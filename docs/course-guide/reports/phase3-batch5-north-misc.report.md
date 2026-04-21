# Phase 3 Batch 5 — North Miscellaneous
## Verification Report

**Date:** 2026-04-21  
**Courses assessed:** 16  
**Recommended publish:** 1 (pending approval)  
**Recommended skip:** 15  

---

## Summary

This batch covers the 16 "North — Miscellaneous" courses listed in `regions.md` — an intentionally catch-all category spanning Phrae, Phayao, Kamphaeng Phet, Lampang, Tak, Kanchanaburi, Uthai Thani, Phetchabun, Lopburi, and potentially Chiang Mai. All are Phase 3 (low priority, very remote).

**Key finding:** This batch has a significantly worse data profile than any previous batch. The majority of courses have zero confirmed fees, no phone numbers, unknown hole counts, and province-level GPS at best. 15 of 16 are recommended for skip. Only one course — Mae Moh Golf Course — has a compelling enough setting to publish with a null-fee page, pending your approval.

---

## Definite skips — no further work needed

| # | Course | Reason |
|---|---|---|
| 1 | **Wangjuntr Golf Park** | DUPLICATE — already published at `/golf-courses/pattaya/wangjuntr-golf-park/` |
| 2 | **Kamphaeng Phet Akarayothin Golf Course** | PROBABLE MIL — "Akarayothin" is a Thai Army designation; Kamphaeng Phet hosts the Royal Thai Army Infantry Center (Wachira Prakarn Camp); no civilian access data found anywhere |

---

## Courses with insufficient data — recommended skip

| # | Course | Province | Key blocker | Verdict |
|---|---|---|---|---|
| 3 | Chaophraya Dam Golf Course | Unknown | Chaophraya Dam (Chai Nat) is a run-of-river weir, not a hydroelectric compound — very unlikely to have a golf course; no data found anywhere | SKIP — existence uncertain |
| 4 | Phrae Golf Course | Phrae | Hole count unconfirmed; no fees, phone, or designer from any source | SKIP — insufficient data |
| 5 | Kwan Pha Yao Golf Course | Phayao | Hole count unconfirmed (may be 9H); no fees or phone | SKIP — insufficient data |
| 6 | Tanyatanee Country Club | Chiang Mai (probable) | No hole count, fees, phone, or GPS; cannot write a useful guide | SKIP — insufficient data |
| 7 | Hillside Country Home Golf & Resort | Unknown | Province entirely unknown; no data from any source | SKIP — province unknown |
| 8 | Naraihill Golf & Country Club | Lopburi (inferred) | Province is inferred from name only; no hole count, fees, or phone confirmed | SKIP — insufficient data |
| 9 | Panorama Golf & Country Club | Unknown | Province unknown; generic name produces ambiguous search results | SKIP — province unknown |
| 10 | Mida Golf Club (aka Lion Hills) | Unknown | Province unknown; no data from any source | SKIP — province unknown |
| 11 | Nong Samrong Golf Course | Uthai Thani (inferred) | Hole count unknown; no fees or phone | SKIP — insufficient data |
| 12 | Green World Hot Spring Resort & Golf Club | Kanchanaburi | Hole count unknown — likely small resort par-3 or 9H layout | SKIP — likely not 18H |
| 13 | Dongpukurd Golf Course | Phetchabun | Hole count unknown; no fees or phone | SKIP — insufficient data |
| 14 | Khao Laem Golf Course | Kanchanaburi | EGAT course at Sangkhlaburi dam — extremely remote (340 km); high probability 9H given compound scale | SKIP — probable 9H; see note below |
| 15 | Bhumibol Dam Golf Course | Tak | EGAT course at Bhumibol Dam — hole count unconfirmed, smaller compound than Mae Moh; may be 9H | SKIP — see note below |

### Notes on Khao Laem and Bhumibol Dam

Both are EGAT/GOV courses that might be publishable if confirmed 18H. However:

- **Khao Laem**: Sangkhlaburi is among the most remote towns in Thailand (~340 km from Bangkok, 4.5 hours). Even if 18H, the tourist audience for a guide is extremely thin. Recommend skip unless you specifically want to complete the EGAT dam series.

- **Bhumibol Dam**: More accessible (~426 km, ~5.5 hours) and the dam itself is a notable tourist attraction (viewpoint, boat tours). If the hole count can be confirmed as 18H, this is worth publishing. However, we have no fees or phone, making the page fully null on commercial data.

---

## Publish candidate — awaiting your decision

### 1. Mae Moh Golf Course (Lampang)

**Setting:** EGAT Mae Moh Power Plant — Thailand's largest coal-fired power station (multiple 300MW units), with a self-contained township of several thousand workers in Mae Moh district, Lampang province. The golf course serves the EGAT community and is open to the public, following the same model as Ubolratana Dam (Khon Kaen) and Rajjaprabha Dam (Surat Thani).

**Data summary:**

| Field | Value | Source |
|---|---|---|
| Holes | 18 (par 72) | **Provisional** — EGAT township pattern; not confirmed from Mae Moh-specific source |
| Green fee (weekday) | Unknown | No listing found anywhere |
| Green fee (weekend) | Unknown | No listing found anywhere |
| Caddie/cart | Unknown | — |
| Phone | Unknown | EGAT Mae Moh switchboard exists but golf course direct line not found |
| GPS | 18.3345, 99.6712 | Estimate (Mae Moh district) |
| Distance from Bangkok | 604 km / ~7.5 hours | — |

**Why publish with null fees?** Mae Moh is a completely unique golf setting — the only course in Thailand at a coal-fired power plant. The industrial landscape, the large EGAT township, and the Lampang province context give us enough material to write a genuinely interesting guide. The page would display "Contact course for current fees" rather than a specific THB figure. This is consistent with how we handled St Andrews 2000 Pattaya (renovation closure, fees null) and River Kwai Golf & Country Club (fees unconfirmed).

**Q1 — Mae Moh Golf Course:**
> We have no confirmed green fees or phone number for Mae Moh Golf Course. We can publish an 18H/par-72 page with null fees (displaying a "contact course for current rates" note) based on the EGAT township pattern.
> 
> **a)** Publish with null fees — unique EGAT coal plant setting justifies the page  
> **b)** Skip — null fees make the page too thin to be useful  
> **c)** Hold — worth a phone call to EGAT Mae Moh before deciding

---

## Batch outcome by the numbers

| Category | Count |
|---|---|
| Definite skip (duplicate / MIL) | 2 |
| Skip — insufficient data | 10 |
| Skip — probable 9H or non-18H | 2 |
| Skip — existence uncertain | 1 |
| Publish candidate (pending approval) | 1 |
| **Total** | **16** |

---

## If Mae Moh is approved (Q1 → a)

**Region assignment:** Mae Moh would go into a new `north-misc` region in `lib/golf-courses.ts`. However, with only 1 course, the hub page card for "North — Miscellaneous" would show "1 course." This may look thin. Alternative: hold Mae Moh until Bhumibol Dam or another north-misc course can be confirmed, publishing both together.

**Q2 — Region timing:**
> If Mae Moh is approved:  
> **a)** Publish Mae Moh now as a standalone north-misc region (1 course)  
> **b)** Hold Mae Moh until Bhumibol Dam hole count is confirmed — publish both together if both are 18H

---

## Courses worth a phone call (if you want to revisit later)

If you ever want to expand coverage, these are the courses most worth calling:

| # | Course | Phone target | What to confirm |
|---|---|---|---|
| 1 | Bhumibol Dam Golf Course | EGAT Bhumibol Dam switchboard (Tak province) | 18H or 9H? Green fees? Open to public? |
| 2 | Khao Laem Golf Course | EGAT Khao Laem switchboard (Sangkhlaburi, Kanchanaburi) | 18H or 9H? Open to public? |
| 3 | Naraihill Golf & Country Club | Search for naraihill.com or Lopburi golf | Confirm 18H, province, and green fees |
| 4 | Mae Moh Golf Course | EGAT Mae Moh Power Plant, Lampang | Green fees and direct phone number |
