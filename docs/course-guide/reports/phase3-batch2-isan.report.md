# Phase 3 Batch 2 — Isan Region Verification Report

**Batch:** Phase 3, Batch 2 — Isan region  
**Date:** 2026-04-21  
**Status:** READY FOR REVIEW  

---

## Overview

11 courses were collected at Stage 1 for the Isan region. 6 were skipped (duplicate, wrong region, 9H, or nonexistent). 5 courses passed to Stage 2 and are now verified and ready for publication.

---

## Skip Summary (6 courses)

| # | Slug | Reason |
|---|------|--------|
| 1 | `urbonrat-golf-course` | Nonexistent — typo/bad data; no listings found |
| 2 | `udon-golf-club` | 9-hole course — skip per pipeline rule |
| 3 | `great-lake-golf-country-club` | Wrong region — Rayong/Pattaya (King Naga Golf Club); not Isan |
| 4 | `siharatdechochai-golf-course` | 9-hole + military — skip per pipeline rules |
| 5 | `ubonrat-golf-course` | Probable duplicate of `ubolratana-dam-golf-course` — same phone, 0.1 km apart; not published separately |
| 6 | `uniland-golf-country-club` | Wrong region — Nakhon Pathom (Bangkok area), not Isan |

---

## Verified Courses (5) — Publish Candidates

### 1. Dancoon Golf Club
- **Province:** Khon Kaen  
- **Holes/Par:** 18 / 72  
- **Designer:** DC Golf Design (2008)  
- **Green Fees:** 680 THB weekday / 980 THB weekend ⚠️ PROVISIONAL (3-source conflict; older sources cite 500–550 THB)  
- **Caddie:** 200 THB, NOT required  
- **Cart:** 600 THB, NOT required  
- **GPS:** 16.54 / 102.86 — model estimate ⚠️  
- **Flags:** Green fee provisional; GPS unconfirmed  
- **Recommendation:** PUBLISH WITH PROVISIONAL flags

### 2. Singha Park Khon Kaen Golf Club
- **Province:** Khon Kaen  
- **Holes/Par:** 18 / 72  
- **Designer:** Golf East (2009)  
- **Green Fees:** 1,500 THB weekday / 2,000 THB weekend ✅ (official website)  
- **Caddie:** 400 THB, REQUIRED  
- **Cart:** 700 THB, optional  
- **GPS:** 16.35 / 102.95 — model estimate ⚠️  
- **Website:** singhapark-khonkaen.com ✅  
- **Notes:** Asian Tour host venue; pricing confirmed from official site  
- **Flags:** GPS unconfirmed  
- **Recommendation:** PUBLISH WITH PROVISIONAL GPS

### 3. Victory Park Golf & Country Club
- **Province:** Nong Khai  
- **Holes/Par:** 18 / 72  
- **Designer:** James R. Vaughn (1995)  
- **Green Fees:** 1,000 THB weekday / 1,800 THB weekend ⚠️ PROVISIONAL (no official website)  
- **Caddie:** 300 THB, REQUIRED  
- **Cart:** 600 THB, optional  
- **GPS:** 17.777 / 102.825 ✅ (golfshake.com confirmed)  
- **Flags:** Green fees provisional  
- **Recommendation:** PUBLISH WITH PROVISIONAL fees

### 4. Royal Creek Golf Club Udon Thani
- **Province:** Udon Thani  
- **Holes/Par:** 18 / 72  
- **Designer:** Unknown  
- **Green Fees:** 1,600 THB weekday ⚠️ PROVISIONAL / weekend NOT FOUND  
- **Caddie:** 300 THB, REQUIRED  
- **Cart:** 600 THB, optional  
- **GPS:** 17.4646 / 102.9641 ✅ (allsquaregolf.com confirmed)  
- **Flags:** Green fee weekday provisional; weekend fee null; designer unknown  
- **Recommendation:** PUBLISH WITH PROVISIONAL; note weekend fee not available

### 5. Ubolratana Dam Golf Course
- **Province:** Khon Kaen (Ubolratana District, 50 km from city)  
- **Holes/Par:** 18 / 72  
- **Designer:** EGAT (government)  
- **Green Fees:** 560 THB weekday / 760 THB weekend ⚠️ PROVISIONAL (golfdd.com 2023; includes caddie)  
- **Caddie:** REQUIRED, included in green fee (no separate fee)  
- **Cart:** NOT AVAILABLE  
- **Driving Range:** NOT AVAILABLE  
- **GPS:** 16.7547 / 102.668 ✅ (golfshake.com confirmed)  
- **Flags:** Green fees provisional; club rental unknown; possible duplicate with ubonrat-golf-course (not published)  
- **Recommendation:** PUBLISH WITH PROVISIONAL fees; note caddie-inclusive pricing in TypeScript

---

## Data Gaps to Note

| Course | Field | Issue |
|--------|-------|-------|
| Dancoon | GPS | Model estimate — verify when confirmed source found |
| Dancoon | green_fee | 3-source conflict — call +66 43 255 107 to confirm |
| Singha Park | GPS | Model estimate — resort likely has Maps listing |
| Victory Park | green_fee | Provisional — no official website |
| Royal Creek | green_fee_weekend | Not found — call +66 81 873 6199 |
| Royal Creek | designer | Not found |
| Ubolratana Dam | club_rental | Unknown — government course |
| Ubolratana Dam | green_fee | Provisional; 2014 prices (300 THB) likely stale |

---

## New Region Infrastructure Required

Publishing this batch requires creating the **Isan region** from scratch:

1. Create `data/golf-courses/isan/` directory  
2. Create `data/golf-courses/isan/index.ts` (slug array)  
3. Add `isan` to `REGIONS` and `REGION_META` in `lib/golf-courses.ts`  
4. Update hub page `app/[locale]/golf-courses/page.tsx` to show Isan  
5. Add smoke tests: Isan region index + 5 course detail routes  

---

## Approval Requested

Please review the 5 courses above. Issues requiring your input:

1. **Dancoon green fee conflict** — 3-source dispute (680 vs 500–550 THB). Use 680 THB (1golf.eu, most recent) with provisional flag?  
2. **Royal Creek weekend fee** — null field (not found). Acceptable to publish without it, noting "call to confirm"?  
3. **Ubolratana Dam caddie-inclusive pricing** — green fee of 560/760 THB already includes caddie. Publish as-is with a note in the tips prose?  
4. **General approval** — proceed to Stage 5 publish for all 5 courses?
