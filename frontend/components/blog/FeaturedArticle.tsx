import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { BlogPost } from "@/lib/blog";

type Props = {
  article: BlogPost;
};

export default function FeaturedArticle({ article }: Props) {
  return (
    <section className="pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-20">

        <Image
          src={article.coverImage}
          alt={article.title}
          width={700}
          height={500}
          className="w-full rounded-xl object-cover shadow-lg"
        />

        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#D08F59] sm:tracking-[0.3em] sm:text-sm">
            Featured Article
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#264B43] sm:text-4xl md:text-5xl">
            {article.title}
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-9">
            {article.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-500 sm:mt-10 sm:gap-6">
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.publishedOn}</span>
            <span>•</span>
            <span>{article.readingTime}</span>
          </div>

          <div className="mt-10">
            <Link href={`/blog/${article.slug}`}>
              <Button text="Read Article" showArrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}