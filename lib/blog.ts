export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedOn: string;
  readingTime: string;
  coverImage: string;
  featured?: boolean;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-electrohomeopathy",

    title: "Understanding Electrohomeopathy: Healing Through Nature",

    excerpt:
      "Discover how electrohomeopathy combines botanical extracts with holistic principles to restore balance within the body.",

    content: `
Electrohomeopathy is a natural therapeutic system that uses plant-derived remedies to support the body's own healing abilities.

Unlike conventional medicine that often focuses on symptom management, electrohomeopathy seeks to identify and address the underlying causes of imbalance.

Treatment plans are personalised after a detailed consultation, considering lifestyle, medical history and overall wellbeing.
`,

    category: "Electrohomeopathy",

    author: "Dr. Abhilasha Chourasiya",

    publishedOn: "12 July 2026",

    readingTime: "5 min read",

    coverImage: "/images/blog/electrohomeopathy.jpg",

    featured: true,

    tags: [
      "Electrohomeopathy",
      "Holistic Medicine",
      "Natural Healing",
    ],
  },

  {
    slug: "benefits-of-Bachflower",

    title: "The Benefits of Bachflower for Everyday Wellness",

    excerpt:
      "Small lifestyle changes can have a profound impact on long-term health. Learn how Bachflower approaches prevention and wellness.",

    content: "...",

    category: "Bachflower",

    author: "Dr. Abhilasha Chourasiya",

    publishedOn: "4 July 2026",

    readingTime: "4 min read",

    coverImage: "/images/blog/Bachflower.jpg",

    tags: ["Bachflower", "Lifestyle"],
  },

  {
    slug: "supporting-the-body-naturally",

    title: "Supporting the Body Naturally During Recovery",

    excerpt:
      "Nutrition, rest and botanical medicine work together to promote recovery and long-term vitality.",

    content: "...",

    category: "Wellness",

    author: "Dr. Abhilasha Chourasiya",

    publishedOn: "25 June 2026",

    readingTime: "6 min read",

    coverImage: "/images/blog/wellness.jpg",

    tags: ["Wellness", "Recovery"],
  },
];