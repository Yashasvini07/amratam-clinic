using Amratam.Application.Common;
using Amratam.Domain.Entities;
using Amratam.Infrastructure.Persistence.Entities;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Repositories;

public class TableAvailabilityOverrideRepository(TableServiceClient tableServiceClient) : IAvailabilityOverrideRepository
{
    private TableClient Table => tableServiceClient.GetTableClient(TableNames.AvailabilityOverrides);

    public async Task<List<AvailabilityOverride>> GetByDateRangeAsync(DateOnly from, DateOnly to, CancellationToken cancellationToken = default)
    {
        var results = new List<AvailabilityOverride>();

        for (var date = from; date <= to; date = date.AddDays(1))
        {
            var partitionKey = date.ToDateString();
            await foreach (var entity in Table.QueryAsync<AvailabilityOverrideTableEntity>(
                e => e.PartitionKey == partitionKey, cancellationToken: cancellationToken))
            {
                results.Add(ToDomain(entity));
            }
        }

        return results;
    }

    public async Task AddAsync(AvailabilityOverride entity, CancellationToken cancellationToken = default)
    {
        var tableEntity = new AvailabilityOverrideTableEntity
        {
            PartitionKey = entity.Date.ToDateString(),
            RowKey = entity.Id.ToString(),
            IsClosed = entity.IsClosed,
            StartTime = entity.StartTime?.ToTimeString(),
            EndTime = entity.EndTime?.ToTimeString(),
            Reason = entity.Reason
        };
        await Table.AddEntityAsync(tableEntity, cancellationToken);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var rowKey = id.ToString();
        await foreach (var entity in Table.QueryAsync<AvailabilityOverrideTableEntity>(
            e => e.RowKey == rowKey, cancellationToken: cancellationToken))
        {
            await Table.DeleteEntityAsync(entity.PartitionKey, entity.RowKey, cancellationToken: cancellationToken);
            return true;
        }
        return false;
    }

    private static AvailabilityOverride ToDomain(AvailabilityOverrideTableEntity entity) => new()
    {
        Id = Guid.Parse(entity.RowKey),
        Date = TableStorageFormats.ParseDate(entity.PartitionKey),
        IsClosed = entity.IsClosed,
        StartTime = entity.StartTime is null ? null : TableStorageFormats.ParseTime(entity.StartTime),
        EndTime = entity.EndTime is null ? null : TableStorageFormats.ParseTime(entity.EndTime),
        Reason = entity.Reason
    };
}
