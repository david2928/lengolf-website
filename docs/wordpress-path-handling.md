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

## GSC 404 Fixes (2026-02-26)

Added 4 redirects in `next.config.js` to fix external links pointing to incorrect URL patterns:

```javascript
const rootLocationRedirects = [
  { source: '/indoor-golf-ploenchit', destination: '/location/indoor-golf-ploenchit/', permanent: true },
  { source: '/indoor-golf-ploenchit/', destination: '/location/indoor-golf-ploenchit/', permanent: true },
  { source: '/golf-near-sathorn', destination: '/location/golf-near-sathorn/', permanent: true },
  { source: '/golf-near-sathorn/', destination: '/location/golf-near-sathorn/', permanent: true },
  { source: '/golf-near-phrom-phong', destination: '/location/golf-near-phrom-phong/', permanent: true },
  { source: '/golf-near-phrom-phong/', destination: '/location/golf-near-phrom-phong/', permanent: true },
  { source: '/lesson', destination: '/lessons/', permanent: true },
  { source: '/lesson/', destination: '/lessons/', permanent: true },
]
```

Both trailing-slash variants are included to avoid 2-hop redirects with `trailingSlash: true`.
