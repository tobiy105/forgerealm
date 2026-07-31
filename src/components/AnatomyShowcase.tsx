"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger, svg, scrambleText } from "animejs";
import type { JSAnimation } from "animejs";
import AnimatedHeading from "./anime/AnimatedHeading";
import ScrambleLabel from "./anime/ScrambleLabel";
import { EASE, DUR, STEP, prefersReducedMotion } from "../hooks/motion";
import { useScrollScrub } from "../hooks/useScrollScrub";
import { useLoopGroup } from "../hooks/useLoopGroup";

/**
 * Exploded-diagram-style showcase, borrowed from the animejs.com toolbox
 * section: a central product image with thin leader lines drawing outward
 * to callout labels rendered as monospace pills.
 *
 * The line paths are computed at runtime from real DOM bounding boxes so
 * they always start at the correct label edge and land on the right point
 * of the image, at any container width. The assembly is scrubbed by scroll
 * position (not a one-shot trigger): as the section crosses the viewport
 *   1. the focal image converges (fade + scale)
 *   2. the exploded label pills slide inward from either side
 *   3. each leader line stroke-draws in sequence
 *   4. hotspot dots resolve into place
 * Label text scrambles once on scroll into view, and the hotspot pulse
 * loops run only while the section is on screen. Under reduced motion the
 * diagram renders fully assembled and static.
 */

type Anchor = {
  key: string;
  label: string;
  side: "left" | "right";
  /** where on the image the leader line lands, expressed as % of the image box */
  hotXPct: number;
  hotYPct: number;
};

const LEFT: Anchor[] = [
  {
    key: "pla",
    label: "biodegradable PLA",
    side: "left",
    hotXPct: 36,
    hotYPct: 25,
  },
  {
    key: "layers",
    label: "0.2 mm layers",
    side: "left",
    hotXPct: 30,
    hotYPct: 55,
  },
  {
    key: "leeds",
    label: "made in Leeds",
    side: "left",
    hotXPct: 35,
    hotYPct: 84,
  },
];
const RIGHT: Anchor[] = [
  {
    key: "finish",
    label: "hand-finished",
    side: "right",
    hotXPct: 64,
    hotYPct: 25,
  },
  {
    key: "blend",
    label: "gradient blend",
    side: "right",
    hotXPct: 70,
    hotYPct: 55,
  },
  {
    key: "eco",
    label: "eco packaging",
    side: "right",
    hotXPct: 65,
    hotYPct: 80,
  },
];
const ANCHORS: Anchor[] = [...LEFT, ...RIGHT];

