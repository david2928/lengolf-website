/**
 * Sampling strategy for which translation rows get the deep-review pass
 * (tone agent + native fluency agent on top of lexicon).
 *
 * Lexicon runs on 100% of rows; deep review runs on ~10% sample plus all
 * long-text rows. Deterministic via a stable hash of the row id so re-running
 * the runner doesn't shift which rows got reviewed.
 */

import type { TranslationRow } from './types'

const LENGTH_THRESHOLD = 200 // chars in source_text
const SAMPLE_RATE = 0.10     // 10% of remaining rows

/**
 * Stable, deterministic hash → integer in [0, 2^32). Not crypto; just for
 * sampling. djb2 over string bytes.
 */
function hashId(id: string): number {
  let h = 5381
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) + h + id.charCodeAt(i)) >>> 0
  }
  return h
}

export function shouldDeepReview(row: TranslationRow): boolean {
  if (row.source_text.length > LENGTH_THRESHOLD) return true
  // Hash falls in bottom 10% bucket → sampled.
  const bucket = hashId(row.id) % 100
  return bucket < SAMPLE_RATE * 100
}
