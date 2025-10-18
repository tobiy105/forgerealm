"use client";

import Image from "next/image";
import { FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa"; // Add the phone icon import

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0b0b0e] via-[#101018] to-[#0d0f15]"
    >
      {/* Ambient lights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[140px]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div>
            {/* Header with floating GIF */}
            <div className="flex items-center">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                Contact
              </h2>
              <div className="relative animate-float flex-shrink-0 mt-1 sm:mt-1">
                <Image
                  src="/contact.gif"
                  alt="Contact Animation"
                  width={56}
                  height={56}
                  className="w-10 sm:w-14 h-auto opacity-90 drop-shadow-[0_0_14px_rgba(99,102,241,0.6)]"
                  priority
                />
              </div>
            </div>

            <p className="mt-3 text-white/70">
              Have a design, concept, or a project idea? Let’s talk.
            </p>

            <div className="mt-8 space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Leeds, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <span>forgerealmltd@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-400" /> {/* Phone icon */}
                <span>+44 (0) 7344 237800</span> {/* International format */}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 hover:border-blue-400 transition">
              <div className="flex items-center gap-2 text-white font-semibold">
                <FaClock className="text-blue-400" />
                <span>Business hours</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-white/70">
                <div>Mon–Fri</div>
                <div>08:00–18:00</div>
                <div>Saturday</div>
                <div>10:00–16:00</div>
                <div>Sunday</div>
                <div>Closed</div>
              </div>
            </div>
          </div>

          {/* Fancy Email CTA */}
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white max-w-[28rem]">
              <span className="text-blue-400">Get in touch</span> with ForgeRealm
            </h1>
            <p className="text-white/70 mt-5 mb-8 max-w-md">
              Reach out directly for collaborations, custom prints, or wholesale orders.
            </p>

            <a href="mailto:forgerealmltd@gmail.com">
              <button className="relative inline-flex h-12 w-60 overflow-hidden rounded-lg p-[1px] focus:outline-none group">
                {/* Animated glowing ring */}
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#3b82f6_50%,#ffffff_100%)]" />
                {/* Inner button */}
                <span className="inline-flex h-full w-full items-center justify-center rounded-lg bg-[#0b0b0e] px-7 text-sm font-semibold text-white backdrop-blur-3xl transition group-hover:bg-[#101018] gap-2 border border-white/40">
                  Send an Email
                  <FaEnvelope className="text-blue-400" />
                </span>
              </button>
            </a>

            <p className="mt-6 text-xs text-white/60">
              We usually respond within 24 hours on working days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
