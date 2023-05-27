namespace auth.Models;

public record SignUpResponse(Guid UserId, string AccessToken, string RefreshToken);