import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { hasThaiTranslation } from './lib/translated-routes'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if request is for Thai locale (includes bare /th without trailing slash)
  if (pathname === '/th' || pathname.startsWith('/th/')) {
    const pathWithoutLocale = pathname.replace(/^\/th/, '') || '/'

    if (!hasThaiTranslation(pathWithoutLocale)) {
      // Redirect untranslated Thai routes to English with 301
      const url = request.nextUrl.clone()
      url.pathname = pathWithoutLocale
      return NextResponse.redirect(url, 301)
    }
  } else {
    // English path — skip intlMiddleware for routes without Thai translation
    // to prevent NEXT_LOCALE cookie from redirecting back to /th/ (causes loop)
    if (!hasThaiTranslation(pathname)) {
      return NextResponse.next()
    }
  }

  // Continue with next-intl middleware for translated routes only
  return intlMiddleware(request)
}

export const config = {
  // Exclude static files, assets, and known-static paths from middleware
  // to avoid unnecessary edge middleware invocations
  matcher: [
    '/((?!_next/static|_next/image|_next/data|api/|favicon\\.ico|sitemap\\.xml|robots\\.txt|images/.*|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|css|js|map)$).*)',
  ],
}
