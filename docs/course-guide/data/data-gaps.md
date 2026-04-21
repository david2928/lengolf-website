# Data Gaps — Pending Phone Verification

Fields that could not be confirmed via web search. Have someone call the course to confirm.
Once confirmed, update `knowledge/course-overrides.md` with the correct value and re-run Stage 3 for that course.

Last updated: 2026-04-21 (Phase 3 Batch 3 Southern Thailand added — 3 courses)

---

## Priority: Green fee conflicts (verify first — these affect page content)

### Phase 3 Batch 3 — Southern Thailand green fees

| # | Course | Published | Source / Issue | How to confirm |
|---|---|---|---|---|
| 1 | Southern Hills Golf & Country Club | 950 / 1,400 THB | Two sources consistent (1golf.eu + where2golf). Caddie/cart fees unknown. | Call +66 74 553 682 |
| 2 | Hat Yai Resort & Golf Club | 600 / 900 THB | 1golf.eu only — single source. Older source cites 950 THB but may confuse with Southern Hills. | Call +66 74 434 7703 |
| 3 | Sri Trang Golf Club | 300 / 400 THB | 1golf.eu only — single source. No corroborating source found. | Call +66 75 218 966 |

### Phase 3 Batch 3 — Southern Thailand caddie/cart/facilities

| # | Course | Field | Current value | Issue | How to confirm |
|---|---|---|---|---|---|
| 4 | Southern Hills Golf & Country Club | `caddie_fee_thb` | null | Not found — strongly inferred mandatory at this standard of course | Call +66 74 553 682 |
| 5 | Southern Hills Golf & Country Club | `cart_fee_thb` | null | Not found | Call +66 74 553 682 |
| 6 | Southern Hills Golf & Country Club | `caddie_required` | null | Strong inference: yes (Perry Dye resort course) — not confirmed | Call +66 74 553 682 |
| 7 | Hat Yai Resort & Golf Club | `caddie_fee_thb` | 300 THB | PROVISIONAL — older source (~2011) may confuse with Southern Hills | Call +66 74 434 7703 |
| 8 | Hat Yai Resort & Golf Club | `cart_fee_thb` | null | Conflicting: golfshake says no carts; 1golf.eu says available | Call +66 74 434 7703 |
| 9 | Hat Yai Resort & Golf Club | `driving_range` | null | Conflicting: golfshake says no; 1golf.eu says yes | Call +66 74 434 7703 |
| 10 | Hat Yai Resort & Golf Club | `year_opened` | 1993 | Disputed: golfshake says 1993; 1golf.eu says 1995 | Call +66 74 434 7703 |
| 11 | Sri Trang Golf Club | `caddie_required` | null | Unknown — military-associated; may be mandatory | Call +66 75 218 966 |
| 12 | Sri Trang Golf Club | `caddie_fee_thb` | null | Unknown | Call +66 75 218 966 |
| 13 | Sri Trang Golf Club | `cart_fee_thb` | null | Unknown — cart availability unconfirmed | Call +66 75 218 966 |
| 14 | Sri Trang Golf Club | `club_rental_available` | null | Unknown — military-associated course; club rental uncertain | Call +66 75 218 966 |

### Phase 3 Batch 3 — Southern Thailand GPS

| # | Course | Coords | Status |
|---|---|---|---|
| 15 | Sri Trang Golf Club | 7.79, 99.62 | **Model estimate** — no confirmed GPS from any source. Manual Maps lookup required. |

### Phase 3 Batch 2 — Isan green fees

| # | Course | Published | Source / Issue | How to confirm |
|---|---|---|---|---|
| 1 | Dancoon Golf Club | 680 / 980 THB | 3-source conflict: 1golf.eu 680/980; older sources 500–550 THB | Call +66 43 255 107 |
| 2 | Victory Park G&CC | 1,000 / 1,800 THB | Provisional — 1golf.eu; no official website | Call +66 42 412 999 |
| 3 | Royal Creek GC Udon Thani | 1,600 / **null** THB | Weekday single source (golfdd.com); weekend not found | Call +66 81 873 6199 |
| 4 | Ubolratana Dam GC | 560 / 760 THB | golfdd.com 2023 (includes caddie). Older sources show 300 THB (2014 — likely stale) | Call +66 43 372 228 |

### Phase 3 Batch 1 — Rancho Charnvee green fees

Three sources give conflicting figures. Published as 1,050/1,850 THB (GolfSavers). A 2025 web snippet suggests fees may have risen to 2,000/3,000 THB.

