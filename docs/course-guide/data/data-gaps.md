# Data Gaps — Pending Phone Verification

Fields that could not be confirmed via web search. Have someone call the course to confirm.
Once confirmed, update `knowledge/course-overrides.md` with the correct value and re-run Stage 3 for that course.

Last updated: 2026-04-16

---

## Priority: Green fee conflicts (verify first — these affect page content)

| # | Course | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|
| 1 | Suwan Golf & Country Club | `green_fee_weekend_thb` | 5,200 THB (all-in) | Two sources: 5,200 THB vs 4,300 THB | What is the weekend green fee including caddie and cart? |
| 2 | Summit Windmill Golf Club | `green_fee_weekday_thb` | 3,000 THB | Two sources: 3,000 THB vs 3,800 THB | What is the weekday green fee? Does it include caddie and cart? |
| 3 | The RG City Golf Club | `green_fee_weekday_thb` | 5,100–8,200 THB | Range only — no single confirmed rate | What is the standard 18-hole weekday green fee including caddie and cart? |
| 4 | Panya Indra Golf Club | `green_fee_weekend_thb` | null | Not found | What is the weekend 18-hole green fee? |
| 5 | Thai Country Club | `green_fee_weekday_thb` | 4,500 THB (low season) | Seasonal pricing — not confirmed which applies now | What is the current weekday green fee? High or low season rate? |

---

## Missing: Weekend green fees

| # | Course | Field | Call to confirm |
|---|---|---|---|
| 1 | Thai Country Club | `green_fee_weekend_thb` | What is the current weekend green fee? |
| 2 | Thana City Golf & Sports Club | `green_fee_weekend_thb` | What is the weekend green fee? Is caddie included? |
| 3 | Summit Windmill Golf Club | `green_fee_weekend_thb` | Confirmed 4,000 THB — is caddie included? |
| 4 | Phoenix Gold Golf & Country Club | `green_fee_weekend_thb` | Confirmed 3,500 THB — are caddie and cart included? |

---

## Missing: Caddie and cart fees

| # | Course | Field | Current value | Call to confirm |
|---|---|---|---|---|
| 1 | Alpine Golf Club | `caddie_fee_thb`, `cart_fee_thb` | Included in green fee | Confirm that caddie and cart are both included in the 5,400/7,400 THB rate |
| 2 | Thai Country Club | `caddie_fee_thb`, `cart_fee_thb` | null | What are the caddie fee and cart rental fee? |
| 3 | Suwan Golf & Country Club | `caddie_fee_thb`, `cart_fee_thb` | null | Are caddie and cart included in the green fee? If separate, what are the fees? |
| 4 | Summit Windmill Golf Club | `caddie_fee_thb`, `cart_fee_thb` | null | What is the caddie fee? Is cart mandatory on weekdays? |
| 5 | Phoenix Gold Golf & Country Club | `caddie_fee_thb`, `cart_fee_thb` | null | What are the caddie fee and cart rental fee on top of green fee? |
| 6 | Lam Luk Ka Country Club | `caddie_fee_thb`, `cart_fee_thb` | Included | Confirm both included in the 2,600/3,800 THB visitor rate |

---

## Missing: Phone numbers

| # | Course | Field | Call to confirm |
|---|---|---|---|
| 1 | Nikanti Golf Club | `phone` | Main booking number |
| 2 | Thai Country Club | `phone` | Main booking number |
| 3 | Suwan Golf & Country Club | `phone` | Main booking number |
| 4 | Lam Luk Ka Country Club | `phone` | Main booking number |
| 5 | Panya Indra Golf Club | `phone` | Confirmed via web: 062 821 3333 — verify this is current |
| 6 | Krungthep Kreetha Sports Club | `phone` | Main booking number |
| 7 | The RG City Golf Club | `phone` | Main booking number |
| 8 | Summit Windmill Golf Club | `phone` | Main booking number |
| 9 | Phoenix Gold Golf & Country Club | `phone` | Confirmed via web: +66 95 816 6111 — verify this is current |

---

## Missing: Websites

| # | Course | Field | Notes |
|---|---|---|---|
| 1 | Krungthep Kreetha Sports Club | `website` | No official website found — may not have one |
| 2 | Summit Windmill Golf Club | `website` | Found summitwindmillgolfclub.com — needs confirmation it's official |

---

## Missing: Year opened

| # | Course | Field | Notes |
|---|---|---|---|
| 1 | Alpine Golf Club | `year_opened` | Not found in any source |
| 2 | Thana City Golf & Sports Club | `year_opened` | Not found |
| 3 | The RG City Golf Club | `year_opened` | Not found |
| 4 | Phoenix Gold Golf & Country Club | `year_opened` | Not found |
| 5 | Summit Windmill Golf Club | `year_opened` | Confirmed 1993 via web search |
| 6 | Panya Indra Golf Club | `year_opened` | Not found |

---

## Missing: GPS coordinates and Google Maps URLs

All coordinates are currently approximate (sourced from model knowledge). These must be verified before schema markup goes live — the `sameAs` field in JSON-LD requires an accurate Google Maps URL.

**Recommended approach:** Search each course name on Google Maps, confirm the pin location, then copy the share URL.

| # | Course | Approximate coords | Google Maps URL needed |
|---|---|---|---|
| 1 | Alpine Golf & Sports Club | 13.9636, 100.6353 | Yes |
| 2 | Nikanti Golf Club | 13.7919, 100.1094 | Yes |
| 3 | Thai Country Club | 13.6056, 100.8912 | Yes |
| 4 | Thana City Golf & Sports Club | 13.6120, 100.7490 | Yes |
| 5 | Suwan Golf & Country Club | 13.7460, 100.1120 | Yes |
| 6 | Lam Luk Ka Country Club | 13.9310, 100.7830 | Yes |
| 7 | Panya Indra Golf Club | 13.8200, 100.7150 | Yes |
| 8 | Krungthep Kreetha Sports Club | 13.7540, 100.6620 | Yes |
| 9 | The RG City Golf Club | 14.0120, 100.7810 | Yes |
| 10 | Summit Windmill Golf Club | 13.6680, 100.6850 | Yes |
| 11 | Phoenix Gold Golf & Country Club | 13.8620, 100.9140 | Yes |

---

## How to update after confirmation

1. Add the confirmed value to `knowledge/course-overrides.md`
2. Tell Claude: "Re-verify [course name] with these corrections: [field] = [value]"
3. Claude will update the approved JSON and republish

Or for a batch: "Here are the confirmed figures: [list] — update and re-publish Bangkok batch"
