'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Wind } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getBand, AQI_BANDS, formatPollutant, formatTime, type AqiApiResponse } from '@/lib/aqi'

interface AqiWidgetProps {
  className?: string
}

export default function AqiWidget({ className }: AqiWidgetProps) {
  const t = useTranslations('Aqi')
  const locale = useLocale()
  const isTh = locale === 'th'
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
  const label = t(`label${band.key}`)
  const golfMessage = t(`golf${band.key}`)
  const healthTip = t(`health${band.key}`)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border transition-all duration-500',
        'w-full',
        'p-3 md:p-5',
        className
      )}
      style={{
        backgroundColor: band.bgColor,
        borderColor: band.borderColor,
      }}
      role="complementary"
      aria-label={`${t('header')}: ${data.aqi} — ${label}`}
    >
      {/* Decorative blob */}
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.08]"
        style={{ backgroundColor: band.accentColor }}
      />

      {/* === Mobile: compact single-row layout === */}
      <div className="md:hidden">
        <div className="flex items-center gap-3">
          {/* AQI number */}
          <span
            className="text-3xl font-bold leading-none shrink-0"
            style={{ color: band.accentColor }}
          >
            {data.aqi}
          </span>

          {/* Color bar - vertical */}
          <div className="flex flex-col gap-0.5 h-8 shrink-0">
            {AQI_BANDS.map((b) => (
              <div
                key={b.min}
                className="flex-1 w-1 rounded-full"
                style={{
                  backgroundColor: b.accentColor,
                  opacity: data.aqi >= b.min ? 1 : 0.2,
                }}
              />
            ))}
          </div>

          {/* Label + message */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Wind className="h-3 w-3 text-muted-foreground shrink-0" />
              <span
                className={cn('font-semibold', isTh ? 'text-sm' : 'text-xs')}
                style={{ color: band.accentColor }}
              >
                {label}
              </span>
            </div>
            <p className={cn('text-foreground/80 mt-0.5 leading-snug', isTh ? 'text-sm' : 'text-xs')}>
              {golfMessage}
            </p>
          </div>

          {/* Timestamp dot */}
          <div className="shrink-0 flex flex-col items-center gap-0.5">
            <div
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: band.accentColor }}
            />
            <span className={cn('text-muted-foreground whitespace-nowrap', isTh ? 'text-[11px]' : 'text-[9px]')}>
              {formatTime(data.updatedAt, locale)}
            </span>
          </div>
        </div>
      </div>

      {/* === Desktop: full layout === */}
      <div className="hidden md:block">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Wind className="h-4 w-4 text-muted-foreground" />
          <span className={cn('font-medium uppercase tracking-wider text-muted-foreground', isTh ? 'text-sm' : 'text-xs')}>
            {t('header')}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Left: AQI number + color bar */}
          <div className="shrink-0">
            <div className="flex items-baseline gap-3">
              <span
                className="text-4xl font-bold leading-none"
                style={{ color: band.accentColor }}
              >
                {data.aqi}
              </span>
              <span
                className={cn('font-semibold', isTh ? 'text-base' : 'text-sm')}
                style={{ color: band.accentColor }}
              >
                {label}
              </span>
            </div>

            {/* 5-segment color bar */}
            <div className="my-2 flex h-1.5 w-40 gap-0.5 overflow-hidden">
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
          <div className="flex-1 min-w-0">
            <p className={cn('leading-relaxed text-foreground', isTh ? 'text-base' : 'text-sm')}>
              {golfMessage}
            </p>
            <p className={cn('mt-1 text-muted-foreground leading-relaxed', isTh ? 'text-sm' : 'text-xs')}>
              {healthTip}
            </p>
            {data.dominantPollutant && (
              <span className={cn('block text-muted-foreground mt-1', isTh ? 'text-xs' : 'text-[10px]')}>
                {t('mainPollutant', { pollutant: formatPollutant(data.dominantPollutant) })}
              </span>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <div className="mt-2 flex items-center gap-1">
          <div
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: band.accentColor }}
          />
          <span className={cn('text-muted-foreground', isTh ? 'text-xs' : 'text-[10px]')}>
            {t('updated', { time: formatTime(data.updatedAt, locale) })}
          </span>
        </div>
      </div>
    </div>
  )
}

function AqiSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full rounded-xl border border-border bg-muted/30 animate-pulse',
        'p-3 md:p-5',
        className
      )}
    >
      {/* Mobile skeleton */}
      <div className="md:hidden flex items-center gap-3">
        <div className="h-8 w-10 rounded bg-muted shrink-0" />
        <div className="flex-1">
          <div className="h-3 w-20 rounded bg-muted mb-1.5" />
          <div className="h-3 w-full rounded bg-muted" />
        </div>
      </div>
      {/* Desktop skeleton */}
      <div className="hidden md:block">
        <div className="h-3 w-32 rounded bg-muted mb-4" />
        <div className="flex items-center gap-6">
          <div className="shrink-0">
            <div className="h-10 w-16 rounded bg-muted mb-2" />
            <div className="h-1.5 w-40 rounded-full bg-muted" />
          </div>
          <div className="flex-1">
            <div className="h-4 w-40 rounded bg-muted mb-2" />
            <div className="h-3 w-full rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  )
}
