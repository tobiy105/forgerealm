"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function ShopGateHero() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/shop.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (mounted && data) setAnimationData(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  if (!animationData) {
    return (
      <div className="flex h-full min-h-[18rem] w-full items-center justify-center rounded-3xl border border-white/10 bg-white/5">
        <div className="h-32 w-32 animate-pulse rounded-full bg-white/10" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-7 shadow-2xl shadow-blue-500/25">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-blue-500/12 to-emerald-400/10" />
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-12 right-8 h-44 w-44 rounded-full bg-emerald-400/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-10 top-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-blue-100/80">
        <span className="h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
        Preview
      </div>
      <div className="pointer-events-none absolute left-8 top-8 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-100/80">
        ForgeRealm Shop
      </div>
      <div className="relative flex items-center justify-center">
        <Lottie
          animationData={animationData}
          loop
          className="h-[16rem] w-[16rem] sm:h-[24rem] sm:w-[24rem] lg:h-[30rem] lg:w-[30rem]"
        />
      </div>
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs uppercase tracking-[0.3em] text-blue-200 backdrop-blur">
        Shop preview loading
      </div>
    </div>
  );
}
