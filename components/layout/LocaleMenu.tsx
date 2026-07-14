'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useLocale } from 'next-intl'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { getLocalesForPath, type Locale } from '@/lib/translated-routes'

/** Native-script label shown inside the menu — optimised for reader recognition. */
const NATIVE_LABEL: Record<Locale, string> = {
  en: 'English',
  th: 'ไทย',
  ja: '日本語',
  ko: '한국어',
  zh: '中文',
}

/** Short code shown on the trigger — uniform width regardless of locale. */
const TRIGGER_CODE: Record<Locale, string> = {
  en: 'EN',
  th: 'TH',
  ja: 'JA',
  ko: 'KO',
  zh: 'ZH',
}

interface Props {
  /**
   * Visual variant.
   * - `header` (default): light neutral chrome for the site header
   * - `hero`: white-on-dark-hero styling for use over photo heroes
   */
  variant?: 'header' | 'hero'
}

export default function LocaleMenu({ variant = 'header' }: Props) {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

  // Close on outside click + Escape (Esc also returns focus to trigger for a11y)
  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Only render locales that actually have a translation for the current path.
  const locales = getLocalesForPath(pathname)

  // Focus the active item when the menu opens, so screen-reader + keyboard
  // users land inside the menu without a stray Tab.
  useEffect(() => {
    if (!open) return
    const activeIdx = Math.max(0, locales.indexOf(locale))
    requestAnimationFrame(() => itemRefs.current[activeIdx]?.focus())
  }, [open, locale, locales])

  if (locales.length <= 1) return null

  function switchLocale(next: Locale) {
    setOpen(false)
    if (next === locale) return
    router.replace(pathname, { locale: next })
  }

  function onMenuKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    const items = itemRefs.current.filter(Boolean) as HTMLButtonElement[]
    if (!items.length) return
    const current = items.indexOf(document.activeElement as HTMLButtonElement)
    let next = current
    if (e.key === 'ArrowDown') next = (current + 1) % items.length
    else if (e.key === 'ArrowUp') next = (current - 1 + items.length) % items.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = items.length - 1
    else return
    e.preventDefault()
    items[next]?.focus()
  }

  const isHero = variant === 'hero'
  const triggerClass = isHero
    ? 'border border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10'
    : 'border border-border/60 bg-background text-foreground hover:bg-muted'

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change language"
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${triggerClass}`}
      >
        <Globe size={14} aria-hidden />
        <span>{TRIGGER_CODE[locale]}</span>
        <ChevronDown size={12} aria-hidden className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Select language"
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-full z-[60] mt-2 w-40 overflow-hidden rounded-lg border border-border/60 bg-white text-foreground shadow-lg"
        >
          {locales.map((l, i) => {
            const active = l === locale
            return (
              <button
                key={l}
                ref={(el) => { itemRefs.current[i] = el }}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => switchLocale(l)}
                className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors ${
                  active ? 'bg-primary/5 font-semibold text-primary' : 'hover:bg-muted'
                }`}
              >
                <span>{NATIVE_LABEL[l]}</span>
                {active && <Check size={14} aria-hidden className="text-primary" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
