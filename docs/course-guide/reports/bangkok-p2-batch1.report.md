# Bangkok Phase 2 — Batch 1 Verification Report

Prepared: 2026-04-20
Courses: 12
Status: **Disputes require resolution** (2 green fee disputes; 1 schema issue; 1 designer spelling fix)

---

## Summary table

| # | Course | Slug | Verification status | Key issues |
|---|---|---|---|---|
| 1 | Bangkok Golf Club | `bangkok-golf-club` | APPROVED (provisional) | Designer name confirmed; coordinates model-sourced only |
| 2 | Navatanee Golf Course | `navatanee-golf-course` | **HELD** | Green fee outdated (4,700 → 5,300 THB all-in); `overview_note` stray field must be removed |
| 3 | Flora Ville Golf & Country Club | `flora-ville-golf-country-club` | APPROVED (provisional) | Weekend fee null; yardage minor discrepancy (6,747 vs 6,728) |
| 4 | Royal Bang Pa-In Golf Club | `royal-bang-pa-in-golf-club` | APPROVED | All core fields confirmed; phone null |
| 5 | Artitaya Country Club | `artitaya-country-club` | **HELD** | 400/800 THB confirmed green-fee-only; all-in total unconfirmed; province unusual |
| 6 | Rajpruek Club | `rajpruek-club` | APPROVED | Private members-only confirmed; null fees correct; distance/coords model-sourced |
| 7 | Lakewood Country Club | `lakewood-country-club` | APPROVED (provisional) | Designer spelling variant; 27-hole, fee is per-18 confirmed |
| 8 | Suvarnabhumi Golf & Country Club | `suvarnabhumi-golf-country-club` | APPROVED (provisional) | 36 holes confirmed; 2,000 THB per-18 plausible; weekend fee null; no website/phone |
| 9 | Windsor Park & Golf Club | `windsor-park-golf-club` | APPROVED | All core fields verified; 36-hole confirmed |
| 10 | Cascata Golf Club | `cascata-golf-club` | APPROVED (provisional) | Green fees broadly align; caddie fee breakdown null needs note |
| 11 | Kiarti Thanee Country Club | `kiarti-thanee-country-club` | APPROVED (provisional) | No website; caddie fee null; designer compound name fine |
| 12 | Green Valley Country Club | `green-valley-country-club` | APPROVED | All core fields verified; Trent Jones Jr. confirmed |

---

## Course-by-course detail

---

### Course 1 — Bangkok Golf Club

**Slug:** `bangkok-golf-club`
**Verification status:** APPROVED (provisional)

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Bangkok Golf Club | web-search | High |
| Province | Pathum Thani | web-search | High |
| Designer | Chird Boonyarattanevet | web-search (golfasian.com) | High — confirmed by multiple sources |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 6,812 | web-search | High |
| Year opened | 1993 | web-search | High |
| Green fee weekday | 2,300 THB | web-search (1golf.eu) | Medium — green fee only (caddie + cart separate) |
| Green fee weekend | 3,100 THB | web-search | Medium — green fee only |
| Caddie fee | 400 THB | web-search | Medium |
| Cart fee | 700 THB | web-search | Medium |
| Caddie required | true | web-search | High |
| Cart required | false | web-search | High |
| Latitude/Longitude | 14.012, 100.529 | model | Low — needs map verification |

**Disputes:** None. Designer name "Chird Boonyarattanevet" is confirmed by GolfAsian and multiple other sources. The name is unusual but correct.

**Notes:** Coordinates are model-sourced. The course's own site (bkkgolfclub.com) was not referenced for fee verification — recommend a secondary check if fees are published there. Green fees are confirmed as excluding caddie and cart; the prose correctly states this.

---

### Course 2 — Navatanee Golf Course

**Slug:** `navatanee-golf-course`
**Verification status:** HELD

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Navatanee Golf Course | official-website | High |
| Province | Bangkok | web-search | High |
| Designer | Robert Trent Jones Jr. | web-search | High — widely confirmed |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 6,902 | web-search | High |
| Year opened | 1973 | web-search | High |
| Green fee weekday | 4,700 THB | web-search (where2golf.com) | **Low — OUTDATED** |
| Green fee weekend | 6,100 THB | web-search | **Low — likely outdated** |
| Caddie fee | null | — | — |
| Cart fee | null | — | — |
| Caddie required | true | web-search | High |
| Cart required | true | web-search | High |

**Disputes:**

