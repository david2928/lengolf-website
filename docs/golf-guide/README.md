# Golf Guide Content Pipeline

Automated content creation and verification pipeline for the LENGOLF golf guide.
**All intelligence is Claude (me) — no API keys, no background processes, no cost.**

---

## How it works

```
You say:  "Draft best-golf-simulators-bangkok"
                    ↓
         Claude writes the article
         → saves to content/1.staging/<slug>.md
                    ↓
         Claude extracts all factual claims
         Claude verifies each one (knowledge base → reasoning)
         Claude runs consensus on anything uncertain
         Claude checks SEO quality
                    ↓
         content/2.pending-review/<slug>.md        ← article
         content/2.pending-review/<slug>.report.md ← summary for you
         reports/<slug>.json                       ← full structured report
                    ↓
You say:  "Approve it" or "Fix the claim about X"
                    ↓
         content/3.approved/<slug>.md
                    ↓
         Claude runs:  npm run golf-guide:publish <slug>
                    ↓
         data/explainer-pages.ts (or faq-pages.ts / price-guide-pages.ts)
                    ↓
         Live at /guide/<slug>/ (or /faq/<slug>/)
```

Nothing lands in `/data/` until you say approve.

---

## Folder structure

```
docs/golf-guide/
  content/
    1.staging/          ← Claude-drafted articles (auto-moves after verification)
    2.pending-review/   ← Awaiting your review (article + .report.md side by side)
    3.approved/         ← You approved these; ready to publish
    knowledge/          ← Verified facts Claude checks before reasoning
      lengolf-facts.md      Facts about LENGOLF, Bangkok golf, courses, transport
      seo-guidelines.md     SEO rules and content standards
  agents/
    1.draft.md          ← Stage 1 description (Claude does this)
    2.verify.md         ← Stage 2 description (Claude does this)
    3.review.md         ← Stage 3 description (YOU do this)
    4.publishContent.ts ← Stage 4 script (Claude runs this for you)
  reports/
    <slug>.json         ← Full JSON verification report per article
```

---

## Creating an article

Pick a slug from `docs/content-gaps-golf-guide.md` and ask:

> "Draft the article for `best-golf-simulators-bangkok`"
> "Write the golf guide article for `do-you-need-caddie-thailand-golf`"
> "Create content for `round-of-golf-cost-bangkok`"

Claude will draft, verify, and produce the report in one go.

---

## Reviewing an article

After Claude finishes, read:

```
docs/golf-guide/content/2.pending-review/<slug>.report.md
```

The report tells you:
- **Overall status** — APPROVED / REVIEW REQUIRED / MAJOR ISSUES
- **Disputed claims** — facts Claude flagged as wrong, with suggested fixes
- **Disclaimer flags** — prices, visa rules, airline fees that need qualifiers
- **SEO issues** — title/meta length, missing internal links, keyword gaps

Then tell Claude what you want:

| What you say | What happens |
|---|---|
| "Approve `<slug>`" | Claude moves it to `3.approved/` and runs the publish script |
| "Fix the claim about caddie fees" | Claude edits the article, re-verifies, gives you a new report |
| "Ignore the visa disclaimer flag" | Claude notes it and approves anyway |
| "The green fee is wrong — it's 2,200 THB" | Claude corrects it and re-verifies |

---

## Page type → data file mapping

| Slug pattern | page_type | Target file |
|---|---|---|
| `/guide/...` | `explainer` | `data/explainer-pages.ts` |
| `/faq/...` | `faq` | `data/faq-pages.ts` |
| `/cost/...` | `price_guide` | `data/price-guide-pages.ts` |

---

## Updating the knowledge base

`content/knowledge/lengolf-facts.md` is what Claude checks first before relying on its own reasoning. The more accurate it is, the fewer disputed claims you'll see.

Add or update entries when you have verified facts:
- Confirmed course green fees (with source and date)
- Updated Thai visa/entry requirements
- Confirmed airline baggage policies
- Corrections from a report that turned out to be wrong

---

## Content gaps to work through

See `docs/content-gaps-golf-guide.md` — 70 articles total, organised by priority.
Start with the **23 P1 articles** — these are what the hub page links to directly.
