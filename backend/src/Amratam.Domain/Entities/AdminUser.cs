namespace Amratam.Domain.Entities;

public class AdminUser
{
    public required string Username { get; set; }
    public required string PasswordHash { get; set; }
    public DateTime? LastLoginAtUtc { get; set; }
}
