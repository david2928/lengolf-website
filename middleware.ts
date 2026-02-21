import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { LEGACY_BLOG_SLUGS } from './lib/blog-slugs'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Blog routes - exclude from locale auto-detection
  // This prevents browser language from auto-redirecting /blog/* to /th/blog/*
  // The app will handle locale-specific blog posts if they exist
  if (pathname.startsWith('/blog') || pathname.startsWith('/th/blog')) {
    return NextResponse.next()
  }

  // Check if pathname matches any legacy blog slug (without trailing slash or with)
  const pathWithoutSlash = pathname.replace(/\/$/, '')
  const pathSlug = pathWithoutSlash.substring(1) // Remove leading /

  if (LEGACY_BLOG_SLUGS.includes(pathSlug as any)) {
    return NextResponse.next()
  }

  // For all other routes, use next-intl locale handling
  return intlMiddleware(request)
}

export const config = {
  // Exclude static files, assets, and known-static paths from middleware
  // to avoid unnecessary edge middleware invocations
  matcher: [
    '/((?!_next/static|_next/image|_next/data|api/|favicon\\.ico|sitemap\\.xml|robots\\.txt|images/.*|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|css|js|map)$).*)',
  ],
}
