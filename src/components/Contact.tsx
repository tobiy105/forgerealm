"use client";

import { useState } from "react";

export default function Contact() {
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Thanks! We’ll get back to you soon.");
    setTimeout(() => setMessage(""), 6000);
  }

  return (
    <section id="contact" className="py-24 border-t border-white/10 bg-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Contact
            </h2>
            <p className="mt-3 text-white/70">
              Have drawings, procurement docs, or a big idea? Let’s talk.
            </p>

            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div>📍 221B Layer Road, London, UK</div>
              <div>✉️ hello@novaprint.co</div>
              <div>☎️ +44 (0)20 1234 5678</div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
              <div className="font-semibold">Business hours</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-white/70">
                <div>Mon–Fri</div>
                <div>08:00–18:00</div>
                <div>Saturday</div>
                <div>10:00–16:00</div>
                <div>Sunday</div>
                <div>Closed</div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-white/80">Name</span>
                <input
                  required
                  type="text"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white/80">Email</span>
                <input
                  required
                  type="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm text-white/80">Message</span>
              <textarea
                required
                rows={5}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Tell us about your project…"
              ></textarea>
            </label>
            <button
              type="submit"
              className="rounded-xl bg-white text-black px-5 py-3 font-semibold hover:shadow-glow"
            >
              Send message
            </button>
            {message && (
              <p className="text-sm text-emerald-400">{message}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
