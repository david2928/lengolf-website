'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

interface StickyBookCTAProps {
  label: string
  targetId: string
}

export default function StickyBookCTA({ label, targetId }: StickyBookCTAProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the form is NOT visible
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    observer.observe(target)

    // Also hide when user hasn't scrolled past the hero
    const handleScroll = () => {
      if (window.scrollY < 300) setVisible(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [targetId])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-white/95 backdrop-blur-sm border-t border-border/40 px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={() => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}
          className="flex w-full h-11 items-center justify-center gap-2 rounded-md text-sm font-semibold text-white"
          style={{ backgroundColor: '#00B900' }}
        >
          <MessageCircle size={16} />
          {label}
        </button>
      </div>
    </div>
  )
}
