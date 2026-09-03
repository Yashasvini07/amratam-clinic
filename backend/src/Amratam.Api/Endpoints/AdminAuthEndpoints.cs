using System.Security.Claims;
using Amratam.Application.Features.Admin.Auth;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.RateLimiting;

namespace Amratam.Api.Endpoints;

public static class AdminAuthEndpoints
{
    public record LoginRequest(string Username, string Password);

    public static void MapAdminAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/admin").WithTags("Admin Auth");

        group.MapPost("/login", async (LoginRequest request, ISender sender, HttpContext httpContext, CancellationToken ct) =>
        {
            var result = await sender.Send(new AuthenticateAdminCommand(request.Username, request.Password), ct);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, result.Username),
                new(ClaimTypes.Name, result.Username)
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

            return Results.Ok(new { result.Username });
        }).RequireRateLimiting("AdminLogin");

        group.MapPost("/logout", async (HttpContext httpContext) =>
        {
            await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Results.Ok();
        }).RequireAuthorization();

        group.MapGet("/me", (ClaimsPrincipal user) =>
            Results.Ok(new { Username = user.Identity!.Name })
        ).RequireAuthorization();
    }
}
