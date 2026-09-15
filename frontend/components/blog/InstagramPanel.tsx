import { FaInstagram } from "react-icons/fa";
import { clinic } from "@/lib/clinic";
import Link from "next/link";

export default function InstagramPanel() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">

      <h2 className="font-serif text-4xl text-[#264B43]">
        Instagram
      </h2>

      <p className="mt-4 leading-8 text-gray-600">
        Daily wellness inspiration, patient education and clinic updates.
      </p>

      <Link
        href={clinic.socials.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 flex max-w-md items-center gap-4 rounded-xl border border-stone-200 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <FaInstagram
          size={36}
          className="text-[#D08F59]"
        />

        <span className="text-lg font-semibold text-[#264B43]">
          Follow us on Instagram
        </span>
      </Link>

    </div>
  );
}
