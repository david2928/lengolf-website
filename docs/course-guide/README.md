# Course Guide Pipeline

Scalable data-first pipeline for generating 250+ golf course pages on len.golf.
**All intelligence is Claude (me) — no API keys, no background processes, no cost.**

---

## How it works

```
You say:  "Collect data for the Bangkok Phase 1 courses"
                    ↓
         Claude scrapes/compiles structured data for each course
         → saves to data/1.raw/<region>/<slug>.json
                    ↓
         Claude writes prose sections for each course
         (overview, layout, tips, location & access)
         → saves to data/2.enriched/<region>/<slug>.json
                    ↓
         Claude verifies all factual claims in batch
         (green fees, distances, designers — web search where needed)
         → saves to data/3.verified/<region>/<slug>.json
         → writes a SINGLE batch report: reports/<region>-batch.report.md
                    ↓
You say:  "Approve Bangkok batch" or "Fix Alpine green fee"
                    ↓
         data/4.approved/<region>/<slug>.json
                    ↓
         Claude runs: npx tsx docs/course-guide/agents/5.publish.ts <region> <slug>
                    ↓
         data/golf-courses/<region>/<slug>.ts  (or a central courses registry)
                    ↓
         Live at /golf-courses/<region>/<slug>/
```

**You only review once per batch — not once per course.**
Nothing lands in `/data/golf-courses/` until you approve.

---

## Folder structure

```
docs/course-guide/
  agents/
    1.collect.md        ← Stage 1: Claude compiles raw course data
    2.enrich.md         ← Stage 2: Claude writes prose sections
    3.verify.md         ← Stage 3: Claude verifies all claims in batch
    4.review.md         ← Stage 4: YOU review the batch report
    5.publish.ts        ← Stage 5: Claude runs this to publish approved courses
  data/
    1.raw/              ← Raw structured data per course (JSON)
      bangkok/
      hua-hin/
      phuket/
      pattaya/
    2.enriched/         ← Raw data + prose sections (JSON)
    3.verified/         ← Enriched data + verification results (JSON)
    4.approved/         ← You approved these; ready to publish
  knowledge/
    lengolf-facts.md    ← Verified facts about LENGOLF, pricing, rental process
    course-overrides.md ← Manual corrections that override web-scraped data
  reports/
    <region>-batch.report.md   ← One report per batch for you to review
```

---

## Key design decisions

### Data-first, not content-first
Course pages are 80% structured data (fees, location, specs) and 20% prose.
The data model is the single source of truth — prose is generated from it, not the other way around.

### Batch review, not per-article review
You review one report per region (~10-15 courses), not one report per course.
The report surfaces only disputes and flags — not the full content.

### Template-driven pages
One Next.js dynamic route renders all 250+ courses from their JSON data.
Schema markup, CTAs, and hreflang are baked into the template — no per-page decisions.

### i18n-ready from the start
The data model includes locale fields (en, ko, zh, ja).
Routes are structured as `/golf-courses/[region]/[slug]` with i18n support at `/[locale]/golf-courses/[region]/[slug]`.

---

## Running the pipeline

### Collecting a new batch (you trigger this)

```
"Collect Phase 1 Bangkok courses"
"Collect Hua Hin courses"
```

Claude will: run Stage 1 → Stage 2 → Stage 3 in sequence, then surface the batch report.

### Reviewing a batch (you do this)

Read: `docs/course-guide/reports/<region>-batch.report.md`

| What you say | What happens |
|---|---|
| "Approve Bangkok batch" | Claude moves all to `4.approved/` and publishes |
| "Fix Alpine green fee — weekday is 2,200 THB" | Claude corrects, re-verifies that course only, updates report |
| "Skip the distance flag for Nikanti — we'll add a disclaimer" | Claude notes and approves anyway |

### Publishing (Claude does this after approval)

```
npx tsx docs/course-guide/agents/5.publish.ts bangkok nikanti-golf-club
npx tsx docs/course-guide/agents/5.publish.ts bangkok --all
```

---

## Rollout plan

| Phase | Courses | Regions |
|---|---|---|
| 1 | Top 30 | Bangkok, Hua Hin, Phuket, Pattaya |
| 2 | Next 100 | All major regions |
| 3 | Remaining ~150 | Nationwide |

Start with Phase 1 Bangkok (approx 10-12 courses).

---

## Multilingual

Phase 2 adds KO / ZH / JA versions.
The data model already has locale fields.
Routes and hreflang tags are built into the template from Phase 1.
No rearchitecting needed — just populate the locale fields and deploy.
