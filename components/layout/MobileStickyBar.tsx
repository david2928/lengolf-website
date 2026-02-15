'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { CalendarDays } from 'lucide-react'
import { BOOKING_URL } from '@/lib/constants'

// Pages that have their own CTAs — hide the generic "Book Your Bay" bar
const HIDDEN_PATHS = ['/events', '/lessons']

export default function MobileStickyBar() {
  const [visible, setVisible] = useState(false)
  const t = useTranslations('Common')
  const pathname = usePathname()

  // Strip locale prefix (e.g. /th/events → /events)
  const cleanPath = pathname.replace(/^\/(en|th)/, '') || '/'
  const isHidden = HIDDEN_PATHS.some((p) => cleanPath.startsWith(p))

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible || isHidden) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-primary/20 bg-white/95 backdrop-blur-sm px-4 py-2.5 md:hidden">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        <CalendarDays className="h-4 w-4" />
        {t('bookYourBay')}
      </a>
    </div>
  )
}
