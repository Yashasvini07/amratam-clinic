import { FaYoutube, FaInstagram } from "react-icons/fa";
import { FileText} from "lucide-react";
import { clinic } from "@/lib/clinic";
import Link from "next/link";

export default function ResourcesSection() {
  const resources = [
    {
      title: "YouTube",
      icon: FaYoutube,
      description:
        "Watch educational videos covering holistic health, natural therapies and wellness tips.",
      href: clinic.socials.youtube,
      comingSoon: false,
    },
    {
      title: "Instagram",
      icon: FaInstagram,
      description:
        "Daily wellness inspiration, patient education and clinic updates.",
      href: clinic.socials.instagram,
      comingSoon: false,
    },
    {
      title: "Patient Resources",
      description:
        "Downloadable wellness guides, consultation preparation and educational material.",
      icon: FileText,
      href: "#",
      comingSoon: true,
    },
  ];

  return (
    <section className="bg-[#FDFBF8] pt-0 pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-6">

        <p className="uppercase tracking-[0.25em] text-xs text-[#D08F59] sm:tracking-[0.3em] sm:text-sm">
          Beyond the Clinic
        </p>

        <h2 className="mt-4 font-serif text-3xl text-[#264B43] sm:text-4xl md:text-5xl">
          Learn wherever you are
        </h2>

        <div className="mt-8 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3">

          {resources.map((resource) => {

            const Icon = resource.icon;

            return (
              <Link
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer rounded-xl border border-stone-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg block"
              >
                <Icon
                  size={36}
                  className="text-[#D08F59]"
                />

                <h3 className="mt-6 text-2xl font-semibold text-[#264B43]">
                  {resource.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {resource.description}
                </p>

                {resource.comingSoon && (
                  <span className="mt-6 inline-block rounded-full bg-stone-100 px-4 py-2 text-sm text-gray-600">
                    Coming Soon
                  </span>
                )}

              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}