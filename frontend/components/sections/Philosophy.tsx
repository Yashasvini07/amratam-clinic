import { philosophy } from "@/lib/about";
import { Heart, Leaf } from "lucide-react";

export default function Philosophy() {
  return (
    <div className="space-y-12 md:space-y-24">
        {/* Section Title */}
        <div className="mx-auto max-w-4xl text-center">

            <p className="uppercase tracking-[0.25em] text-[#D08F59] text-xs sm:tracking-[0.35em] sm:text-sm">
                Our Guiding Principles
            </p>

            <h2 className="mt-6 font-serif text-3xl leading-tight text-[#264B43] sm:text-5xl md:text-6xl">
                Medicine as partnership,
                <br />
                not prescription
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:mt-10 sm:text-xl sm:leading-9">
                At the heart of our practice is a belief that the body,
                given the right conditions, is capable of profound
                self-repair. Our role is to create those conditions
                through precise remedies, thoughtful guidance and
                genuine care.
            </p>

        </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-lg border border-stone-200 shadow-md overflow-hidden">

        {philosophy.values.map((item, index) => (
          <div
            key={item.title}
            className={`px-6 py-6 sm:px-10 ${index !== philosophy.values.length - 1 ? "border-b border-stone-200 md:border-b-0 md:border-r" : ""}`}
          >
            <p className="font-serif text-5xl text-stone-300 sm:text-7xl">
              {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-6 font-serif text-2xl text-[#264B43] sm:mt-8 sm:text-4xl">
              {item.title}
            </h3>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
              {item.description}
            </p>
          </div>
        ))}

      </div>
    {/* Mission and Values */}
    <div className="mt-12 grid gap-6 sm:mt-16 md:mt-32 md:grid-cols-2 md:gap-8">

        <div className="rounded-lg border border-stone-200 p-6 sm:p-10">

            <Heart className="text-[#D08F59]" />

            <h3 className="mt-6 font-serif text-2xl text-[#264B43] sm:text-3xl">
                Our Mission
            </h3>

            <p className="mt-6 leading-7 text-gray-600 sm:leading-8">
                {philosophy.mission}
            </p>

        </div>

        <div className="rounded-lg border border-stone-200 p-6 sm:p-10">

            <Leaf className="text-[#D08F59]" />

            <h3 className="mt-6 font-serif text-2xl text-[#264B43] sm:text-3xl">
                Our Vision
            </h3>

            <p className="mt-6 leading-7 text-gray-600 sm:leading-8">
                {philosophy.vision}
            </p>

        </div>

    </div>
      {/* Philosophy Statement */}

      <div className="mx-auto max-w-4xl text-center">

        <p className="text-lg leading-8 text-gray-600 sm:text-2xl sm:leading-10">
          {philosophy.statement}
        </p>

      </div>

    </div>
  );
}