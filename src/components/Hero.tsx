"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Lottie from "lottie-react";
import { animate, createTimeline, stagger, svg } from "animejs";

function useTypewriter(words: string[]) {
  const [text, setText] = useState(words[0]);
  const stateRef = useRef({ wordIdx: 0, charIdx: words[0].length, phase: 'pause' as 'typing' | 'pause' | 'deleting' });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const s = stateRef.current;
      const word = words[s.wordIdx];

      if (s.phase === 'pause') {
        timer = setTimeout(() => { s.phase = 'deleting'; tick(); }, 2500);
      } else if (s.phase === 'deleting') {
        if (s.charIdx > 0) {
          s.charIdx--;
          setText(word.slice(0, s.charIdx));
          timer = setTimeout(tick, 40);
        } else {
          s.wordIdx = (s.wordIdx + 1) % words.length;
          s.phase = 'typing';
          tick();
        }
      } else {
        const target = words[s.wordIdx];
        if (s.charIdx < target.length) {
          s.charIdx++;
          setText(target.slice(0, s.charIdx));
          timer = setTimeout(tick, 80);
        } else {
          s.phase = 'pause';
          timer = setTimeout(tick, 2500);
        }
      }
    };
    timer = setTimeout(tick, 2500);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

// Anime.js-powered count-up with intersection trigger. Odometer feel + eased.
function useAnimatedCount(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.textContent = String(target); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const state = { n: 0 };
      animate(state, {
        n: target,
        duration,
        ease: 'outExpo',
        onUpdate: () => { if (el) el.textContent = String(Math.round(state.n)); },
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return ref;
}

const WORDS = ['Imagination', 'Precision', 'Passion', 'Purpose', 'Detail', 'Heart', 'Vision', 'Soul'];

export default function Hero() {
  const [printAnim, setPrintAnim] = useState<any>(null);
  const typed = useTypewriter(WORDS);
  const printsRef = useAnimatedCount(442, 2200);
  const designsRef = useAnimatedCount(50, 1800);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Delay Lottie load to prioritise LCP content
    const timer = setTimeout(() => {
      fetch("/print.json")
        .then((res) => res.ok ? res.json() : null)
        .then((data) => { if (data) setPrintAnim(data); })
        .catch(() => {});
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Anime.js choreography — mount sequence, SVG draw, ambient drift, ring spin.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = heroRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    // 1. SVG signature flourish beneath h1 — draws in stroke-by-stroke.
    const sigPaths = root.querySelectorAll(".hero-signature path");
    if (sigPaths.length) {
      const drawable = svg.createDrawable(sigPaths);
      animate(drawable, {
        draw: ["0 0", "0 1"],
        duration: 2200,
        ease: "inOutQuad",
        delay: stagger(280, { start: 500 }),
      });
    }

    // 2. Continuous ring rotations on the desktop visual card.
    animate(".hero-ring-outer", { rotate: "1turn", duration: 60000, loop: true, ease: "linear" });
    animate(".hero-ring-inner", { rotate: "-1turn", duration: 80000, loop: true, ease: "linear" });

    // 3. Ambient glow drift — subtle parallax life to the background blobs.
    animate(".hero-glow-a", { translateX: [-30, 30], translateY: [-20, 20], duration: 18000, loop: true, alternate: true, ease: "inOutSine" });
    animate(".hero-glow-b", { translateX: [25, -25], translateY: [15, -15], duration: 22000, loop: true, alternate: true, ease: "inOutSine" });
    animate(".hero-glow-c", { translateX: [-20, 20], translateY: [15, -15], duration: 26000, loop: true, alternate: true, ease: "inOutSine" });
    animate(".hero-glow-d", { translateX: [20, -20], translateY: [-20, 20], duration: 20000, loop: true, alternate: true, ease: "inOutSine" });

    // 4. Emblem divider — waits for scroll into view, then scans lines outward + pops emblem.
    const divider = root.querySelector(".hero-emblem-divider");
    if (divider) {
      const play = () => {
        const tl = createTimeline({ defaults: { ease: "outExpo" } });
        tl.add(".hero-divider-line", { scaleX: [0, 1], duration: 1100 })
          .add(".hero-divider-emblem", {
            opacity: [0, 1],
            scale: [0.4, 1],
            rotate: ["-120deg", "0deg"],
            duration: 900,
            ease: "outBack",
          }, "-=700");
      };
      const dObs = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        dObs.disconnect();
        play();
      }, { threshold: 0.4 });
      dObs.observe(divider);
      cleanups.push(() => dObs.disconnect());
    }

    // 5. Emblem hover — spin the main brand emblem on pointer entry.
    const emblemMain = root.querySelector<HTMLImageElement>(".hero-emblem-main");
    if (emblemMain) {
      const spin = () => animate(emblemMain, { rotate: "+=1turn", duration: 1200, ease: "outExpo" });
      emblemMain.addEventListener("mouseenter", spin);
      cleanups.push(() => emblemMain.removeEventListener("mouseenter", spin));
    }

    // 6. Stats stagger reveal when the row scrolls into view.
    const statsRow = root.querySelector(".hero-stats-row");
    if (statsRow) {
      const sObs = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        sObs.disconnect();
        animate(".hero-stat", {
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 700,
          delay: stagger(140),
          ease: "outExpo",
        });
      }, { threshold: 0.4 });
      sObs.observe(statsRow);
      cleanups.push(() => sObs.disconnect());
    }

    return () => { cleanups.forEach((fn) => fn()); };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #080c14 0%, #0c1222 40%, #0e1428 70%, #080c14 100%)' }}>
      {/* Ambient glows - hidden on mobile for performance */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="hero-glow-a absolute left-[-10%] top-[15%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.1] blur-[200px]" />
        <div className="hero-glow-b absolute right-[-5%] top-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/[0.08] blur-[180px]" />
        <div className="hero-glow-c absolute right-[20%] bottom-[10%] w-[350px] h-[350px] rounded-full bg-cyan-500/[0.07] blur-[160px]" />
        <div className="hero-glow-d absolute left-[30%] bottom-[5%] w-[300px] h-[300px] rounded-full bg-emerald-500/[0.05] blur-[150px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:max-w-[min(97vw,2000px)] md:mt-28 md:mb-12 md:py-12 md:rounded-[2rem] md:border md:border-white/10 md:bg-white/[0.03] md:shadow-[0_30px_80px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left">
            {/* Mobile brand name */}
            <div className="lg:hidden mb-4 text-center">
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>ForgeRealm</span>
            </div>

            {/* Emblem + eyebrow */}
            <div className="mb-6 flex items-center gap-4 justify-center lg:justify-start">
              <img src="/frlogorv.png" alt="ForgeRealm Emblem" className="hero-emblem-main h-12 w-12 sm:h-14 sm:w-14 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all duration-500 cursor-pointer" decoding="async" />
              <div>
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-blue-300/70 block" style={{ fontFamily: "'Jost', sans-serif" }}>
                  3D Printed in Leeds
                </span>
                <div className="w-16 h-px bg-gradient-to-r from-blue-400 to-purple-400 mt-1" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[5rem] font-bold leading-[0.9] text-white [text-wrap:balance]" style={{ fontFamily: "'Cinzel', serif" }}>
              Crafted with
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1.1em' }}>
                {typed}
                <span aria-hidden="true" className="typewriter-cursor inline-block w-[2px] h-[0.85em] ml-1 align-middle bg-cyan-300/60" style={{ animation: 'blink 1s step-end infinite' }} />
              </span>
            </h1>
            <style>{`
              @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
              @media (prefers-reduced-motion: reduce) {
                .typewriter-cursor { animation: none !important; opacity: 1 !important; }
              }
            `}</style>

            {/* Signature flourish — anime.js stroke-draws these on mount */}
            <div className="mt-4 flex justify-center lg:justify-start">
              <svg
                className="hero-signature"
                viewBox="0 0 260 26"
                width="260"
                height="26"
                fill="none"
                stroke="url(#hSigGrad)"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hSigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <path d="M4 14 C 40 4, 80 22, 130 12 S 220 4, 256 12" opacity="0.9" />
                <path d="M24 22 L 236 22" strokeWidth="1" opacity="0.35" />
              </svg>
            </div>

            <p className="mt-4 sm:mt-6 max-w-lg text-stone-400 leading-relaxed mx-auto lg:mx-0 text-[13px] sm:text-base lg:text-lg [text-wrap:pretty]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7 }}>
              From articulated dragons to ambient lamps, every piece is designed, printed, and hand-finished in our Leeds workshop. Eco-friendly PLA, no compromise on detail.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white border border-white/30 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c14]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Enter the Shop
              </a>
              <a
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/[0.05] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 transition-all hover:border-white/50 hover:text-white hover:bg-white/10 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080c14]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                See Our Work
              </a>
            </div>

            {/* Mobile: Lottie sits between CTAs and stats */}
            <div className="lg:hidden flex flex-col items-center mt-8">
              {printAnim ? (
                <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] overflow-hidden rounded-2xl bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-300">
                  <Lottie animationData={printAnim} loop className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] -mt-[40px] -ml-[40px] sm:-mt-[50px] sm:-ml-[50px]" />
                </div>
              ) : (
                <img src="/frlogorv.png" alt="ForgeRealm" className="w-20 h-20 opacity-40" />
              )}
            </div>

            {/* Stats row */}
            <div className="hero-stats-row mt-8 sm:mt-10 flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start">
              <div className="hero-stat">
                <p className="text-2xl font-bold text-white tabular-nums" style={{ fontFamily: "'Cinzel', serif" }}>
                  <span ref={printsRef}>0</span>+
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>Prints Sold</p>
              </div>
              <div className="hero-stat">
                <p className="text-2xl font-bold text-white tabular-nums" style={{ fontFamily: "'Cinzel', serif" }}>
                  <span ref={designsRef}>0</span>+
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>Designs</p>
              </div>
              <div className="hero-stat">
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>100%</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-0.5" style={{ fontFamily: "'Jost', sans-serif" }}>Eco PLA</p>
              </div>
            </div>
          </div>

          {/* Right - Lottie in glass card (desktop only) */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Decorative rings — anime.js rotates these continuously */}
              <div className="hero-ring-outer absolute -inset-12 rounded-full border border-blue-500/[0.05]" />
              <div className="hero-ring-inner absolute -inset-20 rounded-full border border-purple-500/[0.03]" />

              {/* Colour glow behind */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/15 via-purple-500/8 to-cyan-500/12 blur-3xl scale-110" />

              {/* Lottie card container */}
              <div className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-t from-amber-500 via-amber-400 to-yellow-300">
                <div className="relative aspect-[4/5] flex items-center justify-center overflow-hidden">
                  {printAnim ? (
                    <Lottie animationData={printAnim} loop className="h-[120%] w-[120%]" />
                  ) : (
                    <img src="/frlogorv.png" alt="" aria-hidden="true" width={180} height={180} className="opacity-40" loading="lazy" decoding="async" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Card footer */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-px bg-black/30" />
                        <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-black/50" style={{ fontFamily: "'Jost', sans-serif" }}>ForgeRealm</span>
                      </div>
                      <p className="text-[13px] text-black/70" style={{ fontFamily: "'Inter', sans-serif" }}>Every piece, a story</p>
                    </div>
                    <img src="/headfrlogorv.png" alt="" className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emblem divider — lines scan outward, emblem pops in on scroll */}
        <div className="hero-emblem-divider flex items-center justify-center gap-4 mt-16">
          <div className="hero-divider-line flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" style={{ transform: 'scaleX(0)', transformOrigin: 'right' }} />
          <img src="/frlogorv.png" alt="" aria-hidden="true" loading="lazy" className="hero-divider-emblem h-8 w-8 opacity-80 drop-shadow-[0_0_12px_rgba(59,130,246,0.45)]" style={{ opacity: 0 }} />
          <div className="hero-divider-line flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />
        </div>
      </div>
    </section>
  );
}
