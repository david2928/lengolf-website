# WordPress to Next.js Migration Cutover Plan

**Project:** len.golf
**Current:** WordPress on Thai shared hosting (LiteSpeed + Cloudflare)
**Target:** Next.js 15 on Vercel + Supabase

---

## Current Infrastructure

| Component          | WordPress (Current)                                   | Next.js (Target)                        |
| ------------------ | ----------------------------------------------------- | --------------------------------------- |
| Hosting            | Thai shared host (CS LOXINFO/AWN), DirectAdmin        | Vercel                                  |
| Web Server         | LiteSpeed                                             | Vercel Edge Network                     |
| CDN                | Cloudflare (full proxy)                               | Vercel Edge (built-in)                  |
| Database           | MySQL (`lengolf1_xi3v1`)                              | Supabase (PostgreSQL)                   |
| SSL                | Cloudflare Universal + Let's Encrypt origin           | Vercel auto-provisioned (Let's Encrypt) |
| Email              | Google Workspace                                      | Google Workspace (unchanged)            |
| DNS Nameservers    | Cloudflare (`cosmin` / `pola`)                        | Cloudflare or Vercel DNS                |
| Canonical Domain   | `www.len.golf`                                        | TBD: `len.golf` or `www.len.golf`      |
| Origin Server IPs  | `27.254.86.99`, `27.254.82.179`                       | Vercel anycast IPs / CNAME              |

---

## Pre-Launch Checklist

### 1. Decide on Canonical Domain

WordPress uses `www.len.golf` as canonical. Choose one:

- **Option A: Keep `www.len.golf`** (safest for SEO continuity)
  - In Vercel: Add both `len.golf` and `www.len.golf` as domains
  - Set `www.len.golf` as primary, Vercel auto-redirects bare domain
  - Update `SITE_URL` in `lib/constants.ts` to `https://www.len.golf`

- **Option B: Switch to `len.golf`** (cleaner URL)
  - In Vercel: Add both domains, set `len.golf` as primary
  - Google will re-index with the new canonical over 2-4 weeks
  - Current `SITE_URL` already set to `https://len.golf`

**Action:** Choose an option and configure in Vercel dashboard under Settings > Domains.

---

### 2. Verify Vercel Environment Variables

Ensure all variables are set in Vercel project settings (Settings > Environment Variables):

| Variable                         | Value                          | Required For        |
| -------------------------------- | ------------------------------ | ------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`       | `https://bisimqmtxjsptehhqpeg.supabase.co` | All data fetching |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | *(from .env.local)*            | All data fetching   |
| `NEXT_PUBLIC_GTM_ID`             | `GTM-MKCHVJKW`                | Analytics/tracking  |
| `CONTACT_EMAIL_TO`               | `info@len.golf`               | Contact form emails |
| `EMAIL_HOST`                     | `mail.len.golf`               | Contact form SMTP   |
| `EMAIL_PORT`                     | `587`                         | Contact form SMTP   |
| `EMAIL_USER`                     | `notification@len.golf`       | Contact form SMTP   |
| `EMAIL_PASSWORD`                 | *(from .env.local)*            | Contact form SMTP   |

**Note:** `SUPABASE_SERVICE_ROLE_KEY` is only needed for migration scripts, not production.

---

### 3. Verify GTM Container Completeness

