# Supabase Storage

> How static assets (images, videos) are managed via Supabase Storage for the LENGOLF website.

Last updated: 2026-02-12

---

## Table of Contents

- [Overview](#overview)
- [Bucket Structure](#bucket-structure)
- [The storageUrl Helper](#the-storageurl-helper)
- [Using Assets in Components](#using-assets-in-components)
- [Adding New Images](#adding-new-images)
- [Next.js Image Configuration](#nextjs-image-configuration)
- [Local Files](#local-files)
- [Troubleshooting](#troubleshooting)

---

## Overview

All website images and videos are hosted in a **public** Supabase Storage bucket named `website-assets`. This replaces the WordPress `wp-content/uploads/` directory and provides CDN-backed delivery with permanent URLs.

**Bucket URL base:**

```
https://bisimqmtxjsptehhqpeg.supabase.co/storage/v1/object/public/website-assets
```

This base URL is defined as `SUPABASE_STORAGE_URL` in `lib/constants.ts`. You should never hardcode this URL in components -- always use the `storageUrl()` helper.

---

## Bucket Structure

The `website-assets` bucket is organized into the following top-level folders:

```
website-assets/
  branding/         # Logos, brand marks
    logo.png
    logo-white.png
    ...
  venue/            # Venue photos (interior, exterior, simulator bays)
    venue-simulator-01.jpg
    venue-interior-01.jpg
    ...
  golf/             # Golf-related imagery
    ...
  events/           # Event photos and covers
    events-cover.png
    ...
  lessons/          # Coach photos, lesson imagery
    lessons-cover.png
    coach-boss.png
    coach-boss-gallery-01.png
    coach-ratchavin.png
    coach-min.png
    ...
  tournaments/      # Tournament-specific imagery
    ...
  menus/            # Food and drink menu images
    food-drinks-cover.png
    food-drink-menu.png
    ...
  icons/            # UI icons for event types, features
    icon-corporate.png
    icon-party.png
    icon-team-building.png
    icon-meet-greet.png
    icon-birthday.png
    icon-filming.png
    ...
  promotions/       # Promotional banners and graphics
    ...
  videos/           # Video assets
    ...
```

### Naming Conventions

- Use **lowercase** file names with **hyphens** as separators: `coach-boss-gallery-01.png`
- Prefix files with their category when it aids clarity: `coach-boss.png`, `venue-simulator-01.jpg`
- Use sequential numbering for gallery images: `coach-boss-gallery-01.png`, `coach-boss-gallery-02.png`
- Prefer `.png` for graphics with transparency, `.jpg` for photographs

---

## The storageUrl Helper

The `storageUrl()` function in `lib/constants.ts` constructs a full URL from a relative path within the bucket:

```typescript
// lib/constants.ts
export const SUPABASE_STORAGE_URL =
  'https://bisimqmtxjsptehhqpeg.supabase.co/storage/v1/object/public/website-assets'

export function storageUrl(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${SUPABASE_STORAGE_URL}/${clean}`
}
```

### Usage

```typescript
import { storageUrl } from '@/lib/constants'

// Returns: https://bisimqmtxjsptehhqpeg.supabase.co/storage/v1/object/public/website-assets/branding/logo.png
storageUrl('branding/logo.png')

// Leading slashes are handled automatically
storageUrl('/venue/venue-simulator-01.jpg')
// Same result as:
storageUrl('venue/venue-simulator-01.jpg')
```

The helper strips any leading `/` from the path to prevent double-slash issues in the URL.

---

## Using Assets in Components

### In Static Data Files

The `data/pricing.ts` and `data/coaches.ts` files use `storageUrl()` directly:

```typescript
// data/coaches.ts
import { storageUrl } from '@/lib/constants'

export const coaches: Coach[] = [
  {
    name: 'PRO Boss',
    photo: storageUrl('lessons/coach-boss.png'),
    gallery: [
      storageUrl('lessons/coach-boss-gallery-01.png'),
      storageUrl('lessons/coach-boss-gallery-02.png'),
    ],
    // ...
  },
]
```

```typescript
// data/pricing.ts
import { storageUrl } from '@/lib/constants'

export const services = [
  { title: 'Golf', image: storageUrl('venue/venue-simulator-01.jpg'), href: '/golf' },
  { title: 'Lessons', image: storageUrl('lessons/lessons-cover.png'), href: '/lessons' },
]

export const eventTypes = [
  { title: 'Corporate events', icon: storageUrl('icons/icon-corporate.png') },
  { title: 'Birthdays', icon: storageUrl('icons/icon-birthday.png') },
]
```

### With next/image

When using the Next.js `<Image>` component with Supabase Storage URLs, the remote pattern is already configured in `next.config.js`:

```typescript
import Image from 'next/image'
import { storageUrl } from '@/lib/constants'

<Image
  src={storageUrl('venue/venue-simulator-01.jpg')}
  alt="LENGOLF simulator bay"
  width={800}
  height={600}
/>
```

### In JSON-LD

The `lib/jsonld.ts` file uses `storageUrl()` for the business logo in structured data:

```typescript
import { storageUrl } from '@/lib/constants'

export function getLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    image: storageUrl('branding/logo.png'),
    // ...
  }
}
```

### In CSS / Inline Styles

For background images in JSX, construct the URL inline:

```tsx
<div style={{ backgroundImage: `url(${storageUrl('venue/venue-interior-01.jpg')})` }} />
```

---

## Adding New Images

### Step 1: Upload to Supabase Storage

1. Open the [Supabase Dashboard](https://supabase.com/dashboard) and navigate to your project.
2. Go to **Storage** in the left sidebar.
3. Select the **website-assets** bucket.
4. Navigate to the appropriate folder (e.g., `venue/`, `events/`).
5. Click **Upload files** and select your image(s).
6. Verify the file appears in the list.

Alternatively, you can upload via the Supabase CLI or JavaScript client:

```bash
# Using Supabase CLI (requires service role key)
supabase storage cp ./local-image.jpg sb://website-assets/venue/new-image.jpg
```

### Step 2: Reference in Code

Use the `storageUrl()` helper with the path relative to the bucket root:

```typescript
import { storageUrl } from '@/lib/constants'

const imageUrl = storageUrl('venue/new-image.jpg')
```

### Step 3: Create a New Folder (if needed)

If you need a new asset category:

1. In the Supabase Dashboard, navigate to the `website-assets` bucket.
2. Click **Create folder**.
3. Name it in lowercase with hyphens (e.g., `new-category`).
4. Upload files into the new folder.
5. Reference them as `storageUrl('new-category/file-name.jpg')`.

---

## Next.js Image Configuration

The `next.config.js` file is configured to allow images from the Supabase Storage hostname:

```javascript
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bisimqmtxjsptehhqpeg.supabase.co',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
}
```

This allows the `next/image` component to optimize and cache images from Supabase Storage. Images are cached for 30 days by the Next.js image optimization layer.

Additionally, custom headers in `next.config.js` set aggressive caching for static image and font files served directly:

```javascript
{
  source: "/:path*.(ico|svg|png|jpg|jpeg|gif|webp)",
  headers: [
    { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  ],
}
```

---

## Local Files

Only one image file remains in the project's `public/` directory:

```
public/
  images/
    favicon.png     # Site favicon
```

All other static assets have been migrated to Supabase Storage. Do not add new images to `public/images/` -- upload them to the appropriate Supabase Storage folder instead.

---

## Troubleshooting

### Image not loading / 404

1. **Check the path**: Verify the file exists in the Supabase Dashboard under Storage > website-assets.
2. **Check for typos**: The path in `storageUrl()` must exactly match the folder and file name in the bucket (case-sensitive).
3. **Check bucket visibility**: The `website-assets` bucket must be set to **public**. Verify this in Storage > website-assets > Settings.

### Image not optimized by next/image

1. **Check remote patterns**: The Supabase hostname must be listed in `next.config.js` under `images.remotePatterns`.
2. **Use the `<Image>` component**: Regular `<img>` tags bypass Next.js image optimization. Use `import Image from 'next/image'` instead.

### Broken images after upload

1. **File format**: Ensure the file is a valid image format (PNG, JPG, WebP, SVG, GIF).
2. **File name**: Avoid spaces or special characters. Use lowercase with hyphens.
3. **Cache**: If you replaced an existing file with the same name, the old version may be cached. Wait for the cache TTL to expire, or append a query parameter for cache-busting during development.

### CORS errors

Supabase Storage public buckets serve assets with permissive CORS headers by default. If you encounter CORS issues, verify the bucket's CORS configuration in the Supabase Dashboard under Storage > website-assets > Settings.
