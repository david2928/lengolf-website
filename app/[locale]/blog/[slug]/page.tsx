import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import DOMPurify from 'isomorphic-dompurify'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { getPostBySlug, getPostSlugs, getRelatedPosts, getReadingTime } from '@/lib/blog'
import { SITE_URL, SITE_NAME, BOOKING_URL, storageUrl } from '@/lib/constants'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import ShareButtons from '@/components/blog/ShareButtons'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      url: `${SITE_URL}/blog/${post.slug}/`,
      type: 'article',
      publishedTime: post.published_at || undefined,
      ...(post.featured_image && { images: [post.featured_image] }),
    },
  }
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('BlogPost')
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const readingTime = getReadingTime(post.content)
  const relatedPosts = await getRelatedPosts(slug, 3)
  const dateLocale = locale === 'th' ? 'th-TH' : 'en-US'

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(dateLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: `${SITE_URL}/` },
    { name: 'Blog', url: `${SITE_URL}/blog/` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}/` },
  ])

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    url: `${SITE_URL}/blog/${post.slug}/`,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    ...(post.featured_image && { image: post.featured_image }),
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: storageUrl('branding/logo.png') },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Article Header */}
      <section className="relative overflow-hidden bg-[#003d22]">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#005a32]/40" />
          <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-[#007a45]/20" />
          <div className="absolute right-1/4 bottom-10 h-40 w-40 rounded-full bg-accent/10" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToBlog')}
          </Link>

          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
            {formattedDate && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {t('minRead', { count: readingTime })}
            </span>
          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0 40V0c240 26.7 480 40 720 40S1200 26.7 1440 0v40H0z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Featured Image (if exists) */}
      {post.featured_image && (
        <div className="mx-auto -mt-6 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div
          className="article-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </article>

      {/* Share Buttons */}
      <div className="mx-auto max-w-3xl border-t border-border/60 px-4 pt-6 sm:px-6 lg:px-8">
        <ShareButtons url={`${SITE_URL}/blog/${post.slug}/`} title={post.title} />
      </div>

      {/* CTA Banner */}
      <section className="mx-auto max-w-3xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-[#003d22] to-[#005a32] p-8 text-center sm:p-10">
          <h3 className="mb-3 text-2xl font-bold text-white">{t('ctaTitle')}</h3>
          <p className="mb-6 text-white/80">
            {t('ctaText')}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#1a1a1a] transition-all hover:bg-accent/90 hover:shadow-lg"
          >
            {t('bookABay')}
          </a>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t bg-[#fafafa] py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-primary">
              {t('keepReading')}
            </h2>
            <p className="mb-10 text-center text-2xl font-bold text-foreground">
              {t('moreArticles')}
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted-foreground">
                        {related.excerpt}
                      </p>
                    )}
                    {related.published_at && (
                      <p className="mt-auto text-xs text-muted-foreground">
                        {new Date(related.published_at).toLocaleDateString(dateLocale, {
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
          </div>
        </section>
      )}
    </>
  )
}
