'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Clock, Flag, X, ExternalLink } from 'lucide-react'
import type { GolfCourse } from '@/types/golf-courses'

interface Props {
  courses: GolfCourse[]
  region: string
}

function formatFee(n: number | null): string | null {
  if (n === null) return null
  return n.toLocaleString('en-US') + ' THB'
}

const REGION_CENTER: Record<string, { lat: number; lng: number; zoom: number }> = {
  'bangkok':           { lat: 13.750, lng: 100.52, zoom: 10 },
  'pattaya':           { lat: 12.985, lng: 100.94, zoom: 11 },
  'hua-hin':           { lat: 12.570, lng:  99.96, zoom: 11 },
  'phuket':            { lat:  7.980, lng:  98.33, zoom: 11 },
  'khao-yai':          { lat: 14.550, lng: 101.55, zoom: 10 },
  'kanchanaburi':      { lat: 14.100, lng:  99.20, zoom: 10 },
  'chiang-mai':        { lat: 18.800, lng:  98.97, zoom: 11 },
  'isan':              { lat: 16.400, lng: 102.80, zoom:  9 },
  'southern-thailand': { lat:  7.200, lng: 100.50, zoom: 10 },
  'koh-samui':         { lat:  9.300, lng:  99.50, zoom: 10 },
  'chiang-rai':        { lat: 19.950, lng:  99.85, zoom: 11 },
  'north-misc':        { lat: 18.300, lng:  99.50, zoom: 11 },
  'khao-lak':          { lat:  8.600, lng:  98.25, zoom: 12 },
  'krabi':             { lat:  8.100, lng:  98.90, zoom: 12 },
}

