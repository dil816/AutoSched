using AutoSched_Service.Dtos.Request;
using AutoSched_Service.Dtos.Response;
using AutoSched_Service.Models;
using AutoSched_Service.Services;
using Microsoft.AspNetCore.Mvc;

namespace AutoSched_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthServices _authServices;

        public AuthController(IAuthServices authServices)
        {
            _authServices = authServices;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegRequestDto request)
        {
            var user = await _authServices.RegisterAsync(request);
            if (user is null)
            {
                return BadRequest();  //Email is Exists
            }
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto>> Login(UserLoginRequestDto request)
        {
            var result = await _authServices.LoginAsync(request);
            if (result is null)
            {
                return BadRequest(); //Invalid Password or Username"
            }
            return Ok(result);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto request)
        {
            var result = await _authServices.RefreshTokenAsync(request);
            if (result is null || result.Accesstoken is null || result.Refreshtoken is null)
            {
                return Unauthorized("Invalid refresh token");
            }

            return Ok(result);
        }
    }
}
