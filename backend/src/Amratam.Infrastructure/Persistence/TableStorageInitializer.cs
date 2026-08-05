using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence;

public static class TableStorageInitializer
{
    public static async Task EnsureTablesExistAsync(TableServiceClient client, CancellationToken cancellationToken = default)
    {
        foreach (var tableName in TableNames.All)
        {
            await client.CreateTableIfNotExistsAsync(tableName, cancellationToken);
        }
    }
}
