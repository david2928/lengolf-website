'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { getLocalesForPath, type Locale } from '@/lib/translated-routes'

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  th: 'TH',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
}

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  // Only offer locales that actually have a translation for this path.
  // getLocalesForPath always includes 'en' and returns ['en', 'th', ...] for
  // whitelisted routes in lib/translated-routes.ts. On English-only pages
  // (privacy-policy, activities hub etc.) this returns just ['en'], and we
  // hide the switcher entirely.
  const locales = getLocalesForPath(pathname)

  if (locales.length <= 1) return null

  function switchLocale(newLocale: Locale) {
    if (newLocale === locale) return
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border/60 p-0.5">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            locale === l
              ? 'bg-primary text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  )
}
