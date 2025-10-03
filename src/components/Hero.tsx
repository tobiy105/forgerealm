"use client";
import Spline from "@splinetool/react-spline";

export default function Hero() {
  return (
    <section className="relative bg-black min-h-screen overflow-hidden">
      {/* Fullscreen Spline (keep interactive) */}
      <div className="absolute inset-0">
        <Spline scene="/scene.splinecode" className="hero-spline" />
      </div>

      {/* Overlay Layout */}
      <div className="relative z-10 flex items-center min-h-screen pointer-events-none">
        <div className="w-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Content (only text is hoverable) */}
          <div className="flex flex-col justify-center text-left">
            <div className="pointer-events-auto">
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white hover:text-amber-300 transition-colors duration-300">
                Flash
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Realm
                </span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-md hover:text-white transition-colors duration-300">
                Explore eco-friendly models that turn your creative ideas into unique
                collectibles and accessories.
              </p>
              <div className="mt-6">
                <button className="px-6 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-orange-500 to-amber-400 hover:opacity-90 transition">
                  Join Us Now
                </button>
              </div>
            </div>
          </div>

          {/* Empty column keeps space for sphere */}
          <div></div>
        </div>
      </div>
    </section>
  );
}
