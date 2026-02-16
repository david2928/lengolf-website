import { Link } from '@/i18n/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqLinkStyle = 'font-medium underline underline-offset-2 hover:text-primary transition-colors'

export type FaqLink = { href: string; external?: boolean }

function renderFaqAnswer(answer: string, links: Record<string, FaqLink>) {
  const keys = Object.keys(links)
  if (keys.length === 0) return answer

  const pattern = new RegExp(`(${keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  const parts = answer.split(pattern)
  return parts.map((part, i) => {
    const link = links[part]
    if (link) {
      if (link.external) {
        return <a key={i} href={link.href} className={faqLinkStyle} target="_blank" rel="noopener noreferrer">{part}</a>
      }
      return <Link key={i} href={link.href} className={faqLinkStyle}>{part}</Link>
    }
    return part
  })
}

interface FaqSectionProps {
  items: { question: string; answer: string }[]
  links?: Record<string, FaqLink>
  title: string
  titleSuffix: string
  bgColor?: string
}

export default function FaqSection({ items, links = {}, title, titleSuffix, bgColor }: FaqSectionProps) {
  return (
    <section className="py-16 lg:py-24" style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className="section-max-width section-padding">
        <h2 className="mb-10 text-center text-3xl font-bold italic lg:text-4xl">
          <span style={{ color: '#007429' }}>{title}</span>{' '}
          <span className="text-foreground">{titleSuffix}</span>
        </h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60 px-1">
                <AccordionTrigger className="text-left font-semibold py-5 hover:no-underline" style={{ color: '#007429' }}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {renderFaqAnswer(item.answer, links)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
