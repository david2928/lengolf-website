import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import SectionWrapper from '@/components/shared/SectionWrapper'

export const metadata: Metadata = {
  title: 'News & Articles',
  description: 'Read the latest articles from LENGOLF about indoor golf, Bangkok entertainment, golf tips, and more.',
}

export const revalidate = 3600 // ISR: revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <SectionWrapper dark>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold lg:text-5xl"><span className="text-primary-light">NEWS</span> & ARTICLES</h1>
          <p className="mt-4 text-gray-300">At LENGOLF, our passion is simple: blending golf and fun. Dive into how we&apos;re making golf enjoyable for everyone in Bangkok, offering a vibrant atmosphere where players of all levels can enjoy the game like never before.</p>
        </div>
      </SectionWrapper>

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
