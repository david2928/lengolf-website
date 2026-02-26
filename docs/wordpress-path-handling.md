# WordPress Path Handling

> Documentation of 404 vs redirect strategy for WordPress paths from the previous installation, plus fixes for Google Search Console 404 errors.

Last updated: 2026-02-26

---

## Decision: Return 404 for WordPress Paths

As of 2026-02-23, the site returns proper 404 status codes for WordPress administrative and internal paths rather than redirecting them to the homepage. This includes:

- `/wp-admin/` and `/wp-admin/admin-ajax.php`
- `/wp-login.php`
- `/xmlrpc.php`
- `/wp-json/`
- `/wp-includes/`

## Rationale

### Why 404 is Correct

1. **Semantic correctness**: These paths point to resources that genuinely do not exist on this Next.js installation. A 404 is the semantically correct HTTP status code.

2. **Avoids soft-404s**: Redirecting non-existent resources to the homepage creates "soft-404s" — pages that return 200 OK but contain "not found" content. Search engines penalize soft-404s because they:
   - Waste crawl budget
   - Create duplicate content issues (many URLs showing the same homepage)
   - Signal poor site quality to search algorithms

3. **Modern crawler behavior**: Google and other modern crawlers handle 404 responses correctly and efficiently. The myth that "404s harm SEO" is outdated. Crawlers expect 404s for resources that don't exist and won't penalize the site for them.

4. **Better for SEO**: Returning proper 404s is considered a best practice in modern SEO:
   - Helps search engines understand site structure
   - Prevents index bloat
   - Signals a well-maintained site

### Previous Approach (Deprecated)

Previously, these paths redirected to the homepage with the comment "prevent infinite 404 crawl loops." However:

- Modern crawlers don't exhibit "infinite loop" behavior on 404s
- The redirects were creating more problems than they solved
- The approach was based on outdated SEO assumptions

## Implementation

### Configuration

These paths are **not** handled in `next.config.js` redirects. By omission, Next.js naturally returns 404 for them since no matching routes exist.

### Testing

The smoke test suite (`scripts/smoke-test.ts`) includes explicit 404 tests to prevent regression:

```typescript
// E) WordPress path 404 tests (prevent redirect regressions)
const notFoundTests: NotFoundTest[] = [
  { path: '/wp-admin/admin-ajax.php', label: 'WordPress admin AJAX' },
  { path: '/wp-login.php', label: 'WordPress login' },
  { path: '/xmlrpc.php', label: 'WordPress XML-RPC' },
  { path: '/wp-json/', label: 'WordPress JSON API' },
]
```

Run tests with:
```bash
npm run build && npm run start
npx tsx scripts/smoke-test.ts
```

All tests must pass before any commit that touches routing configuration.

## Related Documentation

- [Architecture: SEO Strategy](./architecture.md#seo-strategy)
- [Architecture: 404 Handling](./architecture.md#404-handling)
- [Development: Testing](./development.md#testing)

## Migration Note

This site migrated from WordPress to Next.js 15. All legitimate WordPress content URLs (blog posts, pages, uploads) are handled via 301 redirects in `next.config.js`. Only internal WordPress administrative paths return 404.

For the complete redirect strategy, see the `async redirects()` function in `next.config.js`.

---

## Google Search Console 404 Fixes

As of 2026-02-26, four additional 301 redirects were added to fix 404 errors reported in Google Search Console (GSC). These errors occurred because external sites were linking to incorrect URL patterns that existed temporarily during the WordPress-to-Next.js migration.

### Added Redirects

The following redirects were added to the `rootLocationRedirects` array in `next.config.js`:

```javascript
// Fix for GSC 404 errors: redirect root-level location pages to /location/ prefix
const rootLocationRedirects = [
  { source: '/indoor-golf-ploenchit', destination: '/location/indoor-golf-ploenchit/', permanent: true },
  { source: '/golf-near-sathorn', destination: '/location/golf-near-sathorn/', permanent: true },
  { source: '/golf-near-phrom-phong', destination: '/location/golf-near-phrom-phong/', permanent: true },
  { source: '/lesson', destination: '/lessons/', permanent: true },
]
```

### Issue Details

#### 1. Root-Level Location URLs (3 redirects)

**Problem:** External sites were linking to location pages without the `/location/` prefix:
- `/indoor-golf-ploenchit` instead of `/location/indoor-golf-ploenchit/`
- `/golf-near-sathorn` instead of `/location/golf-near-sathorn/`
- `/golf-near-phrom-phong` instead of `/location/golf-near-phrom-phong/`

**Root cause:** During the WordPress migration, these pages may have been temporarily accessible at the root level, or external sites incorrectly inferred the URL structure from sitemap/navigation patterns.

**Solution:** 301 permanent redirects from root-level URLs to the correct `/location/{slug}/` pattern.

**SEO impact:**
- Preserves link equity from external backlinks pointing to the incorrect URLs
- Prevents GSC 404 reports from affecting crawl budget and site quality signals
- Ensures consistent URL structure across all location pages

#### 2. Lesson/Lessons Typo (1 redirect)

**Problem:** External sites were linking to `/lesson` (singular) instead of `/lessons/` (plural).

**Root cause:** Common grammatical variation. The site uses `/lessons/` but some external sites naturally linked to the singular form.

**Solution:** 301 permanent redirect from `/lesson` to `/lessons/`.

**SEO impact:**
- Captures traffic from external links using the singular form
- Consolidates all lesson-related link equity to the canonical `/lessons/` URL

### Implementation Location

File: `next.config.js` (lines 79-85)

The redirects are defined in a dedicated `rootLocationRedirects` array and included in the main redirects array returned by the `async redirects()` function:

```javascript
return [
  ...blogRedirects,
  ...pageTypeRedirects,
  ...locationAreaRedirects,
  ...rootLocationRedirects,  // <-- New section added here
  // ... other redirects
]
```

### Related Documentation

- [SEO Expansion Strategy: Location Pages](./seo-expansion-strategy.md#phase-2e-new-locations-tier-34)
- [Architecture: URL Structure](./architecture.md#routing-conventions)

### Maintenance Notes

**When to add similar redirects:**
- Monitor GSC 404 reports monthly
- Add redirects for URLs with external inbound links (check "Referring page" in GSC)
- Prioritize redirects for URLs with multiple referring domains
- Use 301 (permanent) redirects for migration-related URL changes
- Use 302 (temporary) redirects only for short-term URL changes

**When NOT to add redirects:**
- URLs with no external inbound links (let them return 404)
- Spam/attack URLs in GSC reports
- URLs that never existed on any version of the site
- Random string patterns that don't match any historical URL structure
