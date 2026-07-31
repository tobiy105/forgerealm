export default function Process() {
  return (
    <section className="py-24 border-y border-white/10 bg-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          From file to finished part
        </h2>

        <ol className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-stretch flex-wrap">
          {/* Step 01 */}
          <li
            className="reveal rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl hover:border-blue-400/60 hover:shadow-blue-500/20 hover:shadow-lg transition-all duration-300 hover:scale-105 flex-1 min-w-80"
            style={{ transform: "none" }}
          >
            <div className="text-white/60 text-sm font-mono">01</div>
            <div className="mt-3 font-semibold text-lg">Upload CAD</div>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              Drag &amp; drop STL/STEP files. We handle DFM checks
              automatically.
            </p>
          </li>

          {/* Step 02 */}
          <li
            className="reveal rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl hover:border-blue-400/60 hover:shadow-blue-500/20 hover:shadow-lg transition-all duration-300 hover:scale-105 flex-1 min-w-80"
            style={{ transform: "none" }}
          >
            <div className="text-white/60 text-sm font-mono">02</div>
            <div className="mt-3 font-semibold text-lg">Choose spec</div>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              Pick materials, tolerance, finish, and deadline. We price in
              real-time.
            </p>
          </li>

          {/* Step 03 */}
          <li
            className="reveal rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl hover:border-blue-400/60 hover:shadow-blue-500/20 hover:shadow-lg transition-all duration-300 hover:scale-105 flex-1 min-w-80"
            style={{ transform: "none" }}
          >
            <div className="text-white/60 text-sm font-mono">03</div>
            <div className="mt-3 font-semibold text-lg">We print &amp; QA</div>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              Parts made on industrial machines. Optional CMM &amp; inspection
              reports.
            </p>
          </li>

          {/* Step 04 */}
          <li
            className="reveal rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl hover:border-blue-400/60 hover:shadow-blue-500/20 hover:shadow-lg transition-all duration-300 hover:scale-105 flex-1 min-w-80"
            style={{ transform: "none" }}
          >
            <div className="text-white/60 text-sm font-mono">04</div>
            <div className="mt-3 font-semibold text-lg">Ship or pickup</div>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              Tracked delivery or local pickup. Packaging for production lots.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
