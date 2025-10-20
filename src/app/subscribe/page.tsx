import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscribe | ForgeRealm Booth & Product Updates",
  description:
    "Subscribe to get notified about ForgeRealm booth locations, dates, new products and special offers.",
};

export default function SubscribePage() {
  return (
    <section className="flex min-h-screen flex-wrap bg-gradient-to-br from-[#0b0b0e] via-[#101018] to-[#0d0f15] text-white">
      {/* LEFT SIDE */}
      <div className="relative hidden w-full select-none flex-col justify-center text-center md:flex md:w-1/2 bg-gradient-to-b from-blue-900/40 via-indigo-900/30 to-transparent border-r border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.25),transparent_70%)] blur-3xl" />
        <div className="relative z-10 flex flex-col items-center px-8 py-20">
          <Image
            src="/notitlefrwatermark.png"
            alt="ForgeRealm Display"
            width={260}
            height={260}
            className="mx-auto rounded-2xl object-cover opacity-90 drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]"
          />
          <h2 className="mt-10 text-4xl font-bold leading-tight tracking-tight text-white">
            Stay ahead with {" "}
            <span className="border-b-8 border-blue-500 text-blue-400">ForgeRealm</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-md">
            Join our community to get early access to new services, exclusive offers, and updates on our next booth
            appearances and creative showcases.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full flex-col justify-center px-8 py-16 md:w-1/2 lg:px-16">
        <div className="max-w-md mx-auto w-full space-y-8">
          <h1 className="text-center md:text-left text-3xl font-extrabold tracking-tight">Get ForgeRealm Updates</h1>
          <p className="text-center md:text-left text-white/70 text-base">
            Be the first to know about upcoming booths, new products, and special offers.
          </p>

          {/* Mailchimp Form */}
          <form
            action="https://app.us12.list-manage.com/subscribe/post?u=ce1d7fb1b345f9a78d8548647&id=6be3589439&f_id=00c366e9f0"
            method="post"
            target="_blank"
            noValidate
            className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-xl"
          >
            <label className="block text-sm text-white/80 font-semibold" htmlFor="mce-FNAME">
              First Name
              <input
                required
                type="text"
                name="FNAME"
                id="mce-FNAME"
                placeholder="Enter your name"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/40"
              />
            </label>

            <label className="block text-sm text-white/80 font-semibold" htmlFor="mce-EMAIL">
              Email Address
              <input
                required
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/40"
              />
            </label>

            {/* Honeypot for spam protection */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
              <input type="text" name="b_ce1d7fb1b345f9a78d8548647_6be3589439" tabIndex={-1} defaultValue="" />
            </div>

            <div className="pt-2 text-xs text-white/50">
              By joining, you’ll receive updates about new products, services, offers, and booth events from ForgeRealm.
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-semibold uppercase tracking-wider text-white shadow-md transition hover:from-blue-400 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/60">
            <Link href="/" className="underline hover:text-blue-300">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

