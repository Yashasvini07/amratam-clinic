"use client";

import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import {
  ApiError,
  ApiService,
  Slot,
  createAppointment,
  getAvailability,
  getServices,
} from "@/lib/api";

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_PREFIX = "+91";
const INDIA_MOBILE_PATTERN = /^[6-9]\d{9}$/;

function validateEmail(email: string): string | null {
  if (!email) return null; // optional field
  return EMAIL_PATTERN.test(email) ? null : "Enter a valid email address.";
}

function validatePhone(localNumber: string): string | null {
  if (!localNumber) return "Phone number is required.";
  if (!INDIA_MOBILE_PATTERN.test(localNumber)) {
    return "Enter a valid 10-digit mobile number.";
  }
  return null;
}

function formatSlotLabel(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export default function AppointmentForm() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [servicesError, setServicesError] = useState(false);

  const [serviceId, setServiceId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(todayIsoDate());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadedDate, setLoadedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const slotsLoading = loadedDate !== appointmentDate;

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ date: string; time: string; serviceName: string } | null>(null);

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
        if (data.length > 0) setServiceId(data[0].id);
      })
      .catch(() => setServicesError(true));
  }, []);

  useEffect(() => {
    if (!appointmentDate) return;

    let ignore = false;
    getAvailability(appointmentDate, appointmentDate)
      .then((days) => {
        if (ignore) return;
        setSlots(days[0]?.slots ?? []);
        setSelectedSlot(null);
        setLoadedDate(appointmentDate);
      })
      .catch(() => {
        if (ignore) return;
        setSlots([]);
        setLoadedDate(appointmentDate);
      });

    return () => {
      ignore = true;
    };
  }, [appointmentDate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const phoneValidationError = validatePhone(patientPhone);
    const emailValidationError = validateEmail(patientEmail);
    setPhoneError(phoneValidationError);
    setEmailError(emailValidationError);

    if (!serviceId || !selectedSlot || !patientName) {
      setSubmitError("Please fill in all required fields and select a time slot.");
      return;
    }

    if (phoneValidationError || emailValidationError) {
      setSubmitError("Please fix the errors below before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createAppointment({
        serviceId,
        appointmentDate,
        startTime: selectedSlot,
        patientName,
        patientPhone: `${INDIA_PHONE_PREFIX}${patientPhone}`,
        patientEmail: patientEmail || undefined,
        message: message || undefined,
      });

      setConfirmation({
        date: result.appointmentDate,
        time: formatSlotLabel(result.startTime),
        serviceName: result.serviceName,
      });
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setSubmitError("That slot was just booked by someone else. Please pick another time.");
        getAvailability(appointmentDate, appointmentDate).then((days) => setSlots(days[0]?.slots ?? []));
        setSelectedSlot(null);
      } else {
        setSubmitError("We couldn't submit your request. Please try again or contact us directly.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="rounded-lg border border-stone-200 bg-[#FDFBF8] p-8 text-center">
        <h3 className="mb-2 text-xl font-medium text-[#264B43]">Appointment Requested</h3>
        <p className="text-gray-600">
          Your {confirmation.serviceName} appointment on{" "}
          <strong>{confirmation.date}</strong> at <strong>{confirmation.time}</strong> has
          been received. We&rsquo;ll confirm shortly.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Full Name *"
          placeholder="Dr./Mr./Ms. Your Name"
          value={patientName}
          onChange={setPatientName}
        />

        <Input
          label="Email Address"
          placeholder="you@example.com"
          value={patientEmail}
          onChange={setPatientEmail}
          onBlur={() => setEmailError(validateEmail(patientEmail))}
          type="email"
          error={emailError}
        />

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
            Phone Number *
          </label>

          <div
            className={`flex items-center rounded-lg border bg-[#FDFBF8] ${phoneError ? "border-red-400" : "border-stone-200"}`}
          >
            <span className="border-r border-stone-200 px-4 py-4 text-gray-600">
              {INDIA_PHONE_PREFIX}
            </span>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="98765 43210"
              value={patientPhone}
              maxLength={10}
              onChange={(e) => setPatientPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              onBlur={() => setPhoneError(validatePhone(patientPhone))}
              className="w-full bg-transparent p-4 outline-none"
            />
          </div>
          {phoneError && <p className="mt-1 text-sm text-red-600">{phoneError}</p>}
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
            Interested In *
          </label>

          <select
            className="w-full rounded-lg border border-stone-200 bg-[#FDFBF8] p-4"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          >
            {services.length === 0 && <option value="">Loading services...</option>}
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          {servicesError && (
            <p className="mt-1 text-sm text-red-600">
              Couldn&rsquo;t load services. Please refresh the page.
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
          Preferred Date *
        </label>
        <input
          type="date"
          min={todayIsoDate()}
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-[#FDFBF8] p-4 md:w-1/2"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
          Available Time Slots *
        </label>

        {slotsLoading && <p className="text-sm text-gray-500">Loading available slots...</p>}

        {!slotsLoading && slots.length === 0 && (
          <p className="text-sm text-gray-500">
            No slots available on this date. Please choose another date.
          </p>
        )}

        {!slotsLoading && slots.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
            {slots.map((slot) => (
              <button
                key={slot.startTime}
                type="button"
                disabled={!slot.isAvailable}
                onClick={() => setSelectedSlot(slot.startTime)}
                className={`rounded-lg border p-3 text-sm transition-all duration-200 ${
                  !slot.isAvailable
                    ? "cursor-not-allowed border-stone-100 bg-stone-100 text-gray-400 line-through"
                    : selectedSlot === slot.startTime
                      ? "border-[#D08F59] bg-[#D08F59] text-white"
                      : "border-stone-200 bg-[#FDFBF8] hover:border-[#D08F59]"
                }`}
              >
                {formatSlotLabel(slot.startTime)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
          Your Message
        </label>

        <textarea
          rows={6}
          placeholder="Please describe your health concerns..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-[#FDFBF8] p-4"
        />
      </div>

      <p className="text-sm text-gray-500">
        Your information is kept strictly confidential and will only be used
        to contact you regarding your enquiry.
      </p>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <Button
        text={submitting ? "Sending..." : "Send Enquiry"}
        showArrow
        type="submit"
        disabled={submitting}
      />
    </form>
  );
}

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  error?: string | null;
};

function Input({ label, placeholder, value, onChange, onBlur, type = "text", error }: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gray-600">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full rounded-lg border bg-[#FDFBF8] p-4 ${error ? "border-red-400" : "border-stone-200"}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
