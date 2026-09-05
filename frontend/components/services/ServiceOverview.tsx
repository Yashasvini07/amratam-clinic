import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  content: ReactNode;
  image: string;
};

export default function ServiceOverview({
  title,
  subtitle,
  content,
  image,
}: Props) {
  return (
    <section className="py-12 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <Image
            src={image}
            alt={title}
            width={600}
            height={700}
            className="w-full rounded-xl object-cover shadow-xl"
          />
        </div>

        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#D08F59] sm:tracking-[0.3em] sm:text-sm">
            {subtitle}
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#264B43] sm:text-4xl md:text-5xl">
            {title}
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-9">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}