import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import SectionWrapper from '@/components/shared/SectionWrapper'
import BookingCTA from '@/components/shared/BookingCTA'
import { storageUrl, SITE_URL, SOCIAL_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'News & Articles',
  description: 'Read the latest articles from LENGOLF about indoor golf, Bangkok entertainment, golf tips, and more.',
  alternates: { canonical: `${SITE_URL}/blog/` },
}

export const revalidate = 3600 // ISR: revalidate every hour

const crossLinks = [
  { label: 'Bay Rates', href: '/golf' },
  { label: 'Lessons', href: '/lessons' },
  { label: 'Events', href: '/events' },
  { label: 'Club Rental', href: '/golf-club-rental' },
]

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[50vh] min-h-[400px] max-h-[550px] items-center text-white overflow-hidden">
        <Image
          src={storageUrl('venue/venue-bar-01.jpg')}
          alt="LENGOLF blog"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,90,50,0.55) 0%, rgba(0,122,69,0.45) 40%, rgba(0,90,50,0.3) 100%)',
          }}
        />
        <div className="relative z-10 w-full text-left px-[4%]">
          <span className="inline-block rounded bg-[#7CB342] px-6 py-2 text-lg font-bold uppercase tracking-widest text-white mb-5 md:text-xl">
            Blog
          </span>
          <h1 className="mb-4 text-5xl font-black uppercase leading-none md:text-6xl lg:text-7xl">
            News & Articles
          </h1>
          <p className="text-base font-semibold italic tracking-wide text-white/90 md:text-lg">
            Golf tips, Bangkok entertainment, and more from LENGOLF
          </p>
        </div>
      </section>

      <SectionWrapper>
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                {post.featured_image && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="mb-2 text-lg font-semibold group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  )}
                  {post.published_at && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* ── CTA Band ── */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="section-max-width section-padding text-center">
          <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">Enjoying our content? Come play!</h2>
          <p className="mb-6 text-white/80">Book your bay online or contact us on LINE</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BookingCTA text="BOOK YOUR BAY" className="bg-white text-primary hover:bg-white/90" />
            <a
              href={SOCIAL_LINKS.line}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white px-8 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              LINE @lengolf
            </a>
          </div>
        </div>
      </section>

      {/* ── Cross-Link Pills ── */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: '#F6FFFA' }}>
        <div className="section-max-width section-padding">
          <h2 className="mb-3 text-center text-3xl font-bold italic lg:text-4xl">
            <span style={{ color: '#007429' }}>EXPLORE</span>{' '}
            <span className="text-foreground">MORE</span>
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">Check out everything LENGOLF has to offer</p>
          <div className="mx-auto max-w-xl">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {crossLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-primary hover:text-white"
                  style={{ color: '#007429' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
