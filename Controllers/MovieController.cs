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

        [HttpPut("{page?}")]
        public async Task<IActionResult> GetMovies(int? page, [FromForm]bool? latest)
        {
            bool res = latest != null ? latest.Value : false;
            var movies = await movieService.GetAllMovies(page, res);

            var model = new MovieModel();
            if(movies != null) model.movies = movies.ToArray();

            if (page == null)
            {
                int count = await movieService.GetAllMoviesCountAsync(res);
                int pages = count >> 3;

                if ((count & 0x7) != 0) pages++;
                model.pages = pages;
                model.movies_count = count;
            }

            if (movies != null && movies.Count > 0) return Ok(model);
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> SearchMovies([FromQuery]int? page, [FromForm]SearchModel model)
        {
            var movies = await movieService.FindMoviesAsync(model, page);
            var res = new MovieModel();

            if (movies != null)
                res.movies = movies.ToArray();

            if (page == null)
            {
                int count = await movieService.GetMoviesCountAsync(model);
                res.pages = count;
            }

            if (movies != null) return Ok(res);
            return NotFound();
        }
    }
}
