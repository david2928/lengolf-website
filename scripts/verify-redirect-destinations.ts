/**
 * Script to verify that redirect destination URLs exist
 * Checks both static pages and dynamic location pages from Supabase
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load environment variables from .env.local
try {
  const envPath = resolve(process.cwd(), '.env.local')
  const envContent = readFileSync(envPath, 'utf-8')

  envContent.split('\n').forEach(line => {
    const trimmed = line.trim()
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) {
      return
    }

    const equalIndex = trimmed.indexOf('=')
    if (equalIndex === -1) {
      return
    }

    const key = trimmed.slice(0, equalIndex).trim()
    let value = trimmed.slice(equalIndex + 1).trim()

    // Strip surrounding quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (key && value) {
      process.env[key] = value
    }
  })
  console.log('✓ Loaded environment variables from .env.local\n')
} catch (error) {
  console.warn('⚠️  Could not load .env.local file:', (error as Error).message)
}

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl || '✗ (not set)')
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✓ (set)' : '✗ (not set)')
  process.exit(1)
}

// Validate URL format
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  console.error('❌ Invalid NEXT_PUBLIC_SUPABASE_URL format')
  console.error('   Got:', supabaseUrl)
  console.error('   Expected: URL starting with http:// or https://')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Redirects to verify
const redirectsToVerify = [
  {
    source: '/indoor-golf-ploenchit',
    destination: '/location/indoor-golf-ploenchit/',
    type: 'location' as const,
  },
  {
    source: '/golf-near-sathorn',
    destination: '/location/golf-near-sathorn/',
    type: 'location' as const,
  },
  {
    source: '/golf-near-phrom-phong',
    destination: '/location/golf-near-phrom-phong/',
    type: 'location' as const,
  },
  {
    source: '/lesson',
    destination: '/lessons/',
    type: 'static' as const,
  },
]

async function checkLocationPageExists(slug: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('location_pages')
    .select('url, status, h1_title')
    .eq('url', `/${slug}/`)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error(`   ⚠️  Database query error: ${error.message}`)
    return false
  }

  if (data) {
    console.log(`   ✓ Found published page: "${data.h1_title}"`)
    return true
  }

  return false
}

async function checkStaticPageExists(path: string): Promise<boolean> {
  // For static pages, verify they exist in the app directory
  const fs = require('fs')
  const pathModule = require('path')

  // Map paths to their file locations
  const pathMap: Record<string, string> = {
    '/lessons/': 'app/[locale]/lessons/page.tsx',
  }

  const filePath = pathMap[path]
  if (!filePath) {
    console.log(`   ⚠️  No mapping for static page: ${path}`)
    return false
  }

  const fullPath = pathModule.join(process.cwd(), filePath)
  const exists = fs.existsSync(fullPath)

  if (exists) {
    console.log(`   ✓ Static page exists at ${filePath}`)
  } else {
    console.log(`   ✗ Static page NOT found at ${filePath}`)
  }

  return exists
}

async function verifyRedirects() {
  console.log('\n🔍 Verifying redirect destinations...\n')

  const results: Array<{ source: string; destination: string; exists: boolean }> = []

  for (const redirect of redirectsToVerify) {
    console.log(`📍 Checking: ${redirect.source} → ${redirect.destination}`)

    let exists = false

    if (redirect.type === 'location') {
      // Extract slug from destination URL
      const slug = redirect.destination.replace('/location/', '').replace(/\//g, '')
      exists = await checkLocationPageExists(slug)
    } else if (redirect.type === 'static') {
      exists = await checkStaticPageExists(redirect.destination)
    }

    results.push({
      source: redirect.source,
      destination: redirect.destination,
      exists,
    })

    console.log()
  }

  // Summary
  console.log('━'.repeat(60))
  console.log('\n📊 Summary:\n')

  const safeRedirects = results.filter((r) => r.exists)
  const unsafeRedirects = results.filter((r) => !r.exists)

  if (safeRedirects.length > 0) {
    console.log('✅ Safe to deploy:')
    safeRedirects.forEach((r) => {
      console.log(`   ${r.source} → ${r.destination}`)
    })
  }

  if (unsafeRedirects.length > 0) {
    console.log('\n❌ Need destination pages created first:')
    unsafeRedirects.forEach((r) => {
      console.log(`   ${r.source} → ${r.destination}`)
    })
    console.log('\n   Action required: Create these location pages in Supabase')
    console.log('   before deploying these redirects.')
  }

  if (unsafeRedirects.length === 0) {
    console.log('\n✅ All redirect destinations exist. Safe to deploy!')
  }

  console.log()
}

// Run verification
verifyRedirects().catch((error) => {
  console.error('❌ Script failed:', error)
  process.exit(1)
})
