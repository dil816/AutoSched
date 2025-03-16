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
    public class PresentationController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public PresentationController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PresentationResponseDto>>> GetPresentation()
        {
            //return Ok(await _appDbContext.Presentations.ToListAsync());
            var result = await _appDbContext.Presentations
                .AsNoTracking()
                .Select(p => new PresentationResponseDto
                {
                    Title = p.Title,
                    Description = p.Description,
                    Type = p.Type,
                    StartTime = p.StartTime,
                    EndTime = p.EndTime
                })
                .ToListAsync();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PresentationResponseDto>> GetPresentationById(int id)
        {
            var presentation = await _appDbContext.Presentations
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (presentation is null)
            {
                return NotFound();
            }

            PresentationResponseDto result = new PresentationResponseDto
            {
                Title = presentation.Title,
                Description = presentation.Description,
                Type = presentation.Type,
                StartTime = presentation.StartTime,
                EndTime = presentation.EndTime
            };

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<PresentationResponseDto>> CreatePresentation(PresentationRequestDto request)
        {
            if (request is null)
            {
                return BadRequest();
            }

            Presentation presentation = new Presentation
            {
                Title = request.Title,
                Description = request.Description,
                Type = request.Type,
                StartTime = request.StartTime,
                EndTime = request.EndTime
            };

            _appDbContext.Presentations.Add(presentation);
            await _appDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPresentationById), new { id = presentation.Id }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePresentation(int id, PresentationRequestDto request)
        {
            var presentation = await _appDbContext.Presentations.FindAsync(id);
            if (presentation is null)
            {
                return NotFound();
            }

            presentation.Title = request.Title;
            presentation.Type = request.Type;
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
