import BoldText from '@/components/shared/BoldText'

// Markdown table separator row: |---|---| (any dash count). Alignment
// colons (|:---:|) are accepted but ignored — every column renders left.
const SEPARATOR_RE = /^\|(\s*:?-+:?\s*\|)+$/

// Only full |-delimited rows count — inline pipes in prose lines
// ("**January** | 24–32°C | ...") must keep rendering as text.
function isTableRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.length > 1 && trimmed.startsWith('|') && trimmed.endsWith('|')
}

/**
 * A body paragraph is a markdown pipe table when every line is a |-delimited
 * row and the second line is the |---|---| separator.
 */
export function isMarkdownTableBlock(lines: string[]): boolean {
  return (
    lines.length >= 2 &&
    lines.every(isTableRow) &&
    SEPARATOR_RE.test(lines[1].trim())
  )
}

function splitCells(row: string): string[] {
  return row
    .trim()
    .slice(1, -1)
    .split('|')
    .map((cell) => cell.trim())
}

function cellPadding(index: number, count: number): string {
  if (index === 0) return 'py-3 pr-4'
  if (index === count - 1) return 'py-3 pl-4'
  return 'py-3 px-4'
}

/** Renders a markdown pipe-table block (validate with isMarkdownTableBlock) */
export default function MarkdownTable({ lines }: { lines: string[] }) {
  const header = splitCells(lines[0])
  const rows = lines.slice(2).map(splitCells)
  return (
    // not-prose keeps table chrome identical inside FaqPage's prose wrapper
    <div className="not-prose overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-[#2d6a4f]">
            {header.map((cell, i) => (
              <th
                key={i}
                className={`${cellPadding(i, header.length)} text-left font-semibold text-[#1a472a]`}
              >
                <BoldText text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, r) => (
            <tr key={r} className="border-b border-border">
              {cells.map((cell, c) => (
                <td
                  key={c}
                  className={`${cellPadding(c, cells.length)} ${
                    c === 0 ? 'font-medium text-[#1a472a]' : 'text-muted-foreground'
                  }`}
                >
                  <BoldText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
