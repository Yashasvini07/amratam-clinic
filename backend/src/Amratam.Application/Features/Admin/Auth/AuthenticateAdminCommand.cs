using Amratam.Application.Common;
using Amratam.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Amratam.Application.Features.Admin.Auth;

public record AuthenticateAdminCommand(string Username, string Password) : IRequest<AuthenticatedAdminResult>;

public record AuthenticatedAdminResult(string Username);

public class AuthenticateAdminCommandValidator : AbstractValidator<AuthenticateAdminCommand>
{
    public AuthenticateAdminCommandValidator()
    {
        RuleFor(c => c.Username).NotEmpty();
        RuleFor(c => c.Password).NotEmpty();
    }
}

public class AuthenticateAdminCommandHandler(IAdminUserRepository repository, PasswordHasher<AdminUser> hasher)
    : IRequestHandler<AuthenticateAdminCommand, AuthenticatedAdminResult>
{
    public async Task<AuthenticatedAdminResult> Handle(AuthenticateAdminCommand request, CancellationToken cancellationToken)
    {
        var user = await repository.GetByUsernameAsync(request.Username, cancellationToken);

        if (user is null)
        {
            throw new UnauthorizedAppException("Invalid username or password.");
        }

        var verification = hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (verification == PasswordVerificationResult.Failed)
        {
            throw new UnauthorizedAppException("Invalid username or password.");
        }

        user.LastLoginAtUtc = DateTime.UtcNow;
        await repository.UpdateAsync(user, cancellationToken);

        return new AuthenticatedAdminResult(user.Username);
    }
}
