"use client";

import Spline from "@splinetool/react-spline";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
// React Icons
import { BsRocketTakeoff } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { TbLeaf } from "react-icons/tb";
import { MdBrush } from "react-icons/md";
import { GiDragonHead } from "react-icons/gi";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const widgetRef = useRef(null);
  const buttonsRef = useRef(null);
  const buttonsInView = useInView(buttonsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
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
          {/* Brand Row: Logo + Title (logo on LEFT) */}
          <div className="flex items-center gap-6 mb-2 justify-center lg:justify-start">
            <Image
              src="/notitlefrwatermark.png"
              alt="ForgeRealm Logo"
              width={90}
              height={90}
              className="object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.55)] hidden sm:block"
              priority
            />
            <div className="relative inline-block">
              {/* Glow visible on all viewports */}
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl opacity-40 rounded-lg block" />
              <h1 className="relative font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
                Forge<span className="text-blue-400">Realm</span>
              </h1>
            </div>
          </div>

          {/* Tagline */}
          <p className="mt-4 text-xl text-blue-200 text-center lg:text-left">
            A creative hub for sleek, eco-friendly models.
          </p>

          {/* Description */}
          <p className="mt-6 text-md sm:text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
            Eco-friendly models designed to bring your ideas into focus. Sleek
            collectibles, modern accessories, and bold designs for everyday life.
          </p>

          {/* CTA Buttons — Animated */}
          <motion.div
            ref={buttonsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={buttonsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <a
              href="#shop"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-sm uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_20px_rgba(96,165,250,0.7)] transition-all duration-200"
            >
              Explore Models
            </a>

            {/* Yellow Standout Button */}
            <a
              href="#about"
              className="px-4 py-2 rounded-full border border-white text-white font-semibold text-sm uppercase tracking-wide bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-yellow-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-200"
            >
              Learn More
            </a>
          </motion.div>

          {/* Feature Tags */}
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

        {/* Right Side “Widget” Sidebar */}
        <div
          ref={widgetRef}
          className={`hidden lg:flex flex-col gap-12 transition-all duration-700 ease-out ${
            visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}
        >
          <div className="flex items-start gap-4">
            <BsRocketTakeoff className="text-blue-400 text-3xl shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Designed for Creativity
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                A foundation for your ideas — clean, minimal, and made for
                customization.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiStar className="text-blue-300 text-3xl shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Built to Inspire
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-sm">
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
