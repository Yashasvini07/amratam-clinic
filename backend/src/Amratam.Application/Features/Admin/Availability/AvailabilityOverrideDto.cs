namespace Amratam.Application.Features.Admin.Availability;

public record AvailabilityOverrideDto(Guid Id, DateOnly Date, bool IsClosed, TimeOnly? StartTime, TimeOnly? EndTime, string? Reason);
