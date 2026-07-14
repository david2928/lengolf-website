import { createClient } from '@/lib/supabase/client'

export interface WebsitePromotion {
  id: string
  image_url: string
  title_en: string
  title_th: string
  description_en: string
  display_order: number
}

interface PromotionsSplit {
  gridPromotions: WebsitePromotion[]
  monthlyPackagesPromo: WebsitePromotion | null
}

/**
 * Fetch active, customer-facing promotions for the website.
 * Returns promotions split into two groups:
 * - gridPromotions: shown in the "Our Promotions" 2x2 grid
 * - monthlyPackagesPromo: shown separately in the Monthly Packages section
 *
 * The `promotions` table exists in the shared Supabase project but is not in the
 * website's generated types (which only cover blog_posts, location_pages, contact_submissions).
 */
export async function getWebsitePromotions(): Promise<PromotionsSplit> {
  const supabase = createClient()

  const { data, error } = await (supabase as unknown as { from: (table: string) => ReturnType<typeof supabase.from> })
    .from('promotions')
    .select('id, image_url, title_en, title_th, description_en, display_order')
    .eq('is_active', true)
    .eq('is_customer_facing', true)
    .or('valid_until.is.null,valid_until.gt.' + new Date().toISOString())
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching promotions:', error)
    return { gridPromotions: [], monthlyPackagesPromo: null }
  }

  const all = (data as unknown as WebsitePromotion[]) || []
  const monthlyPackagesPromo = all.find(p => p.title_en === 'Monthly Packages') || null
  const gridPromotions = all.filter(p => p.title_en !== 'Monthly Packages')

  return { gridPromotions, monthlyPackagesPromo }
}
