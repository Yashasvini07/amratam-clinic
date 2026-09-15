"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BlogPostMeta } from "@/lib/blog";
import FeaturedArticle from "./FeaturedArticle";
import ArticleGrid from "./ArticleGrid";
import PatientResourcesPanel from "./PatientResourcesPanel";
import VideosPanel from "./VideosPanel";
import InstagramPanel from "./InstagramPanel";

const tabs = [
  { key: "articles", label: "Articles" },
  { key: "videos", label: "Videos" },
  { key: "instagram", label: "Instagram" },
  { key: "resources", label: "Resources" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

type Props = {
  featured: BlogPostMeta;
  articles: BlogPostMeta[];
  allPosts: BlogPostMeta[];
};

export default function BlogTabs({ featured, articles, allPosts }: Props) {
  return (
    <Suspense fallback={<BlogTabsShell activeTab="articles" featured={featured} articles={articles} allPosts={allPosts} />}>
      <BlogTabsInner featured={featured} articles={articles} allPosts={allPosts} />
    </Suspense>
  );
}

function BlogTabsInner({ featured, articles, allPosts }: Props) {
  const searchParams = useSearchParams();
  const activeTab = (tabs.find((tab) => tab.key === searchParams.get("tab"))?.key ??
    "articles") as TabKey;

  return <BlogTabsShell activeTab={activeTab} featured={featured} articles={articles} allPosts={allPosts} />;
}

function BlogTabsShell({ activeTab, featured, articles, allPosts }: Props & { activeTab: TabKey }) {
  return (
    <div>
      <div
        id="blog-tabs"
        className="border-b border-stone-200 scroll-mt-24"
      >
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 sm:gap-12">

          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={tab.key === "articles" ? "/blog" : `/blog?tab=${tab.key}`}
              scroll={false}
              className={`whitespace-nowrap border-b-2 py-4 text-sm transition-colors sm:py-6 sm:text-base ${
                activeTab === tab.key
                  ? "border-[#D08F59] text-[#D08F59]"
                  : "border-transparent text-gray-500 hover:text-[#D08F59]"
              }`}
            >
              {tab.label}
            </Link>
          ))}

        </div>
      </div>

      {activeTab === "articles" && (
        <>
          <FeaturedArticle article={featured} />
          <ArticleGrid articles={articles} />
        </>
      )}

      {activeTab === "resources" && <PatientResourcesPanel articles={allPosts} />}
      {activeTab === "videos" && <VideosPanel />}
      {activeTab === "instagram" && <InstagramPanel />}
    </div>
  );
}
