import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'
import { FOOTER_MENU, SOCIAL_LINKS, BUSINESS_INFO } from '@/lib/constants'
import { FacebookIcon, LineIcon, InstagramIcon } from '@/components/shared/SocialIcons'

export default function Footer() {
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
              src="/images/Logo.png"
              alt="LENGOLF"
              width={194}
              height={26}
              className="mx-auto h-auto w-[160px] lg:mx-0 lg:w-[180px]"
            />
            <p
              className="mt-4"
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 400,
                color: '#333333',
                fontSize: '14px',
                lineHeight: '22px',
              }}
            >
              The Mercury Ville @ BTS Chidlom<br />Floor 4
            </p>
          </div>

          {/* Menu — 22% */}
          <div className="w-full lg:w-[22%]">
            <h3
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#007429',
                marginBottom: '12px',
              }}
            >
              Menu
            </h3>
            <ul>
              {FOOTER_MENU.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block transition-colors hover:text-[#007429]"
                    style={{
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 400,
                      color: '#333333',
                      fontSize: '14px',
                      paddingTop: '7px',
                      paddingBottom: '7px',
                    }}
                  >
                    {item.label}
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
                color: '#007429',
                marginBottom: '12px',
              }}
            >
              Opening Hours
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
              10am – 11pm<br />Monday – Sunday
            </p>
          </div>

          {/* Keep in touch — 20% */}
          <div className="w-full lg:w-[20%]">
            <h3
              style={{
                fontFamily: '"Poppins", sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#007429D4',
                marginBottom: '12px',
              }}
            >
              Keep in touch
            </h3>
            <div className="flex flex-col items-center gap-1.5 lg:items-start">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-[#007429]"
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
                className="inline-flex items-center gap-2 transition-colors hover:text-[#007429]"
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

    </footer>
  )
}
