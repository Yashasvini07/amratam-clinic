using Amratam.Domain.Entities;

namespace Amratam.Application.Features.Appointments;

public record CreateAppointmentResult(
    Guid Id,
    string Status,
    DateOnly AppointmentDate,
    TimeOnly StartTime,
    TimeOnly EndTime,
    string ServiceName);

public record AppointmentDto(
    Guid Id,
    string ServiceName,
    DateOnly AppointmentDate,
    TimeOnly StartTime,
    TimeOnly EndTime,
    string PatientName,
    string PatientPhone,
    string? PatientEmail,
    string? Message,
    AppointmentStatus Status,
    DateTime CreatedAtUtc);
