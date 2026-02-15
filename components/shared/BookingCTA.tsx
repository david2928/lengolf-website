'use client'

import { useTranslations } from 'next-intl'
import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BOOKING_URL } from '@/lib/constants'

interface BookingCTAProps {
  text?: string
  size?: 'default' | 'lg'
  className?: string
}

export default function BookingCTA({ text, size = 'lg', className }: BookingCTAProps) {
  const t = useTranslations('Common')
  const label = text || t('bookNow')

  return (
    <Button asChild size={size} className={className}>
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        <CalendarDays className="h-4 w-4" />
        {label}
      </a>
    </Button>
  )
}