| # | Course | Published | Source dispute | How to confirm |
|---|---|---|---|---|
| 1 | Rancho Charnvee Resort & CC | 1,050 / 1,850 THB | 1golf.eu: 1,000/2,000 · 2025 snippet: 2,000/3,000 | Call +66 44 756 210 or golf line +66 88 375 4466 |

### Chiang Mai batch — Alpine high-season rate

Alpine Golf Resort Chiang Mai publishes a 3,700 THB all-in low-season rate (Apr–Oct) sourced from chiangmaigolfclub.com. The high-season rate (Nov–Mar) is unconfirmed — golfdd.com shows 6,500 THB all-in (foreigner walk-in, Feb 2026) and golfsavers shows 4,000 THB. The page already caveats this.

| # | Course | Low season rate | High season rate | How to confirm |
|---|---|---|---|---|
| 1 | Alpine Golf Resort Chiang Mai | 3,700 THB all-in (Apr–Oct) | **Unknown** | Call +66 53 880 888 or check alpinegolfresort.com after Nov 1 |

### Phuket batch — high season rates (4 courses)

Phuket courses use seasonal pricing (high season Nov–Mar / low season Apr–Oct) rather than weekday/weekend. The `green_fee_weekend_thb` field represents the high season rate. Only Laguna Golf Phuket has a confirmed high season rate. The other 4 are published with low season only.

| # | Course | Low season GF | High season GF | How to confirm |
|---|---|---|---|---|
| 1 | Red Mountain Golf Club | 3,500 THB | **Unknown** | Check mbkgolf.com after Nov 1, or call +66 76 326880 |
| 2 | Blue Canyon Canyon Course | 3,400 THB | **Unknown** | Check bluecanyonphuket.com after Nov 1, or call +66 76 328 088 |
| 3 | Blue Canyon Lakes Course | 1,850 THB | **Unknown** | Same as Canyon Course contact |
| 4 | Loch Palm Golf Club | 3,300 THB | **Unknown** | Check mbkgolf.com after Nov 1, or call +66 76 326880 |
| 5 | Laguna Golf Phuket | 3,700 THB | **5,200 THB ✅** | Confirmed via lagunagolfphuket.com |

### Hua Hin batch

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Palm Hills Golf Club & Residence | Hua Hin | `green_fee_weekday_thb` | 2,500 THB (rack rate) | Agent rate 1,400 THB vs rack rate 2,500 THB — two independent sources used 2,500 THB | What is the walk-in green fee for 18 holes? Is there a weekday/weekend difference? |
| 2 | Majestic Creek Country Club | Hua Hin | `green_fee_weekday_thb` | 1,350 THB (provisional) | Single source (huahingolfcourse.com). Official site does not publish rates. | What is the current 18-hole green fee? Caddie included or separate? |
| 3 | Pineapple Valley Golf Club | Hua Hin | `green_fee_weekday_thb` | 3,300 THB (shoulder season) | Official booking page shows 3,300 THB (Apr–Jul) and 3,900–4,200 THB (Nov–Mar high season) | Should the published page show a seasonal range or a single rate? What is the standard/walk-in rate? |

### Khao Yai batch

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Kirimaya Golf Course | Khao Yai | `green_fee_weekday_thb` | 1,700 THB (provisional) | No current rate on official website; historical estimate only | What is the current 18-hole green fee? Is there a weekday/weekend difference? |
| 2 | Kirimaya Golf Course | Khao Yai | `green_fee_weekend_thb` | 1,700 THB (provisional) | Same as above | — |
| 3 | Khao Yai Golf Club | Khao Yai | `green_fee_weekday_thb` | 1,900 THB | GolfSavers shows 1,000 THB (may be local/outdated rate) | What is the current 18-hole green fee for a foreign visitor? Is there a weekday/weekend split? |
| 4 | Khao Yai Golf Club | Khao Yai | `cart_required` | false (model estimate) | Cart required status unclear | Is a cart mandatory or optional? What is the cart fee? |

### Hua Hin Phase 2 Batch 1

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Korea Golf Club Hua Hin | Hua Hin | `green_fee_weekday_thb` | 800 THB (all-in) | golfdd.com lists GF 400 + caddie 300 + cart 500 = 1,200 THB, but also states "all-in package 800 THB" — figures inconsistent | What is the current all-in cost for 18 holes (green fee + caddie + cart)? |
| 2 | Sawang Resort | Hua Hin | `caddie_fee_thb` | null | Cart mandatory but caddie/cart fees unconfirmed as separate or included in 1,150/1,800 THB quoted rate | Are caddie and cart included in the quoted green fee, or charged separately? |
| 3 | Kaeng Krachan CC | Hua Hin | `green_fee_weekday_thb` | 1,199 THB (all-in) | Power Nine pricing from website 2023; some booking platforms show course as unavailable | Confirm course is currently bookable. What is the current all-in rate? |