Log into [Google Tag Manager](https://tagmanager.google.com/) for container `GTM-MKCHVJKW` and confirm these tags fire:

- [ ] **Google Analytics 4** — Measurement ID `G-08BZ5M40SG`
- [ ] **LINE Tag** — Tag ID `858981c2-e02a-49a7-b9d9-689880407fb0`

If LINE Tag is **not** in GTM (it may be loaded as a standalone script on WordPress), add it:
1. In GTM, create a new Custom HTML tag
2. Paste the LINE Tag base code snippet
3. Set trigger: All Pages
4. Publish the GTM container

**Verify in WordPress first:** Check the WordPress source to confirm whether LINE Tag loads via GTM or as a separate script. If separate, it must be added to GTM before cutover.

---

### 4. Audit Supabase Content Quality

#### Blog Posts Meta Fields

Run this query to find posts missing SEO metadata:

```sql
SELECT title, slug,
  CASE WHEN meta_title IS NULL OR meta_title = '' THEN 'MISSING' ELSE 'OK' END AS meta_title_status,
  CASE WHEN meta_description IS NULL OR meta_description = '' THEN 'MISSING' ELSE 'OK' END AS meta_desc_status
FROM blog_posts
ORDER BY slug;
```

For any posts with `MISSING` status, populate `meta_title` and `meta_description` from the original WordPress Yoast SEO values (check the WordPress XML export at `_migration/lengolf.WordPress.2026-02-11.xml`).

#### Location Pages Schema Markup

```sql
SELECT url, h1_title,
  CASE WHEN schema_markup IS NULL THEN 'MISSING' ELSE 'OK' END AS schema_status,
  CASE WHEN meta_description IS NULL OR meta_description = '' THEN 'MISSING' ELSE 'OK' END AS meta_desc_status
FROM location_pages
WHERE status = 'published'
ORDER BY url;
```

---

### 5. Test Staging Deployment

Before DNS cutover, verify on the Vercel preview URL:

- [ ] All 9 static pages load correctly
- [ ] Blog listing shows all 27 posts
- [ ] Individual blog posts render HTML content
- [ ] All 84+ location pages render with correct data
- [ ] Contact form submits and sends email notification
- [ ] Event inquiry form works
- [ ] LINE chat widget appears
- [ ] GTM loads (check browser DevTools > Network for `gtm.js`)
- [ ] Sitemap renders at `/sitemap.xml` with trailing-slash URLs
- [ ] Robots.txt renders at `/robots.txt`
- [ ] 301 redirects work (test a few blog slugs at root level)
- [ ] Images load from Supabase Storage
- [ ] Mobile responsive layout works
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on key pages

---

## Launch Day Steps

### 6. DNS Configuration

There are two approaches depending on whether you want to keep Cloudflare or switch fully to Vercel:

#### Option A: Keep Cloudflare (recommended for easy rollback)

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/) for `len.golf`
2. Go to DNS > Records
3. Update the A records:
   - Delete existing A records pointing to `27.254.86.99` and `27.254.82.179`
   - Add a CNAME record: `len.golf` -> `cname.vercel-dns.com` (Cloudflare proxied OFF / DNS-only)
   - Add a CNAME record: `www` -> `cname.vercel-dns.com` (DNS-only)
4. **Important:** Turn OFF Cloudflare proxy (orange cloud -> grey cloud) for the Vercel CNAME records. Vercel needs direct DNS for SSL provisioning.
5. Keep MX records unchanged (Google Workspace)
6. Keep TXT records unchanged (SPF + Google verification)

#### Option B: Move DNS to Vercel

