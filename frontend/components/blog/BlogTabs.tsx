"use client";

const tabs = [
  "Articles",
  "Videos",
  "Instagram",
  "Resources",
];

export default function BlogTabs() {
  return (
    <div className="border-b border-stone-200">
      <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 sm:gap-12">

        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={`whitespace-nowrap border-b-2 py-4 text-sm transition-colors sm:py-6 sm:text-base ${
              index === 0
                ? "border-[#D08F59] text-[#D08F59]"
                : "border-transparent text-gray-500 hover:text-[#D08F59]"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>
    </div>
  );
}