'use client'

import { useState, useMemo } from 'react'
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react'
import type { UsedClub } from '@/lib/clubs'

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'brand-az'

export interface FilterState {
  sort: SortOption
  type: string
  brand: string
  gender: string
  condition: string
}

export interface ClubFiltersLabels {
  sortLabel: string
  sortNewest: string
  sortPriceLow: string
  sortPriceHigh: string
  sortBrand: string
  filterType: string
  filterBrand: string
  filterGender: string
  filterCondition: string
  clearAll: string
  showingCount: string
  filtersLabel: string
}

interface ClubFiltersProps {
  clubs: UsedClub[]
  filters: FilterState
  filteredCount: number
  onChange: (filters: FilterState) => void
  labels: ClubFiltersLabels
}

const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  const isActive = value !== 'all'
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-8 sm:h-9 rounded-md border px-2 sm:px-2.5 text-[11px] sm:text-xs font-medium transition-colors cursor-pointer appearance-none bg-no-repeat pr-6 sm:pr-7 ${
        isActive
          ? 'border-primary/40 bg-primary/5 text-primary'
          : 'border-border/60 bg-white text-muted-foreground hover:border-border'
      }`}
      style={{ backgroundImage: chevronSvg, backgroundPosition: 'right 6px center' }}
      aria-label={label}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export default function ClubFilters({ clubs, filters, filteredCount, onChange, labels }: ClubFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const types = useMemo(() => {
    const set = new Set(clubs.map((c) => c.club_type))
    return Array.from(set).sort()
  }, [clubs])

  const brands = useMemo(() => {
    const counts = new Map<string, number>()
    clubs.forEach((c) => counts.set(c.brand, (counts.get(c.brand) || 0) + 1))
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([brand]) => brand)
  }, [clubs])

  const genders = useMemo(() => {
    const set = new Set(clubs.map((c) => c.gender))
    return Array.from(set).sort()
  }, [clubs])

  const conditions = useMemo(() => {
    const set = new Set(clubs.map((c) => c.condition))
    return Array.from(set).sort()
  }, [clubs])

  const update = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const activeFilters = Object.entries(filters).filter(
    ([key, val]) => key !== 'sort' && val !== 'all'
  ) as [string, string][]

  const activeCount = activeFilters.length

  const sortOptions = [
    { value: 'newest', label: labels.sortNewest },
    { value: 'price-asc', label: labels.sortPriceLow },
    { value: 'price-desc', label: labels.sortPriceHigh },
    { value: 'brand-az', label: labels.sortBrand },
  ]

  const filterLabelMap: Record<string, string> = {
    type: labels.filterType,
    brand: labels.filterBrand,
    gender: labels.filterGender,
    condition: labels.filterCondition,
  }

  const filterSelects = (
    <>
      <FilterSelect
        label={labels.filterType}
        value={filters.type}
        options={[{ value: 'all', label: labels.filterType }, ...types.map((t) => ({ value: t, label: t }))]}
        onChange={(v) => update('type', v)}
      />
      <FilterSelect
        label={labels.filterBrand}
        value={filters.brand}
        options={[{ value: 'all', label: labels.filterBrand }, ...brands.map((b) => ({ value: b, label: b }))]}
        onChange={(v) => update('brand', v)}
      />
      <FilterSelect
        label={labels.filterGender}
        value={filters.gender}
        options={[{ value: 'all', label: labels.filterGender }, ...genders.map((g) => ({ value: g, label: g }))]}
        onChange={(v) => update('gender', v)}
      />
      <FilterSelect
        label={labels.filterCondition}
        value={filters.condition}
        options={[{ value: 'all', label: labels.filterCondition }, ...conditions.map((c) => ({ value: c, label: c }))]}
        onChange={(v) => update('condition', v)}
      />
    </>
  )

  return (
    <div className="space-y-2">
      {/* Top row: sort + filter toggle (mobile) / inline filters (desktop) + count */}
      <div className="flex items-center gap-2">
        <select
          value={filters.sort}
          onChange={(e) => update('sort', e.target.value)}
          className="h-8 sm:h-9 rounded-md border border-border/60 bg-white px-2 sm:px-2.5 text-[11px] sm:text-xs font-medium text-muted-foreground cursor-pointer appearance-none bg-no-repeat pr-6 sm:pr-7"
          style={{ backgroundImage: chevronSvg, backgroundPosition: 'right 6px center' }}
          aria-label={labels.sortLabel}
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Mobile: filter toggle button */}
        <button
          type="button"
          className={`flex sm:hidden items-center gap-1.5 h-8 rounded-md border px-2.5 text-[11px] font-medium transition-colors ${
            activeCount > 0 ? 'border-primary/40 bg-primary/5 text-primary' : 'border-border/60 bg-white text-muted-foreground'
          }`}
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <SlidersHorizontal size={12} />
          {labels.filtersLabel}
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">{activeCount}</span>
          )}
          <ChevronDown size={10} className={`transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Desktop: inline filter selects */}
        <div className="hidden sm:contents">
          {filterSelects}
        </div>

        <span className="ml-auto text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
          {labels.showingCount.replace('__count__', String(filteredCount)).replace('__total__', String(clubs.length))}
        </span>
      </div>

      {/* Mobile: collapsible filter panel */}
      {mobileFiltersOpen && (
        <div className="flex flex-wrap gap-1.5 sm:hidden">
          {filterSelects}
        </div>
      )}

      {/* Active filter pills */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {activeFilters.map(([key, val]) => (
            <button
              key={key}
              type="button"
              onClick={() => update(key as keyof FilterState, 'all')}
              className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <span className="text-muted-foreground">{filterLabelMap[key]}:</span> {val}
              <X size={10} />
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChange({ sort: filters.sort, type: 'all', brand: 'all', gender: 'all', condition: 'all' })}
            className="text-[10px] sm:text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors underline"
          >
            {labels.clearAll}
          </button>
        </div>
      )}
    </div>
  )
}
