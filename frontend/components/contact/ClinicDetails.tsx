import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

import { clinic } from "@/lib/clinic";

export default function ClinicDetails() {
  return (
    <div>

      <h2 className="font-serif text-4xl text-[#264B43]">
        Clinic details
      </h2>

      <p className="mt-6 leading-8 text-gray-600">
        We offer in-person consultations at our clinic as well as online
        consultations for patients who are unable to visit in person.
      </p>

      <div className="mt-10 space-y-8">

        <InfoItem
          icon={<MapPin size={18} />}
          title="Address"
          value={<address className="not-italic space-y-1 text-base leading-7">
              {clinic.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>}
        />

        <InfoItem
          icon={<Phone size={18} />}
          title="Phone"
          value={clinic.contact.phone}
        />

        <InfoItem
          icon={<Mail size={18} />}
          title="Email"
          value={clinic.contact.email}
        />

        <InfoItem
          icon={<Clock size={18} />}
          title="Consultation Hours"
          value={
            clinic.timings.map((timing) => (
                <p key={timing.day}>
                  <span className="font-medium">
                    {timing.day}:
                  </span>{" "}
                  {timing.hours}
                </p>
              ))
          }
        />

      </div>

      <div className="mt-14 overflow-hidden rounded-xl border border-stone-200">

        <Image
          src="/images/map-placeholder.jpg"
          alt="Clinic location"
          width={600}
          height={400}
          className="w-full"
        />

      </div>

    </div>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
};

function InfoItem({
  icon,
  title,
  value,
}: InfoItemProps) {
  return (
    <div className="flex gap-4">

      <div className="rounded-lg bg-[#FDF6EF] p-3 text-[#D08F59]">
        {icon}
      </div>

      <div>

        <p className="uppercase tracking-[0.2em] text-xs text-gray-500">
          {title}
        </p>

        <div className="mt-2 leading-7 text-[#264B43]">
          {value}
        </div>

      </div>

    </div>
  );
}