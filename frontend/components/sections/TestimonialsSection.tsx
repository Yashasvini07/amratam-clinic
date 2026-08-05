import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/components/ui/TestimonialCard";

import { testimonials } from "@/lib/testimonials";

type Props = {
  limit?: number;
};

export default function TestimonialsSection({ limit }: Props) {
  const displayedTestimonials = limit
    ? testimonials.slice(0, limit)
    : testimonials;

  return (
    <Section background="light">
      <SectionHeader
        eyebrow="PATIENT STORIES"
        title="What our patients say"
        description="Real experiences from people who have trusted us with their health."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
          />
        ))}
      </div>
    </Section>
  );
}