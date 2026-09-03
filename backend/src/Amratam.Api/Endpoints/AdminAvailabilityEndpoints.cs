using Amratam.Application.Features.Admin.Availability;
using MediatR;

namespace Amratam.Api.Endpoints;

public static class AdminAvailabilityEndpoints
{
    public static void MapAdminAvailabilityEndpoints(this IEndpointRouteBuilder app)
    {
        var templateGroup = app.MapGroup("/api/v1/admin/availability-template")
            .WithTags("Admin Availability")
            .RequireAuthorization();

        templateGroup.MapGet("/", async (ISender sender, CancellationToken ct) =>
            Results.Ok(await sender.Send(new GetAvailabilityTemplateQuery(), ct)));

        templateGroup.MapPut("/", async (List<AvailabilityTemplateItem> items, ISender sender, CancellationToken ct) =>
            Results.Ok(await sender.Send(new UpdateAvailabilityTemplateCommand(items), ct)));

        var overridesGroup = app.MapGroup("/api/v1/admin/availability-overrides")
            .WithTags("Admin Availability")
            .RequireAuthorization();

        overridesGroup.MapGet("/", async (DateOnly from, DateOnly to, ISender sender, CancellationToken ct) =>
            Results.Ok(await sender.Send(new GetAvailabilityOverridesQuery(from, to), ct)));

        overridesGroup.MapPost("/", async (CreateAvailabilityOverrideCommand command, ISender sender, CancellationToken ct) =>
        {
            var result = await sender.Send(command, ct);
            return Results.Created($"/api/v1/admin/availability-overrides/{result.Id}", result);
        });

        overridesGroup.MapDelete("/{id:guid}", async (Guid id, ISender sender, CancellationToken ct) =>
        {
            await sender.Send(new DeleteAvailabilityOverrideCommand(id), ct);
            return Results.NoContent();
        });
    }
}
