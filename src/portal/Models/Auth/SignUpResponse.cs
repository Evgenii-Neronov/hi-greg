namespace portal.Models.Auth;

public record SignUpResponse(Guid UserId, string AccessToken, string RefreshToken);