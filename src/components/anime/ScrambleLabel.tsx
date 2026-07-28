"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { animate, scrambleText } from "animejs";
import type { JSAnimation } from "animejs";
import {
  clearWillChange,
  prefersReducedMotion,
  takeControl,
} from "../../hooks/motion";

type Props = {
  children: string;
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "strong";
  className?: string;
  style?: CSSProperties;
  duration?: number;
  delay?: number;
  /** anime.js scramble char set — 'uppercase' | 'lowercase' | 'numbers' | 'symbols' | 'braille' | 'blocks' | 'shades' | custom string */
  chars?: string;
  /** where the reveal grows from */
  from?: "left" | "right" | "center" | "random";
  /**
   * Render with `data-ar` so the label stays hidden until it scrambles in
   * (covered by the CSS safety net). Default false: text is visible from SSR
   * and scrambles in place.
   */
  ar?: boolean;
};

/**
 * A signature anime.js reveal: the label's characters scramble through random
 * glyphs, progressively locking into the real text. Fires once on scroll into
 * view. Falls back to plain text under prefers-reduced-motion.
 */
export default function ScrambleLabel({
  children,
  as: Tag = "span",
  className,
  style,
  duration,
  delay = 0,
  chars = "uppercase",
  from = "left",
  ar = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const hidden = el.hasAttribute("data-ar");
    // JS owns this element now — the CSS safety net must never fire.
    if (hidden) takeControl(el);

    if (prefersReducedMotion()) {
      if (hidden) el.style.opacity = "1";
      return;
    }

    let anim: JSAnimation | null = null;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        if (hidden) el.style.opacity = "1";
        el.style.willChange = "contents";
        anim = animate(el, {
          text: scrambleText({ chars, from, duration, delay }),
          duration: duration ?? 1400,
          ease: "linear",
          delay,
          onComplete: () => clearWillChange(el),
        });
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      anim?.cancel();
      clearWillChange(el);
    };
  }, [chars, from, duration, delay]);

  return (
    <Tag
      ref={ref as any}
      data-ar={ar ? "" : undefined}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
