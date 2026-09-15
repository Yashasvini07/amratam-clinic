import PageHero from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/site";
import BlogTabs from "@/components/blog/BlogTabs";
import ResourcesSection from "@/components/blog/ResourcesSection";
import Section from "@/components/ui/Section";
import { blogPosts, BlogPost, BlogPostMeta } from "@/lib/blog";

function stripContent({ content: _content, ...meta }: BlogPost): BlogPostMeta {
  return meta;
}

export default function BlogPage() {

  const allPosts = blogPosts.map(stripContent);

  const featured = allPosts.find(
    article => article.featured
  )!;

  const articles = allPosts.filter(
    article => !article.featured
  );

  return (
    <>

      <main>

        <PageHero {...pageMetadata.blog} />

        <Section background="light" noTopPadding>
          <BlogTabs featured={featured} articles={articles} allPosts={allPosts} />

          <ResourcesSection />

        </Section>

      </main>

    </>
  );
}