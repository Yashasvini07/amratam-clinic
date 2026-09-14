import { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: { en: ReactNode; hi: ReactNode };
  category: string;
  author: string;
  publishedOn: string;
  readingTime: string;
  coverImage: string;
  featured?: boolean;
  tags: string[];
  pdfUrl?: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;
