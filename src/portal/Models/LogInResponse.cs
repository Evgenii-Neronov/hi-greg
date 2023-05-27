namespace auth.Models;

public record LogInResponse(Guid UserId, string AccessToken, string RefreshToken);
