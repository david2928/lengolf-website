/**
 * Cost estimation, hard cap, and retry/backoff for the translation runner.
 *
 * Pricing constants reflect Anthropic's 2026-04-15 published rates. Update
 * these when the rate card changes.
 */

import Anthropic from '@anthropic-ai/sdk'

export type ModelId = 'claude-opus-4-7' | 'claude-sonnet-4-6' | 'claude-haiku-4-5'

interface PriceTable {
  // USD per 1M tokens
  input: number
  output: number
}

const PRICES: Record<ModelId, PriceTable> = {
  'claude-opus-4-7': { input: 5, output: 25 },
  'claude-sonnet-4-6': { input: 3, output: 15 },
  'claude-haiku-4-5': { input: 1, output: 5 },
}

// 5-minute ephemeral cache: writes cost 1.25x input, reads cost 0.1x input.
const CACHE_WRITE_MULTIPLIER = 1.25
const CACHE_READ_MULTIPLIER = 0.1

export interface UsageBreakdown {
  input_tokens: number
  output_tokens: number
  cache_creation_input_tokens?: number
  cache_read_input_tokens?: number
}

export function priceFor(model: ModelId, usage: UsageBreakdown): number {
  const p = PRICES[model]
  if (!p) throw new Error(`Unknown model for pricing: ${model}`)

  const inputCost = (usage.input_tokens / 1_000_000) * p.input
  const outputCost = (usage.output_tokens / 1_000_000) * p.output
  const cacheWriteCost =
    ((usage.cache_creation_input_tokens ?? 0) / 1_000_000) * p.input * CACHE_WRITE_MULTIPLIER
  const cacheReadCost =
    ((usage.cache_read_input_tokens ?? 0) / 1_000_000) * p.input * CACHE_READ_MULTIPLIER

  return inputCost + outputCost + cacheWriteCost + cacheReadCost
}

export function maxCostUsd(): number {
  const v = Number(process.env.TRANSLATION_MAX_COST_USD ?? 20)
  if (!Number.isFinite(v) || v <= 0) {
    throw new Error(
      `Invalid TRANSLATION_MAX_COST_USD: ${process.env.TRANSLATION_MAX_COST_USD}`,
    )
  }
  return v
}

/**
 * Retry with exponential backoff + jitter on retryable Anthropic errors.
 * Returns the typed exception on terminal failure so the caller can decide.
 */
export async function withBackoff<T>(
  fn: () => Promise<T>,
  opts: { maxRetries?: number; baseMs?: number; label?: string } = {},
): Promise<T> {
  const { maxRetries = 3, baseMs = 1000, label = 'request' } = opts
  let lastErr: unknown

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastErr = err
      const retryable =
        err instanceof Anthropic.RateLimitError ||
        err instanceof Anthropic.InternalServerError ||
        (err instanceof Anthropic.APIError && err.status === 529)

      if (!retryable || attempt === maxRetries) {
        throw err
      }

      const delay = baseMs * Math.pow(2, attempt) + Math.floor(Math.random() * baseMs)
      console.warn(
        `[backoff] ${label} attempt ${attempt + 1}/${maxRetries + 1} failed (${(err as Error).message ?? 'unknown'}); retrying in ${delay}ms`,
      )
      await new Promise((r) => setTimeout(r, delay))
    }
  }

  throw lastErr
}
