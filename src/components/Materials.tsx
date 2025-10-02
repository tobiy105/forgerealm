export default function Materials() {
    return (
      <section id="materials" className="py-24 border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Materials &amp; finishes
            </h2>
            <p className="mt-3 text-white/70">
              Select from 250+ stocked materials. Custom sourcing available.
            </p>
          </div>
  
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Engineering Plastics */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
              <h3 className="font-semibold">Engineering Plastics</h3>
              <p className="mt-2 text-sm text-white/70">
                ABS, ASA, PETG, PC, Nylon (PA12/PA11), CF-Nylon, PEEK*
              </p>
              <p className="mt-1 text-[11px] text-white/50">*On request</p>
            </div>
  
            {/* Resins */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
              <h3 className="font-semibold">Resins</h3>
              <p className="mt-2 text-sm text-white/70">
                Standard, Tough, ABS-Like, Flexible, High-Temp, Castable
              </p>
            </div>
  
            {/* Metals */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
              <h3 className="font-semibold">Metals</h3>
              <p className="mt-2 text-sm text-white/70">
                AlSi10Mg, 17-4PH, 316L, H13, Inconel 625, Copper
              </p>
            </div>
  
            {/* Finishes */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
              <h3 className="font-semibold">Finishes</h3>
              <p className="mt-2 text-sm text-white/70">
                Sanded, Painted, Dyed, Vapor-Smoothed, Anodized, Cerakote
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  