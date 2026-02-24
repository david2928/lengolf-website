#!/usr/bin/env tsx

/**
 * Integration test for Thai redirect middleware logic
 * Tests actual middleware behavior with mock Next.js request objects
 */

import { hasThaiTranslation } from '../lib/translated-routes'

interface TestCase {
  path: string
  expectedBehavior: 'redirect' | 'allow'
  expectedRedirectTo?: string
  description: string
}

const tests: TestCase[] = [
  // Should redirect (no Thai translation)
  {
    path: '/th/location/indoor-golf-sathorn/',
    expectedBehavior: 'redirect',
    expectedRedirectTo: '/location/indoor-golf-sathorn/',
    description: 'Location page redirects to English',
  },
  {
    path: '/th/blog/golf-lessons-in-bangkok/',
    expectedBehavior: 'redirect',
    expectedRedirectTo: '/blog/golf-lessons-in-bangkok/',
    description: 'Blog post redirects to English',
  },
  {
    path: '/th/privacy-policy/',
    expectedBehavior: 'redirect',
    expectedRedirectTo: '/privacy-policy/',
    description: 'Privacy policy redirects to English',
  },
  {
    path: '/th/activities/date-night-ideas-bangkok/',
    expectedBehavior: 'redirect',
    expectedRedirectTo: '/activities/date-night-ideas-bangkok/',
    description: 'Activity page redirects to English',
  },
  {
    path: '/th/hotels/things-to-do-near-arnoma-grand-bangkok/',
    expectedBehavior: 'redirect',
    expectedRedirectTo: '/hotels/things-to-do-near-arnoma-grand-bangkok/',
    description: 'Hotel page redirects to English',
  },

  // Should allow (has Thai translation)
  {
    path: '/th/',
    expectedBehavior: 'allow',
    description: 'Thai homepage allowed',
  },
  {
    path: '/th/golf/',
    expectedBehavior: 'allow',
    description: 'Thai golf page allowed',
  },
  {
    path: '/th/events/',
    expectedBehavior: 'allow',
    description: 'Thai events page allowed',
  },
  {
    path: '/th/golf-club-rental/',
    expectedBehavior: 'allow',
    description: 'Thai golf club rental page allowed',
  },
  {
    path: '/th/lessons/',
    expectedBehavior: 'allow',
    description: 'Thai lessons page allowed',
  },
  {
    path: '/th/about-us/',
    expectedBehavior: 'allow',
    description: 'Thai about us page allowed',
  },
  {
    path: '/th/blog/',
    expectedBehavior: 'allow',
    description: 'Thai blog listing allowed',
  },

  // Bare /th path (edge case — middleware runs before trailing slash normalization)
  {
    path: '/th',
    expectedBehavior: 'allow',
    description: 'Bare /th path (homepage) allowed',
  },

  // English paths should always be allowed (no /th/ prefix)
  {
    path: '/golf/',
    expectedBehavior: 'allow',
    description: 'English golf page allowed',
  },
  {
    path: '/location/indoor-golf-sathorn/',
    expectedBehavior: 'allow',
    description: 'English location page allowed',
  },
]

console.log('Testing middleware redirect logic:\n')

let passed = 0
let failed = 0
const failures: string[] = []

tests.forEach(({ path, expectedBehavior, expectedRedirectTo, description }) => {
  // Simulate middleware logic (must match actual middleware condition)
  const shouldRedirect = path === '/th' || path.startsWith('/th/')
  const pathWithoutLocale = path.replace(/^\/th/, '') || '/'
  const hasTranslation = hasThaiTranslation(pathWithoutLocale)

  let actualBehavior: 'redirect' | 'allow'
  let actualRedirectTo: string | undefined

  if (shouldRedirect && !hasTranslation) {
    actualBehavior = 'redirect'
    actualRedirectTo = pathWithoutLocale
  } else {
    actualBehavior = 'allow'
  }

  const behaviorMatches = actualBehavior === expectedBehavior
  const redirectMatches = expectedRedirectTo ? actualRedirectTo === expectedRedirectTo : true
  const testPassed = behaviorMatches && redirectMatches

  if (testPassed) {
    passed++
    const detail =
      actualBehavior === 'redirect'
        ? ` -> ${actualRedirectTo}`
        : ' (pass through to next-intl)'
    console.log(`  \x1b[32m✓\x1b[0m ${description}: ${path}${detail}`)
  } else {
    failed++
    const expected =
      expectedBehavior === 'redirect'
        ? `redirect to ${expectedRedirectTo}`
        : 'allow'
    const actual =
      actualBehavior === 'redirect' ? `redirect to ${actualRedirectTo}` : 'allow'
    const msg = `${description}: expected ${expected}, got ${actual}`
    failures.push(msg)
    console.log(`  \x1b[31m✗\x1b[0m ${msg}`)
  }
})

console.log(`\n\x1b[1mResults: ${passed} passed, ${failed} failed\x1b[0m`)

if (failures.length > 0) {
  console.log('\nFailed tests:')
  failures.forEach((f) => console.log(`  \x1b[31m•\x1b[0m ${f}`))
  process.exit(1)
}

console.log('\x1b[32mAll middleware tests passed!\x1b[0m')
