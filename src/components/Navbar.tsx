"use client";

import { useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    ["Services", "#services"],
    ["Materials", "#materials"],
    ["Work", "#work"],
    ["Pricing", "#pricing"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="fixed top-6 z-50 w-full flex justify-center">
      <div className="mx-auto max-w-7xl w-full px-4">
        <div className="flex items-center justify-between px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
          {/* Logo */}
          <a href="#" className="inline-flex items-center">
            <span className="font-extrabold tracking-widest text-sm font-display text-white uppercase">
              Forge<span className="text-black">REALM</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-16 text-xs font-semibold uppercase tracking-wide">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="relative text-white/80 hover:text-white transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-[1.5px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center">
            <a
              href="#quote"
              className="rounded-full bg-white px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-600 hover:bg-black hover:text-white transition-colors duration-200"
            >
              Instant Quote
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white text-2xl"
            aria-label="Open menu"
          >
            <HiOutlineMenu />
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Animation */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-indigo-700 shadow-lg p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setOpen(false)}
                className="self-end text-white text-2xl mb-6"
                aria-label="Close menu"
              >
                <HiX />
              </button>

              {/* Links */}
              <nav className="flex flex-col gap-6 text-sm font-semibold uppercase tracking-wide text-white">
                {navLinks.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="hover:text-blue-200 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              {/* Divider */}
              <div className="my-6 border-t border-white/20" />

              {/* CTA in Drawer */}
              <a
                href="#quote"
                className="rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wide text-blue-600 hover:bg-black hover:text-white transition-colors duration-200 text-center"
                onClick={() => setOpen(false)}
              >
                Instant Quote
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
