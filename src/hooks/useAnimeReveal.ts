import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

type Opts = {
  selector: string;
  y?: number;
  duration?: number;
  step?: number;
  threshold?: number;
  ease?: string;
  rootMargin?: string;
};

/**
 * Attach the returned ref to a container. When it scrolls into view, every
 * descendant matching `selector` fades and slides up in sequence via anime.js.
 * Targets must render with the Tailwind `opacity-0` class so there's no flash
 * before hydration; the animation flips them visible.
 * Respects `prefers-reduced-motion` — when set, targets are made visible with
 * no motion.
 */
export function useAnimeReveal<T extends HTMLElement>({
  selector,
  y = 24,
  duration = 700,
  step = 90,
  threshold = 0.2,
  ease = "outExpo",
  rootMargin = "0px 0px -10% 0px",
}: Opts) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof window === "undefined") return;
    const targets = root.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      targets.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const play = () => {
      animate(targets, {
        opacity: [0, 1],
        translateY: [y, 0],
        duration,
        delay: stagger(step),
        ease,
      });
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
    return () => obs.disconnect();
  }, [selector, y, duration, step, threshold, ease, rootMargin]);
  return ref;
}
