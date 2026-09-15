import { FileText, Download } from "lucide-react";
import { BlogPostMeta } from "@/lib/blog";

type Props = {
  articles: BlogPostMeta[];
};

export default function PatientResourcesPanel({ articles }: Props) {
  const downloadablePosts = articles.filter((post) => post.pdfUrl);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">

      <h2 className="font-serif text-4xl text-[#264B43]">
        Patient Resources
      </h2>

      <p className="mt-4 leading-8 text-gray-600">
        Downloadable guides on common conditions we treat, straight from the clinic.
      </p>

      {downloadablePosts.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {downloadablePosts.map((post) => (
            <a
              key={post.slug}
              href={post.pdfUrl}
              download={`${post.title}.pdf`}
              className="block cursor-pointer rounded-xl border border-stone-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <FileText
                size={32}
                className="text-[#D08F59]"
              />

              <h3 className="mt-6 text-xl font-semibold text-[#264B43]">
                {post.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {post.excerpt}
              </p>

              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#D08F59]">
                <Download size={16} />
                Download PDF
              </span>
            </a>
          ))}

        </div>
      ) : (
        <p className="mt-10 text-gray-500">
          No downloadable resources are available yet.
        </p>
      )}

    </div>
  );
}
