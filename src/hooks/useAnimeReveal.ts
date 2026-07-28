import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import type { AnimationParams, JSAnimation, StaggerParams } from "animejs";
import {
  DUR,
  EASE,
  STEP,
  clearWillChange,
  prefersReducedMotion,
  revealNow,
  setWillChange,
  takeControl,
} from "./motion";

export type RevealVariant = "fade-up" | "scale-in" | "slide-x";

type Opts = {
  /** descendants of the container to reveal — they MUST carry `data-ar` */
  selector: string;
  variant?: RevealVariant;
  /** fade-up rise distance (px) */
  y?: number;
  /** slide-x travel distance (px); elements enter from -x by default */
  x?: number;
  /** slide-x only: odd-indexed elements enter from the opposite side */
  alternate?: boolean;
  /** scale-in start scale */
  scale?: number;
  duration?: number;
  /** ms between staggered elements */
  step?: number;
  /** stagger origin (defaults to "center" when `grid` is set) */
  from?: "first" | "center" | "last";
  /** grid-aware stagger: [cols, rows] matching the DOM order of targets */
  grid?: [number, number];
  /** delay before the whole reveal starts */
  delay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
};

/**
 * Attach the returned ref to a container. When it scrolls into view (once),
 * every descendant matching `selector` reveals via anime.js. Targets must
 * render with the `data-ar` attribute (NOT `opacity-0`): globals.css hides
 * them only under `html.js`, so no-JS users see everything instantly, and a
 * 3s CSS safety net reveals them even if hydration fails. This hook disables
 * that fallback the moment it takes control. Respects
 * `prefers-reduced-motion` — targets appear with no motion.
 */
export function useAnimeReveal<T extends HTMLElement>({
  selector,
  variant = "fade-up",
  y = 24,
  x = 32,
  alternate = false,
  scale = 0.92,
  duration = DUR.md,
  step = STEP.base,
  from = "first",
  grid,
  delay = 0,
  ease = EASE.out,
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
}: Opts) {
  const ref = useRef<T>(null);
  const gridKey = grid ? grid.join("x") : "";

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window === "undefined") return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;

    // JS owns these elements now — the CSS safety net must never fire.
    takeControl(targets);

    if (prefersReducedMotion()) {
      revealNow(targets);
      return;
    }

    const staggerOpts: StaggerParams = { start: delay };
    if (grid) {
      staggerOpts.grid = grid;
      staggerOpts.from = "center";
    }
    if (from !== "first") staggerOpts.from = from;

    let anim: JSAnimation | null = null;
    const play = () => {
      setWillChange(targets);
      const params: AnimationParams = {
        opacity: [0, 1],
        duration,
        delay: stagger(step, staggerOpts),
        ease,
        onComplete: () => clearWillChange(targets),
      };
      if (variant === "scale-in") params.scale = [scale, 1];
      else if (variant === "slide-x")
        params.translateX = [
          (_t, i) => (alternate && (i ?? 0) % 2 ? x : -x),
          0,
        ];
      else params.translateY = [y, 0];
      anim = animate(targets, params);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        play();
      },
      { threshold, rootMargin },
    );
    obs.observe(root);

    return () => {
      obs.disconnect();
      anim?.cancel();
      clearWillChange(targets);
    };
  }, [
    selector,
    variant,
    y,
    x,
    alternate,
    scale,
    duration,
    step,
    from,
    gridKey,
    delay,
    ease,
    threshold,
    rootMargin,
  ]);
  return ref;
}
