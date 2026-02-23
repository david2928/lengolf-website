'use client'

import { Link } from '@/i18n/navigation'
import { MessageCircle, Layers, User, Tag } from 'lucide-react'
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
      className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <ClubCardImageCarousel
        imageUrl={club.image_url}
        imageUrls={club.image_urls || []}
        alt={clubDesc}
      />

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {/* Brand */}
        <span className="font-bold" style={{ color: '#007429' }}>
          {clubTitle}
        </span>

        {/* Model + spec */}
        <p className="text-sm text-muted-foreground -mt-1">{clubSpec}</p>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Layers size={12} className="shrink-0 opacity-60" />
            {club.club_type}
          </span>
          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${colors.dot} shrink-0`} />
            <span className={colors.text}>{conditionLabel}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <User size={12} className="shrink-0 opacity-60" />
            {club.gender}
          </span>
          {club.shaft && (
            <span className="flex items-center gap-1.5 truncate" title={club.shaft}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60"><path d="M12 22V2"/></svg>
              {club.shaft}
            </span>
          )}
        </div>

        {/* Description */}
        {club.description && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{club.description}</p>
        )}

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/40">
          <span className="flex items-center gap-1 text-xl font-black" style={{ color: '#007429' }}>
            <Tag size={14} className="shrink-0" />
            {club.price.toLocaleString('en-US')} <span className="text-sm font-semibold">THB</span>
          </span>
          <button
            type="button"
            className="relative z-10 inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#00B900' }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); window.open(isMobile ? lineMobileUrl : lineDesktopUrl, '_blank', 'noopener,noreferrer') }}
          >
            <MessageCircle size={13} />
            {labels.enquireButton}
          </button>
        </div>
      </div>
    </Link>
  )
}
