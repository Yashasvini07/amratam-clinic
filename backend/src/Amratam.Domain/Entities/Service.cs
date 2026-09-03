namespace Amratam.Domain.Entities;

public class Service
{
    /// <summary>Same value as <see cref="Slug"/> — services are few and stable, so the slug doubles as the id.</summary>
    public required string Id { get; set; }
    public required string Slug { get; set; }
    public required string Name { get; set; }
    public string? ShortDescription { get; set; }
    public int DurationMinutes { get; set; } = 45;
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
}
