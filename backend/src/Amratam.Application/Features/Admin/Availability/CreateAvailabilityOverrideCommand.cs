using Amratam.Application.Common;
using FluentValidation;
using MediatR;
using DomainAvailabilityOverride = Amratam.Domain.Entities.AvailabilityOverride;

namespace Amratam.Application.Features.Admin.Availability;

public record CreateAvailabilityOverrideCommand(
    DateOnly Date,
    bool IsClosed,
    TimeOnly? StartTime,
    TimeOnly? EndTime,
    string? Reason) : IRequest<AvailabilityOverrideDto>;

public class CreateAvailabilityOverrideCommandValidator : AbstractValidator<CreateAvailabilityOverrideCommand>
{
    public CreateAvailabilityOverrideCommandValidator()
    {
        RuleFor(c => c.Reason).MaximumLength(500);
        RuleFor(c => c)
            .Must(c => c.IsClosed || (c.StartTime.HasValue && c.EndTime.HasValue && c.EndTime > c.StartTime))
            .WithMessage("Either mark the day fully closed, or provide a valid start/end time range.");
    }
}

public class CreateAvailabilityOverrideCommandHandler(IAvailabilityOverrideRepository repository)
    : IRequestHandler<CreateAvailabilityOverrideCommand, AvailabilityOverrideDto>
{
    public async Task<AvailabilityOverrideDto> Handle(CreateAvailabilityOverrideCommand request, CancellationToken cancellationToken)
    {
        var entity = new DomainAvailabilityOverride
        {
            Date = request.Date,
            IsClosed = request.IsClosed,
            StartTime = request.IsClosed ? null : request.StartTime,
            EndTime = request.IsClosed ? null : request.EndTime,
            Reason = request.Reason
        };

        await repository.AddAsync(entity, cancellationToken);

        return new AvailabilityOverrideDto(entity.Id, entity.Date, entity.IsClosed, entity.StartTime, entity.EndTime, entity.Reason);
    }
}
