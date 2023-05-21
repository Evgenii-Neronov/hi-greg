using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Models;
using Microsoft.IdentityModel.Tokens;

namespace auth.Application.Helpers;

public static class JwtHelper
{
    public static (string, string) GenerateJwtTokens(this User user, IConfiguration configuration)
    {
        var jwtKey = configuration.GetValue<string>("JwtKey");
        var jwtExpireDays = configuration.GetValue<int>("JwtExpireDays");
        var jwtIssuer = configuration.GetValue<string>("JwtIssuer");

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