1. **Green fee weekday (critical):** JSON records 4,700 THB. Verification search finds the current all-inclusive weekday rate is **5,300 THB** (April 2025 per golfdd.com) and **5,450 THB** (Nov 2025–Feb 2026 per Club Thailand Card). The 4,700 THB figure appears to date from approximately 2021 and is stale. The JSON `overview_note` field itself says "Green fees confirmed as all-inclusive (caddie and cart included)" — this is inconsistent with the 4,700 THB figure (which was the old all-in rate).
   - **Recommend publishing:** weekday 5,300 THB all-in; weekend rate null (pending confirmation).

2. **Stray schema field:** The JSON contains a non-standard `overview_note` field inside the `prose` block:
   ```
   "overview_note": "Green fees confirmed as all-inclusive (caddie and cart included) — individual caddie and cart breakdown not separately published."
   ```
   This field does not exist in the schema for any other course. It must be removed before the file is used downstream. The information it conveys (all-in pricing) should be incorporated into the `overview` prose instead.

**Notes:** Weekend rate of 6,100 THB (where2golf.com) is also likely outdated. The prose is internally consistent with the old 4,700 THB rate and will need updating if the fee is corrected.

---

### Course 3 — Flora Ville Golf & Country Club

**Slug:** `flora-ville-golf-country-club`
**Verification status:** APPROVED (provisional)

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Flora Ville Golf & Country Club | web-search | High |
| Province | Pathum Thani | web-search | High |
| Designer | Nick Faldo | web-search (golfasian.com) | High — confirmed by multiple sources |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 6,747 | web-search (golfsavers.com) | Medium — minor source conflict (6,728 on kolfers.com) |
| Year opened | 1998 | web-search | High |
| Green fee weekday | 1,200 THB | web-search (golfcards.com) | Medium — green fee only; plausible for budget Nick Faldo layout |
| Green fee weekend | null | web-search | — no weekend fee found |
| Caddie fee | 400 THB | web-search | Medium |
| Cart fee | 700 THB | web-search | Medium |
| Caddie required | true | web-search | High |

**Disputes:**
- **Yards:** JSON records 6,747 (golfsavers.com); kolfers.com lists 6,728. Difference is minor (19 yards) and likely reflects different tee configurations. Recommend keeping 6,747 from the more authoritative booking source.

**Notes:** Weekend green fee is null — the prose notes this and instructs readers to contact the course. This is acceptable given the data gap. The Nick Faldo designer credit is confirmed by multiple independent sources.

---

### Course 4 — Royal Bang Pa-In Golf Club

**Slug:** `royal-bang-pa-in-golf-club`
**Verification status:** APPROVED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Royal Bang Pa-In Golf Club | official-website | High |
| Province | Ayutthaya | web-search | High |
| Designer | Schmidt-Curley Design | web-search | High — confirmed by multiple sources |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 7,054 | web-search | High (GolfPass records 7,052 — negligible) |
| Year opened | 2017 | web-search | High — confirmed |
| Green fee weekday | 4,300 THB | web-search (easygolfbooking.com) | Medium — described as all-inclusive in prose |
| Green fee weekend | 5,400 THB | web-search | Medium — all-inclusive |
| Caddie required | true | web-search | High |
| Cart required | true | web-search | High |
| Club rental brands | Titleist, Callaway | web-search | Medium |
| Phone | null | — | Missing |

**Disputes:** None significant. GolfPass records 7,052 yards vs 7,054 — immaterial.

**Notes:** Phone number is null and should be added if the official website (royalbpgolf.com) lists one. The all-in fee description in the prose is consistent with the JSON (caddie and cart null, package pricing stated). Province is Ayutthaya, correctly filed under the Bangkok region grouping (it is within day-trip range).

---

### Course 5 — Artitaya Country Club

**Slug:** `artitaya-country-club`
**Verification status:** HELD

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Artitaya Country Club | web-search | High |
| Province | Nakhon Nayok | web-search (birdie.in.th) | High |
| Designer | Jack Tuthill | web-search (birdie.in.th) | Medium — spelled "Jack Tutill" on some sources; verify |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 7,054 | web-search | High |
| Year opened | 1994 | web-search | High |
| Green fee weekday | 400 THB | web-search (1golf.eu) | **Low — green fee only, not all-in** |
| Green fee weekend | 800 THB | web-search (1golf.eu) | **Low — green fee only, not all-in** |
| Caddie fee | null | — | Not found |
| Cart fee | null | — | Not found |
| Caddie required | true | model | Medium |
| Distance from Bangkok | 90 km | model | Medium |
| Drive time | 75 min | web-search | Medium |

