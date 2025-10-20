"use client";

import Image from "next/image";
import Script from "next/script";
import { HiChevronDown } from "react-icons/hi";

export default function Faq() {
  const faqs = [
    {
      q: "Where do you sell and ship?",
      a:
        "We're based in Leeds and you'll often find us at local stalls. We ship 3D prints anywhere in the UK. Order online or visit us in person for friendly, expert advice.",
    },
    {
      q: "Are your materials eco-friendly?",
      a:
        "We care about the impact of every part we sell. Our PLA is biodegradable, and we offer PETG with recyclable properties. We're always working to make 3D printing more sustainable.",
    },
    {
      q: "Can I order custom prints?",
      a:
        "Absolutely! Contact us with your ideas or designs. We're happy to help and love bringing your projects to life. Expect quality prints and friendly service.",
    },
  ];

  return (
    <section
      id="faq"
      className="theme-surface relative py-24 overflow-hidden bg-gradient-to-bl from-[#0b0b0e] via-[#101018] to-yellow-900"
    >
      {/* Ambient yellow glow lights */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-[120px] -z-10" />
      <div className="absolute right-1/3 bottom-0 h-72 w-72 rounded-full bg-amber-400/20 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header with floating GIF */}
        <div className="flex items-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[color:var(--fg)]">FAQs</h2>
          <div className="relative animate-float flex-shrink-0">
            <Image
              src="/faq.gif"
              alt="FAQ Animation"
              width={56}
              height={56}
              className="w-10 sm:w-14 h-auto opacity-90 drop-shadow-[0_0_14px_rgba(250,204,21,0.6)]"
            />
          </div>
        </div>

        {/* FAQ items */}
        <div className="mt-8 divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur-md">
          {faqs.map((item) => (
            <details key={item.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[color:var(--fg)]/80 font-semibold">
                <span>{item.q}</span>
                <span aria-hidden className="transition-transform duration-300 group-open:rotate-180">
                  <HiChevronDown />
                </span>
              </summary>
              <div className="mt-3 text-sm text-[color:var(--fg)]/70">{item.a}</div>
            </details>
          ))}
        </div>

        {/* FAQPage JSON-LD */}
        <Script id="ld-faq" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}
        </Script>
      </div>
    </section>
  );
}
