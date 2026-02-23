'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import Image from 'next/image'
import { Menu, X, Phone, CalendarDays, ChevronDown } from 'lucide-react'
import { SOCIAL_LINKS, BOOKING_URL, BUSINESS_INFO, storageUrl } from '@/lib/constants'
import { FacebookIcon, LineIcon, InstagramIcon } from '@/components/shared/SocialIcons'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'

const CLUBS_CHILDREN = [
  { key: 'clubsAtLengolf', href: '/golf-club-rental' as const, descKey: 'clubsAtLengolfDesc' },
  { key: 'clubsCourseRental', href: '/golf-course-club-rental' as const, descKey: 'clubsCourseRentalDesc' },
  { key: 'clubsSecondHand', href: '/second-hand-golf-clubs-bangkok' as const, descKey: 'clubsSecondHandDesc' },
]

const NAV_KEYS = [
  { key: 'home', href: '/' as const },
  { key: 'bayRates', href: '/golf' as const },
  { key: 'events', href: '/events' as const },
  { key: 'lessons', href: '/lessons' as const },
  // 'clubs' is rendered separately as a dropdown
  { key: 'aboutUs', href: '/about-us' as const },
] as const

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [clubsOpen, setClubsOpen] = useState(false)
  const clubsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const t = useTranslations('Nav')
  const tCommon = useTranslations('Common')

  const isClubsActive = CLUBS_CHILDREN.some((c) => pathname === c.href)

  function handleClubsMouseEnter() {
    if (clubsTimeout.current) clearTimeout(clubsTimeout.current)
    setClubsOpen(true)
  }

  function handleClubsMouseLeave() {
    clubsTimeout.current = setTimeout(() => setClubsOpen(false), 150)
  }

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      style={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.15)' }}
    >
      <div
        className="flex items-center justify-between gap-2"
        style={{ minHeight: '80px', paddingLeft: '5%', paddingRight: '5%' }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" style={{ minWidth: '100px', maxWidth: '170px' }}>
          <Image
            src={storageUrl('branding/logo.png')}
            alt="LENGOLF"
            width={194}
            height={26}
            className="h-auto w-full"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:min-w-0">
          <div className="flex items-center">
            {NAV_KEYS.map((item) => {
              const isActive = pathname === item.href
              const isAboutUs = item.href === '/about-us'
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap transition-colors hover:!text-[#316B39] text-sm xl:text-base px-2 xl:px-[15px] py-2.5 ${isActive ? 'text-[#316B39]' : 'text-[#666666]'} ${isAboutUs ? 'hidden xl:block' : ''}`}
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 500,
                    letterSpacing: '-0.3px',
                  }}
                >
                  {t(item.key)}
                </Link>
              )
            })}

            {/* CLUBS Dropdown — desktop */}
            <div
              className="relative px-2 xl:px-[15px] py-2.5"
              onMouseEnter={handleClubsMouseEnter}
              onMouseLeave={handleClubsMouseLeave}
            >
              <button
                type="button"
                className={`flex items-center gap-1 whitespace-nowrap transition-colors hover:!text-[#316B39] text-sm xl:text-base ${isClubsActive ? 'text-[#316B39]' : 'text-[#666666]'}`}
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 500,
                  letterSpacing: '-0.3px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
                aria-expanded={clubsOpen}
                aria-haspopup="true"
              >
                {t('clubs')}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${clubsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {clubsOpen && (
                <div
                  className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-primary/10 bg-white shadow-lg py-2"
                  onMouseEnter={handleClubsMouseEnter}
                  onMouseLeave={handleClubsMouseLeave}
                >
                  {CLUBS_CHILDREN.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-4 py-3 transition-colors hover:bg-primary/5 ${isChildActive ? 'bg-primary/5' : ''}`}
                        onClick={() => setClubsOpen(false)}
                      >
                        <span
                          className={`block text-sm font-semibold ${isChildActive ? 'text-[#316B39]' : 'text-foreground'}`}
                          style={{ fontFamily: '"Poppins", sans-serif' }}
                        >
                          {t(child.key)}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {t(child.descKey)}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex lg:items-center lg:gap-3 xl:gap-4 flex-shrink-0">
          {/* BOOK NOW button */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-white transition-colors hover:bg-[#045923]"
            style={{
              backgroundColor: '#007429',
              borderRadius: '4px',
              padding: '7px 12px',
              fontFamily: '"Poppins", sans-serif',
              fontSize: '13px',
              fontWeight: 400,
            }}
          >
            <CalendarDays style={{ width: '18px', height: '18px' }} />
            {tCommon('bookNow')}
          </a>

          {/* Phone */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-[#316B39]"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: '15px',
              fontWeight: 400,
              color: '#666666',
            }}
          >
            <Phone style={{ width: '17px', height: '17px', color: '#888888' }} />
            {BUSINESS_INFO.phone}
          </a>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Social icons — hidden below 2xl */}
          <div className="hidden 2xl:flex items-center" style={{ gap: '3px' }}>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-0.5">
              <FacebookIcon size={20} color="#666666" />
            </a>
            <a href={SOCIAL_LINKS.line} target="_blank" rel="noopener noreferrer" aria-label="LINE" className="p-0.5">
              <LineIcon size={20} color="#666666" />
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-0.5">
              <InstagramIcon size={20} color="#666666" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — full-screen overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
          {/* Top bar matching header */}
          <div
            className="flex items-center justify-between flex-shrink-0"
            style={{ minHeight: '80px', paddingLeft: '5%', paddingRight: '5%', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.15)' }}
          >
            <Link href="/" className="flex-shrink-0" style={{ width: '12%', minWidth: '100px' }} onClick={() => setMobileMenuOpen(false)}>
              <Image
                src={storageUrl('branding/logo.png')}
                alt="LENGOLF"
                width={194}
                height={26}
                className="h-auto w-full max-w-[140px]"
              />
            </Link>
            <button
              type="button"
              className="p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu content */}
          <div className="flex-1 flex flex-col justify-center items-center gap-5 px-8 overflow-y-auto py-8">
            {/* Regular nav links (without clubs) */}
            {NAV_KEYS.filter(item => item.href !== '/about-us').map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block transition-colors hover:text-[#316B39]"
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '22px',
                    fontWeight: 500,
                    letterSpacing: '-0.3px',
                    color: isActive ? '#316B39' : '#333333',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              )
            })}

            {/* CLUBS section — always expanded on mobile */}
            <div className="w-full max-w-xs">
              <p
                className="text-center mb-3"
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '22px',
                  fontWeight: 500,
                  letterSpacing: '-0.3px',
                  color: isClubsActive ? '#316B39' : '#333333',
                }}
              >
                {t('clubs')}
              </p>
              <div className="flex flex-col gap-0.5 mx-auto w-fit">
                {CLUBS_CHILDREN.map((child) => {
                  const isChildActive = pathname === child.href
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 px-4 rounded-lg transition-colors hover:bg-primary/5 text-center"
                      style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '15px',
                        fontWeight: isChildActive ? 600 : 400,
                        color: isChildActive ? '#316B39' : '#666666',
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(child.key)}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* About Us */}
            {NAV_KEYS.filter(item => item.href === '/about-us').map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block transition-colors hover:text-[#316B39]"
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: '22px',
                    fontWeight: 500,
                    letterSpacing: '-0.3px',
                    color: isActive ? '#316B39' : '#333333',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </Link>
              )
            })}

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white mt-4"
              style={{
                backgroundColor: '#007429',
                borderRadius: '4px',
                padding: '12px 24px',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '15px',
                fontWeight: 400,
              }}
            >
              <CalendarDays style={{ width: '18px', height: '18px' }} />
              {tCommon('bookNow')}
            </a>
          </div>

          {/* Bottom contact info */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3 pb-10">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-2"
              style={{ fontFamily: '"Poppins", sans-serif', fontSize: '15px', fontWeight: 400, color: '#666666' }}
            >
              <Phone style={{ width: '17px', height: '17px', color: '#888888' }} />
              {BUSINESS_INFO.phone}
            </a>
            <div className="flex items-center gap-4">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon size={22} color="#666666" />
              </a>
              <a href={SOCIAL_LINKS.line} target="_blank" rel="noopener noreferrer" aria-label="LINE">
                <LineIcon size={22} color="#666666" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon size={22} color="#666666" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
