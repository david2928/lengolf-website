import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { storageUrl, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'News & Articles',
  description: 'Read the latest articles from LENGOLF about indoor golf, Bangkok entertainment, golf tips, and more.',
  alternates: { canonical: `${SITE_URL}/blog/` },
}

export const revalidate = 3600 // ISR: revalidate every hour

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
        <div className="relative z-10 w-full text-left" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          <span
            className="inline-block rounded px-6 py-2 text-lg font-bold uppercase tracking-widest text-white mb-5 md:text-xl"
            style={{ backgroundColor: '#7CB342' }}
          >
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
    </>
  )
}
