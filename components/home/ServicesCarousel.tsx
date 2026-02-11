'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ServiceItem {
  title: string
  image: string
  href: string
}

const MENU_IMAGES = [
  { src: '/images/food_menu.jpg', alt: 'Food Menu' },
  { src: '/images/food_menu2.jpg', alt: 'Food Menu 2' },
  { src: '/images/drink_menu.jpg', alt: 'Drink Menu' },
]

export default function ServicesCarousel({ services }: { services: ServiceItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuIndex, setMenuIndex] = useState(0)

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

  // Close modal on Escape key
  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
      if (e.key === 'ArrowRight') setMenuIndex((i) => Math.min(i + 1, MENU_IMAGES.length - 1))
      if (e.key === 'ArrowLeft') setMenuIndex((i) => Math.max(i - 1, 0))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  const isFoodDrinks = (service: ServiceItem) => service.title === 'Food & Drinks'

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
        {extendedServices.map((service, index) =>
          isFoodDrinks(service) ? (
            <button
              key={`${service.title}-${index}`}
              onClick={() => { setMenuIndex(0); setMenuOpen(true) }}
              className="group relative flex-shrink-0 w-[85vw] sm:w-[50vw] lg:w-[calc(33.333vw-3px)] aspect-[4/5] overflow-hidden text-left"
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
                {service.title.toUpperCase()}
              </h3>
            </button>
          ) : (
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
                {service.title.toUpperCase()}
              </h3>
            </Link>
          )
        )}
      </div>

      {/* Food & Drinks Menu Modal */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setMenuOpen(false)}
        >
          <button
            className="absolute right-4 top-4 text-white hover:text-gray-300 z-10"
            onClick={() => setMenuOpen(false)}
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={MENU_IMAGES[menuIndex].src}
              alt={MENU_IMAGES[menuIndex].alt}
              width={1200}
              height={1600}
              className="max-h-[85vh] w-auto object-contain"
            />

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {MENU_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMenuIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${i === menuIndex ? 'bg-white' : 'bg-white/40'}`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {menuIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); setMenuIndex(menuIndex - 1) }}
              aria-label="Previous"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
          )}
          {menuIndex < MENU_IMAGES.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); setMenuIndex(menuIndex + 1) }}
              aria-label="Next"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
