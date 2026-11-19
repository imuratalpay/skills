"use client";

/**
 * Whether the last input was a pointer or the keyboard. Keyboard-driven changes don't animate
 * (emil-interaction-details: "the user's hands are already ahead of the animation").
 */
let last: "pointer" | "keyboard" = "pointer";

if (typeof window !== "undefined") {
  window.addEventListener("pointerdown", () => (last = "pointer"), { capture: true, passive: true });
  window.addEventListener("keydown", () => (last = "keyboard"), { capture: true, passive: true });
}

export const lastInputWasKeyboard = () => last === "keyboard";
