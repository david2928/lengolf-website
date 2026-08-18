# i18n translation batch — handoff

Start-here doc for a new session picking up LENGOLF translation work. Written
2026-08-16, after batches 4 and 5 (PR #96). **Numbers below were computed against
the tree, not remembered — recompute before quoting them forward.**

Read in this order: this file → `CLAUDE.md` → `docs/i18n-review-checklist.md` →
`.claude/skills/seo-translation-batch/SKILL.md` → `.claude/skills/pr-rigor/SKILL.md`.

---

## 1. Where things stand

**Course details — the live frontier.** 50 of 149 courses translated into th/ja/ko/zh.

| Region | Done | Status |
|---|---|---|
| bangkok | 9/55 | **46 remaining — the big one, split it** |
| khao-yai | 0/12 | 12 remaining |
| chiang-mai | 1/12 | 11 remaining |
| hua-hin | 0/11 | 11 remaining |
| kanchanaburi | 0/8 | 8 remaining |
| isan | 0/6 | 6 remaining |
| chiang-rai | 0/4 | 4 remaining |
| north-misc | 0/1 | 1 remaining |
| phuket · pattaya · krabi · khao-lak · koh-samui · southern-thailand | — | **COMPLETE** |

**Everything else is effectively done.** Guides 46/46 per locale. FAQ 31 of 32
(the 32nd, `where-to-play-golf-at-night-in-bangkok`, is a deliberate duplicate of
the canonical `where-play-golf-night-bangkok` — do not translate it). Region hubs
14/14. `/cost`, `/activities`, `/best`, `/hotels` all shipped in every locale.
Blog: ko/ja/zh 9 each, **th 0** (DB-driven; regenerate with
`scripts/sync-blog-translated-slugs.ts`, never hand-edit).

`validate:i18n` corpus: 903 localized entries.

## 2. Picking the next batch

The owner's standing instruction: **translate every page — GSC rationale is not
required.** Select by *roster completion*, because the unit that matters is the
hub→detail funnel. A locale reader on a half-translated region hub gets a list
where most links 301 them to English, which is the problem the batch exists to fix.

Good next batches, in order of value:

1. **hua-hin (11)** or **khao-yai (12)** — each completes a region in one pass.
2. **chiang-mai (11)** — completes a region; note Gassan is three sibling files
   that must not contradict each other.
3. **bangkok (46)** — do NOT attempt in one batch. Split into 3–4 runs.

Batch size that worked: **11–14 courses per wave.** 13 ran cleanly; a 10-wave hit
a spend limit and lost 7 builders mid-edit.

## 3. The process, condensed

One builder agent **per course file** (never per locale — parallel builders on one
file collide). One native-QA reviewer **per locale** afterwards, read-only, emitting
`Current:`/`Replace with:` pairs. You are the orchestrator: you fact-check, apply,
gate, commit. Full detail in the two skills.

Non-negotiable order:

1. Builders write locale blocks (4 separately-anchored edits each).
2. **Wire the registries** — `COURSE_DETAIL_I18N` + all four `staticRoutes` lists.
3. **Then** run `validate:i18n` and the injection test. Before registration the
   linter skips the content entirely (`validate-i18n.ts`, `if (isRegistered && l)`),
   so a green run beforehand proves nothing.
4. Native QA, all four locales. **Blocking.** It has caught a blocker in 7 of 8
   batches; none was mechanically detectable.
5. `/code-review` — separate from pr-rigor, see pitfall 2.
6. `pr-rigor`, then the gate, then commit.

Gate: `typecheck · lint · validate:i18n (+self-test) · validate:courses ·
validate:links · validate:hotels`, plus a per-slot script census.

---

## 4. Pitfalls — every one of these actually happened last session

### 4.1 A proven-false claim is not a "known gap". Delete it.

`siam-country-club-waterside` says its pricing is "below the Old Course" while the
typed fees are ~68% **higher**. It was found *before* merge, written up as known
gap #1, and shipped in five languages on the reasoning that only the owner could
say whether the prose or the fee data was wrong.

That reasoning is a trap. It frames a false sentence as a binary and misses the
third option: **drop the unsupportable clause.** Removing a claim asserts nothing
new and needs no ruling. Reserve "needs the owner" for the *unverifiable*, never
for what you have already proven false.

### 4.2 Point somebody at the renderer. A content PR is a code PR in disguise.

13 agents (5 pr-rigor finders + 8 native reviewers) all passed a batch in which
`CoursePage` rendered prose as one raw string while its three sibling components
all `split('\n\n')` — run-on blocks on 28 newly localized pages. The native
reviewers read the prose as *source text* and correctly saw well-formed
paragraphs. **Nobody asked what the renderer did with them.**

`/code-review` found it afterwards. Run both; pr-rigor does not subsume it.

### 4.3 When you fix a renderer, enumerate every render site *inside* the component

The paragraph fix changed `proseSections.map()` and left `prose.overview` — the
lead paragraph, above the fold — on the raw path. Same file, ~40 lines apart.
That is CLAUDE.md's own "fixing the cheap string and leaving the prominent one",
committed in the session that quoted the warning.

Rendering it then exposed a literal `PUBLISHING NOTE:` internal memo live in
`hang-dong-golf-club`'s overview and in its JSON-LD `description`. **The
enumeration had listed that file and nobody read it.** An enumeration used to
size a change is not an inspection — when a fix reveals hidden content, read it.

### 4.4 A blind apply validates the ANCHOR, not the RESULT

193 reviewer fixes were applied with a uniqueness assertion on every `Current:`
anchor. One still shipped a visible stutter: the anchor ended mid-sentence, the
original continued with a clause the *replacement* also contained, so the page
said it twice. A unique byte-exact anchor cannot see what it lands next to.

Reviewers: extend anchors through everything the replacement restates.
Orchestrator: **re-read the changed strings after a blind batch.**

### 4.5 Mutation-test guards with degenerate values, not just deletion

The new `course-prose-partial` check was proven by deleting a field. It still
passed a **whitespace-only** field — and `CoursePage` falls back with `??` not
`||`, so `'   '` beats the English fallback and renders an empty `<p>` under a
localized heading while hreflang advertises a translation.

Every detector needs: absent, empty string, whitespace-only, wrong-type/null.

### 4.6 Service claims are checked against the site, not the glossary

`honesty_constraints.forbidden_claims` enumerates *coach-language* strings only.
So native QA reported "honesty clean" while `laguna-golf-phuket` told renters
their clubs were "fully insured", in EN and all four new locales — against
`messages/en.json`'s own *"No. LENGOLF requires no deposit, no insurance"*.

Whenever content mentions rental, delivery, insurance, deposits, lessons or
coaching, grep `messages/en.json` and `data/pricing.ts` for the same subject.

### 4.7 Locale trap-lists must be symmetric

The brief told `zh` to census place names (the `齐隆`/`奇隆` precedent) and did not
tell the others. Result: ko shipped `푸껫` against 39 uses of `푸켓`; ja shipped
`バンラムン` and `バーンチャン` against their siblings' long-vowel forms.
**Every locale censuses place names** against sibling files and `PROVINCE_L10N`.

### 4.8 "When EN leaves something open, leave it open" — all locales

EN: "call ahead to understand whether **either** is mandatory." ko rendered
"**which** of the two"; th rendered "whether **both**". Both asserted a caddie/cart
requirement the file's own `caddie_required: false` denies — and `FAQ_L10N`
builds `FAQPage` JSON-LD from those fields, so the page contradicted itself in
structured data. This was first filed as a Korean quirk; it was not.

### 4.9 Recompute every number at commit time

Counts asserted from memory were wrong repeatedly: "18 of 25" (was 17), "21 EN
courses" (22), "203 fixes" (193), "one file" for the Bang Na–Trat conflation (18),
and a `schema_markup.geo` alarm of "~10,860 km, a lat/lng swap" that was a missing
null guard in my own script (real max 42.1 km, no swap). **A false claim in a
commit message or CLAUDE.md is worse than a bug** — the next session reads it as
fact. Verify or delete.

### 4.10 Don't destroy uncommitted work, and don't race your own builders

An injection test was reverted with `git checkout --` on a file a builder was
still writing, destroying it; then a replacement builder was launched before
confirming the first was dead, racing two agents on one file. Use a `.bak` copy
for injection tests, and confirm an agent is finished before relaunching its work.

### 4.11 Builders clobber shared scratch paths

A builder wrote its own scratch script over the orchestrator's census tool. Give
builders their own subdirectory and keep orchestrator tools separate.

---

## 5. Outstanding EN-side defects (owner decisions, not translation bugs)

These are carried faithfully in every locale. Fixing EN means a five-locale pass.

1. **`siam-country-club-waterside`** — the price comparison; comparative dropped in
   PR #96, but whether the prose or the fee data was wrong is still unresolved.
2. **`chatrium-golf-resort-soi-dao`** — "facility enhancements from March to
   **October 2026**". Expires imminently, in five languages. Nothing in the repo
   guards a *dated* claim whose date has passed.
3. **Delivery scope contradiction** — `messages/en.json` says "Bangkok · Pattaya ·
   Hua Hin"; `data/pricing.ts` says "anywhere in Bangkok". Six EN course strings
   say "your Pattaya hotel". Translations were ruled to **Bangkok** (certainly
   true, matches 96 files), so those pages' translations are safer than their EN.
4. **`caddie_required: true` vs permissive EN prose** on many courses.
   `FAQ_L10N.caddieAnswer` builds "mandatory" from the flag while prose says
   "available" — body and JSON-LD differ in strength.
5. **`pakasai-country-club`** — two different compass directions for one leg; Krabi
   is east of Phuket, so both EN paragraphs are wrong.
6. **`chee-chan-golf-resort`** — EN calls an inland hillside course "award-winning
   links". Locales use the neutral "course".
7. **`amata-spring-country-club`** — title/meta promise "Green Fees" on a
   members-only course with all four fee fields `null`.
8. **`Si Racha` vs `Sriracha`** across several files, with `laem-chabang` using
   both on one page. `Si Racha` is the official RTGS form.
9. **`Bang Na–Trat Expressway (Highway 7)`** — a conflation (Bang Na–Trat is
   Highway 34); co-occurs in 18 course files, including shipped translated ones.
10. **`schema_markup.geo` drift** on 38 courses (max 42.1 km). **Dead data** —
    `jsonld-courses.ts` reuses only `address`. Worth deleting so it stops
    generating false alarms. The inverse is open: at least one *attested* pair
    disagrees with its own prose address, and attested coords gate the map pin.
11. **`par` for 27-hole courses** is inconsistent repo-wide (72 / 108 / 36).
12. **`st-andrews-2000`** carries an expired "reopening December 2025" line.

## 6. Environment gotchas

- `npm run build` **cannot complete** in a sandbox without `.env.local` —
  `/[locale]/location/[slug]` fails collecting DB-backed data. That route imports
  no course component, so it is not your change. CI has the secrets.
- Spend limits kill subagents mid-run. Builders that die leave **partial** locale
  blocks (typically th/ko written, ja absent). Detect with a completeness census —
  the dead builders never report. Revert partials to pristine rather than
  registering them: a registered tuple with a missing block is a hard 404 behind
  its own hreflang.
- `npm ci` may be needed; `node_modules` is not always present.

## 7. PR #96 state at handoff

Branch `claude/pr-90-review-translations-ykj54r`, head `e378abe`, open, CI green,
`mergeable_state: clean`. 14 commits. Both batches native-QA'd. Owner ran an
independent 7-agent review (`dd4ab66`) that fixed three false customer claims,
the half-applied paragraph fix, and the whitespace-blind guard.
