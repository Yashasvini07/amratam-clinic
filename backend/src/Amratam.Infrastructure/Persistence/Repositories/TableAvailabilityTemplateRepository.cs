using Amratam.Application.Common;
using Amratam.Domain.Entities;
using Amratam.Infrastructure.Persistence.Entities;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Repositories;

public class TableAvailabilityTemplateRepository(TableServiceClient tableServiceClient) : IAvailabilityTemplateRepository
{
    private TableClient Table => tableServiceClient.GetTableClient(TableNames.AvailabilityTemplates);

    public async Task<List<AvailabilityTemplate>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var results = new List<AvailabilityTemplate>();
        await foreach (var entity in Table.QueryAsync<AvailabilityTemplateTableEntity>(
            e => e.PartitionKey == AvailabilityTemplateTableEntity.PartitionKeyValue, cancellationToken: cancellationToken))
        {
            results.Add(ToDomain(entity));
        }
        return results;
    }

    public async Task<AvailabilityTemplate?> GetByDayAsync(DayOfWeek dayOfWeek, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await Table.GetEntityAsync<AvailabilityTemplateTableEntity>(
                AvailabilityTemplateTableEntity.PartitionKeyValue, dayOfWeek.ToString(), cancellationToken: cancellationToken);
            return ToDomain(response.Value);
        }
        catch (Azure.RequestFailedException ex) when (ex.Status == 404)
        {
            return null;
        }
    }

    public async Task<bool> AnyAsync(CancellationToken cancellationToken = default)
    {
        await foreach (var _ in Table.QueryAsync<AvailabilityTemplateTableEntity>(
            e => e.PartitionKey == AvailabilityTemplateTableEntity.PartitionKeyValue, maxPerPage: 1, cancellationToken: cancellationToken))
        {
            return true;
        }
        return false;
    }

    public async Task ReplaceAllAsync(IEnumerable<AvailabilityTemplate> templates, CancellationToken cancellationToken = default)
    {
        var existing = await GetAllAsync(cancellationToken);
        foreach (var entity in existing)
        {
            await Table.DeleteEntityAsync(AvailabilityTemplateTableEntity.PartitionKeyValue, entity.DayOfWeek.ToString(), cancellationToken: cancellationToken);
        }

        foreach (var template in templates)
        {
            var entity = new AvailabilityTemplateTableEntity
            {
                RowKey = template.DayOfWeek.ToString(),
                StartTime = template.StartTime.ToTimeString(),
                EndTime = template.EndTime.ToTimeString(),
                SlotDurationMinutes = template.SlotDurationMinutes,
                IsActive = template.IsActive
            };
            await Table.UpsertEntityAsync(entity, cancellationToken: cancellationToken);
        }
    }

    private static AvailabilityTemplate ToDomain(AvailabilityTemplateTableEntity entity) => new()
    {
        DayOfWeek = Enum.Parse<DayOfWeek>(entity.RowKey),
        StartTime = TableStorageFormats.ParseTime(entity.StartTime),
        EndTime = TableStorageFormats.ParseTime(entity.EndTime),
        SlotDurationMinutes = entity.SlotDurationMinutes,
        IsActive = entity.IsActive
    };
}
