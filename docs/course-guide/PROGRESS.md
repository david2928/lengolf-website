# Golf Course Guide — Project Progress

Last updated: 2026-04-16

---

## Overall goal

Build programmatic course pages for every tourist-facing golf course in Thailand (206 courses across 14 regions). Each page: 800–1,200 word guide, green fee data, Schema.org GolfCourse JSON-LD, LENGOLF club rental CTA.

Live URL pattern: `https://www.len.golf/golf-courses/[region]/[slug]/`

---

## Phase summary

| Phase | Courses | Regions | Status |
|---|---|---|---|
| Phase 1 | 34 | Bangkok, Pattaya, Hua Hin, Phuket, Khao Yai | Bangkok done · rest pending |
| Phase 2 | 118 | All regions (deeper cuts) | Not started |
| Phase 3 | 37 | Niche / remote regions | Not started |
| Skip | 17 | Military, private members-only | — |

---

## Infrastructure — DONE

- [x] Pipeline design (`docs/course-guide/README.md`)
- [x] Agent prompts — Stages 1–5 (`docs/course-guide/agents/`)
- [x] Course schema definition (`docs/course-guide/data/course-schema.md`)
- [x] Master course list — 206 courses (`docs/course-guide/data/regions.md`)
- [x] Knowledge base (`docs/course-guide/knowledge/`)
- [x] `GolfCourse` TypeScript type (`types/golf-courses.ts`)
- [x] Data loader — `getCourseBySlug`, `getAllCourseParams`, `getCoursesByRegion` (`lib/golf-courses.ts`)
- [x] Publish script — JSON → TypeScript data files (`docs/course-guide/agents/5.publish.ts`)
- [x] Next.js page route — `/golf-courses/[region]/[slug]/` (`app/[locale]/golf-courses/[region]/[slug]/page.tsx`)
- [x] Page component — hero, stat strip, prose sections, sidebar (`components/golf-courses/CoursePage.tsx`)
- [x] Smoke tests — 3 Bangkok courses added to CI (`scripts/smoke-test.ts`)

---

## Bangkok batch — DONE (11 / 11 courses published)

Pipeline run: 2026-04-16

| # | Course | Pipeline status | Page live |
|---|---|---|---|
| 1 | Alpine Golf & Sports Club | approved | ✅ /golf-courses/bangkok/alpine-golf-club/ |
| 2 | Nikanti Golf Club | approved | ✅ /golf-courses/bangkok/nikanti-golf-club/ |
| 3 | Thai Country Club | approved (review_required) | ✅ /golf-courses/bangkok/thai-country-club/ |
| 4 | Thana City Golf & Sports Club | approved (review_required) | ✅ /golf-courses/bangkok/thana-city-golf-sports-club/ |
| 5 | Suwan Golf & Country Club | approved — weekend 5,200 THB all-in | ✅ /golf-courses/bangkok/suwan-golf-country-club/ |
| 6 | Lam Luk Ka Country Club | approved | ✅ /golf-courses/bangkok/lam-luk-ka-country-club/ |
| 7 | Panya Indra Golf Club | approved (review_required) | ✅ /golf-courses/bangkok/panya-indra-golf-club/ |
| 8 | Krungthep Kreetha Sports Club | approved | ✅ /golf-courses/bangkok/krungthep-kreetha-sports-club/ |
| 9 | The RG City Golf Club | approved (review_required) | ✅ /golf-courses/bangkok/royal-gems-golf-sports-club/ |
| 10 | Summit Windmill Golf Club | approved — weekday 3,000 / weekend 4,000 THB | ✅ /golf-courses/bangkok/summit-windmill-golf-club/ |
| 11 | Phoenix Gold Golf & Country Club | approved — weekend 3,500 THB | ✅ /golf-courses/bangkok/phoenix-gold-golf-country-club/ |

**Outstanding:** Phone verification and GPS coordinates for most courses — tracked in `data/data-gaps.md`.

---

## Pending — Phase 1 regions

