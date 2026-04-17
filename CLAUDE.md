# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LENGOLF website — a Next.js 15 (App Router) site for an indoor golf simulator facility in Bangkok (The Mercury Ville @ BTS Chidlom). Supabase-backed with static/ISR rendering, deployed on Vercel at https://len.golf. Originally migrated from WordPress.

## Commands

- **Dev server:** `npm run dev` (http://localhost:3000)
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint`
- **Smoke tests:** `npm run test:smoke` (requires a running server on localhost:3000)
- **Migrate blog posts:** `npx tsx scripts/migrate-blog-posts.ts` (one-time migration, already run)
- **Import location pages:** `npx tsx scripts/import-location-pages.ts` (one-time migration, already run)

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every PR to `main`:

- **`lint`** — `npm run lint` with ESLint flat config (`eslint.config.mjs`)
- **`build-and-smoke`** — builds the app, starts the production server, runs smoke tests across 7 categories:
  - **A) Route tests (46)** — all EN + TH pages return 200 with `<main id="main-content">`
  - **B) Redirect tests (21)** — WordPress legacy URLs, GSC 404 fixes, and location redirects
  - **C) Link checks (4)** — booking.len.golf, LINE, Supabase Storage assets are reachable
  - **D) SEO checks (8)** — title, meta description, canonical (www.len.golf), JSON-LD, `lang` attribute
  - **E) Thai redirect tests (2)** — untranslated Thai routes redirect to English
  - **F) Thai cookie tests (7)** — English pages work with NEXT_LOCALE=th cookie
  - **G) WordPress 404 tests (7)** — legacy WordPress paths return 404 (prevent redirect regressions)

Both jobs are **required checks** via branch protection — PRs cannot merge if either fails.

**Manual trigger:** `gh workflow run ci.yml --ref main`

**GitHub Secrets required:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (already configured)

**Key files:**
- `.github/workflows/ci.yml` — workflow definition
- `scripts/smoke-test.ts` — smoke test script (zero deps beyond tsx + Node.js fetch)
- `eslint.config.mjs` — ESLint flat config (next/core-web-vitals)

**Adding new routes:** When adding a new page, add it to `routeTests` in `scripts/smoke-test.ts` to ensure CI validates it.

## Migration Notes

Migrated from WordPress (Elementor + 24 plugins). All migration artifacts live in `_migration/` (gitignored). Migration scripts in `scripts/` are one-time utilities that have already been run. The site has 16 pages, 24 blog posts, and 101 location pages (7 template types across ~15 Bangkok neighborhoods).

## Architecture

### Routing (App Router)

- `app/[locale]/` — Next.js App Router pages with i18n support (EN/TH)
- Core pages: `/golf`, `/events`, `/lessons`, `/about-us`, `/privacy-policy`, `/terms-of-service`
- Content pages: `/golf-club-rental`, `/golf-course-club-rental`, `/activities`, `/cost`, `/faq`, `/guide`, `/hotels`, `/second-hand-golf-clubs-bangkok`
- Dynamic routes: `/blog/[slug]`, `/location/[slug]` — use `generateStaticParams` + ISR (revalidate: 3600s)
- API routes: `app/api/contact/route.ts` (POST — contact form), `app/api/aqi/route.ts` (air quality)

### Components

- `components/layout/` — Header, Footer, LineChatWidget
- `components/home/`, `components/about/`, `components/events/`, `components/location/` — core page components
- `components/activities/`, `components/blog/`, `components/clubs/`, `components/faq/`, `components/guides/`, `components/hotels/`, `components/prices/` — content page components
- `components/shared/` — reusable components (BookingCTA, ContactInfo, ImageGallery, SectionWrapper, SocialIcons)
- `components/ui/` — shadcn/ui primitives (Radix UI + Tailwind)

### Data Layer

- **Supabase** is the sole database (PostgreSQL). Client initialized in `lib/supabase/client.ts` with anonymous key (no auth, `persistSession: false`).
- **Supabase Storage** hosts all static assets (images, videos) in the `website-assets` public bucket. Assets are organized into folders: `branding/`, `venue/`, `golf/`, `events/`, `lessons/`, `tournaments/`, `menus/`, `icons/`, `promotions/`, `videos/`. Use `storageUrl('folder/file.ext')` from `lib/constants.ts` to generate URLs. Only `favicon.png` remains in `public/images/`.
- Three tables: `blog_posts`, `contact_submissions`, `location_pages` (types in `types/supabase.ts`)
- Data fetching helpers: `lib/blog.ts`, `lib/locations.ts`
- Static data: `data/pricing.ts`, `data/coaches.ts`, `data/faq-pages.ts`, `data/hotel-pages.ts`, `data/explainer-pages.ts`, `data/price-guide-pages.ts`, `data/activity-occasions.ts`, `data/event-clients.ts`
- Location pages have rich schema: template_type, distance/transit metrics, area descriptions, SEO content, JSON-LD schema_markup

### Styling

- Tailwind CSS with custom theme in `tailwind.config.ts`
- Brand colors: primary green `#005a32`, accent gold `#c8a96e`, secondary dark `#1a1a1a`
- Font: Poppins (loaded via next/font)

### Key Utilities

- `lib/constants.ts` — site name, URLs, business info, navigation items, `storageUrl()` helper
- `lib/jsonld.ts` — JSON-LD structured data (LocalBusiness schema)
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Forms

- react-hook-form + Zod for validation
- Contact form (`components/about/ContactForm.tsx`) and event inquiry form (`components/events/EventInquiryForm.tsx`)

### SEO

- Dynamic metadata via `generateMetadata` on each page
- `app/sitemap.ts` and `app/robots.ts` for search engine configuration
- Google Tag Manager via `NEXT_PUBLIC_GTM_ID`
- Location pages include per-page JSON-LD schema markup

## Environment Variables

Required in `.env.local` (see `.env.local.example`):
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase connection
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager
- `CONTACT_EMAIL_TO` — Contact form recipient

For migration scripts only:
- `SUPABASE_SERVICE_ROLE_KEY` — elevated access for data imports

## Path Alias

`@/*` maps to project root (e.g., `@/components/ui/button`).

## Migration Archive

All migration artifacts live in `_migration/` (gitignored, excluded from builds). Contains WordPress backup, markdown exports, import scripts, and SEO planning docs.

---

## 🔒 Supabase Security — Non-Negotiable Rules

The shared Lengolf Supabase was hardened after a security audit. Don't regress it.

### The single most important rule

**This project has ZERO legitimate browser-anon Supabase usage.** Every
database read (blog, clubs, locations, promotions, Google reviews, contact
form) happens server-side via `lib/supabase/client.ts`, which uses
`SUPABASE_SERVICE_ROLE_KEY` and is marked `import 'server-only'`.

**Never change the env var back to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.** The
server-side anon grants the old factory depended on have been revoked
project-wide, so reverting would break every page on len.golf that shows
data from the DB.

### Type-only imports from client components are fine

```ts
import type { UsedClub } from '@/lib/clubs'  // OK — erased at build time
```
**Runtime** imports from a `'use client'` component will fail the build
via `server-only`. Keep it that way.

### If you ever think you need browser-side Supabase access

Stop and ask. The current static-marketing-site design doesn't need it.
If there's a real interactive use case, prefer a server component that
fetches at request time, or a new API route using the existing factory.

### Hard red flags — stop and reconsider

- A `'use client'` component with a runtime `import { createClient } from '@/lib/supabase/client'`
- Any inline `createClient(..., process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)`
- A new Supabase factory file missing `import 'server-only'` at the top
- Any migration in the shared Lengolf DB that does `GRANT ALL ... TO anon` on the public or backoffice schemas

### Reference

Full plan + history: `~/.claude/plans/humming-singing-candy.md`
