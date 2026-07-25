import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { BlogPost } from "@/lib/blog";

type Props = {
  article: BlogPost;
};

export default function FeaturedArticle({ article }: Props) {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        <Image
          src={article.coverImage}
          alt={article.title}
          width={700}
          height={500}
          className="rounded-xl object-cover shadow-lg"
        />

        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-[#D08F59]">
            Featured Article
          </p>

          <h2 className="mt-4 font-serif text-5xl text-[#264B43]">
            {article.title}
          </h2>

          <p className="mt-8 text-lg leading-9 text-gray-600">
            {article.excerpt}
          </p>

          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
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