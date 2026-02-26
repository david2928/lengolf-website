'use client'

import { useState, useMemo, useCallback } from 'react'
import ClubCard from './ClubCard'
import ClubFilters from './ClubFilters'
import type { ClubCardLabels } from './ClubCard'
import type { ClubFiltersLabels, FilterState, SortOption } from './ClubFilters'
import type { UsedClub } from '@/lib/clubs'
import { MessageCircle } from 'lucide-react'

export type GridLabels = ClubCardLabels & ClubFiltersLabels & {
  noResults: string
  emptyStateTitle: string
  emptyStateText: string
  emptyStateCta: string
}

const DEFAULT_FILTERS: FilterState = {
  sort: 'newest',
  type: 'all',
  brand: 'all',
  gender: 'all',
  condition: 'all',
}

function sortClubs(clubs: UsedClub[], sort: SortOption): UsedClub[] {
  const sorted = [...clubs]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'brand-az':
      return sorted.sort((a, b) => a.brand.localeCompare(b.brand))
    default:
      return sorted
  }
}

export default function UsedClubsGrid({ clubs, labels }: { clubs: UsedClub[]; labels: GridLabels }) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const filteredClubs = useMemo(() => {
    let result = clubs
    if (filters.type !== 'all') result = result.filter((c) => c.club_type === filters.type)
    if (filters.brand !== 'all') result = result.filter((c) => c.brand === filters.brand)
    if (filters.gender !== 'all') result = result.filter((c) => c.gender === filters.gender)
    if (filters.condition !== 'all') result = result.filter((c) => c.condition === filters.condition)
    return sortClubs(result, filters.sort)
  }, [clubs, filters])

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const lineUrl = `https://line.me/R/oaMessage/%40lengolf/?${encodeURIComponent("Hi LENGOLF! I'm interested in your second-hand golf clubs. What sets do you have available?")}`

  if (clubs.length === 0) {
    return (
      <div className="mx-auto max-w-md text-center rounded-xl border border-border/60 bg-white p-10">
        <MessageCircle className="mx-auto mb-4 text-primary/40" size={40} />
        <h3 className="mb-2 text-lg font-bold text-foreground">{labels.emptyStateTitle}</h3>
        <p className="mb-6 text-sm text-muted-foreground">{labels.emptyStateText}</p>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#00B900' }}
        >
          <MessageCircle size={15} />
          {labels.emptyStateCta}
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ClubFilters
        clubs={clubs}
        filters={filters}
        filteredCount={filteredClubs.length}
        onChange={handleFilterChange}
        labels={labels}
      />

      {filteredClubs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{labels.noResults}</p>
          <button
            type="button"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="mt-3 text-sm font-medium underline"
            style={{ color: '#007429' }}
          >
            {labels.clearAll}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} labels={labels} />
          ))}
        </div>
      )}
    </div>
  )
}
