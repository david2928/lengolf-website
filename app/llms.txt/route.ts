import { NextResponse } from 'next/server'
import { SITE_URL, BUSINESS_INFO, SOCIAL_LINKS, BOOKING_URL } from '@/lib/constants'
import { getAllPosts } from '@/lib/blog'
import { getSeoPagesByType } from '@/lib/seo-pages'

/**
 * /llms.txt — a curated, markdown-formatted map of the site for AI assistants and
 * agentic tools (Cursor, Claude Code, etc.) that read it when a user references the
 * domain. Generated from the same data the site renders, so it stays in sync.
 * Regenerated daily via ISR; the long tail of URLs lives in /sitemap.xml.
 */
export const revalidate = 86400

const KEY_PAGES: { title: string; path: string; desc: string }[] = [
  { title: 'Bay Rates & Simulators', path: '/golf/', desc: 'Indoor golf simulator bay rates, monthly packages, and how booking works.' },
  { title: 'Golf Lessons', path: '/lessons/', desc: 'One-on-one coaching with PGA-certified pros on the simulators.' },
  { title: 'Private Events & Parties', path: '/events/', desc: 'Corporate team-building, birthdays, and private parties with bays, bar, and catering.' },
  { title: 'Food & Drinks Menu', path: '/menu/', desc: 'Full menu with THB prices: Smith & Co burgers, Sexy Pizza, cocktails, beer, wine, and unlimited soft drinks.' },
  { title: 'Golf Club Rental', path: '/golf-club-rental/', desc: 'Free house sets plus premium Callaway / Majesty rentals at the venue.' },
  { title: 'Golf Course Club Rental', path: '/golf-course-club-rental/', desc: 'Rent premium clubs for any Bangkok golf course, with delivery.' },
  { title: 'About LENGOLF', path: '/about-us/', desc: 'About the venue, location, and contact details.' },
  { title: 'Golf Courses in Thailand', path: '/golf-courses/', desc: 'Directory of Thai golf courses by region with green fees and course guides.' },
  { title: 'Second-Hand Golf Clubs', path: '/second-hand-golf-clubs-bangkok/', desc: 'Used Callaway and TaylorMade clubs for sale, testable in our simulators.' },
]

function link(title: string, url: string, desc?: string): string {
  return desc ? `- [${title}](${url}): ${desc}` : `- [${title}](${url})`
}

export async function GET() {
  const [posts, faqs, guides] = await Promise.all([
    getAllPosts(),
    getSeoPagesByType('faq'),
    getSeoPagesByType('explainer'),
  ])

  const sections: string[] = []

  sections.push('# LENGOLF — Indoor Golf Simulator & Bar in Bangkok')
  sections.push(
    `> LENGOLF is an indoor golf simulator venue and bar at ${BUSINESS_INFO.address}. ` +
      `Open ${BUSINESS_INFO.hours}. Phone ${BUSINESS_INFO.phone}. Book a bay at ${BOOKING_URL}. ` +
      'This file points AI assistants to the most useful pages on len.golf; the full URL list is in /sitemap.xml.'
  )

  sections.push(
    `## Key pages\n${KEY_PAGES.map((p) => link(p.title, `${SITE_URL}${p.path}`, p.desc)).join('\n')}`
  )

  if (faqs.length) {
    sections.push(
      `## FAQ\n${faqs.map((p) => link(p.title, `${SITE_URL}/faq/${p.slug}/`, p.meta_description || undefined)).join('\n')}`
    )
  }

  if (guides.length) {
    sections.push(
      `## Guides\n${guides.map((p) => link(p.title, `${SITE_URL}/guide/${p.slug}/`, p.meta_description || undefined)).join('\n')}`
    )
  }

  if (posts.length) {
    const recent = posts.slice(0, 20)
    sections.push(
      `## Blog\n${recent.map((p) => link(p.title, `${SITE_URL}/blog/${p.slug}/`, p.excerpt || undefined)).join('\n')}`
    )
  }

  sections.push(
    '## Contact\n' +
      `- Address: ${BUSINESS_INFO.address}\n` +
      `- Phone: ${BUSINESS_INFO.phone}\n` +
      `- Email: ${BUSINESS_INFO.email}\n` +
      `- Hours: ${BUSINESS_INFO.hours}\n` +
      `- LINE: ${SOCIAL_LINKS.line}\n` +
      `- Book a bay: ${BOOKING_URL}\n` +
      `- Full URL list: ${SITE_URL}/sitemap.xml`
  )

  const body = sections.join('\n\n') + '\n'

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
