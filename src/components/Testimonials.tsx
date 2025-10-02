export default function Testimonials() {
    return (
      <section className="py-24 border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Loved by product teams
          </h2>
  
          {/* Testimonials grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <blockquote className="reveal rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <p className="text-white/80">
                “We moved from 3-week lead times to 3 days. Surface finish is stellar.”
              </p>
              <footer className="mt-4 text-sm text-white/60">
                — Maya P., Hardware Lead
              </footer>
            </blockquote>
  
            <blockquote className="reveal rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <p className="text-white/80">
                “Dimensional accuracy was spot on. The QA report made procurement happy.”
              </p>
              <footer className="mt-4 text-sm text-white/60">
                — Jorge R., Operations
              </footer>
            </blockquote>
  
            <blockquote className="reveal rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <p className="text-white/80">
                “Their dyed MJF parts look injection-molded. Customers can’t tell the difference.”
              </p>
              <footer className="mt-4 text-sm text-white/60">
                — Li W., Founder
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    );
  }
  