using Amratam.Application.Features.Services;
using MediatR;

namespace Amratam.Api.Endpoints;

public static class ServiceEndpoints
{
    public static void MapServiceEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/services").WithTags("Services");

        group.MapGet("/", async (ISender sender, CancellationToken ct) =>
            Results.Ok(await sender.Send(new GetServicesQuery(), ct)));
    }
}
