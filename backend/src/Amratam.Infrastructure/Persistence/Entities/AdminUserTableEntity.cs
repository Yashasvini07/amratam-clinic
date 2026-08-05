using Azure;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Entities;

public class AdminUserTableEntity : ITableEntity
{
    public const string PartitionKeyValue = "Admin";

    public string PartitionKey { get; set; } = PartitionKeyValue;
    public string RowKey { get; set; } = string.Empty; // = Username
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }

    public string PasswordHash { get; set; } = string.Empty;
    public DateTimeOffset? LastLoginAtUtc { get; set; }
}
