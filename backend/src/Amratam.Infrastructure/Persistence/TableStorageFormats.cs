using System.Globalization;

namespace Amratam.Infrastructure.Persistence;

/// <summary>Table Storage properties don't support TimeOnly/DateOnly natively, so we round-trip them as strings.</summary>
internal static class TableStorageFormats
{
    private const string TimeFormat = "HH:mm:ss";
    private const string DateFormat = "yyyy-MM-dd";
    private const string MonthFormat = "yyyy-MM";
    private const string SlotRowKeyFormat = "HHmm";

    public static string ToTimeString(this TimeOnly time) => time.ToString(TimeFormat, CultureInfo.InvariantCulture);
    public static TimeOnly ParseTime(string value) => TimeOnly.ParseExact(value, TimeFormat, CultureInfo.InvariantCulture);

    public static string ToDateString(this DateOnly date) => date.ToString(DateFormat, CultureInfo.InvariantCulture);
    public static DateOnly ParseDate(string value) => DateOnly.ParseExact(value, DateFormat, CultureInfo.InvariantCulture);

    public static string ToMonthPartition(this DateOnly date) => date.ToString(MonthFormat, CultureInfo.InvariantCulture);

    public static string ToSlotRowKey(this TimeOnly time) => time.ToString(SlotRowKeyFormat, CultureInfo.InvariantCulture);

    public static IEnumerable<string> MonthPartitionsBetween(DateOnly from, DateOnly to)
    {
        var cursor = new DateOnly(from.Year, from.Month, 1);
        var end = new DateOnly(to.Year, to.Month, 1);

        while (cursor <= end)
        {
            yield return cursor.ToMonthPartition();
            cursor = cursor.AddMonths(1);
        }
    }
}
