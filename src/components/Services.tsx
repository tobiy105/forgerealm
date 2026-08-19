"use client";

import {
  FaShoppingCart,
  FaStore,
  FaInstagram,
  FaLinkedin,
  FaLeaf,
} from "react-icons/fa";
import { MdBrush } from "react-icons/md";
import {
  FiBox,
  FiHeadphones,
  FiMapPin,
  FiShare2,
  FiUsers,
} from "react-icons/fi";
import { useReveal } from "../hooks/useReveal";
import MaterialsBook from "./MaterialsBook";

export default function Services() {
  const services = useReveal<HTMLElement>();
  const materials = useReveal<HTMLElement>();

  return (
    <div className="relative overflow-hidden bg-[#0a0e18]">
      <section
        id="services"
        ref={services.ref}
        data-observe
        suppressHydrationWarning
        className={`reveal landing-ambience relative py-16 sm:py-24 ${services.isVisible ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          {/* Header */}
          <div className="mb-2">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-blue-400 to-cyan-400" />
              <span
                className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-blue-300/60"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                What we offer
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Our{" "}
              <em
                className="text-cyan-300"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                Services
              </em>
            </h2>
          </div>

          <p
            className="mt-3 max-w-2xl text-stone-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ForgeRealm is a UK-based business offering unique, customisable
            3D-printed products. You can order online, contact us for bespoke
            prints, or visit us at our pop-up stalls and booths around Leeds.
          </p>

          {/* Feature grid */}
          <div className="mt-8 grid gap-4 lg:grid-cols-6 auto-rows-fr">
            {[
              {
                title: "Eco Friendly",
                detail: "Biodegradable and low-impact materials.",
                icon: <FaLeaf className="text-emerald-400 text-xl" />,
              },
              {
                title: "Material Options",
                detail: "PLA and PETG choices for each build.",
                icon: <FiBox className="text-blue-400 text-xl" />,
              },
              {
                title: "Local Collection",
                detail: "Leeds pickup options when available.",
                icon: <FiMapPin className="text-blue-400 text-xl" />,
              },
              {
                title: "Social Drops",
                detail: "New releases and stall dates posted weekly.",
                icon: <FiShare2 className="text-cyan-300 text-xl" />,
              },
              {
                title: "Support First",
                detail: "Real replies from the makers.",
                icon: <FiHeadphones className="text-blue-400 text-xl" />,
              },
              {
                title: "Workshops Soon",
                detail: "Collaborations and events in the pipeline.",
                icon: <FiUsers className="text-cyan-300 text-xl" />,
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className={`rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm hover:border-blue-400/30 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-blue-500/[0.12] transition-all duration-500 hover:-translate-y-0.5 ${
                  idx === 0
                    ? "lg:col-span-4"
                    : idx === 1
                      ? "lg:col-span-2"
                      : "lg:col-span-3"
                }`}
              >
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  {item.icon}
                  <span style={{ fontFamily: "'Cinzel', serif" }}>
                    {item.title}
                  </span>
                </div>
                <p
                  className="mt-2 text-xs text-stone-400"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Service grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <FaShoppingCart className="text-blue-400 text-xl" />,
                title: "Order Online",
                text: "Browse and buy our 3D-printed products directly from our website, or find us on Etsy, eBay, and Vinted.",
              },
              {
                icon: <MdBrush className="text-blue-400 text-xl" />,
                title: "Custom & Bespoke Prints",
                text: "Contact us to discuss your ideas or request a personalised print.",
              },
              {
                icon: <FaStore className="text-blue-400 text-xl" />,
                title: "Leeds Booths & Stalls",
                text: "Find us at local markets, fairs, and events across Leeds. Follow us on social media for updates on where we will be next.",
              },
            ].map((service, i) => (
              <article
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm hover:border-blue-400/30 hover:bg-white/[0.04] hover:shadow-xl hover:shadow-blue-500/[0.12] transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-2">
                  {service.icon}
                  <h3
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {service.title}
                  </h3>
                </div>
                <p
                  className="mt-2 text-sm text-stone-400"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {service.text}
                </p>
              </article>
            ))}
          </div>

          {/* Follow us capsule */}
          <div className="max-w-2xl mt-16 rounded-lg border border-white/10 bg-white/[0.03] p-6 hover:border-blue-400/40 transition-colors duration-300">
            <p
              className="text-stone-400 text-sm mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Follow us on Instagram and other socials for the latest news,
              stall locations, and new product launches. More services,
              including workshops and collaborations, coming soon!
            </p>

            <div className="flex items-center gap-4 text-stone-400 mt-2">
              <a
                href="https://www.instagram.com/forgerealmltd/"
                aria-label="Instagram"
                className="hover:text-pink-400 transition-colors duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="https://www.linkedin.com/company/forgerealm"
                aria-label="LinkedIn"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Materials section — no divider; grid + shared accent unify it with Services. */}
      <section
        id="materials"
        ref={materials.ref}
        data-observe
        suppressHydrationWarning
        className={`reveal landing-ambience relative py-16 sm:py-24 ${materials.isVisible ? "is-visible" : ""}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-2">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-blue-400 to-cyan-400" />
              <span
                className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-blue-300/60"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                Eco printing
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Our{" "}
              <em
                className="text-cyan-300"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                Materials
              </em>
            </h2>
          </div>

          <p
            className="mt-3 text-stone-400 max-w-xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            We offer the following filaments for 3D printing. Flip through to
            see what each one is, where we use it, and the science behind the
            claims.
          </p>

          <div className="mt-12 flex justify-center">
            <MaterialsBook />
          </div>
        </div>
      </section>
    </div>
  );
}
