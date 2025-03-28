using AutoSched_Service.Database;
using AutoSched_Service.Dtos.Request;
using AutoSched_Service.Dtos.Response;
using AutoSched_Service.Models;
using AutoSched_Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSched_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IAuthServices _authServices;

        public ScheduleController(AppDbContext appDbContext, IAuthServices authServices)
        {
            _appDbContext = appDbContext;
            _authServices = authServices;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleResponseDto>>> GetSchedules()
        {
            var schedule = await _appDbContext.Schedules
                .Include(s => s.Users)
                .Include(s => s.Presentation)
                .AsNoTracking()
                .Select(s => new ScheduleResponseDto
                {
                    Id = s.Id,
                    Date = s.Date,
                    StartTime = s.StartTime,
                    EndTime = s.EndTime,
                    Description = s.Description,
                    Presentation = s.Presentation != null ? new ScheduledPresentation
                    {
                        Id = s.Id,
                        PresentationName = s.Presentation.Title,
                        Type = s.Presentation.Type
                    } : null,
                    Examinars = s.Users
                    .Where(u => u.Role == "2")
                    .Select(u => new ScheduledUsers
                    {
                        Id = u.RowId.ToString(),
                        UserName = u.Username
                    })
                    .ToList(),
                    Students = s.Users
                    .Where(u => u.Role == "3")
                    .Select(u => new ScheduledUsers
                    {
                        Id = u.RowId.ToString(),
                        UserName = u.Username
                    })
                    .ToList(),
                })
                .ToListAsync();

            return Ok(schedule);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleResponseDto>> GetScheduleById(int id)
        {
            var schedule = await _appDbContext.Schedules
                .Include(s => s.Users)
                .Include(s => s.Presentation)
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == id);

            if (schedule is null)
            {
                return NotFound();
            }

            ScheduleResponseDto response = new ScheduleResponseDto
            {
                Id = schedule.Id,
                Date = schedule.Date,
                StartTime = schedule.StartTime,
                EndTime = schedule.EndTime,
                Description = schedule.Description,
                Presentation = schedule.Presentation != null ? new ScheduledPresentation
                {
                    Id = schedule.Id,
                    PresentationName = schedule.Presentation.Title,
                    Type = schedule.Presentation.Type,
                } : null,
                Examinars = schedule.Users
                    .Where(u => u.Role == "2")
                    .Select(u => new ScheduledUsers
                    {
                        Id = u.RowId.ToString(),
                        UserName = u.Username
                    })
                    .ToList(),
                Students = schedule.Users
                    .Where(u => u.Role == "3")
                    .Select(u => new ScheduledUsers
                    {
                        Id = u.RowId.ToString(),
                        UserName = u.Username
                    })
                    .ToList(),
            };

            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSchedule(ScheduleRequestDto request)
        {
            if (request is null)
            {
                return BadRequest();
            }

            var presentation = await _appDbContext.Presentations
                .FindAsync(request.PresentationId);

            if (presentation is null)
            {
                return BadRequest();
            }

            var users = await _appDbContext.Users
                .Where(u => request.UserId.Contains(u.RowId.ToString()))
                .ToListAsync();

            if (users.Count != request.UserId.Count)
            {
                return BadRequest("some users not in db");
            }

            Schedule schedule = new Schedule
            {
                Date = request.Date,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Description = request.Description,
                PresentationId = request.PresentationId,
                Presentation = presentation,
                Users = users
            };
            _appDbContext.Schedules.Add(schedule);
            await _appDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSchedule(int id, ScheduleRequestDto request)
        {

            var schedule = await _appDbContext.Schedules
                .Include(s => s.Users)
                .Include(s => s.Presentation)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (schedule is null)
            {
                return NotFound();
            }

            var presentation = await _appDbContext.Presentations
                .FindAsync(request.PresentationId);

            if (presentation is null)
            {
                return BadRequest();
            }

            var users = await _appDbContext.Users
                .Where(u => request.UserId.Contains(u.RowId.ToString()))
                .ToListAsync();

            if (users.Count != request.UserId.Count)
            {
                return BadRequest("some users not in db");
            }

            schedule.Date = request.Date;
            schedule.StartTime = request.StartTime;
            schedule.EndTime = request.EndTime;
            schedule.Description = request.Description;
            schedule.PresentationId = request.PresentationId;
            schedule.Presentation = presentation;
            schedule.Users = users;

            await _appDbContext.SaveChangesAsync();

            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchedule(int id)
        {
            var schedule = await _appDbContext.Schedules
                .Include(s => s.Users)
                .Include(s => s.Presentation)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (schedule is null)
            {
                return NotFound();
            }
            _appDbContext.Schedules.Remove(schedule);
            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
