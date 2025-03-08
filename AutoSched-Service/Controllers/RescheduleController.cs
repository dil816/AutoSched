using AutoSched_Service.Database;
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
        public async Task<ActionResult<IEnumerable<Reschedule>>> GetAllReschedules()
        {

            return Ok(await _appDbContext.Reschedules.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reschedule>> GetRescheduleById(int id)
        {
            var Reschedule = await _appDbContext.Reschedules.FindAsync(id);
            if (Reschedule is null)
            {
                return NotFound();
            }
            return Ok(Reschedule);
        }

        [HttpPost]
        public async Task<ActionResult<Reschedule>> CreateReschdule(Reschedule request)
        {
            if (request is null)
            {
                return BadRequest();
            }
            _appDbContext.Reschedules.Add(request);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRescheduleById), new { id = request.Id }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReschdule(int id, Reschedule request)
        {
            var reschedule = await _appDbContext.Reschedules.FindAsync(id);
            if (reschedule is null)
            {
                return BadRequest();
            }

            reschedule.NewDate = request.NewDate;
            reschedule.Status = request.Status;
            reschedule.Reason = request.Reason;

            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReschdule(int id)
        {
            var reschedule = await _appDbContext.Reschedules.FindAsync(id);
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
