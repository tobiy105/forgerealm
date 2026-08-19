"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stockist announcement: ForgeRealm prints are now carried at The Mini Mall,
 * Merrion Centre, Leeds.
 *
 * Design note: the signature here is the shelf. The photo rests on a rendered
 * shelf edge (lit top lip, dark underside, cast shadow) so the section reads
 * as a physical object on a physical shelf rather than another gradient
 * banner. Everything else is kept quiet so the shelf is the thing you
 * remember. Gold is used rather than the site's blue because on this page
 * gold is the craft/product accent (see Featured Prints) while blue is the
 * system accent (Hero, FAQ, Contact) - a stockist belongs to the former.
 */
export default function Stockist() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "120px 0px -10% 0px" },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stockist"
      ref={sectionRef}
      data-observe
      suppressHydrationWarning
      className={`reveal landing-ambience relative py-16 sm:py-24 overflow-hidden bg-transparent ${isVisible ? "is-visible" : ""}`}
    >
      {/* Top divider, matching the section rhythm used across the page */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FADE6A]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* ── The shelf ─────────────────────────────────────────────── */}
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm lg:mx-0">
              {/* The piece sitting on it */}
              <div className="relative overflow-hidden rounded-t-xl border border-b-0 border-white/[0.08] bg-[#0c1220]">
                <img
                  src="/blog/minimall-opening-2.jpg"
                  alt="ForgeRealm's shelves at The Mini Mall, stacked with printed dragons, dragon eggs, lamps and figurines."
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] h-full w-full object-cover"
                />
                {/* Light falling from above, so the top lip of the shelf reads */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                />
              </div>

              {/* Shelf: lit top lip, dark underside, cast shadow */}
              <div aria-hidden="true" className="relative">
                <div className="h-[3px] w-full bg-gradient-to-r from-[#FADE6A]/30 via-[#FADE6A]/80 to-[#FADE6A]/30" />
                <div className="h-3 w-full rounded-b-md bg-gradient-to-b from-[#6b5a24] to-[#171208] shadow-[0_22px_28px_-16px_rgba(0,0,0,0.95)]" />
                {/* Shelf runs past the object, the way a real one does */}
                <div className="absolute -left-4 -right-4 top-0 -z-10 hidden h-[3px] bg-gradient-to-r from-transparent via-[#FADE6A]/25 to-transparent sm:block" />
              </div>
            </div>
          </div>

          {/* ── The announcement ──────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#FADE6A]/25 bg-[#FADE6A]/[0.07] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FADE6A] opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FADE6A]" />
              </span>
              <span
                className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#FADE6A]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Now stocked in Leeds
              </span>
            </div>

            <h2
              className="mt-5 text-3xl leading-[1.1] text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Now on the shelf at The{" "}
              <em
                className="text-[#FADE6A]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                }}
              >
                Mini Mall
              </em>
            </h2>

            <p
              className="mt-5 max-w-xl text-base leading-[1.8] text-slate-300 sm:text-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              You can pick up ForgeRealm prints in person at The Mini Mall
              inside the Merrion Centre, Leeds. Come and see the pieces up
              close, sharing the space with a load of other independent makers.
            </p>

            {/* Address, set as a labelled detail rather than another sentence */}
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt
                  className="text-[10px] uppercase tracking-[0.22em] text-[#FADE6A]/70"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Where
                </dt>
                <dd
                  className="mt-1.5 text-base text-white sm:text-lg"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  The Mini Mall
                </dd>
              </div>
              <div>
                <dt
                  className="text-[10px] uppercase tracking-[0.22em] text-[#FADE6A]/70"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Inside
                </dt>
                <dd
                  className="mt-1.5 text-base text-white sm:text-lg"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Merrion Centre, Leeds
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Merrion+Centre+Leeds"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FADE6A] to-[#F59E0B] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1a1405] shadow-xl shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:shadow-amber-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FADE6A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Find the Merrion Centre
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-200 backdrop-blur-xl transition hover:border-[#FADE6A]/30 hover:text-[#FADE6A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FADE6A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1a]"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Browse the shop
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
