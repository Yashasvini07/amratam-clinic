using Azure;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Entities;

public class AvailabilityOverrideTableEntity : ITableEntity
{
    public string PartitionKey { get; set; } = string.Empty; // = Date "yyyy-MM-dd"
    public string RowKey { get; set; } = string.Empty; // = Id (Guid)
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public bool IsClosed { get; set; }
    public string? StartTime { get; set; } // "HH:mm:ss"
    public string? EndTime { get; set; }
    public string? Reason { get; set; }
}
