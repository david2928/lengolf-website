/**
 * Registry of routes that have translations per locale.
 * Routes NOT in this list will redirect from /<locale>/* to the English equivalent.
 */
const TRANSLATED_ROUTES: Record<string, { staticRoutes: readonly string[]; dynamicRoutePatterns: readonly string[] }> = {
  th: {
    staticRoutes: [
      '/',
      '/golf',
      '/events',
      '/golf-club-rental',
      '/golf-course-club-rental',
      '/lessons',
      '/about-us',
      '/blog',
      '/rent-golf-clubs-bangkok',
    ],
    dynamicRoutePatterns: [],
  },
  ko: {
    staticRoutes: ['/rent-golf-clubs-bangkok'],
    dynamicRoutePatterns: [],
  },
  ja: {
    staticRoutes: ['/rent-golf-clubs-bangkok'],
    dynamicRoutePatterns: [],
  },
  zh: {
    staticRoutes: ['/rent-golf-clubs-bangkok'],
    dynamicRoutePatterns: [],
  },
}

// Pre-compute normalized static routes per locale at module load time
const NORMALIZED_ROUTES = Object.fromEntries(
  Object.entries(TRANSLATED_ROUTES).map(([locale, { staticRoutes }]) => [
    locale,
    staticRoutes.map(r => (r === '/' ? '/' : r.replace(/\/$/, ''))),
  ])
)

/**
 * Check if a given pathname has a translation available for the given locale.
 * Expects a locale-free path (middleware strips /<locale> prefix before calling).
 */
export function hasTranslationForLocale(locale: string, pathname: string): boolean {
  const entry = TRANSLATED_ROUTES[locale]
  if (!entry) return false

  const normalizedPath = pathname.replace(/\/$/, '') || '/'
  const normalizedStatic = NORMALIZED_ROUTES[locale] ?? []

  if (normalizedStatic.includes(normalizedPath)) return true

  for (const pattern of entry.dynamicRoutePatterns) {
    const regex = new RegExp('^' + pattern.replace(/\[slug\]/g, '[^/]+') + '$')
    if (regex.test(normalizedPath)) return true
  }

  return false
}

/**
 * @deprecated Use hasTranslationForLocale('th', pathname) instead.
 */
export function hasThaiTranslation(pathname: string): boolean {
  return hasTranslationForLocale('th', pathname)
}
