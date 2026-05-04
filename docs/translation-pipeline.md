# Translation Pipeline (Workstream B)

Multi-language pipeline that translates the EN UI catalog into TH/KO/JA, stages drafts in Supabase, runs each through a four-stage review, and publishes only after a human-run script opens a PR.

> **Locked scope:** TH + KO + JA only. ZH is **out of scope** — `messages/zh.json` is never touched by this pipeline. Corpus is `messages/*.json` UI strings only (no `blog_posts`, no `location_pages`, no course detail prose this round). Existing keys in target catalogs are **never overwritten** — only net-new keys land.

## Architecture

```
                  ┌──────────────┐
                  │ messages/    │ ← single source of truth (EN)
                  │   en.json    │
                  └──────┬───────┘
                         │ seed: EN \ <locale>
                         ▼
                ┌────────────────────┐
                │ Supabase           │
                │ translations table │
                └────────┬───────────┘
                         │  pending → draft → ... → ready
            translate ─→ │  ↑                          │
            lexicon  ←─  │  │ runner orchestrates     │  ← review CLI
            tone     ←─  │  │ (Anthropic API direct)  │  ← publish script
            native   ←─  │                             │
                         │                             │
                         ▼ status='ready'              ▼
                  ┌──────────────────┐    publish    ┌──────────────────┐
                  │ scripts/         │ ────────────→ │ messages/        │
                  │   translation-   │   merge       │   th.json        │
                  │     publish.ts   │   net-new     │   ko.json        │
                  └──────────────────┘   keys only   │   ja.json        │
                                                     └──────────────────┘
```

The runner is **autonomous Node code** that calls the Anthropic API directly via `@anthropic-ai/sdk` — Claude Code is not in the loop, so the long unattended phase produces no permission prompts.

## Database

Two tables live in the shared Lengolf Supabase project, in a **dedicated `website_i18n` schema** (NOT in `public`, where lengolf-forms owns its own `translations`/`translation_keys`/`translation_namespaces` system for staff back-office i18n):

- `website_i18n.translations` — staging area; rows transition through `pending → draft → lexicon_passed → tone_passed → native_passed → ready → published` (or `→ flagged → ready` after manual review). UNIQUE on `(source_type, source_key, locale, field)` makes seeds and runs idempotent.
- `website_i18n.glossary_candidates` — terms the translator/reviewers encountered that aren't in the glossary; never auto-applied.

The schema itself is `service_role`-only — `REVOKE ALL ... FROM anon, authenticated` plus `ALTER DEFAULT PRIVILEGES` blocks PostgREST from auto-exposing any future tables created in `website_i18n`. RLS is enabled on both tables (with no policies); the only legitimate writer is `lib/translations/db.ts`, which uses the existing `lib/supabase/client.ts` (server-only, service-role) and calls `.schema('website_i18n')` before `.from()`.

## Env vars

In `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...           # already set
SUPABASE_SERVICE_ROLE_KEY=...          # already set
ANTHROPIC_API_KEY=sk-ant-api03-...     # paste interactively, never echo
TRANSLATION_MAX_COST_USD=20            # hard cap (default 20)
```

The runner exits with code 2 if the cap is hit before the queue drains, so a CI/cron wrapper can alert on non-zero exit.

## Operational loop

```bash
# 0. Apply migrations once (via Supabase MCP), confirm grants are service_role-only.

# 1. Seed: enumerate EN \ <locale> diffs, insert pending rows. Idempotent.
npm run translate:seed -- --locales=th,ko,ja

# 2. Smoke (always do this before a long unattended run):
npm run translate:run -- --locale=th --limit=5
npm run translate:run -- --locale=ko --limit=5
npm run translate:run -- --locale=ja --limit=5
# Spot-check translations in Supabase. If quality is wrong, fix prompts in
# lib/translations/agents.ts and reset those 15 rows:
#   UPDATE translations SET status='pending', translation=NULL
#   WHERE id IN (...) AND locale IN ('th','ko','ja');

# 3. Long unattended run:
npm run translate:run -- --locale=all
# Idempotent — restart picks up where it left off. Cost-capped.

# 4. Review flagged rows (one locale at a time, interactive):
npm run translate:review -- --locale=th
npm run translate:review -- --locale=ko
npm run translate:review -- --locale=ja

# 5. Publish per locale (one PR each):
npm run translate:publish -- --locale=th --dry-run    # preview unified diff
npm run translate:publish -- --locale=th --write      # apply + mark published
git checkout -b feat/i18n-th-publish
git add messages/th.json
git commit -m "feat(i18n): publish TH translations from workstream-b pipeline"
git push -u origin feat/i18n-th-publish
gh pr create --title "feat(i18n): publish TH translations (Workstream B)" --body ...

# Repeat for KO and JA.
```

