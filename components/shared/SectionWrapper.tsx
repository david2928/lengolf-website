import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
}

export default function SectionWrapper({ children, className, id, dark }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 lg:py-24',
        dark && 'bg-secondary text-white',
        className
      )}
    >
      <div className="section-max-width section-padding">
        {children}
      </div>
    </section>
  )
}
