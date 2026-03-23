import { test } from '@playwright/test'
import { mobileViewportSweep } from './mobile-viewports'

/**
 * Mobile viewport sweep for /rent-golf-clubs-bangkok (all locales).
 *
 * Tests run against the dev server (locally) or BASE_URL in CI.
 * Each locale gets its own describe block; viewports are nested inside.
 */

const LOCALES = [
  { path: '/rent-golf-clubs-bangkok',    ctaText: 'Reserve Golf Clubs' },
  { path: '/th/rent-golf-clubs-bangkok', ctaText: 'จองไม้กอล์ฟ' },
  { path: '/ko/rent-golf-clubs-bangkok', ctaText: '골프채 예약' },
  { path: '/ja/rent-golf-clubs-bangkok', ctaText: 'クラブを予約' },
  { path: '/zh/rent-golf-clubs-bangkok', ctaText: '预订球杆' },
]

for (const { path, ctaText } of LOCALES) {
  test.describe(`Landing page: ${path}`, () => {
    mobileViewportSweep(path, {
      ctaSelector: `text=${ctaText}`,
      keySelectors: [
        'h1',
        '[data-testid="trust-bar"]',
      ],
      skipFormChecks: true, // landing page has no inline form — booking is external
    })
  })
}
