const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5080";

export type ApiService = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  durationMinutes: number;
};

export type Slot = {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export type DayAvailability = {
  date: string;
  slots: Slot[];
};

export type CreateAppointmentInput = {
  serviceId: string;
  appointmentDate: string;
  startTime: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  message?: string;
};

export type CreateAppointmentResult = {
  id: string;
  status: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  serviceName: string;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    throw new ApiError(problem?.detail ?? "Something went wrong. Please try again.", response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  return request<T>(path, { ...init, credentials: "include" });
}

export function getServices() {
  return request<ApiService[]>("/api/v1/services");
}

export function getAvailability(from: string, to: string) {
  return request<DayAvailability[]>(`/api/v1/availability?from=${from}&to=${to}`);
}

export function createAppointment(input: CreateAppointmentInput) {
  return request<CreateAppointmentResult>("/api/v1/appointments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// ---- Admin ----

export type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export type AdminAppointment = {
  id: string;
  serviceName: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string | null;
  message: string | null;
  status: AppointmentStatus;
  createdAtUtc: string;
};

export type PagedResult<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type AvailabilityOverride = {
  id: string;
  date: string;
  isClosed: boolean;
  startTime: string | null;
  endTime: string | null;
  reason: string | null;
};

export function adminLogin(username: string, password: string) {
  return adminRequest<{ username: string }>("/api/v1/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function adminLogout() {
  return adminRequest<void>("/api/v1/admin/logout", { method: "POST" });
}

export function adminMe() {
  return adminRequest<{ username: string }>("/api/v1/admin/me");
}

export function getAdminAppointments(status?: AppointmentStatus) {
  const query = status ? `?status=${status}` : "";
  return adminRequest<PagedResult<AdminAppointment>>(`/api/v1/admin/appointments${query}`);
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  return adminRequest<void>(`/api/v1/admin/appointments/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function getAvailabilityOverrides(from: string, to: string) {
  return adminRequest<AvailabilityOverride[]>(`/api/v1/admin/availability-overrides?from=${from}&to=${to}`);
}

export function createAvailabilityOverride(input: {
  date: string;
  isClosed: boolean;
  startTime?: string;
  endTime?: string;
  reason?: string;
}) {
  return adminRequest<AvailabilityOverride>("/api/v1/admin/availability-overrides", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function deleteAvailabilityOverride(id: string) {
  return adminRequest<void>(`/api/v1/admin/availability-overrides/${id}`, { method: "DELETE" });
}
