'use client'

import { Link } from '@/i18n/navigation'
import { MessageCircle, Tag } from 'lucide-react'
import ClubCardImageCarousel from './ClubCardImageCarousel'
import type { UsedClub } from '@/lib/clubs'

export interface ClubCardLabels {
  enquireButton: string
  conditionExcellent: string
  conditionGood: string
  conditionFair: string
}

const conditionColors: Record<string, { dot: string; text: string }> = {
  Excellent: { dot: 'bg-green-500', text: 'text-green-700' },
  Good: { dot: 'bg-amber-400', text: 'text-amber-700' },
  Fair: { dot: 'bg-gray-400', text: 'text-gray-600' },
}

export default function ClubCard({ club, labels }: { club: UsedClub; labels: ClubCardLabels }) {
  const conditionLabel =
    club.condition === 'Excellent' ? labels.conditionExcellent :
    club.condition === 'Good' ? labels.conditionGood :
    labels.conditionFair

  const colors = conditionColors[club.condition] ?? conditionColors['Fair']

  const brandDisplay = club.brand && club.brand !== 'Other' ? club.brand : ''
  const clubTitle = `${brandDisplay}${club.model ? `${brandDisplay ? ' ' : ''}${club.model}` : ''}` || club.club_type
  const clubSpec = `${club.club_type}${club.specification ? `, ${club.specification}` : ''}`

  const clubDesc = `${clubTitle} (${clubSpec})`
  const lineMsg = encodeURIComponent(
    `Hi LENGOLF! I'm interested in the ${clubDesc} listed on your website. Is it still available?`
  )
  const lineMobileUrl = `https://line.me/R/oaMessage/%40lengolf/?${lineMsg}`
  const lineDesktopUrl = 'https://line.me/ti/p/@lengolf'

  return (
    <Link
      href={`/second-hand-golf-clubs-bangkok/${club.id}`}
      className="group flex overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm transition-shadow hover:shadow-md sm:flex-col"
    >
      {/* Image — fixed width on mobile (horizontal), full width on sm+ (vertical) */}
      <div className="w-28 shrink-0 sm:w-full">
        <ClubCardImageCarousel
          imageUrl={club.image_url}
          imageUrls={club.image_urls || []}
          alt={clubDesc}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-2.5 sm:p-4">
        {/* Title + condition */}
        <div className="flex items-start justify-between gap-1.5">
          <div className="min-w-0">
            <span className="block font-bold text-sm sm:text-base leading-tight" style={{ color: '#007429' }}>
              {clubTitle}
            </span>
            <p className="text-[11px] sm:text-sm text-muted-foreground truncate">{clubSpec}</p>
          </div>
          <span className={`inline-flex items-center gap-1 shrink-0 text-[10px] sm:text-xs font-medium ${colors.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
            {conditionLabel}
          </span>
        </div>

        {/* Gender + shaft — single line on mobile */}
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          {club.gender}{club.shaft ? ` · ${club.shaft}` : ''}
        </p>

        {/* Description — hidden on mobile */}
        {club.description && (
          <p className="hidden sm:block text-xs text-muted-foreground leading-relaxed line-clamp-2">{club.description}</p>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-border/40">
          <span className="flex items-center gap-1 text-base sm:text-xl font-black" style={{ color: '#007429' }}>
            <Tag size={12} className="shrink-0 sm:w-[14px] sm:h-[14px]" />
            {club.price.toLocaleString('en-US')} <span className="text-[10px] sm:text-sm font-semibold">THB</span>
          </span>
          <button
            type="button"
            className="relative z-10 inline-flex items-center gap-1 sm:gap-1.5 rounded-md px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#00B900' }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); window.open(isMobile ? lineMobileUrl : lineDesktopUrl, '_blank', 'noopener,noreferrer') }}
          >
            <MessageCircle size={11} className="sm:w-[13px] sm:h-[13px]" />
            {labels.enquireButton}
          </button>
        </div>
      </div>
    </Link>
  )
}
