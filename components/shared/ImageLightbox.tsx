'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface LightboxImage {
  src: string
  alt: string
}

interface ImageLightboxProps {
  images: LightboxImage[]
  /** Number of thumbnails to show in grid (default: all). Extra images are still browsable in lightbox. */
  thumbnailCount?: number
  className?: string
  gridClassName?: string
  aspectClassName?: string
  sizes?: string
}

export default function ImageLightbox({
  images,
  thumbnailCount,
  className = '',
  gridClassName = 'grid grid-cols-2 sm:grid-cols-4 gap-3',
  aspectClassName = 'aspect-[3/4]',
  sizes = '(max-width: 640px) 50vw, 25vw',
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const prev = useCallback(() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length])
  const next = useCallback(() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length])

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, prev, next])

  const visibleImages = thumbnailCount ? images.slice(0, thumbnailCount) : images

  return (
    <>
      <div className={`${gridClassName} ${className}`}>
        {visibleImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setIndex(idx); setOpen(true) }}
            className={`relative ${aspectClassName || 'h-full'} rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in group`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes={sizes}
            />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-0 bg-transparent shadow-none overflow-hidden">
          <DialogTitle className="sr-only">{images[index]?.alt}</DialogTitle>
          <div className="relative flex items-center justify-center w-full" style={{ height: '85vh' }}>
            {images[index] && (
              <Image
                src={images[index].src}
                alt={images[index].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prev() }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); next() }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
              {index + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
