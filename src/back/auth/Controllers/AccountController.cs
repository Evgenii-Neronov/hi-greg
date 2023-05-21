using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using Application.Models;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AccountController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
            _configuration = configuration;
        }

        [HttpPost("sign-up")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(User model)
        {
            if (ModelState.IsValid)
            {
                model.UserId = Guid.NewGuid();
                model.PasswordHash = _passwordHasher.HashPassword(model, model.PasswordHash);
                _context.Add(model);
                await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest(ModelState);
        }

        [HttpPost("sign-in")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(User model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user != null && _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.PasswordHash) ==
                    PasswordVerificationResult.Success)
                {
                    var (accessToken, refreshToken) = GenerateJwtTokens(user);
                    
                    user.RefreshToken = refreshToken;
                    await _context.SaveChangesAsync();

                    return new ObjectResult(new
                    {
                        accessToken = accessToken,
                        refreshToken = refreshToken
                    });
                }
                else
                {
                    ModelState.AddModelError("", "Invalid login attempt.");
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost("refresh-token")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken(string refreshToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
            if (user != null)
            {
                var (newAccessToken, newRefreshToken) = GenerateJwtTokens(user);
                
                user.RefreshToken = newRefreshToken;
                await _context.SaveChangesAsync();

                return new ObjectResult(new
                {
                    accessToken = newAccessToken,
                    refreshToken = newRefreshToken
                });
            }
            else
            {
                return Unauthorized();
            }
        }

        private (string, string) GenerateJwtTokens(User user)
        {
            var jwtKey = _configuration.GetValue<string>("JwtKey");
            var jwtExpireDays = _configuration.GetValue<int>("JwtExpireDays");
            var jwtIssuer = _configuration.GetValue<string>("JwtIssuer");
            
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
}