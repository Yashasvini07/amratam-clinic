using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using Amratam.Api.Endpoints;
using Amratam.Api.ExceptionHandling;
using Amratam.Api.HealthChecks;
using Amratam.Application;
using Amratam.Application.Common;
using Amratam.Infrastructure;
using Amratam.Infrastructure.Persistence;
using Azure.Data.Tables;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<AppExceptionHandler>();
builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddHealthChecks()
    .AddCheck<TableStorageHealthCheck>("table-storage");

var allowedOrigin = builder.Configuration["Cors:AllowedOrigin"]
    ?? throw new InvalidOperationException("Cors:AllowedOrigin must be configured.");

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy => policy
        .WithOrigins(allowedOrigin)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "amratam_admin";
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        // Frontend and API are separate hostnames (different App Services), so this cookie is
        // cross-site from the browser's perspective — SameSite=None (+ Secure, required alongside it)
        // is needed for it to be sent on cross-origin fetch() calls at all. Strict/Lax silently drop it.
        options.Cookie.SameSite = SameSiteMode.None;
        options.ExpireTimeSpan = TimeSpan.FromHours(8);
        options.SlidingExpiration = true;
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("AdminLogin", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueLimit = 0;
    });
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
});

var app = builder.Build();

// Ensure tables exist + seed reference data on startup.
using (var scope = app.Services.CreateScope())
{
    var tableServiceClient = scope.ServiceProvider.GetRequiredService<TableServiceClient>();
    await TableStorageInitializer.EnsureTablesExistAsync(tableServiceClient);

    var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("TableStorageSeeder");
    await TableStorageSeeder.SeedAsync(
        scope.ServiceProvider.GetRequiredService<IServiceRepository>(),
        scope.ServiceProvider.GetRequiredService<IAvailabilityTemplateRepository>(),
        scope.ServiceProvider.GetRequiredService<IAdminUserRepository>(),
        app.Configuration,
        logger);
}

// Middleware
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI();
}

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors("Frontend");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapHealthChecks("/health");

app.MapServiceEndpoints();
app.MapAvailabilityEndpoints();
app.MapAppointmentEndpoints();
app.MapAdminAuthEndpoints();
app.MapAdminAppointmentEndpoints();
app.MapAdminAvailabilityEndpoints();

app.Run();
