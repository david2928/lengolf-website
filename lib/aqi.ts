export interface AqiBand {
  min: number
  max: number
  key: string
  label: string
  bgColor: string
  accentColor: string
  borderColor: string
  golfMessage: string
  healthTip: string
}

// Thailand PCD AQI bands (Pollution Control Department)
export const AQI_BANDS: AqiBand[] = [
  {
    min: 0,
    max: 25,
    key: 'VeryGood',
    label: 'Very Good',
    bgColor: '#f0faf4',
    accentColor: '#007429',
    borderColor: '#c6e9d4',
    golfMessage: 'Perfect day to hit the range — swing by LENGOLF to warm up',
    healthTip: 'Air quality is excellent. Enjoy your round!',
  },
  {
    min: 26,
    max: 50,
    key: 'Good',
    label: 'Good',
    bgColor: '#eff6ff',
    accentColor: '#2563eb',
    borderColor: '#bfdbfe',
    golfMessage: 'Great conditions for a session',
    healthTip: 'Air quality is satisfactory.',
  },
  {
    min: 51,
    max: 100,
    key: 'Moderate',
    label: 'Moderate',
    bgColor: '#fefce8',
    accentColor: '#a16207',
    borderColor: '#fde68a',
    golfMessage: 'Good conditions — indoor golf keeps you comfortable',
    healthTip: 'Acceptable for most people.',
  },
  {
    min: 101,
    max: 200,
    key: 'Unhealthy',
    label: 'Unhealthy',
    bgColor: '#fff7ed',
    accentColor: '#c2410c',
    borderColor: '#fed7aa',
    golfMessage: 'Skip the outdoor course — play indoors',
    healthTip: 'Health effects possible. Consider indoor activities.',
  },
  {
    min: 201,
    max: 999,
    key: 'Hazardous',
    label: 'Hazardous',
    bgColor: '#fef2f2',
    accentColor: '#dc2626',
    borderColor: '#fecaca',
    golfMessage: 'Stay indoors — simulator golf in clean, filtered air',
    healthTip: 'Serious health risk. Stay indoors.',
  },
]

export function getBand(aqi: number): AqiBand {
  return AQI_BANDS.find(b => aqi >= b.min && aqi <= b.max) || AQI_BANDS[AQI_BANDS.length - 1]
}

export interface AqiApiResponse {
  aqi: number
  category: string
  dominantPollutant: string
  healthTip: string
  updatedAt: string
}

const POLLUTANT_NAMES: Record<string, string> = {
  pm25: 'PM2.5',
  pm10: 'PM10',
  o3: 'Ozone',
  no2: 'NO\u2082',
  so2: 'SO\u2082',
  co: 'CO',
}

export function formatPollutant(code: string): string {
  return POLLUTANT_NAMES[code.toLowerCase()] || code
}

export function formatTime(iso: string, locale?: string): string {
  const d = new Date(iso)
  const loc = locale === 'th' ? 'th-TH' : 'en-US'
  return d.toLocaleTimeString(loc, { hour: 'numeric', minute: '2-digit', hour12: true })
}
