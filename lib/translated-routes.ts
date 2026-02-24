/**
 * Registry of routes that have Thai translations.
 * Routes NOT in this list will redirect from /th/* to English equivalent.
 */
export const THAI_TRANSLATED_ROUTES = {
  // Static routes with Thai translations (from sitemap.ts analysis)
  staticRoutes: [
    '/',
    '/golf',
    '/events',
    '/golf-club-rental',
    '/lessons',
    '/about-us',
    '/blog',
  ],

  // Dynamic route patterns with Thai translations
  // Empty for now - all dynamic routes are English-only
  dynamicRoutePatterns: [] as readonly string[],
} as const

// Pre-compute normalized static routes at module load time for performance
const NORMALIZED_STATIC_ROUTES = THAI_TRANSLATED_ROUTES.staticRoutes.map(r =>
  r === '/' ? '/' : r.replace(/\/$/, '')
)

/**
 * Check if a given pathname has a Thai translation available.
 * Expects a locale-free path (middleware strips /th prefix before calling).
 */
export function hasThaiTranslation(pathname: string): boolean {
  const normalizedPath = pathname.replace(/\/$/, '') || '/'

  // Check static routes
  if (NORMALIZED_STATIC_ROUTES.includes(normalizedPath)) {
    return true
  }

  // Check dynamic route patterns (for future use when Thai content exists)
  for (const pattern of THAI_TRANSLATED_ROUTES.dynamicRoutePatterns) {
    const regex = new RegExp('^' + pattern.replace(/\[slug\]/g, '[^/]+') + '$')
    if (regex.test(normalizedPath)) {
      return true
    }
  }

  return false
}
