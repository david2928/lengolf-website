/**
 * Script to list all published location pages in Supabase
 * This helps verify what location slugs are available
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
} catch (error) {
  console.warn('⚠️  Could not load .env.local file')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

async function listLocationPages() {
  console.log('\n📋 All Published Location Pages in Supabase:\n')

  const { data, error } = await supabase
    .from('location_pages')
    .select('url, h1_title, template_type, status')
    .eq('status', 'published')
    .order('url')

  if (error) {
    console.error('❌ Error fetching location pages:', error)
    process.exit(1)
  }

  if (!data || data.length === 0) {
    console.log('⚠️  No published location pages found')
    return
  }

  console.log(`Found ${data.length} published location pages:\n`)

  // Group by template type
  const byType = data.reduce((acc, page) => {
    const type = page.template_type || 'unknown'
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(page)
    return acc
  }, {} as Record<string, typeof data>)

  for (const [type, pages] of Object.entries(byType)) {
    console.log(`\n📂 ${type.toUpperCase()} (${pages.length} pages)`)
    console.log('─'.repeat(60))
    pages.forEach(page => {
      console.log(`   ${page.url}`)
      console.log(`   └─ "${page.h1_title}"`)
    })
  }

  console.log('\n' + '─'.repeat(60))
  console.log(`\n✅ Total: ${data.length} published location pages\n`)
}

listLocationPages().catch((error) => {
  console.error('❌ Script failed:', error)
  process.exit(1)
})
