using AutoSched_Service.Database;
using AutoSched_Service.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSched_Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresentationController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public PresentationController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Presentation>>> GetPresentation()
        {
            return Ok(await _appDbContext.Presentations.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Presentation>> GetPresentationById(int id)
        {
            var presentation = await _appDbContext.Presentations.FindAsync(id);
            if (presentation is null)
            {
                return NotFound();
            }
            return Ok(presentation);
        }

        [HttpPost]
        public async Task<ActionResult<Presentation>> CreatePresentation(Presentation request)
        {
            if (request is null)
            {
                return BadRequest();
            }
            _appDbContext.Presentations.Add(request);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPresentationById), new { id = request.Id }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePresentation(int id, Presentation request)
        {
            var presentation = await _appDbContext.Presentations.FindAsync(id);
            if (presentation is null)
            {
                return NotFound();
            }

            presentation.Title = request.Title;
            presentation.Description = request.Description;
            presentation.StartTime = request.StartTime;
            presentation.EndTime = request.EndTime;

            await _appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVideoGame(int id)
        {
            var presentation = await _appDbContext.Presentations.FindAsync(id);
            if (presentation is null)
            {
                return NotFound();
            }
            _appDbContext.Presentations.Remove(presentation);
            await _appDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
