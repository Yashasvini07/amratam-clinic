import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

type Props = {
  article: BlogPost;
};

export default function ArticleCard({ article }: Props) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <Image
        src={article.coverImage}
        alt={article.title}
        width={500}
        height={320}
        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-[#D08F59]">
          {article.category}
        </p>

        <h3 className="mt-4 font-serif text-2xl text-[#264B43]">
          {article.title}
        </h3>

        <p className="mt-4 leading-7 text-gray-600">
          {article.excerpt}
        </p>

        <div className="mt-6 text-sm text-gray-500">
          {article.readingTime}
        </div>
      </div>
    </Link>
  );
}