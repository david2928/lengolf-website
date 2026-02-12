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
| `EMAIL_HOST`                     | `smtp.gmail.com`              | Contact form SMTP   |
| `EMAIL_PORT`                     | `587`                         | Contact form SMTP   |
| `EMAIL_USER`                     | `info@len.golf`               | Contact form SMTP   |
| `EMAIL_PASSWORD`                 | *(Google App Password)*        | Contact form SMTP   |
| `EMAIL_FROM`                     | `info@len.golf`               | Contact form SMTP   |

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

### 4. Audit Supabase Content Quality ✅ DONE

#### Blog Posts Meta Fields ✅

All 27 blog posts now have `meta_title` and `meta_description` populated. 20 posts were missing meta and have been filled in (2026-02-12).

#### Location Pages Schema Markup ✅

All 84 published location pages have `schema_markup` and `meta_description` populated. No gaps found.

---

### 5. HTML Parity Check (Content Diffing)

Google compares rendered HTML before/after migrations. If headings, internal links, or body copy differ (even subtly), Google may treat pages as "changed" rather than "moved," slowing trust transfer.

**Pick your top ~20 URLs** (homepage, golf hub, 5 blog posts, 10 location pages) and for each, compare the **rendered HTML** (not source) between WordPress and Next.js:

- [ ] Same H1 text
- [ ] Same H2/H3 hierarchy
- [ ] Same internal links + anchor text
- [ ] Same visible body copy (or intentionally improved)

**Tooling (optional but helpful):**
- `curl` + `lynx -dump`
- Chrome DevTools → "Copy outerHTML"
- SEO Minion → Compare URLs

> This is one of the biggest hidden SEO migration killers.

---

### 6. Internal Link Audit ✅ DONE

Codebase audited (2026-02-12). No internal links found pointing to old WordPress paths:

- [x] No links pointing to `/{slug}/` instead of `/blog/{slug}/`
- [x] No links to old taxonomy URLs
- [x] No links to WordPress image URLs (`/wp-content/uploads/...`)
- [x] No hardcoded `www.len.golf` references in application code (only in `next.config.js` image remotePatterns, which is intentional)
- [x] All blog post HTML content in Supabase is clean of `wp-content` references

> Still recommended: crawl staging with Screaming Frog / Sitebulb to catch any dynamically-generated 3xx internal links.

---

### 7. Image SEO Continuity

Location pages often pull image traffic. The current redirect of `/wp-content/uploads/*` to `/` is harmful for image search rankings, pages that earned backlinks via images, and featured snippets pulling images.

**Recommended approach (in priority order):**

1. **Best:** Serve legacy images at the same paths
2. **Good:** 301 each image URL to its new Supabase Storage URL (1:1 mapping)
3. **Acceptable:** 301 `/wp-content/uploads/*` to a **relevant page** (not homepage)
4. **Current (bad):** Redirecting all to `/` — causes soft 404s and loses image equity

- [ ] Audit top image URLs from backlink data / Search Console
- [ ] Implement image-specific redirects or preserve paths where possible

---

### 8. Canonical Validation at Scale

One bad template can produce hundreds of wrong canonicals.

**Crawl staging and confirm:**

- [ ] Every indexable page has exactly **one** `<link rel="canonical">`
- [ ] Each canonical points to itself (self-referencing)
- [ ] All canonicals use the correct domain + trailing slash
- [ ] No canonicals pointing to WordPress URLs, preview/staging URLs, or the non-canonical domain variant

This is especially important if switching between `www` and bare domain.

---

### 9. Crawl Budget Protection

Next.js apps can accidentally generate crawlable URL variants. Confirm that the site is **not** generating crawlable duplicates via:

- [ ] Query parameters (`?utm=`, `?ref=`, `?sort=`)
- [ ] Pagination duplicates
- [ ] Case-sensitive path variants (e.g., `/Golf/` vs `/golf/`)

If present, either canonicalize aggressively or block via `robots.txt`.

---

### 10. Backlink Spot-Check

Before launch, export top backlinks from GSC / Ahrefs and verify:

- [ ] All high-value backlinks hit URLs with explicit redirects
- [ ] No high-value link lands on the homepage via a generic catch-all redirect

This is a quick, high-leverage check.

---

### 11. Contact Form Rate Limiting ✅ DONE

Rate limiting added to `/api/contact` endpoint (2026-02-12). In-memory rate limiter: 5 requests per minute per IP, returns 429 when exceeded.

---

### 12. Test Staging Deployment

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
- [ ] Genuinely nonexistent URLs return **404 or 410** (not a redirect to homepage — soft 404s drag down trust site-wide)
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on key pages

---

## Launch Day Steps

### 13. DNS Configuration

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

### 14. SSL Certificate

Vercel auto-provisions SSL via Let's Encrypt once DNS points to their servers. No manual action needed. Verify HTTPS works after DNS propagation.

---

### 15. Email Continuity Check ✅ PARTIALLY DONE

**SMTP migrated to Gmail (2026-02-12):** Contact form now uses `smtp.gmail.com` with `info@len.golf` App Password instead of `mail.len.golf` (which pointed to old Thai hosting at `27.254.41.241`). Tested and confirmed working.

After DNS change, verify:

