'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: 'en' | 'th') {
    if (newLocale === locale) return
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border/60 p-0.5">
      <button
        onClick={() => switchLocale('en')}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
          locale === 'en'
            ? 'bg-primary text-white'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('th')}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
          locale === 'th'
            ? 'bg-primary text-white'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        TH
      </button>
    </div>
  )
}
