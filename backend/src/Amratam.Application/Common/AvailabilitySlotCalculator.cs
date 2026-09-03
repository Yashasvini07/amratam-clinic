using Amratam.Domain.Entities;

namespace Amratam.Application.Common;

public record TimeSlot(TimeOnly StartTime, TimeOnly EndTime, bool IsAvailable);

public static class AvailabilitySlotCalculator
{
    /// <summary>
    /// Generates the day's slots from the weekly template, then marks slots unavailable
    /// where an override blocks them or an existing (non-cancelled) appointment holds them.
    /// </summary>
    public static IReadOnlyList<TimeSlot> GenerateSlotsForDate(
        AvailabilityTemplate? template,
        IReadOnlyCollection<AvailabilityOverride> overridesForDate,
        IReadOnlyCollection<Appointment> bookedAppointmentsForDate)
    {
        if (template is null || !template.IsActive)
        {
            return [];
        }

        var fullDayClosed = overridesForDate.Any(o => o.IsClosed);
        if (fullDayClosed)
        {
            return [];
        }

        var partialBlocks = overridesForDate
            .Where(o => !o.IsClosed && o.StartTime.HasValue && o.EndTime.HasValue)
            .Select(o => (Start: o.StartTime!.Value, End: o.EndTime!.Value))
            .ToList();

        var bookedStartTimes = bookedAppointmentsForDate
            .Select(a => a.StartTime)
            .ToHashSet();

        var slots = new List<TimeSlot>();
        var slotDuration = TimeSpan.FromMinutes(template.SlotDurationMinutes);
        var cursor = template.StartTime;

        while (cursor.Add(slotDuration) <= template.EndTime)
        {
            var slotEnd = cursor.Add(slotDuration);

            var blockedByOverride = partialBlocks.Any(b => cursor < b.End && slotEnd > b.Start);
            var blockedByBooking = bookedStartTimes.Contains(cursor);

            slots.Add(new TimeSlot(cursor, slotEnd, IsAvailable: !blockedByOverride && !blockedByBooking));

            cursor = slotEnd;
        }

        return slots;
    }
}
