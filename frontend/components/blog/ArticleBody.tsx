"use client";

import { useState, ReactNode } from "react";

type Props = {
  content: {
    en: ReactNode;
    hi: ReactNode;
  };
};

export default function ArticleBody({ content }: Props) {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <div className="mt-16">
      <div className="mb-10 flex border-b border-stone-200">
        <button
          onClick={() => setLang("en")}
          className={`px-6 py-3 text-base font-medium transition-colors ${
            lang === "en"
              ? "border-b-2 border-[#D08F59] text-[#264B43]"
              : "text-gray-500 hover:text-[#264B43]"
          }`}
        >
          English
        </button>

        <button
          onClick={() => setLang("hi")}
          className={`px-6 py-3 text-base font-medium transition-colors ${
            lang === "hi"
              ? "border-b-2 border-[#D08F59] text-[#264B43]"
              : "text-gray-500 hover:text-[#264B43]"
          }`}
        >
          हिंदी
        </button>
      </div>

      <div className="max-w-none">{lang === "en" ? content.en : content.hi}</div>
    </div>
  );
}
