'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'


interface LightboxImage {
  src: string
  alt: string
}

interface ImageLightboxProps {
  images: LightboxImage[]
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
  const [active, setActive] = useState<LightboxImage | null>(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, close])

  const visibleImages = thumbnailCount ? images.slice(0, thumbnailCount) : images

  return (
    <>
      <div className={`${gridClassName} ${className}`}>
        {visibleImages.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActive(img)}
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

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 cursor-pointer"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none"
          >
            &times;
          </button>
          <div className="relative cursor-default" style={{ maxWidth: '90vw', maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
            <Image
              src={active.src}
              alt={active.alt}
              width={900}
              height={900}
              className="rounded-lg shadow-2xl object-contain"
              style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      )}
    </>
  )
}
