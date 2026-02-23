# LENGOLF Website Documentation

> Next.js 15 website for LENGOLF, a premier indoor golf simulator and bar in Bangkok.
> Deployed at [https://len.golf](https://len.golf)

Last updated: 2026-02-12

---

## Documentation Index

| Document | Description | Audience |
|----------|-------------|----------|
| [Architecture](./architecture.md) | System architecture, routing, data layer, and SEO strategy | All developers |
| [Development](./development.md) | Local setup, project structure, coding conventions | New developers |
| [Supabase Storage](./supabase-storage.md) | Static asset management via Supabase Storage buckets | All developers |
| [Content Management](./content-management.md) | Managing blog posts, location pages, pricing, and coach data | Content editors, developers |
| [Deployment](./deployment.md) | Vercel deployment, environment variables, CI/CD | DevOps, developers |
| [WordPress Path Handling](./wordpress-path-handling.md) | 404 vs redirect strategy for legacy WordPress paths | Developers, SEO team |

---

## Quick Start

```bash
# 1. Clone the repository
git clone <repo-url> && cd lengolf-website

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.local.example .env.local
# Fill in Supabase URL, anon key, GTM ID

# 4. Start development server
npm run dev
# Open http://localhost:3000
```

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Database | Supabase (PostgreSQL) |
| Static Assets | Supabase Storage (`website-assets` bucket) |
| Styling | Tailwind CSS + shadcn/ui (Radix UI) |
| Forms | react-hook-form + Zod validation |
| Animations | Framer Motion |
| Icons | Lucide React, React Icons |
| Analytics | Vercel Analytics + Google Tag Manager |
| Hosting | Vercel |

---

## Project Background

This site is a complete rebuild of a WordPress installation that used Elementor page builder, 24+ plugins, and the Twenty Twenty-Four theme. The Next.js rebuild replaces all WordPress functionality with a statically generated site backed by Supabase for dynamic content (blog posts, location pages, contact form submissions) and Supabase Storage for all image and video assets.

Migration artifacts (WordPress backup, markdown exports, import scripts) are stored in the `_migration/` directory, which is excluded from git and builds.
