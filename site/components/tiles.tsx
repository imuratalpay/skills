"use client";

import { GhostReplay } from "@imuratalpay/ghost-cursor";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { curve, ms, px, seconds } from "@/lib/motion";
import { useDocumentHidden, useInView, useReducedMotion, useWindowBlurred } from "@/lib/use-media";
import { FilterList } from "./demos/filter-list";
import filterListTake from "./demos/filter-list.take.json";
import { CompositeCrop } from "./playground/scenes";

const STAGE = "relative isolate h-64 overflow-hidden rounded-2xl bg-stage";
const RING = "pointer-events-none absolute inset-0 rounded-2xl shadow-well";

function TileCaption({ children }: { children: ReactNode }) {
  return (
    <div className="mt-1.5 flex min-h-9 items-center px-1 text-meta text-fg-3">
      {children}
    </div>
  );
}

/** The divider moves freely between these; past them it gives with tension and springs back. */
const SOFT_MIN = 0.06;
const SOFT_MAX = 0.94;
/** On touch, a horizontal move this long starts a drag; less is a tap or a vertical scroll. */
const DRAG_THRESHOLD = { touch: 10, pen: 4, mouse: 2 } as const;

const KEY_STEPS: Record<string, (v: number) => number> = {
  ArrowLeft: (v) => v - 0.05,
  ArrowDown: (v) => v - 0.05,
  ArrowRight: (v) => v + 0.05,
  ArrowUp: (v) => v + 0.05,
  PageDown: (v) => v - 0.2,
  PageUp: (v) => v + 0.2,
  Home: () => SOFT_MIN,
  End: () => SOFT_MAX,
};

/** iOS rubber band: follows at 0.55 at first, less with every pixel, never past `dimension`. */
const rubberBand = (over: number, dimension: number) =>
  Math.sign(over) * (1 - 1 / ((Math.abs(over) * 0.55) / dimension + 1)) * dimension;

/** Maps the pointer's position (0–1, or beyond with pointer capture) onto the divider, with tension at the edges. */
function withTension(raw: number, width: number) {
  if (raw < SOFT_MIN) return SOFT_MIN + rubberBand((raw - SOFT_MIN) * width, SOFT_MIN * width) / width;
  if (raw > SOFT_MAX) return SOFT_MAX + rubberBand((raw - SOFT_MAX) * width, (1 - SOFT_MAX) * width) / width;
  return raw;
}

/**
 * Before and after of the hero, split by a divider that sweeps on its own until the reader takes it:
 * a resting mouse after --delay-hover-intent, a touch after a 10px horizontal drag or a tap.
 */
