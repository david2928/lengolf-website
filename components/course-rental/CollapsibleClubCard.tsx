'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import ImageLightbox from '@/components/shared/ImageLightbox'

interface CollapsibleClubCardProps {
  badge?: string
  name: string
  gender: string
  specs: string[]
  images: { src: string; alt: string }[]
  majestyCallout?: { title: string; text: string }
}

export default function CollapsibleClubCard({ badge, name, gender, specs, images, majestyCallout }: CollapsibleClubCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-primary/5 px-6 py-4 flex items-center gap-3 border-b border-primary/10">
        {badge && (
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shrink-0">
            {badge}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-xl font-bold" style={{ color: '#007429' }}>{name}</h3>
          <p className="text-sm font-semibold text-muted-foreground">{gender}</p>
        </div>
      </div>

      {/* Preview image — always visible */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 90vw, 45vw"
        />
      </div>

      {/* Expand toggle */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1.5 py-3 text-sm font-semibold text-primary hover:text-primary/80 transition-colors border-t border-primary/10"
      >
        {expanded ? 'Hide details' : 'See details'}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-primary/10 pt-4 flex flex-col gap-4">
          {majestyCallout && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">{majestyCallout.title}</p>
              <p className="text-xs text-amber-700">{majestyCallout.text}</p>
            </div>
          )}
          {images.length > 1 && (
            <ImageLightbox images={images} />
          )}
          <ul className="space-y-2">
            {specs.map((spec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007429" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
                {spec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
