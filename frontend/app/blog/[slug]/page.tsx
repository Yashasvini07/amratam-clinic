import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogArticle({ params }: Props) {

  const { slug } = await params;

  const article = blogPosts.find(
    post => post.slug === slug
  );

  if (!article) {
    notFound();
  }

  return (
    <>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-20 lg:py-24">

        <p className="uppercase tracking-[0.25em] text-xs text-[#D08F59] sm:tracking-[0.3em] sm:text-sm">
          {article.category}
        </p>

        <h1 className="mt-6 font-serif text-3xl text-[#264B43] sm:text-4xl md:text-6xl">
          {article.title}
        </h1>

        <p className="mt-6 text-sm text-gray-500 sm:mt-8 sm:text-base">
          {article.author} • {article.publishedOn} • {article.readingTime}
        </p>

        <article className="prose prose-base mt-10 max-w-none sm:prose-lg sm:mt-16">
          <p>{article.content}</p>
        </article>

      </main>

    </>
  );
}