using Amratam.Application.Features.Availability;
using MediatR;

namespace Amratam.Api.Endpoints;

public static class AvailabilityEndpoints
{
    public static void MapAvailabilityEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/availability").WithTags("Availability");

        group.MapGet("/", async (DateOnly from, DateOnly to, ISender sender, CancellationToken ct) =>
            Results.Ok(await sender.Send(new GetAvailabilityQuery(from, to), ct)));
    }
}
