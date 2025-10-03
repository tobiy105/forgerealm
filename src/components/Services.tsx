export default function Services() {
    return (
      <section
        id="services"
        className="py-24 bg-[linear-gradient(135deg,_#000_0%,_#000_60%,_#6366f1_60%,_#3b82f6_100%)]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Our Services
            </h2>
            <p className="mt-3 text-white/70">
              FlashRealm is a UK-based business offering unique, customisable 3D-printed products. You can order online, contact us for bespoke prints, or visit us at our pop-up stalls and booths around Leeds.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Online Orders */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl hover:bg-black/60 hover:border-blue-400 transition">
              <h3 className="text-lg font-semibold text-white">Order Online</h3>
              <p className="mt-2 text-sm text-white/70">Browse and buy our 3D-printed products directly from our website, or find us on Etsy, eBay, and Vinted.</p>
            </article>
            {/* Custom Prints */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl hover:bg-black/60 hover:border-blue-400 transition">
              <h3 className="text-lg font-semibold text-white">Custom & Bespoke Prints</h3>
              <p className="mt-2 text-sm text-white/70">Contact us to discuss your ideas or request a personalised print.</p>
            </article>
            {/* Leeds Stalls */}
            <article className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl hover:bg-black/60 hover:border-blue-400 transition">
              <h3 className="text-lg font-semibold text-white">Leeds Booths & Stalls</h3>
              <p className="mt-2 text-sm text-white/70">Find us at local markets, fairs, and events across Leeds. Follow us on social media for updates on where we&apos;ll be next.</p>
            </article>
          </div>
          <div className="max-w-2xl mt-12">
            <p className="text-white/60 text-sm">
              Follow us on Instagram and other socials for the latest news, stall locations, and new product launches. More services, including workshops and collaborations, coming soon!
            </p>
          </div>
        </div>
      </section>
    );
  }
  