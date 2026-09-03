using Amratam.Application.Features.Appointments;
using MediatR;

namespace Amratam.Api.Endpoints;

public static class AppointmentEndpoints
{
    public record CreateAppointmentRequest(
        string ServiceId,
        DateOnly AppointmentDate,
        TimeOnly StartTime,
        string PatientName,
        string PatientPhone,
        string? PatientEmail,
        string? Message);

    public static void MapAppointmentEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/appointments").WithTags("Appointments");

        group.MapPost("/", async (CreateAppointmentRequest request, ISender sender, CancellationToken ct) =>
        {
            var result = await sender.Send(new CreateAppointmentCommand(
                request.ServiceId,
                request.AppointmentDate,
                request.StartTime,
                request.PatientName,
                request.PatientPhone,
                request.PatientEmail,
                request.Message), ct);

            return Results.Created($"/api/v1/appointments/{result.Id}", result);
        });
    }
}