**Disputes:**

1. **Green fee 400/800 THB — confirmed green-fee-only (critical):** Verification searches confirm these are the gate green fee rates only. Caddie and cart are additional mandatory charges that are not published online. Historical data (2020) suggested Sunday all-in rates around 1,250 THB and weekday all-in around 950 THB, but these are significantly outdated. The current all-in cost is unconfirmed. The prose itself notes: *"published green fees of 400–800 THB may exclude significant additional charges"* — this is correct, but the JSON `green_fee_weekday_thb` and `green_fee_weekend_thb` fields record only the base green fee, which could mislead if displayed without context.
   - **Recommend:** Add a `fee_note` or update prose to prominently flag these as green-fee-only. Do NOT increase the published green fee value without confirmed data.

2. **Designer name spelling:** "Jack Tuthill" (birdie.in.th) vs "Jack Tutill" (golfsavers.com). The correct spelling is likely "Jack Tuthill" — confirm against authoritative sources before publishing.

3. **Province assignment:** Nakhon Nayok is approximately 90 km from Bangkok and is geographically distant from the core Bangkok market. It is grouped under "Bangkok region" (consistent with Cascata, which is also Nakhon Nayok), which is acceptable for day-trip purposes — but a clear "Nakhon Nayok province" attribution in the prose is important.

**Notes:** The prose handles the uncertainty well and already warns visitors to confirm all-in pricing. The file is HELD pending resolution of the fee ambiguity — at minimum, a clear schema note or `caddie_required: true` + `cart_required: false/true` populated from the course directly.

---

### Course 6 — Rajpruek Club

**Slug:** `rajpruek-club`
**Verification status:** APPROVED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Rajpruek Club | official-website | High |
| Province | Bangkok (Laksi) | web-search | High |
| Designer | J. Michael Poellot | web-search | High — confirmed by where2golf.com, golflux.com |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 6,565 | web-search | High |
| Year opened | 1994 | web-search | High |
| Green fee weekday | null | — | Correct — private club, no public fee |
| Green fee weekend | null | — | Correct |
| Access | Members + hosted guests only | verified | High |
| Distance from Bangkok | 15 km | model | Medium |
| Drive time | 20 min | model | Medium |

**Disputes:** None.

**Notes:** Null green fees are correct and expected for a members-only private club. Guest policy confirmed: members may bring guests up to twice per month (max 6 guests at 500 THB/guest surcharge). The prose correctly describes access requirements. Coordinates and distance are model-sourced; consider map verification for coordinates. Designer spelling "Poellot" is confirmed correct (the JSON for Lakewood incorrectly uses "Poellet" — see Course 7).

---

### Course 7 — Lakewood Country Club

**Slug:** `lakewood-country-club`
**Verification status:** APPROVED (provisional)

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Lakewood Country Club | web-search | High |
| Province | Samut Prakan | web-search | High |
| Designer | J. Michael Poellet | web-search (golfasian.com) | Medium — **spelling error, should be "Poellot"** |
| Holes | 27 | web-search | High |
| Par | 72 | web-search | High (per 18-hole combination) |
| Yards | 7,145 | web-search | High |
| Year opened | 1992 | web-search | High |
| Green fee weekday | 1,900 THB | web-search | Medium — green fee only |
| Green fee weekend | 2,300 THB | web-search | Medium — green fee only |
| Caddie fee | 1,000 THB | web-search (golfsavers.com) | Medium — notably higher than typical 400 THB |
| Cart fee | 700 THB | web-search | Medium |
| Caddie required | true | web-search | High |

**Disputes:**

1. **Designer spelling:** JSON records "J. Michael Poellet" (sourced from golfasian.com). Correct spelling confirmed as **"J. Michael Poellot"** (lakewoodlinksthailand.com, GolfPass, multiple sources). This is the same designer as Rajpruek Club where the spelling is correct. Fix before publishing.

2. **Caddie fee 1,000 THB:** This is unusually high compared to the Bangkok norm of ~400 THB. Golfsavers.com is the source. This may reflect a per-cart (shared) caddie rate for the 27-hole complex or a different pricing structure. The prose does note this figure. Recommend flagging for direct confirmation with the course.

**Notes:** Fees are confirmed as per 18 holes (not per full 27). The 27-hole structure (Lake, Wood, Rock nines) is correctly described.

---

### Course 8 — Suvarnabhumi Golf & Country Club

