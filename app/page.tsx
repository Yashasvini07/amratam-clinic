import Navbar from "@/components/layout/Navbar";
import AboutDoctor from "@/components/sections/AboutDoctor";
import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Trustbar from "@/components/sections/Trustbar";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
      <main>
        <Navbar/>
        <Hero/>
        <Trustbar/>
        <AboutDoctor/>
        <Services/>
        <Testimonials/>
        <CTA/>
        <Footer/>
      </main>
  );
}
