using Azure;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Entities;

/// <summary>
/// One row per booked (date, time) slot. Existence of the row IS the reservation — inserting via
/// AddEntity (not upsert) fails atomically if the slot is already taken, and deleting it frees the
/// slot back up when an appointment is cancelled.
/// </summary>
public class AppointmentSlotLockTableEntity : ITableEntity
{
    public string PartitionKey { get; set; } = string.Empty; // = AppointmentDate "yyyy-MM-dd"
    public string RowKey { get; set; } = string.Empty; // = StartTime "HHmm"
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public string AppointmentId { get; set; } = string.Empty;
}