### Phuket Phase 2 Batch 1

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Aquella Golf & Country Club | Phuket | `green_fee_weekend_thb` | 3,150 THB (provisional) | Sourced from golfsavers pricing text without clear label; high-season rate not confirmed from official source | Email booking@aquellagolf.com or call +66 76 679 308: what is the Nov–Mar green fee for 18 holes? |

### Khao Yai Phase 2 Batch 1

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Mountain Creek Golf Resort | Khao Yai | `green_fee_weekday_thb` | null | Pricing range 1,100–2,500 THB from golfsavers; no clean weekday/weekend split from any source — bundled all-in is the booking unit | Call +66 44 756 100: what is the current all-in rate (GF + caddie + cart) for a weekday round and a weekend round? |
| 2 | Bonanza Golf & Country Club | Khao Yai | `green_fee_weekday_thb` | 800 THB | 1golf.eu shows 800/1,200 THB; some visitor reports suggest 1,500–1,800 THB charged in practice | Call +66 44 365 1912: what is the current walk-in green fee on weekdays and weekends? |
| 3 | Seoul Siam Resort & CC | Khao Yai | `caddie_fee_thb` | null | GF-only rates found (400/800 THB); caddie/cart fees and mandatory status unconfirmed | Call +66 44 319 052: what is the caddie fee? Is caddie mandatory? Is cart mandatory or optional? |
| 4 | Seoul Siam Resort & CC | Khao Yai | `year_opened` | 2004 (GolfLux) | GolfLux says 2004; AllSquare says 2011 — unresolved | Ask when the course first opened |
| 5 | Rooks Korat Country Club | Khao Yai | `cart_fee_thb` | 600 THB | golfasian.com lists 500 THB; 1golf.eu data suggests 600 THB | Call +66 44 249 060: what is the current cart fee? |
| 6 | Rooks Korat Country Club | Khao Yai | `driving_range` | null | Contradictory sources — one review mentions a grass driving range, another source lists none | Does the course have a driving range? |

### Pattaya Phase 2 Batch 3

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Bangpra International Golf Club | Pattaya | `green_fee_weekday_thb` | 1,700 THB | Multiple platforms disagree: 1golf.eu shows 900 THB (likely outdated), golfsavers 1,350 THB (discount), pattayagolf.net 1,700 THB (used), govigolf.com 2,900 THB all-in | What is the current walk-in weekday green fee? Is caddie (350 THB) still separate? |
| 2 | Bangpra International Golf Club | Pattaya | `green_fee_weekend_thb` | 2,500 THB | Same multi-source discrepancy as weekday | What is the current weekend green fee? |

### Pattaya Phase 2 Batch 2

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Greenwood Golf Club | Pattaya | `green_fee_weekday_thb` | 1,000 THB | Low end of European guide range (1,000–1,500 THB) — not confirmed via Thai agent | What is the current weekday green fee? Caddie included? |
| 2 | Greenwood Golf Club | Pattaya | `green_fee_weekend_thb` | 1,500 THB | High end of range used as provisional weekend rate | What is the current weekend green fee? |
| 3 | Greenwood Golf Club | Pattaya | `phone` | null | Not found in any web search | Main booking number |
| 4 | SCC Waterside | Pattaya | `green_fee_weekday_thb` | 5,960 THB | All-in from agent source — official SCC does not publish rates. Possible discrepancy | What is the current all-in green fee? |
| 5 | Chatrium Golf Resort Soi Dao | Pattaya | `green_fee_weekday_thb` | 1,550 THB | Low end of agent range 1,550–2,250 THB; walk-in vs. agent rate unclear | What is the current walk-in green fee? Is there a weekday/weekend split? |
| 6 | Pattavia Century Golf Club | Pattaya | `cart_fee_thb` | null | Cart optional on most times; compulsory peak weekend mornings — fee not confirmed | What is the cart fee per person? |

### Pattaya Phase 2 Batch 1

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | St Andrews 2000 | Pattaya | `green_fee_weekday_thb` | null | Course is open but green fees unknown after renovation | What is the current 18-hole green fee? Caddie included or separate? |
| 2 | St Andrews 2000 | Pattaya | `green_fee_weekend_thb` | null | Same as above | Same as above |
| 3 | Crystal Bay Golf Resort | Pattaya | `designer` | null | Designer not found in any source | Who designed the course? |
| 4 | Crystal Bay Golf Resort | Pattaya | `green_fee_weekday_thb` | 1,350 THB | Single agent source — weekday/weekend split unclear | What is the current green fee? Is there a weekday/weekend difference? |
| 5 | Pattaya Country Club | Pattaya | `green_fee_weekday_thb` | 2,000 THB | Weekday/weekend split flagged for verification | Is there a separate weekend rate? |
| 6 | Mountain Shadow Golf Club | Pattaya | `green_fee_weekday_thb` | 1,400 THB | Weekday/weekend split flagged for verification | Is there a separate weekend rate? |
| 7 | Pleasant Valley Golf & Country Club | Pattaya | `green_fee_weekend_thb` | 1,600 THB | Assumed same as weekday — confirm weekend | Is the weekend rate the same as weekday (1,600 THB)? |

