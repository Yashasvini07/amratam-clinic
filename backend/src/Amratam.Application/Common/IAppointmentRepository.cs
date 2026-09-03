using Amratam.Domain.Entities;

namespace Amratam.Application.Common;

public interface IAppointmentRepository
{
    /// <summary>
    /// Returns appointments for the given date, excluding cancelled ones — used both for availability
    /// calculation and for the slot conflict check on create.
    /// </summary>
    Task<List<Appointment>> GetActiveByDateAsync(DateOnly date, CancellationToken cancellationToken = default);

    Task<List<Appointment>> GetActiveByDateRangeAsync(DateOnly from, DateOnly to, CancellationToken cancellationToken = default);

    /// <summary>
    /// Atomically reserves the appointment's slot and persists the record.
    /// Throws <see cref="ConflictException"/> if the slot was taken between the caller's
    /// availability check and this call.
    /// </summary>
    Task CreateAsync(Appointment appointment, CancellationToken cancellationToken = default);

    /// <summary>Scans appointments across the given month partitions, applying status/date filters and in-memory paging.</summary>
    Task<(List<Appointment> Items, int TotalCount)> GetPagedAsync(
        IReadOnlyCollection<AppointmentStatus>? statuses,
        DateOnly from,
        DateOnly to,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default);

    Task<Appointment?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates status; transitioning to Cancelled also frees the slot lock so the slot can be re-booked.
    /// </summary>
    Task UpdateStatusAsync(Guid id, AppointmentStatus status, CancellationToken cancellationToken = default);
}