## Pipeline stages per row

```
translate (Sonnet 4.6, effort=low, cached system prompt)
   ↓
lexicon (pure TS — verbatim brand terms + placeholder preservation, $0)
   ↓
shouldDeepReview(row)?  source_text > 200 chars  OR  hash(id) % 100 < 10
   ├─ yes → tone (Opus 4.7, effort=medium, structured verdict via messages.parse)
   │           ↓
   │        native (Opus 4.7, effort=high, structured verdict + suggested rewrite)
   ↓
ready
```

Anything that fails any stage transitions to `flagged` with stage-specific notes.

### Why pure-TS lexicon, not LLM

The lexicon check is "did brand-immutable term X appear verbatim in translation Y; do placeholders match between source and translation?" A substring check cannot hallucinate, costs nothing, and is the most reliable check in the pipeline. The LLM reviewers (tone + native) handle subjective judgments where deterministic code can't.

## Cost model

Per-row cost (rough, 2026-05 pricing):

| Stage | Model | Always runs? | Approx cost |
|---|---|---|---|
| translate | claude-sonnet-4-6 (effort=low) | yes | ~$0.003 |
| lexicon | (no LLM) | yes | $0.000 |
| tone | claude-opus-4-7 (effort=medium) | sampled (~10%) | ~$0.015 amortized → ~$0.0015 |
| native | claude-opus-4-7 (effort=high) | sampled (~10%) | ~$0.025 amortized → ~$0.0025 |

≈ $0.007 per row average. For ~900 rows across TH+KO+JA, expect **~$6 baseline**, well under the $20 default cap. The cap exists for catastrophic failure modes (runaway retries, prompt cache miss thrashing, scope expansion).

Prompt caching: each agent's system prompt is identical for all rows of the same (locale, role) pair → caches after the first call per pair (12 distinct prefixes). Verify cache hits via `usage.cache_read_input_tokens` in the JSONL log.

## Logging + audit

`scripts/translation-runs/<ISO-timestamp>.jsonl` — one row per processed translation. Each line:

```json
{"ts":"2026-05-04T10:01:23.456Z","row_id":"...","locale":"th","source_key":"Nav.home","status":"ready","cost_usd":0.0023}
{"ts":"2026-05-04T10:01:24.012Z","row_id":"...","locale":"ko","source_key":"Home.heroTitle","status":"flagged","cost_usd":0.0181,"flagged_by":"native"}
```

Append-only. Committed for cost auditing and post-mortem of flagged batches.

## Backfill discipline

The pipeline is a tool, not a one-shot. Re-run **every time `messages/en.json` gains keys**:

1. EN PR merges to main → CI green
2. `npm run translate:seed -- --locales=th,ko,ja` (picks up only the new keys)
3. `npm run translate:run -- --locale=all` (small batch — drains in minutes)
4. Review + publish per locale

The seed step's `EN \ target` semantics make this safe: already-published keys aren't re-translated even after `messages/<locale>.json` was updated by a prior publish.

## Adding a new locale

1. Register in `lib/translated-routes.ts` and `messages/<locale>.json` (empty `{}` is fine).
2. Add `data/i18n-glossary/<locale>.json` (copy from an existing locale, edit `preferred` + `formality`).
3. Add the locale to `ALL_TARGET_LOCALES` in `lib/translations/types.ts` and the `Locale` union.
4. Update the `CHECK` constraint on `translations.locale` and `glossary_candidates.locale` via a migration.
5. Add KO/JA-style smoke tests in `scripts/smoke-test.ts`.
6. Run the operational loop above.

## What NOT to do

- **Do not** edit `messages/zh.json` from this pipeline. It's out of scope.
- **Do not** call the publish script with `--locale=all`. One locale = one PR is the rule.
- **Do not** re-translate existing keys. The publish script enforces this — keys already in `messages/<locale>.json` are silently skipped on publish, even if a `ready` row exists for them.
- **Do not** put `ANTHROPIC_API_KEY` in chat, in commits, or in any tracked file. Only in local `.env.local`.
- **Do not** approve permission grants for `git push` or `Edit(.env*)` while the runner is running. The deny list in `.claude/settings.local.json` is a safety net for unattended execution.
