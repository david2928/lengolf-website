interface Props {
  category: string | null
  labelMap?: Record<string, string>
}

export default function CategoryPill({ category, labelMap }: Props) {
  if (!category) return null
  const label = (labelMap && labelMap[category]) ?? category
  return (
    <span
      className="inline-block rounded-full px-3 py-0.5 text-xs font-medium"
      style={{ backgroundColor: '#E6F4EC', color: '#005a32' }}
    >
      {label}
    </span>
  )
}
