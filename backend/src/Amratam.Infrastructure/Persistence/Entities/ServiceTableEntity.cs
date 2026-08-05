using Azure;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Entities;

public class ServiceTableEntity : ITableEntity
{
    public const string PartitionKeyValue = "Service";

    public string PartitionKey { get; set; } = PartitionKeyValue;
    public string RowKey { get; set; } = string.Empty; // = Service.Id (slug)
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? ShortDescription { get; set; }
    public int DurationMinutes { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
}
