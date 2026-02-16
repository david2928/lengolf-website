'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactForm() {
  const t = useTranslations('ContactForm')
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
      message: formData.get('message') as string,
      page_source: 'about-us',
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitted(true)
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
          <Label htmlFor="contact-name">{t('name')}</Label>
          <Input id="contact-name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">{t('email')}</Label>
          <Input id="contact-email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-phone">{t('phoneNumber')}</Label>
          <Input id="contact-phone" name="phone" type="tel" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{t('message')}</Label>
        <Textarea id="contact-message" name="message" rows={5} required />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t('sending') : t('sendMessage')}
      </Button>
    </form>
  )
}
