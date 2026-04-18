import { SITE_URL } from './constants'

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
  // KO / ZH: bespoke KoreaLandingPage / ChinaLandingPage at '/' (HomeKo / HomeZh
  // namespaces), plus /golf, /lessons, and /rent-golf-clubs-bangkok. The Golf,
  // GolfFaq, Lessons, LessonsFaq namespaces in ko.json / zh.json are now fully
  // translated. Other namespaces (Events, AboutUs, Blog, etc.) remain English
  // stubs — do not whitelist more routes until translated, or English text will
  // be served under a /ko/ or /zh/ URL and Google will flag the hreflang as
  // mismatched.
  ko: {
    staticRoutes: ['/', '/golf', '/lessons', '/rent-golf-clubs-bangkok'],
    dynamicRoutePatterns: [],
  },
  zh: {
    staticRoutes: ['/', '/golf', '/lessons', '/rent-golf-clubs-bangkok'],
    dynamicRoutePatterns: [],
  },
  // JA is broader: Home, Golf, Lessons + their FAQ namespaces translated
  // (see messages/ja.json). Expand this list only after translating the target
  // page's namespace — otherwise mixed-language content ships to Google.
  ja: {
    staticRoutes: [
      '/',
      '/golf',
      '/lessons',
      '/rent-golf-clubs-bangkok',
    ],
    dynamicRoutePatterns: [],
  },
}

export const ALL_LOCALES = ['en', 'th', 'ko', 'ja', 'zh'] as const
export type Locale = (typeof ALL_LOCALES)[number]

export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  th: 'th_TH',
  ja: 'ja_JP',
  ko: 'ko_KR',
  zh: 'zh_CN',
}

// Pre-compute normalized static routes per locale at module load time
const NORMALIZED_ROUTES = Object.fromEntries(
  Object.entries(TRANSLATED_ROUTES).map(([locale, { staticRoutes }]) => [
    locale,
    staticRoutes.map(r => (r === '/' ? '/' : r.replace(/\/$/, ''))),
  ])
)

function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, '') || '/'
}

/**
 * Check if a given pathname has a translation available for the given locale.
 * Expects a locale-free path (middleware strips /<locale> prefix before calling).
 */
export function hasTranslationForLocale(locale: string, pathname: string): boolean {
  const entry = TRANSLATED_ROUTES[locale]
  if (!entry) return false

  const normalizedPath = normalizePath(pathname)
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

/**
 * Return the set of locales (including 'en') that have a translation for this path.
 */
export function getLocalesForPath(pathname: string): Locale[] {
  const normalizedPath = normalizePath(pathname)
  // English is always available (it's the default locale, source of truth)
  const locales: Locale[] = ['en']
  for (const locale of ['th', 'ko', 'ja', 'zh'] as const) {
    if (hasTranslationForLocale(locale, normalizedPath)) {
      locales.push(locale)
    }
  }
  return locales
}

function localePrefix(locale: Locale): string {
  return locale === 'en' ? '' : `/${locale}`
}

function pathSuffix(pathname: string): string {
  const normalized = normalizePath(pathname)
  return normalized === '/' ? '/' : `${normalized}/`
}

/**
 * Build an hreflang alternates object for `Metadata.alternates.languages` and
 * `sitemap.alternates.languages`. The returned object maps each available locale
 * to its absolute URL. English is always included.
 *
 * Example: getAlternates('/golf/') →
 *   { en: 'https://www.len.golf/golf/', th: 'https://www.len.golf/th/golf/', ... }
 */
export function getAlternates(pathname: string): Record<string, string> {
  const suffix = pathSuffix(pathname)
  const locales = getLocalesForPath(pathname)
  return Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}${localePrefix(l)}${suffix}`])
  )
}

/**
 * Build the canonical URL for `pathname` in the given `locale`. Mirrors the
 * prefix scheme used by `getAlternates`.
 */
export function getCanonical(locale: string, pathname: string): string {
  const suffix = pathSuffix(pathname)
  const l: Locale = (ALL_LOCALES as readonly string[]).includes(locale) ? (locale as Locale) : 'en'
  return `${SITE_URL}${localePrefix(l)}${suffix}`
}
