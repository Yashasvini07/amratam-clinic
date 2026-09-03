"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import DoctorProfile from "./DoctorProfile";
import Philosophy from "./Philosophy";

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState<"doctor" | "philosophy">("doctor");

  return (
    <Section background="light" className="pt-0">
      <div className="w-full">

        <div className="mb-16 flex border-b border-stone-200">

          <button
            onClick={() => setActiveTab("doctor")}
            className={`px-8 py-5 text-lg font-medium transition-colors ${
              activeTab === "doctor"
                ? "border-b-2 border-[#D08F59] text-[#264B43]"
                : "text-gray-500 hover:text-[#264B43]"
            }`}
          >
            Meet the Doctor
          </button>

          <button
            onClick={() => setActiveTab("philosophy")}
            className={`px-8 py-5 text-lg font-medium transition-colors ${
              activeTab === "philosophy"
                ? "border-b-2 border-[#D08F59] text-[#264B43]"
                : "text-gray-500 hover:text-[#264B43]"
            }`}
          >
            Philosophy
          </button>

        </div>

        <div className="transition-all duration-300">
          {activeTab === "doctor" ? <DoctorProfile /> : <Philosophy />}
        </div>

      </div>
    </Section>
  );
}