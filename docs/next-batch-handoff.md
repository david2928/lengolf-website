# Next-batch handoff — written after PR #105 (hua-hin, 11 courses × th/ko/zh/ja)

**Read this before starting the next translation batch.** It exists because PR #105
merged with eleven verified defects still live, all of them known and written down
in the PR description. The description is not a work queue; this file is.

Everything below is either (a) a live defect on `main` with the enumeration already
done, or (b) a process rule that would have prevented it. Numbers here were
recomputed on `main` at `03897e8` on 2026-08-19 — **recount before quoting them
forward**, because two of the counts I inherited from the reviewer were low.

---

## 0. The one-paragraph version

PR #105 got a real independent pr-rigor pass (11 agents, APPROVE WITH CONDITIONS).
Its follow-up list had fifteen items. I fixed the four **guard/script** items and
converted the eleven **content** items into "Known Gaps" prose in the PR body, then
let it merge. The split was made by effort, not by severity — the deferred pile
contains false customer-facing claims on indexed pages, while the fixed pile was
self-test refactors. After a squash merge the PR body is the only record of them
and nobody reads a merged PR body. **A Known Gap needs an exit — an issue, a guard
that goes red, or a fix — chosen in the same PR that names it.**

---

## 1. Live defects, enumerated and ready to work

Ordered by reader impact, not by effort. Each has been verified on `main`.

### 1.1 `feeAnswer` prints the same number twice — 29 courses, 89 pages, 5 locales

`lib/course-seo.ts`, all five packs:

```ts
let answer = `The weekday green fee at ${name} is around ${thb(weekday)}`
if (weekend) answer += `, and the weekend rate is around ${thb(weekend)}`
```

`if (weekend)` is a presence check, not a meaningfulness check. A course whose two
rates are equal renders *"the weekday green fee is around ฿4,500, and the weekend
rate is around ฿4,500"* — in the visible FAQ **and** in `FAQPage` JSON-LD.

- **30 of 149 courses** are flat-rate (`green_fee_weekday_thb === green_fee_weekend_thb`).
- **29 reach the FAQ** — `korea-golf-club-hua-hin` is suppressed by `statesABareGreenFee`.
- **15 of those 29 are in `COURSE_DETAIL_I18N`** → 60 translated pages + 29 EN = **89 pages**.
- Registered ones: `lanna-golf-course`, `black-mountain-golf-club`, `lake-view-resort-golf-club`,
  `majestic-creek-country-club`, `palm-hills-golf-club`, `sea-pines-golf-resort`,
  `springfield-royal-country-club`, `rajjaprabha-dam-golf-course`, `santiburi-samui-country-club`,
  `pakasai-country-club`, `crystal-bay-golf-resort`, `mountain-shadow-golf-club`,
  `pattaya-country-club`, `pleasant-valley-golf-country-club`, `wangjuntr-golf-park`.
- Flat pricing spans **8 regions**: chiang-mai 10, **hua-hin 7**, pattaya 5, bangkok 2,
  khao-yai 2, koh-samui 2, kanchanaburi 1, krabi 1. It is not an edge case, and it is
  concentrated in the region this batch just translated end to end.

**Shape of the fix:** a locale-independent branch in `getCourseFaqs` (equal rates →
one-rate answer), plus a fifth template in each of the five packs. That is five
locales of new prose → **native QA required**, so it is a batch item, not a one-liner.
Add a smoke assertion that no rendered FAQ contains the same formatted amount twice
in one answer; the floor is the count of flat-rate registered courses.

### 1.2 ko `caddieAnswer` leaves a dangling `이와` — 28 ko pages

`lib/course-seo.ts`, ko pack:

```ts
const feeNote = fee ? ` (캐디피는 1라운드 약 ${n(fee)}바트)` : ''
const tipNote = ... : ` 관례상 이와 별도로 캐디 팁(보통 300~500바트)을 따로 건넵니다.`
```

`이와 별도로` = "apart from **this**". The antecedent is `feeNote`, which is empty
whenever `caddie_fee_thb` is 0 or null — so the sentence refers to nothing.

- **66 courses** hit that branch (`caddie_required && !caddie_fee_thb && !caddie_tip_included`).
- **28 of them have a ko translation** → 28 live ko pages, plus `FAQPage` JSON-LD.
- The reviewer wrote "18 pre-existing + 2 = 20". The real number is 28. Recounted on `main`.

**Shape of the fix:** one template, ko only. Either drop `이와` when `feeNote` is empty,
or move the fee into the tip clause so the antecedent is always present. No other locale
has this construction — ja/zh/th tip clauses are self-contained.

### 1.3 Impossible and wrong geography — 3 courses, 5 locales each

A stated road distance cannot be below the great-circle distance between the two
points. Recomputed by haversine from each course's own stored coordinates:

