'use client'

import { useState, useMemo, useCallback } from 'react'
import { MessageCircle, Mail, Check } from 'lucide-react'

interface AddOn {
  key: string
  label: string
  price: string
  priceNum: number
}

/** Extract number from price string like "1,200 THB" → 1200 */
function parsePrice(s: string): number {
  const match = s.replace(/,/g, '').match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

interface RentalInquiryFormProps {
  labels: {
    title: string
    subtitle: string
    clubLabel: string
    clubPlaceholder: string
    dateLabel: string
    durationLabel: string
    deliveryLabel: string
    deliveryYes: string
    deliveryNo: string
    addressLabel: string
    addressPlaceholder: string
    addOnsLabel: string
    estimatedTotalLabel: string
    deliveryFeeNum: number
    lineButton: string
    emailButton: string
    copiedToast: string
    clubOptions: { value: string; tier: 'premium' | 'premiumPlus'; label: string }[]
    durationOptions: { value: string; label: string; premium: string; premiumPlus: string }[]
    addOns: AddOn[]
  }
  lineFallbackUrl: string
  lineOaMessageUrl: string
  email: string
}

function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export default function RentalInquiryForm({ labels, lineFallbackUrl, lineOaMessageUrl, email }: RentalInquiryFormProps) {
  const [club, setClub] = useState('')
  const [date, setDate] = useState('')
  const [duration, setDuration] = useState(labels.durationOptions[0]?.value || '1')
  const [delivery, setDelivery] = useState(false)
  const [address, setAddress] = useState('')
  const [copied, setCopied] = useState(false)
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set())

  const selectedClub = labels.clubOptions.find((c) => c.value === club)
  const tier = selectedClub?.tier || 'premium'
  const selectedDuration = labels.durationOptions.find((d) => d.value === duration)

  const toggleAddOn = (key: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const priceForDuration = (opt: { premium: string; premiumPlus: string }) =>
    tier === 'premiumPlus' ? opt.premiumPlus : opt.premium

  const message = useMemo(() => {
    const clubLabel = selectedClub?.label || '___'
    const price = selectedDuration ? priceForDuration(selectedDuration) : '___'
    const addOnsList = labels.addOns.filter((a) => selectedAddOns.has(a.key)).map((a) => `${a.label} (${a.price})`).join(', ')
    const lines = [
      'Hi LENGOLF! I\'d like to hire golf clubs for an off-site round.',
      `Clubs: ${clubLabel}`,
      `Date: ${date || '___'}`,
      `Duration: ${selectedDuration?.label || '___'} (${price})`,
      `Delivery: ${delivery ? `Yes — ${address || '(address TBC)'}` : 'No, I\'ll pick up'}`,
    ]
    if (addOnsList) lines.push(`Add-ons: ${addOnsList}`)
    return lines.join('\n')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [club, date, delivery, address, selectedClub, selectedDuration, selectedAddOns, labels.addOns])

  const handleLineClick = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile()) {
      e.preventDefault()
      window.location.href = `${lineOaMessageUrl}/?${encodeURIComponent(message)}`
      return
    }
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback: still proceed even if clipboard fails
    }
    window.open(lineFallbackUrl, '_blank', 'noopener,noreferrer')
  }, [message, lineOaMessageUrl, lineFallbackUrl])

  const emailUrl = `mailto:${email}?subject=${encodeURIComponent('Club Rental Inquiry')}&body=${encodeURIComponent(message)}`
  const minDate = new Date().toISOString().split('T')[0]

  return (
    <div className="rounded-2xl border border-primary/20 bg-white p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold mb-1" style={{ color: '#007429' }}>{labels.title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{labels.subtitle}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Club selection */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1.5">{labels.clubLabel}</label>
          <select
            value={club}
            onChange={(e) => setClub(e.target.value)}
            className="w-full rounded-md border border-border/60 bg-white px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">{labels.clubPlaceholder}</option>
            {labels.clubOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{labels.dateLabel}</label>
          <input
            type="date"
            value={date}
            min={minDate}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-md border border-border/60 bg-white px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Duration — shows price based on selected club tier */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{labels.durationLabel}</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-md border border-border/60 bg-white px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {labels.durationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} — {priceForDuration(opt)}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery toggle */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1.5">{labels.deliveryLabel}</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setDelivery(false)}
              className={`flex-1 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                !delivery
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/60 bg-white text-muted-foreground hover:bg-muted/30'
              }`}
            >
              {labels.deliveryNo}
            </button>
            <button
              type="button"
              onClick={() => setDelivery(true)}
              className={`flex-1 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
                delivery
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border/60 bg-white text-muted-foreground hover:bg-muted/30'
              }`}
            >
              {labels.deliveryYes}
            </button>
          </div>
        </div>

        {/* Address (shown when delivery selected) */}
        {delivery && (
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1.5">{labels.addressLabel}</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={labels.addressPlaceholder}
              className="w-full rounded-md border border-border/60 bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        )}

        {/* Add-ons */}
        {labels.addOns.length > 0 && (
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1.5">{labels.addOnsLabel}</label>
            <div className="flex flex-wrap gap-2">
              {labels.addOns.map((addon) => (
                <button
                  key={addon.key}
                  type="button"
                  onClick={() => toggleAddOn(addon.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selectedAddOns.has(addon.key)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/60 bg-white text-muted-foreground hover:bg-muted/30'
                  }`}
                >
                  {addon.label} — <span className="font-semibold">{addon.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Estimated total */}
      {club && (
        <div className="mt-5 rounded-lg bg-primary/5 border border-primary/15 px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{labels.estimatedTotalLabel}</span>
            <span className="text-xl font-bold" style={{ color: '#007429' }}>
              {(() => {
                const rentalPrice = selectedDuration ? parsePrice(priceForDuration(selectedDuration)) : 0
                const deliveryPrice = delivery ? labels.deliveryFeeNum : 0
                const addOnsPrice = labels.addOns.filter((a) => selectedAddOns.has(a.key)).reduce((sum, a) => sum + a.priceNum, 0)
                const total = rentalPrice + deliveryPrice + addOnsPrice
                return `${total.toLocaleString()} THB`
              })()}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
            <span>{selectedDuration?.label}: {selectedDuration ? priceForDuration(selectedDuration) : '—'}</span>
            {delivery && <span>Delivery: 500 THB</span>}
            {labels.addOns.filter((a) => selectedAddOns.has(a.key)).map((a) => (
              <span key={a.key}>{a.label}: {a.price}</span>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <a
          href={lineFallbackUrl}
          onClick={handleLineClick}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#00B900' }}
        >
          <MessageCircle size={16} />
          {labels.lineButton}
        </a>
        <a
          href={emailUrl}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md border-2 border-primary px-6 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          <Mail size={16} />
          {labels.emailButton}
        </a>
      </div>

      {/* Copied toast */}
      {copied && (
        <div className="mt-3 flex items-center gap-2 rounded-md bg-primary/10 px-4 py-2.5 text-sm text-primary">
          <Check size={16} />
          {labels.copiedToast}
        </div>
      )}
    </div>
  )
}
