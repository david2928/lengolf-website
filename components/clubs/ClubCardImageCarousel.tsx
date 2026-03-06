'use client'

import { useMemo } from 'react'
import Image from 'next/image'

interface ClubCardImageCarouselProps {
  imageUrl: string | null
  imageUrls: string[]
  alt: string
}

export default function ClubCardImageCarousel({ imageUrl, imageUrls, alt }: ClubCardImageCarouselProps) {
  const images = useMemo(() => {
    const set = new Set<string>()
    if (imageUrl) set.add(imageUrl)
    imageUrls.forEach((u) => { if (u) set.add(u) })
    return Array.from(set)
  }, [imageUrl, imageUrls])

  const hasMultiple = images.length > 1

  if (images.length === 0) {
    return (
      <div className="aspect-square sm:aspect-[4/3] w-full h-full bg-muted/30 flex items-center justify-center sm:rounded-t-xl">
        <span className="text-[10px] sm:text-xs text-muted-foreground">No image</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-square sm:aspect-[4/3] w-full h-full overflow-hidden sm:rounded-t-xl bg-muted/10">
      <Image
        src={images[0]}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, 33vw"
      />
      {hasMultiple && (
        <Image
          src={images[1]}
          alt={`${alt} - 2`}
          fill
          className="hidden md:block object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          sizes="33vw"
        />
      )}
      {hasMultiple && (
        <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 rounded-full bg-black/60 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-white">
          1/{images.length}
        </span>
      )}
    </div>
  )
}