| File | Claim | Reality |
|---|---|---|
| `southern-thailand/sri-trang-golf-club.ts` | Hat Yai "approximately 100 km southeast" | geodesic **124.2 km** (bearing 129° — direction is right, distance is impossible) |
| `southern-thailand/sri-trang-golf-club.ts` | Krabi "approximately 140 km **north**" | bearing **299° (WNW)**; geodesic 86.9 km, so 140 km is fine as a road figure — the *direction* is wrong |
| `khao-yai/royal-hills-golf-resort.ts` | "nearest airport is Suvarnabhumi, approximately 60 kilometres to the southwest" | geodesic **89.9 km**, and **Don Mueang is nearer at 85.0 km** |
| `khao-yai/royal-hills-golf-resort.ts` | "Highway 305 (Ratchadaphisek-Minburi Road)" | Highway 305 is Rangsit–Nakhon Nayok |
| `khao-yai/royal-hills-golf-resort.ts` | "then **south** toward Sarika" | Sarika is NNE of Nakhon Nayok town |

All predate PR #105. **All were shipped into four new languages by it** — which is
exactly why "pre-existing" was the wrong call (see §2.2).

**Build the gate while you are in there.** Every course carries `latitude`/`longitude`.
A `checkGeography` rule in `validate:courses` — parse `\d+\s*(km|kilometres)` adjacent to
a known place name, compare against the haversine, ERROR when the claim falls below it —
is mechanically straightforward and would have caught all three. Give it a `--self-test`
like every other rule in that file.

### 1.4 "Hua Lamphong" — 4 files, and the corpus contradicts itself

SRT moved the long-distance Southern and Northeastern lines to Krung Thep Aphiwat
Central Terminal in January 2023. Still routing readers to Hua Lamphong:

- `hua-hin/royal-hua-hin-golf-course.ts` — EN, th (`สถานีหัวลำโพง`), zh (`华喃峰站`)
- `khao-yai/khao-yai-golf-club.ts` — EN
- `khao-yai/kirimaya-golf-course.ts` — EN
- `khao-yai/friendship-meadows-country-club.ts` — EN

…while `isan/victory-park-golf-country-club.ts` already says **Krung Thep Aphiwat**.

The reviewer named only `royal-hua-hin`. Acting on that as written fixes 1 of 4.
**Before fixing any single-instance finding, grep the claim.**

> Verify the current SRT position before rewriting — some commuter/ordinary services
> did stay at Hua Lamphong after the 2023 move. The safe copy names Krung Thep Aphiwat
> for long-distance trains rather than asserting Hua Lamphong is closed.

### 1.5 `course.name` smuggles an English clause into localized pages

`data/golf-courses/hua-hin/pineapple-valley-golf-club.ts:6`:

```ts
name: `Pineapple Valley Golf Club (formerly Banyan Golf Club)`,
```

`course.name` is interpolated raw into the localized `<h1>`, into every `${name}` in
the ko/ja/zh/th FAQ packs, into `FAQPage` and `GolfCourse` JSON-LD, and into
breadcrumbs. So `/ko/golf-courses/hua-hin/pineapple-valley-golf-club/` carries an
English relative clause in its heading.

**No gate can see this.** `validate:course-slots` censuses `locales.<locale>` blocks
and `name` is not one; `checkScript` treats Latin characters as neutral by design.

**Shape of the fix:** a typed `former_name` field that the locale packs render or drop,
not a translated parenthetical. Check for other names carrying parentheticals first —
this was the only one when I checked, but that is a `grep`, not a guarantee.

### 1.6 Four more package courses — the deferred half of PR #105's own headline fix

`burapha-golf-club`, `laem-chabang-international`, `pattana-golf-club-resort`,
`royal-gems-golf-sports-club` each state in their own prose that a single rate bundles
green fee + caddie + cart, all four are in `COURSE_DETAIL_I18N`, and none carries
`fee_is_package`. **16 translated pages + 4 EN = 20 pages** render "Weekday green fee" /
平日グリーンフィー over an all-in rate — the identical defect `fee_is_package` was built
to fix, on four more courses.

The mechanism now exists (`lib/course-fees.ts`), so this is data + titles, not plumbing.
Setting the flag rewrites five titles per course (native QA per locale), deletes their
generated fee FAQ, and changes their `/compare/` and `/near/` labels. `popularityScore`
does not read the flag, so no derived-set membership moves — **verify that** rather than
trusting this sentence.

### 1.7 Native-QA polish carried over (no blockers, verified present)

- ja `hua-hin/sea-pines-golf-resort.ts` — `指折りに個性的で`. `指折り` is a noun and takes
  `の`; `指折りに` is ungrammatical.
- ja `hua-hin/sawang-resort-golf-course.ts` — the scope qualifier lapses mid-sentence
  into an unscoped "closest to Bangkok".
