namespace Amratam.Application.Features.Admin.Availability;

public record AvailabilityTemplateDto(DayOfWeek DayOfWeek, TimeOnly StartTime, TimeOnly EndTime, int SlotDurationMinutes, bool IsActive);

public record AvailabilityTemplateItem(DayOfWeek DayOfWeek, TimeOnly StartTime, TimeOnly EndTime, int SlotDurationMinutes, bool IsActive);
