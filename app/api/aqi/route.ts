import { NextResponse } from 'next/server'
import { BUSINESS_INFO } from '@/lib/constants'
import type { AqiApiResponse } from '@/lib/aqi'

interface CachedAqi {
  data: AqiApiResponse
  timestamp: number
}

let cache: CachedAqi | null = null
const CACHE_TTL = 45 * 60 * 1000 // 45 minutes

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
    })
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(
      `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: {
            latitude: BUSINESS_INFO.coordinates.lat,
            longitude: BUSINESS_INFO.coordinates.lng,
          },
          universalAqi: true,
          extraComputations: ['HEALTH_RECOMMENDATIONS', 'LOCAL_AQI'],
        }),
      }
    )

    if (!res.ok) {
      throw new Error(`Google API responded ${res.status}`)
    }

    const raw = await res.json()

    // Prefer Thailand PCD AQI (official Thai index), fall back to UAQI
    const pcdIndex = raw.indexes?.find(
      (idx: { code: string }) => idx.code === 'tha_pcd'
    )
    const aqiIndex = pcdIndex || raw.indexes?.find(
      (idx: { code: string }) => idx.code === 'uaqi'
    ) || raw.indexes?.[0]

    const data: AqiApiResponse = {
      aqi: aqiIndex?.aqi ?? 0,
      category: aqiIndex?.category ?? 'Unknown',
      dominantPollutant: aqiIndex?.dominantPollutant ?? '',
      healthTip: raw.healthRecommendations?.generalPopulation ?? '',
      updatedAt: new Date().toISOString(),
    }

    cache = { data, timestamp: Date.now() }

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
    })
  } catch (error) {
    console.error('AQI fetch error:', error)

    // Return stale cache if available
    if (cache) {
      return NextResponse.json(cache.data, {
        headers: { 'X-AQI-Stale': 'true' },
      })
    }

    return NextResponse.json({ error: 'Unable to fetch air quality data' }, { status: 502 })
  }
}
