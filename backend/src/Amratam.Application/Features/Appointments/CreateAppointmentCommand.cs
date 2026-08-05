using System.Text.RegularExpressions;
using Amratam.Application.Common;
using Amratam.Domain.Entities;
using FluentValidation;
using MediatR;

namespace Amratam.Application.Features.Appointments;

public record CreateAppointmentCommand(
    string ServiceId,
    DateOnly AppointmentDate,
    TimeOnly StartTime,
    string PatientName,
    string PatientPhone,
    string? PatientEmail,
    string? Message) : IRequest<CreateAppointmentResult>;

public class CreateAppointmentCommandValidator : AbstractValidator<CreateAppointmentCommand>
{
    // Frontend sends "+91" + a 10-digit Indian mobile number (starting 6-9).
    private static readonly Regex IndiaMobile = new(@"^\+91[6-9]\d{9}$", RegexOptions.Compiled);

    public CreateAppointmentCommandValidator()
    {
        RuleFor(c => c.ServiceId).NotEmpty();
        RuleFor(c => c.PatientName).NotEmpty().MaximumLength(200);
        RuleFor(c => c.PatientPhone)
            .NotEmpty()
            .Matches(IndiaMobile).WithMessage("Phone number must be a valid 10-digit Indian mobile number.");
        RuleFor(c => c.PatientEmail).EmailAddress().When(c => !string.IsNullOrWhiteSpace(c.PatientEmail));
        RuleFor(c => c.Message).MaximumLength(1000);
        RuleFor(c => c.AppointmentDate)
            .GreaterThanOrEqualTo(_ => DateOnly.FromDateTime(DateTime.UtcNow.Date))
            .WithMessage("Appointment date cannot be in the past.");
    }
}

public class CreateAppointmentCommandHandler(
    IServiceRepository serviceRepository,
    IAvailabilityTemplateRepository templateRepository,
    IAvailabilityOverrideRepository overrideRepository,
    IAppointmentRepository appointmentRepository)
    : IRequestHandler<CreateAppointmentCommand, CreateAppointmentResult>
{
    public async Task<CreateAppointmentResult> Handle(CreateAppointmentCommand request, CancellationToken cancellationToken)
    {
        var service = await serviceRepository.GetByIdAsync(request.ServiceId, cancellationToken);
        if (service is null || !service.IsActive)
        {
            throw new NotFoundException($"Service '{request.ServiceId}' was not found.");
        }

        var template = await templateRepository.GetByDayAsync(request.AppointmentDate.DayOfWeek, cancellationToken);
        if (template is null || !template.IsActive)
        {
            throw new ConflictException("The clinic is not open on the selected date.");
        }

        var overridesForDate = (await overrideRepository.GetByDateRangeAsync(request.AppointmentDate, request.AppointmentDate, cancellationToken))
            .Where(o => o.Date == request.AppointmentDate)
            .ToList();

        var appointmentsForDate = await appointmentRepository.GetActiveByDateAsync(request.AppointmentDate, cancellationToken);

        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, overridesForDate, appointmentsForDate);
        var requestedSlot = slots.FirstOrDefault(s => s.StartTime == request.StartTime);

        if (requestedSlot is null || !requestedSlot.IsAvailable)
        {
            throw new ConflictException("The selected slot is no longer available.");
        }

        var appointment = new Appointment
        {
            ServiceId = service.Id,
            ServiceName = service.Name,
            AppointmentDate = request.AppointmentDate,
            StartTime = requestedSlot.StartTime,
            EndTime = requestedSlot.EndTime,
            PatientName = request.PatientName.Trim(),
            PatientPhone = request.PatientPhone.Trim(),
            PatientEmail = string.IsNullOrWhiteSpace(request.PatientEmail) ? null : request.PatientEmail.Trim(),
            Message = string.IsNullOrWhiteSpace(request.Message) ? null : request.Message.Trim(),
        };

        // CreateAsync atomically reserves the slot (insert-only on a PartitionKey=date/RowKey=time row);
        // it throws ConflictException itself if another booking grabbed the slot in the meantime.
        await appointmentRepository.CreateAsync(appointment, cancellationToken);

        return new CreateAppointmentResult(
            appointment.Id,
            appointment.Status.ToString(),
            appointment.AppointmentDate,
            appointment.StartTime,
            appointment.EndTime,
            service.Name);
    }
}
