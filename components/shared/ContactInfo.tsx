import { Phone, Mail, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { BUSINESS_INFO } from '@/lib/constants'

export default async function ContactInfo() {
  const t = await getTranslations('ContactInfo')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold lg:text-3xl">{t('title')}</h2>
      <p className="text-muted-foreground whitespace-pre-line">
        {t('subtitle')}
      </p>
      <div className="space-y-4">
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium">{BUSINESS_INFO.phone}</span>
        </a>
        <a
          href={`mailto:${BUSINESS_INFO.email}`}
          className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium">{BUSINESS_INFO.email}</span>
        </a>
        <a
          href={BUSINESS_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium">{t('address')}</span>
        </a>
      </div>
    </div>
  )
}
