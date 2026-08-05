namespace Amratam.Application.Features.Availability;

public record SlotDto(TimeOnly StartTime, TimeOnly EndTime, bool IsAvailable);

public record DayAvailabilityDto(DateOnly Date, List<SlotDto> Slots);
