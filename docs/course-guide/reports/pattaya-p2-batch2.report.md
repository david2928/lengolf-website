# Pattaya Phase 2 Batch 2 — Verification Report

Batch: Pattaya Phase 2 Batch 2
Pipeline stages: 1 (collect) + 2 (enrich) complete
Prepared: 2026-04-20

---

## ⚠️ IMPORTANT: Regions.md corrections needed

Three courses listed under Pattaya in `regions.md` are misclassified and need to be updated before any further batch planning:

| # | Course | Listed region | Actual location | Action |
|---|---|---|---|---|
| 1 | Blue Sapphire Golf & Resort | Pattaya | Kanchanaburi Province (River Kwai) — confirmed by multiple sources | Move to Kanchanaburi region or skip |
| 2 | NCR Country Club Golf & Marina | Pattaya | Nakhon Pathom / Suphan Buri, near Bangkok — confirmed by 1golf.eu | Move to Bangkok surrounds region |
| 3 | Chonburi Century Country Club | Pattaya | **Same course as Pattavia Century Golf Club** — renamed after Chang Breweries acquisition in 2014. The `chonburi-century-country-club` slug is a duplicate of `pattavia-century-golf-club` | Remove duplicate slug; only `pattavia-century-golf-club` should be published |

---

## Batch 2 courses — 6 reviewed

| # | Course | Slug | Status | Notes |
|---|---|---|---|---|
| 1 | The Emerald Golf Club | `the-emerald-golf-club` | APPROVED (provisional) | Good data; green fees all-in; designer attribution needs verify |
| 2 | Siam Country Club Waterside | `siam-country-club-waterside` | APPROVED (provisional) | Official SCC site; green fee from agent; designer unknown |
| 3 | Chatrium Golf Resort Soi Dao | `chatrium-golf-resort-soi-dao` | REVIEW_REQUIRED | Course enhancement underway through Oct 2026 — see dispute below |
| 4 | Sriracha International Golf Club | `sriracha-international-golf-club` | BLOCKED | Green fees, phone, address all null — insufficient data to publish |
| 5 | Pattavia Century Golf Club | `pattavia-century-golf-club` | APPROVED (provisional) | Rates sourced from golfdd.com; tiered rate structure noted |
| 6 | Greenwood Golf Club | `greenwood-golf-club` | APPROVED (provisional) | Green fee range approximate; phone missing |

---

## Disputes and questions

### 1. The Emerald Golf Club — designer credit

**Issue:** Multiple sources credit the course to both Nick Faldo and Desmond Muirhead as co-designers. Muirhead designed the original layout; Faldo's involvement is noted by several sites but is unusual given Faldo Design was not established until 1999 — after the 1995 opening date.
**Question:** Is the Faldo credit accurate, or was Muirhead the sole designer with Faldo's name appearing due to a data error across sources?
**Recommendation:** Publish as "Desmond Muirhead" (sole confirmed designer of the era) unless you can verify Faldo's involvement.

### 2. Siam Country Club Waterside — designer

**Issue:** One golf agent site listed "IMG Golf Design" as the designer. The official SCC website does not name a designer. IMG (International Management Group) is primarily a sports management company, not typically a golf design firm.
**Question:** Do you know who designed Waterside? Publishing `null` is fine and honest.
**Recommendation:** Publish with `designer: null` unless confirmed.

### 3. Chatrium Golf Resort Soi Dao — course enhancement status

**Issue:** The Chatrium official website states the course is undergoing enhancements from March to October 2026, with full 18-hole play suspended June 1–July 20, 2026. We are currently in April 2026.
**Question:** Should this course be held until enhancements are complete (October 2026), or published now with a caveat note in the prose?
**Options:**
- A) Publish now — the prose already caveats the enhancement schedule and phone is confirmed for visitors to check current status
- B) Hold until November 2026 when full operations resume
**Recommendation:** Option A — publish with caveat, since partial play is available and the enhancement schedule is already in the prose tips section.

### 4. Sriracha International Golf Club — insufficient data

**Issue:** Green fees, phone number, and address are all null after multiple web searches. The course exists and has hosted the Thai Open twice, but current operational data is not publicly available online.
**Question:** Do you have any direct contact information for this course, or shall we hold it for manual verification?
**Recommendation:** HOLD — publish only when green fees are confirmed.

### 5. Pattavia Century Golf Club — tiered pricing

**Issue:** The pricing is time-dependent: weekday 1,050 THB (caddie included, cart optional) but 1,650 THB with cart after 6pm; weekend 1,450 THB but 2,050 THB with cart on peak morning slots (6–11am). The enriched file uses 1,050/1,450 as the base weekday/weekend rate.
**Question:** Acceptable to publish the base rate (without cart) as the published figure and note the tiered structure in the tips prose?
**Recommendation:** Yes — base rate is the most useful to publish; prose already explains the cart structure.

### 6. Greenwood Golf Club — green fee range and phone

**Issue:** Green fee is a range (1,000–1,500 THB) from a European golf guide, not a specific Thai agent source. Phone number was not found in any search.
**Question:** Accept the 1,000/1,500 THB weekday/weekend split as provisional, with a verification note?
**Recommendation:** Yes — flag both for verification.

---

## Courses ready to approve (pending your responses above)

If the recommended resolutions above are accepted:

- **The Emerald** → publish with designer as "Desmond Muirhead" (or keep dual credit if you prefer)
- **SCC Waterside** → publish with `designer: null`
- **Chatrium Soi Dao** → publish with enhancement caveat in prose (Option A)
- **Sriracha International** → HOLD
- **Pattavia Century** → publish with base rate + tiered note in prose
- **Greenwood** → publish with provisional green fees + phone verification note

That gives **4 published** from this batch (Emerald, Waterside, Chatrium, Pattavia, Greenwood) and **1 held** (Sriracha International).

Wait for your responses before running Stage 5.
