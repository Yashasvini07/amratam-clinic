using Azure;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Entities;

public class AvailabilityTemplateTableEntity : ITableEntity
{
    public const string PartitionKeyValue = "Template";

    public string PartitionKey { get; set; } = PartitionKeyValue;
    public string RowKey { get; set; } = string.Empty; // = DayOfWeek.ToString()
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public string StartTime { get; set; } = string.Empty; // "HH:mm:ss"
    public string EndTime { get; set; } = string.Empty;
    public int SlotDurationMinutes { get; set; }
    public bool IsActive { get; set; }
}
