'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function EventInquiryForm() {
  const t = useTranslations('EventInquiryForm')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      message: formData.get('message') as string,
      page_source: 'events',
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitted(true)
        // Push event to GTM dataLayer for Google Ads conversion tracking
        const w = window as typeof window & { dataLayer?: Record<string, unknown>[] }
        if (w.dataLayer) {
          w.dataLayer.push({
            event: 'event_inquiry_submitted',
            event_category: 'lead',
            event_label: data.company || 'individual',
          })
        }
      }
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-primary/10 p-8 text-center">
        <h3 className="text-xl font-semibold text-primary">{t('thankYou')}</h3>
        <p className="mt-2 text-muted-foreground">{t('thankYouMessage')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t('yourName')}</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('yourEmail')}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t('phoneNumber')}</Label>
          <Input id="phone" name="phone" type="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">{t('company')}</Label>
          <Input id="company" name="company" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t('messagePlaceholder')}</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t('sending') : t('sendInquiry')}
      </Button>
    </form>
  )
}
