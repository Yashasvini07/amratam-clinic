import { philosophy } from "@/lib/about";
import { Heart, Leaf } from "lucide-react";

export default function Philosophy() {
  return (
    <div className="space-y-24">
        {/* Section Title */}
        <div className="mx-auto max-w-4xl text-center">

            <p className="uppercase tracking-[0.35em] text-[#D08F59] text-sm">
                Our Guiding Principles
            </p>

            <h2 className="mt-6 font-serif text-6xl leading-tight text-[#264B43]">
                Medicine as partnership,
                <br />
                not prescription
            </h2>

            <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 text-gray-600">
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
            className={`px-10 py-6 ${index !== philosophy.values.length - 1 ? "border-b border-stone-200 md:border-b-0 md:border-r" : ""}`}
          >
            <p className="font-serif text-7xl text-stone-300">
              {String(index + 1).padStart(2, "0")}
            </p>

            <h3 className="mt-8 font-serif text-4xl text-[#264B43]">
              {item.title}
            </h3>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {item.description}
            </p>
          </div>
        ))}

      </div>
    {/* Mission and Values */}
    <div className="mt-32 grid gap-8 md:grid-cols-2">

        <div className="rounded-lg border border-stone-200 p-10">

            <Heart className="text-[#D08F59]" />

            <h3 className="mt-6 font-serif text-3xl text-[#264B43]">
                Our Mission
            </h3>

            <p className="mt-6 leading-8 text-gray-600">
                {philosophy.mission}
            </p>

        </div>

        <div className="rounded-lg border border-stone-200 p-10">

            <Leaf className="text-[#D08F59]" />

            <h3 className="mt-6 font-serif text-3xl text-[#264B43]">
                Our Vision
            </h3>

            <p className="mt-6 leading-8 text-gray-600">
                {philosophy.vision}
            </p>

        </div>

    </div>
      {/* Philosophy Statement */}

      <div className="mx-auto max-w-4xl text-center">

        <p className="text-2xl leading-10 text-gray-600">
          {philosophy.statement}
        </p>

      </div>

    </div>
  );
}