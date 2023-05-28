using auth.Helpers;
using auth.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using portal.Models;
using System.Security.Claims;
using portal.Models.Auth;

namespace Controllers
{
    [ApiController]
    [Route("api/auth/")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
            _configuration = configuration;
        }

        [HttpPost("sign-up")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(SignUpRequest request)
        {
            if (ModelState.IsValid)
            {

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user != null)
                    return Conflict("This email has already been used.");

                user = new User()
                {
                    Email = request.Email,
                    Surname = request.Surname,
                    Forename = request.Forename,
                    UserId = Guid.NewGuid()
                };

                var (accessToken, refreshToken) = user.GenerateJwtTokens(_configuration);
                user.RefreshToken = refreshToken;
                user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

                _context.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new SignUpResponse(user.UserId, accessToken, refreshToken));
            }

            return BadRequest(ModelState);
        }

        [HttpPost("sign-in")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LogInRequest request)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

                if (user == null)
                    return Conflict("User not found");

                var verifyResult = _passwordHasher
                    .VerifyHashedPassword(user,
                        user.PasswordHash,
                        request.Password);

                if (verifyResult != PasswordVerificationResult.Success)
                    return Conflict("Password invalid");

                var (accessToken, refreshToken) = user.GenerateJwtTokens(_configuration);

                user.RefreshToken = refreshToken;
                await _context.SaveChangesAsync();

                return Ok(new LogInResponse(user.UserId, accessToken, refreshToken));
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
                var (newAccessToken, newRefreshToken) = user.GenerateJwtTokens(_configuration);

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

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Me()
        {
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var user = _context.Users.Find(userId);

            if (user == null)
                return Conflict("User not found");

            return Ok(new MeResponse(user.Forename, user.Surname, user.Email));
        }
    }
}