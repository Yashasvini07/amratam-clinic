using Amratam.Domain.Entities;

namespace Amratam.Application.Common;

public interface IAvailabilityTemplateRepository
{
    Task<List<AvailabilityTemplate>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<AvailabilityTemplate?> GetByDayAsync(DayOfWeek dayOfWeek, CancellationToken cancellationToken = default);
    Task<bool> AnyAsync(CancellationToken cancellationToken = default);

    /// <summary>Replaces the entire weekly template in one go — small enough (max 7 rows) that a full replace is simpler than diffing.</summary>
    Task ReplaceAllAsync(IEnumerable<AvailabilityTemplate> templates, CancellationToken cancellationToken = default);
}