// Window-level promise so the script loads exactly once across all components/remounts
function loadMapsApi(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  const w = window as any
  if (w.google?.maps?.Map) return Promise.resolve()
  if (w.__mapsApiPromise) return w.__mapsApiPromise
  w.__mapsApiPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=weekly`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => { delete w.__mapsApiPromise; reject(new Error('Maps JS API failed to load')) }
    document.head.appendChild(script)
  })
  return w.__mapsApiPromise
}

function makePin(index: number, active: boolean): HTMLDivElement {
  const el = document.createElement('div')
  el.style.cssText = [
    'width:28px;height:28px;border-radius:50%;',
    `background:${active ? '#c8a96e' : '#003d22'};`,
    `color:${active ? '#1a1a1a' : '#fff'};`,
    'display:flex;align-items:center;justify-content:center;',
    'font-size:11px;font-weight:900;',
    'cursor:pointer;',
    'box-shadow:0 2px 6px rgba(0,0,0,.45);',
    'border:2px solid #fff;',
    `transform:${active ? 'scale(1.3)' : 'scale(1)'};`,
    'transition:transform .15s,background .15s;',
  ].join('')
  el.textContent = String(index + 1)
  return el
}

export default function CourseMapExplorer({ courses, region }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const activeCourse = courses.find((c) => c.slug === activeSlug) ?? null

  const mapDivRef  = useRef<HTMLDivElement>(null)
  const mapRef     = useRef<any>(null)
  const markersRef = useRef<{ marker: any; pin: HTMLDivElement; slug: string }[]>([])

  const handleListRow = useCallback((slug: string) => {
    setActiveSlug((prev) => (prev === slug ? null : slug))
  }, [])

  // ── Load map + place markers ──────────────────────────────────────────────
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY
    if (!apiKey || !mapDivRef.current) return
    let cancelled = false

    loadMapsApi(apiKey).then(() => {
      if (cancelled || !mapDivRef.current) return
          const gmaps = (window as any).google.maps
      const center = REGION_CENTER[region] ?? { lat: 13.0, lng: 100.5, zoom: 10 }

      const map = new gmaps.Map(mapDivRef.current, {
        center:              { lat: center.lat, lng: center.lng },
        zoom:                center.zoom,
        mapId:               'DEMO_MAP_ID',
        zoomControl:         true,
        streetViewControl:   false,
        mapTypeControl:      false,
        fullscreenControl:   false,
      })
      mapRef.current = map

      const bounds = new gmaps.LatLngBounds()

      markersRef.current = courses
        .map((course, i) => {
          if (!course.latitude || !course.longitude) return null
          const pin = makePin(i, false)
          const position = { lat: course.latitude, lng: course.longitude }
          const marker = new gmaps.marker.AdvancedMarkerElement({
            map,
            position,
            content:  pin,
            title:    course.name,
          })
          marker.addListener('gmp-click', () =>
            setActiveSlug((prev) => (prev === course.slug ? null : course.slug))
          )
          bounds.extend(position)
          return { marker, pin, slug: course.slug }
        })
        .filter(Boolean) as { marker: unknown; pin: HTMLDivElement; slug: string }[]

      // Fit all markers into view (with a small padding)
      if (!bounds.isEmpty()) map.fitBounds(bounds, 48)
    }).catch(console.error)

    return () => {
      cancelled = true
      markersRef.current.forEach(({ marker }) => {
              ;(marker as any).map = null
      })
      markersRef.current = []
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]) // re-init only if region changes; courses are stable per page

  // ── Sync marker styles + pan map when active slug changes ─────────────────
  useEffect(() => {
    markersRef.current.forEach(({ pin, slug }, i) => {
      const active = slug === activeSlug
      pin.style.background = active ? '#c8a96e' : '#003d22'
      pin.style.color       = active ? '#1a1a1a' : '#fff'
      pin.style.transform   = active ? 'scale(1.3)' : 'scale(1)'
    })

    const map = mapRef.current
    if (!map) return

    if (activeSlug) {
      const course = courses.find((c) => c.slug === activeSlug)
      if (course?.latitude && course?.longitude) {
        map.panTo({ lat: course.latitude, lng: course.longitude })
        map.setZoom(13)
      }
    } else {
      const center = REGION_CENTER[region] ?? { lat: 13.0, lng: 100.5, zoom: 10 }
      map.panTo({ lat: center.lat, lng: center.lng })
      map.setZoom(center.zoom)
    }
  }, [activeSlug, courses, region])

  const activeMapsUrl = activeCourse?.google_maps_url
    ?? (activeCourse?.latitude && activeCourse?.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${activeCourse.latitude},${activeCourse.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          [activeCourse?.name, activeCourse?.province].filter(Boolean).join(' ')
        )}`)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">

      {/* ── Map + detail panel ── */}
      <div
        id="course-map"
        className="relative mb-0 overflow-hidden rounded-3xl border border-[#003d22]/15 shadow-xl"
      >
        <div className="flex flex-col lg:flex-row">

          {/* Google Maps JS div */}
          <div className="relative flex-1" style={{ minHeight: 420 }}>
            <div
              ref={mapDivRef}
              style={{ width: '100%', height: '100%', minHeight: 420, display: 'block' }}
            />
          </div>

          {/* Info panel — slides in when a course is selected */}
          <div
            className={[
              'transition-all duration-300',
              activeCourse
                ? 'w-full border-t border-[#003d22]/10 bg-white lg:w-80 lg:border-l lg:border-t-0'
                : 'w-0 overflow-hidden',
            ].join(' ')}
          >
            {activeCourse && (
              <div className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div>
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-[#c8a96e]">
                      {activeCourse.province}
                    </p>
                    <h3 className="text-base font-black leading-snug text-[#003d22]">
                      {activeCourse.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveSlug(null)}
                    className="mt-0.5 shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
                    aria-label="Close"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-2">
                  {activeCourse.holes && (
                    <div className="rounded-xl bg-[#f0f7f2] px-3 py-2.5">
                      <p className="text-xs font-bold text-[#003d22]">{activeCourse.holes} holes</p>
                      <p className="text-[10px] text-muted-foreground">Par {activeCourse.par}</p>
                    </div>
                  )}
                  {activeCourse.drive_time_from_bangkok_min && (
                    <div className="rounded-xl bg-[#f0f7f2] px-3 py-2.5">
                      <p className="text-xs font-bold text-[#003d22]">~{activeCourse.drive_time_from_bangkok_min} min</p>
                      <p className="text-[10px] text-muted-foreground">from Bangkok</p>
                    </div>
                  )}
                </div>

                {(activeCourse.green_fee_weekday_thb || activeCourse.green_fee_weekend_thb) && (
                  <div className="mb-4 space-y-2 rounded-xl border border-[#003d22]/10 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Green Fees</p>
                    {activeCourse.green_fee_weekday_thb && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Weekday</span>
                        <span className="text-xs font-bold text-foreground">{formatFee(activeCourse.green_fee_weekday_thb)}</span>
                      </div>
                    )}
                    {activeCourse.green_fee_weekend_thb && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Weekend</span>
                        <span className="text-xs font-bold text-foreground">{formatFee(activeCourse.green_fee_weekend_thb)}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-2">
                  <Link
                    href={`/golf-courses/${region}/${activeCourse.slug}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#003d22] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#005a32]"
                  >
                    Full course guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={activeMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#003d22]/20 px-4 py-2.5 text-xs font-semibold text-[#003d22] transition-all hover:bg-[#f0f7f2]"
                  >
                    Open in Google Maps <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Course roster ── */}
      <div className="mt-2 overflow-hidden rounded-3xl border border-[#003d22]/10 bg-white shadow-sm">
        <div className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-[#003d22]/10 bg-[#003d22] px-5 py-3 sm:grid-cols-[32px_1fr_140px_100px]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">#</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Course</span>
          <span className="hidden text-right text-[10px] font-bold uppercase tracking-widest text-white/40 sm:block">Green fee</span>
          <span className="text-right text-[10px] font-bold uppercase tracking-widest text-white/40">Drive</span>
        </div>

        {courses.map((course, i) => {
          const isActive = activeSlug === course.slug
          const weekday  = course.green_fee_weekday_thb
          const weekend  = course.green_fee_weekend_thb

          return (
            <button
              key={course.slug}
              onClick={() => handleListRow(course.slug)}
              className={[
                'grid w-full grid-cols-[32px_1fr_auto] items-center gap-3 px-5 py-4 text-left transition-all',
                'sm:grid-cols-[32px_1fr_140px_100px]',
                'border-b border-[#003d22]/5 last:border-0',
                isActive ? 'bg-[#f0f7f2]' : 'hover:bg-[#f9fcfa]',
              ].join(' ')}
              aria-pressed={isActive}
            >
              <span className={[
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black transition-all',
                isActive ? 'bg-[#c8a96e] text-[#1a1a1a]' : 'bg-[#003d22]/10 text-[#003d22]',
              ].join(' ')}>
                {i + 1}
              </span>

              <div className="min-w-0">
                <p className={['truncate text-sm font-bold leading-tight transition-colors', isActive ? 'text-[#003d22]' : 'text-foreground'].join(' ')}>
                  {course.name}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">{course.province}</span>
                  {course.holes && (
                    <span className="text-[11px] text-muted-foreground/60">{course.holes}H · Par {course.par}</span>
                  )}
                  {weekday && (
                    <span className="text-[11px] font-semibold text-[#003d22] sm:hidden">
                      {weekday.toLocaleString('en-US')} THB
                    </span>
                  )}
                </div>
              </div>

              <div className="hidden text-right sm:block">
                {weekday ? (
                  <>
                    <p className="text-sm font-bold text-foreground">
                      {weekday.toLocaleString('en-US')}
                      <span className="ml-0.5 text-[10px] font-medium text-muted-foreground">THB</span>
                    </p>
                    {weekend && (
                      <p className="text-[11px] text-muted-foreground">{weekend.toLocaleString('en-US')} wknd</p>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground/50">—</span>
                )}
              </div>

              <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                {course.drive_time_from_bangkok_min ? (
                  <><Clock className="h-3 w-3 shrink-0" />~{course.drive_time_from_bangkok_min}m</>
                ) : (
                  <span className="text-muted-foreground/40">—</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {activeCourse && (
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#003d22]/15 bg-[#f0f7f2] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#003d22] text-white">
              <Flag className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-xs font-bold text-[#003d22]">{activeCourse.name}</p>
              <p className="text-[10px] text-muted-foreground">View full guide, tips & directions</p>
            </div>
          </div>
          <Link
            href={`/golf-courses/${region}/${activeCourse.slug}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#003d22] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#005a32]"
          >
            Open guide <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  )
}
