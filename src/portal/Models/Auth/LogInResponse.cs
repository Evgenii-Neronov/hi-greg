namespace portal.Models.Auth;

public record LogInResponse(Guid UserId, string AccessToken, string RefreshToken);