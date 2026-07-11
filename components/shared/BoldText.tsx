/** Renders a line of guide/FAQ body text with inline **bold** markdown */
export default function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-[#1a472a]">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}
