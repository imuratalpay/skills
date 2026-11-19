/**
 * A timer the user didn't start ("Copied" reverting): it pauses while anything holds it and
 * resumes from what was left. Reasons are tracked, so overlapping holds never double-count.
 * From emil-interaction-details, hover-and-timers.md.
 */
export type Hold = "hover" | "focus" | "hidden" | "blurred";

export function createTimer(duration: number, onExpire: () => void, initialHolds: Iterable<Hold> = []) {
  const holds = new Set<Hold>(initialHolds);
  let remaining = duration;
  let startedAt = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let done = false;

  const run = () => {
    if (done) return;
    startedAt = Date.now();
    timer = setTimeout(() => {
      timer = undefined;
      done = true;
      onExpire();
    }, remaining);
  };
  const stop = () => {
    clearTimeout(timer);
    timer = undefined;
    remaining -= Date.now() - startedAt;
  };

  if (holds.size === 0) run();

  return {
    hold(reason: Hold) {
      if (holds.has(reason)) return;
      holds.add(reason);
      if (holds.size === 1 && timer !== undefined) stop();
    },
    release(reason: Hold) {
      if (!holds.delete(reason)) return;
      if (holds.size === 0) run();
    },
    clear() {
      done = true;
      clearTimeout(timer);
    },
  };
}