export function UiDiffTile() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const hidden = useDocumentHidden();
  const blurred = useWindowBlurred();
  const inView = useInView(root);
  const [hand, setHand] = useState(false);
  /* A tap, a drag or a key stops the sweep for good; touch and keyboard have no hover to hold it with. */
  const [taken, setTaken] = useState(false);
  const [now, setNow] = useState(50);
  const split = useMotionValue(0.5);
  const clip = useTransform(split, (v) => `inset(0 0 0 ${v * 100}%)`);
  const line = useTransform(split, (v) => `translateX(${v * 100}%)`);
  const beforeLabel = useTransform(split, [0.14, 0.3], [0, 1]);
  const afterLabel = useTransform(split, [0.86, 0.7], [0, 1]);
  const intent = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastX = useRef(0);
  const press = useRef<{ x: number; dragging: boolean; type: keyof typeof DRAG_THRESHOLD } | null>(null);

  useEffect(() => {
    if (reduced || hand || taken || hidden || blurred || !inView) return;
    let controls: AnimationPlaybackControls | undefined;
    let stopped = false;
    const toFar = split.get() < 0.5 ? 0.82 : 0.18;
    const sweep = { duration: seconds("--demo-sweep"), ease: curve("--ease-in-out") };
    controls = animate(split, toFar, { ...sweep, delay: seconds("--demo-lead") });
    controls.finished.then(() => {
      if (stopped) return;
      controls = animate(split, toFar === 0.82 ? 0.18 : 0.82, {
        ...sweep,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: seconds("--demo-hold"),
      });
    });
    return () => {
      stopped = true;
      controls?.stop();
    };
  }, [reduced, hand, taken, hidden, blurred, inView, split]);

  useEffect(() => () => clearTimeout(intent.current), []);

  /** Keyboard moves jump: no animation on a key press. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = KEY_STEPS[e.key];
    if (!step) return;
    e.preventDefault();
    // Stop the sweep now; waiting for the re-render lets one more frame overwrite the key's value.
    split.stop();
    const v = Math.min(SOFT_MAX, Math.max(SOFT_MIN, step(split.get())));
    split.set(v);
    setNow(Math.round(v * 100));
    setTaken(true);
  };

  const follow = (el: HTMLElement, clientX: number) => {
    split.stop();
    const box = el.getBoundingClientRect();
    split.set(withTension((clientX - box.left) / box.width, box.width));
  };

  /** Hands the divider back: a spring to the soft edge if it was stretched, then the sweep resumes. */
  const release = () => {
    clearTimeout(intent.current);
    intent.current = undefined;
    press.current = null;
    const v = split.get();
    const target = Math.min(SOFT_MAX, Math.max(SOFT_MIN, v));
    if (v === target || reduced) {
      split.set(target);
      setHand(false);
      return;
    }
    animate(split, target, { type: "spring", duration: seconds("--duration-settle"), bounce: 0 }).finished.then(() =>
      setHand(false),
    );
  };

  return (
    <div ref={root}>
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after divider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={now}
        aria-valuetext={`Before ${now}%, after ${100 - now}%`}
        className={`${STAGE} cursor-ew-resize touch-pan-y select-none`}
        onKeyDown={onKeyDown}
        onFocus={() => {
          split.stop();
          setNow(Math.round(split.get() * 100));
          setHand(true);
        }}
        onBlur={() => setHand(false)}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") return;
          press.current = { x: e.clientX, dragging: false, type: e.pointerType as "touch" | "pen" };
        }}
        onPointerMove={(e) => {
          lastX.current = e.clientX;
          // Hover intent starts from a moving mouse, so a page scrolled under a still cursor doesn't grab it.
          if (e.pointerType === "mouse" && !hand && intent.current === undefined) {
            const el = e.currentTarget;
            intent.current = setTimeout(() => {
              setHand(true);
              follow(el, lastX.current);
            }, ms("--delay-hover-intent"));
          }
          const p = press.current;
          if (p && !p.dragging && Math.abs(e.clientX - p.x) > DRAG_THRESHOLD[p.type]) {
            p.dragging = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setHand(true);
          }
          if ((e.pointerType === "mouse" && hand) || p?.dragging) follow(e.currentTarget, e.clientX);
        }}
        onPointerUp={(e) => {
          const p = press.current;
          if (!p) return;
          // A tap moves the divider there, then lets go.
          if (!p.dragging) {
            setHand(true);
            follow(e.currentTarget, e.clientX);
          }
          setTaken(true);
          setNow(Math.round(split.get() * 100));
          release();
        }}
        onPointerLeave={(e) => e.pointerType === "mouse" && release()}
        onPointerCancel={release}
      >
        <div className="absolute inset-0">
          <CompositeCrop panel="before" x={40} y={64} width={470} sizes="1500px" priority />
        </div>
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <CompositeCrop panel="after" x={40} y={64} width={470} sizes="1500px" priority />
        </motion.div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ transform: line }}>
          <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.12),0_0_12px_rgb(0_0_0/0.18)]" />
          <span className="absolute top-1/2 -left-[3px] h-7 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_0.5px_rgb(0_0_0/0.15),0_1px_3px_rgb(0_0_0/0.2)]" />
        </motion.div>
        <motion.span
          aria-hidden
          style={{ opacity: beforeLabel }}
          className="label pointer-events-none absolute bottom-3 left-3 rounded-[4px] bg-surface px-1.5 py-1 text-fg-1 shadow-raised"
        >
          Before
        </motion.span>
        <motion.span
          aria-hidden
          style={{ opacity: afterLabel }}
          className="label pointer-events-none absolute right-3 bottom-3 rounded-[4px] bg-surface px-1.5 py-1 text-fg-1 shadow-raised"
        >
          After
        </motion.span>
        <div className={RING} />
      </div>
      <TileCaption>Point at the screenshot, or drag it, to compare</TileCaption>
    </div>
  );
}

