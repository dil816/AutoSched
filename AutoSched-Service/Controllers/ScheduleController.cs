using AutoSched_Service.Database;
using AutoSched_Service.Dtos.Request;
using AutoSched_Service.Dtos.Response;
using AutoSched_Service.Models;
using AutoSched_Service.Services;
using Microsoft.AspNetCore.Authorization;
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
                    StartTime = s.StartTime,
                    EndTime = s.EndTime,
                    Presentation = s.Presentation != null ? new ScheduledPresentation
                    {
                        PresentationName = s.Presentation.Title
                    } : null,
                    Examinars = s.Users
                    .Where(s => s.Role == "2")
                    .Select(s => new ScheduledUsers
                    {
                        Id = s.RowId.ToString(),
                        UserName = s.Username
                    })
                    .ToList(),
                    Students = s.Users
                    .Where(s => s.Role == "3")
                    .Select(s => new ScheduledUsers
                    {
                        Id = s.RowId.ToString(),
                        UserName = s.Username
                    })
                    .ToList(),
                })
                .ToListAsync();

            return Ok(schedule);
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
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                PresentationId = request.PresentationId,
                Users = users
            };
            _appDbContext.Schedules.Add(schedule);
            await _appDbContext.SaveChangesAsync();
            return Ok();
        }

        //[HttpPut]
        //public Task<IActionResult> UpdateSchedule(int id, Schedule schedule)
        //{

        //}

        //[HttpDelete]
        //public Task DeleteSchedule(Schedule schedule)
        //{
        //}
    }
}
