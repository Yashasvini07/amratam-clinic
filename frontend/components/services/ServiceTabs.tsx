"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    label: "Electrohomeopathy",
    href: "/services/electrohomeopathy",
  },
  {
    label: "Bachflower",
    href: "/services/bachflower",
  },
];

export default function ServiceTabs() {
  const pathname = usePathname();

  return (
    <div className="border-b border-stone-200 bg-[#FDFBF8]">
      <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 sm:gap-12">

        {tabs.map((tab) => {

          const active = pathname === tab.href;

          return (
            <Link
              key={tab.label}
              href={tab.href}
               scroll={false}
              className={`whitespace-nowrap border-b-2 py-4 text-sm transition-colors sm:py-6 sm:text-base ${
                active
                  ? "border-[#D08F59] text-[#D08F59]"
                  : "border-transparent text-gray-500 hover:text-[#D08F59]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}

      </div>
    </div>
  );
}