/**
 * Four-stage translation pipeline:
 *
 *   1. translate()      — Sonnet 4.6, low effort, cached system prompt
 *   2. lexiconCheck()   — pure TS code (no LLM): brand-immutable verbatim,
 *                         preferred-mapping presence, placeholder preservation
 *   3. toneCheck()      — Opus 4.7, structured verdict via messages.parse()
 *   4. nativeCheck()    — Opus 4.7, structured verdict + optional rewrite
 *
 * Every system prompt is keyed by (locale, role) and identical across rows of
 * the same (locale, role), so prompt caching kicks in after the first call.
 */

import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import type {
  AgentVerdict,
  Glossary,
  TranslationRow,
} from './types'
import { priceFor, withBackoff, type UsageBreakdown } from './budget'

let client: Anthropic | null = null
function getClient(): Anthropic {
  if (!client) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not set in environment')
    }
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }
  return client
}

// next-intl placeholder pattern: {name}, {year}, {pct}, {n}, {rate}, etc.
// Excludes markdown emphasis ({{ ... }} ICU plural which we don't use).
const PLACEHOLDER_RE = /\{[a-zA-Z_][a-zA-Z0-9_]*\}/g

function extractPlaceholders(s: string): string[] {
  return [...s.matchAll(PLACEHOLDER_RE)].map((m) => m[0]).sort()
}

function arrayEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

// =====================================================================
// 1. Translator (Sonnet 4.6)
// =====================================================================

function translatorSystem(glossary: Glossary): string {
  const brand = glossary.brand_immutable.map((t) => `- ${t}`).join('\n')
  const preferred = Object.entries(glossary.preferred)
    .map(([en, target]) => `- "${en}" → "${target}"`)
    .join('\n')
  const preserve = glossary.preserve.map((p) => `- ${p}`).join('\n')

  return `You translate marketing copy for LENGOLF — an indoor golf simulator and bar at The Mercury Ville @ BTS Chidlom in Bangkok. Source language is English. Target language is ${glossary.language_name}.

TONE
${glossary.tone}

FORMALITY
${glossary.formality}

BRAND-IMMUTABLE TERMS — must appear verbatim in the translation if they appear in the source. Do NOT translate, transliterate, or romanize them:
${brand}

PREFERRED TERM MAPPINGS — when these English terms appear in the source, use the listed target equivalent:
${preferred}

PRESERVE EXACTLY
${preserve}

OUTPUT
Output ONLY the translation. No commentary, no preamble like "Here is the translation:", no quotation marks around the result. Preserve the original line breaks and punctuation structure of the source.`
}

export async function translate(
  row: TranslationRow,
  glossary: Glossary,
): Promise<{ translation: string; cost_usd: number }> {
  const c = getClient()
  const userMsg = `Translate the following English text to ${glossary.language_name}:\n\n${row.source_text}`

  const response = await withBackoff(
    () =>
      c.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: [
          {
            type: 'text',
            text: translatorSystem(glossary),
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: userMsg }],
        thinking: { type: 'disabled' },
        output_config: { effort: 'low' },
      }),
    { label: `translate ${row.locale}/${row.source_key}` },
  )

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim()

  const cost = priceFor('claude-sonnet-4-6', response.usage as UsageBreakdown)

  return { translation: text, cost_usd: cost }
}

// =====================================================================
// 2. Lexicon check (pure TS, no LLM)
// =====================================================================

