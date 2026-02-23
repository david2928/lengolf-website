'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ClubDetailGalleryProps {
  imageUrl: string | null
  imageUrls: string[]
  alt: string
}

export default function ClubDetailGallery({ imageUrl, imageUrls, alt }: ClubDetailGalleryProps) {
  const images = useMemo(() => {
    const set = new Set<string>()
    if (imageUrl) set.add(imageUrl)
    imageUrls.forEach((u) => { if (u) set.add(u) })
    return Array.from(set)
  }, [imageUrl, imageUrls])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, goPrev, goNext])

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full rounded-xl bg-muted/30 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">No image available</span>
      </div>
    )
  }

  return (
    <>
      {/* Main image */}
      <button
        type="button"
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted/10 cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          src={images[selectedIndex]}
          alt={`${alt} - ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </button>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === selectedIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={(open) => { if (!open) setLightboxOpen(false) }}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none [&>button]:text-white">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={images[selectedIndex]}
                alt={`${alt} - ${selectedIndex + 1}`}
                fill
                className="rounded-lg object-contain"
                sizes="90vw"
                priority
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
                  {selectedIndex + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
