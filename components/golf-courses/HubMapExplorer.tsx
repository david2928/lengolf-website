'use client'

import { useEffect, useRef } from 'react'
import type { GolfCourse } from '@/types/golf-courses'

interface RegionCourses {
  region: string
  label: string
  courses: GolfCourse[]
}

interface Props {
  regions: RegionCourses[]
  locale?: string
}

/** Pin background colours — one per region. */
const REGION_COLOR: Record<string, string> = {
  'bangkok':           '#005a32',
  'pattaya':           '#c8a96e',
  'hua-hin':           '#1e6091',
  'phuket':            '#c0392b',
  'khao-yai':          '#7b2fbe',
  'kanchanaburi':      '#d97706',
  'chiang-mai':        '#0369a1',
  'isan':              '#6d28d9',
  'southern-thailand': '#be4b08',
  'koh-samui':         '#0f766e',
  'chiang-rai':        '#92400e',
  'north-misc':        '#374151',
  'khao-lak':          '#0e7490',
  'krabi':             '#be185d',
}

const REGION_TEXT_COLOR: Record<string, string> = {
  'bangkok':           '#ffffff',
  'pattaya':           '#1a1a1a',
  'hua-hin':           '#ffffff',
  'phuket':            '#ffffff',
  'khao-yai':          '#ffffff',
  'kanchanaburi':      '#ffffff',
  'chiang-mai':        '#ffffff',
  'isan':              '#ffffff',
  'southern-thailand': '#ffffff',
  'koh-samui':         '#ffffff',
  'chiang-rai':        '#ffffff',
  'north-misc':        '#ffffff',
  'khao-lak':          '#ffffff',
  'krabi':             '#ffffff',
}

/** Minimal HTML entity escaping for course names inside template literals. */
function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Shared window-level promise so the script loads exactly once
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

export default function HubMapExplorer({ regions, locale = 'en' }: Props) {
  const mapDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // EN has no locale prefix (as-needed strategy); other locales get /th, /ko etc.
    const localePrefix = locale === 'en' ? '' : `/${locale}`
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY
    if (!apiKey || !mapDivRef.current) return
    let cancelled = false

    loadMapsApi(apiKey).then(() => {
      if (cancelled || !mapDivRef.current) return
          const gmaps = (window as any).google.maps

      const map = new gmaps.Map(mapDivRef.current, {
        zoom:              9,
        center:            { lat: 13.2, lng: 100.7 },
        mapId:             'DEMO_MAP_ID',
        zoomControl:       true,
        streetViewControl: false,
        mapTypeControl:    false,
        fullscreenControl: false,
      })

      const infoWindow = new gmaps.InfoWindow()
      const bounds = new gmaps.LatLngBounds()

      for (const { region, label, courses } of regions) {
        const bg   = REGION_COLOR[region]      ?? '#003d22'
        const text = REGION_TEXT_COLOR[region] ?? '#ffffff'
        const href = `${localePrefix}/golf-courses/${region}/`

        for (const course of courses) {
          if (!course.latitude || !course.longitude) continue

          const position = { lat: course.latitude, lng: course.longitude }
          bounds.extend(position)

          const pin = document.createElement('div')
          pin.style.cssText = [
            `background:${bg};color:${text};`,
            'width:12px;height:12px;border-radius:50%;',
            'border:2px solid #fff;',
            'box-shadow:0 1px 4px rgba(0,0,0,.4);',
            'cursor:pointer;transition:transform .15s;',
          ].join('')
          pin.addEventListener('mouseenter', () => { pin.style.transform = 'scale(1.6)' })
          pin.addEventListener('mouseleave', () => { pin.style.transform = 'scale(1)' })

          const marker = new gmaps.marker.AdvancedMarkerElement({
            map,
            position,
            content: pin,
            title:   course.name,
          })

          const courseHref = `${localePrefix}/golf-courses/${region}/${course.slug}`
          marker.addListener('gmp-click', () => {
            infoWindow.setContent(`
              <div style="font-family:sans-serif;padding:2px 0;min-width:160px">
                <p style="margin:0 0 2px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:${bg}">${escHtml(label)}</p>
                <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#1a1a1a;line-height:1.3">${escHtml(course.name)}</p>
                <a href="${courseHref}" style="display:inline-block;background:${bg};color:${text};padding:4px 12px;border-radius:6px;font-size:11px;font-weight:700;text-decoration:none">
                  View guide →
                </a>
              </div>
            `)
            infoWindow.open({ map, anchor: marker })
          })
        }
      }

      if (!bounds.isEmpty()) map.fitBounds(bounds, 40)
    }).catch(console.error)

    return () => { cancelled = true }
  }, [regions, locale])

  return (
    <div className="overflow-hidden rounded-2xl border border-[#003d22]/15 shadow-sm">
      {/* Legend */}
      <div className="flex items-center gap-4 border-b border-[#003d22]/10 bg-white px-4 py-2.5">
        {regions.map(({ region, label, courses }) => (
          <span key={region} className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm"
              style={{ background: REGION_COLOR[region] ?? '#003d22' }}
            />
            {label} <span className="font-normal text-muted-foreground">({courses.length})</span>
          </span>
        ))}
      </div>
      {/* Map */}
      <div
        ref={mapDivRef}
        style={{ width: '100%', height: 'clamp(260px, 40vw, 420px)', display: 'block' }}
      />
    </div>
  )
}
