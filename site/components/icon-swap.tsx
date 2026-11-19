import type { ReactNode } from "react";

/**
 * Cross-fades two icons with a small scale, in CSS so a swap interrupted mid-way reverses
 * from where it is. Both stay mounted; `on` decides which one shows.
 */
export function IconSwap({ on, onIcon, offIcon }: { on: boolean; onIcon: ReactNode; offIcon: ReactNode }) {
  return (
    <span className="icon-swap" data-on={on || undefined}>
      <span aria-hidden={on}>{offIcon}</span>
      <span aria-hidden={!on}>{onIcon}</span>
    </span>
  );
}
