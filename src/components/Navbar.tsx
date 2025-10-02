export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/10 border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <a href="#" className="group inline-flex items-center gap-3">
                        {/* SVG Logo */}
                        <span className="font-extrabold tracking-tight text-white text-lg font-display">
                            FORGEREALM
                        </span>
                    </a>
                    <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
                        <a href="#services" className="hover:text-white">Services</a>
                        <a href="#materials" className="hover:text-white">Materials</a>
                        <a href="#work" className="hover:text-white">Work</a>
                        <a href="#pricing" className="hover:text-white">Pricing</a>
                        <a href="#faq" className="hover:text-white">FAQ</a>
                        <a href="#contact" className="hover:text-white">Contact</a>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button
                            id="themeToggle"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
                        >
                            Toggle theme
                        </button>
                        <a
                            href="#quote"
                            className="rounded-xl bg-gradient-to-tr from-brand-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-glow hover:shadow-glow focus:outline-none"
                        >
                            Instant Quote
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
