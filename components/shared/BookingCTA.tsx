import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BOOKING_URL } from '@/lib/constants'

interface BookingCTAProps {
  text?: string
  size?: 'default' | 'lg'
  className?: string
}

export default function BookingCTA({ text = 'BOOK NOW', size = 'lg', className }: BookingCTAProps) {
  return (
    <Button asChild size={size} className={className}>
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        <CalendarDays className="h-4 w-4" />
        {text}
      </a>
    </Button>
  )
}
