"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { animate, scrambleText } from "animejs";

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
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        animate(el, {
          text: scrambleText({ chars, from, duration, delay }),
          duration: duration ?? 1400,
          ease: "linear",
          delay,
        });
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [chars, from, duration, delay]);

  return (
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  );
}