### Kanchanaburi batch

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | River Kwai Golf & Country Club | Kanchanaburi | `green_fee_weekday_thb` | null | Fees not published online; older review cited 600 THB standalone GF but predates current cart-free policy | Call +66 34 919714: what is the current green fee for 18 holes? |
| 2 | Royal Ratchaburi Golf Club | Kanchanaburi | `green_fee_weekday_thb` | 750 THB | Sources vary 550–800 THB weekday; 1,000–1,050 THB weekend — midpoint 750/1,050 used | Call +66 32 227031: what is the current walk-in weekday and weekend green fee? |
| 3 | Dragon Hills Golf & Country Club | Kanchanaburi | `caddie_required` | false | Listed as à la carte on official fee page, but one source states "buggy compulsory" | Call +66 32 917698: is caddie and/or cart mandatory? |
| 4 | Blue Sapphire Golf & Resort | Kanchanaburi | `caddie_fee_thb` | null | Caddie compulsory but fee not clearly separated from green fee in some packages | Call +66 34 581227: is the caddie fee included in the 1,000/1,500 THB green fee, or charged separately? |
| 5 | Woo Sung Castle Hill / Rachaburi CC | Kanchanaburi | `caddie_fee_thb` | null | Caddie/cart fees not found on any source | Call +66 32 228505: what are the caddie and cart fees? Is caddie mandatory? |
| 6 | Grand Prix Golf Club | Kanchanaburi | `latitude` | null | GPS coordinates not found online; course is in Tambon Chong Dan, Bo Phloi | Confirm GPS or use Google Maps to pin exact location |
| 8 | Rayong Green Valley CC | Pattaya | `phone` | +66 38 030 660 | Web search returned same phone for both Rayong Green Valley and St Andrews 2000 — two courses in same Samnakthon/Ban Chang area | Confirm this is Rayong Green Valley's direct line (not St Andrews 2000) |

### Bangkok Phase 2 Batch 4

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Bangpoo Golf & Sports Club | Bangkok | `green_fee_weekday_thb` | 1,700 THB | Wide range across sources: 1,450–1,950 THB weekday; 2,350–3,400 THB weekend with time-of-day tiers | What is the current all-in weekday green fee? Is there a peak/off-peak split? |
| 2 | Bangpoo Golf & Sports Club | Bangkok | `green_fee_weekend_thb` | 2,600 THB | Same as above | What is the current all-in weekend rate? |
| 3 | Killien Golf Club | Bangkok | `green_fee_weekday_thb` | 1,850 THB | Single source; weekday/weekend split unconfirmed | Is there a separate weekend rate? |
| 4 | Muang Ake Golf Course | Bangkok | `green_fee_weekday_thb` | 610 THB | 610–1,030 THB range may reflect time-of-day or season variation rather than a clean weekday/weekend split | What is the current standard weekday and weekend rate? |
| 5 | Muang Ake Wang Noi Golf Course | Bangkok | `green_fee_weekday_thb` | 1,200 THB (model) | Post-rebrand fees not independently confirmed | What is the current walk-in green fee at Wang Noi Prestige / The Wangnoi Ayudhaya? |
| 6 | Northern Rangsit Golf Club | Bangkok | `green_fee_weekday_thb` | 760 THB | 760–1,350 THB range; exact split not confirmed from official source (northernrangsit.com) | What is the current weekday and weekend green fee? Is caddie included? |
| 7 | Krisda City Golf Hills | Bangkok | `green_fee_weekday_thb` | 1,500 THB | Fee structure ambiguous — one source shows 1,850 THB all-in, another shows cart separately at 700 THB | What is the full cost (green fee + caddie + cart) on a weekday and weekend? |
| 8 | Kumlung-Ake Golf Course | Bangkok | `green_fee_weekday_thb` | 310 THB | Older review data; may be significantly outdated | What is the current green fee? Is caddie included? |

