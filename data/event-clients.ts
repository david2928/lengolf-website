export interface EventClient {
  name: string
  logo: string
  width: number
  height: number
  className?: string // override default h-8 lg:h-10
}

export const eventClients: EventClient[] = [
  { name: 'Agoda', logo: 'logos/clients/agoda.svg', width: 200, height: 80 },
  { name: 'Garmin', logo: 'logos/clients/garmin.svg', width: 200, height: 80 },
  { name: 'TikTok', logo: 'logos/clients/tiktok.svg', width: 200, height: 80 },
  { name: 'Huawei', logo: 'logos/clients/huawei.svg', width: 200, height: 80 },
  { name: 'AWS', logo: 'logos/clients/aws.svg', width: 200, height: 80 },
  { name: 'Epson', logo: 'logos/clients/epson.svg', width: 200, height: 80 },
  { name: 'Texas Instruments', logo: 'logos/clients/texas-instruments.svg', width: 200, height: 80 },
  { name: 'Klook', logo: 'logos/clients/klook.svg', width: 200, height: 80 },
  { name: 'BenQ', logo: 'logos/clients/benq.svg', width: 200, height: 80 },
  { name: 'Shopee', logo: 'logos/clients/shopee.svg', width: 200, height: 80, className: 'h-12 lg:h-14' },
]

export const instagramPosts = [
  'DHLdIiGB9DD',
  'DIqupX6s2x6',
  'DNX_umNAT0X',
  'DP6OK2zlXMR',
]
