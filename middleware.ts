import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { hasThaiTranslation } from './lib/translated-routes'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect untranslated Thai routes to English with 301
  if (pathname === '/th' || pathname.startsWith('/th/')) {
    const pathWithoutLocale = pathname.replace(/^\/th/, '') || '/'

    if (!hasThaiTranslation(pathWithoutLocale)) {
      const url = request.nextUrl.clone()
      url.pathname = pathWithoutLocale
      return NextResponse.redirect(url, 301)
    }
  }

  // Always run intlMiddleware (it handles locale rewriting for [locale] param)
  const response = intlMiddleware(request)

  // Intercept: if intlMiddleware redirects to an untranslated /th/ route,
  // strip the locale cookie and re-run to prevent redirect loop
  const location = response.headers.get('location')
  if (location && response.status >= 300 && response.status < 400) {
    try {
      const redirectUrl = new URL(location, request.url)
      const redirectPath = redirectUrl.pathname
      if (redirectPath === '/th' || redirectPath.startsWith('/th/')) {
        const pathWithoutLocale = redirectPath.replace(/^\/th/, '') || '/'
        if (!hasThaiTranslation(pathWithoutLocale)) {
          // Cookie-based redirect to untranslated Thai route — block it
          request.cookies.delete('NEXT_LOCALE')
          return intlMiddleware(request)
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
  // to avoid unnecessary edge middleware invocations
  matcher: [
    '/((?!_next/static|_next/image|_next/data|api/|favicon\\.ico|sitemap\\.xml|robots\\.txt|images/.*|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|css|js|map)$).*)',
  ],
}
