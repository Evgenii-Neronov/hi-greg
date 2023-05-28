using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using auth.Models;
using Microsoft.IdentityModel.Tokens;

namespace auth.Helpers;

public static class JwtHelper
{
    public static (string, string) GenerateJwtTokens(this User user, IConfiguration configuration)
    {
        var jwtKey = /*Environment.GetEnvironmentVariable("AUTH_KEY") ??*/ "MySecretKey123!MySecretKey123!MySecretKey123!MySecretKey123!"; //!
        var jwtExpireDays =  7; // configuration.GetValue<int>("JwtExpireDays");
        var jwtIssuer = "https://get-greg.com"; // configuration.GetValue<string>("JwtIssuer");

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(jwtKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            }),
            Expires = DateTime.UtcNow.AddDays(jwtExpireDays),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = jwtIssuer
        };
        var accessToken = tokenHandler.CreateToken(tokenDescriptor);

        var refreshToken = Guid.NewGuid().ToString();
        return (tokenHandler.WriteToken(accessToken), refreshToken);
    }
}
