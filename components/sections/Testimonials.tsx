import {testimonials} from "@/lib/testimonials";
import TestomonialCard from "../ui/TestimonialCard";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function Testimonials() {
  return (
    <section className="bg-[#FDFBF8] py-24">
      <Container className="flex flex-col gap-8 items-center">

        <p className="text-[#D8A06B] uppercase tracking-[0.3em] text-sm mb-2"> PATIENT STORIES </p>
        <h2 className="text-5xl text-gray-700 font-serif leading-tight">Words that matter</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
            {testimonials.map((testimonial, index) => (
                <TestomonialCard
                    key={index}
                    name={testimonial.name}
                    condition={testimonial.condition}
                    quote={testimonial.quote}
                    rating={testimonial.rating}
                />
            ))}
        </div>
        <div className="flex justify-center mt-8">
            <Button text="Read all testimonials" variant="secondary" showArrow={true} />
        </div>
      </Container>
    </section>
  );
}