interface TrustBarProps {
  deliveryLabel: string
  stat1Value: string
  stat1Label: string
  stat2Value: string
  stat2Label: string
  stat3Value: string
  stat3Label: string
  stat4Value: string
  stat4Label: string
  approxCurrency?: string | null
}

export default function TrustBar({
  deliveryLabel,
  stat1Value,
  stat1Label,
  stat2Value,
  stat2Label,
  stat3Value,
  stat3Label,
  stat4Value,
  stat4Label,
  approxCurrency,
}: TrustBarProps) {
  return (
    <section style={{ backgroundColor: '#005a32' }} className="py-6">
      <div className="section-max-width section-padding">
        {/* Stat chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {/* Price chip — show local currency prominently if available */}
          <div className="flex flex-col items-center rounded-full bg-white/10 px-4 py-1.5 text-white">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold">{stat1Value}</span>
              <span className="text-xs text-white/80">{stat1Label}</span>
            </div>
            {approxCurrency && (
              <span className="text-xs font-semibold text-yellow-300">{approxCurrency}</span>
            )}
          </div>
          {[
            { value: stat2Value, label: stat2Label },
            { value: stat3Value, label: stat3Label },
            { value: stat4Value, label: stat4Label },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-white"
            >
              <span className="text-sm font-bold">{value}</span>
              <span className="text-xs text-white/80">{label}</span>
            </div>
          ))}
        </div>

        {/* Delivery note */}
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-white/60">
          {deliveryLabel}
        </p>
      </div>
    </section>
  )
}
