using AutoSched_Service.Database;
using AutoSched_Service.Dtos.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSched_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public DashboardController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet("ScheduleSummary")]
        public async Task<ActionResult<IEnumerable<ScheduleSummaryResponseDto>>> GetScheduleSummary()
        {
            var schedule = await _appDbContext.Schedules
                .Select(s => s.Date.ToString("ddd"))
                .ToListAsync();

            var schedulelist = schedule
                .GroupBy(s => s)
                .Select(s => new ScheduleSummary
                {
                    Date = s.Key,
                    Count = s.Count()
                }
                )
                .ToList();

            return Ok(schedulelist);
        }

        [HttpGet("DashboarCountdwidget")]
        public ActionResult<DashboardCountWidgetResponseDto> GetDashboardwidget()
        {


            var response = new DashboardCountWidgetResponseDto
            {
                UsersCount = _appDbContext.Users.Count(),
                AvailabilityCount = _appDbContext.ExaminarAvailabilities.Count(),
                ScheduleCount = _appDbContext.Schedules.Count(),
                PresentationCount = _appDbContext.Presentations.Count(),
            };

            return Ok(response);
        }

    }
}
