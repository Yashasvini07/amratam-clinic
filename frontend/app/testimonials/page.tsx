import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/site";
import RatingSummary from "@/components/testimonials/RatingSummary";
import FeaturedStory from "@/components/testimonials/FeaturedStory";
import Section from "@/components/ui/Section";
import { testimonials } from "@/lib/testimonials";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function TestimonialsPage() {
  const featured = testimonials.find((t) => t.featured)!;

  return (
    <>
      <main>
        <PageHero {...pageMetadata.testimonials} />

        <Section background="light" className="pt-0">
            <RatingSummary />

            <FeaturedStory testimonial={featured} />

            <TestimonialsSection className="pt-0" />
        </Section>
      
      </main>
    </>
  );
}