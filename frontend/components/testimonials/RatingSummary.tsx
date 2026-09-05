import { Star } from "lucide-react";

export default function RatingSummary() {
  return (
    <section className="pt-0 pb-12 sm:pb-20">
      <div className="mx-auto max-w-3xl text-center">

        <div className="flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={26}
              fill="#D08F59"
              color="#D08F59"
            />
          ))}
        </div>

        <h2 className="mt-6 font-serif text-4xl text-[#264B43] sm:text-6xl">
          4.9 / 5
        </h2>

        <p className="mt-4 text-base text-gray-600 sm:text-lg">
          Based on 150+ patient experiences
        </p>

      </div>
    </section>
  );
}