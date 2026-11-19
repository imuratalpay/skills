/**
 * The motion tokens in app/globals.css, read from TS for motion/react and timers. Read them when the
 * motion starts, not at import: reduced motion zeroes the duration tokens, and only a fresh read sees it.
 */
const read = (name: string) =>
  typeof window === "undefined" ? "" : getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** A duration token in milliseconds: "150ms" → 150, "60s" → 60000. */
export function ms(name: string) {
  const v = read(name);
  return v.endsWith("ms") ? parseFloat(v) : (parseFloat(v) || 0) * 1000;
}

/** A duration token in seconds, the unit motion/react takes. */
export const seconds = (name: string) => ms(name) / 1000;

/** A length token in px: "4px" → 4. */
export const px = (name: string) => parseFloat(read(name)) || 0;

/** A cubic-bezier token as the array motion/react takes. Linear on the server, where nothing animates. */
export function curve(name: string): [number, number, number, number] {
  const m = read(name).match(/cubic-bezier\(([^)]+)\)/);
  const n = m ? m[1].split(",").map(Number) : [];
  return n.length === 4 ? [n[0], n[1], n[2], n[3]] : [0, 0, 1, 1];
}
