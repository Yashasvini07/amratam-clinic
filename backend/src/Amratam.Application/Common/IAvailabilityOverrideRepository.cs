using Amratam.Domain.Entities;

namespace Amratam.Application.Common;

public interface IAvailabilityOverrideRepository
{
    Task<List<AvailabilityOverride>> GetByDateRangeAsync(DateOnly from, DateOnly to, CancellationToken cancellationToken = default);
    Task AddAsync(AvailabilityOverride entity, CancellationToken cancellationToken = default);

    /// <returns>False if no override with this id existed.</returns>
    Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}
