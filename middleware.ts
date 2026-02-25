import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { hasThaiTranslation } from './lib/translated-routes'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isThaiPath = pathname === '/th' || pathname.startsWith('/th/')

  // Redirect untranslated Thai routes to English with 301
  if (isThaiPath) {
    const pathWithoutLocale = pathname.replace(/^\/th/, '') || '/'
    if (!hasThaiTranslation(pathWithoutLocale)) {
      const url = request.nextUrl.clone()
      url.pathname = pathWithoutLocale
      return NextResponse.redirect(url, 301)
    }
  }

  // English paths without Thai translation: rewrite to /en/... directly,
  // bypassing intlMiddleware to prevent cookie-based redirect to /th/
  if (!isThaiPath && !hasThaiTranslation(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`
    return NextResponse.rewrite(url)
  }

  return intlMiddleware(request)
}

export const config = {
  // Exclude static files, assets, and known-static paths from middleware
  // to avoid unnecessary edge middleware invocations
  matcher: [
    '/((?!_next/static|_next/image|_next/data|api/|favicon\\.ico|sitemap\\.xml|robots\\.txt|images/.*|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|css|js|map)$).*)',
  ],
}
