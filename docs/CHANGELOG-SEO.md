# SEO Changelog

> Track SEO-related changes, fixes, and optimizations to the LENGOLF website.

---

## 2026-02-26: GSC 404 Redirect Fixes

### Summary
Added 4 new 301 redirects to `next.config.js` to fix 404 errors reported in Google Search Console.

### Changes Made

**File:** `next.config.js` (lines 79-85)

**Redirects Added:**

1. `/indoor-golf-ploenchit` → `/location/indoor-golf-ploenchit/`
2. `/golf-near-sathorn` → `/location/golf-near-sathorn/`
3. `/golf-near-phrom-phong` → `/location/golf-near-phrom-phong/`
4. `/lesson` → `/lessons/`

### Issue Context

**Location URL redirects (3):**
- External sites were linking to location pages without the `/location/` prefix
- These URLs likely existed temporarily during migration or were incorrectly inferred by external sites
- GSC reported these as 404 errors with external inbound links

**Lesson redirect (1):**
- External sites naturally linked to singular form `/lesson` vs canonical plural `/lessons/`
- Common grammatical variation causing 404s

### Impact

**SEO Benefits:**
- Preserves link equity from external backlinks pointing to incorrect URLs
- Reduces GSC 404 error count, improving site quality signals
- Maintains consistent URL structure across all location pages
- Improves crawl budget efficiency by eliminating dead-end URLs

**Technical:**
- All redirects are permanent (301) as appropriate for migration-related URL changes
- All destination URLs include trailing slashes to match `trailingSlash: true` config
- Prevents double-redirect scenarios

### Code Location

```javascript
// next.config.js lines 79-85
const rootLocationRedirects = [
  { source: '/indoor-golf-ploenchit', destination: '/location/indoor-golf-ploenchit/', permanent: true },
  { source: '/golf-near-sathorn', destination: '/location/golf-near-sathorn/', permanent: true },
  { source: '/golf-near-phrom-phong', destination: '/location/golf-near-phrom-phong/', permanent: true },
  { source: '/lesson', destination: '/lessons/', permanent: true },
]
```

### Related Documentation

- [WordPress Path Handling: GSC 404 Fixes](./wordpress-path-handling.md#google-search-console-404-fixes)
- [Architecture: Routing Conventions](./architecture.md#routing-conventions)

### Testing

Verify redirects work correctly:

```bash
# Test in production
curl -I https://www.len.golf/indoor-golf-ploenchit
curl -I https://www.len.golf/golf-near-sathorn
curl -I https://www.len.golf/golf-near-phrom-phong
curl -I https://www.len.golf/lesson

# Expected: HTTP 308 with Location header pointing to correct destination
```

### Monitoring

**Next steps:**
1. Monitor GSC for 1-2 weeks to confirm 404 count decreases
2. Check that external backlinks now resolve correctly
3. Verify no new 404 patterns emerge from similar URL structure issues

---

## Future SEO Changes

Document all future SEO-related changes here, including:
- URL structure changes
- Redirect additions/modifications
- Meta tag updates
- Schema markup additions
- Sitemap changes
- Robots.txt updates
- Canonical tag changes
- Hreflang implementations

### Template for Future Entries

```markdown
## YYYY-MM-DD: Change Title

### Summary
Brief description of the change and why it was made.

### Changes Made
List of specific files/configurations changed.

### Impact
SEO and technical impact of the changes.

### Related Documentation
Links to relevant docs.
```
