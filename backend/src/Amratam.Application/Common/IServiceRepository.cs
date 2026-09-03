using Amratam.Domain.Entities;

namespace Amratam.Application.Common;

public interface IServiceRepository
{
    Task<List<Service>> GetActiveAsync(CancellationToken cancellationToken = default);
    Task<Service?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task<bool> AnyAsync(CancellationToken cancellationToken = default);
    Task AddAsync(Service service, CancellationToken cancellationToken = default);
}
