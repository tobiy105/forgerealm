export default function Pricing() {
    return (
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-white/70">
              Pay as you print or scale with production plans. Educational discounts available.
            </p>
          </div>
  
          {/* Pricing tiers */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Prototype plan */}
            <div className="reveal rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col">
              <div className="text-sm text-white/60">Prototype</div>
              <div className="mt-1 text-3xl font-extrabold">
                £0.25<span className="text-lg text-white/60">/cm³</span>
              </div>
              <p className="mt-2 text-sm text-white/70">
                Best for one-offs, proofs of concept, and quick fixtures.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                <li>• FDM &amp; SLA included</li>
                <li>• 3–5 day lead time</li>
                <li>• Standard QA</li>
              </ul>
              <a
                href="#quote"
                className="mt-6 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-center font-semibold hover:bg-white/20"
              >
                Get started
              </a>
            </div>
  
            {/* Production plan (highlighted) */}
            <div className="reveal relative rounded-3xl border border-brand-500/40 bg-gradient-to-b from-brand-500/10 to-fuchsia-500/10 p-6 backdrop-blur-xl shadow-glow flex flex-col">
              <div className="absolute right-6 -top-3 text-[10px] rounded-full bg-white text-black px-2 py-1 font-semibold">
                Most Popular
              </div>
              <div className="text-sm text-white/80">Production</div>
              <div className="mt-1 text-3xl font-extrabold">
                £0.40<span className="text-lg text-white/60">/cm³</span>
              </div>
              <p className="mt-2 text-sm text-white/80">
                For low-volume runs and end-use parts with premium finishes.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li>• SLS &amp; MJF nylon</li>
                <li>• 2–4 day lead time</li>
                <li>• Enhanced QA + dyeing</li>
              </ul>
              <a
                href="#quote"
                className="mt-6 rounded-xl bg-white text-black px-4 py-2 text-center font-semibold hover:shadow-glow"
              >
                Choose plan
              </a>
            </div>
  
            {/* Enterprise plan */}
            <div className="reveal rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl flex flex-col">
              <div className="text-sm text-white/60">Enterprise</div>
              <div className="mt-1 text-3xl font-extrabold">Custom</div>
              <p className="mt-2 text-sm text-white/70">
                For regulated industries, procurement, and recurring orders.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                <li>• DMLS &amp; machining</li>
                <li>• SLA 25 µm + polishing</li>
                <li>• NDA + CMM reports</li>
              </ul>
              <a
                href="#contact"
                className="mt-6 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-center font-semibold hover:bg-white/20"
              >
                Talk to sales
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  