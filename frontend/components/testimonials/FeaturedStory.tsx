import { Testimonial } from "@/lib/testimonials";

type Props = {
  testimonial: Testimonial;
};

export default function FeaturedStory({ testimonial }: Props) {
  return (
    <section className="bg-[#FDFBF8] py-24">
      <div className="mx-auto max-w-5xl rounded-xl border border-stone-200 bg-white p-12 shadow-sm">

        <p className="uppercase tracking-[0.3em] text-sm text-[#D08F59]">
          Featured Story
        </p>

        <blockquote className="mt-8 font-serif text-4xl leading-relaxed text-[#264B43]">
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