- zh `hua-hin/majestic-creek-country-club.ts` — drops EN's partitive hedge on a superlative.
- zh + ko `hua-hin/pineapple-valley-golf-club.ts` — one EN attribution rendered two ways
  on a single page (same class as the 齐隆/奇隆 bug).
- ~15 further items, all cosmetic, in the PR #105 review comment.

---

## 2. Process rules this batch produced

These are also in `CLAUDE.md`. They are repeated here because the handoff is what
actually gets read at the start of a session.

### 2.1 "Disclosed" is not "handled"

Writing a defect into a PR body is a description, not a disposition. Every Known Gap
needs one of: a filed issue, a guard that goes red when someone next touches the area,
or a fix — **decided in the same PR that names it**. Otherwise the record dies with the
squash merge.

Corollary: when you split a review's findings into "now" and "later", **sort by reader
impact first**. A false distance on an indexed page outranks a self-test refactor, always.

### 2.2 If you translate a file, you own its facts

"Pre-existing" describes git history, not the reader's experience. The moment a batch
adds a locale block to a course file, every claim in that file becomes newly-published
copy in four more languages. **The factual audit covers the whole file, not the diff.**
The reverse also holds: an EN-only correction to a translated file is a five-locale edit.

### 2.3 A review comment is an assertion, not evidence

`CLAUDE.md` already says this about commit messages, PR bodies and itself. Extend it to
review comments — including ones you agree with. Both counts I inherited from PR #105's
reviewer were low (29/89 not "30"; 28 not "20"), because they were read rather than
enumerated. Write the counting script.

### 2.4 When a review names one instance, grep the claim before fixing it

§1.4 is the case: one file named, four affected, and a fifth already correct. Fixing the
one you were handed produces another "fixed everywhere" claim that is false — the
partial-fix shape `CLAUDE.md` documents four separate times in the fee bullets.

### 2.5 Anti-vacuity floors are countdowns as often as ratchets

**Section P will break on the next batch.** `FALLBACK_MIN_COMPARISONS = 100`
(`scripts/smoke-test.ts:5299`) counts EN-fallback pull quotes — a set that *shrinks* as
coverage grows. Last measured **140**. Roughly ten more tier-roster courses translated
and it goes red. **Re-baseline the floor; never delete the assertion.**

Every pinned floor a batch must re-measure and bump:

| Constant | Value | Location |
|---|---|---|
| `MIN_COURSES` | 61 | `scripts/validate-course-slots.ts:473` |
| `MIN_STRINGS` | 1708 | `scripts/validate-course-slots.ts:474` |
| `distinctReasons` | 14 | `scripts/validate-course-slots.ts:419` |
| `MIN_CHECKED` | 10 | `scripts/validate-fee-labels.ts:318` |
| `MIN_PACKAGE_COURSES` | 2 | `scripts/validate-courses.ts:383` |
| `packageOfferSeen` | 16 | `scripts/smoke-test.ts:4388` |
| `DRIVE_TIME_MIN_MARKERS` | 300 | `scripts/smoke-test.ts:5194` |
| `DRIVE_TIME_MIN_PAGES` | 60 | `scripts/smoke-test.ts:5195` |
| `FALLBACK_MIN_COMPARISONS` | 100 | `scripts/smoke-test.ts:5299` |

**Rollback note:** these are pinned at PR #105's own corpus, so a *selective* revert of
that data turns both required checks red. A rollback must be a full `git revert` of the
merge commit.

### 2.6 Run the gates on the platform the team uses

PR #105 shipped a validator that could not run on Windows at all (`await import()` on a
raw absolute path → `ERR_UNSUPPORTED_ESM_URL_SCHEME`). CI is `ubuntu-latest`, so it was
green in CI and red for every local developer, and it falsified a "passes locally" claim
in the PR body. `scripts/course-files.ts:34` already carried the `pathToFileURL` fix with
a comment naming the trap. **New script that loads a module by path → use `pathToFileURL`,
and bind the `catch` so the real error is printed.**

---

## 3. Starting checklist for the next batch

1. `git fetch origin main && git checkout -B <branch> origin/main`. Do not branch from
   the merged batch branch.
2. Pick the batch. If it is a translation batch, **§2.2 applies to every file you touch** —
   budget a factual audit per file, not per diff hunk.
3. Decide up front which of §1.1–§1.7 this batch absorbs. They are already enumerated;
   the enumeration is the expensive part and it is done.
4. Re-measure every floor in §2.5 **before** you finish, not after CI goes red.
5. Native QA per locale, all four reviewers — `CLAUDE.md` records that seven of eight
   batches had a blocker found this way, and that two of the hua-hin batch's findings
   came from a reviewer working *outside* their own locale.
6. Run `pr-rigor` and disclose the agent count. `validate:pr-rigor` reads the PR body
   in CI, so a missing disclosure fails `lint`.
7. For every finding the review returns, decide **fix / issue / guard** — never "note it
   in the body and merge".
