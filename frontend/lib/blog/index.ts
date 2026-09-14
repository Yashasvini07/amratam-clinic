import diabetesAndInsulinProblems from "./posts/diabetes-and-insulin-problems";
import gastricDiseasesAndDigestiveHealth from "./posts/gastric-diseases-and-digestive-health";
import heartProblemsAndCardiacCare from "./posts/heart-problems-and-cardiac-care";

export type { BlogPost, BlogPostMeta } from "./types";

export const blogPosts = [
  diabetesAndInsulinProblems,
  heartProblemsAndCardiacCare,
  gastricDiseasesAndDigestiveHealth,
];
