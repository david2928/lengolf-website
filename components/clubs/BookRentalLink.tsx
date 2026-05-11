'use client'

import { ExternalLink } from 'lucide-react'
import { pushRentalIntent, type RentalIntentSource } from '@/lib/analytics'

interface BookRentalLinkProps {
  href: string
  source: RentalIntentSource
  label: string
  className?: string
  style?: React.CSSProperties
  iconSize?: number
}

/**
 * Tracked Book CTA anchor — fires the `rental_intent` dataLayer event on
 * click so Google Ads Smart Bidding sees an intermediate signal for every
 * funnel-entry click, not just the final `course_rental_confirmed`
 * conversion (which only fires for the ~10% who complete a booking).
 *
 * Navigates same-tab so the browser can pre-warm booking.len.golf during
 * the landing-page read; the cross-domain hop becomes ~free instead of a
 * cold tab.
 */
export default function BookRentalLink({
  href,
  source,
  label,
  className,
  style,
  iconSize = 18,
}: BookRentalLinkProps) {
  return (
    <a
      href={href}
      onClick={() => pushRentalIntent(source)}
      className={className}
      style={style}
    >
      <ExternalLink size={iconSize} />
      {label}
    </a>
  )
}
