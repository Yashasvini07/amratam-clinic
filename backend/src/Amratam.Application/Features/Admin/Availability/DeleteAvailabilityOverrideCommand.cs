using Amratam.Application.Common;
using MediatR;

namespace Amratam.Application.Features.Admin.Availability;

public record DeleteAvailabilityOverrideCommand(Guid Id) : IRequest;

public class DeleteAvailabilityOverrideCommandHandler(IAvailabilityOverrideRepository repository) : IRequestHandler<DeleteAvailabilityOverrideCommand>
{
    public async Task Handle(DeleteAvailabilityOverrideCommand request, CancellationToken cancellationToken)
    {
        var deleted = await repository.DeleteAsync(request.Id, cancellationToken);
        if (!deleted)
        {
            throw new NotFoundException($"Availability override {request.Id} was not found.");
        }
    }
}
