import AboutDoctor from "@/components/sections/AboutDoctor";
import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Trustbar from "@/components/sections/Trustbar";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
      <main>
        <Hero/>
        <Trustbar/>
        <AboutDoctor/>
        <Services/>
        <TestimonialsSection limit={3} />
        <CTA/>
      </main>
  );
}
