# Khao Yai Batch — Verification Report

Prepared: 2026-04-20  
Courses: 2  
Region: `khao-yai`  
Status: **Ready for approval**

---

## Summary

Both Khao Yai Phase 1 courses are Jack Nicklaus designs within 15 km of each other in Pak Chong district, Nakhon Ratchasima province. Kirimaya (2004) is a resort course attached to the Kirimaya luxury eco-resort; Khao Yai Golf Club (2002) is an independent country club. Both are approximately 2 hours / 175–180 km from Bangkok.

---

## Course 1 — Kirimaya Golf Course

**Slug:** `kirimaya-golf-course`  
**Verification status:** APPROVED (1 field provisional)

| Field | Value | Source | Confidence |
|---|---|---|---|
| Name | Kirimaya Golf Course | official-website | High |
| Province | Nakhon Ratchasima | web-search | High |
| Designer | Jack Nicklaus | web-search | High |
| Holes | 18 | official-website | High |
| Par | 72 | web-search | High |
| Yards | 7,170 | web-search | Medium |
| Year opened | 2004 | web-search | High |
| Green fee (weekday) | **1,700 THB** ⚠️ provisional | model | Low |
| Green fee (weekend) | **1,700 THB** ⚠️ provisional | model | Low |
| Caddie fee | 400 THB | web-search | Medium |
| Cart fee | 600 THB | web-search | Medium |
| Caddie required | Yes | web-search | High |
| Cart required | Yes | web-search | High |
| Phone | null ⚠️ | model | — |
| GPS | 14.5251, 101.3720 | web-search | Medium |
| Distance from Bangkok | 175 km / 120 min | web-search | Medium |
| Club rental | Available, 800 THB | web-search | Medium |

### Disputes

**1. Green fee (weekday/weekend) — PROVISIONAL**
- Only historical estimates (~1,700 THB) found; Kirimaya official website does not publish current rates
- Resolution: publish 1,700 THB as provisional — add to data-gaps.md for phone confirmation

### Notes
- Phone number not confirmed — needs call to verify. Kirimaya resort main line needed.
- GPS coordinates are approximate; Google Maps verification required.
- The course is part of the Kirimaya resort; golf booking is separate from room reservations.

---

## Course 2 — Khao Yai Golf Club

**Slug:** `khao-yai-golf-club`  
**Verification status:** APPROVED (2 fields disputed, resolved)

| Field | Value | Source | Confidence |
|---|---|---|---|
| Name | Khao Yai Golf Club | official-website | High |
| Province | Nakhon Ratchasima | official-website | High |
| Designer | Jack Nicklaus | web-search | High |
| Holes | 18 | official-website | High |
| Par | 72 | web-search | High |
| Yards | 7,058 | web-search | Medium |
| Year opened | 2002 | web-search | High |
| Green fee (weekday) | **1,900 THB** ⚠️ disputed | web-search | Medium |
| Green fee (weekend) | **1,900 THB** ⚠️ disputed | web-search | Medium |
| Caddie fee | 400 THB | web-search | Medium |
| Cart fee | 700 THB | web-search | Medium |
| Caddie required | Yes | web-search | High |
| Cart required | No (optional) | model | Low |
| Phone | +66 89 225 6363 | official-website | High |
| GPS | 14.5500, 101.4000 | model | Low |
| Distance from Bangkok | 180 km / 120 min | web-search | Medium |
| Club rental | Available, fee unknown | web-search | Medium |

### Disputes

**1. Green fee (weekday) — RESOLVED**
- GolfSavers: 1,000 THB (likely local/outdated rate)
- Web-search / booking agents: 1,900 THB (tourist green fee)
- Resolution: publish 1,900 THB — add to data-gaps.md for phone confirmation

**2. Green fee (weekend) — RESOLVED**
- GolfSavers: 1,200 THB
- No clear weekday/weekend distinction found in current sources
- Resolution: publish 1,900 THB for both; confirm weekend differential by phone

### Notes
- Also marketed as "Khao Yai Country Club" — same club, BRC group operator.
- GPS coordinates are approximate (model estimate based on address: Tambon Mu Si, Pak Chong). Google Maps verification required.
- Cart required status unclear — publishing as optional pending confirmation.
- Club rental fee unknown — publishing null.

---

## Data gaps to add after approval

The following items to add to `data/data-gaps.md`:

1. **Kirimaya** — green fee (provisional 1,700 THB): phone Kirimaya resort for current 2026 rate
2. **Kirimaya** — phone number: find official course contact number on kirimaya.com/contact
3. **Kirimaya** — GPS: verify on Google Maps
4. **Khao Yai Golf Club** — green fee (weekday 1,900 THB): phone +66 89 225 6363 to confirm 2026 rate and weekday/weekend split
5. **Khao Yai Golf Club** — cart required status: confirm whether cart is mandatory
6. **Khao Yai Golf Club** — club rental fee: confirm fee by phone
7. **Khao Yai Golf Club** — GPS: verify on Google Maps

---

## Actions required from Chris

- [ ] **1. Review** the two course entries above
- [ ] **2. Approve** this batch (or flag any disputes for revision)
- [ ] **3. Confirm** → Claude runs Stage 5 publish script and updates `data/golf-courses/khao-yai/`

On approval, Claude will:
1. Copy verified JSONs to `docs/course-guide/data/4.approved/khao-yai/`
2. Run the publish script → `data/golf-courses/khao-yai/kirimaya-golf-course.ts`, `khao-yai-golf-club.ts`, `index.ts`
3. Add `'khao-yai'` to `REGIONS` in `lib/golf-courses.ts` + add `REGION_META` entry
4. Move `khao-yai` from `COMING_SOON_REGIONS` to `PUBLISHED_REGIONS` in `app/[locale]/golf-courses/page.tsx`
5. Add smoke test routes for Khao Yai in `scripts/smoke-test.ts`
6. Add Khao Yai items to `data/data-gaps.md`
7. Update `docs/course-guide/PROGRESS.md`
