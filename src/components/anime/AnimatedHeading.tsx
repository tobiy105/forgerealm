"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { animate, stagger, text } from "animejs";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "div";
  className?: string;
  style?: CSSProperties;
  /** ms between each character */
  step?: number;
  /** initial translateY */
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
 * Splits its text into per-character spans (preserving nested inline HTML like
 * `<em>`) and stagger-reveals them on scroll into view. Rendered with
 * `opacity-0` from SSR to avoid the classic split-text flash — if the client
 * script fails to load, the heading stays hidden. Accept that tradeoff for
 * decorative headings; the section still has surrounding copy.
 */
export default function AnimatedHeading({
  children,
  as: Tag = "h2",
  className = "",
  style,
  step = 26,
  y = 30,
  duration = 900,
  ease = "outExpo",
  delay = 0,
  from = "first",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.opacity = "1";
      return;
    }

    const splitter = text.split(el, { chars: true, words: false, lines: false });
    const chars = splitter.chars as HTMLElement[];
    if (!chars.length) { el.style.opacity = "1"; return; }

    // Hide chars via inline style so they survive the parent's opacity flip.
    chars.forEach((c) => {
      c.style.display = "inline-block";
      c.style.willChange = "opacity, transform";
      c.style.opacity = "0";
      c.style.transform = `translateY(${y}px)`;
    });
    // Reveal the parent so it takes up layout space; chars stay hidden.
    el.style.opacity = "1";

    const staggerOpts: Parameters<typeof stagger>[1] = { start: delay };
    if (from === "center") staggerOpts.from = "center";
    else if (from === "last") staggerOpts.from = "last";

    const play = () => {
      animate(chars, {
        opacity: [0, 1],
        translateY: [y, 0],
        duration,
        delay: stagger(step, staggerOpts),
        ease,
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
      splitter.revert();
    };
  }, [step, y, duration, ease, delay, from, once]);

  return (
    <Tag
      ref={ref as any}
      className={`opacity-0 ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
