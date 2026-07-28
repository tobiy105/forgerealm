"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger, svg, scrambleText } from "animejs";
import AnimatedHeading from "./anime/AnimatedHeading";
import ScrambleLabel from "./anime/ScrambleLabel";

/**
 * Exploded-diagram-style showcase, borrowed from the animejs.com toolbox
 * section: a central product image with thin leader lines drawing outward
 * to callout labels rendered as monospace pills.
 *
 * The line paths are computed at runtime from real DOM bounding boxes so
 * they always start at the correct label edge and land on the right point
 * of the image, at any container width. On scroll into view:
 *   1. focal image fades and scales in
 *   2. each leader line stroke-draws in sequence
 *   3. hotspot dots pop with outBack
 *   4. label pills fade+slide up, then each label's text scrambles into place
 *   5. hotspots keep pulsing via SVG SMIL for a live 'sensor' feel
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
  { key: "pla",    label: "biodegradable PLA", side: "left",  hotXPct: 30, hotYPct: 22 },
  { key: "layers", label: "0.2 mm layers",     side: "left",  hotXPct: 20, hotYPct: 55 },
  { key: "leeds",  label: "made in Leeds",     side: "left",  hotXPct: 32, hotYPct: 88 },
];
const RIGHT: Anchor[] = [
  { key: "finish", label: "hand-finished",  side: "right", hotXPct: 70, hotYPct: 22 },
  { key: "blend",  label: "gradient blend", side: "right", hotXPct: 80, hotYPct: 55 },
  { key: "eco",    label: "eco packaging",  side: "right", hotXPct: 68, hotYPct: 82 },
];
const ANCHORS: Anchor[] = [...LEFT, ...RIGHT];

export default function AnatomyShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const labelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [paths, setPaths] = useState<Record<string, string>>({});
  const [hotspots, setHotspots] = useState<Record<string, { x: number; y: number }>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  const played = useRef(false);

  // Recompute line paths + hotspot coordinates whenever the layout changes.
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
        const hotX = imgRect.left - rootRect.left + (a.hotXPct / 100) * imgRect.width;
        const hotY = imgRect.top  - rootRect.top  + (a.hotYPct / 100) * imgRect.height;

        // Line origin: inner edge of the label (right side for left labels, left side for right labels).
        const originX = a.side === "left"
          ? lRect.right - rootRect.left
          : lRect.left  - rootRect.left;
        const originY = lRect.top - rootRect.top + lRect.height / 2;

        // One knee bend: horizontal from the label, then diagonal to the hotspot.
        const kneeX = a.side === "left"
          ? originX + Math.max(30, (hotX - originX) * 0.35)
          : originX - Math.max(30, (originX - hotX) * 0.35);
        const kneeY = originY;

        nextPaths[a.key] = `M ${originX} ${originY} L ${kneeX} ${kneeY} L ${hotX} ${hotY}`;
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
    return () => { ro.disconnect(); img.removeEventListener("load", measure); };
  }, []);

  // Play the reveal choreography once the section scrolls into view.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (played.current) return;
    const root = rootRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (played.current) return;
      // Only fire once paths have been measured and rendered.
      if (Object.keys(paths).length !== ANCHORS.length) return;
      obs.disconnect();
      played.current = true;

      animate(".anatomy-focal", {
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1100,
        ease: "outExpo",
      });

      const pathEls = root.querySelectorAll<SVGPathElement>(".anatomy-leader");
      if (pathEls.length) {
        const drawable = svg.createDrawable(pathEls);
        animate(drawable, {
          draw: ["0 0", "0 1"],
          duration: 900,
          ease: "inOutQuad",
          delay: stagger(140, { start: 400 }),
        });
      }

      animate(".anatomy-hotspot", {
        opacity: [0, 1],
        scale: [0.3, 1],
        duration: 500,
        delay: stagger(140, { start: 900 }),
        ease: "outBack",
      });

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
    }, { threshold: 0.25 });

    obs.observe(root);
    return () => obs.disconnect();
  }, [paths]);

  const setLabelRef = (key: string) => (el: HTMLDivElement | null) => {
    if (el) labelRefs.current.set(key, el);
    else labelRefs.current.delete(key);
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0e18 0%, #0c1020 100%)" }}>
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-blue-500/[0.06] blur-[180px]" />
        <div className="absolute right-1/4 top-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
      </div>

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
            step={26}
            from="center"
          >
            Every piece, <em className="text-cyan-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: 300 }}>engineered</em>
          </AnimatedHeading>
        </div>

        {/* Desktop diagram — CSS grid keeps labels flanking the image at every width. */}
        <div ref={rootRef} className="relative hidden md:block mx-auto" style={{ maxWidth: "980px" }}>
          <div className="grid grid-cols-[minmax(160px,220px)_minmax(320px,1fr)_minmax(160px,220px)] items-center gap-x-10 lg:gap-x-16">
            {/* Left labels */}
            <div className="flex flex-col justify-between h-[440px] py-6 items-end">
              {LEFT.map((a) => (
                <div
                  key={a.key}
                  ref={setLabelRef(a.key)}
                  className="anatomy-label opacity-0"
                >
                  <span
                    className="anatomy-label-text inline-block px-3 py-1.5 rounded-md border border-blue-400/25 bg-blue-500/[0.08] backdrop-blur-sm text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-blue-100/85 whitespace-nowrap"
                    style={{ fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}
                  >
                    {a.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Focal image */}
            <div className="flex justify-center">
              <img
                ref={imageRef}
                src="/owl-nbg.webp"
                alt="A ForgeRealm printed owl figurine"
                className="anatomy-focal h-[440px] w-auto object-contain opacity-0 drop-shadow-[0_0_40px_rgba(96,165,250,0.15)]"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Right labels */}
            <div className="flex flex-col justify-between h-[440px] py-6 items-start">
              {RIGHT.map((a) => (
                <div
                  key={a.key}
                  ref={setLabelRef(a.key)}
                  className="anatomy-label opacity-0"
                >
                  <span
                    className="anatomy-label-text inline-block px-3 py-1.5 rounded-md border border-blue-400/25 bg-blue-500/[0.08] backdrop-blur-sm text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-blue-100/85 whitespace-nowrap"
                    style={{ fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace' }}
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
                <linearGradient id="anatomyLineGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
                  <stop offset="100%" stopColor="rgba(103, 232, 249, 0.9)" />
                </linearGradient>
                <linearGradient id="anatomyLineGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
                  <stop offset="100%" stopColor="rgba(103, 232, 249, 0.9)" />
                </linearGradient>
              </defs>

              {ANCHORS.map((a) => (
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
                ) : null
              ))}

              {ANCHORS.map((a) => {
                const h = hotspots[a.key];
                if (!h) return null;
                return (
                  <g key={`${a.key}-hot`} className="anatomy-hotspot opacity-0" style={{ transformOrigin: `${h.x}px ${h.y}px` }}>
                    <circle cx={h.x} cy={h.y} r="8" fill="rgba(103, 232, 249, 0.15)">
                      <animate attributeName="r" values="6;12;6" dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={h.x} cy={h.y} r="3.2" fill="rgba(103, 232, 249, 1)" />
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Mobile fallback */}
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
