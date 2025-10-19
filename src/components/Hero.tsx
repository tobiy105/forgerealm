"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BsRocketTakeoff } from "react-icons/bs";
import { FiStar } from "react-icons/fi";
import { TbLeaf } from "react-icons/tb";
import { MdBrush } from "react-icons/md";
import { GiDragonHead } from "react-icons/gi";
import { RiEarthLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRecycle } from "react-icons/fa";
import Spline from "@splinetool/react-spline";

interface HeroProps {
  onLoadComplete?: () => void;
}

export default function Hero({ onLoadComplete }: HeroProps) {
  const [visible, setVisible] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    if (widgetRef.current) observer.observe(widgetRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    onLoadComplete?.();
  };

  useEffect(() => {
    const el = viewerRef.current as unknown as HTMLElement | null;
    const onLoad = () => {
      setSplineLoaded(true);
      onLoadComplete?.();
    };
    if (el) el.addEventListener("load", onLoad as EventListener);
    const t = setTimeout(onLoad, 1500);
    return () => {
      if (el) el.removeEventListener("load", onLoad as EventListener);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="homepage" className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center">
       <Spline className="spline-scene" scene="/scene.splinecode" onLoad={handleSplineLoad} />
      </div>

      {/* Subtle mask to cover Spline watermark (bottom-right) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 z-0 h-20 w-32"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,11,14,0) 0%, rgba(11,11,14,0.6) 35%, rgba(11,11,14,0.9) 100%)",
        }}
      />

      {/* Ambient lighting */}
      <div className="hidden lg:block absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-[10%] h-64 w-64 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-[10%] h-72 w-72 bg-indigo-400/20 rounded-full blur-[140px]" />
        <div className="absolute top-0 left-1/2 h-40 w-40 bg-fuchsia-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {!splineLoaded && (
          <div className="absolute inset-0 bg-[#0b0b0e] flex flex-col items-center justify-center z-50">
            <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
              <div className="absolute inset-0 rounded-full border-t-4 border-blue-400 animate-spin-smooth" />
              <div className="absolute inset-[8px] rounded-full bg-blue-400/10 animate-pulse-soft" />
              <div className="relative z-10">
                <Image
                  src="/notitlefrwatermark.png"
                  alt="ForgeRealm Watermark"
                  width={72}
                  height={72}
                  className="opacity-90 animate-fade-glow"
                />
              </div>
            </div>
            <p className="mt-6 text-sm tracking-widest text-blue-300/80 font-medium animate-fade-glow">
              Loading ForgeRealm Experience...
            </p>
            <div className="mt-4 h-1.5 w-40 bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-500 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-white/50 animate-shimmer" />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Hero */}
      <div
        className={`relative grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 gap-16 lg:gap-20 transition-opacity duration-700 ${splineLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Left side */}
        <div>
          <div className="flex items-center gap-6 mb-2 justify-center mt-4 lg:justify-start">
            <Image
              src="/notitlefrwatermark.png"
              alt="ForgeRealm Logo"
              width={90}
              height={90}
              className="object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.55)] hidden sm:block"
              priority
            />
            <div className="relative inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl opacity-40 rounded-lg block" />
              <h1 className="relative font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
                Forge<span className="text-blue-400">Realm</span>
              </h1>
            </div>
          </div>

          <p className="mt-4 text-xl text-blue-200 text-center lg:text-left">
            A creative hub for sleek, sustainable 3D models.
          </p>

          <p className="mt-6 text-md sm:text-lg lg:text-xl text-gray-300 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
            Thoughtfully made pieces that bring your ideas into focus. Sleek collectibles, modern accessories, and bold designs for everyday life, crafted with planet‑friendly materials.
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="mt-10 flex flex-wrap justify-center text-center lg:justify-start gap-3"
          >
            <a
              href="#work"
              className="items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-base sm:text-lg uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_20px_rgba(96,165,250,0.7)] transition-all duration-200"
            >
              Explore Models
            </a>
          </div>

          {/* Tags */}
          <div className="hidden lg:flex gap-2 mt-10">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
              <TbLeaf className="text-green-400 text-xl" />
              <span className="text-sm text-gray-300">Eco-Friendly PLA</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
              <MdBrush className="text-pink-400 text-xl" />
              <span className="text-sm text-gray-300">Paint Ready</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md border border-white/10 hover:bg-white/10 transition-colors">
              <GiDragonHead className="text-indigo-400 text-xl" />
              <span className="text-sm text-gray-300">Fantasy Figurines</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          ref={widgetRef}
          className={`hidden lg:flex flex-col gap-12 transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
        >
          <div className="flex items-start gap-4">
            <BsRocketTakeoff className="text-blue-400 text-3xl shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                Designed for Creativity
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                A solid base for your ideas, built to be clean, minimal, and ready for customization.
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
                From bold figurines to fine details, every piece is designed to spark imagination.
              </p>
            </div>
          </div>

          {/* Floating Feature Cards */}
          <div className="hidden lg:grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center hover:border-blue-400 transition-all">
              <RiEarthLine className="text-2xl text-blue-300 mb-2" />
              <p className="text-white/80 text-sm font-medium">UK Based</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center hover:border-indigo-400 transition-all">
              <HiOutlineLightBulb className="text-2xl text-indigo-300 mb-2" />
              <p className="text-white/80 text-sm font-medium">3D Innovation</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center hover:border-green-400 transition-all">
              <FaRecycle className="text-2xl text-green-300 mb-2" />
              <p className="text-white/80 text-sm font-medium">Sustainable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase hidden sm:block">
        <a href="#services" className="flex items-center gap-2 hover:text-white transition-colors">
          <span>Scroll</span>
          <span className="inline-block animate-bounce">▾</span>
        </a>
      </div>
    </section>
  );
}
