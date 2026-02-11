# Development

> Local development setup, project structure, and coding conventions for the LENGOLF website.

Last updated: 2026-02-12

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Coding Conventions](#coding-conventions)
- [Adding a New Page](#adding-a-new-page)
- [Adding a New Component](#adding-a-new-component)
- [Adding a New UI Primitive](#adding-a-new-ui-primitive)
- [Working with Supabase](#working-with-supabase)
- [Working with Images](#working-with-images)
- [Working with Forms](#working-with-forms)
- [TypeScript Configuration](#typescript-configuration)
- [Linting](#linting)
- [Testing](#testing)

---

## Prerequisites

- **Node.js**: Version compatible with Next.js 15 (Node.js 18.17 or later)
- **npm**: Comes with Node.js
- **Git**: For version control
- **Supabase credentials**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (get from the Supabase Dashboard > Settings > API)

---

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd lengolf-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and fill in the values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   CONTACT_EMAIL_TO=info@len.golf
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open the site**: Navigate to [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server on port 3000 with hot reload |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server (requires a prior build) |
| `npm run lint` | Run ESLint on the codebase |

### Migration Scripts (one-time use)

These scripts are in `_migration/scripts/` and require the `SUPABASE_SERVICE_ROLE_KEY` environment variable:

| Command | Description |
|---------|-------------|
| `npx tsx scripts/migrate-blog-posts.ts` | Import blog posts from markdown to Supabase |
| `npx tsx scripts/import-location-pages.ts` | Import location pages from CSV to Supabase |

---

## Project Structure

```
lengolf-website/
  app/                        # Next.js App Router pages and API routes
    api/
      contact/
        route.ts              # POST endpoint for contact form submissions
    blog/
      [slug]/
        page.tsx              # Individual blog post (ISR)
      page.tsx                # Blog listing
    location/
      [slug]/
        page.tsx              # Location SEO page (ISR)
    about-us/
      page.tsx
    events/
      page.tsx
    golf/
      page.tsx
    lessons/
      page.tsx
    privacy-policy/
      page.tsx
    terms-of-service/
      page.tsx
    tournaments/
      page.tsx
    layout.tsx                # Root layout (header, footer, fonts, GTM, JSON-LD)
    globals.css               # Global CSS with Tailwind directives
    page.tsx                  # Homepage
    sitemap.ts                # Dynamic sitemap generation
    robots.ts                 # Robots.txt configuration
  components/
    layout/                   # App-wide layout components
      Header.tsx
      Footer.tsx
      LineChatWidget.tsx
    home/                     # Homepage components
      ServicesCarousel.tsx
    about/                    # About page components
      ContactForm.tsx
    events/                   # Events page components
      EventInquiryForm.tsx
    location/                 # Location page template components
      LocationPage.tsx
      GolfNearSections.tsx
      ThingsToDoSections.tsx
      IndoorGolfSections.tsx
      GolfLessonsSections.tsx
      CorporateEventsSections.tsx
      GolfClubRentalSections.tsx
    shared/                   # Reusable components
      BookingCTA.tsx
      ContactInfo.tsx
      ImageGallery.tsx
      SectionWrapper.tsx
      SocialIcons.tsx
    ui/                       # shadcn/ui primitives (Radix UI)
      accordion.tsx
      button.tsx
      card.tsx
      input.tsx
      label.tsx
      textarea.tsx
  data/                       # Static data files
    pricing.ts                # Lesson packages, services, amenities, FAQ
    coaches.ts                # Coach profiles
  lib/                        # Utility libraries
    supabase/
      client.ts               # Supabase client singleton
    blog.ts                   # Blog post data fetching
    locations.ts              # Location page data fetching and parsing
    constants.ts              # Site config, URLs, business info, storageUrl()
    jsonld.ts                 # JSON-LD structured data
    utils.ts                  # cn() helper for Tailwind class merging
  types/
    supabase.ts               # Auto-generated Supabase database types
  public/
    images/
      favicon.png             # Only local image (all others in Supabase Storage)
  _migration/                 # Migration artifacts (gitignored)
  docs/                       # Project documentation
  .env.local.example          # Environment variable template
  next.config.js              # Next.js configuration
  tailwind.config.ts          # Tailwind CSS configuration
  tsconfig.json               # TypeScript configuration
  package.json                # Dependencies and scripts
```

---

## Coding Conventions

### File and Folder Naming

- **Pages**: Use `page.tsx` inside a folder named after the route segment (e.g., `app/golf/page.tsx` for `/golf`).
- **Components**: Use PascalCase for component files (e.g., `ContactForm.tsx`, `BookingCTA.tsx`).
- **Utilities and libraries**: Use camelCase (e.g., `constants.ts`, `blog.ts`).
- **Data files**: Use camelCase (e.g., `pricing.ts`, `coaches.ts`).

### Import Paths

Always use the `@/` path alias instead of relative imports:

```typescript
// Good
import { storageUrl } from '@/lib/constants'
import { Button } from '@/components/ui/button'

// Avoid
import { storageUrl } from '../../lib/constants'
```

The `@/*` alias maps to the project root, as configured in `tsconfig.json`.

### Component Patterns

- **Server Components (default)**: Pages and layout components are server components by default in the App Router. They can be `async` and fetch data directly.
- **Client Components**: Add `'use client'` at the top of files that need interactivity (forms, animations, event handlers). Keep these minimal and push interactivity to leaf components.
- **Props interfaces**: Define props with an `interface` named `Props` in the same file.

```typescript
// Server component (default)
export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(slug)
  // ...
}

// Client component
'use client'
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // ...
}
```

### Styling

- Use Tailwind CSS utility classes for all styling.
- Use the `cn()` helper for conditional classes:
  ```typescript
  import { cn } from '@/lib/utils'
  <div className={cn('base-class', isActive && 'active-class')} />
  ```
- Reference brand colors via Tailwind tokens: `bg-primary`, `text-accent`, `bg-muted`.
- Some location page components use direct hex values (e.g., `text-[#1a472a]`) for gradient-specific styling. Prefer Tailwind tokens for new code.

### Data Fetching

- Use the Supabase client via `createClient()` from `@/lib/supabase/client`.
- Always filter by `status = 'published'` when fetching content for display.
- Wrap data fetching in dedicated helper functions in `lib/blog.ts` or `lib/locations.ts`.
- Handle errors gracefully -- return empty arrays or `null` instead of throwing.

### Images

- Always use `storageUrl()` from `@/lib/constants` to reference Supabase Storage assets.
- Use the `next/image` `<Image>` component for automatic optimization.
- Do not add new images to `public/images/`. Upload to Supabase Storage instead.

---

## Adding a New Page

### Static Page

1. Create a new folder under `app/` named after the route:
   ```
   app/new-page/page.tsx
   ```

2. Export metadata for SEO:
   ```typescript
   import type { Metadata } from 'next'

   export const metadata: Metadata = {
     title: 'Page Title',
     description: 'Page description for search engines.',
   }
   ```

3. Export the default page component:
   ```typescript
   export default function NewPage() {
     return (
       <SectionWrapper>
         <h1>Page Heading</h1>
         {/* Page content */}
       </SectionWrapper>
     )
   }
   ```

4. Add the page to the sitemap in `app/sitemap.ts` if it should be indexed:
   ```typescript
   { url: `${SITE_URL}/new-page`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
   ```

5. Add navigation links in `lib/constants.ts` if the page should appear in the header or footer navigation:
   ```typescript
   export const NAV_ITEMS = [
     // ...existing items
     { label: 'NEW PAGE', href: '/new-page' },
   ]
   ```

### Dynamic Page (ISR)

Follow the pattern in `app/blog/[slug]/page.tsx`:

1. Create the route folder: `app/new-type/[slug]/page.tsx`
2. Export `generateStaticParams` to enumerate slugs at build time.
3. Export `generateMetadata` for dynamic SEO metadata.
4. Export `revalidate = 3600` for ISR.

---

## Adding a New Component

### Page-Specific Component

1. Create a folder matching the page name under `components/`:
   ```
   components/new-page/MyComponent.tsx
   ```

2. Follow the existing pattern:
   ```typescript
   interface Props {
     title: string
     description: string
   }

   export default function MyComponent({ title, description }: Props) {
     return (
       <div className="py-12">
         <h2 className="text-2xl font-bold text-primary">{title}</h2>
         <p className="mt-4 text-muted-foreground">{description}</p>
       </div>
     )
   }
   ```

### Shared Component

Place it in `components/shared/` if it will be used across multiple pages.

### Client Component

Add `'use client'` at the top if the component needs state, effects, or event handlers.

---

## Adding a New UI Primitive

This project uses [shadcn/ui](https://ui.shadcn.com/) for base UI components. To add a new primitive:

1. Check the [shadcn/ui component library](https://ui.shadcn.com/docs/components) for available components.
2. Copy the component source into `components/ui/`.
3. The component should use Radix UI primitives, Tailwind classes, and the `cn()` helper.
4. Import from `@/components/ui/component-name`.

Existing UI primitives: `accordion`, `button`, `card`, `input`, `label`, `textarea`.

---

## Working with Supabase

### Accessing the Database

```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

// Read published blog posts
const { data, error } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('status', 'published')
  .order('published_at', { ascending: false })
```

### Supabase Types

Database types are defined in `types/supabase.ts`. If the database schema changes, regenerate types using the Supabase CLI:

```bash
npx supabase gen types typescript --project-id <project-id> > types/supabase.ts
```

Or use the Supabase MCP tool if available in your development environment to call `generate_typescript_types`.

### Adding a New Table

1. Create the table in the Supabase Dashboard or via a migration.
2. Regenerate the TypeScript types.
3. Create a data fetching helper in `lib/` following the patterns in `lib/blog.ts` or `lib/locations.ts`.

---

## Working with Images

All images are hosted in Supabase Storage. See [Supabase Storage](./supabase-storage.md) for the complete guide.

Quick reference:

```typescript
import { storageUrl } from '@/lib/constants'
import Image from 'next/image'

// In a component
<Image
  src={storageUrl('venue/venue-simulator-01.jpg')}
  alt="Simulator bay at LENGOLF"
  width={800}
  height={600}
/>
```

---

## Working with Forms

Forms use native `FormData` with `useState` for state management. Both the contact form and event inquiry form follow the same pattern:

```typescript
'use client'
import { useState } from 'react'

export default function MyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      page_source: 'my-page',
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // Handle error
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return <div>Thank you!</div>
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields using components from @/components/ui/ */}
    </form>
  )
}
```

All form submissions go to `POST /api/contact`, which inserts into the `contact_submissions` table. The `page_source` field tracks where the submission originated.

---

## TypeScript Configuration

Key settings from `tsconfig.json`:

| Setting | Value | Purpose |
|---------|-------|---------|
| `strict` | `true` | Full strict mode type checking |
| `target` | `ES2017` | Compilation target |
| `module` | `esnext` | Module system |
| `moduleResolution` | `bundler` | Resolution strategy for Next.js |
| `paths.@/*` | `./*` | Import alias for project root |
| `exclude` | `node_modules`, `_migration` | Excluded from compilation |

---

## Linting

ESLint is configured with `eslint-config-next`:

```bash
npm run lint
```

This runs Next.js-specific lint rules including checks for:
- Proper use of `next/image` instead of `<img>`
- Correct metadata exports
- Proper use of `next/link` instead of `<a>` for internal links

---

## Testing

No test framework is currently configured. If you add tests in the future, consider:

- **Vitest** or **Jest** for unit tests
- **Playwright** or **Cypress** for end-to-end tests
- **React Testing Library** for component tests

When tests are added, document the test commands in this section and add them to the CI pipeline.
