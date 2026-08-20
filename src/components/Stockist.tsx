"use client";

import { useReveal } from "../hooks/useReveal";

/**
 * Stockist announcement: ForgeRealm prints are now carried at The Mini Mall,
 * Merrion Centre, Leeds.
 *
 * Design note: copy sits up top, then a bento of four photos below it. The
 * grid is deliberately uneven, a tall portrait of our shelves anchoring the
 * left and the venue running wide along the bottom, so it reads as a display
 * rather than a row of thumbnails. The whole block rests on a gold ledge,
 * picking up the shelf the copy describes. Gold is used rather than the
 * site's blue because on this page gold is the craft/product accent (see
 * Featured Prints) while blue is the system accent (Hero, FAQ, Contact).
 */

/* Tiles are placed by the shape of the photo rather than by importance: the
   two portraits take the full-height cells, the two landscapes run wide
   beside them, so nothing is cropped against its grain. */
const TILES = [
  {
    src: "/blog/minimall-shelf-tower.jpg",
    alt: "A full ForgeRealm shelving tower at The Mini Mall, holding printed lamps, cats, a dragon and castle, cones and mermaid tails.",
    className: "col-span-1 row-span-2 lg:col-span-3 lg:row-span-2",
  },
  {
    src: "/blog/minimall-opening-2.jpg",
    alt: "ForgeRealm's shelves at The Mini Mall, stacked with printed dragons, dragon eggs, lamps and figurines.",
    className: "col-span-1 row-span-2 lg:col-span-3 lg:row-span-2",
  },
  {
    src: "/blog/minimall-opening-1.jpg",
    alt: "Inside The Mini Mall at the Merrion Centre in Leeds.",
    className: "col-span-2 lg:col-span-6",
  },
  {
    src: "/blog/minimall-shelf-detail.jpg",
    alt: "A close-up of one ForgeRealm shelf, lined with small printed figurines, mushrooms and trinkets.",
    className: "col-span-2 lg:col-span-6",
  },
];

export default function Stockist() {
  const section = useReveal<HTMLElement>();

  return (
    <section
      id="stockist"
      ref={section.ref}
      data-observe
      suppressHydrationWarning
      className={`reveal landing-ambience relative py-16 sm:py-24 overflow-hidden bg-transparent ${section.isVisible ? "is-visible" : ""}`}
    >
      {/* No top divider here: this sits directly under the marquee strip,
          which already closes with its own border. */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* ── The announcement ────────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <h2
              className="text-3xl leading-[1.15] text-white sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Now on the shelf at The Mini Mall
            </h2>

            <p
              className="mt-5 max-w-xl text-base leading-[1.8] text-slate-300 sm:text-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              You can pick up ForgeRealm prints in person at The Mini Mall
              inside the Merrion Centre, Leeds. Come and see the pieces up
              close, sharing the space with a load of other independent makers.
            </p>
          </div>

          <div>
            {/* Address, set as a labelled detail rather than another sentence */}
            <dl className="flex flex-wrap gap-x-10 gap-y-4">
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

            <div className="mt-7 flex flex-wrap items-center gap-3">
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

        {/* ── The bento, resting on a shelf ───────────────────────────── */}
        <div className="mt-12 sm:mt-14">
          <div className="grid auto-rows-[132px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:auto-rows-[240px] lg:grid-cols-12">
            {TILES.map((tile) => (
              <figure
                key={tile.src}
                className={`group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c1220] transition-colors duration-500 hover:border-[#FADE6A]/35 ${tile.className}`}
              >
                <img
                  src={tile.src}
                  alt={tile.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                />
              </figure>
            ))}
          </div>

          {/* Shelf: lit top lip, dark underside, cast shadow */}
          <div aria-hidden="true" className="relative mt-0">
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#FADE6A]/70 to-transparent" />
            <div className="h-3 w-full rounded-b-md bg-gradient-to-b from-[#6b5a24]/80 to-[#171208] shadow-[0_22px_28px_-16px_rgba(0,0,0,0.95)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
