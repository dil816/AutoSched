using AutoSched_Service.Database;
using AutoSched_Service.Dtos.Request;
using AutoSched_Service.Dtos.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSched_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public UserController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetAllUsers()
        {

            var users = await _appDbContext.Users
                .AsNoTracking()
                .ToListAsync();

            List<UserResponseDto> response = users.Select(users => new UserResponseDto
            {
                RowId = users.RowId.ToString(),
                Username = users.Username,
                Role = users.Role,
                FirstName = users.FirstName,
                LastName = users.LastName,
                Email = users.Email,
            }).ToList();

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponseDto>> GetUserById(string id)
        {
            var user = await _appDbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.RowId == Guid.Parse(id));

            if (user is null)
            {
                return NotFound();
            }

            UserResponseDto response = new UserResponseDto
            {
                RowId = user.RowId.ToString(),
                Username = user.Username,
                Role = user.Role,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
            };

            return Ok(response);
        }

        //try use guid tryparseparse

        //[HttpPost]
        //public async Task<ActionResult<UserResponseDto>> CreateReschdule(RescheduleRequestDto request)
        //{
        //    if (request is null)
        //    {
        //        return BadRequest();
        //    }

        //    UserResponseDto user = new UserResponseDto
        //    {
        //         = request.Title,
        //        Description = request.Description,
        //        Type = request.Type,
        //        StartTime = request.StartTime,
        //        EndTime = request.EndTime
        //    };

        //    _appDbContext.Presentations.Add(presentation);
        //    await _appDbContext.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetPresentationById), new { id = presentation.Id }, request);
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, UserRequestDto request)
        {
            var user = await _appDbContext.Users
                .FirstOrDefaultAsync(r => r.RowId.ToString() == id);

            if (user is null)
            {
                return BadRequest();
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Username = request.Username;
            user.Role = request.Role;
            user.Email = request.Email;

            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _appDbContext.Users.
                Include(u => u.Schedules)
                .FirstOrDefaultAsync(r => r.RowId.ToString() == id);

            if (user is null)
            {
                return BadRequest();
            }
            _appDbContext.Users.Remove(user);
            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
