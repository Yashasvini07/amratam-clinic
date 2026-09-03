using Amratam.Application.Common;
using Amratam.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Amratam.Infrastructure.Persistence;

public static class TableStorageSeeder
{
    public static async Task SeedAsync(
        IServiceRepository services,
        IAvailabilityTemplateRepository templates,
        IAdminUserRepository adminUsers,
        IConfiguration configuration,
        ILogger logger,
        CancellationToken cancellationToken = default)
    {
        if (!await services.AnyAsync(cancellationToken))
        {
            await services.AddAsync(new Service
            {
                Id = "electrohomeopathy",
                Slug = "electrohomeopathy",
                Name = "Electrohomeopathy",
                ShortDescription = "A holistic approach to healing that uses natural remedies and therapies to support the body's innate healing abilities.",
                DurationMinutes = 45,
                DisplayOrder = 1
            }, cancellationToken);

            await services.AddAsync(new Service
            {
                Id = "bachflower",
                Slug = "bachflower",
                Name = "Bachflower",
                ShortDescription = "A natural and evidence-based approach to healthcare that focuses on prevention, wellness, and the body's ability to heal itself.",
                DurationMinutes = 45,
                DisplayOrder = 2
            }, cancellationToken);

            logger.LogInformation("Seeded services");
        }

        if (!await templates.AnyAsync(cancellationToken))
        {
            var weekdayTemplate = new (DayOfWeek Day, TimeOnly Start, TimeOnly End)[]
            {
                (DayOfWeek.Monday, new TimeOnly(12, 30), new TimeOnly(20, 0)),
                (DayOfWeek.Tuesday, new TimeOnly(12, 30), new TimeOnly(20, 0)),
                (DayOfWeek.Wednesday, new TimeOnly(12, 30), new TimeOnly(20, 0)),
                (DayOfWeek.Thursday, new TimeOnly(12, 30), new TimeOnly(20, 0)),
                (DayOfWeek.Friday, new TimeOnly(12, 30), new TimeOnly(20, 0)),
                (DayOfWeek.Saturday, new TimeOnly(12, 30), new TimeOnly(20, 0)),
            };

            await templates.ReplaceAllAsync(weekdayTemplate.Select(t => new AvailabilityTemplate
            {
                DayOfWeek = t.Day,
                StartTime = t.Start,
                EndTime = t.End,
                SlotDurationMinutes = 30
            }), cancellationToken);

            logger.LogInformation("Seeded weekly availability template (Mon-Sat, 12:30-20:00)");
        }

        if (!await adminUsers.AnyAsync(cancellationToken))
        {
            var username = configuration["Admin:Username"] ?? "admin";
            var initialPassword = configuration["Admin:InitialPassword"]
                ?? throw new InvalidOperationException("Admin:InitialPassword must be configured to seed the admin account.");

            var hasher = new PasswordHasher<AdminUser>();
            var adminUser = new AdminUser { Username = username, PasswordHash = string.Empty };
            adminUser.PasswordHash = hasher.HashPassword(adminUser, initialPassword);

            await adminUsers.AddAsync(adminUser, cancellationToken);
            logger.LogInformation("Seeded admin user {Username}", username);
        }
    }
}
