'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

const ITEMS = [
  "Fidget Toys",
  "White Vases",
  "Halloween Trinkets",
  "D&D Dice Holders",
  "Phone Stands",
  "Keychains",
  "Book Stands",
  "Figurines (Dragons, Cats)",
  "Cosplay Props",
  "...and more",
];

export default function ProductsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Content is rendered twice so the loop is seamless — animate the track
    // one full copy to the left, then anime.js snaps back for the next iteration.
    const anim = animate(track, {
      translateX: ['0%', '-50%'],
      duration: 28000,
      loop: true,
      ease: 'linear',
    });

    const pause = () => anim.pause();
    const play = () => anim.play();
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', play);
    container.addEventListener('focusin', pause);
    container.addEventListener('focusout', play);
    return () => {
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', play);
      container.removeEventListener('focusin', pause);
      container.removeEventListener('focusout', play);
      anim.pause();
    };
  }, []);

  return (
    <div
      aria-label="What we make"
      className="relative py-6 border-y border-white/10 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div ref={containerRef} className="flex items-center gap-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div ref={trackRef} className="flex gap-10 whitespace-nowrap text-xs sm:text-sm uppercase tracking-[0.25em]" style={{ color: '#FADE6A', willChange: 'transform' }}>
            {[...ITEMS, ...ITEMS].map((item, i) => (
              <span key={i} style={{ fontFamily: "'Cinzel', serif" }}>
                {item}
                <span className="ml-10 text-yellow-300/50" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
