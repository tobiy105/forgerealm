"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  FaShoppingCart,
  FaCogs,
  FaStore,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

export default function Services() {
  const ref = useRef(null);

  return (
    <section
      id="services"
      className="py-24 bg-[linear-gradient(135deg,_#0b0b0e_0%,_#101018_60%,_#6366f1_60%,_#3b82f6_100%)] relative overflow-hidden"
    >
      {/* Subtle background accent lights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-[120px]" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header with GIF */}
        <div className="max-w-2xl flex items-center gap-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white flex items-center">
            Our Services
          </h2>
          <div>
            <Image
              src="/services.gif"
              alt="Services Animation"
              width={56}
              height={56}
              className="w-10 sm:w-14 h-auto opacity-90 drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]"
              priority
            />
          </div>
        </div>

        <p className="mt-3 text-white/70 max-w-2xl">
          ForgeRealm is a UK-based business offering unique, customisable
          3D-printed products. You can order online, contact us for bespoke
          prints, or visit us at our pop-up stalls and booths around Leeds.
        </p>

        {/* Service grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FaShoppingCart className="text-blue-400 text-xl" />,
              title: "Order Online",
              text: "Browse and buy our 3D-printed products directly from our website, or find us on Etsy, eBay, and Vinted.",
            },
            {
              icon: <FaCogs className="text-blue-400 text-xl" />,
              title: "Custom & Bespoke Prints",
              text: "Contact us to discuss your ideas or request a personalised print.",
            },
            {
              icon: <FaStore className="text-blue-400 text-xl" />,
              title: "Leeds Booths & Stalls",
              text: "Find us at local markets, fairs, and events across Leeds. Follow us on social media for updates on where we’ll be next.",
            },
          ].map((service, i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl hover:bg-white/10 hover:border-blue-400 transition flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2">
                {service.icon}
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              </div>
              <p className="mt-2 text-sm text-white/70">{service.text}</p>
            </article>
          ))}
        </div>

        {/* Follow us capsule */}
        <div className="max-w-2xl mt-16 rounded-lg border border-white/20 bg-white/10 backdrop-blur-xl p-6 hover:bg-white/10 hover:border-blue-400 transition">
          <p className="text-white/60 text-sm mb-4">
            Follow us on Instagram and other socials for the latest news, stall
            locations, and new product launches. More services, including
            workshops and collaborations, coming soon!
          </p>

          <div className="flex items-center gap-4 text-white/70 mt-2">
            <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition">
              <FaInstagram className="text-lg" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition">
              <FaFacebook className="text-lg" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition">
              <FaTwitter className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
