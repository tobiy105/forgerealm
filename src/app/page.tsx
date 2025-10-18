"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import Materials from "@/components/Materials";
import Work from "@/components/Work";
// import Process from "@/components/Process";
// import Pricing from "@/components/Pricing";
// import Testimonials from "@/components/Testimonials";
// import QuoteForm from "@/components/QuoteForm";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  // Track when the Hero’s Spline scene has finished loading
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <>
      {/* Navbar appears immediately (static header) */}
      <Navbar />

      {/* Hero now receives an onLoadComplete callback */}
      <Hero onLoadComplete={() => setHeroLoaded(true)} />

      {/* AnimatePresence allows smooth fade-in when Hero completes loading */}
      <AnimatePresence>
        {heroLoaded && (
          <div>
            {/* The rest of the site only appears once Hero’s preloader finishes */}
            <Partners />
            <Services />
            <Materials />
            <Work />
            {/* <Process />
            <Pricing /> */}
            {/* <Testimonials /> */}
            {/* <QuoteForm /> */}
            <Faq />
            <Contact />
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
