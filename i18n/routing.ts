import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'th', 'ko', 'ja', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    // Share across len.golf subdomains (booking.len.golf, www.len.golf)
    // so language selection persists between the marketing site and booking.
    domain: process.env.NODE_ENV === 'production' ? '.len.golf' : undefined,
  },
})
