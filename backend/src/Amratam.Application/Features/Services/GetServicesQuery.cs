using Amratam.Application.Common;
using MediatR;

namespace Amratam.Application.Features.Services;

public record GetServicesQuery : IRequest<List<ServiceDto>>;

public class GetServicesQueryHandler(IServiceRepository repository) : IRequestHandler<GetServicesQuery, List<ServiceDto>>
{
    public async Task<List<ServiceDto>> Handle(GetServicesQuery request, CancellationToken cancellationToken)
    {
        var services = await repository.GetActiveAsync(cancellationToken);

        return services
            .OrderBy(s => s.DisplayOrder)
            .Select(s => new ServiceDto(s.Id, s.Slug, s.Name, s.ShortDescription, s.DurationMinutes))
            .ToList();
    }
}
