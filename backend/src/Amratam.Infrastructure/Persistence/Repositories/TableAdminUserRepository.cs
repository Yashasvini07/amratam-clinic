using Amratam.Application.Common;
using Amratam.Domain.Entities;
using Amratam.Infrastructure.Persistence.Entities;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Repositories;

public class TableAdminUserRepository(TableServiceClient tableServiceClient) : IAdminUserRepository
{
    private TableClient Table => tableServiceClient.GetTableClient(TableNames.AdminUsers);

    public async Task<AdminUser?> GetByUsernameAsync(string username, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await Table.GetEntityAsync<AdminUserTableEntity>(
                AdminUserTableEntity.PartitionKeyValue, username, cancellationToken: cancellationToken);
            return ToDomain(response.Value);
        }
        catch (Azure.RequestFailedException ex) when (ex.Status == 404)
        {
            return null;
        }
    }

    public async Task<bool> AnyAsync(CancellationToken cancellationToken = default)
    {
        await foreach (var _ in Table.QueryAsync<AdminUserTableEntity>(
            e => e.PartitionKey == AdminUserTableEntity.PartitionKeyValue, maxPerPage: 1, cancellationToken: cancellationToken))
        {
            return true;
        }
        return false;
    }

    public async Task AddAsync(AdminUser user, CancellationToken cancellationToken = default)
    {
        var entity = new AdminUserTableEntity
        {
            RowKey = user.Username,
            PasswordHash = user.PasswordHash,
            LastLoginAtUtc = user.LastLoginAtUtc
        };
        await Table.AddEntityAsync(entity, cancellationToken);
    }

    public async Task UpdateAsync(AdminUser user, CancellationToken cancellationToken = default)
    {
        var entity = new AdminUserTableEntity
        {
            RowKey = user.Username,
            PasswordHash = user.PasswordHash,
            LastLoginAtUtc = user.LastLoginAtUtc
        };
        await Table.UpdateEntityAsync(entity, Azure.ETag.All, TableUpdateMode.Replace, cancellationToken);
    }

    private static AdminUser ToDomain(AdminUserTableEntity entity) => new()
    {
        Username = entity.RowKey,
        PasswordHash = entity.PasswordHash,
        LastLoginAtUtc = entity.LastLoginAtUtc?.UtcDateTime
    };
}