**Slug:** `suvarnabhumi-golf-country-club`
**Verification status:** APPROVED (provisional)

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Suvarnabhumi Golf & Country Club | web-search | High |
| Province | Bangkok (Nong Chok) | web-search | High |
| Designer | Robert Trent Jones Jr. | web-search | High — confirmed |
| Holes | 36 | web-search | High — confirmed (4 nine-hole loops) |
| Par | 72 | web-search | High (per 18-hole combination) |
| Yards | 7,059 | web-search | Medium |
| Year opened | 1993 | web-search | High |
| Green fee weekday | 2,000 THB | web-search | Medium — stated as starting fee, per 18 holes |
| Green fee weekend | null | — | Not found — acceptable |
| Caddie fee | null | — | Not found |
| Cart fee | 600 THB | web-search | Medium |
| Caddie required | true | web-search | High |
| Website | null | — | Missing |
| Phone | null | — | Missing |

**Disputes:** None directly confirmed. The 36-hole question (are fees per 18 or full 36?) is addressed: the prose states "starting fees from approximately 2,000 THB weekday" and the 7,059-yard figure refers to one 18-hole combination — this is consistent with per-18-hole pricing. The four-nine structure (North/East/West/South) confirms fees are per 18 holes.

**Notes:** Website and phone are both null — unusual gap for a venue of this size. The course may now operate under a different trading name or booking system (it was originally "President Country Club"). Recommend a direct search for current contact details before publishing. Province listed as Bangkok is correct — Nong Chok is an eastern Bangkok district.

---

### Course 9 — Windsor Park & Golf Club

**Slug:** `windsor-park-golf-club`
**Verification status:** APPROVED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Windsor Park & Golf Club | web-search | High |
| Province | Bangkok (Nong Chok) | web-search | High |
| Designer | Ronald Fream & David Dale | web-search | High — confirmed |
| Holes | 36 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 6,970 | web-search | Medium |
| Year opened | 1994 | web-search | High |
| Green fee weekday | 1,500 THB | web-search (1golf.eu) | Medium — green fee only |
| Green fee weekend | 2,200 THB | web-search | Medium — green fee only |
| Caddie fee | 400 THB | web-search | High |
| Cart fee | 700 THB | web-search | High |
| Caddie required | true | web-search | High |
| Driving range | true | web-search | High |

**Disputes:** None.

**Notes:** All core fields verify well. The 36-hole, 4-nine structure (Lagoon, Palm, Garden, Lakeside) is accurately described. Green fees are confirmed as per 18-hole combination, not full 36.

---

### Course 10 — Cascata Golf Club

**Slug:** `cascata-golf-club`
**Verification status:** APPROVED (provisional)

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Cascata Golf Club | official-website | High |
| Province | Nakhon Nayok | web-search | High |
| Designer | Thanawat Saprungruang | web-search | High |
| Holes | 36 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 7,394 | web-search | Medium |
| Year opened | 2006 | web-search | High |
| Green fee weekday | 2,850 THB | web-search (golfdigg.com) | Medium — stated as all-in (foreign rate) |
| Green fee weekend | 3,850 THB | web-search (golfdigg.com) | Medium — stated as all-in (foreign rate) |
| Caddie fee | null | — | Caddie included in all-in foreign rate |
| Cart fee | 750 THB | web-search | Medium — but note: search found 770 THB (Feb 2026) |
| Cart required | true | web-search | High |
| Caddie required | true | web-search | High |

**Disputes:**

1. **Cart fee minor discrepancy:** JSON records 750 THB (golfasian.com); a 2026 GolfDigg review mentions 770 THB. Minor price inflation — not a material dispute.

2. **Fee structure clarification:** The 2,850 / 3,850 THB figures appear to be the "foreign all-in" package rate (green fee + caddie + cart) as mentioned in the prose. However, a recent (Feb 2026) GolfDigg data point suggests the green fee + cart alone is approximately 1,670 THB + 430 THB caddie = ~2,100 THB total. This is lower than the 2,850 THB all-in package. The discrepancy may reflect different booking channels (booking agent "foreign rate" vs direct Thai rate). The prose correctly notes "Foreign visitor all-in packages run approximately 2,850 THB weekday" — this channel-based distinction should be retained.

**Notes:** Nakhon Nayok province is correctly identified. Distance/drive time (80 km / 70 min) aligns with the Artitaya data for the same area.

---

### Course 11 — Kiarti Thanee Country Club