1. In Vercel: Settings > Domains > Add `len.golf`
2. Vercel will provide nameservers (e.g., `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
3. In your domain registrar, update nameservers from Cloudflare to Vercel
4. Re-add MX records in Vercel DNS for Google Workspace:
   - `ASPMX.L.GOOGLE.COM` (priority 1)
   - `ALT1.ASPMX.L.GOOGLE.COM` (priority 5)
   - `ALT2.ASPMX.L.GOOGLE.COM` (priority 5)
   - `ALT3.ASPMX.L.GOOGLE.COM` (priority 10)
   - `ALT4.ASPMX.L.GOOGLE.COM` (priority 10)
5. Re-add SPF TXT record: `v=spf1 include:_spf.google.com ~all`
6. Re-add Google site verification TXT records

**DNS propagation typically takes 15 minutes to 48 hours.** Plan for a low-traffic window.

---

### 7. SSL Certificate

Vercel auto-provisions SSL via Let's Encrypt once DNS points to their servers. No manual action needed. Verify HTTPS works after DNS propagation.

---

### 8. Email Continuity Check

After DNS change, immediately verify:

- [ ] Receiving emails at `info@len.golf` (Google Workspace still works)
- [ ] Contact form email delivery still works (SMTP via `mail.len.golf`)
- [ ] SPF record still valid (update if old hosting IPs were in SPF)

**SPF Update:** The current SPF record includes the old hosting IPs (`27.254.86.99`, `27.254.82.179`). Once those servers are decommissioned, update SPF to:
```
v=spf1 include:_spf.google.com ~all
```

If the contact form SMTP server (`mail.len.golf`) is hosted on the old Thai hosting, you will need an alternative SMTP provider. Options:
- Google Workspace SMTP relay (use existing Google account)
- A transactional email service (SendGrid, Resend, Postmark)
- Vercel-compatible email service

---

## Post-Launch Checklist (Week 1-4)

### 9. Google Search Console

- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Verify property for `len.golf` (or `www.len.golf` depending on canonical choice)
- [ ] If switching from `www` to bare domain, add both properties and set preferred
- [ ] Submit sitemap: `https://len.golf/sitemap.xml`
- [ ] Request indexing for the homepage and key pages
- [ ] Monitor **Coverage** report for 404 errors from missed redirects
- [ ] Monitor **Core Web Vitals** (Next.js should score significantly better)

### 10. Monitor Redirect Coverage

Check Search Console's **Pages** report daily for the first 2 weeks. Common missed redirects to watch for:

- Image URLs: `/wp-content/uploads/2024/...` — these redirect to `/` but external sites linking directly to images will break
- Any custom URLs from Elementor templates
- WordPress REST API endpoints bots may have cached

If new 404s appear, add redirects to `next.config.js` and redeploy.

### 11. Verify Analytics Data Flow

- [ ] Check GA4 (property `G-08BZ5M40SG`) is receiving pageview data
- [ ] Check LINE Tag is firing (verify in LINE Tag Manager dashboard)
- [ ] Check Vercel Analytics dashboard for Web Vitals scores
- [ ] Compare traffic levels in GA4 week-over-week to detect any drops

### 12. Performance Comparison

Run [PageSpeed Insights](https://pagespeed.web.dev/) on these pages and compare to pre-migration scores:

| Page         | URL               | WordPress Score | Next.js Score |
| ------------ | ----------------- | --------------- | ------------- |
| Homepage     | `/`               | ___             | ___           |
| Golf         | `/golf/`          | ___             | ___           |
| Blog listing | `/blog/`          | ___             | ___           |
| Blog post    | `/blog/{any}/`    | ___             | ___           |
| Location     | `/location/{any}/`| ___             | ___           |

### 13. Decommission WordPress

**Wait at least 2-4 weeks** after cutover before cancelling the old hosting. This gives you:

- A fallback if critical issues are discovered
- Time to identify any missed redirects from Search Console data
- A reference for content or configuration questions

When ready:
- [ ] Take a final backup of the WordPress database
- [ ] Download any remaining media from `wp-content/uploads/` not yet in Supabase Storage
- [ ] Cancel the Thai shared hosting account
- [ ] Remove old hosting IPs from SPF TXT record (if not already done)

---

## What's Already Been Implemented

These items are **done** and included in the current codebase:

- [x] 301 redirects for all 27 WordPress blog posts (`/{slug}/` -> `/blog/{slug}/`)
- [x] 301 redirects for 6 page-type taxonomy pages -> service pages
- [x] 301 redirects for 14 location-area taxonomy pages -> location pages
- [x] 301 redirects for WordPress tag, category, author, feed, and pagination archives
- [x] 301 redirects for WordPress internals (wp-admin, wp-login, wp-json, wp-content, xmlrpc)
- [x] `trailingSlash: true` in Next.js config (matches WordPress URL format)
- [x] Trailing-slash-consistent canonical URLs on blog and location pages
- [x] Trailing-slash-consistent sitemap URLs
- [x] BreadcrumbList JSON-LD on blog detail pages
- [x] WebSite + Organization JSON-LD schema (global)
- [x] EntertainmentBusiness JSON-LD schema (global)
- [x] GTM script with noscript fallback
- [x] Vercel Analytics integration
- [x] Dynamic sitemap covering all pages, blog posts, and location pages
- [x] Proper robots.txt disallowing `/api/`
- [x] Per-page metadata via `generateMetadata` on all routes

---

## Risk Summary

| Risk                              | Likelihood | Impact | Mitigation                                              |
| --------------------------------- | ---------- | ------ | ------------------------------------------------------- |
| Missed redirect (404 on old URL)  | Medium     | Medium | Monitor Search Console, add redirects as discovered     |
| Email delivery breaks             | Medium     | High   | Test SMTP immediately after DNS change, have backup plan|
| GTM/analytics gap                 | Low        | Medium | Verify GTM container pre-launch, test on staging        |
| DNS propagation delay             | Low        | Low    | Launch during low-traffic hours, TTL already low on CF  |
| SEO ranking temporary dip         | Medium     | Medium | Normal during migration, recovers in 2-4 weeks          |
| LINE Tag not firing               | Medium     | Medium | Verify in GTM or add as separate script pre-launch      |
