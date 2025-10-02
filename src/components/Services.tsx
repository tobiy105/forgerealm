export default function Services() {
    return (
      <section id="services" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Manufacturing services
            </h2>
            <p className="mt-3 text-white/70">
              From quick prototypes to end-use parts, choose the process that fits your job.
            </p>
          </div>
  
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* FDM */}
            <article className="reveal group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 transition glow">
              <header className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">Fused Deposition (FDM)</h3>
                <span className="text-[10px] rounded-full bg-brand-500/20 text-brand-300 px-2 py-1 border border-brand-400/20">
                  Fast
                </span>
              </header>
              <p className="mt-2 text-sm text-white/70">
                Cost-effective prototypes and fixtures in PLA, ABS, PETG, Nylon, and more.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>• Layer height 0.1–0.3 mm</li>
                <li>• Max build 350 × 350 × 400 mm</li>
                <li>• Multi-material &amp; soluble supports</li>
              </ul>
            </article>
  
            {/* SLA / DLP */}
            <article className="reveal group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 transition glow">
              <header className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">SLA / DLP Resin</h3>
                <span className="text-[10px] rounded-full bg-fuchsia-500/20 text-fuchsia-300 px-2 py-1 border border-fuchsia-400/20">
                  Ultra-fine
                </span>
              </header>
              <p className="mt-2 text-sm text-white/70">
                High-detail parts with smooth surface finish. Great for visual models and molds.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>• Layer height 25–100 µm</li>
                <li>• Engineering &amp; castable resins</li>
                <li>• Watertight, translucent options</li>
              </ul>
            </article>
  
            {/* SLS / MJF */}
            <article className="reveal group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 transition glow">
              <header className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">SLS / MJF Nylon</h3>
                <span className="text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 px-2 py-1 border border-emerald-400/20">
                  Durable
                </span>
              </header>
              <p className="mt-2 text-sm text-white/70">
                Strong, isotropic parts with great mechanical properties and no support scars.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>• PA12, PA11, filled nylons</li>
                <li>• Dyeing, vapor smoothing</li>
                <li>• Complex lattices &amp; assemblies</li>
              </ul>
            </article>
  
            {/* Metal Printing */}
            <article className="reveal group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 transition glow">
              <header className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">Metal Printing</h3>
                <span className="text-[10px] rounded-full bg-cyan-500/20 text-cyan-300 px-2 py-1 border border-cyan-400/20">
                  Premium
                </span>
              </header>
              <p className="mt-2 text-sm text-white/70">
                DMLS and Binder Jet for stainless, aluminum, tool steel — post-machined to spec.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>• Post-processing &amp; heat treat</li>
                <li>• CMM reports available</li>
                <li>• Threads, reaming, inserts</li>
              </ul>
            </article>
  
            {/* Urethane Casting */}
            <article className="reveal group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 transition glow">
              <header className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">Urethane Casting</h3>
                <span className="text-[10px] rounded-full bg-rose-500/20 text-rose-300 px-2 py-1 border border-rose-400/20">
                  Bridge
                </span>
              </header>
              <p className="mt-2 text-sm text-white/70">
                Low-volume production from silicone molds. Shore A-D options and color-matched.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>• 10–1000 parts</li>
                <li>• Insert molding &amp; overmold</li>
                <li>• Texture &amp; tint options</li>
              </ul>
            </article>
  
            {/* Finishing Services */}
            <article className="reveal group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 transition glow">
              <header className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-white">Finishing Services</h3>
                <span className="text-[10px] rounded-full bg-amber-500/20 text-amber-300 px-2 py-1 border border-amber-400/20">
                  Pro
                </span>
              </header>
              <p className="mt-2 text-sm text-white/70">
                Sanding, priming, painting, vapor smoothing, inserts, tapping, and assembly.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li>• RITD ≤ 3.2 μm possible</li>
                <li>• Bead-blast, Cerakote, anodize</li>
                <li>• Branding &amp; laser marking</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    );
  }
  