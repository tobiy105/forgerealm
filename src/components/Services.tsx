import { FaShoppingCart, FaCogs, FaStore, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Services() {
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Our Services
          </h2>
          <p className="mt-3 text-white/70">
            ForgeRealm is a UK-based business offering unique, customisable 3D-printed products. You can order online, contact us for bespoke prints, or visit us at our pop-up stalls and booths around Leeds.
          </p>
        </div>

        {/* Service grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Online Orders */}
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 hover:border-blue-400 transition flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <FaShoppingCart className="text-blue-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">Order Online</h3>
            </div>
            <p className="mt-2 text-sm text-white/70">
              Browse and buy our 3D-printed products directly from our website, or find us on Etsy, eBay, and Vinted.
            </p>
          </article>

          {/* Custom Prints */}
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 hover:border-blue-400 transition flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <FaCogs className="text-blue-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">Custom & Bespoke Prints</h3>
            </div>
            <p className="mt-2 text-sm text-white/70">
              Contact us to discuss your ideas or request a personalised print.
            </p>
          </article>

          {/* Leeds Stalls */}
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/10 hover:border-blue-400 transition flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <FaStore className="text-blue-400 text-xl" />
              <h3 className="text-lg font-semibold text-white">Leeds Booths & Stalls</h3>
            </div>
            <p className="mt-2 text-sm text-white/70">
              Find us at local markets, fairs, and events across Leeds. Follow us on social media for updates on where we&apos;ll be next.
            </p>
          </article>
        </div>

        {/* Follow us capsule */}
        <div className="max-w-2xl mt-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 hover:border-blue-400 transition">
          <p className="text-white/60 text-sm mb-4">
            Follow us on Instagram and other socials for the latest news, stall locations, and new product launches. More services, including workshops and collaborations, coming soon!
          </p>

          {/* Social icons */}
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
