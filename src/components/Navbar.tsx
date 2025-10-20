"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiX, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const navLinks = [
    ["Services", "#services"],
    ["Materials", "#materials"],
    ["Work", "#work"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fr-theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = saved || (prefersDark ? "dark" : "light");
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("fr-theme", next);
    } catch {}
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <header className="fixed top-6 z-50 w-full flex justify-center">
      <div className="mx-auto max-w-7xl w-full px-4">
        <div className="flex border border-white/60 items-center justify-between px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg backdrop-blur-sm">
          {/* Logo */}
          <a href="#homepage" className="inline-flex items-center" aria-label="ForgeRealm home">
            <Image
              src="/frowl.png"
              alt="ForgeRealm Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full mr-3"
              priority
            />
            <span className="font-extrabold tracking-widest text-sm font-display text-white uppercase">
              Forge<span className="text-black">REALM</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12 text-xs font-semibold uppercase tracking-wide">
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

          {/* Right side: theme toggle + subscribe */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
              className="rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20 transition-colors"
            >
              {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
            </button>

            <Link
              href="/subscribe"
              className="rounded-full bg-white text-blue-600 font-semibold text-xs uppercase tracking-wide px-5 py-2 hover:bg-black hover:text-white transition-colors duration-200 shadow-sm"
            >
              Subscribe
            </Link>
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

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-indigo-700 shadow-lg p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
        aria-label="Mobile menu"
      >
        <button
          onClick={() => setOpen(false)}
          className="self-end text-white text-2xl mb-6"
          aria-label="Close menu"
        >
          <HiX />
        </button>

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

        <div className="my-6 border-t border-white/20" />

        <Link
          href="/subscribe"
          onClick={() => setOpen(false)}
          className="rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wide text-blue-600 hover:bg-black hover:text-white transition-colors duration-200 text-center"
        >
          Subscribe
        </Link>

        <button
          onClick={() => {
            toggleTheme();
            setOpen(false);
          }}
          className="mt-3 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wide text-blue-600 hover:bg-black hover:text-white transition-colors duration-200 text-center"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </aside>
    </header>
  );
}
