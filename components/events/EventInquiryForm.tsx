'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { BUSINESS_INFO } from '@/lib/constants'

const selectClassName =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'

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
      event_type: formData.get('event_type') as string,
      group_size: formData.get('group_size') as string,
      preferred_date: formData.get('preferred_date') as string,
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

  const required = <span className="text-red-500 ml-0.5">*</span>

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t('yourName')}{required}</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('yourEmail')}{required}</Label>
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
        <div className="space-y-2">
          <Label htmlFor="event_type">{t('eventType')}</Label>
          <select id="event_type" name="event_type" className={selectClassName} defaultValue="">
            <option value="" disabled>{t('eventTypeDefault')}</option>
            <option value="corporate">{t('eventTypeCorporate')}</option>
            <option value="party">{t('eventTypeParty')}</option>
            <option value="team_building">{t('eventTypeTeamBuilding')}</option>
            <option value="meet_greet">{t('eventTypeMeetGreet')}</option>
            <option value="birthday">{t('eventTypeBirthday')}</option>
            <option value="filming">{t('eventTypeFilming')}</option>
            <option value="other">{t('eventTypeOther')}</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="group_size">{t('groupSize')}</Label>
          <select id="group_size" name="group_size" className={selectClassName} defaultValue="">
            <option value="" disabled>{t('groupSizeDefault')}</option>
            <option value="under_10">{t('groupSize10')}</option>
            <option value="10_20">{t('groupSize10_20')}</option>
            <option value="20_30">{t('groupSize20_30')}</option>
            <option value="30_50">{t('groupSize30_50')}</option>
            <option value="50_plus">{t('groupSize50')}</option>
          </select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferred_date">{t('preferredDate')}</Label>
          <Input id="preferred_date" name="preferred_date" type="date" min={new Date().toISOString().split('T')[0]} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t('messagePlaceholder')}{required}</Label>
        <Textarea id="message" name="message" rows={4} required />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t('sending') : t('sendInquiry')}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {t('responseNote')}
        {' · '}
        {t('urgentNote')}{' '}
        <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="font-medium text-primary hover:underline">
          {BUSINESS_INFO.phone}
        </a>
      </p>
    </form>
  )
}
