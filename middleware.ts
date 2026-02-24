import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { hasThaiTranslation } from './lib/translated-routes'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if request is for Thai locale (includes bare /th without trailing slash)
  if (pathname === '/th' || pathname.startsWith('/th/')) {
    // Extract the path without /th/ prefix
    const pathWithoutLocale = pathname.replace(/^\/th/, '') || '/'

    // Check if this route has Thai translation
    if (!hasThaiTranslation(pathWithoutLocale)) {
      // Redirect to English version with 301 permanent redirect
      const url = request.nextUrl.clone()
      url.pathname = pathWithoutLocale
      return NextResponse.redirect(url, 301)
    }
  }

  // Continue with next-intl middleware for translated routes
  return intlMiddleware(request)
}

export const config = {
  // Exclude static files, assets, and known-static paths from middleware
  // to avoid unnecessary edge middleware invocations
  matcher: [
    '/((?!_next/static|_next/image|_next/data|api/|favicon\\.ico|sitemap\\.xml|robots\\.txt|images/.*|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|css|js|map)$).*)',
  ],
}
