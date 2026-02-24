#!/usr/bin/env tsx

/**
 * Tests the Thai redirect logic to ensure correct behavior
 */

import { hasThaiTranslation } from '../lib/translated-routes'

interface TestCase {
  path: string
  expected: boolean
  description: string
}

const tests: TestCase[] = [
  // Should have translation (return true)
  { path: '/', expected: true, description: 'Root path' },
  { path: '/golf', expected: true, description: 'Golf page' },
  { path: '/golf/', expected: true, description: 'Golf page with trailing slash' },
  { path: '/events', expected: true, description: 'Events page' },
  { path: '/golf-club-rental', expected: true, description: 'Golf club rental page' },
  { path: '/lessons', expected: true, description: 'Lessons page' },
  { path: '/about-us', expected: true, description: 'About us page' },
  { path: '/blog', expected: true, description: 'Blog listing page' },

  // Should NOT have translation (return false)
  { path: '/location/indoor-golf-chidlom', expected: false, description: 'Location dynamic route' },
  { path: '/blog/golf-lessons-in-bangkok', expected: false, description: 'Blog post detail' },
  { path: '/blog/golf-lessons-in-bangkok/', expected: false, description: 'Blog post with trailing slash' },
  { path: '/activities/date-night-ideas-bangkok', expected: false, description: 'Activities page' },
  { path: '/hotels/things-to-do-near-arnoma-grand-bangkok', expected: false, description: 'Hotels page' },
  { path: '/guide/what-is-a-golf-simulator', expected: false, description: 'Guide page' },
  { path: '/cost/golf-lessons-cost-bangkok', expected: false, description: 'Cost page' },
  { path: '/faq/is-golf-hard-to-learn', expected: false, description: 'FAQ page' },
  { path: '/privacy-policy', expected: false, description: 'Privacy policy (English only)' },
  { path: '/terms-of-service', expected: false, description: 'Terms of service (English only)' },

  // Edge cases — function expects locale-free paths (middleware strips /th prefix)
  // Passing /th-prefixed paths should return false since the function no longer strips them
  { path: '/th/', expected: false, description: 'Raw /th/ path (function expects locale-free input)' },
  { path: '/th/golf', expected: false, description: 'Raw /th/golf (function expects locale-free input)' },
]

console.log('Testing hasThaiTranslation logic:\n')

let passed = 0
let failed = 0
const failures: string[] = []

tests.forEach(({ path, expected, description }) => {
  const result = hasThaiTranslation(path)
  const status = result === expected ? '✓' : '✗'

  if (result === expected) {
    passed++
    console.log(`  \x1b[32m${status}\x1b[0m ${description}: hasThaiTranslation('${path}') = ${result}`)
  } else {
    failed++
    const msg = `${description}: hasThaiTranslation('${path}') = ${result} (expected: ${expected})`
    failures.push(msg)
    console.log(`  \x1b[31m${status}\x1b[0m ${msg}`)
  }
})

console.log(`\n\x1b[1mResults: ${passed} passed, ${failed} failed\x1b[0m`)

if (failures.length > 0) {
  console.log('\nFailed tests:')
  failures.forEach((f) => console.log(`  \x1b[31m•\x1b[0m ${f}`))
  process.exit(1)
}

console.log('\x1b[32mAll tests passed!\x1b[0m')
