using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Photon.Services;

namespace Photon.Controllers
{
    [Route("api/movie/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private IGenreService genreService;
        public GenreController(IGenreService genreService)
        { this.genreService = genreService; }

        [HttpGet]
        public async Task<IActionResult> AllGenres()
        {
            var genres = await genreService.AllGenres();
            if(genres != null) return Ok(genres);
            return NotFound();
        }
    }
}
