import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import Materials from "@/components/Materials";
import Work from "@/components/Work";
// import Process from "@/components/Process";
// import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
// import QuoteForm from "@/components/QuoteForm";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Partners />
      <Services />
      <Materials />
      <Work />
      {/* <Process />
      <Pricing /> */}
      <Testimonials />
      {/* <QuoteForm /> */}
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
