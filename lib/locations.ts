import { createClient } from '@/lib/supabase/client'

export type LocationPage = {
  id: string
  template_type: string
  location_name: string
  location_slug: string
  url: string
  tier: number | null
  distance_km: number | null
  bts_time_mins: number | null
  taxi_time_mins: number | null
  walking_time_mins: number | null
  taxi_fare_estimate: string | null
  bts_route: string | null
  walking_directions: string | null
  nearby_landmarks: string | null
  nearby_hotels: string | null
  nearby_offices: string | null
  google_maps_embed: string | null
  h1_title: string
  meta_description: string | null
  unique_intro: string | null
  area_pain_point: string | null
  lengolf_pitch: string | null
  other_attractions: string | null
  area_description: string | null
  simulator_specs: string | null
  lesson_packages: string | null
  instructor_info: string | null
  corporate_packages: string | null
  max_capacity: string | null
  catering_options: string | null
  club_rental_info: string | null
  featured_image: string | null
  gallery_images: string | null
  schema_markup: Record<string, unknown> | null
  internal_links: string | null
  status: string
}

/** Get slug from the CSV url field: "/golf-near-chidlom/" → "golf-near-chidlom" */
function urlToSlug(url: string): string {
  return url.replace(/^\/|\/$/g, '')
}

export async function getAllLocationSlugs(): Promise<string[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('location_pages')
    .select('url')
    .eq('status', 'published')

  if (error) {
    console.error('Error fetching location slugs:', error)
    return []
  }

  return (data || []).map((p) => urlToSlug(p.url))
}

export async function getLocationBySlug(slug: string): Promise<LocationPage | null> {
  const supabase = createClient()

  // The url field stores "/slug/" format
  const { data, error } = await supabase
    .from('location_pages')
    .select('*')
    .eq('url', `/${slug}/`)
    .eq('status', 'published')
    .single()

  if (error) {
    return null
  }

  return data as LocationPage
}

export async function getLocationsByType(templateType: string): Promise<LocationPage[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('location_pages')
    .select('*')
    .eq('template_type', templateType)
    .eq('status', 'published')
    .order('location_name')

  if (error) {
    console.error('Error fetching locations by type:', error)
    return []
  }

  return (data || []) as LocationPage[]
}

export async function getLocationsByArea(locationSlug: string): Promise<LocationPage[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('location_pages')
    .select('*')
    .eq('location_slug', locationSlug)
    .eq('status', 'published')
    .order('template_type')

  if (error) {
    console.error('Error fetching locations by area:', error)
    return []
  }

  return (data || []) as LocationPage[]
}

/** Parse internal_links field: "/things-to-do-chidlom/; /indoor-golf-chidlom/" → [{slug, href}] */
export function parseInternalLinks(linksStr: string | null): { slug: string; href: string; label: string }[] {
  if (!linksStr) return []
  return linksStr
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((url) => {
      const slug = urlToSlug(url)
      return {
        slug,
        href: `/location/${slug}`,
        label: slug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      }
    })
}

/** Parse semicolon-separated list fields (nearby_landmarks, etc.) */
export function parseList(str: string | null): string[] {
  if (!str) return []
  return str
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Parse semicolon-separated spec fields (simulator_specs, etc.) */
export function parseSemicolonList(str: string | null): string[] {
  if (!str) return []
  return str
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Parse other_attractions field: "Name - Type - Distance; ..." */
export function parseAttractions(str: string | null): { name: string; type: string; distance: string }[] {
  if (!str) return []
  return str
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item) => {
      const parts = item.split(' - ').map((p) => p.trim())
      return {
        name: parts[0] || item,
        type: parts[1] || '',
        distance: parts[2] || '',
      }
    })
}

/** Parse lesson_packages field into structured data */
export function parseLessonPackages(str: string | null): { category: string; details: string }[] {
  if (!str) return []
  return str
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item) => {
      const colonIdx = item.indexOf(':')
      if (colonIdx > -1) {
        return {
          category: item.slice(0, colonIdx).trim(),
          details: item.slice(colonIdx + 1).trim(),
        }
      }
      return { category: '', details: item }
    })
}
