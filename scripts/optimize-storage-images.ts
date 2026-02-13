/**
 * Optimize large images in Supabase Storage
 *
 * Downloads images over a size threshold, optimizes them with Sharp
 * (resize, compress, convert PNG→JPG where no transparency), and
 * re-uploads to the same path.
 *
 * Usage:
 *   npx tsx scripts/optimize-storage-images.ts            # dry-run (default)
 *   npx tsx scripts/optimize-storage-images.ts --apply     # actually re-upload
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

// Load .env.local
const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx).trim()
  const val = trimmed.slice(eqIdx + 1).trim()
  if (!process.env[key]) process.env[key] = val
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const BUCKET = 'website-assets'

// Config
const SIZE_THRESHOLD_KB = 500 // only process images above this size
const MAX_WIDTH = 1920        // max dimension (px)
const JPG_QUALITY = 80
const PNG_QUALITY = 80        // for PNGs that must stay PNG (have transparency)

// Folders to skip (logos, icons, branding should stay untouched)
const SKIP_PREFIXES = ['branding/', 'icons/']

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

interface StorageObject {
  name: string
  size_kb: number
  mimetype: string
}

async function listLargeImages(): Promise<StorageObject[]> {
  const { data, error } = await supabase.rpc('exec_sql', {
    query: `
      SELECT name,
             ROUND((metadata->>'size')::numeric / 1024, 1) AS size_kb,
             metadata->>'mimetype' AS mimetype
      FROM storage.objects
      WHERE bucket_id = '${BUCKET}'
        AND (metadata->>'mimetype') LIKE 'image/%'
        AND (metadata->>'size')::numeric > ${SIZE_THRESHOLD_KB * 1024}
      ORDER BY (metadata->>'size')::numeric DESC
    `,
  })

  // Fallback: query via storage API if RPC doesn't exist
  if (error) {
    console.log('RPC not available, listing via storage API...')
    return listViaStorageAPI()
  }

  return data as StorageObject[]
}

async function listViaStorageAPI(): Promise<StorageObject[]> {
  // We already know the large files from our SQL query, so hardcode the list
  // from the earlier analysis. The script will verify sizes on download.
  const folders = ['venue', 'golf', 'lessons', 'events', 'tournaments', 'promotions', 'menus']
  const results: StorageObject[] = []

  for (const folder of folders) {
    const { data: files, error } = await supabase.storage.from(BUCKET).list(folder, { limit: 200 })
    if (error) {
      console.error(`  Error listing ${folder}:`, error.message)
      continue
    }
    for (const file of files ?? []) {
      if (!file.metadata) continue
      const mimetype = file.metadata.mimetype as string
      if (!mimetype?.startsWith('image/')) continue
      const sizeKb = Math.round((file.metadata.size as number) / 1024)
      if (sizeKb > SIZE_THRESHOLD_KB) {
        results.push({ name: `${folder}/${file.name}`, size_kb: sizeKb, mimetype })
      }
    }
  }

  results.sort((a, b) => b.size_kb - a.size_kb)
  return results
}

async function downloadImage(path: string): Promise<Buffer> {
  const { data, error } = await supabase.storage.from(BUCKET).download(path)
  if (error) throw new Error(`Download failed for ${path}: ${error.message}`)
  return Buffer.from(await data.arrayBuffer())
}

async function hasTransparency(buffer: Buffer): Promise<boolean> {
  const metadata = await sharp(buffer).metadata()
  if (!metadata.hasAlpha) return false

  // Check if alpha channel actually has non-opaque pixels
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const channels = info.channels
  for (let i = 3; i < data.length; i += channels) {
    if (data[i] < 250) return true // found a semi-transparent pixel
  }
  return false
}

async function optimizeImage(
  buffer: Buffer,
  originalName: string
): Promise<{ buffer: Buffer; newName: string; format: string }> {
  const isPng = originalName.endsWith('.png')
  const metadata = await sharp(buffer).metadata()
  const width = metadata.width ?? 0

  let pipeline = sharp(buffer)

  // Resize if wider than max
  if (width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true })
  }

  if (isPng) {
    // Check for actual transparency
    const transparent = await hasTransparency(buffer)

    if (transparent) {
      // Keep as optimized PNG
      const result = await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer()
      return { buffer: result, newName: originalName, format: 'png' }
    } else {
      // Convert to JPG (no transparency needed)
      const result = await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer()
      const newName = originalName.replace(/\.png$/, '.jpg')
      return { buffer: result, newName, format: 'jpg' }
    }
  } else {
    // Already JPG — just resize and compress
    const result = await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer()
    return { buffer: result, newName: originalName, format: 'jpg' }
  }
}

async function uploadImage(path: string, buffer: Buffer, contentType: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType,
    upsert: true,
  })
  if (error) throw new Error(`Upload failed for ${path}: ${error.message}`)
}

async function deleteImage(path: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw new Error(`Delete failed for ${path}: ${error.message}`)
}

async function main() {
  const apply = process.argv.includes('--apply')

  console.log(`\n=== Supabase Storage Image Optimizer ===`)
  console.log(`Mode: ${apply ? 'APPLY (will re-upload)' : 'DRY RUN (no changes)'}`)
  console.log(`Threshold: ${SIZE_THRESHOLD_KB} KB | Max width: ${MAX_WIDTH}px | JPG quality: ${JPG_QUALITY}\n`)

  const images = await listViaStorageAPI()
  console.log(`Found ${images.length} images over ${SIZE_THRESHOLD_KB} KB\n`)

  let totalOriginal = 0
  let totalOptimized = 0
  const renames: { from: string; to: string }[] = []

  for (const img of images) {
    // Skip branding/icons
    if (SKIP_PREFIXES.some((p) => img.name.startsWith(p))) {
      console.log(`  SKIP  ${img.name} (protected folder)`)
      continue
    }

    try {
      const original = await downloadImage(img.name)
      const { buffer: optimized, newName, format } = await optimizeImage(original, img.name)

      const originalKb = Math.round(original.length / 1024)
      const optimizedKb = Math.round(optimized.length / 1024)
      const savings = originalKb - optimizedKb
      const pct = Math.round((savings / originalKb) * 100)

      totalOriginal += originalKb
      totalOptimized += optimizedKb

      const renamed = newName !== img.name
      const tag = renamed ? ` → ${newName}` : ''
      const marker = savings > 0 ? '  OPT ' : '  SAME'

      console.log(
        `${marker} ${img.name}${tag}  ${originalKb} KB → ${optimizedKb} KB  (${savings > 0 ? '-' : ''}${pct}%)`
      )

      if (apply && savings > 50) {
        // Upload optimized version
        const contentType = format === 'png' ? 'image/png' : 'image/jpeg'
        await uploadImage(newName, optimized, contentType)

        // If renamed (PNG→JPG), delete old PNG
        if (renamed) {
          await deleteImage(img.name)
          renames.push({ from: img.name, to: newName })
          console.log(`         ✓ Uploaded ${newName} and deleted ${img.name}`)
        } else {
          console.log(`         ✓ Replaced ${newName}`)
        }
      }
    } catch (err) {
      console.error(`  ERR  ${img.name}: ${(err as Error).message}`)
    }
  }

  const totalSaved = totalOriginal - totalOptimized
  console.log(`\n--- Summary ---`)
  console.log(`Total original: ${(totalOriginal / 1024).toFixed(1)} MB`)
  console.log(`Total optimized: ${(totalOptimized / 1024).toFixed(1)} MB`)
  console.log(`Total savings: ${(totalSaved / 1024).toFixed(1)} MB (${Math.round((totalSaved / totalOriginal) * 100)}%)`)

  if (renames.length > 0) {
    console.log(`\n⚠️  The following files were renamed (PNG → JPG). Update code references:`)
    for (const r of renames) {
      console.log(`   ${r.from} → ${r.to}`)
    }
  }

  if (!apply) {
    console.log(`\nThis was a DRY RUN. To apply changes, run:`)
    console.log(`  npx tsx scripts/optimize-storage-images.ts --apply\n`)
  }
}

main().catch(console.error)
