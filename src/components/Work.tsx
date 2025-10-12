"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Work() {
  const images = ["/ablamp.jpeg", "/ablamp2.jpeg"];
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-gradient-to-br from-[#0b0b0e] via-[#101018] to-[#0d0f15]"
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 h-[40rem] w-[40rem] rounded-full bg-pink-500/20 blur-[200px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[40rem] w-[40rem] rounded-full bg-emerald-500/20 blur-[200px]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 relative py-24 sm:py-32">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white whitespace-nowrap">
              Recent Work
            </h2>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="mt-2 relative flex-shrink-0"
            >
              <Image
                src="/work.gif"
                alt="Work Animation"
                width={64}
                height={64}
                className="w-10 sm:w-16 h-auto opacity-90 drop-shadow-[0_0_14px_rgba(236,72,153,0.6)]"
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm sm:text-base mb-12">
          <span className="inline-flex items-center gap-1 bg-white/5 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-white/10">
            ⚙️ Multi-material capability
          </span>
          <span className="inline-flex items-center gap-1 bg-white/5 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-white/10">
            🌱 100% biodegradable PLA used
          </span>
        </div>

        {/* Featured Carousel with Glow */}
        <div className="relative mb-24">
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-12 rounded-[2.5rem] bg-gradient-to-tr from-fuchsia-500/25 via-emerald-400/20 to-sky-400/10 blur-[140px] opacity-70 -z-10" />

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_100px_-10px_rgba(99,102,241,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
              {/* Image Carousel */}
              <div className="relative overflow-hidden h-[60vh] sm:h-[70vh] md:h-[90vh] w-full">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={index}
                    src={images[index]}
                    alt={`Aurora Bloom ${index + 1}`}
                    className="w-full h-full object-cover absolute top-0 left-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* Navigation Buttons (hidden on mobile) */}
                <button
                  onClick={prevSlide}
                  className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-6 sm:p-7 transition text-xl"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-6 sm:p-7 transition text-xl"
                  aria-label="Next"
                >
                  →
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-3 w-3 rounded-full transition ${
                        i === index ? "bg-fuchsia-400" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center text-center md:text-left max-w-2xl mx-auto">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5">
                  Featured: Aurora Bloom
                </h3>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                  Aurora Bloom is a 3D printed lamp shade with a gradient flowing
                  from green to yellow to pink. Its spiral layering diffuses
                  light softly, giving a natural glow. Printed in precision
                  gradient PLA for strength and style.
                </p>
                {/* <div className="inline-block rounded-full border border-fuchsia-500 bg-fuchsia-500/10 px-6 py-3 text-sm sm:text-base font-semibold text-fuchsia-300 transition hover:bg-fuchsia-500/30 cursor-pointer w-fit mx-auto md:mx-0">
                  See project details →
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div className="mt-24 sm:mt-32 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Owl */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-pink-400/50 hover:shadow-[0_0_50px_-5px_rgba(236,72,153,0.5)] hover:-translate-y-3">
            <div className="aspect-square overflow-hidden">
              <img
                src="/owl.jpg"
                alt="Coat of Arms Owl"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            <div className="p-6 sm:p-8 text-center sm:text-left">
              <h3 className="text-lg sm:text-2xl font-semibold text-white mb-3">
                Coat of Arms Owl
              </h3>
              <p className="text-sm sm:text-base text-white/70 mb-5">
                A Leeds-inspired owl printed in PLA, fading from warm yellow at
                the feet to soft pink at the head. Inspired by the Leeds Coat of
                Arms and Leeds United’s heritage.
              </p>
              {/* <div className="inline-block rounded-full border border-pink-400 bg-pink-400/10 px-4 py-2 text-sm font-semibold text-pink-300 transition group-hover:bg-pink-400/30">
                Learn More →
              </div> */}
            </div>
          </div>

          {/* Forest Dragon */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-emerald-400/50 hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.5)] hover:-translate-y-3">
            <div className="aspect-square overflow-hidden">
              <img
                src="/dragon.jpg"
                alt="Forest Dragon"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            <div className="p-6 sm:p-8 text-center sm:text-left">
              <h3 className="text-lg sm:text-2xl font-semibold text-white mb-3">
                Forest Dragon
              </h3>
              <p className="text-sm sm:text-base text-white/70 mb-5">
                A forest dragon printed in green PLA with tones that shift in
                the light. The natural finish gives a lifelike, earthy feel.
              </p>
              {/* <div className="inline-block rounded-full border border-emerald-400 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition group-hover:bg-emerald-400/30">
                Learn More →
              </div> */}
            </div>
          </div>

          {/* Dice Dragon */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-sky-400/50 hover:shadow-[0_0_50px_-5px_rgba(56,189,248,0.5)] hover:-translate-y-3">
            <div className="aspect-square overflow-hidden">
              <img
                src="/dice-dragon.jpg"
                alt="Dice Holder Dragon"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            <div className="p-6 sm:p-8 text-center sm:text-left">
              <h3 className="text-lg sm:text-2xl font-semibold text-white mb-3">
                Dice Holder Dragon
              </h3>
              <p className="text-sm sm:text-base text-white/70 mb-5">
                A metallic blue dragon head built to hold a full set of D&D
                dice. Compact, sleek, and printed in biodegradable PLA.
              </p>
              {/* <div className="inline-block rounded-full border border-sky-400 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300 transition group-hover:bg-sky-400/30">
                Learn More →
              </div> */}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 sm:mt-32 text-center">
          <p className="text-white/70 mb-4 text-sm sm:text-lg">
            Want to see more designs or behind-the-scenes prints?
          </p>
          <a
            href="#"
            className="inline-block rounded-full border border-blue-400 bg-blue-400/10 px-8 py-4 text-sm sm:text-base font-semibold text-blue-300 transition hover:bg-blue-400/30"
          >
            View full gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
