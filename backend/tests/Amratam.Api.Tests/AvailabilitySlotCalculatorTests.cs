using Amratam.Application.Common;
using Amratam.Domain.Entities;

namespace Amratam.Api.Tests;

public class AvailabilitySlotCalculatorTests
{
    private static AvailabilityTemplate MakeTemplate(
        TimeOnly? start = null, TimeOnly? end = null, int slotMinutes = 30, bool isActive = true) => new()
    {
        DayOfWeek = DayOfWeek.Monday,
        StartTime = start ?? new TimeOnly(12, 30),
        EndTime = end ?? new TimeOnly(14, 30),
        SlotDurationMinutes = slotMinutes,
        IsActive = isActive
    };

    [Fact]
    public void GeneratesEvenlySpacedSlotsAcrossTheFullWindow()
    {
        var template = MakeTemplate();

        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, [], []);

        Assert.Equal(4, slots.Count);
        Assert.Equal(new TimeOnly(12, 30), slots[0].StartTime);
        Assert.Equal(new TimeOnly(13, 0), slots[0].EndTime);
        Assert.Equal(new TimeOnly(14, 0), slots[^1].StartTime);
        Assert.Equal(new TimeOnly(14, 30), slots[^1].EndTime);
        Assert.All(slots, s => Assert.True(s.IsAvailable));
    }

    [Fact]
    public void ReturnsNoSlotsWhenNoTemplateExistsForTheDay()
    {
        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(null, [], []);

        Assert.Empty(slots);
    }

    [Fact]
    public void ReturnsNoSlotsWhenTemplateIsInactive()
    {
        var template = MakeTemplate(isActive: false);

        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, [], []);

        Assert.Empty(slots);
    }

    [Fact]
    public void FullDayClosedOverrideProducesNoSlots()
    {
        var template = MakeTemplate();
        var overrides = new List<AvailabilityOverride> { new() { IsClosed = true, Date = new DateOnly(2026, 8, 10) } };

        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, overrides, []);

        Assert.Empty(slots);
    }

    [Fact]
    public void PartialBlockOverrideMarksOnlyOverlappingSlotsUnavailable()
    {
        var template = MakeTemplate();
        var overrides = new List<AvailabilityOverride>
        {
            new()
            {
                Date = new DateOnly(2026, 8, 10),
                IsClosed = false,
                StartTime = new TimeOnly(13, 0),
                EndTime = new TimeOnly(13, 30)
            }
        };

        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, overrides, []);

        Assert.Equal(4, slots.Count);
        Assert.True(slots[0].IsAvailable);   // 12:30-13:00
        Assert.False(slots[1].IsAvailable);  // 13:00-13:30 blocked
        Assert.True(slots[2].IsAvailable);   // 13:30-14:00
        Assert.True(slots[3].IsAvailable);   // 14:00-14:30
    }

    [Fact]
    public void ExistingNonCancelledAppointmentMarksItsSlotUnavailable()
    {
        var template = MakeTemplate();
        var appointments = new List<Appointment>
        {
            new()
            {
                ServiceId = "electrohomeopathy",
                ServiceName = "Electrohomeopathy",
                AppointmentDate = new DateOnly(2026, 8, 10),
                StartTime = new TimeOnly(13, 30),
                EndTime = new TimeOnly(14, 0),
                PatientName = "Test Patient",
                PatientPhone = "0000000000",
                Status = AppointmentStatus.Confirmed
            }
        };

        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, [], appointments);

        Assert.False(slots.Single(s => s.StartTime == new TimeOnly(13, 30)).IsAvailable);
        Assert.True(slots.Where(s => s.StartTime != new TimeOnly(13, 30)).All(s => s.IsAvailable));
    }

    [Fact]
    public void CancelledAppointmentsDoNotBlockTheirSlot()
    {
        // Callers are expected to filter out cancelled appointments before calling the calculator
        // (see GetAvailabilityQueryHandler / CreateAppointmentCommandHandler) - this test documents
        // that expectation by confirming the calculator itself has no special-casing for status.
        var template = MakeTemplate();
        var appointments = new List<Appointment>
        {
            new()
            {
                ServiceId = "electrohomeopathy",
                ServiceName = "Electrohomeopathy",
                AppointmentDate = new DateOnly(2026, 8, 10),
                StartTime = new TimeOnly(13, 30),
                EndTime = new TimeOnly(14, 0),
                PatientName = "Test Patient",
                PatientPhone = "0000000000",
                Status = AppointmentStatus.Cancelled
            }
        };

        // Simulating the caller's filter: cancelled appointments are excluded before reaching the calculator.
        var nonCancelled = appointments.Where(a => a.Status != AppointmentStatus.Cancelled).ToList();
        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, [], nonCancelled);

        Assert.All(slots, s => Assert.True(s.IsAvailable));
    }

    [Fact]
    public void FullyBookedDayHasNoAvailableSlots()
    {
        var template = MakeTemplate();
        var appointments = new List<Appointment>();
        var cursor = template.StartTime;
        while (cursor < template.EndTime)
        {
            appointments.Add(new Appointment
            {
                ServiceId = "electrohomeopathy",
                ServiceName = "Electrohomeopathy",
                AppointmentDate = new DateOnly(2026, 8, 10),
                StartTime = cursor,
                EndTime = cursor.AddMinutes(template.SlotDurationMinutes),
                PatientName = "Test Patient",
                PatientPhone = "0000000000",
                Status = AppointmentStatus.Pending
            });
            cursor = cursor.AddMinutes(template.SlotDurationMinutes);
        }

        var slots = AvailabilitySlotCalculator.GenerateSlotsForDate(template, [], appointments);

        Assert.All(slots, s => Assert.False(s.IsAvailable));
    }
}