### Bangkok Phase 2 Batch 3

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Star Country Club | Bangkok | `green_fee_weekday_thb` | 200 THB | Flagged suspicious — likely outdated green-fee-only listing. All-in ~900 THB weekday | What is the current 18-hole walk-in green fee? Caddie and cart included or separate? |
| 2 | Star Country Club | Bangkok | `green_fee_weekend_thb` | 400 THB | Same as above | Same as above |
| 3 | Sai Golf Club | Bangkok | `green_fee_weekend_thb` | 2,500 THB (model estimate) | No confirmed weekend rate found publicly | What is the current weekend green fee? |
| 4 | Life Privilege CC | Bangkok | `caddie_fee_thb` | 400 THB (model estimate) | Caddie fee unconfirmed — single source for green fees | What is the current caddie fee? Is cart separate or included? |
| 5 | Krung Kavee Golf Course | Bangkok | `green_fee_weekday_thb` | 1,600 THB | 1golf.eu shows 1,600/1,800 THB; golfsavers shows 2,400/3,300 THB (>50% discrepancy) | What is the current weekday green fee? Green fee only or including caddie and cart? |

### Bangkok Phase 2 Batch 1

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Artitaya Country Club | Bangkok | `green_fee_weekday_thb` | 400 THB | Green-fee-only; all-in cost unknown | What is the all-in cost (caddie + cart) for 18 holes on a weekday? |
| 2 | Artitaya Country Club | Bangkok | `green_fee_weekend_thb` | 800 THB | Green-fee-only; all-in cost unknown | What is the all-in cost on a weekend? |
| 3 | Lakewood Country Club | Bangkok | `caddie_fee_thb` | 1,000 THB (provisional) | Caddie fee 1,000 THB from web search — confirm it includes tip or is pre-tip | What is the current caddie fee? Is a mandatory cart charged separately? |
| 4 | Navatanee Golf Course | Bangkok | `green_fee_weekend_thb` | null | No weekend rate found — course may not distinguish weekday/weekend | Is there a separate weekend rate? If so, what is it? |

### Bangkok Phase 1 batch

| # | Course | Region | Field | Current value | Conflict / Issue | Call to confirm |
|---|---|---|---|---|---|---|
| 1 | Suwan Golf & Country Club | Bangkok | `green_fee_weekend_thb` | 5,200 THB (all-in) | Two sources: 5,200 THB vs 4,300 THB | What is the weekend green fee including caddie and cart? |
| 2 | Summit Windmill Golf Club | Bangkok | `green_fee_weekday_thb` | 3,000 THB | Two sources: 3,000 THB vs 3,800 THB | What is the weekday green fee? Does it include caddie and cart? |
| 3 | The RG City Golf Club | Bangkok | `green_fee_weekday_thb` | 5,100–8,200 THB | Range only — no single confirmed rate | What is the standard 18-hole weekday green fee including caddie and cart? |
| 4 | Panya Indra Golf Club | Bangkok | `green_fee_weekend_thb` | null | Not found | What is the weekend 18-hole green fee? |
| 5 | Thai Country Club | Bangkok | `green_fee_weekday_thb` | 4,500 THB (low season) | Seasonal pricing — not confirmed which applies now | What is the current weekday green fee? High or low season rate? |
| 6 | Siam CC Plantation | Pattaya | `green_fee_weekend_thb` | 4,000 THB (model estimate) | Model estimate — not confirmed | What is the weekend green fee for 18 holes? |

---

## Missing: Weekend green fees

| # | Course | Region | Field | Call to confirm |
|---|---|---|---|---|
| 1 | Thai Country Club | Bangkok | `green_fee_weekend_thb` | What is the current weekend green fee? |
| 2 | Thana City Golf & Sports Club | Bangkok | `green_fee_weekend_thb` | What is the weekend green fee? Is caddie included? |
| 3 | Summit Windmill Golf Club | Bangkok | `green_fee_weekend_thb` | Confirmed 4,000 THB — is caddie included? |
| 4 | Phoenix Gold Golf & Country Club | Bangkok | `green_fee_weekend_thb` | Confirmed 3,500 THB — are caddie and cart included? |
| 5 | Siam CC Plantation | Pattaya | `green_fee_weekend_thb` | Weekday 3,300 THB confirmed. What is weekend rate? |

---

## Missing: Caddie and cart fees

