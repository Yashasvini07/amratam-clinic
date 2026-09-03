namespace Amratam.Infrastructure.Persistence;

internal static class TableNames
{
    public const string Services = "Services";
    public const string AvailabilityTemplates = "AvailabilityTemplates";
    public const string AvailabilityOverrides = "AvailabilityOverrides";
    public const string Appointments = "Appointments";
    public const string AppointmentSlotLocks = "AppointmentSlotLocks";
    public const string AdminUsers = "AdminUsers";

    public static readonly string[] All =
    [
        Services, AvailabilityTemplates, AvailabilityOverrides, Appointments, AppointmentSlotLocks, AdminUsers
    ];
}
