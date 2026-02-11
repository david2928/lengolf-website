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
