using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoSched_Service.Database;
using AutoSched_Service.Dtos.Request;
using AutoSched_Service.Dtos.Response;
using AutoSched_Service.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AutoSched_Service.Services
{
    public class AuthServices : IAuthServices
    {
        private readonly AppDbContext _appDbContext;
        private readonly IHttpContextAccessor _httpcontextAccessor;
        private readonly IConfiguration _configuration;

        public AuthServices(AppDbContext appDbContext, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _appDbContext = appDbContext;
            _configuration = configuration;
            _httpcontextAccessor = httpContextAccessor;
        }

        public async Task<TokenResponseDto?> LoginAsync(UserLoginRequestDto request)
        {
            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return null;
            }
            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password)
                == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return await CreateTokenResponse(user);
        }

        public async Task<User?> RegisterAsync(UserRegRequestDto request)
        {

            if (await _appDbContext.Users.AnyAsync(u => u.Username == request.Username))
            {
                return null;
            }

            var user = new User();

            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, request.Password);

            user.Username = request.Username;
            user.PasswordHash = hashedPassword;
            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;

            _appDbContext.Users.Add(user);
            await _appDbContext.SaveChangesAsync();

            return user;
        }

        public async Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request)
        {
            var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);
            if (user is null)
            {
                return null;
            }

            return await CreateTokenResponse(user);
        }

        private async Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken)
        {
            var user = await _appDbContext.Users.FindAsync(userId);
            if (user is null || user.RefreshToken != refreshToken
                || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                return null;
            }

            return user;
        }

        private async Task<TokenResponseDto> CreateTokenResponse(User user)
        {
            return new TokenResponseDto
            {
                Email = user.Email,
                Role = user.Role,
                Accesstoken = CreateToken(user),
                Refreshtoken = await GenerateAndSaveRefreshtokenAsync(user)
            };
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAndSaveRefreshtokenAsync(User user)
        {
            var refreshtoken = GenerateRefreshToken();
            user.RefreshToken = refreshtoken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _appDbContext.SaveChangesAsync();
            return refreshtoken;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Role,user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppSettings:Token")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("AppSettings:Issuer"),
                audience: _configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        public int? GetUserId()
        {
            var userIdString = _httpcontextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (int.TryParse(userIdString, out int userId))
            {
                return userId;
            }

            return 0;
        }

        public string GetUserRole()
        {
            return _httpcontextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Role) ?? "";
        }
    }
}
