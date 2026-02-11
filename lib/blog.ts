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

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

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
