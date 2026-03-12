// Dynamic pricing fetch helper — pulls live prices from the forms app API
// Falls back gracefully if the API is unreachable

export interface PricingProduct {
  name: string
  price: number
}

export interface PricingCatalog {
  bayRates: {
    morning: PricingProduct[]
    afternoon: PricingProduct[]
    evening: PricingProduct[]
  }
  packages: PricingProduct[]
  coaching: PricingProduct[]
  clubRental: {
    indoor: Array<PricingProduct & { modifiers?: PricingProduct[] }>
    course: Array<PricingProduct & { modifiers?: PricingProduct[] }>
    addons: PricingProduct[]
  }
  mixedPackages: PricingProduct[]
  drinksAndGolf: PricingProduct[]
  events: PricingProduct[]
  fetchedAt: string
}

const PRICING_API =
  process.env.NEXT_PUBLIC_PRICING_API_URL || 'https://lengolf-forms.vercel.app/api/pricing'

export async function getPricingCatalog(): Promise<PricingCatalog | null> {
  try {
    const res = await fetch(PRICING_API, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error(`Pricing API ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('[pricing] Failed to fetch pricing catalog, using fallback defaults:', err)
    return null
  }
}

/** Format a number as "X,XXX THB" */
export function formatThb(price: number): string {
  return `${price.toLocaleString('en-US')} THB`
}

/** Find a product price by regex match on name */
export function findPrice(products: PricingProduct[], pattern: RegExp): number | undefined {
  return products.find((p) => pattern.test(p.name))?.price
}
