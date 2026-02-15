'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

interface InstagramEmbedProps {
  shortcodes: string[]
}

export default function InstagramEmbed({ shortcodes }: InstagramEmbedProps) {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        window.instgrm?.Embeds.process()
      }
      document.body.appendChild(script)
    } else {
      window.instgrm?.Embeds.process()
    }
  }, [shortcodes])

  useEffect(() => {
    const timer = setTimeout(() => {
      window.instgrm?.Embeds.process()
    }, 100)
    return () => clearTimeout(timer)
  }, [current])

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? shortcodes.length - 1 : c - 1))
  }, [shortcodes.length])

  const next = useCallback(() => {
    setCurrent((c) => (c === shortcodes.length - 1 ? 0 : c + 1))
  }, [shortcodes.length])

  return (
    <div className="mx-auto max-w-[480px]">
      {/* Fixed-height carousel area with nav buttons */}
      <div className="relative">
        {/* Prev button — anchored to fixed position */}
        <button
          type="button"
          onClick={prev}
          className="absolute -left-4 top-[280px] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50 lg:-left-14"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* Next button — anchored to fixed position */}
        <button
          type="button"
          onClick={next}
          className="absolute -right-4 top-[280px] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50 lg:-right-14"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        {/* Carousel viewport */}
        <div ref={containerRef} className="overflow-hidden">
          {shortcodes.map((code, i) => (
            <div
              key={code}
              className={i === current ? 'block' : 'hidden'}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`https://www.instagram.com/p/${code}/`}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '12px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '0 auto',
                  maxWidth: '100%',
                  minWidth: '280px',
                  padding: 0,
                  width: '100%',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {shortcodes.map((code, i) => (
          <button
            key={code}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'w-6 bg-primary' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
