using Amratam.Application.Common;
using FluentValidation;
using MediatR;

namespace Amratam.Application.Features.Availability;

public record GetAvailabilityQuery(DateOnly From, DateOnly To) : IRequest<List<DayAvailabilityDto>>;

public class GetAvailabilityQueryValidator : AbstractValidator<GetAvailabilityQuery>
{
    public const int MaxRangeDays = 14;

    public GetAvailabilityQueryValidator()
    {
        RuleFor(q => q.To)
            .GreaterThanOrEqualTo(q => q.From)
            .WithMessage("'to' must not be before 'from'.");

        RuleFor(q => q)
            .Must(q => q.To.DayNumber - q.From.DayNumber < MaxRangeDays)
            .WithMessage($"Date range cannot exceed {MaxRangeDays} days.");
    }
}

public class GetAvailabilityQueryHandler(
    IAvailabilityTemplateRepository templateRepository,
    IAvailabilityOverrideRepository overrideRepository,
    IAppointmentRepository appointmentRepository)
    : IRequestHandler<GetAvailabilityQuery, List<DayAvailabilityDto>>
{
    public async Task<List<DayAvailabilityDto>> Handle(GetAvailabilityQuery request, CancellationToken cancellationToken)
    {
        var templates = await templateRepository.GetAllAsync(cancellationToken);
        var overrides = await overrideRepository.GetByDateRangeAsync(request.From, request.To, cancellationToken);
        var appointments = await appointmentRepository.GetActiveByDateRangeAsync(request.From, request.To, cancellationToken);

        var result = new List<DayAvailabilityDto>();

        for (var date = request.From; date <= request.To; date = date.AddDays(1))
        {
            var template = templates.FirstOrDefault(t => t.DayOfWeek == date.DayOfWeek && t.IsActive);
            var overridesForDate = overrides.Where(o => o.Date == date).ToList();
            var appointmentsForDate = appointments.Where(a => a.AppointmentDate == date).ToList();

            var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, overridesForDate, appointmentsForDate);

            result.Add(new DayAvailabilityDto(
                date,
                slots.Select(s => new SlotDto(s.StartTime, s.EndTime, s.IsAvailable)).ToList()));
        }

        return result;
    }
}
