using AutoSched_Service.Database;
using AutoSched_Service.Dtos.Request;
using AutoSched_Service.Dtos.Response;
using AutoSched_Service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSched_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RescheduleController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public RescheduleController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RescheduleResponseDto>>> GetAllReschedules()
        {

            var Reschedules = await _appDbContext.Reschedules
                .AsNoTracking()
                .Include(r => r.Presentation)
                .ToListAsync();

            List<RescheduleResponseDto> response = Reschedules.Select(reschedules => new RescheduleResponseDto
            {
                Id = reschedules.Id,
                NewDate = reschedules.NewDate,
                Reason = reschedules.Reason,
                Status = reschedules.Status,
                PresentationDetails = reschedules.Presentation != null ? new PresentationDetails
                {
                    Id = reschedules.Presentation.Id,
                    Title = reschedules.Presentation.Title,
                    Description = reschedules.Presentation.Description,
                    Type = reschedules.Presentation.Type,
                    StartTime = reschedules.Presentation.StartTime,
                    EndTime = reschedules.Presentation.EndTime
                } : null
            }).ToList();

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RescheduleResponseDto>> GetRescheduleById(int id)
        {
            var Reschedule = await _appDbContext.Reschedules
                .AsNoTracking()
                .Include(r => r.Presentation)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (Reschedule is null)
            {
                return NotFound();
            }

            RescheduleResponseDto response = new RescheduleResponseDto
            {
                Id = Reschedule.Id,
                NewDate = Reschedule.NewDate,
                Reason = Reschedule.Reason,
                Status = Reschedule.Status,
                PresentationDetails = Reschedule.Presentation != null ? new PresentationDetails
                {
                    Id = Reschedule.Presentation.Id,
                    Title = Reschedule.Presentation.Title,
                    Description = Reschedule.Presentation.Description,
                    Type = Reschedule.Presentation.Type,
                    StartTime = Reschedule.Presentation.StartTime,
                    EndTime = Reschedule.Presentation.EndTime
                } : null
            };

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<RescheduleResponseDto>> CreateReschdule(RescheduleRequestDto request)
        {
            if (request is null)
            {
                return BadRequest();
            }

            var exexistingReschedule = await _appDbContext.Reschedules
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.PresentationId == request.PresentationId);

            if (exexistingReschedule != null)
            {
                return BadRequest();
            }


            var Reschedule = new Reschedule
            {
                Id = request.Id,
                NewDate = request.NewDate,
                Reason = request.Reason,
                Status = request.Status,
                PresentationId = request.PresentationId,
            };
            _appDbContext.Reschedules.Add(Reschedule);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRescheduleById), new { id = Reschedule.Id }, Reschedule);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReschdule(int id, RescheduleRequestDto request)
        {
            var reschedule = await _appDbContext.Reschedules
                .Include(r => r.Presentation)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reschedule is null)
            {
                return BadRequest();
            }

            reschedule.NewDate = request.NewDate;
            reschedule.Status = request.Status;
            reschedule.Reason = request.Reason;
            reschedule.PresentationId = request.PresentationId;

            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReschdule(int id)
        {
            var reschedule = await _appDbContext.Reschedules
                .Include(r => r.Presentation)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (reschedule is null)
            {
                return BadRequest();
            }
            _appDbContext.Reschedules.Remove(reschedule);
            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