| # | Course | Region | Field | Current value | Call to confirm |
|---|---|---|---|---|---|
| 1 | Alpine Golf Club | Bangkok | `caddie_fee_thb`, `cart_fee_thb` | Included in green fee | Confirm that caddie and cart are both included in the 5,400/7,400 THB rate |
| 2 | Thai Country Club | Bangkok | `caddie_fee_thb`, `cart_fee_thb` | null | What are the caddie fee and cart rental fee? |
| 3 | Suwan Golf & Country Club | Bangkok | `caddie_fee_thb`, `cart_fee_thb` | null | Are caddie and cart included in the green fee? If separate, what are the fees? |
| 4 | Summit Windmill Golf Club | Bangkok | `caddie_fee_thb`, `cart_fee_thb` | null | What is the caddie fee? Is cart mandatory on weekdays? |
| 5 | Phoenix Gold Golf & Country Club | Bangkok | `caddie_fee_thb`, `cart_fee_thb` | null | What are the caddie fee and cart rental fee on top of green fee? |
| 6 | Lam Luk Ka Country Club | Bangkok | `caddie_fee_thb`, `cart_fee_thb` | Included | Confirm both included in the 2,600/3,800 THB visitor rate |
| 7 | Chee Chan Golf Resort | Pattaya | `cart_fee_thb` | 850 THB (web-search) | Confirm current cart fee per person |

---

## Missing: Phone numbers

| # | Course | Region | Field | Call to confirm |
|---|---|---|---|---|
| 1 | Nikanti Golf Club | Bangkok | `phone` | Main booking number |
| 2 | Thai Country Club | Bangkok | `phone` | Main booking number |
| 3 | Suwan Golf & Country Club | Bangkok | `phone` | Main booking number |
| 4 | Lam Luk Ka Country Club | Bangkok | `phone` | Main booking number |
| 5 | Panya Indra Golf Club | Bangkok | `phone` | Confirmed via web: 062 821 3333 — verify this is current |
| 6 | Krungthep Kreetha Sports Club | Bangkok | `phone` | Main booking number |
| 7 | The RG City Golf Club | Bangkok | `phone` | Main booking number |
| 8 | Summit Windmill Golf Club | Bangkok | `phone` | Main booking number |
| 9 | Phoenix Gold Golf & Country Club | Bangkok | `phone` | Confirmed via web: +66 95 816 6111 — verify this is current |
| 10 | Burapha Golf & Resort | Pattaya | `phone` | Main booking number (no official website) |
| 11 | Kirimaya Golf Course | Khao Yai | `phone` | Official course/resort contact number (kirimaya.com/contact) |
| 12 | Royal Bang Pa-In Golf Club | Bangkok | `phone` | Main booking number |
| 13 | Suvarnabhumi Golf & Country Club | Bangkok | `phone` | Main booking number |
| 14 | Kiarti Thanee Country Club | Bangkok | `phone` | Main booking number |

---

## Missing: Websites

| # | Course | Region | Field | Notes |
|---|---|---|---|---|
| 1 | Krungthep Kreetha Sports Club | Bangkok | `website` | No official website found — may not have one |
| 2 | Summit Windmill Golf Club | Bangkok | `website` | Found summitwindmillgolfclub.com — needs confirmation it's official |
| 3 | Burapha Golf & Resort | Pattaya | `website` | No official website — currently using Facebook page URL |
| 4 | Suvarnabhumi Golf & Country Club | Bangkok | `website` | No official website found |
| 5 | Kiarti Thanee Country Club | Bangkok | `website` | No official website found |

---

## Missing: Year opened

| # | Course | Region | Field | Notes |
|---|---|---|---|---|
| 1 | Alpine Golf Club | Bangkok | `year_opened` | Not found in any source |
| 2 | Thana City Golf & Sports Club | Bangkok | `year_opened` | Not found |
| 3 | The RG City Golf Club | Bangkok | `year_opened` | Not found |
| 4 | Phoenix Gold Golf & Country Club | Bangkok | `year_opened` | Not found |
| 5 | Summit Windmill Golf Club | Bangkok | `year_opened` | Confirmed 1993 via web search |
| 6 | Panya Indra Golf Club | Bangkok | `year_opened` | Not found |

---

## Club rental — all courses

Club rental availability, fee, and brands must be confirmed for every course. Knowing whether a course rents clubs helps calibrate the LENGOLF CTA (courses without rental are stronger conversion opportunities).

### Bangkok — pending call

| # | Course | `club_rental_available` | `club_rental_fee_thb` | `club_rental_brands` | Call to confirm |
|---|---|---|---|---|---|
| 1 | Alpine Golf & Sports Club | null | null | null | Do you rent club sets? How much? What brands? |
| 2 | Nikanti Golf Club | null | null | null | Do you rent club sets? How much? What brands? |
| 3 | Thai Country Club | null | null | null | Do you rent club sets? How much? What brands? |
| 4 | Thana City Golf & Sports Club | null | null | null | Do you rent club sets? How much? What brands? |
| 5 | Suwan Golf & Country Club | null | null | null | Do you rent club sets? How much? What brands? |
| 6 | Lam Luk Ka Country Club | null | null | null | Do you rent club sets? How much? What brands? |
| 7 | Panya Indra Golf Club | null | null | null | Do you rent club sets? How much? What brands? |
| 8 | Krungthep Kreetha Sports Club | null | null | null | Do you rent club sets? How much? What brands? |
| 9 | The RG City Golf Club | null | null | null | Do you rent club sets? How much? What brands? |
| 10 | Summit Windmill Golf Club | null | null | null | Do you rent club sets? How much? What brands? |
| 11 | Phoenix Gold Golf & Country Club | null | null | null | Do you rent club sets? How much? What brands? |