export default function AnatomyShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const labelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [paths, setPaths] = useState<Record<string, string>>({});
  const [hotspots, setHotspots] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Recompute line paths + hotspot coordinates whenever the layout changes.
  // The label pills converge via transforms on their inner spans, so the
  // outer (measured) divs never carry a transform and these rects stay
  // valid even when a resize lands mid-scrub.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    const img = imageRef.current;
    if (!root || !img) return;

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      if (rootRect.width === 0 || imgRect.width === 0) return;

      const nextPaths: Record<string, string> = {};
      const nextHotspots: Record<string, { x: number; y: number }> = {};

      ANCHORS.forEach((a) => {
        const labelEl = labelRefs.current.get(a.key);
        if (!labelEl) return;
        const lRect = labelEl.getBoundingClientRect();

        // Hotspot: percentage of image box, translated to root-space.
        const hotX =
          imgRect.left - rootRect.left + (a.hotXPct / 100) * imgRect.width;
        const hotY =
          imgRect.top - rootRect.top + (a.hotYPct / 100) * imgRect.height;

        // Straight line: from the inner edge of the label directly to the
        // hotspot on the owl. Overlap over the image is intentional.
        const originX =
          a.side === "left"
            ? lRect.right - rootRect.left
            : lRect.left - rootRect.left;
        const originY = lRect.top - rootRect.top + lRect.height / 2;

        nextPaths[a.key] = `M ${originX} ${originY} L ${hotX} ${hotY}`;
        nextHotspots[a.key] = { x: hotX, y: hotY };
      });

      setPaths(nextPaths);
      setHotspots(nextHotspots);
      setSize({ w: rootRect.width, h: rootRect.height });
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(root);
    if (img.complete) measure();
    img.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      img.removeEventListener("load", measure);
    };
  }, []);

  // Scroll-scrubbed assembly: progress is driven by the section's viewport
  // crossing (fully assembled once the diagram is centered). `paths` is a dep
  // so every re-measure (resize / image load) tears the timeline down and
  // rebuilds it against the freshly computed geometry — createDrawable path
  // lengths are recomputed and the scroll observer bounds refresh with it.
  const { ref: scrubRef } = useScrollScrub<HTMLDivElement>(
    (root) => {
      const tl = createTimeline({
        autoplay: false,
        defaults: { ease: EASE.inOut },
      });

      const focal = root.querySelector<HTMLElement>(".anatomy-focal");
      if (focal)
        tl.add(
          focal,
          { opacity: [0, 1], scale: [0.92, 1], duration: DUR.md },
          0,
        );

      // Exploded pills converge inward from either side.
      const leftPills = root.querySelectorAll<HTMLElement>(
        '.anatomy-label-text[data-side="left"]',
      );
      const rightPills = root.querySelectorAll<HTMLElement>(
        '.anatomy-label-text[data-side="right"]',
      );
      if (leftPills.length) {
        tl.add(
          leftPills,
          {
            opacity: [0, 1],
            translateX: [-28, 0],
            duration: DUR.sm,
            delay: stagger(STEP.base),
          },
          250,
        );
      }
      if (rightPills.length) {
        tl.add(
          rightPills,
          {
            opacity: [0, 1],
            translateX: [28, 0],
            duration: DUR.sm,
            delay: stagger(STEP.base),
          },
          250,
        );
      }

      // Leader lines stroke-draw as the pills arrive.
      const pathEls = root.querySelectorAll<SVGPathElement>(".anatomy-leader");
      if (pathEls.length) {
        const drawable = svg.createDrawable(pathEls);
        tl.add(
          drawable,
          {
            draw: ["0 0", "0 1"],
            duration: DUR.md,
            ease: EASE.linear,
            delay: stagger(STEP.loose),
          },
          500,
        );
      }

      // Hotspot dots resolve last.
      const hotspotEls = root.querySelectorAll<SVGGElement>(".anatomy-hotspot");
      if (hotspotEls.length) {
        tl.add(
          hotspotEls,
          {
            opacity: [0, 1],
            scale: [0.4, 1],
            duration: DUR.sm,
            delay: stagger(STEP.base),
          },
          1000,
        );
      }

      return tl;
    },
    {
      enter: "bottom top",
      leave: "center center",
      willChange: ".anatomy-focal, .anatomy-label-text",
    },
    [paths],
  );

  // Hotspot pulse loops (transform/opacity only) — paused whenever the
  // section is offscreen, never built under reduced motion. The dep flips
  // once the overlay SVG has been measured into existence.
  const hotspotCount = Object.keys(hotspots).length;
  const pulseRef = useLoopGroup<HTMLDivElement>(
    (root) => {
      const pulses = root.querySelectorAll<SVGCircleElement>(".anatomy-pulse");
      if (!pulses.length) return;
      return [
        animate(pulses, {
          scale: [0.75, 1.5],
          opacity: [0.8, 0.1],
          duration: 1300,
          ease: EASE.inOut,
          loop: true,
          alternate: true,
          delay: stagger(160),
        }),
      ];
    },
    [hotspotCount],
  );

  // One-shot label scramble on scroll into view (independent of the scrub).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;

    const anims: JSAnimation[] = [];
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        root
          .querySelectorAll<HTMLElement>(".anatomy-label-text")
          .forEach((textEl, i) => {
            anims.push(
              animate(textEl, {
                text: scrambleText({ chars: "lowercase" }),
                duration: 900,
                delay: 200 + i * 120,
                ease: "linear",
              }),
            );
          });
      },
      { threshold: 0.25 },
    );

    obs.observe(root);
    return () => {
      obs.disconnect();
      anims.forEach((a) => a.cancel());
    };
  }, []);

  const setLabelRef = (key: string) => (el: HTMLDivElement | null) => {
    if (el) labelRefs.current.set(key, el);
    else labelRefs.current.delete(key);
  };

  // The measure effect, the scrub and the loop group all observe the same
  // diagram root.
  const setDiagramRef = (el: HTMLDivElement | null) => {
    rootRef.current = el;
    scrubRef.current = el;
    pulseRef.current = el;
  };

  return (
    <section
      className="safari-drop-backdrop landing-ambience relative py-20 sm:py-28 md:min-h-screen md:flex md:flex-col md:justify-center md:py-16 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0e18 0%, #0c1020 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
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
            from="center"
          >
            Every piece,{" "}
            <em
              className="text-cyan-300"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              engineered
            </em>
          </AnimatedHeading>
        </div>

        {/* Diagram — same structure at every width, only sizing/spacing changes. */}
        <div
          ref={setDiagramRef}
          className="relative mx-auto"
          style={{ maxWidth: "1100px" }}
        >
          <div className="grid grid-cols-[minmax(0,80px)_minmax(180px,1fr)_minmax(0,80px)] sm:grid-cols-[minmax(120px,200px)_minmax(220px,1fr)_minmax(120px,200px)] md:grid-cols-[minmax(160px,220px)_minmax(320px,1fr)_minmax(160px,220px)] xl:grid-cols-[minmax(160px,220px)_minmax(460px,1fr)_minmax(160px,220px)] items-center gap-x-1.5 sm:gap-x-6 md:gap-x-10 lg:gap-x-16">
            {/* Left labels */}
            <div className="flex flex-col justify-between h-[420px] sm:h-[440px] md:h-[min(72vh,720px)] xl:h-[min(78vh,860px)] py-3 sm:py-5 items-end">
              {LEFT.map((a) => (
                <div
                  key={a.key}
                  ref={setLabelRef(a.key)}
                  className="anatomy-label max-w-full relative z-10"
                >
                  <span
                    data-side={a.side}
                    className="anatomy-label-text inline-block px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-md border border-blue-400/25 bg-blue-500/[0.08] backdrop-blur-sm text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.14em] text-blue-100/85 leading-tight break-words"
                    style={{
                      fontFamily:
                        '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
                    }}
                  >
                    {a.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Focal image — big enough on mobile that labels overlap; grows further at each breakpoint. */}
            <div className="flex justify-center">
              <img
                ref={imageRef}
                src="/owlPrint.png"
                alt="A ForgeRealm printed owl figurine"
                className="anatomy-focal h-[420px] sm:h-[440px] md:h-[min(72vh,720px)] xl:h-[min(78vh,860px)] max-w-none w-auto object-contain drop-shadow-[0_0_40px_rgba(96,165,250,0.15)]"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Right labels */}
            <div className="flex flex-col justify-between h-[420px] sm:h-[440px] md:h-[min(72vh,720px)] xl:h-[min(78vh,860px)] py-3 sm:py-5 items-start">
              {RIGHT.map((a) => (
                <div
                  key={a.key}
                  ref={setLabelRef(a.key)}
                  className="anatomy-label max-w-full relative z-10"
                >
                  <span
                    data-side={a.side}
                    className="anatomy-label-text inline-block px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-md border border-blue-400/25 bg-blue-500/[0.08] backdrop-blur-sm text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.14em] text-blue-100/85 leading-tight break-words"
                    style={{
                      fontFamily:
                        '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
                    }}
                  >
                    {a.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Overlay SVG — leader lines + pulsing hotspot dots, drawn in real coordinates. */}
          {size.w > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              width={size.w}
              height={size.h}
              viewBox={`0 0 ${size.w} ${size.h}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="anatomyLineGradLeft"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
                  <stop offset="100%" stopColor="rgba(103, 232, 249, 0.9)" />
                </linearGradient>
                <linearGradient
                  id="anatomyLineGradRight"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
                  <stop offset="100%" stopColor="rgba(103, 232, 249, 0.9)" />
                </linearGradient>
              </defs>

              {ANCHORS.map((a) =>
                paths[a.key] ? (
                  <path
                    key={a.key}
                    className="anatomy-leader"
                    d={paths[a.key]}
                    stroke={`url(#anatomyLineGrad${a.side === "left" ? "Left" : "Right"})`}
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                ) : null,
              )}

              {ANCHORS.map((a) => {
                const h = hotspots[a.key];
                if (!h) return null;
                return (
                  <g
                    key={`${a.key}-hot`}
                    className="anatomy-hotspot"
                    style={{ transformOrigin: `${h.x}px ${h.y}px` }}
                  >
                    <circle
                      className="anatomy-pulse"
                      cx={h.x}
                      cy={h.y}
                      r="8"
                      fill="rgba(103, 232, 249, 0.15)"
                      style={{ transformOrigin: `${h.x}px ${h.y}px` }}
                    />
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r="3.2"
                      fill="rgba(103, 232, 249, 1)"
                    />
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}
