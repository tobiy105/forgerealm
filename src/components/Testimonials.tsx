"use client";
import { FaCommentDots } from "react-icons/fa";

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0b0b0e] via-[#101018] to-blue-900 overflow-hidden">
      {/* Ambient blue-purple glow bottom left */}
      <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-blue-500/30 blur-[120px] -z-10" />
      <div className="absolute left-24 bottom-12 h-56 w-56 rounded-full bg-purple-500/20 blur-[100px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with icon */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white whitespace-nowrap">
            Testimonials
          </h2>
          <div className="relative flex-shrink-0 mt-1 sm:mt-2 text-sky-200 drop-shadow-[0_0_16px_rgba(125,200,255,0.6)]">
            <FaCommentDots className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="group flex flex-col rounded-3xl border border-white/10 text-center bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:border-blue-400/50 hover:shadow-[0_8px_40px_-8px_rgba(96,165,250,0.5)] hover:-translate-y-2 relative max-md:border-blue-400/50 max-md:shadow-[0_8px_40px_-8px_rgba(96,165,250,0.5)]">
            <p className="text-xl font-bold text-white mb-2">
              Absolutely brilliant service!
            </p>
            <blockquote className="mt-4 text-white leading-relaxed">
              I ordered a custom figurine from the shop and it arrived in just a
              few days. The detail and finish were amazing. I will definitely
              buy again!
            </blockquote>
            <div className="mt-8">
              <p className="text-base font-bold text-white">Oliver Bennett</p>
              <p className="text-sm text-white/60">Leeds, United Kingdom</p>
            </div>
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-30 max-md:opacity-30 transition bg-gradient-to-t from-blue-400 via-transparent to-transparent blur-xl" />
          </div>

          {/* Testimonial 2 */}
          <div className="group flex flex-col rounded-3xl border border-white/10 text-center bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:border-blue-400/50 hover:shadow-[0_8px_40px_-8px_rgba(96,165,250,0.5)] hover:-translate-y-2 relative max-md:border-blue-400/50 max-md:shadow-[0_8px_40px_-8px_rgba(96,165,250,0.5)]">
            <p className="text-xl font-bold text-white mb-2">
              Great prices & instant quotes!
            </p>
            <blockquote className="mt-4 text-white leading-relaxed">
              Bought a set of keychains and a vase. Checkout was easy and the
              quality is top notch. Highly recommend for unique gifts!
            </blockquote>
            <div className="mt-8">
              <p className="text-base font-bold text-white">Sophie Clarke</p>
              <p className="text-sm text-white/60">Leeds, United Kingdom</p>
            </div>
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-30 max-md:opacity-30 transition bg-gradient-to-t from-blue-400 via-transparent to-transparent blur-xl" />
          </div>

          {/* Testimonial 3 */}
          <div className="group flex flex-col rounded-3xl border border-white/10 text-center bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:border-blue-400/50 hover:shadow-[0_8px_40px_-8px_rgba(96,165,250,0.5)] hover:-translate-y-2 relative max-md:border-blue-400/50 max-md:shadow-[0_8px_40px_-8px_rgba(96,165,250,0.5)]">
            <p className="text-xl font-bold text-white mb-2">
              Fantastic quality and service
            </p>
            <blockquote className="mt-4 text-white leading-relaxed">
              Bought a custom gift and some accessories from the shop.
              Everything arrived quickly, looked amazing, and the team was super
              helpful. Highly recommended!
            </blockquote>
            <div className="mt-8">
              <p className="text-base font-bold text-white">Charlotte Evans</p>
              <p className="text-sm text-white/60">Leeds, United Kingdom</p>
            </div>
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-30 max-md:opacity-30 transition bg-gradient-to-t from-blue-400 via-transparent to-transparent blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
