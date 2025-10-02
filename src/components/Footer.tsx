"use client";

import { useState } from "react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.currentTarget.reset();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
  }

  return (
    <footer className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-sm text-white/70">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 64 64" aria-hidden="true">
                <defs>
                  <linearGradient id="footer-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#42B6FF" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#footer-g)"
                  d="M32 6c3 0 5 2 7 6l15 28c2 5-1 10-6 10H16c-5 0-8-5-6-10l15-28c2-4 4-6 7-6z"
                />
              </svg>
              <span className="font-bold text-white">NovaPrint</span>
            </div>
            <p className="mt-3 text-white/60">
              Precision 3D printing at production scale.
            </p>
          </div>

          {/* Services links */}
          <div>
            <div className="font-semibold text-white">Services</div>
            <ul className="mt-3 space-y-2">
              <li><a href="#services" className="hover:text-white">FDM</a></li>
              <li><a href="#services" className="hover:text-white">SLA / DLP</a></li>
              <li><a href="#services" className="hover:text-white">SLS / MJF</a></li>
              <li><a href="#services" className="hover:text-white">Metal</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <div className="font-semibold text-white">Company</div>
            <ul className="mt-3 space-y-2">
              <li><a href="#work" className="hover:text-white">Portfolio</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <div className="font-semibold text-white">Subscribe</div>
            <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
              <input
                required
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button className="rounded-xl bg-white text-black px-4 py-2 font-semibold">
                Join
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-emerald-400">
                You’re in! Check your inbox.
              </p>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} NovaPrint Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">SLA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
