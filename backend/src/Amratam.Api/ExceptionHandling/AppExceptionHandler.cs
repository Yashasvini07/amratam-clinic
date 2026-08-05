using Amratam.Application.Common;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Amratam.Api.ExceptionHandling;

public class AppExceptionHandler(ILogger<AppExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var (statusCode, title, detail) = exception switch
        {
            ValidationException ex => (StatusCodes.Status400BadRequest, "Validation failed", string.Join(" ", ex.Errors.Select(e => e.ErrorMessage))),
            NotFoundException ex => (StatusCodes.Status404NotFound, "Not found", ex.Message),
            ConflictException ex => (StatusCodes.Status409Conflict, "Conflict", ex.Message),
            UnauthorizedAppException ex => (StatusCodes.Status401Unauthorized, "Unauthorized", ex.Message),
            _ => (StatusCodes.Status500InternalServerError, "An unexpected error occurred", (string?)null)
        };

        if (statusCode == StatusCodes.Status500InternalServerError)
        {
            logger.LogError(exception, "Unhandled exception");
        }

        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = detail
        }, cancellationToken);

        return true;
    }
}
