import { createClient } from '@/lib/supabase/client'

export interface UsedClub {
  id: string
  brand: string
  model: string | null
  club_type: string
  gender: string
  condition: string
  price: number
  /** Internal cost — price we paid to acquire the club (THB). Not shown to customers. */
  cost: number | null
  description: string | null
  image_url: string | null
  /** Whether the club is currently listed for sale */
  available_for_sale: boolean
  /** Whether the club can also be rented out */
  available_for_rental: boolean
  /** Optional set this club belongs to */
  set_id: string | null
  created_at: string
  updated_at: string
}

export async function getAvailableUsedClubs(): Promise<UsedClub[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('used_clubs_inventory')
    .select('*')
    .eq('available_for_sale', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching used clubs:', error)
    return []
  }

  return data || []
}
