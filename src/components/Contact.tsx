"use client";

import { useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelopeOpenText,
  FaPhoneAlt,
} from "react-icons/fa";
import { animate, stagger } from "animejs";
import type { JSAnimation } from "animejs";
import { useAnimeReveal } from "../hooks/useAnimeReveal";
import {
  DUR,
  STEP,
  interactiveSpring,
  prefersReducedMotion,
  setWillChange,
  clearWillChange,
} from "../hooks/motion";
import AnimatedHeading from "./anime/AnimatedHeading";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const infoListRef = useAnimeReveal<HTMLDivElement>({
    selector: ".contact-info-card",
    step: STEP.loose,
    y: 20,
  });
  const ctaRef = useAnimeReveal<HTMLDivElement>({
    selector: ".contact-cta-block",
    step: 0,
    duration: DUR.lg,
    y: 20,
  });

  // One-shot spring settle on the icon tiles as the section scrolls into view —
  // replaces the old infinite pulse so nothing keeps animating after entry.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || typeof window === "undefined") return;
    if (prefersReducedMotion()) return;
    const tiles = Array.from(
      root.querySelectorAll<HTMLElement>(".contact-icon-tile"),
    );
    if (!tiles.length) return;

    let anim: JSAnimation | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setWillChange(tiles, "transform");
        anim = animate(tiles, {
          scale: [0.5, 1],
          delay: stagger(STEP.base),
          ease: interactiveSpring(),
          onComplete: () => clearWillChange(tiles),
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      anim?.cancel();
      clearWillChange(tiles);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 sm:py-24 overflow-hidden bg-transparent"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/4 top-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.04] blur-[200px]" />
      </div>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-center">
          {/* Contact Info */}
          <div ref={infoListRef} className="space-y-10 flex-1 max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-4">
              <AnimatedHeading
                as="h2"
                className="text-4xl sm:text-5xl font-bold text-white"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Contact
              </AnimatedHeading>
              <FaEnvelopeOpenText
                className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400"
                aria-hidden
              />
            </div>

            <p
              className="text-lg text-stone-400 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Have a design, concept, or a project idea? Let's create something
              extraordinary together.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              {[
                {
                  title: "Location",
                  detail: "Leeds, United Kingdom",
                  icon: <FaMapMarkerAlt className="text-blue-400" />,
                },
                {
                  title: "Email",
                  detail: "info@forgerealm.co.uk",
                  icon: <FaEnvelope className="text-blue-400" />,
                },
                {
                  title: "Phone",
                  detail: "+44 (0) 7344 237800",
                  icon: <FaPhoneAlt className="text-blue-400" />,
                },
                {
                  title: "Hours",
                  detail: "Mon-Fri 08:00-18:00",
                  icon: <FaClock className="text-blue-400" />,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  data-ar
                  className="contact-info-card group flex items-center gap-6 p-5 rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-blue-400/40 hover:-translate-y-0.5"
                >
                  <div className="contact-icon-tile flex-shrink-0 p-3 rounded-xl bg-blue-400/10 group-hover:bg-blue-400/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className="font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 text-lg"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-sm text-stone-400"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business hours */}
            <div
              data-ar
              className="contact-info-card rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-blue-400/30 group"
            >
              <div className="flex items-center gap-4 text-white font-semibold mb-6">
                <div className="contact-icon-tile p-3 rounded-xl bg-blue-400/10 group-hover:bg-blue-400/20 transition-colors duration-300">
                  <FaClock className="text-blue-400" />
                </div>
                <span
                  className="group-hover:text-blue-300 transition-colors duration-300 text-xl"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Business Hours
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { day: "Mon\u2013Fri", hours: "08:00\u201318:00" },
                  { day: "Saturday", hours: "10:00\u201316:00" },
                  { day: "Sunday", hours: "Closed" },
                ].map(({ day, hours }) => (
                  <div
                    key={day}
                    className="flex justify-between items-center p-3 rounded-xl bg-white/[0.03] transition-colors duration-300"
                  >
                    <span
                      className="text-stone-500"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {day}
                    </span>
                    <span
                      className="font-medium text-white"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div
            ref={ctaRef}
            className="flex flex-col items-center justify-center text-center space-y-10 flex-1 max-w-lg"
          >
            <div data-ar className="contact-cta-block space-y-8">
              <AnimatedHeading
                as="h2"
                className="text-4xl sm:text-5xl font-bold max-w-[32rem] leading-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
                mode="chars"
                step={STEP.chars}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Get in touch
                </span>
                <br />
                <span className="text-white">with ForgeRealm</span>
              </AnimatedHeading>
              <p
                className="text-lg max-w-lg leading-relaxed text-stone-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Reach out directly for collaborations, custom prints, or
                wholesale orders. We're here to bring your vision to life.
              </p>
            </div>

            {/* Simple gradient CTA button */}
            <a
              href="mailto:forgerealmltd@gmail.com,info@forgerealm.co.uk"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold transition-opacity duration-300 hover:opacity-90"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <span>Send an Email</span>
              <FaEnvelope className="text-white/80 group-hover:text-white transition-colors duration-300" />
            </a>

            <p
              className="text-sm max-w-sm text-stone-500"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We usually respond within 24 hours on working days. Let's create
              something amazing together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
