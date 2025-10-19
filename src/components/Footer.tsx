"use client";

import { useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaEtsy } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
  }

  return (
    <footer className="py-16 bg-gradient-to-br from-[#0b0b0e] via-[#101018] to-[#0d0f15] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 text-sm text-white/70">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center gap-3">
              <Image src="/frhead.png" alt="ForgeRealm Logo" width={32} height={32} className="rounded-full" />
              <span className="font-bold text-white text-lg tracking-wide">ForgeRealm</span>
            </div>
            <p className="mt-3 text-white/60 max-w-xs">UK-based creators of custom, sustainable 3D prints from concept to craft.</p>

            {/* Social icons */}
            <div className="flex gap-4 mt-5 text-lg text-white/60">
              <a href="#" aria-label="Instagram" className="hover:text-blue-400 transition">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Etsy" className="hover:text-blue-400 transition">
                <FaEtsy />
              </a>
            </div>
          </div>

          {/* Services links */}
          <div>
            <div className="font-semibold text-white">Services</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition">
                  Custom Prints
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Online Orders
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Leeds Booths
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-white transition">
                  Materials
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <div className="font-semibold text-white">Company</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#work" className="hover:text-white transition">
                  Recent Work
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <div className="font-semibold text-white">Stay Updated</div>
            <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
              <input
                required
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/40"
              />
              <button className="rounded-xl bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 font-semibold transition">Join</button>
            </form>
            {subscribed && <p className="mt-2 text-xs text-emerald-400">You're in! Check your inbox soon.</p>}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} ForgeRealm Ltd. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              SLA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

