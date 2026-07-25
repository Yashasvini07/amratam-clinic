import { BlogPost } from "@/lib/blog";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: BlogPost[];
};

export default function ArticleGrid({ articles }: Props) {
  return (
    <section className="pb-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
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