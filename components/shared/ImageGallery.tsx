'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface ImageGalleryProps {
  images: GalleryImage[]
  rows?: number[]
  className?: string
}

export default function ImageGallery({ images, rows, className }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Split images into rows based on the rows prop (e.g. [5, 3] means 5 in first row, 3 in second)
  const imageRows: GalleryImage[][] = []
  if (rows) {
    let idx = 0
    for (const count of rows) {
      imageRows.push(images.slice(idx, idx + count))
      idx += count
    }
    if (idx < images.length) {
      imageRows.push(images.slice(idx))
    }
  } else {
    // Default: put all images in one row
    imageRows.push(images)
  }

  // Get flat index for lightbox navigation
  const getFlatIndex = (rowIdx: number, colIdx: number) => {
    let flat = 0
    for (let r = 0; r < rowIdx; r++) {
      flat += imageRows[r].length
    }
    return flat + colIdx
  }

  return (
    <>
      {/* Mobile: 2-column grid */}
      <div className={cn('grid grid-cols-2 gap-1 lg:hidden', className)}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="group relative aspect-square overflow-hidden"
            aria-label={`View ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="50vw"
            />
          </button>
        ))}
      </div>

      {/* Desktop: justified flex rows */}
      <div className={cn('hidden lg:flex lg:flex-col gap-1', className)}>
        {imageRows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1">
            {row.map((image, colIdx) => {
              const aspectRatio = image.width / image.height
              return (
                <button
                  key={colIdx}
                  onClick={() => setSelectedImage(getFlatIndex(rowIdx, colIdx))}
                  className="group relative overflow-hidden"
                  style={{ flex: aspectRatio }}
                  aria-label={`View ${image.alt}`}
                >
                  <div className="relative w-full" style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="33vw"
                    />
                  </div>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto object-contain"
            />
          </div>
          {selectedImage > 0 && (
            <button
              className="absolute left-4 text-white hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage - 1) }}
              aria-label="Previous"
            >
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {selectedImage < images.length - 1 && (
            <button
              className="absolute right-4 text-white hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(selectedImage + 1) }}
              aria-label="Next"
            >
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
