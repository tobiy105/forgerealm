export default function Process() {
  return (
    <section className="py-24 border-y border-white/10 bg-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">From file to finished part</h2>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Step 01 */}
          <li className="reveal rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <div className="text-white/60 text-sm">01</div>
            <div className="mt-2 font-semibold">Upload CAD</div>
            <p className="text-sm text-white/70">Drag &amp; drop STL/STEP files. We handle DFM checks automatically.</p>
          </li>

          {/* Step 02 */}
          <li className="reveal rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <div className="text-white/60 text-sm">02</div>
            <div className="mt-2 font-semibold">Choose spec</div>
            <p className="text-sm text-white/70">Pick materials, tolerance, finish, and deadline. We price in real-time.</p>
          </li>

          {/* Step 03 */}
          <li className="reveal rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <div className="text-white/60 text-sm">03</div>
            <div className="mt-2 font-semibold">We print &amp; QA</div>
            <p className="text-sm text-white/70">Parts made on industrial machines. Optional CMM &amp; inspection reports.</p>
          </li>

          {/* Step 04 */}
          <li className="reveal rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <div className="text-white/60 text-sm">04</div>
            <div className="mt-2 font-semibold">Ship or pickup</div>
            <p className="text-sm text-white/70">Tracked delivery or local pickup. Packaging for production lots.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}

