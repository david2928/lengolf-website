'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { storageUrl } from '@/lib/constants'

export default function FloorPlanDialog() {
  const t = useTranslations('FloorPlan')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
          {t('floorPlan')}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto p-2 sm:p-4">
        <Image
          src={storageUrl('events/floorplan.jpg')}
          alt="LENGOLF venue floor plan showing 4 simulator bays, bar area, seating, and putting green"
          width={1200}
          height={900}
          className="w-full rounded-md"
          sizes="(max-width: 896px) 95vw, 896px"
        />
      </DialogContent>
    </Dialog>
  )
}
