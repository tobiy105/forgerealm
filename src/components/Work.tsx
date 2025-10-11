export default function Work() {
  return (
    <section
      id="work"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0b0b0e] via-[#101018] to-[#0d0f15]"
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-pink-500/20 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-emerald-500/20 blur-[140px]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />
        {/* Floating particle lights */}
        <div className="absolute inset-0">
          <div className="absolute w-2 h-2 bg-fuchsia-400/40 rounded-full blur-sm top-1/3 left-[20%] animate-pulse" />
          <div className="absolute w-1.5 h-1.5 bg-emerald-400/40 rounded-full blur-sm bottom-1/3 right-[25%] animate-ping" />
          <div className="absolute w-1.5 h-1.5 bg-sky-400/40 rounded-full blur-sm top-[60%] left-[70%] animate-pulse delay-700" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
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
              className="rounded-lg border border-white/10 px-3 py-2 hover:bg-white/10 hover:text-white/90 transition"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              className="rounded-lg border border-white/10 px-3 py-2 hover:bg-white/10 hover:text-white/90 transition"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        {/* Quick highlight bar */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-white/60 text-sm">
          <span className="inline-flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            ⚙️ Multi-material capability
          </span>
          <span className="inline-flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            🌱 100% biodegradable PLA used
          </span>
        </div>

        {/* Featured project banner */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]">
          <div className="grid md:grid-cols-2">
            <div className="aspect-square md:aspect-auto overflow-hidden">
              <img
                src="/owl.jpg"
                alt="Featured 3D Print"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold text-white mb-3">
                Featured: Leeds Coat of Arms Owl
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                A high-detail artistic print that blends heritage and craft. This piece
                became our most-requested model at local Leeds markets and showcases
                the smooth gradient capabilities of our color-blend PLA.
              </p>
              <div className="inline-block rounded-full border border-fuchsia-500 bg-fuchsia-500/10 px-4 py-2 text-sm font-semibold text-fuchsia-300 transition hover:bg-fuchsia-500/30 cursor-pointer w-fit">
                See project details →
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 - Coat of Arms Owl */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-pink-400/50 hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.5)] hover:-translate-y-2">
            <div className="aspect-square overflow-hidden">
              <img
                src="/owl.jpg"
                alt="Coat of Arms Owl 3D Print"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Coat of Arms Owl</h3>
              <p className="text-sm text-white/70 mb-4">
                A Leeds inspired owl printed in PLA. Its color fades from warm yellow at
                the feet to a soft pink at the head. The finish captures a blend of pride
                and craft, giving the piece a gentle, royal character.
              </p>
              <div className="inline-block rounded-full border border-pink-400 bg-pink-400/10 px-3 py-1 text-sm font-semibold text-pink-300 transition group-hover:bg-pink-400/30">
                Learn More →
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition bg-gradient-to-tr from-pink-400 via-transparent to-transparent blur-xl" />
          </div>

          {/* Card 2 - Forest Dragon */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-emerald-400/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] hover:-translate-y-2">
            <div className="aspect-square overflow-hidden">
              <img
                src="/dragon.jpg"
                alt="Forest Dragon 3D Print"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Forest Dragon</h3>
              <p className="text-sm text-white/70 mb-4">
                A forest dragon with deep green tones that shift in the light. Every
                scale and curve feels alive, as if grown from the woods themselves.
                Printed with biodegradable PLA for a sustainable finish.
              </p>
              <div className="inline-block rounded-full border border-emerald-400 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-300 transition group-hover:bg-emerald-400/30">
                Learn More →
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition bg-gradient-to-tr from-emerald-400 via-transparent to-transparent blur-xl" />
          </div>

          {/* Card 3 - Dice Holder Dragon */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-sky-400/50 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.5)] hover:-translate-y-2">
            <div className="aspect-square overflow-hidden">
              <img
                src="/dice-dragon.jpg"
                alt="Dice Holder Dragon 3D Print"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Dice Holder Dragon
              </h3>
              <p className="text-sm text-white/70 mb-4">
                The head of a dragon with a metallic blue finish, designed to hold a full
                set of D&amp;D dice inside its mouth. Its sharp details and gryphon-like
                features give it a strong, mythic presence. Made entirely from
                biodegradable PLA.
              </p>
              <div className="inline-block rounded-full border border-sky-400 bg-sky-400/10 px-3 py-1 text-sm font-semibold text-sky-300 transition group-hover:bg-sky-400/30">
                Learn More →
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition bg-gradient-to-tr from-sky-400 via-transparent to-transparent blur-xl" />
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-20 text-center">
          <p className="text-white/70 mb-4 text-sm">
            Want to see more designs or behind-the-scenes prints?
          </p>
          <a
            href="#"
            className="inline-block rounded-full border border-blue-400 bg-blue-400/10 px-6 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-400/30"
          >
            View full gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
