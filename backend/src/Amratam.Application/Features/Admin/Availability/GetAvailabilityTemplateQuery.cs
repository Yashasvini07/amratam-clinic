using Amratam.Application.Common;
using MediatR;

namespace Amratam.Application.Features.Admin.Availability;

public record GetAvailabilityTemplateQuery : IRequest<List<AvailabilityTemplateDto>>;

public class GetAvailabilityTemplateQueryHandler(IAvailabilityTemplateRepository repository)
    : IRequestHandler<GetAvailabilityTemplateQuery, List<AvailabilityTemplateDto>>
{
    public async Task<List<AvailabilityTemplateDto>> Handle(GetAvailabilityTemplateQuery request, CancellationToken cancellationToken)
    {
        var templates = await repository.GetAllAsync(cancellationToken);

        return templates
            .OrderBy(t => t.DayOfWeek)
            .Select(t => new AvailabilityTemplateDto(t.DayOfWeek, t.StartTime, t.EndTime, t.SlotDurationMinutes, t.IsActive))
            .ToList();
    }
}