export function lexiconCheck(
  row: TranslationRow,
  translation: string,
  glossary: Glossary,
): AgentVerdict {
  const reasons: string[] = []
  const missing_brand_terms: string[] = []
  const missing_preferred: string[] = []
  const placeholder_drift: string[] = []

  // 1. Brand-immutable: every brand term that appears in the source MUST
  //    appear verbatim in the translation.
  for (const term of glossary.brand_immutable) {
    if (row.source_text.includes(term) && !translation.includes(term)) {
      missing_brand_terms.push(term)
    }
  }
  if (missing_brand_terms.length) {
    reasons.push(
      `Brand-immutable terms missing from translation: ${missing_brand_terms.join(', ')}`,
    )
  }

  // 2. Placeholders ({name}, {year}, etc.) — must match exactly between
  //    source and translation, including count and order.
  const srcPlaceholders = extractPlaceholders(row.source_text)
  const tgtPlaceholders = extractPlaceholders(translation)
  if (!arrayEqual(srcPlaceholders, tgtPlaceholders)) {
    placeholder_drift.push(
      `source=[${srcPlaceholders.join(',')}] translation=[${tgtPlaceholders.join(',')}]`,
    )
    reasons.push('Placeholder set in translation differs from source.')
  }

  // 3. Preferred mappings: best-effort. We don't fail the row just because
  //    the preferred mapping isn't present (the translator may have used a
  //    valid synonym), but we record it as a soft signal in notes.
  for (const [en, target] of Object.entries(glossary.preferred)) {
    const enLower = en.toLowerCase()
    const srcLower = row.source_text.toLowerCase()
    if (srcLower.includes(enLower) && !translation.includes(target)) {
      missing_preferred.push(`"${en}" → expected "${target}"`)
    }
  }
  // Soft signal — only flag if MANY preferred mappings missed (>2),
  // suggesting the translator ignored the glossary.
  if (missing_preferred.length > 2) {
    reasons.push(
      `Multiple preferred mappings not used (${missing_preferred.length}); translator may have ignored glossary.`,
    )
  }

  const passed =
    missing_brand_terms.length === 0 &&
    placeholder_drift.length === 0 &&
    missing_preferred.length <= 2

  return {
    passed,
    notes: passed
      ? undefined
      : {
          passed,
          reasons,
          missing_brand_terms: missing_brand_terms.length ? missing_brand_terms : undefined,
          missing_preferred: missing_preferred.length ? missing_preferred : undefined,
          placeholder_drift: placeholder_drift.length ? placeholder_drift : undefined,
        },
    cost_usd: 0,
  }
}

// =====================================================================
// 3. Tone agent (Opus 4.7)
// =====================================================================

const ToneVerdictSchema = z.object({
  passed: z.boolean().describe('True if the translation matches the required tone and formality.'),
  reasons: z
    .array(z.string())
    .describe('Brief reasons for the verdict (1–3 sentences each). Empty if passed.'),
  suggested_rewrite: z
    .string()
    .nullable()
    .describe(
      'If failed, a corrected translation that fixes the tone/formality issue. Null if passed.',
    ),
})

function toneSystem(glossary: Glossary): string {
  return `You are a native ${glossary.language_name} reviewer evaluating marketing copy for LENGOLF, an indoor golf simulator in Bangkok. Your only job is to verify that a given translation matches the required tone and formality.

REQUIRED TONE
${glossary.tone}

REQUIRED FORMALITY
${glossary.formality}

EVALUATION CRITERIA
- Mark FAILED if the translation reads as marketing-speak inflation (overuse of superlatives, exclamation points, emoji, urgency language not in the source).
- Mark FAILED if the formality level is wrong for the target audience (too casual or too stiff).
- Mark FAILED if the personality of the source has been flattened or replaced with generic translation-ese.
- Mark PASSED if the tone and formality match. Mismatches in lexicon/grammar/idiom are OUT OF SCOPE — the native fluency agent handles those.

If FAILED, provide a "suggested_rewrite" — a corrected translation that fixes only the tone/formality issue while preserving the meaning, brand-immutable terms, placeholders, and markdown structure of the original translation.`
}

export async function toneCheck(
  row: TranslationRow,
  translation: string,
  glossary: Glossary,
): Promise<AgentVerdict> {
  const c = getClient()
  const userMsg = `EN source:
${row.source_text}

${glossary.language_name} translation under review:
${translation}

Evaluate the translation's tone and formality only.`

  const response = await withBackoff(
    () =>
      c.messages.parse({
        model: 'claude-opus-4-7',
        max_tokens: 2048,
        system: [
          {
            type: 'text',
            text: toneSystem(glossary),
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: userMsg }],
        output_config: {
          effort: 'medium',
          format: zodOutputFormat(ToneVerdictSchema),
        },
      }),
    { label: `toneCheck ${row.locale}/${row.source_key}` },
  )

  const cost = priceFor('claude-opus-4-7', response.usage as UsageBreakdown)
  const v = response.parsed_output

  if (!v) {
    // Fall through as "flagged" so the row gets human review.
    return {
      passed: false,
      notes: {
        passed: false,
        reasons: ['toneCheck: model returned unparseable verdict'],
      },
      cost_usd: cost,
    }
  }

  return {
    passed: v.passed,
    notes: v.passed
      ? undefined
      : {
          passed: v.passed,
          reasons: v.reasons,
          suggested_rewrite: v.suggested_rewrite ?? undefined,
        },
    revised_translation: v.suggested_rewrite ?? undefined,
    cost_usd: cost,
  }
}

