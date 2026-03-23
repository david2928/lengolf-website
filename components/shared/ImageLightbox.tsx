'use client'

import { useState } from 'react'
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 cursor-pointer"
          onClick={() => setActive(null)}
        >
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
