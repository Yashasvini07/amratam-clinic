import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";

import { navigation } from "@/lib/navigation";
import { services } from "@/lib/services";
import { clinic } from "@/lib/clinic";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
    <section className="bg-[#264B43] pt-16 pb-12">
      <Container className="grid grid-cols-1 items-start gap-16 text-white md:grid-cols-[1.2fr_0.8fr_0.8fr_1.5fr]">
        {/* 1. Clinic Details */}
        <div className="space-y-5">
          <Image
            src="/images/logo.png"
            alt={`${clinic.name} Logo`}
            width={150}
            height={150}
          />

          <div>
            <h3 className="text-xl font-bold text-gray-100">
              {clinic.doctor}
            </h3>

            <p className="text-sm text-gray-300">
              {clinic.degree}
            </p>

            <p className="text-sm text-gray-300">
              Holistic healing through Electrohomeopathy and Bachflower.
            </p>
          </div>
        </div>

        {/* 2. Navigation */}
        <div className="space-y-3">
          <h3 className="mb-6 text-sm uppercase tracking-[0.3em] text-[#D08F59]">
            Navigation
          </h3>

          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="mb-3 block text-gray-300 transition-colors hover:text-[#D08F59]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* 3. Services */}
        <div className="space-y-3">
          <h3 className="mb-6 text-sm uppercase tracking-[0.3em] text-[#D08F59]">
            Services
          </h3>

          {services.map((service) => (
        <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="mb-3 block text-gray-300 transition-colors hover:text-[#D08F59]"
        >
            {service.title}
        </Link>
        ))}
        </div>

        {/* 4. Contact */}
        <div className="space-y-8">
          <h3 className="text-sm uppercase tracking-[0.3em] text-[#D08F59]">
            Contact
          </h3>

          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPin
              size={18}
              className="mt-1 shrink-0 text-[#D08F59]"
            />

            <address className="not-italic space-y-1 text-base leading-7 text-gray-300">
              {clinic.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </address>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <Phone
              size={18}
              className="shrink-0 text-[#D08F59]"
            />

            <a
              href={`tel:${clinic.contact.phone.replace(/\s+/g, "")}`}
              className="text-base text-gray-300 transition-colors hover:text-white"
            >
              {clinic.contact.phone}
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <Mail
              size={18}
              className="shrink-0 text-[#D08F59]"
            />

            <a
              href={`mailto:${clinic.contact.email}`}
              className="text-base text-gray-300 transition-colors hover:text-white"
            >
              {clinic.contact.email}
            </a>
          </div>

          {/* Timings */}
          <div className="flex items-start gap-4">
            <Clock
              size={18}
              className="mt-1 shrink-0 text-[#D08F59]"
            />

            <div className="space-y-1 text-base leading-7 text-gray-300">
              {clinic.timings.map((timing) => (
                <p key={timing.day}>
                  <span className="font-medium">
                    {timing.day}:
                  </span>{" "}
                  {timing.hours}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}