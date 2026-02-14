export interface AqiBand {
  min: number
  max: number
  label: string
  bgColor: string
  accentColor: string
  borderColor: string
  golfMessage: string
  healthTip: string
}

export const AQI_BANDS: AqiBand[] = [
  {
    min: 0,
    max: 50,
    label: 'Excellent',
    bgColor: '#f0faf4',
    accentColor: '#007429',
    borderColor: '#c6e9d4',
    golfMessage: 'Perfect day to hit the range — swing by LENGOLF to warm up',
    healthTip: 'Air quality is great. Enjoy your round!',
  },
  {
    min: 51,
    max: 100,
    label: 'Moderate',
    bgColor: '#fefce8',
    accentColor: '#a16207',
    borderColor: '#fde68a',
    golfMessage: 'Good conditions for a session',
    healthTip: 'Acceptable for most people.',
  },
  {
    min: 101,
    max: 150,
    label: 'Unhealthy for Sensitive Groups',
    bgColor: '#fff7ed',
    accentColor: '#c2410c',
    borderColor: '#fed7aa',
    golfMessage: 'Indoor golf keeps you comfortable',
    healthTip: 'Sensitive groups should consider indoor activities.',
  },
  {
    min: 151,
    max: 200,
    label: 'Unhealthy',
    bgColor: '#fef2f2',
    accentColor: '#dc2626',
    borderColor: '#fecaca',
    golfMessage: 'Skip the outdoor course — play indoors',
    healthTip: 'Health effects possible outdoors for everyone.',
  },
  {
    min: 201,
    max: 300,
    label: 'Very Unhealthy',
    bgColor: '#faf5ff',
    accentColor: '#7c3aed',
    borderColor: '#e9d5ff',
    golfMessage: 'Stay indoors — perfect time for simulator golf',
    healthTip: 'Avoid outdoor activities.',
  },
  {
    min: 301,
    max: 999,
    label: 'Hazardous',
    bgColor: '#4a0404',
    accentColor: '#991b1b',
    borderColor: '#7f1d1d',
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

export function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}