const ROLES: { role: string; spec: string; sample: ReactNode }[] = [
  {
    role: "Display",
    spec: "Inter 48/48 · 590 · −0.022em",
    sample: <span className="text-display font-display text-fg-1">Quiet type</span>,
  },
  {
    role: "Prose",
    spec: "Inter 16/26 · 400 · fg-2",
    sample: <span className="text-fg-2">Hierarchy comes from grey first, weight second, size last.</span>,
  },
  {
    role: "Emphasis",
    spec: "Newsreader italic · 430 · 1.07em",
    sample: (
      <span className="text-fg-2">
        A screenshot can’t show <em>the moment in between</em>.
      </span>
    ),
  },
  {
    role: "Meta",
    spec: "Inter 13/21.125 · 400 · fg-3",
    sample: (
      <span className="text-meta text-fg-3">
        <time dateTime="2026-11-18">18 November 2026</time> · 4 min read
      </span>
    ),
  },
  {
    role: "Label",
    spec: "Geist Mono 12/16 · 500 · +0.3px",
    sample: <span className="label">Events · Duration · Size</span>,
  },
  {
    role: "Code",
    spec: "Geist Mono 13/21.125 · fg-1",
    sample: <span className="code-line">replay(recording)</span>,
  },
];

/** Text swap without a blur: the new role rises 4px into place as the old one leaves upward. */
const swap = () => {
  const d = px("--distance-micro");
  return {
    initial: { opacity: 0, y: d },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -d },
    transition: { duration: seconds("--duration-quick"), ease: curve("--ease-in-out") },
  };
};

/** Cycles through type-taste's roles, set in the real values. Hovering holds the current one. */
export function TypeTasteTile() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const hidden = useDocumentHidden();
  const blurred = useWindowBlurred();
  const inView = useInView(root);
  const [held, setHeld] = useState(false);
  /* The first tap or click hands the tile to the reader; it stops advancing on its own. */
  const [taken, setTaken] = useState(false);
  const [index, setIndex] = useState(0);
  const role = ROLES[index];
  const t = swap();
  const next = () => {
    setIndex((i) => (i + 1) % ROLES.length);
    setTaken(true);
  };

  useEffect(() => {
    if (reduced || held || taken || hidden || blurred || !inView) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, [reduced, held, taken, hidden, blurred, inView]);

  return (
    <div ref={root}>
      <button
        type="button"
        onClick={next}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        aria-label={`${role.role}: ${role.spec}. Show the next role.`}
        className={`${STAGE} flex w-full flex-col p-5 text-left`}
      >
        <span className="flex items-center justify-between">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={role.role} className="label" {...t}>
              {role.role}
            </motion.span>
          </AnimatePresence>
          <span className="num text-meta text-fg-3">
            {index + 1} / {ROLES.length}
          </span>
        </span>
        <span className="flex flex-1 items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={role.role} className="block" {...t}>
              {role.sample}
            </motion.span>
          </AnimatePresence>
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={role.role} className="font-mono text-meta text-fg-3" {...t}>
            {role.spec}
          </motion.span>
        </AnimatePresence>
        <span className={RING} />
      </button>
      <TileCaption>Tap or click for the next role. Every value is one I use.</TileCaption>
    </div>
  );
}

/** The real take ghost-record produced for this filter list, replayed by the package. */
export function GhostRecordTile() {
  return (
    <div>
      <GhostReplay recording={filterListTake} className="h-64 min-h-0">
        <FilterList compact />
      </GhostReplay>
    </div>
  );
}
