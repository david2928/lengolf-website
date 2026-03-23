import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { hasTranslationForLocale } from './lib/translated-routes'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

const LOCALE_PREFIXES = ['th', 'ko', 'ja', 'zh'] as const

// Root-level legacy paths that next.config.js redirects can't catch because
// intlMiddleware intercepts them first (localePrefix: 'as-needed').
// Must be kept in sync with rootLocationRedirects in next.config.js.
const ROOT_LOCATION_REDIRECTS: Record<string, string> = {
  '/golf-near-thong-lo': '/location/golf-near-thong-lo/',
  '/golf-near-thong-lo/': '/location/golf-near-thong-lo/',
  '/golf-near-silom': '/location/golf-near-silom/',
  '/golf-near-silom/': '/location/golf-near-silom/',
  '/golf-near-sukhumvit': '/location/golf-near-sukhumvit/',
  '/golf-near-sukhumvit/': '/location/golf-near-sukhumvit/',
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle root-level location redirects before intlMiddleware can intercept
  if (pathname in ROOT_LOCATION_REDIRECTS) {
    const url = request.nextUrl.clone()
    url.pathname = ROOT_LOCATION_REDIRECTS[pathname]
    return NextResponse.redirect(url, 308)
  }

  // Redirect untranslated locale routes to English with 301
  for (const locale of LOCALE_PREFIXES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/'

      if (!hasTranslationForLocale(locale, pathWithoutLocale)) {
        const url = request.nextUrl.clone()
        url.pathname = pathWithoutLocale
        return NextResponse.redirect(url, 301)
      }
      break
    }
  }

  // Always run intlMiddleware (it handles locale rewriting for [locale] param)
  const response = intlMiddleware(request)

  // Intercept: if intlMiddleware redirects to an untranslated locale route,
  // strip the locale cookie and re-run to prevent redirect loop
  const location = response.headers.get('location')
  if (location && response.status >= 300 && response.status < 400) {
    try {
      const redirectUrl = new URL(location, request.url)
      const redirectPath = redirectUrl.pathname

      for (const locale of LOCALE_PREFIXES) {
        if (redirectPath === `/${locale}` || redirectPath.startsWith(`/${locale}/`)) {
          const pathWithoutLocale = redirectPath.replace(new RegExp(`^/${locale}`), '') || '/'
          if (!hasTranslationForLocale(locale, pathWithoutLocale)) {
            request.cookies.delete('NEXT_LOCALE')
            return intlMiddleware(request)
          }
          break
        }
      }
    } catch {
      // Malformed location header — let original response through
    }
  }

  return response
}

export const config = {
  // Exclude static files, assets, and known-static paths from middleware
  matcher: [
    '/((?!_next/static|_next/image|_next/data|api/|favicon\\.ico|sitemap\\.xml|robots\\.txt|images/.*|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|css|js|map)$).*)',
  ],
}
