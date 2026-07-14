/**
 * Shared formatting utilities — importable from both server and client components.
 * No 'server-only' guard so client components (CourseMapExplorer etc.) can use these.
 */

/** Format a THB fee as "1,000 THB", or null if the value is not set. */
export function formatFee(n: number | null): string | null {
  if (n === null) return null
  return n.toLocaleString('en-US') + ' THB'
}

/**
 * Format a drive time (in minutes) from Bangkok in a human-readable way.
 * Converts ≥120 min to hours to avoid displaying "~660 min" for distant courses.
 *
 * @param min        - drive time in minutes, or null
 * @param withSuffix - append " from Bangkok" (use true for hero chips / sidebar,
 *                     false for stat cards and compact table cells)
 */
export function driveTimeLabel(min: number | null, withSuffix = true): string | null {
  if (!min) return null
  const val = min >= 120 ? `~${Math.round(min / 60)}h` : `~${min} min`
  return withSuffix ? `${val} from Bangkok` : val
}
