using Amratam.Application.Common;
using Amratam.Application.Features.Appointments;
using Amratam.Domain.Entities;
using MediatR;

namespace Amratam.Application.Features.Admin.Appointments;

public record GetAdminAppointmentsQuery(
    AppointmentStatus? Status,
    DateOnly? From,
    DateOnly? To,
    int Page = 1,
    int PageSize = 50) : IRequest<PagedResult<AppointmentDto>>;

public record PagedResult<T>(List<T> Items, int TotalCount, int Page, int PageSize);

public class GetAdminAppointmentsQueryHandler(IAppointmentRepository repository)
    : IRequestHandler<GetAdminAppointmentsQuery, PagedResult<AppointmentDto>>
{
    // Table Storage has no server-side date range spanning "all time", so default the admin view
    // to a generous-but-bounded window when the caller doesn't specify one.
    private static readonly DateOnly DefaultFrom = DateOnly.FromDateTime(DateTime.UtcNow.Date.AddDays(-30));
    private static readonly DateOnly DefaultTo = DateOnly.FromDateTime(DateTime.UtcNow.Date.AddDays(90));

    public async Task<PagedResult<AppointmentDto>> Handle(GetAdminAppointmentsQuery request, CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 200);

        // No status filter -> default to what the doctor actually needs to act on.
        var statuses = request.Status is not null
            ? [request.Status.Value]
            : new[] { AppointmentStatus.Pending, AppointmentStatus.Confirmed };

        var (items, totalCount) = await repository.GetPagedAsync(
            statuses,
            request.From ?? DefaultFrom,
            request.To ?? DefaultTo,
            page,
            pageSize,
            cancellationToken);

        var dtos = items.Select(a => new AppointmentDto(
            a.Id,
            a.ServiceName,
            a.AppointmentDate,
            a.StartTime,
            a.EndTime,
            a.PatientName,
            a.PatientPhone,
            a.PatientEmail,
            a.Message,
            a.Status,
            a.CreatedAtUtc)).ToList();

        return new PagedResult<AppointmentDto>(dtos, totalCount, page, pageSize);
    }
}
