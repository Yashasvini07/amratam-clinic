"use client";

import Button from "@/components/ui/Button";
import { services } from "@/lib/services";

export default function AppointmentForm() {
  return (
    <form className="space-y-8">

      <div className="grid gap-6 md:grid-cols-2">

        <Input label="Full Name *" placeholder="Dr./Mr./Ms. Your Name" />

        <Input label="Email Address *" placeholder="you@example.com" />

        <Input label="Phone Number" placeholder="+91 98765 43210" />

        <div>

          <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
            Interested In
          </label>

          <select className="w-full rounded-lg border border-stone-200 bg-[#FDFBF8] p-4">

            <option>Select a service</option>

            {services.map(service => (
              <option
                key={service.slug}
                value={service.slug}
              >
                {service.title}
              </option>
            ))}

          </select>

        </div>

      </div>

      <div>

        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
          Your Message *
        </label>

        <textarea
          rows={6}
          placeholder="Please describe your health concerns..."
          className="w-full rounded-lg border border-stone-200 bg-[#FDFBF8] p-4"
        />

      </div>

      <p className="text-sm text-gray-500">
        Your information is kept strictly confidential and will only be used
        to contact you regarding your enquiry.
      </p>

      <Button
        text="Send Enquiry"
        showArrow
      />

    </form>
  );
}

type InputProps = {
  label: string;
  placeholder: string;
};

function Input({
  label,
  placeholder,
}: InputProps) {
  return (
    <div>

      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="w-full rounded-lg border border-stone-200 bg-[#FDFBF8] p-4"
      />

    </div>
  );
}