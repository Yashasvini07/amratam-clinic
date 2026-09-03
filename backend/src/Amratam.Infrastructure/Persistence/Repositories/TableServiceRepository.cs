using Amratam.Application.Common;
using Amratam.Domain.Entities;
using Amratam.Infrastructure.Persistence.Entities;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Repositories;

public class TableServiceRepository(TableServiceClient tableServiceClient) : IServiceRepository
{
    private TableClient Table => tableServiceClient.GetTableClient(TableNames.Services);

    public async Task<List<Service>> GetActiveAsync(CancellationToken cancellationToken = default)
    {
        var results = new List<Service>();
        await foreach (var entity in Table.QueryAsync<ServiceTableEntity>(
            e => e.PartitionKey == ServiceTableEntity.PartitionKeyValue && e.IsActive, cancellationToken: cancellationToken))
        {
            results.Add(ToDomain(entity));
        }
        return results;
    }

    public async Task<Service?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await Table.GetEntityAsync<ServiceTableEntity>(ServiceTableEntity.PartitionKeyValue, id, cancellationToken: cancellationToken);
            return ToDomain(response.Value);
        }
        catch (Azure.RequestFailedException ex) when (ex.Status == 404)
        {
            return null;
        }
    }

    public async Task<bool> AnyAsync(CancellationToken cancellationToken = default)
    {
        await foreach (var _ in Table.QueryAsync<ServiceTableEntity>(
            e => e.PartitionKey == ServiceTableEntity.PartitionKeyValue, maxPerPage: 1, cancellationToken: cancellationToken))
        {
            return true;
        }
        return false;
    }

    public async Task AddAsync(Service service, CancellationToken cancellationToken = default)
    {
        var entity = new ServiceTableEntity
        {
            RowKey = service.Id,
            Slug = service.Slug,
            Name = service.Name,
            ShortDescription = service.ShortDescription,
            DurationMinutes = service.DurationMinutes,
            IsActive = service.IsActive,
            DisplayOrder = service.DisplayOrder
        };
        await Table.AddEntityAsync(entity, cancellationToken);
    }

    private static Service ToDomain(ServiceTableEntity entity) => new()
    {
        Id = entity.RowKey,
        Slug = entity.Slug,
        Name = entity.Name,
        ShortDescription = entity.ShortDescription,
        DurationMinutes = entity.DurationMinutes,
        IsActive = entity.IsActive,
        DisplayOrder = entity.DisplayOrder
    };
}
