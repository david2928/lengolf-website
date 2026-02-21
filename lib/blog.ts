import { createClient } from '@/lib/supabase/client'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image: string | null
  meta_title: string | null
  meta_description: string | null
  published_at: string | null
  status: string
  locale?: string | null // Future: 'en' | 'th', defaults to 'en' for existing posts
  created_at: string
  updated_at: string
}

export function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text.split(' ').length
  return Math.max(1, Math.ceil(words / 200))
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  return data || []
}

export async function getPostBySlug(slug: string, locale?: string): Promise<BlogPost | null> {
  const supabase = createClient()

  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')

  // Future-proof: If locale is provided and locale column exists, filter by it
  // For now, all posts default to 'en' if locale field is missing
  if (locale) {
    query = query.or(`locale.eq.${locale},locale.is.null`)
  }

  const { data, error } = await query.single()

  if (error) {
    return null
  }

  return data
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    return []
  }

  return data || []
}

export async function getPostSlugs(): Promise<string[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')

  if (error) {
    return []
  }

  return (data || []).map((p) => p.slug)
}
