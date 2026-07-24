import { Star } from "lucide-react";

export default function RatingSummary() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl text-center">

        <div className="flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={30}
              fill="#D08F59"
              color="#D08F59"
            />
          ))}
        </div>

        <h2 className="mt-6 font-serif text-6xl text-[#264B43]">
          4.9 / 5
        </h2>

        <p className="mt-4 text-lg text-gray-600">
          Based on 150+ patient experiences
        </p>

      </div>
    </section>
  );
}