### Pattaya — partially confirmed

| # | Course | `club_rental_available` | `club_rental_fee_thb` | `club_rental_brands` | Status |
|---|---|---|---|---|---|
| 1 | Siam CC Old Course | **true** | **2,500 THB** | null | Fee confirmed. Call to confirm brand. |
| 2 | Siam CC Plantation | **true** | **2,500 THB** | null | Fee confirmed (same complex). Call to confirm brand. |
| 3 | Burapha Golf & Resort | **true** | **1,000 THB** | null | Fee confirmed. Call to confirm brand. |
| 4 | Laem Chabang International | **false** | — | — | No rental found online — confirm via phone. |
| 5 | Chee Chan Golf Resort | null | null | null | Not found online — call to confirm. |
| 6 | Amata Spring Country Club | null | null | null | Private club — call to confirm if rental available for guests. |

---

### Isan

| # | Course | Approximate coords | Google Maps URL needed |
|---|---|---|---|
| 1 | Dancoon Golf Club | 16.54, 102.86 | Yes — model estimate |
| 2 | Singha Park Khon Kaen | 16.35, 102.95 | Yes — model estimate (Singha Park resort ~30 km from city) |
| 3 | Victory Park G&CC | 17.777, 102.825 | Yes — confirmed via golfshake.com |
| 4 | Royal Creek GC Udon Thani | 17.4646, 102.9641 | Yes — confirmed via allsquaregolf.com |
| 5 | Ubolratana Dam GC | 16.7547, 102.668 | Yes — confirmed via golfshake.com |

## Missing: GPS coordinates and Google Maps URLs

All coordinates are currently approximate (sourced from model knowledge). These must be verified before schema markup goes live — the `sameAs` field in JSON-LD requires an accurate Google Maps URL.

**Recommended approach:** Search each course name on Google Maps, confirm the pin location, then copy the share URL.

### Bangkok

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
| 12 | Bangkok Golf Club | 13.8060, 100.6960 | Yes |
| 13 | Navatanee Golf Course | 13.8230, 100.6590 | Yes |
| 14 | Flora Ville Golf & Country Club | 13.8480, 100.1870 | Yes |
| 15 | Royal Bang Pa-In Golf Club | 14.2200, 100.5780 | Yes |
| 16 | Artitaya Country Club | 14.0930, 100.6750 | Yes |
| 17 | Rajpruek Club | 13.7800, 100.4250 | Yes |
| 18 | Lakewood Country Club | 13.7580, 100.5830 | Yes |
| 19 | Suvarnabhumi Golf & Country Club | 13.7110, 100.7540 | Yes |
| 20 | Windsor Park & Golf Club | 13.8980, 100.6420 | Yes |
| 21 | Cascata Golf Club | 13.9540, 100.6820 | Yes |
| 22 | Kiarti Thanee Country Club | 13.8710, 100.6340 | Yes |
| 23 | Green Valley Country Club | 13.9040, 100.8870 | Yes |
| 24 | Ekachai Golf & Country Club | 13.6182, 100.2747 | Yes — model estimate |
| 25 | Robinswood Golf Club | 13.9632, 100.8201 | Yes — model estimate |
| 26 | Krung Kavee Golf Course | 14.0127, 100.7834 | Yes — model estimate |
| 27 | Sai Golf Club | 14.3155, 100.5212 | Yes — model estimate |
| 28 | Life Privilege Country Club | 14.6523, 101.3841 | Yes — model estimate (Pak Chong area) — **now in khao-yai region** |
| 29 | Star Country Club | 14.1923, 100.5387 | Yes — model estimate |
| 30 | Panurangsi Golf Club | 13.5147, 99.8352 | Yes — model estimate (Ko Phlapphla, Ratchaburi) |
| 31 | Rachakram Golf Club | 14.2156, 100.5614 | Yes — model estimate (Bang Sai, Ayutthaya) |
| 32 | Nichigo Resort & Country Club | 14.1234, 99.3481 | Reasonable confidence (maplogs.com topo data) |
| 33 | Bangpoo Golf & Sports Club | 13.574, 100.854 | Yes — model estimate |
| 34 | Killien Golf Club | 14.119, 100.049 | Yes — model estimate |
| 35 | Muang Ake Golf Course | 14.018, 100.664 | Yes — model estimate |
| 36 | Muang Ake Vista Golf Course | 14.021, 100.661 | Yes — model estimate |
| 37 | Muang Ake Wang Noi Golf Course | 14.212, 100.724 | Yes — model estimate |
| 38 | Northern Rangsit Golf Club | 14.194, 100.739 | Yes — model estimate |
| 39 | Rangsit Sports Club | 14.061, 100.764 | Yes — model estimate |
| 40 | Prime City Golf Club | 14.074, 100.954 | Yes — model estimate |
| 41 | Kumlung-Ake Golf Course | 17.501, 101.729 | Yes — model estimate (Loei province) |
| 42 | Krisda City Golf Hills | 13.858, 100.208 | Yes — model estimate |
| 43 | Ayutthaya Golf Club | 14.348, 100.622 | Yes — model estimate |

