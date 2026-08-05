"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AdminAppointment,
  AppointmentStatus,
  AvailabilityOverride,
  adminLogout,
  adminMe,
  createAvailabilityOverride,
  deleteAvailabilityOverride,
  getAdminAppointments,
  getAvailabilityOverrides,
  updateAppointmentStatus,
} from "@/lib/api";

const STATUS_TABS: AppointmentStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];

const NEXT_STATUS: Partial<Record<AppointmentStatus, { label: string; next: AppointmentStatus }[]>> = {
  Pending: [
    { label: "Confirm", next: "Confirmed" },
    { label: "Cancel", next: "Cancelled" },
  ],
  Confirmed: [
    { label: "Mark Completed", next: "Completed" },
    { label: "Cancel", next: "Cancelled" },
  ],
};

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<AppointmentStatus>("Pending");
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loadedTab, setLoadedTab] = useState<AppointmentStatus | null>(null);
  const appointmentsLoading = loadedTab !== activeTab;
  const [actionError, setActionError] = useState<string | null>(null);

  const [overrides, setOverrides] = useState<AvailabilityOverride[]>([]);
  const [blockDate, setBlockDate] = useState(todayIsoDate());
  const [blockReason, setBlockReason] = useState("");
  const [blockSubmitting, setBlockSubmitting] = useState(false);

  useEffect(() => {
    adminMe()
      .then((me) => {
        setUsername(me.username);
        setCheckingAuth(false);
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  const loadAppointments = useCallback((status: AppointmentStatus) => {
    getAdminAppointments(status)
      .then((result) => setAppointments(result.items))
      .catch(() => setAppointments([]))
      .finally(() => setLoadedTab(status));
  }, []);

  const loadOverrides = useCallback(() => {
    const from = todayIsoDate();
    const to = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    getAvailabilityOverrides(from, to)
      .then(setOverrides)
      .catch(() => setOverrides([]));
  }, []);

  useEffect(() => {
    if (!username) return;
    loadAppointments(activeTab);
  }, [username, activeTab, loadAppointments]);

  useEffect(() => {
    if (!username) return;
    loadOverrides();
  }, [username, loadOverrides]);

  async function handleStatusChange(id: string, next: AppointmentStatus) {
    setActionError(null);
    try {
      await updateAppointmentStatus(id, next);
      loadAppointments(activeTab);
    } catch {
      setActionError("Couldn't update that booking. Please try again.");
    }
  }

  async function handleLogout() {
    await adminLogout().catch(() => {});
    router.replace("/admin/login");
  }

  async function handleBlockDate(e: React.FormEvent) {
    e.preventDefault();
    setBlockSubmitting(true);
    try {
      await createAvailabilityOverride({ date: blockDate, isClosed: true, reason: blockReason || undefined });
      setBlockReason("");
      loadOverrides();
    } catch {
      setActionError("Couldn't block that date. Please try again.");
    } finally {
      setBlockSubmitting(false);
    }
  }

  async function handleUnblock(id: string) {
    await deleteAvailabilityOverride(id).catch(() => {});
    loadOverrides();
  }

  if (checkingAuth) {
    return <div className="px-6 py-24 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-[#264B43]">Amratam Clinic — Admin</h1>
          <p className="text-sm text-gray-600">Signed in as {username}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-md border border-stone-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-stone-100"
        >
          Sign Out
        </button>
      </div>

      {actionError && (
        <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">{actionError}</p>
      )}

      <section className="mb-16">
        <h2 className="mb-4 text-lg font-medium text-[#264B43]">Bookings</h2>

        <div className="mb-6 flex gap-2 overflow-x-auto">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[#264B43] text-white"
                  : "bg-stone-100 text-gray-700 hover:bg-stone-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {appointmentsLoading && <p className="text-sm text-gray-500">Loading...</p>}

        {!appointmentsLoading && appointments.length === 0 && (
          <p className="text-sm text-gray-500">No {activeTab.toLowerCase()} bookings.</p>
        )}

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="rounded-lg border border-stone-200 bg-[#FDFBF8] p-5">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-[#264B43]">{appointment.patientName}</p>
                  <p className="text-sm text-gray-600">{appointment.patientPhone}</p>
                  {appointment.patientEmail && (
                    <p className="text-sm text-gray-600">{appointment.patientEmail}</p>
                  )}
                </div>
                <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
                  {appointment.status}
                </span>
              </div>

              <p className="mb-1 text-sm text-gray-700">
                <strong>{appointment.serviceName}</strong> — {appointment.appointmentDate} at{" "}
                {formatTime(appointment.startTime)}
              </p>

              {appointment.message && (
                <p className="mb-3 text-sm italic text-gray-500">&ldquo;{appointment.message}&rdquo;</p>
              )}

              <div className="flex flex-wrap gap-2">
                {(NEXT_STATUS[appointment.status] ?? []).map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleStatusChange(appointment.id, action.next)}
                    className="rounded-md border border-[#264B43] px-4 py-2 text-sm font-medium text-[#264B43] hover:bg-[#264B43] hover:text-white"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium text-[#264B43]">Blocked Dates</h2>
        <p className="mb-4 text-sm text-gray-600">
          Block a date when the clinic is closed so patients can&rsquo;t book it online.
        </p>

        <form onSubmit={handleBlockDate} className="mb-6 flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-gray-600">Date</label>
            <input
              type="date"
              min={todayIsoDate()}
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              className="rounded-lg border border-stone-200 bg-[#FDFBF8] p-3"
            />
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-gray-600">Reason (optional)</label>
            <input
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="e.g. Doctor unavailable"
              className="w-full rounded-lg border border-stone-200 bg-[#FDFBF8] p-3"
            />
          </div>
          <button
            type="submit"
            disabled={blockSubmitting}
            className="rounded-md bg-[#D08F59] px-6 py-3 text-sm font-medium text-white hover:bg-[#B97C4A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Block Date
          </button>
        </form>

        {overrides.length === 0 && <p className="text-sm text-gray-500">No blocked dates coming up.</p>}

        <div className="space-y-2">
          {overrides.map((override) => (
            <div
              key={override.id}
              className="flex items-center justify-between rounded-lg border border-stone-200 bg-[#FDFBF8] p-4"
            >
              <div>
                <p className="font-medium text-[#264B43]">{override.date}</p>
                {override.reason && <p className="text-sm text-gray-600">{override.reason}</p>}
              </div>
              <button
                onClick={() => handleUnblock(override.id)}
                className="rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-stone-100"
              >
                Unblock
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
