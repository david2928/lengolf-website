import { createClient } from '@/lib/supabase/client'

export interface UsedClub {
  id: string
  brand: string
  model: string | null
  club_type: string
  specification: string | null
  shaft: string | null
  gender: string
  condition: string
  price: number
  description: string | null
  image_url: string | null
  image_urls: string[]
  purchased_at: string | null
  available_for_sale: boolean
  available_for_rental: boolean
  set_id: string | null
  created_at: string
  updated_at: string
}

/** Explicit column list — never use select('*') to avoid leaking internal fields like cost */
const CLUB_COLUMNS =
  'id, brand, model, club_type, specification, shaft, gender, condition, price, description, image_url, image_urls, purchased_at, available_for_sale, available_for_rental, set_id, created_at, updated_at'

export async function getAvailableUsedClubs(): Promise<UsedClub[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('used_clubs_inventory')
    .select(CLUB_COLUMNS)
    .eq('available_for_sale', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching used clubs:', error)
    return []
  }

  return data || []
}

export async function getUsedClubById(id: string): Promise<UsedClub | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('used_clubs_inventory')
    .select(CLUB_COLUMNS)
    .eq('id', id)
    .eq('available_for_sale', true)
    .single()

  if (error || !data) return null
  return data
}

export async function getUsedClubIds(): Promise<string[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('used_clubs_inventory')
    .select('id')
    .eq('available_for_sale', true)

  if (error || !data) return []
  return data.map((c) => c.id)
}

export async function getRelatedClubs(club: UsedClub, limit = 3): Promise<UsedClub[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('used_clubs_inventory')
    .select(CLUB_COLUMNS)
    .eq('available_for_sale', true)
    .neq('id', club.id)
    .order('created_at', { ascending: false })
    .limit(limit * 3)

  if (error || !data) return []

  const scored = data.map((c) => ({
    club: c,
    score:
      (c.brand === club.brand ? 2 : 0) +
      (c.club_type === club.club_type ? 1 : 0) +
      (c.gender === club.gender ? 0.5 : 0),
  }))
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.club)
}
