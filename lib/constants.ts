export const SITE_NAME = 'LENGOLF'
export const SITE_URL = 'https://www.len.golf'
export const SUPABASE_STORAGE_URL = 'https://bisimqmtxjsptehhqpeg.supabase.co/storage/v1/object/public/website-assets'

export function storageUrl(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${SUPABASE_STORAGE_URL}/${clean}`
}

const SUPABASE_RENDER_URL = 'https://bisimqmtxjsptehhqpeg.supabase.co/storage/v1/render/image/public/website-assets'

export function storageImageUrl(path: string, options: { width?: number; height?: number; quality?: number } = {}): string {
  const clean = path.startsWith('/') ? path.slice(1) : path
  const params = new URLSearchParams()
  if (options.width) params.set('width', String(options.width))
  if (options.height) params.set('height', String(options.height))
  params.set('quality', String(options.quality || 75))
  return `${SUPABASE_RENDER_URL}/${clean}?${params.toString()}`
}
export const SITE_DESCRIPTION = 'Premier indoor golf simulator and bar in the heart of Bangkok. Located at The Mercury Ville @ BTS Chidlom.'

export const BUSINESS_INFO = {
  name: 'LENGOLF',
  legalName: 'LENGOLF CO., LTD.',
  address: 'The Mercury Ville @ BTS Chidlom, Floor 4, 540 Ploenchit Road, Lumpini, Pathumwan, Bangkok 10330',
  addressShort: 'The Mercury Ville @ BTS Chidlom, Floor 4, Bangkok',
  phone: '096-668-2335',
  phoneRaw: '0966682335',
  email: 'info@len.golf',
  hours: '10am – 11pm, Monday – Sunday',
  googleMapsUrl: 'https://www.google.com/maps?ll=13.743447,100.544115&z=16&t=m&hl=en-US&gl=US&mapclient=embed&q=540+Phloen+Chit+Rd+Khwaeng+Lumphini,+Pathum+Wan+Krung+Thep+Maha+Nakhon+10330',
  googleMapsEmbed: 'https://maps.google.com/maps?q=LENGOLF&t=m&z=16&output=embed&iwloc=near',
  coordinates: { lat: 13.743447, lng: 100.544115 },
} as const

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/lengolf.bkk',
  instagram: 'https://www.instagram.com/lengolf.bkk/',
  line: 'https://lin.ee/uxQpIXn',
} as const

export const BOOKING_URL = 'https://booking.len.golf/'

export const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'BAY RATES', href: '/golf' },
  { label: 'EVENTS', href: '/events' },
  { label: 'LESSONS', href: '/lessons' },
  { label: 'CLUBS', href: '/golf-club-rental' },
  { label: 'ABOUT US', href: '/about-us' },
] as const

export const FOOTER_MENU = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about-us' },
  { label: 'BAY RATES', href: '/golf' },
  { label: 'EVENTS', href: '/events' },
  { label: 'LESSONS', href: '/lessons' },
  { label: 'CLUBS AT LENGOLF', href: '/golf-club-rental' },
  { label: 'RENT FOR A COURSE', href: '/golf-course-club-rental' },
  { label: 'SECOND-HAND CLUBS', href: '/second-hand-golf-clubs-bangkok' },
  { label: 'BLOG', href: '/blog' },
] as const