// =====================================================================
// 4. Native fluency agent (Opus 4.7)
// =====================================================================

const NativeVerdictSchema = z.object({
  passed: z.boolean().describe('True if the translation reads like native writing.'),
  reasons: z
    .array(z.string())
    .describe('Brief reasons for the verdict. Empty if passed.'),
  suggested_rewrite: z
    .string()
    .nullable()
    .describe('If failed, a fluent rewrite that fixes the issue. Null if passed.'),
})

function nativeSystem(glossary: Glossary): string {
  return `You are a native ${glossary.language_name} writer evaluating marketing copy for LENGOLF. Your only job is to verify that a given translation reads as natural ${glossary.language_name} — not as a literal translation.

EVALUATION CRITERIA
- Mark FAILED if the translation contains calques (English idioms translated word-for-word).
- Mark FAILED if word order, particle usage, or sentence rhythm feels foreign or stilted.
- Mark FAILED if the translation uses a vocabulary register inconsistent with the rest of the sentence (e.g. mixing colloquial and formal markers awkwardly).
- Mark PASSED if a ${glossary.language_name} native speaker would write something similar from scratch.

OUT OF SCOPE — do NOT mark failed for these (other agents handle them):
- Brand terms preserved verbatim (lexicon agent — already checked)
- Tone or formality (tone agent — already checked)
- Whether the translation matches the source semantically (assume meaning is correct)

If FAILED, provide a "suggested_rewrite" — a natural-sounding rewrite that preserves meaning, brand-immutable terms, placeholders, and markdown structure.`
}

export async function nativeCheck(
  row: TranslationRow,
  translation: string,
  glossary: Glossary,
): Promise<AgentVerdict> {
  const c = getClient()
  const userMsg = `EN source (for context, do not re-translate):
${row.source_text}

${glossary.language_name} translation under review:
${translation}

Evaluate fluency and naturalness only.`

  const response = await withBackoff(
    () =>
      c.messages.parse({
        model: 'claude-opus-4-7',
        max_tokens: 2048,
        system: [
          {
            type: 'text',
            text: nativeSystem(glossary),
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [{ role: 'user', content: userMsg }],
        output_config: {
          effort: 'high',
          format: zodOutputFormat(NativeVerdictSchema),
        },
      }),
    { label: `nativeCheck ${row.locale}/${row.source_key}` },
  )

  const cost = priceFor('claude-opus-4-7', response.usage as UsageBreakdown)
  const v = response.parsed_output

  if (!v) {
    return {
      passed: false,
      notes: {
        passed: false,
        reasons: ['nativeCheck: model returned unparseable verdict'],
      },
      cost_usd: cost,
    }
  }

  return {
    passed: v.passed,
    notes: v.passed
      ? undefined
      : {
          passed: v.passed,
          reasons: v.reasons,
          suggested_rewrite: v.suggested_rewrite ?? undefined,
        },
    revised_translation: v.suggested_rewrite ?? undefined,
    cost_usd: cost,
  }
}

// =====================================================================
// Glossary loader (called once per runner invocation, then passed in)
// =====================================================================

export async function loadGlossary(locale: 'th' | 'ko' | 'ja'): Promise<Glossary> {
  // Use dynamic import so the JSON gets bundled correctly under tsx.
  const fs = await import('node:fs/promises')
  const path = await import('node:path')
  const file = path.resolve(process.cwd(), 'data', 'i18n-glossary', `${locale}.json`)
  const raw = await fs.readFile(file, 'utf8')
  const parsed = JSON.parse(raw) as Glossary
  return parsed
}
