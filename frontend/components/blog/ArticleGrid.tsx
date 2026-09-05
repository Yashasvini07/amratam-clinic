import { BlogPost } from "@/lib/blog";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: BlogPost[];
};

export default function ArticleGrid({ articles }: Props) {
  return (
    <section className="pb-12 sm:pb-20 lg:pb-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}