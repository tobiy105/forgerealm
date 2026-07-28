"use client";

import { useRef } from "react";
import { animate } from "animejs";
import { useLoopGroup } from "../hooks/useLoopGroup";
import type { LoopLike } from "../hooks/useLoopGroup";
import { clearWillChange, setWillChange } from "../hooks/motion";

const ITEMS = [
  "Fidget Toys",
  "White Vases",
  "Halloween Trinkets",
  "D&D Dice Holders",
  "Phone Stands",
  "Keychains",
  "Book Stands",
  "Figurines (Dragons, Cats)",
  "Cosplay Props",
  "...and more",
];

export default function ProductsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Single transform-only loop. Content is rendered twice and the track slides
  // one full copy (-50% of its own width) before anime.js snaps back, so the
  // loop is seamless AND resize-proof: percentages track the new width for
  // free — no re-measuring, no rebuild, no chance of duplicate animations.
  // useLoopGroup pauses the loop whenever the marquee is offscreen; hover and
  // keyboard focus pause it while in view. Under reduced motion the build
  // never runs and the static first copy stays legible.
  const rootRef = useLoopGroup<HTMLDivElement>(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // One long-lived compositor layer for the one permanently-moving node.
    setWillChange(track, "transform");
    const marquee = animate(track, {
      translateX: ["0%", "-50%"],
      duration: 28000,
      loop: true,
      ease: "linear",
    });

    // Gate resume() so an IO re-entry never restarts the loop mid-hover and a
    // focus change while scrolled away never restarts it offscreen.
    let hovered = false;
    let inView = false;
    const gated: LoopLike = {
      pause: () => {
        inView = false;
        marquee.pause();
      },
      resume: () => {
        inView = true;
        if (!hovered) marquee.resume();
      },
      cancel: () => marquee.cancel(),
    };
    const pause = () => {
      hovered = true;
      marquee.pause();
    };
    const play = () => {
      hovered = false;
      if (inView) marquee.resume();
    };
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", play);
    container.addEventListener("focusin", pause);
    container.addEventListener("focusout", play);

    return {
      loops: [gated],
      cleanup: () => {
        container.removeEventListener("mouseenter", pause);
        container.removeEventListener("mouseleave", play);
        container.removeEventListener("focusin", pause);
        container.removeEventListener("focusout", play);
        clearWillChange(track);
      },
    };
  });

  return (
    <div
      ref={rootRef}
      aria-label="What we make"
      className="relative py-6 border-y border-white/10 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={containerRef}
          className="flex items-center gap-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div
            ref={trackRef}
            className="flex gap-10 whitespace-nowrap text-xs sm:text-sm uppercase tracking-[0.25em]"
            style={{ color: "#FADE6A" }}
          >
            {[...ITEMS, ...ITEMS].map((item, i) => (
              <span key={i} style={{ fontFamily: "'Cinzel', serif" }}>
                {item}
                <span className="ml-10 text-yellow-300/50" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
