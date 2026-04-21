# Phase 3 — Batch 3: Southern Thailand
**Date:** 2026-04-21
**Stage:** 3 (Verified) → Awaiting approval for Stage 5 (Publish)

---

## Summary

| # | Slug | Status | Verification |
|---|------|--------|-------------|
| 1 | `southern-hills-golf-country-club` | ✅ PUBLISH_WITH_PROVISIONAL | Green fees confirmed (2 sources); caddie/cart fees and mandatory status unknown |
| 2 | `hat-yai-resort-golf-club` | ✅ PUBLISH_WITH_PROVISIONAL | Green fees provisional (1golf.eu only); conflicting cart/range data; caddie fee older source |
| 3 | `sri-trang-golf-club` | ✅ PUBLISH_WITH_PROVISIONAL | Green fees provisional (single source); GPS unconfirmed (model estimate) |

**Skipped (2):**
- `tungsong-golf-course` — 9 holes + military + reported closed; triple skip
- `phatthalung-golf-club` — 9 holes + military; double skip

---

## Course Detail

### 1. Southern Hills Golf & Country Club
- **Province:** Songkhla (Hat Yai)
- **Designer:** Perry Dye | **Year:** 1999 | **Holes:** 18 | **Par:** 72
- **Green fees:** 950 THB weekday / 1,400 THB weekend (confirmed: 1golf.eu + where2golf)
- **GPS:** 6.8983, 100.5035 (confirmed: Deemples)
- **Phone:** +66 74 553 682 | **Website:** southernhills-golf.com
- **Club rental:** Yes (Golflux) | **Driving range:** Yes (Golflux)
- **Caddie/cart fees:** Unknown — not found in any source. Confirm by phone.
- **Caddie/cart required:** Unknown. Strong inference: mandatory at a Perry Dye resort course. Publish as null.

### 2. Hat Yai Resort & Golf Club
- **Province:** Songkhla (Hat Yai)
- **Designer:** Robert McFarland | **Year:** 1993 (disputed — 1golf.eu says 1995) | **Holes:** 18 | **Par:** 72
- **Green fees:** 600 THB weekday / 900 THB weekend — **PROVISIONAL** (1golf.eu only)
- **GPS:** 7.00205, 100.457 (confirmed: Golfshake)
- **Phone:** +66 74 434 7703 | **Website:** None (20m.com domain likely defunct)
- **Club rental:** Yes (1golf.eu) | **Driving range:** Conflicting (Golfshake: no / 1golf.eu: yes) → null
- **Cart:** Conflicting (Golfshake: no carts / 1golf.eu: electro-cart) → null
- **Caddie fee:** 300 THB — **VERY PROVISIONAL** (older source, may confuse with Southern Hills)

### 3. Sri Trang Golf Club
- **Province:** Trang
- **Designer:** None credited | **Year:** 2005 | **Holes:** 18 | **Par:** 72
- **Green fees:** 300 THB weekday / 400 THB weekend — **PROVISIONAL** (1golf.eu, single source)
- **GPS:** 7.79, 99.62 — **MODEL ESTIMATE** (no confirmed GPS from any source)
- **Phone:** +66 75 218 966 | **Website:** None
- **Driving range:** Yes (Hole19)
- **Caddie/cart/club rental:** All unknown — null across the board
- **Note:** Military camp (Prayarassadanupradit Camp) but confirmed civilian access per 1golf.eu

---

## Questions for Approval

**Q1 — Hat Yai Resort caddie fee (300 THB):** This comes from a 2011 source (phil.uk.net) that may confuse Hat Yai Resort with Southern Hills. Should I:
  - (a) Publish 300 THB with a strong provisional note, or
  - (b) Drop to null and note that caddie fee is unconfirmed?

**Q2 — Sri Trang GPS (model estimate):** No GPS confirmed from any source. The TypeScript file will flag `latitude` and `longitude` as `source: 'model'`. Should I:
  - (a) Publish as-is with the model estimate and a note (matches how we've handled other unconfirmed coordinates), or
  - (b) Leave GPS as null until confirmed?

**Q3 — Hat Yai Resort conflicting data (cart / driving range):** Both fields are currently null because sources directly contradict each other. Publishing as null with a "call ahead" note in the prose is the approach — confirm you're comfortable with that, or if you'd prefer to pick one source to trust.

---

## Provisional items for data-gaps.md (if approved)

1. Southern Hills — caddie fee THB (not found — confirm by phone +66 74 553 682)
2. Southern Hills — cart fee THB (not found — confirm by phone)
3. Southern Hills — caddie required (strong inference: yes — confirm by phone)
4. Hat Yai Resort — green fee weekday 600 THB (1golf.eu only — confirm by phone +66 74 434 7703)
5. Hat Yai Resort — green fee weekend 900 THB (1golf.eu only — confirm by phone)
6. Hat Yai Resort — caddie fee 300 THB (older, possibly conflated source — confirm by phone)
7. Hat Yai Resort — cart availability (conflicting sources — confirm by phone)
8. Hat Yai Resort — driving range (conflicting sources — confirm by phone)
9. Hat Yai Resort — year opened 1993 (disputed with 1golf.eu's 1995 — confirm by phone)
10. Sri Trang — green fee weekday 300 THB (1golf.eu only — confirm by phone +66 75 218 966)
11. Sri Trang — green fee weekend 400 THB (1golf.eu only — confirm by phone)
12. Sri Trang — GPS 7.79/99.62 (model estimate — manual Maps lookup required)
13. Sri Trang — caddie required / fee (unknown — confirm by phone)
14. Sri Trang — cart required / fee (unknown — confirm by phone)
15. Sri Trang — club rental available (unknown — confirm by phone)
