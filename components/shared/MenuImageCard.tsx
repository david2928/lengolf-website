'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'

interface MenuImageCardProps {
  src: string
  alt: string
  title: string
  width: number
  height: number
  /** CSS object-position for the cropped preview, e.g. 'left top' */
  previewPosition?: string
}

/**
 * Uniform-aspect preview card for printed menu images with a full-size
 * lightbox. The source menus have wildly different aspect ratios, so the
 * card shows a cover-cropped teaser and the lightbox shows the real thing.
 */
export default function MenuImageCard({ src, alt, title, width, height, previewPosition = 'center top' }: MenuImageCardProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full overflow-hidden rounded-xl border border-primary/10 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            style={{ objectPosition: previewPosition }}
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
        <div className="flex items-center justify-between border-t border-border/60 px-5 py-4">
          <span className="font-semibold text-foreground">{title}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: '#007429' }}>
            <Maximize2 className="h-4 w-4" />
            View
          </span>
        </div>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-pointer"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="relative cursor-default" onClick={(e) => e.stopPropagation()}>
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="rounded-lg shadow-2xl object-contain"
              style={{ maxWidth: '95vw', maxHeight: '92vh', width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
