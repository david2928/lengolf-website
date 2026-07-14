import { test } from '@playwright/test'
import { mobileViewportSweep } from './mobile-viewports'

/**
 * Mobile viewport sweep for /golf-course-club-rental (all locales).
 *
 * Tests run against the dev server (locally) or BASE_URL in CI.
 * Each locale gets its own describe block; viewports are nested inside.
 */

const LOCALES = [
  { path: '/golf-course-club-rental',    ctaText: 'Book Clubs' },
  { path: '/th/golf-course-club-rental', ctaText: 'จองไม้กอล์ฟ' },
  { path: '/ko/golf-course-club-rental', ctaText: '클럽 예약' },
  { path: '/ja/golf-course-club-rental', ctaText: 'クラブを予約' },
  { path: '/zh/golf-course-club-rental', ctaText: '预订球杆' },
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
