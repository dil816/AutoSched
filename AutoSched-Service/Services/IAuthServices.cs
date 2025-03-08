using AutoSched_Service.Dtos.Request;
using AutoSched_Service.Dtos.Response;
using AutoSched_Service.Models;

namespace AutoSched_Service.Services
{
    public interface IAuthServices
    {
        Task<User?> RegisterAsync(UserRegRequestDto request);
        Task<TokenResponseDto?> LoginAsync(UserLoginRequestDto request);
        Task<TokenResponseDto?> RefreshTokenAsync(RefreshTokenRequestDto request);
    }
}
