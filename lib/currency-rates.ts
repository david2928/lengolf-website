/**
 * Hard-coded exchange rate constants for approximate currency display.
 * Update quarterly — last updated: 2026-03-18
 */
export const EXCHANGE_RATES = {
  THB_TO_KRW: 39.5,
  THB_TO_JPY: 4.4,
  THB_TO_CNY: 0.21,
} as const

/**
 * Returns an approximate currency string for the given THB amount and locale.
 * Returns null for en/th (no conversion needed).
 */
export function getApproxCurrency(thbAmount: number, locale: string): string | null {
  switch (locale) {
    case 'ko': {
      const krw = Math.round(thbAmount * EXCHANGE_RATES.THB_TO_KRW / 100) * 100
      return `≈ ₩${krw.toLocaleString('ko-KR')}`
    }
    case 'ja': {
      const jpy = Math.round(thbAmount * EXCHANGE_RATES.THB_TO_JPY / 10) * 10
      return `≈ ¥${jpy.toLocaleString('ja-JP')}`
    }
    case 'zh': {
      const cny = Math.round(thbAmount * EXCHANGE_RATES.THB_TO_CNY)
      return `≈ ¥${cny.toLocaleString('zh-CN')}`
    }
    default:
      return null
  }
}
