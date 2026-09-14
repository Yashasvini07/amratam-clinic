import { Testimonial } from "@/lib/testimonials";

type Props = {
  testimonial: Testimonial;
};

export default function FeaturedStory({ testimonial }: Props) {
  return (
    <section className="bg-[#FDFBF8] pt-0 pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-5xl rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-12">

        <p className="uppercase tracking-[0.25em] text-xs text-[#D08F59] sm:tracking-[0.3em] sm:text-sm">
          Featured Story
        </p>

        <blockquote className="mt-6 font-serif text-2xl leading-snug text-[#264B43] sm:mt-8 sm:text-4xl sm:leading-relaxed">
          “{testimonial.quote}”
        </blockquote>

        <div className="mt-10 border-t border-stone-200 pt-8">

          <p className="font-semibold text-[#264B43]">
            {testimonial.name}
          </p>

          <p className="mt-2 text-gray-600">
            {testimonial.condition} • {testimonial.treatment}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Treatment Duration: {testimonial.duration}
          </p>

        </div>
      </div>
    </section>
  );
}