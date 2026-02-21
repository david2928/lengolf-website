import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SOCIAL_LINKS, BUSINESS_INFO, storageUrl } from '@/lib/constants'
import { FacebookIcon, LineIcon, InstagramIcon } from '@/components/shared/SocialIcons'

const FOOTER_MENU_KEYS = [
  { key: 'home', href: '/' as const },
  { key: 'aboutUs', href: '/about-us' as const },
  { key: 'bayRates', href: '/golf' as const },
  { key: 'events', href: '/events' as const },
  { key: 'lessons', href: '/lessons' as const },
  { key: 'clubsAtLengolf', href: '/golf-club-rental' as const },
  { key: 'clubsCourseRental', href: '/golf-course-club-rental' as const },
  { key: 'clubsSecondHand', href: '/second-hand-golf-clubs-bangkok' as const },
  { key: 'blog', href: '/blog' as const },
] as const

export default async function Footer() {
  const t = await getTranslations('Footer')
  const tNav = await getTranslations('Nav')

  return (
    <footer>
      {/* Main footer */}
      <div
        style={{
          backgroundColor: '#F6FFFA',
          borderTop: '1px solid #9DCCA880',
        }}
      >
        <div
          className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left"
          style={{
            paddingTop: '5%',
            paddingBottom: '5%',
            paddingLeft: '6%',
            paddingRight: '6%',
            gap: '30px',
          }}
        >
          {/* Logo & Address — 36% */}
          <div className="w-full lg:w-[36%] flex-shrink-0">
            <Image
              src={storageUrl('branding/logo.png')}
              alt="LENGOLF"
              width={194}
              height={26}
              className="mx-auto h-auto w-[160px] lg:mx-0 lg:w-[180px]"
            />
            <p
              className="mt-4 whitespace-pre-line"
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                color: '#333333',
                fontSize: '14px',
                lineHeight: '22px',
              }}
            >
              {t('address')}
            </p>
          </div>

          {/* Menu — 22% */}
          <div className="w-full lg:w-[22%]">
            <h3
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#005a32',
                marginBottom: '12px',
              }}
            >
              {t('menu')}
            </h3>
            <ul>
              {FOOTER_MENU_KEYS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block transition-colors hover:text-[#005a32]"
                    style={{
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 400,
                      color: '#333333',
                      fontSize: '14px',
                      paddingTop: '7px',
                      paddingBottom: '7px',
                    }}
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours — 22% */}
          <div className="w-full lg:w-[22%]">
            <h3
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#005a32',
                marginBottom: '12px',
              }}
            >
              {t('openingHours')}
            </h3>
            <p
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                color: '#333333',
                fontSize: '14px',
                lineHeight: '22px',
              }}
            >
              {t('hoursValue')}<br />{t('daysValue')}
            </p>
          </div>

          {/* Keep in touch — 20% */}
          <div className="w-full lg:w-[20%]">
            <h3
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#005a32',
                marginBottom: '12px',
              }}
            >
              {t('keepInTouch')}
            </h3>
            <div className="flex flex-col items-center gap-1.5 lg:items-start">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-[#005a32]"
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#333333',
                }}
              >
                <Phone style={{ width: '16px', height: '16px', color: '#25923E' }} />
                {BUSINESS_INFO.phone}
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-[#005a32]"
                style={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#333333',
                }}
              >
                <Mail style={{ width: '16px', height: '16px', color: '#25923E' }} />
                {BUSINESS_INFO.email}
              </a>
              <div className="flex items-center mt-2" style={{ gap: '5px' }}>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon size={22} color="#007429" />
                </a>
                <a href={SOCIAL_LINKS.line} target="_blank" rel="noopener noreferrer" aria-label="LINE">
                  <LineIcon size={22} color="#007429" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon size={22} color="#007429" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-primary/10 bg-[#f0f9f4] px-[6%] py-4">
        <div className="flex flex-col items-center gap-2 text-center text-xs text-foreground/70 sm:flex-row sm:justify-between sm:text-left">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-primary">{t('privacyPolicy')}</Link>
            <Link href="/terms-of-service" className="transition-colors hover:text-primary">{t('termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
