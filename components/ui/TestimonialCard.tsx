import { Star } from "lucide-react";
import { Testimonial } from "@/lib/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6 flex">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            size={18}
            fill="#D08F59"
            color="#D08F59"
          />
        ))}
      </div>

      <p className="leading-8 text-gray-600 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-8 border-t border-stone-200 pt-6">
        <h3 className="font-semibold text-[#264B43]">
          {testimonial.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {testimonial.condition}
        </p>

        <p className="text-sm text-[#D08F59]">
          {testimonial.treatment}
        </p>
      </div>
    </div>
  );
}