export default function Work() {
    return (
      <section id="work" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Recent work
              </h2>
              <p className="mt-3 text-white/70">A peek at what ships from our floor.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
              <button
                className="rounded-lg border border-white/10 px-3 py-2 hover:bg-white/10"
                id="scrollLeft"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                className="rounded-lg border border-white/10 px-3 py-2 hover:bg-white/10"
                id="scrollRight"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>
  
          {/* Work scroller */}
          <div
            id="workScroller"
            className="mt-8 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none]"
            style={{ scrollBehavior: "smooth" }}
          >
  
            {/* Card 1 */}
            <figure className="min-w-[80%] sm:min-w-[52%] lg:min-w-[32%] snap-start rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition glow">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-tr from-brand-500/30 to-fuchsia-500/30 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-32 h-32 opacity-80" aria-hidden="true">
                  <defs>
                    <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#42B6FF" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#lg1)"
                    d="M33 150c0-28 44-22 63-40 22-21 4-63 32-63s39 33 39 61-29 57-57 57-77-1-77-15z"
                  />
                </svg>
              </div>
              <figcaption className="p-3">
                <div className="font-semibold">SLS Nylon Drone Shell</div>
                <p className="text-sm text-white/60">Dye black + vapor smooth. 36-hour turnaround.</p>
              </figcaption>
            </figure>
  
            {/* Card 2 */}
            <figure className="min-w-[80%] sm:min-w-[52%] lg:min-w-[32%] snap-start rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition glow">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-tr from-emerald-500/30 to-cyan-500/30 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-32 h-32 opacity-80" aria-hidden="true">
                  <defs>
                    <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="60" fill="url(#lg2)" />
                </svg>
              </div>
              <figcaption className="p-3">
                <div className="font-semibold">SLA Clear Manifold</div>
                <p className="text-sm text-white/60">
                  Polished for transparency. Pressure tested to 2 bar.
                </p>
              </figcaption>
            </figure>
  
            {/* Card 3 */}
            <figure className="min-w-[80%] sm:min-w-[52%] lg:min-w-[32%] snap-start rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition glow">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-tr from-rose-500/30 to-amber-500/30 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-32 h-32 opacity-80" aria-hidden="true">
                  <defs>
                    <linearGradient id="lg3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F43F5E" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                  <rect x="50" y="50" width="100" height="100" rx="18" fill="url(#lg3)" />
                </svg>
              </div>
              <figcaption className="p-3">
                <div className="font-semibold">FDM Jig &amp; Fixture Set</div>
                <p className="text-sm text-white/60">
                  CF-Nylon with brass inserts. ±0.15 mm accuracy.
                </p>
              </figcaption>
            </figure>
  
            {/* Card 4 */}
            <figure className="min-w-[80%] sm:min-w-[52%] lg:min-w-[32%] snap-start rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl hover:bg-white/10 transition glow">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-tr from-sky-500/30 to-indigo-500/30 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-32 h-32 opacity-80" aria-hidden="true">
                  <polygon points="40,160 100,40 160,160" fill="url(#g)" />
                </svg>
              </div>
              <figcaption className="p-3">
                <div className="font-semibold">DMLS Heat Sink</div>
                <p className="text-sm text-white/60">
                  AlSi10Mg, post-machined, bead-blasted finish.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    );
  }
  