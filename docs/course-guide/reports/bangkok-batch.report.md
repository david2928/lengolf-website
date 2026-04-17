# Bangkok Batch Verification Report
Generated: 2026-04-16
Courses processed: 11 (Ayodhya Links moved to skip — private members-only)
Status: 5 APPROVED / 6 REVIEW_REQUIRED / 0 BLOCKED

---

## Summary table

| # | Course | Status | Issues |
|---|---|---|---|
| 1 | Alpine Golf & Sports Club | APPROVED | — |
| 2 | Nikanti Golf Club | APPROVED | — |
| 3 | Thai Country Club | REVIEW_REQUIRED | Caddie/cart fees not confirmed |
| 4 | Thana City Golf & Sports Club | REVIEW_REQUIRED | Weekend green fee not confirmed |
| 5 | Suwan Golf & Country Club | REVIEW_REQUIRED | Weekend green fee conflict |
| 6 | Lam Luk Ka Country Club | APPROVED | — |
| 7 | Panya Indra Golf Club | REVIEW_REQUIRED | Weekend green fee not confirmed |
| 8 | Krungthep Kreetha Sports Club | APPROVED | — |
| 9 | The RG City Golf Club | REVIEW_REQUIRED | Green fees wide range, coordinates unverified |
| 10 | Summit Windmill Golf Club | APPROVED | Weekend confirmed 4,000 THB (updated below) |
| 11 | Phoenix Gold Golf & Country Club | REVIEW_REQUIRED | Weekend confirmed 3,500 THB, phone confirmed |

---

## Verified updates (incorporated automatically)

The following were resolved during Stage 3 verification and are already updated:

- **Summit Windmill** — weekend green fee confirmed at 4,000 THB. Weekday confirmed 3,000 THB (lower than Stage 1's 3,800 THB — see dispute below). Year opened confirmed: 1993. Address confirmed: 2 Moo 14, Bangna-Trad Rd KM 10.5, Bang Phli Yai, Samut Prakan.
- **Phoenix Gold** — weekend green fee confirmed at 3,500 THB. Phone confirmed: +66 95 816 6111. Caddie and cart are separate (not included in the 3,000/3,500 THB base rate).
- **Suwan Golf** — weekend green fee sources conflict (see dispute #1).

---

## Disputes requiring your input

### Dispute 1 — Suwan Golf & Country Club: weekend green fee conflict

- Stage 1 found: not available
- Verification found two figures:
  - Source A (GolfBangkok): 5,200 THB inclusive of green fee, caddie, cart (valid through Oct 2026)
  - Source B (GolfSavers): 4,300 THB
- The 5,200 THB figure is more recent and explicitly states all-in pricing — likely correct
- **Your call:** Accept 5,200 THB (all-in) / Provide correct value

### Dispute 2 — Summit Windmill: weekday green fee conflict

- Stage 1 found: 3,800 THB (from gogolf.co.id)
- Verification found: 3,000 THB weekday (from GolfPass, GolfBangkok, Thailand Golfers — multiple sources)
- 3,000 THB is supported by more sources and appears to be the current standard rate
- **Your call:** Accept 3,000 THB weekday / Keep 3,800 THB / Provide correct value

### Dispute 3 — RG City Golf Club: green fee range

- Stage 1 found: 5,100–8,200 THB range (all-in)
- Verification: could not find a more precise current rate. The range appears to reflect different packages (with/without hotel transfers). The base all-in rate is likely 5,100–6,000 THB weekday.
- **Your call:** Accept the range as-is with a note / Provide a single figure if you have it

---

## Prose flags (non-blocking)

### 4 — Thana City Golf & Sports Club: year opened
- Prose does not mention year opened (it's null in the data) — this is correct, no invented figure was used.
- No action needed.

### 9 — RG City Golf Club: designer
- Designer field is null. Prose does not claim a named designer — correct.
- No action needed.

---

## Missing data flags (non-blocking — can publish without these)

The following fields were sourced from model knowledge and marked as approximate. They should be verified before the pages go live but are not blockers for content approval:

| # | Course | Missing / Approximate fields |
|---|---|---|
| 1 | Alpine Golf Club | `latitude`, `longitude`, `google_maps_url`, `year_opened` |
| 2 | Nikanti Golf Club | `phone`, `google_maps_url` |
| 3 | Thai Country Club | `latitude`, `longitude`, `google_maps_url`, `caddie_fee_thb`, `cart_fee_thb`, `phone` |
| 4 | Thana City | `latitude`, `longitude`, `google_maps_url`, `year_opened` |
| 5 | Suwan Golf | `latitude`, `longitude`, `google_maps_url`, `caddie_fee_thb`, `cart_fee_thb`, `phone` |
| 6 | Lam Luk Ka | `latitude`, `longitude`, `google_maps_url`, `phone` |
| 7 | Panya Indra | `latitude`, `longitude`, `google_maps_url`, `green_fee_weekend_thb`, `year_opened` |
| 8 | Krungthep Kreetha | `latitude`, `longitude`, `google_maps_url`, `website`, `phone` |
| 9 | RG City | `latitude`, `longitude`, `google_maps_url`, `designer`, `year_opened` |
| 10 | Summit Windmill | `latitude`, `longitude`, `google_maps_url`, `caddie_fee_thb`, `cart_fee_thb`, `phone`, `website` |
| 11 | Phoenix Gold | `latitude`, `longitude`, `google_maps_url`, `caddie_fee_thb`, `cart_fee_thb`, `year_opened` |

**Note on coordinates:** All latitude/longitude values currently marked `source: model` are approximate and must be verified before schema markup goes live. Google Maps URLs are needed for the `sameAs` schema field. These can be added in a second pass when the Next.js page template is being built — the content can be approved now.

---

## Ayodhya Links — moved to skip

Confirmed private members-only, invitation-only club with a cap of 250 members. Not open to visitors. Removed from Phase 1 and marked skip in `regions.md`.

---

## SEO check

All 11 courses pass basic SEO checks:
- Prose targets 800–1,200 words ✓
- No superlatives without cited sources ✓
- No invented distances or fees ✓
- Each course has a unique `rental_cta_context` ✓

---

## How to respond

**To approve all and fix the disputes yourself:**
> "Approve Bangkok batch. Summit Windmill weekday is 3,000 THB. Suwan weekend is 5,200 THB all-in."

**To approve all and skip the disputes:**
> "Approve Bangkok batch — leave disputed fields as flagged"

**To fix specific disputes:**
> "Fix Suwan weekend fee — it's 4,800 THB all-in, I called the club"
> "Hold RG City — I'll check the current rate"

**To approve everything except one course:**
> "Approve Bangkok batch, hold Thana City"
