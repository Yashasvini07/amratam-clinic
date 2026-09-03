using Amratam.Application.Common;
using Amratam.Domain.Entities;
using MediatR;

namespace Amratam.Application.Features.Admin.Appointments;

public record UpdateAppointmentStatusCommand(Guid Id, AppointmentStatus Status) : IRequest;

public class UpdateAppointmentStatusCommandHandler(IAppointmentRepository repository) : IRequestHandler<UpdateAppointmentStatusCommand>
{
    public async Task Handle(UpdateAppointmentStatusCommand request, CancellationToken cancellationToken)
    {
        var appointment = await repository.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new NotFoundException($"Appointment {request.Id} was not found.");

        await repository.UpdateStatusAsync(appointment.Id, request.Status, cancellationToken);
    }
}
