'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ServiceItem {
  title: string
  displayTitle: string
  image: string
  href: string
}

export default function ServicesCarousel({ services }: { services: ServiceItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Triple the items for infinite loop effect: [clone-end] [original] [clone-start]
  const extendedServices = [...services, ...services, ...services]

  const getItemWidth = useCallback(() => {
    if (!scrollRef.current) return 0
    const container = scrollRef.current
    const firstChild = container.children[0] as HTMLElement
    if (!firstChild) return 0
    return firstChild.offsetWidth + 4 // width + gap (4px thin divider)
  }, [])

  // Initialize scroll position to the middle set (original items)
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    // Wait for layout
    requestAnimationFrame(() => {
      const itemWidth = getItemWidth()
      container.scrollLeft = itemWidth * services.length
    })
  }, [services.length, getItemWidth])

  // Handle infinite scroll looping
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      if (isTransitioning) return
      const itemWidth = getItemWidth()
      const singleSetWidth = itemWidth * services.length

      // If scrolled to the clone at the end, jump back to original
      if (container.scrollLeft >= singleSetWidth * 2) {
        setIsTransitioning(true)
        container.style.scrollBehavior = 'auto'
        container.scrollLeft -= singleSetWidth
        container.style.scrollBehavior = ''
        requestAnimationFrame(() => setIsTransitioning(false))
      }
      // If scrolled to the clone at the beginning, jump forward to original
      if (container.scrollLeft <= 0) {
        setIsTransitioning(true)
        container.style.scrollBehavior = 'auto'
        container.scrollLeft += singleSetWidth
        container.style.scrollBehavior = ''
        requestAnimationFrame(() => setIsTransitioning(false))
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [services.length, isTransitioning, getItemWidth])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const itemWidth = getItemWidth()
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -itemWidth : itemWidth,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-1 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {extendedServices.map((service, index) => (
          <Link
            key={`${service.title}-${index}`}
            href={service.href}
            className="group relative flex-shrink-0 w-[85vw] sm:w-[50vw] lg:w-[calc(33.333vw-3px)] aspect-[4/5] overflow-hidden"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <h3 className="absolute bottom-6 left-8 text-xl font-bold text-white/60 sm:text-2xl lg:text-3xl tracking-wider">
              {service.displayTitle.toUpperCase()}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
