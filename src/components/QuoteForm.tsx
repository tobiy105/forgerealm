"use client";

import { useState } from "react";

export default function QuoteForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Thanks! We’ll email you a quote shortly.");
    setTimeout(() => setMessage(""), 5000);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles(Array.from(e.target.files).slice(0, 5));
    }
  }

  return (
    <section id="quote" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
          {/* Section header */}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Instant quote
          </h2>
          <p className="mt-2 text-white/70">
            Upload up to 5 files to receive pricing. We’ll email a quote within minutes.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6" aria-label="Instant quote form">
            {/* Name + Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-white/80">Name</span>
                <input
                  required
                  type="text"
                  name="name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="Ada Lovelace"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white/80">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="you@company.com"
                />
              </label>
            </div>

            {/* Process / Material / Finish */}
            <div className="grid sm:grid-cols-3 gap-4">
              <label className="block">
                <span className="text-sm text-white/80">Process</span>
                <select className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500">
                  <option>FDM</option>
                  <option>SLA / DLP</option>
                  <option>SLS / MJF</option>
                  <option>Metal (DMLS)</option>
                  <option>Unsure — advise me</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-white/80">Material</span>
                <select className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500">
                  <option>PLA</option>
                  <option>ABS</option>
                  <option>PA12 Nylon</option>
                  <option>Resin (Tough)</option>
                  <option>AlSi10Mg</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-white/80">Finish</span>
                <select className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500">
                  <option>Standard</option>
                  <option>Painted</option>
                  <option>Dyed</option>
                  <option>Vapor-smoothed</option>
                  <option>Polished</option>
                </select>
              </label>
            </div>

            {/* File upload */}
            <div className="rounded-2xl border-2 border-dashed border-white/15 bg-black/30 p-6 text-center hover:border-brand-500/50">
              <input
                id="file"
                type="file"
                multiple
                accept=".stl,.step,.stp,.obj"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file" className="cursor-pointer">
                <div className="text-sm text-white/70">
                  Drag &amp; drop files here, or <span className="text-white">browse</span>
                </div>
                <div className="text-[11px] text-white/50">
                  STL, STEP, OBJ — up to 100&nbsp;MB each
                </div>
              </label>
              {files.length > 0 && (
                <ul className="mt-4 space-y-2 text-left text-sm">
                  {files.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-2"
                    >
                      <span className="text-white/80 truncate">{f.name}</span>
                      <span className="text-xs text-white/50 ml-3">
                        {Math.round(f.size / 1024)} KB
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                className="rounded-xl bg-white text-black px-5 py-3 font-semibold hover:shadow-glow"
              >
                Request quote
              </button>
              {message && <p className="text-sm text-emerald-400">{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
