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
  dynamicRoutePatterns: [] as string[],
} as const

/**
 * Check if a given pathname has a Thai translation available
 */
export function hasThaiTranslation(pathname: string): boolean {
  // Normalize: remove /th/ prefix if present and trailing slashes
  const normalizedPath = pathname
    .replace(/^\/th/, '')
    .replace(/\/$/, '') || '/'

  // Check static routes
  const normalizedStaticRoutes = THAI_TRANSLATED_ROUTES.staticRoutes.map(r =>
    r === '/' ? '/' : r.replace(/\/$/, '')
  )

  if (normalizedStaticRoutes.includes(normalizedPath)) {
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
