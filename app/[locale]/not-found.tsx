import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const t = useTranslations('Common')

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center section-padding">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">{t('pageNotFound')}</h2>
      <p className="mt-2 text-muted-foreground">
        {t('pageNotFoundDescription')}
      </p>
      <Button asChild className="mt-8">
        <Link href="/">{t('goHome')}</Link>
      </Button>
    </div>
  )
}
