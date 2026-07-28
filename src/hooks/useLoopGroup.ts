import { useEffect, useRef } from "react";
import type { DependencyList, RefObject } from "react";
import { prefersReducedMotion } from "./motion";

/**
 * Anything with anime.js Timer controls — JSAnimation, Timeline and Timer
 * instances all qualify.
 */
export type LoopLike = {
  pause: () => unknown;
  resume: () => unknown;
  cancel: () => unknown;
};

type LoopRegistration =
  | LoopLike[]
  | { loops: LoopLike[]; cleanup?: () => void };

/**
 * Register infinite/looping anime.js animations against a root element: they
 * pause() whenever the root leaves the viewport and resume() when it
 * re-enters, so offscreen sections never burn frames. The loops are paused
 * immediately on registration; the observer's initial callback resumes them
 * if the root is already visible. Returns a dispose function that disconnects
 * the observer and cancels every loop.
 *
 * Loop targets must NEVER carry `data-ar` (that attribute is reserved for
 * one-shot entrance targets).
 */
export function createPausedLoops(
  root: Element,
  loops: LoopLike[],
): () => void {
  loops.forEach((loop) => loop.pause());
  const obs = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) loops.forEach((loop) => loop.resume());
      else loops.forEach((loop) => loop.pause());
    },
    { threshold: 0, rootMargin: "8% 0px 8% 0px" },
  );
  obs.observe(root);
  return () => {
    obs.disconnect();
    loops.forEach((loop) => loop.cancel());
  };
}

/**
 * React wrapper around `createPausedLoops`. Attach the returned ref to a
 * section root; `build` runs once on mount and returns the section's looping
 * animations (plus an optional extra cleanup). Under
 * `prefers-reduced-motion`, `build` is never called — render a sensible
 * static state in markup/CSS. Everything is cancelled on unmount.
 */
export function useLoopGroup<T extends HTMLElement>(
  build: (root: T) => LoopRegistration | void,
  deps: DependencyList = [],
): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window === "undefined" || prefersReducedMotion())
      return;
    const built = build(root);
    if (!built) return;
    const loops = Array.isArray(built) ? built : built.loops;
    const extraCleanup = Array.isArray(built) ? undefined : built.cleanup;
    const dispose = createPausedLoops(root, loops);
    return () => {
      dispose();
      extraCleanup?.();
    };
  }, deps);
  return ref;
}
