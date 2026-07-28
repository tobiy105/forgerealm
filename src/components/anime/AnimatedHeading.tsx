"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { animate, stagger, splitText } from "animejs";
import type { JSAnimation, StaggerParams } from "animejs";
import {
  DUR,
  EASE,
  STEP,
  clearWillChange,
  prefersReducedMotion,
  setWillChange,
  takeControl,
} from "../../hooks/motion";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "div";
  className?: string;
  style?: CSSProperties;
  /**
   * 'words' (default): each word rises out of an overflow-clipped mask — the
   * premium look with far fewer animated nodes. 'chars': per-character
   * fade+rise for special headings.
   */
  mode?: "words" | "chars";
  /** ms between each word/char (defaults per mode) */
  step?: number;
  /** chars mode only: initial translateY in px */
  y?: number;
  duration?: number;
  ease?: string;
  /** initial delay before the whole reveal starts */
  delay?: number;
  /** where the stagger radiates from */
  from?: "first" | "center" | "last";
  /** re-trigger animation on every intersection */
  once?: boolean;
};

/**
 * Splits its text (preserving nested inline HTML like `<em>`) and
 * stagger-reveals it on scroll into view. Renders with `data-ar`: globals.css
 * hides it only under `html.js` and a 3s CSS safety net reveals it if
 * hydration ever fails, so no-JS users/bots always see the heading. Falls
 * back to a static heading under `prefers-reduced-motion`.
 */
export default function AnimatedHeading({
  children,
  as: Tag = "h2",
  className = "",
  style,
  mode = "words",
  step,
  y = 30,
  duration = DUR.lg,
  ease = EASE.out,
  delay = 0,
  from = "first",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    // JS owns this element now — the CSS safety net must never fire.
    takeControl(el);

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }

    const splitter =
      mode === "words"
        ? splitText(el, { words: { wrap: "clip" }, chars: false, lines: false })
        : splitText(el, { chars: true, words: false, lines: false });
    const targets = (
      mode === "words" ? splitter.words : splitter.chars
    ) as HTMLElement[];
    if (!targets.length) {
      el.style.opacity = "1";
      return;
    }

    // Hide targets via inline style so they survive the parent's opacity flip.
    if (mode === "words") {
      targets.forEach((w) => {
        w.style.transform = "translateY(105%)";
      });
    } else {
      targets.forEach((c) => {
        c.style.display = "inline-block";
        c.style.opacity = "0";
        c.style.transform = `translateY(${y}px)`;
      });
    }
    // Reveal the parent so it takes up layout space; targets stay hidden.
    el.style.opacity = "1";

    const staggerOpts: StaggerParams = { start: delay };
    if (from === "center") staggerOpts.from = "center";
    else if (from === "last") staggerOpts.from = "last";
    const stepMs = step ?? (mode === "words" ? STEP.words : STEP.chars);

    let anim: JSAnimation | null = null;
    const play = () => {
      setWillChange(
        targets,
        mode === "words" ? "transform" : "transform, opacity",
      );
      anim = animate(targets, {
        ...(mode === "words"
          ? { translateY: ["105%", "0%"] }
          : { opacity: [0, 1], translateY: [y, 0] }),
        duration,
        delay: stagger(stepMs, staggerOpts),
        ease,
        onComplete: () => clearWillChange(targets),
      });
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (once) obs.disconnect();
        play();
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      anim?.cancel();
      clearWillChange(targets);
      splitter.revert();
    };
  }, [mode, step, y, duration, ease, delay, from, once]);

  return (
    <Tag ref={ref as any} data-ar className={className} style={style}>
      {children}
    </Tag>
  );
}
