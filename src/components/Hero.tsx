"use client";

import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";
// React Icons
import { BsRocketTakeoff } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { TbLeaf } from "react-icons/tb";
import { MdBrush } from "react-icons/md";
import { GiDragonHead } from "react-icons/gi";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (widgetRef.current) observer.observe(widgetRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <Spline scene="/scene.splinecode" />
      </div>

      {/* Decorative gradient overlay (desktop only) */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-900/40 to-transparent -z-10" />

      {/* 2-Column Layout */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 gap-16 lg:gap-20">
        {/* Left Side Content */}
        <div>
          <div className="relative inline-block">
            <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl opacity-40 rounded-lg hidden lg:block" />
            <h1 className="relative font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
              Forge<span className="text-blue-400">Realm</span>
            </h1>
          </div>
          <p className="mt-4 text-xl text-blue-200 hidden lg:block">
            A creative hub for sleek, eco-friendly models.
          </p>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-xl leading-relaxed">
            Eco-friendly models designed to bring your ideas into focus — sleek
            collectibles, modern accessories, and bold designs for everyday life.
          </p>
          <div className="mt-10 flex gap-4">
            <a
              href="#shop"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_20px_rgba(96,165,250,0.7)] transition-all duration-200"
            >
              Explore Models
            </a>
            <a
              href="#about"
              className="px-4 py-2 rounded-full border border-blue-400 text-blue-300 font-semibold text-sm uppercase tracking-wide hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-all duration-200"
            >
              Learn More
            </a>
          </div>

          {/* Slim Highlight Row (desktop only) */}
          <div className="hidden lg:flex gap-2 mt-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
              <TbLeaf className="text-green-400 text-xl" />
              <span className="text-sm text-gray-300">Eco-Friendly PLA</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
              <MdBrush className="text-pink-400 text-xl" />
              <span className="text-sm text-gray-300">Paint-Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
              <GiDragonHead className="text-indigo-400 text-xl" />
              <span className="text-sm text-gray-300">Fantasy Figurines</span>
            </div>
          </div>
        </div>

        {/* Right Side "Widget" Sidebar */}
        <div
          ref={widgetRef}
          className={`hidden lg:flex flex-col gap-12 transition-all duration-700 ease-out ${
            visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}
        >
          <div className="flex items-start gap-4">
            <BsRocketTakeoff className="text-blue-400 text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Designed for Creativity
              </h3>
              <p className="text-gray-400">
                A foundation for your ideas — clean, minimal, and made for
                customization.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiStar className="text-blue-300 text-3xl" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Built to Inspire
              </h3>
              <p className="text-gray-400">
                From bold figurines to subtle details, each piece sparks
                imagination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
