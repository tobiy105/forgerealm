export default function Faq() {
    return (
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            FAQs
          </h2>
  
          {/* FAQ items */}
          <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
            {/* Item 1 */}
            <details className="group p-6" open>
              <summary className="flex cursor-pointer list-none items-center justify-between text-white/80">
                <span>What tolerances can you hold?</span>
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-3 text-sm text-white/70">
                Typical ±0.2 mm for plastics and ±0.1 mm for metals; part geometry and size may affect results. CMM reports on request.
              </div>
            </details>
  
            {/* Item 2 */}
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-white/80">
                <span>Do you sign NDAs?</span>
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-3 text-sm text-white/70">
                Yes. We’re happy to sign a mutual NDA before file transfer. Secure, access-controlled storage by default.
              </div>
            </details>
  
            {/* Item 3 */}
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-white/80">
                <span>Can you do finishing and assembly?</span>
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-3 text-sm text-white/70">
                Absolutely — sanding, priming, painting, inserts, tapping, small assemblies, and more. Share a drawing and we’ll scope it.
              </div>
            </details>
  
            {/* Item 4 */}
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-white/80">
                <span>Which file formats do you accept?</span>
                <span className="transition group-open:rotate-180">⌄</span>
              </summary>
              <div className="mt-3 text-sm text-white/70">
                STL, STEP, and OBJ are preferred. We can also convert from other CAD formats if needed.
              </div>
            </details>
          </div>
        </div>
      </section>
    );
  }
  