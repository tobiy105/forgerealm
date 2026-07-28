"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, svg, scrambleText } from "animejs";
import AnimatedHeading from "./anime/AnimatedHeading";
import ScrambleLabel from "./anime/ScrambleLabel";

/**
 * Exploded-diagram-style showcase, borrowed straight from the animejs.com
 * "complete animator's toolbox" section: a central product image with thin
 * leader lines drawing outward to callout labels. Labels sit in monospace
 * pills. On scroll into view:
 *   1. The focal image fades and gently scales in.
 *   2. Each leader line stroke-draws in sequence.
 *   3. Each label scrambles its characters until it settles.
 *   4. Hotspot dots pulse continuously.
 */

type Anchor = {
  key: string;
  label: string;
  labelX: number;   // svg-space, top-left of the label anchor
  labelY: number;
  hotX: number;     // point on the image the leader lands on
  hotY: number;
  side: "left" | "right";
};

// SVG coordinate system is 900 wide x 550 tall.
// Image sits centred (roughly 340..560 x, 90..500 y).
const ANCHORS: Anchor[] = [
  { key: "pla",    label: "biodegradable PLA", labelX:  30, labelY: 120, hotX: 390, hotY: 170, side: "left"  },
  { key: "layers", label: "0.2 mm layers",     labelX:  30, labelY: 260, hotX: 400, hotY: 285, side: "left"  },
  { key: "leeds",  label: "made in Leeds",     labelX:  30, labelY: 410, hotX: 395, hotY: 430, side: "left"  },
  { key: "finish", label: "hand-finished",     labelX: 700, labelY: 120, hotX: 540, hotY: 200, side: "right" },
  { key: "blend",  label: "gradient blend",    labelX: 700, labelY: 260, hotX: 555, hotY: 290, side: "right" },
  { key: "eco",    label: "eco packaging",     labelX: 700, labelY: 410, hotX: 540, hotY: 420, side: "right" },
];

const LABEL_WIDTH = 170;

export default function AnatomyShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();

        // 1. Focal image reveal.
        animate(".anatomy-focal", {
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 1100,
          ease: "outExpo",
        });

        // 2. Leader lines stroke-draw in sequence.
        const paths = root.querySelectorAll<SVGPathElement>(".anatomy-leader");
        if (paths.length) {
          const drawable = svg.createDrawable(paths);
          animate(drawable, {
            draw: ["0 0", "0 1"],
            duration: 900,
            ease: "inOutQuad",
            delay: stagger(140, { start: 400 }),
          });
        }

        // 3. Hotspot dots pop after their line arrives.
        animate(".anatomy-hotspot", {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 500,
          delay: stagger(140, { start: 900 }),
          ease: "outBack",
        });

        // 4. Label pills fade in, text scrambles into place.
        const labels = root.querySelectorAll<HTMLElement>(".anatomy-label");
        animate(labels, {
          opacity: [0, 1],
          translateY: [8, 0],
          duration: 500,
          delay: stagger(140, { start: 900 }),
          ease: "outExpo",
        });
        labels.forEach((label, i) => {
          const textEl = label.querySelector<HTMLElement>(".anatomy-label-text");
          if (!textEl) return;
          animate(textEl, {
            text: scrambleText({ chars: "lowercase" }),
            duration: 900,
            delay: 900 + i * 140 + 200,
            ease: "linear",
          });
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0e18 0%, #0c1020 100%)" }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-blue-500/[0.06] blur-[180px]" />
        <div className="absolute right-1/4 top-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-blue-400 to-cyan-400" />
            <ScrambleLabel
              className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-blue-300/60"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Anatomy of a print
            </ScrambleLabel>
            <div className="w-8 h-px bg-gradient-to-l from-blue-400 to-cyan-400" />
          </div>
          <AnimatedHeading
            as="h2"
            className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
            step={26}
            from="center"
          >
            Every piece, <em className="text-cyan-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300 }}>engineered</em>
          </AnimatedHeading>
        </div>

        {/* Diagram — desktop only */}
        <div
          ref={rootRef}
          className="relative w-full max-w-[900px] mx-auto hidden md:block"
          style={{ aspectRatio: "900 / 550" }}
        >
          {/* Focal image */}
          <img
            src="/owl-nbg.webp"
            alt="A ForgeRealm printed owl figurine"
            className="anatomy-focal absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-auto object-contain opacity-0 drop-shadow-[0_0_40px_rgba(96,165,250,0.15)]"
            loading="lazy"
            decoding="async"
          />

          {/* SVG overlay — leader lines + hotspot dots */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none"
            viewBox="0 0 900 550"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="anatomyLineGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
                <stop offset="100%" stopColor="rgba(103, 232, 249, 0.9)" />
              </linearGradient>
              <linearGradient id="anatomyLineGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
                <stop offset="100%" stopColor="rgba(103, 232, 249, 0.9)" />
              </linearGradient>
            </defs>

            {ANCHORS.map((a) => {
              // Path: horizontal from label edge, then diagonal to hotspot.
              const labelEdgeX = a.side === "left" ? a.labelX + LABEL_WIDTH : a.labelX;
              const kneeX = a.side === "left" ? labelEdgeX + 30 : labelEdgeX - 30;
              const kneeY = a.labelY;
              const d = `M ${labelEdgeX} ${a.labelY} L ${kneeX} ${kneeY} L ${a.hotX} ${a.hotY}`;
              const gradId = a.side === "left" ? "anatomyLineGradLeft" : "anatomyLineGradRight";
              return (
                <path
                  key={a.key}
                  className="anatomy-leader"
                  d={d}
                  stroke={`url(#${gradId})`}
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}

            {ANCHORS.map((a) => (
              <g key={`${a.key}-hot`} className="anatomy-hotspot opacity-0" style={{ transformOrigin: `${a.hotX}px ${a.hotY}px` }}>
                <circle cx={a.hotX} cy={a.hotY} r="8" fill="rgba(103, 232, 249, 0.15)">
                  <animate attributeName="r" values="6;12;6" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.6s" repeatCount="indefinite" />
                </circle>
                <circle cx={a.hotX} cy={a.hotY} r="3.2" fill="rgba(103, 232, 249, 1)" />
              </g>
            ))}
          </svg>

          {/* HTML labels — positioned by percentage of the container. */}
          {ANCHORS.map((a) => (
            <div
              key={`${a.key}-label`}
              className="anatomy-label absolute opacity-0"
              style={{
                left: `${(a.labelX / 900) * 100}%`,
                top: `calc(${(a.labelY / 550) * 100}% - 14px)`,
                width: `${(LABEL_WIDTH / 900) * 100}%`,
                textAlign: a.side === "left" ? "left" : "right",
              }}
            >
              <span
                className="anatomy-label-text inline-block px-3 py-1.5 rounded-md border border-blue-400/25 bg-blue-500/[0.08] backdrop-blur-sm text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-blue-100/85"
                style={{ fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}
              >
                {a.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile fallback — image + label pill grid, no SVG diagram. */}
        <div className="md:hidden mx-auto max-w-sm">
          <img src="/owl-nbg.webp" alt="" className="mx-auto h-64 w-auto object-contain" loading="lazy" decoding="async" />
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            {ANCHORS.map((a) => (
              <span
                key={`${a.key}-m`}
                className="text-center px-3 py-2 rounded-md border border-blue-400/25 bg-blue-500/[0.08] backdrop-blur-sm text-[10px] uppercase tracking-[0.14em] text-blue-100/85"
                style={{ fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}
              >
                {a.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
