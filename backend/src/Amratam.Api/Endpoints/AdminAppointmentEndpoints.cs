using Amratam.Application.Features.Admin.Appointments;
using Amratam.Domain.Entities;
using MediatR;

namespace Amratam.Api.Endpoints;

public static class AdminAppointmentEndpoints
{
    public record UpdateStatusRequest(AppointmentStatus Status);

    public static void MapAdminAppointmentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/admin/appointments").WithTags("Admin Appointments").RequireAuthorization();

        group.MapGet("/", async (
            ISender sender,
            CancellationToken ct,
            AppointmentStatus? status = null,
            DateOnly? from = null,
            DateOnly? to = null,
            int page = 1,
            int pageSize = 50) =>
        {
            var result = await sender.Send(new GetAdminAppointmentsQuery(status, from, to, page, pageSize), ct);
            return Results.Ok(result);
        });

        group.MapPatch("/{id:guid}/status", async (Guid id, UpdateStatusRequest request, ISender sender, CancellationToken ct) =>
        {
            await sender.Send(new UpdateAppointmentStatusCommand(id, request.Status), ct);
            return Results.NoContent();
        });
    }
}
