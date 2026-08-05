using Amratam.Domain.Entities;

namespace Amratam.Application.Common;

public interface IAdminUserRepository
{
    Task<AdminUser?> GetByUsernameAsync(string username, CancellationToken cancellationToken = default);
    Task<bool> AnyAsync(CancellationToken cancellationToken = default);
    Task AddAsync(AdminUser user, CancellationToken cancellationToken = default);
    Task UpdateAsync(AdminUser user, CancellationToken cancellationToken = default);
}
