using Amratam.Application.Common;
using MediatR;

namespace Amratam.Application.Features.Admin.Availability;

public record GetAvailabilityOverridesQuery(DateOnly From, DateOnly To) : IRequest<List<AvailabilityOverrideDto>>;

public class GetAvailabilityOverridesQueryHandler(IAvailabilityOverrideRepository repository)
    : IRequestHandler<GetAvailabilityOverridesQuery, List<AvailabilityOverrideDto>>
{
    public async Task<List<AvailabilityOverrideDto>> Handle(GetAvailabilityOverridesQuery request, CancellationToken cancellationToken)
    {
        var overrides = await repository.GetByDateRangeAsync(request.From, request.To, cancellationToken);

        return overrides
            .OrderBy(o => o.Date)
            .Select(o => new AvailabilityOverrideDto(o.Id, o.Date, o.IsClosed, o.StartTime, o.EndTime, o.Reason))
            .ToList();
    }
}
