export default function Materials() {
  return (
    <section
      id="materials"
      className="relative py-24 bg-[linear-gradient(315deg,_#0b0b0e_0%,_#101018_40%,_#6366f1_40%,_#3b82f6_100%)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Materials &amp; Filaments
          </h2>
          <p className="mt-3 text-white/70">
            We offer the following filaments for 3D printing:
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {/* PLA */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-blue-400 hover:bg-white/10 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.3)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">PLA</h3>
              <span className="text-xs rounded-full border border-green-400/50 bg-green-400/10 px-2 py-0.5 text-green-400">
                Eco-friendly
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Biodegradable and made from renewable resources. Our main filament, eco-friendly, safe, and perfect for customisation.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />
                <span>Biodegradable and sustainable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0" />
                <span>Renewable and low impact</span>
              </li>
            </ul>
          </div>

          {/* PETG */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-blue-400 hover:bg-white/10 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.3)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">PETG</h3>
              <span className="text-xs rounded-full border border-blue-400/50 bg-blue-400/10 px-2 py-0.5 text-blue-400">
                Recyclable
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Recyclable and durable. A strong, flexible option for prints needing extra toughness.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span>Durable and flexible structure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                <span>Ideal for high-stress parts</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer note */}
        <div className="max-w-2xl mt-12">
          <p className="text-white/60 text-sm">
            We focus on sustainable materials. More filament types and resin printing coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