**Slug:** `kiarti-thanee-country-club`
**Verification status:** APPROVED (provisional)

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Kiarti Thanee Country Club | web-search | High |
| Province | Samut Prakan | web-search | High |
| Designer | Yoshiharu Ihara (redesigned 2004 by Kato Yoshikazu) | web-search | Medium — compound attribution is unusual but recorded |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 6,905 | web-search | High |
| Year opened | 1989 | web-search | High |
| Green fee weekday | 2,100 THB | web-search (1golf.eu) | Medium — green fee only |
| Green fee weekend | 2,800 THB | web-search | Medium — green fee only |
| Caddie fee | null | — | Not found |
| Cart fee | 700 THB | web-search | Medium |
| Caddie required | true | web-search | High |
| Website | null | — | Missing |
| Driving range | true | web-search | High |

**Disputes:** None.

**Notes:** Website is null — this is a gap; the course may have a website that was not located. The compound designer attribution (original + 2004 redesign) is handled well in the prose. Caddie fee null is a minor gap but does not block approval.

---

### Course 12 — Green Valley Country Club

**Slug:** `green-valley-country-club`
**Verification status:** APPROVED

| Field | Value in JSON | Source | Confidence |
|---|---|---|---|
| Name | Green Valley Country Club | official-website | High |
| Province | Samut Prakan | web-search | High |
| Designer | Robert Trent Jones Jr. | web-search | High — confirmed by multiple sources |
| Holes | 18 | web-search | High |
| Par | 72 | web-search | High |
| Yards | 7,051 | web-search | High |
| Year opened | 1988 | web-search | High |
| Green fee weekday | 2,000 THB | web-search (1golf.eu) | Medium — green fee only |
| Green fee weekend | 3,000 THB | web-search | Medium — green fee only |
| Cart fee | 800 THB | web-search | Medium |
| Caddie required | true | web-search | High |
| Cart required | false | model | Medium |
| Driving range | true | web-search | High |

**Disputes:** None.

**Notes:** Green fees confirmed as excluding caddie (which is compulsory). The 800 THB cart fee is consistent across sources. Official website (greenvalleybangkok.com) is confirmed. This is one of the three Robert Trent Jones Jr. designs in the batch (with Navatanee and Suvarnabhumi) — all correctly attributed.

---

## Recommended actions for Chris

**Must-fix before any file goes live (HELD courses):**

- [ ] **Navatanee — update green fees:** Replace weekday 4,700 THB with current all-in rate of 5,300 THB (April 2025 confirmed). Update weekend fee (6,100 THB likely stale — recommend null or confirmed figure). Update prose to reflect current pricing. **Remove the `overview_note` stray field from the JSON schema** — merge that information into `overview` prose instead.
- [ ] **Artitaya — resolve fee ambiguity:** The 400/800 THB figures are confirmed green-fee-only. Caddie and cart fees are not publicly listed. Either (a) obtain current all-in total from the course directly, or (b) keep 400/800 THB with a prominent `fee_note` field or prose warning flagging these as base green fee only. Do not publish without resolution.

**Should-fix (provisional courses):**

- [ ] **Lakewood — fix designer spelling:** Change "J. Michael Poellet" to "J. Michael Poellot" (confirmed correct). Update the `designer.url` source attribution accordingly.
- [ ] **Lakewood — verify caddie fee 1,000 THB:** Unusually high. Confirm with the course whether this is per-golfer or per-cart (shared).
- [ ] **Bangkok Golf Club — verify coordinates:** Lat/long 14.012, 100.529 are model-sourced. Verify against Google Maps before publishing.
- [ ] **Rajpruek Club — verify coordinates:** Lat/long 13.903, 100.567 are model-sourced. Approximate only.
- [ ] **Royal Bang Pa-In — add phone number:** Official website royalbpgolf.com should list a contact number.
- [ ] **Suvarnabhumi — find website and phone:** Both are null. The course operated previously as President Country Club; check for current booking/contact details.
- [ ] **Kiarti Thanee — find website:** Website is null; a quick search may surface an official or booking-platform URL.
- [ ] **Flora Ville — confirm weekend fee:** Weekend green fee is null. A single call or booking platform check should surface this.

**Schema notes:**

- [ ] Confirm that `overview_note` is not a permitted field in the enriched JSON schema. Remove it from `navatanee-golf-course.json` as part of the fee update.
- [ ] Consider adding a `fee_includes` or `fee_note` field to the schema for courses where the relationship between green fee and caddie/cart is unclear — Artitaya is the immediate use case but Navatanee and Cascata have similar ambiguity.
