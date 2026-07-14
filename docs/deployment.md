# Deployment

> How to deploy the LENGOLF website, configure environment variables, and manage the Vercel setup.

Last updated: 2026-02-12

---

## Table of Contents

- [Deployment Platform](#deployment-platform)
- [Environment Variables](#environment-variables)
- [Build Process](#build-process)
- [Deploying to Production](#deploying-to-production)
- [Preview Deployments](#preview-deployments)
- [Custom Domain](#custom-domain)
- [Post-Deployment Verification](#post-deployment-verification)
- [Rollback](#rollback)
- [Troubleshooting](#troubleshooting)

---

## Deployment Platform

The site is deployed on **Vercel** at [https://len.golf](https://len.golf). Vercel provides:

- Automatic deployments on git push
- Preview deployments for branches and pull requests
- Edge CDN for static assets and ISR pages
- Serverless functions for API routes
- Built-in analytics

---

## Environment Variables

### Required Variables

These must be configured in the Vercel project settings (Settings > Environment Variables) and in your local `.env.local` file for development:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public API key | `eyJhbGciOiJI...` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID | `GTM-XXXXXXX` |
| `CONTACT_EMAIL_TO` | Email recipient for contact form submissions | `info@len.golf` |

### Migration-Only Variables

These are needed only when running data import scripts locally. Do **not** add these to Vercel:

| Variable | Description |
|----------|-------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Elevated Supabase key for data imports (bypasses RLS) |

### Setting Up Local Environment

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in the values. The `.env.local.example` file contains:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GTM_ID=your_gtm_id
   CONTACT_EMAIL_TO=info@len.golf
   ```

3. Get the Supabase credentials from the [Supabase Dashboard](https://supabase.com/dashboard) under Settings > API.

### Setting Up Vercel Environment

1. Go to the Vercel project dashboard.
2. Navigate to **Settings** > **Environment Variables**.
3. Add each required variable for the **Production**, **Preview**, and **Development** environments as appropriate.
4. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Non-prefixed variables (like `CONTACT_EMAIL_TO`) are server-side only.

---

## Build Process

The build command is:

```bash
npm run build
```

This runs `next build`, which:

1. Compiles all TypeScript files.
2. Generates static HTML for all static pages.
3. Pre-renders all dynamic routes by calling `generateStaticParams()`:
   - Fetches all published blog slugs from `blog_posts`.
   - Fetches all published location slugs from `location_pages`.
   - Generates static HTML for each slug.
4. Generates `sitemap.xml` and `robots.txt`.
5. Outputs the build to `.next/`.

### Build Requirements

- Node.js (version compatible with Next.js 15)
- Network access to the Supabase API (for `generateStaticParams` during build)
- All `NEXT_PUBLIC_*` environment variables must be set at build time (they are inlined into the client bundle)

### Build Output

A successful build produces output similar to:

```
Route (app)                    Size     First Load JS
/                              ...      ...
/about-us                      ...      ...
/api/contact                   0 B      0 B
/blog                          ...      ...
/blog/[slug]                   ...      ...
/events                        ...      ...
/golf                          ...      ...
/lessons                       ...      ...
/location/[slug]               ...      ...
/privacy-policy                ...      ...
/robots.txt                    0 B      0 B
/sitemap.xml                   0 B      0 B
/terms-of-service              ...      ...
/tournaments                   ...      ...
```

---

## Deploying to Production

### Automatic Deployments

The standard workflow is git-based:

1. Push commits to the production branch (typically `main`).
2. Vercel detects the push and triggers a build.
3. If the build succeeds, the new version is deployed to production.
4. If the build fails, the previous deployment remains active.

### Manual Deployment

You can also trigger a deployment from the Vercel dashboard:

1. Go to the project in the Vercel dashboard.
2. Click **Deployments**.
3. Click **Redeploy** on any previous deployment, or push a new commit.

### Deployment via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Preview Deployments

Every branch push and pull request gets an automatic preview deployment with a unique URL. This allows you to:

- Test changes before merging to production.
- Share preview URLs with stakeholders for review.
- Verify that the build succeeds with the proposed changes.

Preview deployments use the same environment variables as production unless you configure environment-specific overrides in Vercel Settings.

---

## Custom Domain

The production site is served at `https://len.golf`. Domain configuration is managed in Vercel:

1. Go to the project in the Vercel dashboard.
2. Navigate to **Settings** > **Domains**.
3. The domain `len.golf` should be configured with appropriate DNS records pointing to Vercel.

Vercel automatically provisions and renews SSL certificates for the custom domain.

---

## Post-Deployment Verification

After a deployment, verify the following:

1. **Homepage loads**: Visit [https://len.golf](https://len.golf) and confirm the page renders correctly.
2. **Navigation works**: Click through the main navigation links (Bay Rates, Events, Lessons).
3. **Dynamic pages load**: Visit a blog post (e.g., `/blog/{slug}`) and a location page (e.g., `/location/golf-near-chidlom`).
4. **Images load**: Verify that images from Supabase Storage display correctly (check the hero images, coach photos, service cards).
5. **Contact form works**: Submit a test message via the About Us contact form and verify it appears in the `contact_submissions` table in Supabase.
6. **Sitemap**: Verify [https://len.golf/sitemap.xml](https://len.golf/sitemap.xml) is accessible and contains all expected URLs.
7. **Robots.txt**: Verify [https://len.golf/robots.txt](https://len.golf/robots.txt) is accessible.
8. **Analytics**: Check that Google Tag Manager and Vercel Analytics are firing (use browser developer tools, Network tab).

---

## Rollback

If a deployment introduces issues:

1. Go to the Vercel project dashboard.
2. Click **Deployments**.
3. Find the last known good deployment.
4. Click the three-dot menu and select **Promote to Production**.

This instantly reverts the production site to the selected deployment without requiring a git revert.

---

## Troubleshooting

### Build fails with Supabase connection error

**Symptom**: Build fails during `generateStaticParams` with a network or authentication error.

**Cause**: The Supabase environment variables are missing or incorrect in Vercel.

**Fix**:
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Vercel Settings > Environment Variables.
2. Ensure they are enabled for the **Production** environment.
3. Verify the values match what is shown in the Supabase Dashboard under Settings > API.

### Build succeeds but pages show stale content

**Symptom**: Content was updated in Supabase but the live site still shows old content.

**Cause**: ISR cache has not expired yet (1-hour revalidation window).

**Fix**:
- Wait up to 1 hour for the cache to expire naturally.
- Or trigger a redeployment to force a full rebuild with fresh data.

### Images not loading in production

**Symptom**: Images from Supabase Storage show as broken on the deployed site.

**Fix**:
1. Verify the `website-assets` bucket is set to **public** in the Supabase Dashboard.
2. Verify the image paths are correct using `storageUrl()`.
3. Check that `next.config.js` includes the Supabase hostname in `images.remotePatterns`.

### API route returning 500

**Symptom**: Contact form submissions fail with a 500 error.

**Fix**:
1. Check the Vercel function logs for the `/api/contact` route (Vercel Dashboard > Deployments > Functions).
2. Verify the Supabase environment variables are set.
3. Verify the `contact_submissions` table exists and has the expected schema.
4. Check if Row Level Security (RLS) policies on the table allow inserts with the anonymous key.

### GTM not firing

**Symptom**: Google Tag Manager events are not appearing in the console or Tag Assistant.

**Fix**:
1. Verify `NEXT_PUBLIC_GTM_ID` is set in Vercel environment variables.
2. The GTM script loads with `afterInteractive` strategy, so it will not appear until after the page has hydrated.
3. Check for ad blockers or browser extensions that may block GTM.
