import Image from "next/image";
import {
  Award,
  Globe,
  Heart,
  BookOpen,
} from "lucide-react";

import { doctor, doctorInfo, clinicExpertise } from "@/lib/about";

const icons = {
  award: Award,
  globe: Globe,
  heart: Heart,
  book: BookOpen,
};

export default function DoctorProfile() {
  return (
    <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
      {/* Doctor Image */}
      <div>
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={550}
          height={700}
          className="rounded-xl object-cover shadow-lg"
        />
      </div>

      {/* Doctor Information */}
      <div>
        <p className="mb-3 uppercase tracking-[0.3em] text-sm text-[#D08F59]">
          {doctor.designation}
        </p>

        <h2 className="font-serif text-5xl leading-tight text-[#264B43]">
          {doctor.name}
        </h2>

        <p className="mt-4 text-xl text-gray-500">
          {doctor.degree}
        </p>

        {/* Biography */}
        <div className="mt-10 space-y-6 text-lg leading-8 text-gray-600">
          {doctor.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {/* Qualifications */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {doctorInfo.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];

            return (
              <div
                key={item.title}
                className="rounded-md border border-stone-200 bg-white p-6 transition-all duration-300 hover:border-[#D08F59]"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className="text-[#D08F59]"
                  />

                  <p className="uppercase tracking-[0.25em] text-xs text-gray-500">
                    {item.title}
                  </p>
                </div>

                <p className="mt-4 text-lg font-medium text-[#264B43]">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

          {/* Specialisations */}
        <div className="mt-12">
          <h3 className="mb-5 text-lg font-semibold text-[#264B43]">
            {clinicExpertise.title}
          </h3>

          <div className="flex flex-wrap gap-3">
            {clinicExpertise.conditions.map((condition) => (
              <span
                key={condition}
                className="
                  rounded-full
                  border
                  border-[#D08F59]/30
                  bg-[#FDFBF8]
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-[#264B43]
                  transition-colors
                  hover:bg-[#D08F59]
                  hover:text-white
                "
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}