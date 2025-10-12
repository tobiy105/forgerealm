"use client";

import Image from "next/image";

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative py-24 overflow-hidden bg-gradient-to-bl from-[#0b0b0e] via-[#101018] to-yellow-900"
    >
      {/* Ambient yellow glow lights */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-[120px] -z-10" />
      <div className="absolute right-1/3 bottom-0 h-72 w-72 rounded-full bg-amber-400/20 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header with floating GIF */}
        <div className="flex items-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            FAQs
          </h2>
          <div className="relative animate-float flex-shrink-0">
            <Image
              src="/faq.gif"
              alt="FAQ Animation"
              width={56}
              height={56}
              className="w-10 sm:w-14 h-auto opacity-90 drop-shadow-[0_0_14px_rgba(250,204,21,0.6)]"
              priority
            />
          </div>
        </div>

        {/* FAQ items */}
        <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          {/* Item 1 - Where do you sell and ship? */}
          <details className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between text-white/80">
              <span>Where do you sell and ship?</span>
              <span className="transition-transform duration-300 group-open:rotate-180">
                ⌄
              </span>
            </summary>
            <div className="mt-3 text-sm text-white/70">
              We’re based in Leeds and you’ll often find us at local stalls.
              We ship 3D prints anywhere in the UK — order online or visit us
              in person for friendly, expert advice.
            </div>
          </details>

          {/* Item 2 - Are your materials eco-friendly? */}
          <details className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between text-white/80">
              <span>Are your materials eco-friendly?</span>
              <span className="transition-transform duration-300 group-open:rotate-180">
                ⌄
              </span>
            </summary>
            <div className="mt-3 text-sm text-white/70">
              We care about the impact of every part we sell. Our PLA is
              biodegradable, and we offer PETG for recycling. We’re always
              working to make 3D printing more sustainable.
            </div>
          </details>

          {/* Item 3 - Can I order custom prints? */}
          <details className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between text-white/80">
              <span>Can I order custom prints?</span>
              <span className="transition-transform duration-300 group-open:rotate-180">
                ⌄
              </span>
            </summary>
            <div className="mt-3 text-sm text-white/70">
              Absolutely! Contact us with your ideas or designs — we’re happy
              to help and love bringing your projects to life. Trust us to
              deliver quality prints and friendly service every time.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
