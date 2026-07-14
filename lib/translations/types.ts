/**
 * Workstream B — Multi-Language Translation Pipeline
 *
 * Shared types for the translation pipeline. The pipeline stages translations
 * through a Supabase `translations` table, with status transitions driven by
 * the runner script. See docs/translation-pipeline.md for the full lifecycle.
 */

export type Locale = 'th' | 'ko' | 'ja'

export const ALL_TARGET_LOCALES: readonly Locale[] = ['th', 'ko', 'ja'] as const

export type SourceType = 'message' | 'workstream_a_template'

export type Status =
  | 'pending'         // enumerated by seed; no translation yet
  | 'draft'           // translator wrote it; review pending
  | 'lexicon_passed'  // lexicon agent OK
  | 'tone_passed'     // tone agent OK (only set for sampled rows)
  | 'native_passed'   // native fluency agent OK (only set for sampled rows)
  | 'ready'           // promoted by runner; ready for publish
  | 'published'       // merged into messages/<locale>.json on a topic branch
  | 'rejected'        // human-rejected via review CLI
  | 'flagged'         // any agent flagged it; awaits human review

export interface TranslationNotes {
  // Per-agent verdicts as they accumulate.
  lexicon?: { passed: boolean; reasons?: string[]; missing_brand_terms?: string[]; missing_preferred?: string[]; placeholder_drift?: string[] }
  tone?: { passed: boolean; reasons?: string[]; suggested_rewrite?: string }
  native?: { passed: boolean; reasons?: string[]; suggested_rewrite?: string }
  // Free-form runner notes (errors, retries, manual edits).
  error?: string
  retries?: number
  manual_edit?: boolean
  // Glossary candidate hits surfaced during translation.
  glossary_candidates?: Array<{ source_term: string; proposed: string }>
}

export interface TranslationRow {
  id: string
  source_type: SourceType
  source_key: string      // dot-notation, e.g. 'Nav.home' or 'CoursesCompare.intro'
  locale: Locale
  field: string           // 'value' for message catalog rows
  source_text: string
  translation: string | null
  status: Status
  notes: TranslationNotes
  cost_usd: number
  created_at?: string
  updated_at?: string
}

export interface NewTranslationRow {
  source_type: SourceType
  source_key: string
  locale: Locale
  field: string
  source_text: string
}

export interface AgentVerdict {
  passed: boolean
  notes?: TranslationNotes['lexicon'] | TranslationNotes['tone'] | TranslationNotes['native']
  revised_translation?: string
  cost_usd: number
}

export interface Glossary {
  locale: Locale
  language_name: string
  brand_immutable: string[]
  preferred: Record<string, string>
  tone: string
  formality: string
  preserve: string[]
}

export interface RunnerArgs {
  locale: Locale | 'all'
  limit?: number
  dryRun: boolean
}

export interface RunSummary {
  startedAt: string
  finishedAt: string
  rowsProcessed: number
  rowsReady: number
  rowsFlagged: number
  rowsRejected: number
  totalCostUsd: number
  remainingByLocale: Record<Locale, number>
}
