using Azure;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Entities;

public class AppointmentTableEntity : ITableEntity
{
    public string PartitionKey { get; set; } = string.Empty; // = AppointmentDate "yyyy-MM"
    public string RowKey { get; set; } = string.Empty; // = Id (Guid)
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public string ServiceId { get; set; } = string.Empty;
    public string ServiceName { get; set; } = string.Empty;
    public string AppointmentDate { get; set; } = string.Empty; // "yyyy-MM-dd"
    public string StartTime { get; set; } = string.Empty; // "HH:mm:ss"
    public string EndTime { get; set; } = string.Empty;
    public string PatientName { get; set; } = string.Empty;
    public string PatientPhone { get; set; } = string.Empty;
    public string? PatientEmail { get; set; }
    public string? Message { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTimeOffset CreatedAtUtc { get; set; }
    public DateTimeOffset UpdatedAtUtc { get; set; }
}