### Pattaya

| # | Course | Approximate coords | Google Maps URL needed |
|---|---|---|---|
| 1 | Bangpra International Golf Club | 13.227293, 100.962296 | Confirmed via golfpattaya.com |
| 2 | Wangjuntr Golf Park | 13.023781, 101.424955 | Confirmed via golfdd.com |
| 3 | Kabinburi Sport Club | 14.03076, 101.66471 | Yes — cross-ref travelmyth + golfbangkok, consistent |
| 3 | Siam CC Old Course | 12.836, 101.067 | Yes |
| 2 | Siam CC Plantation | 12.836, 101.067 | Yes (same complex as Old Course) |
| 3 | Burapha Golf & Resort | 13.155, 101.010 | Yes |
| 4 | Laem Chabang International | 13.170, 100.990 | Yes |
| 5 | Chee Chan Golf Resort | 12.772, 100.916 | Yes |
| 6 | Amata Spring Country Club | 13.218, 100.987 | Yes |

### Khao Yai

| # | Course | Approximate coords | Google Maps URL needed |
|---|---|---|---|
| 1 | Kirimaya Golf Course | 14.5251, 101.3720 | Yes |
| 2 | Khao Yai Golf Club | 14.5500, 101.4000 | Yes — coords are model estimate |
| 3 | Mountain Creek Golf Resort | 14.869, 101.718 | Yes — model estimate (Sikhio / Lat Bua Khao) |
| 4 | Bonanza Golf & Country Club | 14.727, 101.398 | Yes — model estimate (Pak Chong / Thanarat Rd) |
| 5 | Seoul Siam Resort & CC | 14.712, 101.363 | Yes — model estimate (Pak Chong highland) |
| 6 | Rooks Korat Country Club | 14.749, 102.006 | Yes — model estimate (Pak Thong Chai) |
| 7 | Rancho Charnvee Resort & CC | 14.6395, 101.4591 | Yes — avg of Deemples + baigolf, consistent |

### Phuket

| # | Course | Approximate coords | Google Maps URL needed | Address status |
|---|---|---|---|---|
| 1 | Red Mountain Golf Club | 7.9265, 98.3384 | Yes | Confirmed (phuketgolfholidays.com) |
| 2 | Blue Canyon Canyon Course | 8.0840, 98.3232 | Yes | Confirmed (bluecanyonphuket.com) |
| 3 | Blue Canyon Lakes Course | 8.0840, 98.3232 | Yes | Confirmed (same complex) |
| 4 | Loch Palm Golf Club | 7.9501, 98.3229 | Yes | Model estimate — verify |
| 5 | Laguna Golf Phuket | 8.0341, 98.2987 | Yes | Model estimate — verify |
| 6 | Mission Hills Phuket | 7.985, 98.421 | Yes | Model estimate (Pa Klok, Thalang) |
| 7 | Phuket Country Club | 7.897, 98.324 | Yes | Model estimate (Kathu) |
| 8 | Aquella Golf & CC | 8.466, 98.270 | Yes | Model estimate (Thai Muang, Phang Nga) |

### Chiang Mai

| # | Course | Approximate coords | Google Maps URL needed |
|---|---|---|---|
| 1 | Alpine Golf Resort Chiang Mai | 18.6915, 99.1739 | Yes |
| 2 | Chiangmai Highlands Golf & Spa Resort | 18.8062, 99.2604 | Yes |

---

## How to update after confirmation

1. Add the confirmed value to `knowledge/course-overrides.md`
2. Tell Claude: "Re-verify [course name] with these corrections: [field] = [value]"
3. Claude will update the approved JSON and republish

Or for a batch: "Here are the confirmed figures: [list] — update and re-publish Bangkok batch"
