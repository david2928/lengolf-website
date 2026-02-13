'use client'

import { useState, useEffect } from 'react'
import { Wind } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getBand, AQI_BANDS, formatPollutant, formatTime, type AqiApiResponse } from '@/lib/aqi'

interface AqiWidgetProps {
  className?: string
}

export default function AqiWidget({ className }: AqiWidgetProps) {
  const [data, setData] = useState<AqiApiResponse | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/aqi/')
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <AqiSkeleton className={className} />
  if (error || !data) return null

  const band = getBand(data.aqi)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-5 transition-all duration-500',
        'w-full max-w-[320px] md:max-w-none',
        className
      )}
      style={{
        backgroundColor: band.bgColor,
        borderColor: band.borderColor,
      }}
      role="complementary"
      aria-label={`Air quality near LENGOLF: ${data.aqi} — ${band.label}`}
    >
      {/* Decorative blob */}
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.08]"
        style={{ backgroundColor: band.accentColor }}
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Wind className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Air Quality Near LENGOLF
        </span>
      </div>

      {/* Main content: stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-6">
        {/* Left: AQI number + color bar */}
        <div className="md:shrink-0">
          <div className="flex items-baseline gap-3 mb-2 md:mb-0">
            <span
              className="text-4xl font-bold leading-none"
              style={{ color: band.accentColor }}
            >
              {data.aqi}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: band.accentColor }}
            >
              {band.label}
            </span>
          </div>

          {/* 5-segment color bar */}
          <div className="my-3 flex h-1.5 w-full gap-0.5 overflow-hidden md:w-40 md:my-2">
            {AQI_BANDS.map((b) => (
              <div
                key={b.min}
                className="flex-1 rounded-full"
                style={{
                  backgroundColor: b.accentColor,
                  opacity: data.aqi >= b.min ? 1 : 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: messages + meta */}
        <div className="md:flex-1 md:min-w-0">
          <p className="text-sm leading-relaxed text-foreground">
            {band.golfMessage}
          </p>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {data.healthTip || band.healthTip}
          </p>
          {data.dominantPollutant && (
            <span className="block text-[10px] text-muted-foreground mt-1">
              Main pollutant: {formatPollutant(data.dominantPollutant)}
            </span>
          )}
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-3 flex items-center gap-1 md:mt-2">
        <div
          className="h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: band.accentColor }}
        />
        <span className="text-[10px] text-muted-foreground">
          Updated {formatTime(data.updatedAt)}
        </span>
      </div>
    </div>
  )
}

function AqiSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full max-w-[320px] md:max-w-none rounded-xl border border-border bg-muted/30 p-5 animate-pulse',
        className
      )}
    >
      <div className="h-3 w-32 rounded bg-muted mb-4" />
      <div className="flex flex-col md:flex-row md:items-center md:gap-6">
        <div className="md:shrink-0">
          <div className="h-10 w-16 rounded bg-muted mb-2" />
          <div className="h-1.5 w-full md:w-40 rounded-full bg-muted mb-3" />
        </div>
        <div className="md:flex-1">
          <div className="h-4 w-40 rounded bg-muted mb-2" />
          <div className="h-3 w-full rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
