using Photon.Data;
using Photon.Models;

namespace Photon.Services
{
    public interface IMovieService
    {
        Task<List<Movie>?> GetMoviesAsync();
        Task<Movie?> GetMovieAsync(string id);
        Task CreateMoviesAsync(Movie[]? movies);
        Task<List<Movie>?> GetMoviesAsync(SearchModel model, int? page);
        Task<int> GetMoviesCountAsync(SearchModel model);
        Task DeleteMoviesAsync();
    }
}
