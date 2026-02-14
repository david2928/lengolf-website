import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'th'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
})
