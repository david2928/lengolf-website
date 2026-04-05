'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ClickableImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
  priority?: boolean
}

export default function ClickableImage({ src, alt, width, height, className = '', sizes, priority }: ClickableImageProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="cursor-zoom-in transition-transform hover:scale-[1.02]">
        <Image src={src} alt={alt} width={width} height={height} className={className} sizes={sizes} priority={priority} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 cursor-pointer"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none z-10"
          >
            &times;
          </button>
          <div className="relative cursor-default" onClick={e => e.stopPropagation()}>
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={1200}
              className="rounded-lg shadow-2xl object-contain"
              style={{ maxWidth: '95vw', maxHeight: '95vh', width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
