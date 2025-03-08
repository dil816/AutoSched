using AutoSched_Service.Database;
using AutoSched_Service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSched_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvailabilityController : ControllerBase
    {

        private readonly AppDbContext _appDbContext;

        public AvailabilityController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExaminarAvailability>>> GetExaminarAvailability()
        {
            return Ok(await _appDbContext.ExaminarAvailabilities.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExaminarAvailability>> GetExaminarAvailabilityById(int id)
        {
            var availability = await _appDbContext.ExaminarAvailabilities.FindAsync(id);
            if (availability is null)
            {
                return NotFound();
            }
            return Ok(availability);
        }

        [HttpPost]
        public async Task<ActionResult<ExaminarAvailability>> CreateExaminarAvailability(ExaminarAvailability request)
        {
            if (request is null)
            {
                return BadRequest();
            }
            _appDbContext.ExaminarAvailabilities.Add(request);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetExaminarAvailability), new { id = request.Id }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExaminarAvailability(int id, ExaminarAvailability request)
        {
            var availability = await _appDbContext.ExaminarAvailabilities.FindAsync(id);
            if (availability is null)
            {
                return NotFound();
            }

            availability.StartTime = request.StartTime;
            availability.EndTime = request.EndTime;
            availability.IsAvailable = request.IsAvailable;

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExaminarAvailability(int id)
        {
            var availability = await _appDbContext.ExaminarAvailabilities.FindAsync(id);
            if (availability is null)
            {
                return NotFound();
            }
            _appDbContext.ExaminarAvailabilities.Remove(availability);
            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }

    }
}
