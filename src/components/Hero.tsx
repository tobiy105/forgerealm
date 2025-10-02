"use client"; // Spline is interactive, so it must be a Client Component

import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Spline scene="/scene.splinecode" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-28">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
          High-precision 3D printing for prototypes &amp; production
        </h1>
        <p className="mt-5 text-white/70 max-w-xl">
          Upload parts, pick materials, and get real-time pricing. We handle
          finishing, QA, and delivery. Built for product teams, makers, and
          enterprises.
        </p>
      </div>
    </section>
  );
}
