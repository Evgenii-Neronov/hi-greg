namespace portal.Models.Auth;

public record SignUpRequest(string Forename, string Surname, string Email, string Password);