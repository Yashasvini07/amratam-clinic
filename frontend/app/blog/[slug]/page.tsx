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

      <main className="mx-auto max-w-4xl px-6 py-24">

        <p className="uppercase tracking-[0.3em] text-sm text-[#D08F59]">
          {article.category}
        </p>

        <h1 className="mt-6 font-serif text-6xl text-[#264B43]">
          {article.title}
        </h1>

        <p className="mt-8 text-gray-500">
          {article.author} • {article.publishedOn} • {article.readingTime}
        </p>

        <article className="prose prose-lg mt-16 max-w-none">
          <p>{article.content}</p>
        </article>

      </main>

    </>
  );
}