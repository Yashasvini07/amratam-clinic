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
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-20 px-6 lg:grid-cols-2">
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
          <p className="uppercase tracking-[0.3em] text-sm text-[#D08F59]">
            {subtitle}
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#264B43]">
            {title}
          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-600">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}