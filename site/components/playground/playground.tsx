"use client";

import { useRef, useState, type ComponentType } from "react";
import type { PhaseId, Skill } from "@/lib/skills";
import { useDocumentHidden, useInView, useReducedMotion, useWindowBlurred } from "@/lib/use-media";
import { PromptBar } from "../copy";
import { PauseIcon, PlayIcon } from "../icons";
import { IconSwap } from "../icon-swap";
import { Inline } from "../prose";

export type SceneProps = { phase: PhaseId; from: PhaseId | null; cycle: number };

type Phase = Skill["playground"]["phases"][number];
type Selection = { index: number; from: PhaseId | null; cycle: number; instant: boolean };

/**
 * A scripted before/after stage. Phases advance when the active tab's progress fill ends, and every
 * timed change inside is a CSS animation, so pausing is one attribute. Under reduced motion it starts
 * paused on "After", and picking a phase while paused shows that phase's end state at once.
 * Like any presentation timer it also waits while the pointer rests on the stage, while keyboard
 * focus is inside, and while the tab or window is in the background.
 */
export function Playground({
  phases,
  scene: Scene,
  aspect,
  prompt,
  invoke,
}: {
  phases: Phase[];
  scene: ComponentType<SceneProps>;
  aspect: string;
  prompt: string;
  invoke: string;
}) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const hidden = useDocumentHidden();
  const blurred = useWindowBlurred();
  const inView = useInView(root);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  const paused = userPaused ?? reduced;
  const halted = paused || hidden || blurred || !inView || hovered || keyboardFocus;
  const afterIndex = Math.max(
    0,
    phases.findIndex((p) => p.id === "after"),
  );
  const state = selection ?? { index: reduced ? afterIndex : 0, from: null, cycle: 0, instant: reduced };
  const phase = phases[state.index];

  const advance = () =>
    setSelection({
      index: (state.index + 1) % phases.length,
      from: phase.id,
      cycle: state.cycle + 1,
      instant: false,
    });

  const select = (index: number) =>
    setSelection({
      index,
      from: index === state.index ? null : phase.id,
      cycle: state.cycle + 1,
      // Keyboard-driven changes don't animate; neither does a phase picked while paused.
      instant: paused || keyboardFocus,
    });

  return (
    <figure
      ref={root}
      className="pg my-6"
      data-paused={halted || undefined}
      data-instant={state.instant || undefined}
      onFocus={(e) => e.target.matches(":focus-visible") && setKeyboardFocus(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setKeyboardFocus(false)}
    >
      <div className="rounded-2xl p-1.5 shadow-well">
        <PromptBar prompt={prompt} invoke={invoke} />
        <div
          className={`pg-scene relative isolate overflow-hidden rounded-[10px] bg-stage ${aspect}`}
          // From pointermove, not pointerenter: content scrolled under a still cursor isn't hovered.
          onPointerMove={(e) => e.pointerType === "mouse" && !hovered && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <Scene phase={phase.id} from={state.from} cycle={state.cycle} />
          <div className="pointer-events-none absolute inset-0 rounded-[10px] shadow-well" />
        </div>
        <div className="flex min-h-11 items-center justify-between gap-3 px-1 pt-1.5">
          <div role="group" aria-label="Phase" className="flex items-center gap-1">
            {phases.map((p, i) => {
              const active = i === state.index;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(i)}
                  className="relative isolate h-7 rounded-full px-3 text-meta font-ui text-fg-3 transition-[color,background-color,scale] duration-(--duration-quick) ease-out before:absolute before:-inset-x-0.5 before:-inset-y-1.5 hover:text-fg-1 active:scale-(--scale-press) aria-pressed:bg-surface aria-pressed:text-fg-1 aria-pressed:shadow-raised"
                >
                  <span aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-full">
                    {active && (
                      <span
                        key={`${state.index}-${state.cycle}`}
                        className="absolute inset-0 origin-left bg-line"
                        style={{ animation: `pg-fill ${p.duration}ms var(--ease-linear) both` }}
                        onAnimationEnd={(e) => e.animationName === "pg-fill" && advance()}
                      />
                    )}
                  </span>
                  {p.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setUserPaused(!paused)}
            className="relative inline-flex h-7 flex-none items-center gap-1.5 rounded-full bg-surface pr-3 pl-2.5 text-meta font-ui text-fg-1 shadow-raised transition-[scale] duration-(--duration-quick) ease-out before:absolute before:-inset-x-1 before:-inset-y-1.5 hover:shadow-raised-hover active:scale-(--scale-press)"
          >
            <span className="grid size-3 place-items-center">
              <IconSwap on={paused} onIcon={<PlayIcon />} offIcon={<PauseIcon />} />
            </span>
            <span className="grid">
              <span className={`col-start-1 row-start-1 ${paused ? "invisible" : ""}`}>Pause</span>
              <span className={`col-start-1 row-start-1 ${paused ? "" : "invisible"}`}>Play</span>
            </span>
          </button>
        </div>
      </div>

      <figcaption className="mt-2 grid px-1 text-meta text-fg-3">
        {phases.map((p, i) => (
          <span
            key={p.id}
            aria-hidden={i !== state.index}
            className={`col-start-1 row-start-1 transition-[opacity,translate] duration-(--duration-quick) ease-in-out ${
              i === state.index
                ? ""
                : i < state.index
                  ? "-translate-y-(--distance-micro) opacity-0"
                  : "translate-y-(--distance-micro) opacity-0"
            }`}
          >
            <Inline text={p.caption} />
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
