#!/usr/bin/env tsx

/**
 * Smoke tests for lengolf-website CI pipeline.
 * Hits key routes on a running Next.js server and verifies:
 *   A) Pages return 200 with correct layout (catches middleware/routing breaks)
 *   B) WordPress redirects return 301 with correct Location (protects SEO)
 *   C) Critical external links resolve (booking system, LINE, storage assets)
 *   D) SEO elements are present (title, meta description, canonical, JSON-LD, lang)
 *
 * Usage: tsx scripts/smoke-test.ts [base-url]
 * Default: http://localhost:3000
 *
 * Zero dependencies beyond tsx (already a devDep) + Node.js built-in fetch.
 */

const BASE = process.argv[2] || 'http://localhost:3000'

// ── Test definitions ────────────────────────────────────────────────

interface RouteTest {
  path: string
  expectedStatus: number[]
  contentMarker?: string   // must appear in body
  contentAbsent?: string   // must NOT appear in body
}

interface RedirectTest {
  path: string
  expectedStatus: number
  expectedLocation: string
}

interface LinkTest {
  url: string
  label: string
}

interface SeoTest {
  path: string
  locale: 'en' | 'th'
}

// A) Route smoke tests
const routeTests: RouteTest[] = [
  // EN pages
  { path: '/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/golf/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/lessons/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/events/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/about-us/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/blog/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/golf-club-rental/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/privacy-policy/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/terms-of-service/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  // TH pages
  { path: '/th/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/th/golf/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/th/lessons/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/th/events/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/th/about-us/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  { path: '/th/blog/', expectedStatus: [200], contentMarker: '<main id="main-content">' },
  // API routes (no Google Maps key in CI, so 500 is acceptable — just not 404)
  { path: '/api/aqi/', expectedStatus: [200, 500, 502] },
]

// B) Redirect tests (representative sample of 60+ WordPress redirects)
const redirectTests: RedirectTest[] = [
  // Test with trailing slashes — trailingSlash:true causes a 308 hop first,
  // so we test the path that actually triggers the next.config.js redirect.
  // Next.js uses 308 for permanent: true redirects.
  // WordPress blog post → /blog/ prefix
  { path: '/bangkok-golf-centre-vs-lengolf/', expectedStatus: 308, expectedLocation: '/blog/bangkok-golf-centre-vs-lengolf/' },
  { path: '/topgolf-bangkok-vs-lengolf/', expectedStatus: 308, expectedLocation: '/blog/topgolf-bangkok-vs-lengolf/' },
  // Tag/category archives → /blog/
  { path: '/tag/bangkok/', expectedStatus: 308, expectedLocation: '/blog/' },
  { path: '/category/golf/', expectedStatus: 308, expectedLocation: '/blog/' },
  // WordPress admin → /
  { path: '/wp-admin/', expectedStatus: 308, expectedLocation: '/' },
  // Old pages
  { path: '/tournaments/', expectedStatus: 308, expectedLocation: '/events/' },
  // Location area taxonomy
  { path: '/location-area/chidlom/', expectedStatus: 308, expectedLocation: '/location/indoor-golf-chidlom/' },
  // Page type taxonomy
  { path: '/page-type/golf-lessons/', expectedStatus: 308, expectedLocation: '/lessons/' },
]

// C) Critical external link checks
const linkTests: LinkTest[] = [
  { url: 'https://booking.len.golf/', label: 'Booking system' },
  { url: 'https://lin.ee/uxQpIXn', label: 'LINE link' },
  // Supabase Storage assets (spot-check)
  { url: 'https://bisimqmtxjsptehhqpeg.supabase.co/storage/v1/object/public/website-assets/branding/logo.png', label: 'Logo asset' },
  { url: 'https://bisimqmtxjsptehhqpeg.supabase.co/storage/v1/object/public/website-assets/venue/venue-bar-01.jpg', label: 'Venue image' },
]

// D) SEO sanity checks
const seoTests: SeoTest[] = [
  { path: '/', locale: 'en' },
  { path: '/golf/', locale: 'en' },
  { path: '/blog/', locale: 'en' },
  { path: '/th/', locale: 'th' },
  { path: '/th/golf/', locale: 'th' },
]

// ── Runner ──────────────────────────────────────────────────────────

let passed = 0
let failed = 0
const failures: string[] = []

function pass(label: string) {
  passed++
  console.log(`  \x1b[32m✓\x1b[0m ${label}`)
}

function fail(label: string, reason: string) {
  failed++
  const msg = `${label} — ${reason}`
  failures.push(msg)
  console.log(`  \x1b[31m✗\x1b[0m ${msg}`)
}

async function runRouteTests() {
  console.log('\n\x1b[1mA) Route tests\x1b[0m')
  for (const t of routeTests) {
    const label = `GET ${t.path}`
    try {
      const res = await fetch(`${BASE}${t.path}`, { redirect: 'follow' })
      const body = await res.text()

      if (!t.expectedStatus.includes(res.status)) {
        fail(label, `expected ${t.expectedStatus.join('|')}, got ${res.status}`)
        continue
      }
      if (t.contentMarker && !body.includes(t.contentMarker)) {
        fail(label, `missing content marker: ${t.contentMarker}`)
        continue
      }
      if (t.contentAbsent && body.includes(t.contentAbsent)) {
        fail(label, `unexpected content found: ${t.contentAbsent}`)
        continue
      }
      pass(label)
    } catch (err) {
      fail(label, `fetch error: ${(err as Error).message}`)
    }
  }
}

async function runRedirectTests() {
  console.log('\n\x1b[1mB) Redirect tests\x1b[0m')
  for (const t of redirectTests) {
    const label = `${t.path} → ${t.expectedLocation}`
    try {
      const res = await fetch(`${BASE}${t.path}`, { redirect: 'manual' })
      const location = res.headers.get('location') || ''
      // Location can be absolute or relative — normalize to path
      let locationPath: string
      try {
        locationPath = new URL(location).pathname
      } catch {
        locationPath = location
      }

      if (res.status !== t.expectedStatus) {
        fail(label, `expected ${t.expectedStatus}, got ${res.status}`)
        continue
      }
      if (locationPath !== t.expectedLocation) {
        fail(label, `location: expected ${t.expectedLocation}, got ${locationPath}`)
        continue
      }
      pass(label)
    } catch (err) {
      fail(label, `fetch error: ${(err as Error).message}`)
    }
  }
}

async function runLinkTests() {
  console.log('\n\x1b[1mC) Critical link checks\x1b[0m')
  for (const t of linkTests) {
    const label = `${t.label} (${t.url})`
    try {
      const res = await fetch(t.url, {
        redirect: 'follow',
        headers: { 'User-Agent': 'LENGOLF-SmokeTest/1.0' },
      })
      // Accept any 2xx or 3xx as "resolves" — we just need it to not be dead
      if (res.status >= 400) {
        fail(label, `status ${res.status}`)
        continue
      }
      pass(label)
    } catch (err) {
      fail(label, `fetch error: ${(err as Error).message}`)
    }
  }
}

async function runSeoTests() {
  console.log('\n\x1b[1mD) SEO sanity checks\x1b[0m')
  for (const t of seoTests) {
    const label = `SEO ${t.path}`
    try {
      const res = await fetch(`${BASE}${t.path}`, { redirect: 'follow' })
      const body = await res.text()
      const issues: string[] = []

      // <html lang="..."> matches expected locale
      const langMatch = body.match(/<html[^>]*\slang="([^"]*)"/)
      if (!langMatch) {
        issues.push('missing <html lang>')
      } else if (langMatch[1] !== t.locale) {
        issues.push(`lang="${langMatch[1]}", expected "${t.locale}"`)
      }

      // <title> exists and is non-empty, no "undefined" or "404"
      const titleMatch = body.match(/<title>([^<]*)<\/title>/)
      if (!titleMatch || !titleMatch[1].trim()) {
        issues.push('missing or empty <title>')
      } else if (/undefined|404|Page Not Found/i.test(titleMatch[1])) {
        issues.push(`bad title: "${titleMatch[1]}"`)
      }

      // <meta name="description"> exists
      if (!body.includes('name="description"')) {
        issues.push('missing meta description')
      }

      // canonical link exists with www.len.golf
      const canonicalMatch = body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)
      if (!canonicalMatch) {
        issues.push('missing canonical link')
      } else if (!canonicalMatch[1].includes('www.len.golf')) {
        issues.push(`canonical not using www.len.golf: ${canonicalMatch[1]}`)
      }

      // JSON-LD exists
      if (!body.includes('application/ld+json')) {
        issues.push('missing JSON-LD')
      }

      if (issues.length > 0) {
        fail(label, issues.join('; '))
      } else {
        pass(label)
      }
    } catch (err) {
      fail(label, `fetch error: ${(err as Error).message}`)
    }
  }
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log(`\x1b[1mSmoke testing: ${BASE}\x1b[0m`)

  // Verify server is reachable before running tests
  try {
    await fetch(BASE, { signal: AbortSignal.timeout(5000) })
  } catch {
    console.error(`\n\x1b[31mError: Cannot reach ${BASE}. Is the server running?\x1b[0m`)
    console.error('Start it with: npm run build && npm run start')
    process.exit(1)
  }

  await runRouteTests()
  await runRedirectTests()
  await runLinkTests()
  await runSeoTests()

  console.log(`\n\x1b[1m${passed} passed, ${failed} failed\x1b[0m`)
  if (failures.length > 0) {
    console.log('\nFailed:')
    failures.forEach((f) => console.log(`  \x1b[31m•\x1b[0m ${f}`))
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Smoke test crashed:', err)
  process.exit(1)
})
