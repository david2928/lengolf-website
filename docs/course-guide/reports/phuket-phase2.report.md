# Phuket Phase 2 Pipeline Report
Date: 2026-04-20

---

## Course 1: Mission Hills Phuket Golf Resort & Spa

**Verification status:** APPROVED

**Key facts:**
- Holes: 18 | Par: 72 | Yards: 6,806 (Black tee)
- Designer: Jack Nicklaus (Nicklaus Design)
- Year opened: 2004
- Province: Phuket (Pa Klok, Thalang District — northeast Phuket, ~10 min from airport)
- Low-season GF (Apr–Oct): ฿2,650 | High-season GF (Nov–Mar): ฿3,500
- Caddie: ฿400 (compulsory) | Cart: ฿700 (compulsory)
- Low-season all-in: ฿3,750 | High-season all-in: ~฿4,600

**Disputes:** None.

**Notes:**
- The brief described Mission Hills Phuket as having two 18-hole layouts (Signature Course and Mountain Course). All current sources confirm a single 18-hole course. The dual-layout description applies to Mission Hills Khon Kaen and some other Mission Hills global properties — not Phuket. This is corrected in the record.
- Yardage note in brief was approximate ("6,806 yards") — confirmed exactly 6,806 yards from the Black/championship tee per the official Nicklaus Design listing.
- High-season green fee of ฿3,500 is sourced from phuketgolfholidays.com seasonal differential data cross-checked against a 2024 review citing ~฿4,500 green fee all-in before caddie/cart. Confidence: medium-high.
- priceRange for Stage 5: **฿฿฿** (high-season all-in ≥ ฿4,000)

---

## Course 2: Phuket Country Club

**Verification status:** APPROVED

**Key facts:**
- Holes: 18 (Old Course — the primary championship layout; a separate 9-hole Country Club Course also exists) | Par: 72 | Yards: 6,484 (Blue tee)
- Designer: Dr. Sukitti Klangvisai
- Year opened: 1989 (Phuket's first championship golf course)
- Province: Phuket (Kathu, central Phuket — ~15 min from Patong, ~10 min from Phuket Town)
- Low-season GF (Apr–Oct): ฿2,800 | High-season GF (Nov–Mar): ฿4,000
- Caddie: ฿400 (compulsory) | Cart: ฿700 (optional)
- Low-season GF+caddie: ฿3,200 | High-season GF+caddie: ฿4,400

**Disputes:** None.

**Notes:**
- Low-season green fee ฿2,800 confirmed by phuketgolfcourse.com and phuketgolfholidays.com.
- High-season green fee ฿4,000 sourced from the official Phuket Country Club website (phuketcountryclub.com/green-fee/) as reported in search results. This is notably higher than the low-season rate, consistent with Phuket's seasonal pattern.
- The brief cited 1988 as the opening year; multiple verified sources confirm 1989. Record uses 1989.
- Club has a 52-bay floodlit driving range confirmed operational.
- priceRange for Stage 5: **฿฿฿** (high-season GF+caddie = ฿4,400, meets ≥ ฿4,000 threshold even without cart)

---

## Course 3: Aquella Golf & Country Club

**Verification status:** APPROVED (provisional)

**Key facts:**
- Holes: 18 | Par: 72 | Yards: 7,019 (Black tee)
- Designer: Pacific Coast Design (Paul Reeves & Phil Ryan)
- Year opened: 2021 (redesign/rebuild of former Thai Muang Beach Golf & Marina site)
- Province: Phang Nga (Thai Muang District — 44 km / ~40 min north of Phuket Airport)
- Low-season GF (Apr–Oct): ฿1,850 (confirmed) | High-season GF (Nov–Mar): ฿3,150 (PROVISIONAL)
- Caddie: ฿400 (compulsory) | Cart: ฿700 (compulsory)
- Low-season all-in: ฿2,950 | High-season all-in: ~฿4,250 (provisional)

**Disputes:**
1. **green_fee_weekend_thb (high-season GF): PROVISIONAL**
   - Low-season GF ฿1,850 is confirmed by multiple sources.
   - High-season GF of ฿3,150 is sourced from a golfsavers.com page pricing text ("3150 3150 1000 THB") which lacked clear seasonal labelling.
   - No other source explicitly confirmed a separate high-season rate for Aquella.
   - **Action required before Stage 5:** Confirm high-season rate directly with course — booking@aquellagolf.com or +66 76 679 308.

**Notes:**
- The course is physically in Phang Nga province (Thai Muang District); the `province` field reflects this correctly. The course is published under `region: phuket` for discoverability per pipeline instructions.
- Aquella was built on the land of the former Thai Muang Beach Golf & Marina. The redesign by Pacific Coast Design retained ~30% of the original land and opened in 2021.
- Driving range status not confirmed — left null pending verification.
- Coordinates (8.466°N, 98.270°E) are model estimates for Thai Muang Beach area — verify via Google Maps before Stage 5.
- Club rental (฿1,500/set) confirmed available via golfasian.com listing.
- priceRange for Stage 5: **฿฿฿** if high-season rate is ≥฿3,300 (all-in ≥฿4,000). If provisional ฿3,150 is correct, all-in = ฿4,250 → **฿฿฿**. Low-season all-in ฿2,950 would be **฿฿** — note this discrepancy when choosing a single priceRange value.

---

## Summary

| # | Course | Status | Notes |
|---|---|---|---|
| 1 | Mission Hills Phuket Golf Resort & Spa | APPROVED | Single 18-hole Nicklaus layout (not 36 holes as briefed) |
| 2 | Phuket Country Club | APPROVED | Oldest Phuket course, 1989; high-season GF ฿4,000 from official site |
| 3 | Aquella Golf & Country Club | APPROVED (provisional) | High-season GF unconfirmed — verify before Stage 5 |

**3 / 3 approved for publishing** (Course 3 requires one fee confirmation before Stage 5 TypeScript file is written).

### Action items before Stage 5

1. **Aquella high-season green fee:** Email booking@aquellagolf.com or call +66 76 679 308 to confirm the Nov–Mar green fee rate. The provisional figure of ฿3,150 should be confirmed or corrected.
2. **Google Maps URLs:** All three courses have model-generated Google Maps URLs. Replace with verified CID-based URLs (copy link from Google Maps) during Stage 5.
3. **Aquella driving range:** Confirm whether a driving range or practice facility exists on site — not found in any source reviewed.
4. **priceRange values:** Mission Hills ฿฿฿, Phuket Country Club ฿฿฿, Aquella ฿฿฿ (subject to high-season rate confirmation).
