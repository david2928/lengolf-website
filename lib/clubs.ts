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

// ── Rental Club Set Pricing (from DB) ──

export interface RentalPricingRow {
  duration: string
  premium: string
  premiumPlus: string
  note?: string
}

interface RentalClubSetRow {
  tier: string
  indoor_price_1h: string | null
  indoor_price_2h: string | null
  indoor_price_3h: string | null
  indoor_price_4h: string | null
  indoor_price_5h: string | null
  course_price_1d: string | null
  course_price_3d: string | null
  course_price_7d: string | null
  course_price_14d: string | null
}

function formatThb(value: string | null): string {
  if (!value) return '—'
  const num = parseFloat(value)
  return num >= 1000 ? `${num.toLocaleString('en-US')} THB` : `${num} THB`
}

export async function getRentalClubPricing(): Promise<{
  indoor: RentalPricingRow[]
  course: RentalPricingRow[]
}> {
  const supabase = createClient()

  const { data, error } = await (supabase
    .from('rental_club_sets' as 'used_clubs_inventory')
    .select('tier, indoor_price_1h, indoor_price_2h, indoor_price_3h, indoor_price_4h, indoor_price_5h, course_price_1d, course_price_3d, course_price_7d, course_price_14d')
    .eq('is_active' as 'available_for_sale', true) as unknown as Promise<{ data: RentalClubSetRow[] | null; error: unknown }>)

  if (error || !data) {
    console.error('Error fetching rental pricing:', error)
    return { indoor: [], course: [] }
  }

  const premium = data.find((r) => r.tier === 'premium')
  const premiumPlus = data.find((r) => r.tier === 'premium-plus')

  if (!premium || !premiumPlus) {
    return { indoor: [], course: [] }
  }

  const indoorDurations: { key: keyof RentalClubSetRow; label: string }[] = [
    { key: 'indoor_price_1h', label: '1 Hour' },
    { key: 'indoor_price_2h', label: '2 Hours' },
    { key: 'indoor_price_3h', label: '3 Hours' },
    { key: 'indoor_price_4h', label: '4 Hours' },
    { key: 'indoor_price_5h', label: '5 Hours' },
  ]

  const indoor: RentalPricingRow[] = indoorDurations
    .filter((d) => premium[d.key] && premiumPlus[d.key])
    .map((d) => ({
      duration: d.label,
      premium: formatThb(premium[d.key]),
      premiumPlus: formatThb(premiumPlus[d.key]),
    }))

  const courseNotes: Record<string, string> = {
    course_price_3d: 'Pay 2, get 1 free',
    course_price_7d: 'Pay 4, get 3 free',
    course_price_14d: 'Pay 7, get 7 free',
  }

  const courseDurations: { key: keyof RentalClubSetRow; label: string }[] = [
    { key: 'course_price_1d', label: '1 Day' },
    { key: 'course_price_3d', label: '3 Days' },
    { key: 'course_price_7d', label: '7 Days' },
    { key: 'course_price_14d', label: '14 Days' },
  ]

  const course: RentalPricingRow[] = courseDurations
    .filter((d) => premium[d.key] && premiumPlus[d.key])
    .map((d) => ({
      duration: d.label,
      premium: formatThb(premium[d.key]),
      premiumPlus: formatThb(premiumPlus[d.key]),
      note: courseNotes[d.key],
    }))

  return { indoor, course }
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
