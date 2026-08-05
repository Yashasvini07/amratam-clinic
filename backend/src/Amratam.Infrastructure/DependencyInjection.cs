using Amratam.Application.Common;
using Amratam.Domain.Entities;
using Amratam.Infrastructure.Persistence.Repositories;
using Azure.Data.Tables;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Amratam.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("AzureTableStorage")
            ?? throw new InvalidOperationException("Connection string 'AzureTableStorage' is not configured.");

        services.AddSingleton(_ => new TableServiceClient(connectionString));

        services.AddScoped<IServiceRepository, TableServiceRepository>();
        services.AddScoped<IAvailabilityTemplateRepository, TableAvailabilityTemplateRepository>();
        services.AddScoped<IAvailabilityOverrideRepository, TableAvailabilityOverrideRepository>();
        services.AddScoped<IAppointmentRepository, TableAppointmentRepository>();
        services.AddScoped<IAdminUserRepository, TableAdminUserRepository>();

        services.AddScoped<PasswordHasher<AdminUser>>();

        return services;
    }
}
