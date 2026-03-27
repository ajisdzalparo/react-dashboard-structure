/**
 * Utility function untuk conditional className merging
 * Mirip dengan classnames library tapi lebih ringan
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((c) => typeof c === 'string')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}
