using Amratam.Application.Common;
using Amratam.Domain.Entities;
using Amratam.Infrastructure.Persistence.Entities;
using Azure;
using Azure.Data.Tables;

namespace Amratam.Infrastructure.Persistence.Repositories;

public class TableAppointmentRepository(TableServiceClient tableServiceClient) : IAppointmentRepository
{
    private TableClient AppointmentsTable => tableServiceClient.GetTableClient(TableNames.Appointments);
    private TableClient SlotLocksTable => tableServiceClient.GetTableClient(TableNames.AppointmentSlotLocks);

    public async Task<List<Appointment>> GetActiveByDateAsync(DateOnly date, CancellationToken cancellationToken = default)
        => await GetActiveByDateRangeAsync(date, date, cancellationToken);

    public async Task<List<Appointment>> GetActiveByDateRangeAsync(DateOnly from, DateOnly to, CancellationToken cancellationToken = default)
    {
        var results = new List<Appointment>();

        foreach (var monthPartition in TableStorageFormats.MonthPartitionsBetween(from, to))
        {
            await foreach (var entity in AppointmentsTable.QueryAsync<AppointmentTableEntity>(
                e => e.PartitionKey == monthPartition, cancellationToken: cancellationToken))
            {
                var date = TableStorageFormats.ParseDate(entity.AppointmentDate);
                if (date < from || date > to || entity.Status == nameof(AppointmentStatus.Cancelled))
                {
                    continue;
                }
                results.Add(ToDomain(entity));
            }
        }

        return results;
    }

    public async Task CreateAsync(Appointment appointment, CancellationToken cancellationToken = default)
    {
        var slotLock = new AppointmentSlotLockTableEntity
        {
            PartitionKey = appointment.AppointmentDate.ToDateString(),
            RowKey = appointment.StartTime.ToSlotRowKey(),
            AppointmentId = appointment.Id.ToString()
        };

        try
        {
            await SlotLocksTable.AddEntityAsync(slotLock, cancellationToken);
        }
        catch (RequestFailedException ex) when (ex.Status == 409)
        {
            throw new ConflictException("The selected slot was just booked by someone else.");
        }

        var appointmentEntity = ToEntity(appointment);

        try
        {
            await AppointmentsTable.AddEntityAsync(appointmentEntity, cancellationToken);
        }
        catch
        {
            await SlotLocksTable.DeleteEntityAsync(slotLock.PartitionKey, slotLock.RowKey, cancellationToken: cancellationToken);
            throw;
        }
    }

    public async Task<(List<Appointment> Items, int TotalCount)> GetPagedAsync(
        IReadOnlyCollection<AppointmentStatus>? statuses,
        DateOnly from,
        DateOnly to,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        var statusNames = statuses?.Select(s => s.ToString()).ToHashSet();
        var matched = new List<Appointment>();

        foreach (var monthPartition in TableStorageFormats.MonthPartitionsBetween(from, to))
        {
            await foreach (var entity in AppointmentsTable.QueryAsync<AppointmentTableEntity>(
                e => e.PartitionKey == monthPartition, cancellationToken: cancellationToken))
            {
                var date = TableStorageFormats.ParseDate(entity.AppointmentDate);
                if (date < from || date > to)
                {
                    continue;
                }
                if (statusNames is not null && !statusNames.Contains(entity.Status))
                {
                    continue;
                }
                matched.Add(ToDomain(entity));
            }
        }

        var ordered = matched.OrderBy(a => a.AppointmentDate).ThenBy(a => a.StartTime).ToList();
        var pageItems = ordered.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        return (pageItems, ordered.Count);
    }

    public async Task<Appointment?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await FindEntityByIdAsync(id, cancellationToken);
        return entity is null ? null : ToDomain(entity);
    }

    public async Task UpdateStatusAsync(Guid id, AppointmentStatus status, CancellationToken cancellationToken = default)
    {
        var entity = await FindEntityByIdAsync(id, cancellationToken)
            ?? throw new NotFoundException($"Appointment {id} was not found.");

        entity.Status = status.ToString();
        entity.UpdatedAtUtc = DateTimeOffset.UtcNow;
        await AppointmentsTable.UpdateEntityAsync(entity, entity.ETag, TableUpdateMode.Replace, cancellationToken);

        if (status == AppointmentStatus.Cancelled)
        {
            var slotPartitionKey = entity.AppointmentDate;
            var slotRowKey = TableStorageFormats.ParseTime(entity.StartTime).ToSlotRowKey();
            try
            {
                await SlotLocksTable.DeleteEntityAsync(slotPartitionKey, slotRowKey, cancellationToken: cancellationToken);
            }
            catch (RequestFailedException ex) when (ex.Status == 404)
            {
                // Already gone - fine, the slot is free either way.
            }
        }
    }

    private async Task<AppointmentTableEntity?> FindEntityByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var rowKey = id.ToString();
        await foreach (var entity in AppointmentsTable.QueryAsync<AppointmentTableEntity>(
            e => e.RowKey == rowKey, cancellationToken: cancellationToken))
        {
            return entity;
        }
        return null;
    }

    private static AppointmentTableEntity ToEntity(Appointment appointment) => new()
    {
        PartitionKey = appointment.AppointmentDate.ToMonthPartition(),
        RowKey = appointment.Id.ToString(),
        ServiceId = appointment.ServiceId,
        ServiceName = appointment.ServiceName,
        AppointmentDate = appointment.AppointmentDate.ToDateString(),
        StartTime = appointment.StartTime.ToTimeString(),
        EndTime = appointment.EndTime.ToTimeString(),
        PatientName = appointment.PatientName,
        PatientPhone = appointment.PatientPhone,
        PatientEmail = appointment.PatientEmail,
        Message = appointment.Message,
        Status = appointment.Status.ToString(),
        CreatedAtUtc = appointment.CreatedAtUtc,
        UpdatedAtUtc = appointment.UpdatedAtUtc
    };

    private static Appointment ToDomain(AppointmentTableEntity entity) => new()
    {
        Id = Guid.Parse(entity.RowKey),
        ServiceId = entity.ServiceId,
        ServiceName = entity.ServiceName,
        AppointmentDate = TableStorageFormats.ParseDate(entity.AppointmentDate),
        StartTime = TableStorageFormats.ParseTime(entity.StartTime),
        EndTime = TableStorageFormats.ParseTime(entity.EndTime),
        PatientName = entity.PatientName,
        PatientPhone = entity.PatientPhone,
        PatientEmail = entity.PatientEmail,
        Message = entity.Message,
        Status = Enum.Parse<AppointmentStatus>(entity.Status),
        CreatedAtUtc = entity.CreatedAtUtc.UtcDateTime,
        UpdatedAtUtc = entity.UpdatedAtUtc.UtcDateTime
    };
}