Run each region through the full pipeline (Stages 1–5) in order.

| Region | Phase 1 courses | Status |
|---|---|---|
| Bangkok | 11 | ✅ Done |
| Pattaya & Eastern Seaboard | 6 | Not started |
| Hua Hin & Pranburi | 5 | Not started |
| Phuket | 5 | Not started |
| Khao Yai & Central Highlands | 4 | Not started |
| Chiang Mai & North | 0 Phase 1 | — |

---

## Pages & features

| Item | Priority | Status | Notes |
|---|---|---|---|
| Region index page `/golf-courses/bangkok/` | High | ✅ Done | Lists all Bangkok courses with fee + distance |
| Hub page `/golf-courses/` | High | ✅ Done | Landing page linking to all regions + coming-soon teasers |
| Smoke tests — hub + Bangkok index | Low | ✅ Done | Added `/golf-courses/` and `/golf-courses/bangkok/` to CI |
| GPS coordinates + Google Maps URLs | Medium | Pending | All 11 Bangkok courses approximate — see `data-gaps.md` |
| Phone number verification | Medium | Pending | 9 courses missing — see `data-gaps.md` |
| Multilingual pages (KO / ZH / JA) | Phase 2 | Pending | Infrastructure in place (`locales` field), content not written |
| Add new regions to `lib/golf-courses.ts` | As needed | — | Add to `REGIONS` + `REGION_META` when new batches are published |
| Update `data/golf-courses/[region]/index.ts` | As needed | — | Add slugs when new courses are published |
| GPS coordinates + Google Maps URLs | Medium | All 11 Bangkok courses approximate — see `data-gaps.md` |
| Phone number verification | Medium | 9 courses missing — see `data-gaps.md` |
| Multilingual pages (KO / ZH / JA) | Phase 2 | Infrastructure in place (`locales` field), content not written |
| Add new regions to `lib/golf-courses.ts` | As needed | Add to `REGIONS` array when new batches are published |
| Update `data/golf-courses/[region]/index.ts` | As needed | Add slugs when new courses are published |

---

## How to run the next batch

1. Pick a region from the pending list above (e.g. Pattaya)
2. Tell Claude: `"Collect Phase 1 Pattaya courses"` → runs Stages 1–3
3. Read `docs/course-guide/reports/pattaya-batch.report.md`
4. Approve: `"Approve Pattaya batch"` (with any dispute resolutions)
5. Claude runs Stage 5 publish script and updates the region `index.ts`
6. Add the region to `REGIONS` in `lib/golf-courses.ts`
7. Add 2–3 smoke test routes for the new region in `scripts/smoke-test.ts`

---

## File map

```
docs/course-guide/
  PROGRESS.md                  ← this file
  README.md                    ← pipeline overview
  agents/
    1.collect.md               ← Stage 1 instructions
    2.enrich.md                ← Stage 2 instructions
    3.verify.md                ← Stage 3 instructions
    4.review.md                ← Stage 4 instructions (for Chris)
    5.publish.ts               ← Stage 5 publish script
  data/
    course-schema.md           ← field definitions
    regions.md                 ← master course list (206 courses)
    data-gaps.md               ← fields needing phone verification
    1.raw/bangkok/             ← 11 raw JSON files
    2.enriched/bangkok/        ← 11 enriched JSON files (+ prose)
    4.approved/bangkok/        ← 11 approved JSON files
  knowledge/
    lengolf-facts.md           ← LENGOLF rental business facts
    course-overrides.md        ← manual corrections
  reports/
    bangkok-batch.report.md    ← Bangkok verification report

data/golf-courses/
  bangkok/
    index.ts                   ← slug registry
    alpine-golf-club.ts        ← published TypeScript data
    ... (10 more)

app/[locale]/golf-courses/
  [region]/[slug]/page.tsx     ← Next.js route

components/golf-courses/
  CoursePage.tsx               ← page component

lib/golf-courses.ts            ← data loader (server-only)
types/golf-courses.ts          ← GolfCourse type
```
