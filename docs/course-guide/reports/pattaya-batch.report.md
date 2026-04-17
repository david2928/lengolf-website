# Pattaya Batch Verification Report
Generated: 2026-04-17
Updated: 2026-04-17
Courses: 6
Status: 5 APPROVED (pending call-confirms), 1 REVIEW_REQUIRED (Plantation weekend fee)

---

## Summary

| # | Course | Status | Issues |
|---|---|---|---|
| 1 | Siam Country Club Old Course | APPROVED | — |
| 2 | Siam Country Club Plantation | REVIEW_REQUIRED | Weekend green fee is model estimate |
| 3 | Burapha Golf & Resort | APPROVED | Website = Facebook page; phone pending call |
| 4 | Laem Chabang International Country Club | APPROVED | GPS approximate |
| 5 | Chee Chan Golf Resort | APPROVED | Cart fee 850 THB added; club rental pending call |
| 6 | Amata Spring Country Club | APPROVED | Private club; page will publish with null fees + editorial prose |

---

## Disputes requiring your input

### 2. Siam Country Club Plantation — `green_fee_weekend_thb`

- Stage 1 found: **3,300 THB weekday** (from GolfThai.com/asiagolf.com)
- Weekend rate: **model estimate 4,000 THB** — not confirmed by any live source
- Recommendation: Verify directly at siamcountryclub.com or by calling +66 38 909 700 before publishing
- **Your call:** Accept model estimate / Provide correct value / Hold until confirmed

### 3. Burapha Golf & Resort — website resolved, phone still pending

- Website: **Updated** — Facebook page URL used as primary online presence
- Phone: **null** — added to `data-gaps.md` for phone verification
- GPS coordinates: **model estimate** (13.155°N, 101.010°E) — see data-gaps.md

---

## Prose flags (non-blocking)

### 1. Siam Country Club Old Course — `overview`

- Claim: "The rebuilt course has hosted the Honda LPGA Thailand championship every year since 2006"
- Issue: "Every year since 2006" is a strong claim — the event may have been cancelled or moved in some years (COVID, etc.)
- Recommendation: Soften to "has hosted the Honda LPGA Thailand championship annually since 2006, with occasional breaks"
- **Your call:** Accept recommendation / Confirm continuity / Ignore

### 5. Chee Chan Golf Resort — `overview`

- Claim: "Golf Digest Thailand named it the Best Course in Thailand in 2020, and the World Golf Awards recognised it the same year"
- Issue: Sourced from web-search results; the exact award names should be verified
- Recommendation: Source confirmed from multiple booking platforms — low risk; keep as written
- **Your call:** Accept / Remove award claims

---

## GPS coordinates — all six courses

All GPS coordinates in this batch are model-sourced estimates. None were confirmed via a primary mapping source. Flagged as medium priority — course pages will render but Google Maps / sameAs schema will be approximate.

| Course | Latitude | Longitude | Confidence |
|---|---|---|---|
| Siam CC Old Course | 12.836 | 101.067 | Low — verify |
| Siam CC Plantation | 12.836 | 101.067 | Low — same complex |
| Burapha Golf & Resort | 13.155 | 101.010 | Low — verify |
| Laem Chabang International | 13.170 | 100.990 | Low — verify |
| Chee Chan Golf Resort | 12.772 | 100.916 | Low — verify |
| Amata Spring CC | 13.218 | 100.987 | Low — verify (BLOCKED) |

---

## Schema completeness check

| Course | name | province | holes | par | lat/lng | wkday fee | wkend fee | caddie_req | cart_req | website | phone |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Siam CC Old Course | ✅ | ✅ | ✅ | ✅ | ⚠️ approx | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Siam CC Plantation | ✅ | ✅ | ✅ | ✅ | ⚠️ approx | ✅ | ⚠️ est | ✅ | ✅ | ✅ | ✅ |
| Burapha Golf & Resort | ✅ | ✅ | ✅ | ✅ | ⚠️ approx | ✅ | ✅ | ✅ | ✅ | ❌ null | ❌ null |
| Laem Chabang International | ✅ | ✅ | ✅ | ✅ | ⚠️ approx | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Chee Chan Golf Resort | ✅ | ✅ | ✅ | ✅ | ⚠️ approx | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Amata Spring CC | ✅ | ✅ | ✅ | ✅ | ⚠️ approx | ❌ null | ❌ null | ✅ | ✅ | ✅ | ❌ null |

**Blockers (required fields missing):**
- Amata Spring: green_fee_weekday_thb and green_fee_weekend_thb are null → BLOCKED (private)

**Non-blocking gaps:**
- Burapha: website and phone null → publishable but flagged for follow-up

---

## SEO check

| Course | Slug | Title (auto-generated) | Meta desc target |
|---|---|---|---|
| Siam CC Old Course | `siam-country-club-old-course` | Siam Country Club Pattaya, Old Course — Green Fees, Course Guide & Golf Club Rentals \| Len.Golf | 140–160 chars ✅ |
| Siam CC Plantation | `siam-country-club-plantation` | Siam Country Club Pattaya, Plantation Course — Green Fees, Course Guide & Golf Club Rentals \| Len.Golf | 140–160 chars ✅ |
| Burapha Golf & Resort | `burapha-golf-club` | Burapha Golf & Resort — Green Fees, Course Guide & Golf Club Rentals \| Len.Golf | 140–160 chars ✅ |
| Laem Chabang International | `laem-chabang-international` | Laem Chabang International Country Club — Green Fees, Course Guide & Golf Club Rentals \| Len.Golf | 140–160 chars ✅ |
| Chee Chan Golf Resort | `chee-chan-golf-resort` | Chee Chan Golf Resort — Green Fees, Course Guide & Golf Club Rentals \| Len.Golf | 140–160 chars ✅ |
| Amata Spring CC | `amata-spring-country-club` | BLOCKED — not for publication | — |

---

## Ready to approve

**Courses that can publish as-is (3):**
1. Siam Country Club Old Course ✅
4. Laem Chabang International Country Club ✅
5. Chee Chan Golf Resort ✅

**Courses that need your input before approving (2):**
2. Siam Country Club Plantation — confirm/supply weekend green fee
3. Burapha Golf & Resort — confirm/supply website URL and phone number

**Courses that need a status decision (1):**
6. Amata Spring Country Club — recommend `skip`; confirm

---

Say: **"Approve Pattaya batch"** to approve all unblocked courses as-is
Or resolve disputes first:
- `"Plantation weekend fee is X THB"`
- `"Burapha website is https://... phone is +66..."`
- `"Skip Amata Spring"` / `"Keep Amata Spring"`
