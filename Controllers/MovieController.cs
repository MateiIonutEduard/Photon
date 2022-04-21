using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Photon.Models;
using Photon.Services;

namespace Photon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        readonly IMovieService movieService;
        public MovieController(IMovieService movieService)
        { this.movieService = movieService; }

        [HttpGet("{id?}")]
        public async Task<IActionResult> GetMovies(string? id)
        {
            if(id != null)
            {
                var movie = await movieService.GetMovieAsync(id);
                return Ok(movie);
            }
            else
            {
                var movies = await movieService.GetMoviesAsync();
                return Ok(movies);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SearchMovies([FromForm]SearchModel model)
        {
            var movies = await movieService.GetMoviesAsync(model);
            if (movies != null) return Ok(movies);
            return NotFound();
        }
    }
}