- [x] Contact form email delivery works via Gmail SMTP (tested 2026-02-12)
- [ ] Receiving emails at `info@len.golf` (Google Workspace — should be unaffected since MX records point to Google)
- [ ] SPF record still valid (update if old hosting IPs were in SPF)

**SPF Update:** Once old hosting is decommissioned, update SPF to:
```
v=spf1 include:_spf.google.com ~all
```

---

## Post-Launch Checklist (Week 1-4)

### 16. Google Search Console

- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Verify property for `len.golf` (or `www.len.golf` depending on canonical choice)
- [ ] If switching from `www` to bare domain, add both properties and set preferred
- [ ] Submit sitemap: `https://len.golf/sitemap.xml`
- [ ] **On launch day**, use URL Inspection to request indexing for a targeted set (do **not** spam requests for everything — Google uses these as signals, not a queue):
  - Homepage
  - Main category/hub page (`/golf/`)
  - 1-2 representative blog posts
  - 1 representative location page
- [ ] Monitor **Coverage** report for 404 errors from missed redirects
- [ ] Monitor **Core Web Vitals** (Next.js should score significantly better)

### 17. Monitor Redirect Coverage

Check Search Console's **Pages** report daily for the first 2 weeks. Common missed redirects to watch for:

- Image URLs: `/wp-content/uploads/2024/...` — these redirect to `/` but external sites linking directly to images will break
- Any custom URLs from Elementor templates
- WordPress REST API endpoints bots may have cached

If new 404s appear, add redirects to `next.config.js` and redeploy.

### 18. Verify Analytics Data Flow

- [ ] Check GA4 (property `G-08BZ5M40SG`) is receiving pageview data
- [ ] Check LINE Tag is firing (verify in LINE Tag Manager dashboard)
- [ ] Check Vercel Analytics dashboard for Web Vitals scores
- [ ] Compare traffic levels in GA4 week-over-week to detect any drops

### 19. Performance Comparison

Run [PageSpeed Insights](https://pagespeed.web.dev/) on these pages and compare to pre-migration scores:

| Page         | URL               | WordPress Score | Next.js Score |
| ------------ | ----------------- | --------------- | ------------- |
| Homepage     | `/`               | ___             | ___           |
| Golf         | `/golf/`          | ___             | ___           |
| Blog listing | `/blog/`          | ___             | ___           |
| Blog post    | `/blog/{any}/`    | ___             | ___           |
| Location     | `/location/{any}/`| ___             | ___           |

### 20. Log Retention (Post-Cutover)

Keep old server logs (or Cloudflare logs) for at least 30 days post-cutover. They are invaluable for:

- Discovering URLs bots still hit
- Finding missed redirects **before** GSC reports them (GSC can lag days/weeks)

---

### 21. Hreflang Consideration

If you ever plan to add Thai/English language variants or locale targeting, ensure you are:

- [ ] **Not** accidentally emitting `hreflang` tags now
- [ ] Aware this will need to be implemented if multilingual support is added later

Not a blocker — just flagging for future awareness.

---

### 22. Decommission WordPress

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
- [x] All 27 blog posts have `meta_title` and `meta_description` populated
- [x] All 84 published location pages have `schema_markup` and `meta_description`
- [x] Internal link audit — no old WordPress paths in codebase
- [x] Contact form rate limiting (5 req/min per IP, 429 response)
- [x] SMTP migrated from old hosting (`mail.len.golf`) to Gmail (`smtp.gmail.com` via `info@len.golf` App Password)
- [x] Proper 404 page (`not-found.tsx`) returns real 404 status for nonexistent URLs

---

## Risk Summary

| Risk                              | Likelihood | Impact | Mitigation                                              |
| --------------------------------- | ---------- | ------ | ------------------------------------------------------- |
| Missed redirect (404 on old URL)  | Medium     | Medium | Monitor Search Console, add redirects as discovered     |
| ~~Email delivery breaks~~         | ~~Medium~~ | ~~High~~| ✅ Migrated to Gmail SMTP — no longer depends on old hosting |
| GTM/analytics gap                 | Low        | Medium | Verify GTM container pre-launch, test on staging        |
| DNS propagation delay             | Low        | Low    | Launch during low-traffic hours, TTL already low on CF  |
| SEO ranking temporary dip         | Medium     | Medium | Normal during migration, recovers in 2-4 weeks          |
| LINE Tag not firing               | Medium     | Medium | Verify in GTM or add as separate script pre-launch      |
| HTML parity drift (content diff)  | Medium     | High   | Diff top 20 pages pre-launch (headings, links, copy)    |
| Internal links through redirects  | Medium     | Medium | Crawl staging, fix all internal 3xx links in codebase   |
| Image SEO equity loss             | High       | Medium | Map image URLs 1:1 instead of redirecting all to `/`    |
| Wrong/duplicate canonicals        | Low        | High   | Crawl staging, validate every page has one self-canonical|
| Soft 404s from catch-all redirects| Medium     | Medium | Return true 404/410 for nonexistent URLs, not homepage  |
| Crawl budget waste (URL variants) | Low        | Low    | Audit for query param / case variants, canonicalize      |
| ~~Contact form bot abuse~~        | ~~Medium~~ | ~~Medium~~ | ✅ Rate limiting added (5 req/min per IP)            |
