import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export interface CrossLink {
  label: string
  href: string
  description?: string
}

interface Props {
  heading: string
  items: CrossLink[]
}

/**
 * Reusable "Also see" block — renders a labelled grid of cards linking to
 * other programmatic-SEO pages. Used on every page in workstream A as well
 * as the existing course detail page (to weave the new pages into the
 * existing course detail experience).
 */
export default function CrossLinkBlock({ heading, items }: Props) {
  if (items.length === 0) return null

  return (
    <div>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
        {heading}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-px hover:border-primary/30 hover:shadow-md"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                {item.label}
              </p>
              {item.description && (
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  )
}
