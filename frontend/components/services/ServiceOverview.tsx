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
    <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <Image
          src={image}
          alt={title}
          width={600}
          height={700}
          className="mb-6 w-full rounded-xl object-cover shadow-xl sm:float-left sm:mr-10 sm:mb-4 sm:w-2/5"
        />

        <p className="uppercase tracking-[0.25em] text-xs text-[#D08F59] sm:tracking-[0.3em] sm:text-sm">
          {subtitle}
        </p>

        <h2 className="mt-4 font-serif text-3xl text-[#264B43] sm:text-4xl md:text-5xl">
          {title}
        </h2>

        <div className="mt-6 text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-9">
          {content}
        </div>

        <div className="clear-both" />
      </div>
    </section>
  );
}