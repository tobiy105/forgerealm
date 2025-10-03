export default function Materials() {
  return (
    <section
      id="materials"
      className="relative py-24 bg-[linear-gradient(315deg,_#000_0%,_#000_40%,_#6366f1_40%,_#3b82f6_100%)]"
    >
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Materials &amp; Filaments
          </h2>
          <p className="mt-3 text-white/70">
            We offer the following filaments for 3D printing:
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {/* PLA */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl hover:bg-black/60 hover:border-blue-400 transition">
            <h3 className="font-semibold">PLA</h3>
            <p className="mt-2 text-sm text-white/70">Biodegradable and made from renewable resources. Our main filament—eco-friendly, safe, and perfect for customisation.</p>
            <p className="mt-1 text-[11px] text-green-400">Eco-friendly</p>
          </div>
          {/* PETG */}
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl hover:bg-black/60 hover:border-blue-400 transition">
            <h3 className="font-semibold">PETG</h3>
            <p className="mt-2 text-sm text-white/70">Recyclable and durable. A strong, flexible option for prints needing extra toughness.</p>
            <p className="mt-1 text-[11px] text-blue-500">Recyclable</p>
          </div>
        </div>
        <div className="max-w-2xl mt-12">
          <p className="text-white/60 text-sm">
            We focus on sustainable materials. More filament types and resin printing coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}
  