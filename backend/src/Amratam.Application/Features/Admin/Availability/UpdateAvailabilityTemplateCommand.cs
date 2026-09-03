using Amratam.Application.Common;
using FluentValidation;
using MediatR;
using DomainAvailabilityTemplate = Amratam.Domain.Entities.AvailabilityTemplate;

namespace Amratam.Application.Features.Admin.Availability;

public record UpdateAvailabilityTemplateCommand(List<AvailabilityTemplateItem> Items) : IRequest<List<AvailabilityTemplateDto>>;

public class UpdateAvailabilityTemplateCommandValidator : AbstractValidator<UpdateAvailabilityTemplateCommand>
{
    public UpdateAvailabilityTemplateCommandValidator()
    {
        RuleForEach(c => c.Items).ChildRules(item =>
        {
            item.RuleFor(i => i.EndTime).GreaterThan(i => i.StartTime);
            item.RuleFor(i => i.SlotDurationMinutes).GreaterThan(0);
        });
        RuleFor(c => c.Items.Select(i => i.DayOfWeek).Distinct().Count())
            .Equal(c => c.Items.Count)
            .WithMessage("Each day of week can only appear once.");
    }
}

public class UpdateAvailabilityTemplateCommandHandler(IAvailabilityTemplateRepository repository)
    : IRequestHandler<UpdateAvailabilityTemplateCommand, List<AvailabilityTemplateDto>>
{
    public async Task<List<AvailabilityTemplateDto>> Handle(UpdateAvailabilityTemplateCommand request, CancellationToken cancellationToken)
    {
        var updated = request.Items.Select(i => new DomainAvailabilityTemplate
        {
            DayOfWeek = i.DayOfWeek,
            StartTime = i.StartTime,
            EndTime = i.EndTime,
            SlotDurationMinutes = i.SlotDurationMinutes,
            IsActive = i.IsActive
        }).ToList();

        await repository.ReplaceAllAsync(updated, cancellationToken);

        return updated
            .OrderBy(t => t.DayOfWeek)
            .Select(t => new AvailabilityTemplateDto(t.DayOfWeek, t.StartTime, t.EndTime, t.SlotDurationMinutes, t.IsActive))
            .ToList();
    }
}
