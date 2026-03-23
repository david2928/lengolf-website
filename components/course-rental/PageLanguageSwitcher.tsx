'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'th', label: 'TH' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
] as const

type Locale = (typeof LOCALES)[number]['code']

export default function PageLanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: Locale) {
    if (newLocale === locale) return
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            locale === code
              ? 'bg-white text-primary'
              : 'border border-white/40 text-white/80 hover:border-white hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
