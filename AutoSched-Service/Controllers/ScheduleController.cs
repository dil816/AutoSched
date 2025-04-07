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
            List<ScheduleResponseDto> response = [];

            if (_authServices.GetUserRole().Equals("1"))
            {
                //for admin related schdule list
                response = await _appDbContext.Schedules
                    .AsNoTracking()
                    .AsSplitQuery()
                    .Include(s => s.Users)
                    .Include(s => s.Presentation)
                    .Select(s => new ScheduleResponseDto
                    {
                        Id = s.Id,
                        Date = s.Date,
                        StartTime = s.StartTime,
                        EndTime = s.EndTime,
                        Description = s.Description,
                        Presentation = s.Presentation != null ? new ScheduledPresentation
                        {
                            Id = s.Presentation.Id,
                            PresentationName = s.Presentation.Title,
                            Type = s.Presentation.Type
                        } : null,
                        Examiners = s.Users
                        .Where(u => u.Role == "2")
                        .Select(u => new ScheduledUsers
                        {
                            Id = u.RowId.ToString(),
                            UserName = u.Username,
                            Email = u.Email
                        })
                        .ToList(),
                        Students = s.Users
                        .Where(u => u.Role == "3")
                        .Select(u => new ScheduledUsers
                        {
                            Id = u.RowId.ToString(),
                            UserName = u.Username,
                            Email = u.Email
                        })
                        .ToList(),
                    })
                    .ToListAsync();
            }
            else
            {
                //for user related schdule list
                var userScheduleIdList = await _appDbContext.Users
                    .AsNoTracking()
                    .Where(u => u.Id == _authServices.GetUserId())
                    .Include(u => u.Schedules)
                    .SelectMany(u => u.Schedules)
                    .Select(s => s.Id)
                    .ToListAsync();

                if (userScheduleIdList is null)
                {
                    return NotFound();
                }

                response = await _appDbContext.Schedules
                 .AsNoTracking()
                 .AsSplitQuery()
                 .Include(s => s.Users)
                 .Include(s => s.Presentation)
                 .Where(u => userScheduleIdList.Contains(u.Id))
                 .Select(s => new ScheduleResponseDto
                 {
                     Id = s.Id,
                     Date = s.Date,
                     StartTime = s.StartTime,
                     EndTime = s.EndTime,
                     Description = s.Description,
                     Presentation = s.Presentation != null ? new ScheduledPresentation
                     {
                         Id = s.Presentation.Id,
                         PresentationName = s.Presentation.Title,
                         Type = s.Presentation.Type
                     } : null,
                     Examiners = s.Users
                     .Where(u => u.Role == "2")
                     .Select(u => new ScheduledUsers
                     {
                         Id = u.RowId.ToString(),
                         UserName = u.Username,
                         Email = u.Email
                     })
                     .ToList(),
                     Students = s.Users
                     .Where(u => u.Role == "3")
                     .Select(u => new ScheduledUsers
                     {
                         Id = u.RowId.ToString(),
                         UserName = u.Username,
                         Email = u.Email
                     })
                     .ToList(),
                 })
                 .ToListAsync();
            }

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleResponseDto>> GetScheduleById(int id)
        {
            var schedule = await _appDbContext.Schedules
                .AsNoTracking()
                .Include(s => s.Users)
                .Include(s => s.Presentation)
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
                Examiners = schedule.Users
                    .Where(u => u.Role == "2")
                    .Select(u => new ScheduledUsers
                    {
                        Id = u.RowId.ToString(),
                        UserName = u.Username,
                        Email = u.Email
                    })
                    .ToList(),
                Students = schedule.Users
                    .Where(u => u.Role == "3")
                    .Select(u => new ScheduledUsers
                    {
                        Id = u.RowId.ToString(),
                        UserName = u.Username,
                        Email = u.Email
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

            Schedule schedule = new Schedule
            {
                Date = request.Date,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Description = request.Description,
                PresentationId = request.PresentationId,
                Presentation = presentation,
            };
            _appDbContext.Schedules.Add(schedule);
            await _appDbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("AssignScheduleToUser")]
        public async Task<IActionResult> AssignScheduleToUser(AssignScheduleToUserRequestDto request)
        {
            var schedule = await _appDbContext.Schedules
                .Include(s => s.Users)
                .Include(s => s.Presentation)
                .FirstOrDefaultAsync(s => s.Id == request.ScheduleId);

            if (schedule is null)
            {
                return NotFound();
            }

            var users = await _appDbContext.Users           //check requset usrs in db
                .Where(u => request.UserId.Contains(u.RowId.ToString()))
                .ToListAsync();

            if (users.Count != request.UserId.Count)
            {
                return BadRequest("some users not in db");
            }

            var existingScheduleUsersId = schedule.Users   //get existing users list in this requested schedule
                .Select(u => u.RowId.ToString())
                .ToList();

            var newUsersId = request.UserId    // Actual users to add
                .Except(existingScheduleUsersId)
                .ToList();

            if (newUsersId.Count == 0)
            {
                return NoContent();
            }

            var newUsersToAdd = users
                .Where(u => newUsersId.Contains(u.RowId.ToString()))
                .ToList();

            foreach (var item in newUsersToAdd)
            {
                schedule.Users.Add(item);
            }

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("UnAssignScheduleToUser")]
        public async Task<IActionResult> UnAssignScheduleToUser(UnAssignScheduleToUserRequestDto request)
        {
            var schedule = await _appDbContext.Schedules
                .Include(s => s.Users)
                .Include(s => s.Presentation)
                .FirstOrDefaultAsync(s => s.Id == request.ScheduleId);

            if (schedule is null)
            {
                return NotFound();
            }

            var users = await _appDbContext.Users           //check requset usrs to unassign in db
                .Where(u => request.UserId.Contains(u.RowId.ToString()))
                .ToListAsync();

            if (users.Count != request.UserId.Count)
            {
                return BadRequest("some users not in db");
            }

            foreach (var item in users)
            {
                schedule.Users.Remove(item);
            }

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("GetUserListToAssignSchedule")]
        public async Task<ActionResult<GetUserListToAssignScheduleResponseDto>> GetUserListToAssignSchedule(GetUserListToAssignScheduleRequestDto request)
        {
            GetUserListToAssignScheduleResponseDto response = new();

            var currentAssignedUsers = await _appDbContext.Schedules
                .AsNoTracking()
                .Include(s => s.Users)
                .Where(s => s.Id == request.ScheduleId)
                .SelectMany(s => s.Users)
                .Select(u => u.Id)
                .ToListAsync();

            if (currentAssignedUsers is null)
            {
                return NotFound();
            }

            var notAssignedUsersList = await _appDbContext.Users
                .AsNoTracking()
                .Where(u => !currentAssignedUsers.Contains(u.Id) && u.Role != "1")
                .Select(u => new UserDto
                {
                    Id = u.RowId.ToString("D"),
                    Email = u.Email,
                    Username = u.Username,
                    Role = u.Role,
                })
                .ToListAsync();

            foreach (var user in notAssignedUsersList)
            {
                if (user.Role == "2")
                {
                    response.ExaminerList.Add(new UserDetails
                    {
                        UserId = user.Id,
                        UserEmail = user.Email,
                        UserName = user.Username
                    });
                }
                else if (user.Role == "3")
                {
                    response.StudentList.Add(new UserDetails
                    {
                        UserId = user.Id,
                        UserEmail = user.Email,
                        UserName = user.Username
                    });
                }
            }

            return Ok(response);
        }

        [HttpPost("GetUserListToUnAssignSchedule")]
        public async Task<ActionResult<GetUserListToUnAssignScheduleResponseDto>> GetUserListToAssignSchedule(GetUserListToUnAssignScheduleRequestDto request)
        {
            GetUserListToUnAssignScheduleResponseDto response = new();

            var AssignedUsers = await _appDbContext.Schedules
                .AsNoTracking()
                .Include(s => s.Users)
                .Where(s => s.Id == request.ScheduleId)
                .SelectMany(s => s.Users)
                .Select(u => new UserDto
                {
                    Id = u.RowId.ToString("D"),
                    Email = u.Email,
                    Username = u.Username,
                    Role = u.Role,
                })
                .ToListAsync();

            if (AssignedUsers is null)
            {
                return NotFound();
            }

            foreach (var user in AssignedUsers)
            {
                if (user.Role == "2")
                {
                    response.ExaminerList.Add(new UserDetails
                    {
                        UserId = user.Id,
                        UserEmail = user.Email,
                        UserName = user.Username
                    });
                }
                else if (user.Role == "3")
                {
                    response.StudentList.Add(new UserDetails
                    {
                        UserId = user.Id,
                        UserEmail = user.Email,
                        UserName = user.Username
                    });
                }
            }

            return Ok(response);
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

            schedule.Date = request.Date;
            schedule.StartTime = request.StartTime;
            schedule.EndTime = request.EndTime;
            schedule.Description = request.Description;
            schedule.PresentationId = request.PresentationId;
            schedule.Presentation = presentation;

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
