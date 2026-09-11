import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/site";
import BlogTabs from "@/components/blog/BlogTabs";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import ArticleGrid from "@/components/blog/ArticleGrid";
import ResourcesSection from "@/components/blog/ResourcesSection";
import Section from "@/components/ui/Section";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {

  const featured = blogPosts.find(
    article => article.featured
  )!;

  const articles = blogPosts.filter(
    article => !article.featured
  );

  return (
    <>

      <main>

        <PageHero {...pageMetadata.blog} />

        <Section background="light" noTopPadding>
          <BlogTabs />

          <FeaturedArticle article={featured} />

          <ArticleGrid articles={articles} />

          <ResourcesSection />

        </Section>

      </main>

    </>
  );
}