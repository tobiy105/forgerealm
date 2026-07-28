import { createSpring } from "animejs";
import type { Spring } from "animejs";

/**
 * Shared motion tokens + hygiene helpers for the anime.js motion core.
 * Every motion primitive (useAnimeReveal, AnimatedHeading, ScrambleLabel,
 * useLoopGroup, useScrollScrub) builds on these so the site moves as one
 * system. Performance rules baked in here:
 *  - only transform/opacity are ever animated,
 *  - will-change is applied just before a play and removed on complete,
 *  - the [data-ar] CSS fallback is disabled the moment JS takes control.
 */

/** Easing tokens — entrances ride outExpo, scrubs/loops stay gentle. */
export const EASE = {
  /** default entrance ease */
  out: "outExpo",
  /** bidirectional movement (scrubs, toggles) */
  inOut: "inOutQuad",
  linear: "linear",
} as const;

/** Duration tokens (ms). */
export const DUR = {
  xs: 300,
  sm: 500,
  md: 700,
  lg: 900,
  xl: 1200,
} as const;

/** Stagger step tokens (ms between elements). */
export const STEP = {
  tight: 45,
  base: 80,
  loose: 120,
  chars: 24,
  words: 55,
} as const;

/** Baseline spring for interactive touches (press, snap-back, hotspot pop). */
export const SPRING_SNAPPY = { mass: 1, stiffness: 260, damping: 20 } as const;

/**
 * Build a spring easing for interactive animations. Pass the result as `ease`
 * on an `animate()` call: `ease: interactiveSpring()`.
 */
export function interactiveSpring(
  overrides: Partial<Record<keyof typeof SPRING_SNAPPY, number>> = {},
): Spring {
  return createSpring({ ...SPRING_SNAPPY, ...overrides });
}

/** True when the user asked for reduced motion (SSR-safe). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type Els = HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>;

function toArray(els: Els): HTMLElement[] {
  return els instanceof HTMLElement ? [els] : Array.from(els);
}

/**
 * Disable the CSS hydration-failure fallback on a [data-ar] element. Every
 * primitive MUST call this the moment it takes control of a reveal target so
 * the 3s safety-net animation in globals.css never fights a live animation.
 */
export function takeControl(els: Els): void {
  toArray(els).forEach((el) => {
    el.style.animation = "none";
  });
}

/** Reveal instantly with no motion (reduced-motion / bail-out path). */
export function revealNow(els: Els): void {
  toArray(els).forEach((el) => {
    el.style.animation = "none";
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

/** Hint the compositor right before an animation plays. */
export function setWillChange(els: Els, value = "transform, opacity"): void {
  toArray(els).forEach((el) => {
    el.style.willChange = value;
  });
}

/** Drop the compositor hint once an animation completes or is torn down. */
export function clearWillChange(els: Els): void {
  toArray(els).forEach((el) => {
    el.style.willChange = "";
  });
}
