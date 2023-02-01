using Photon.Data;
using Photon.Models;

namespace Photon.Services
{
    public interface IMovieService
    {
        Task<List<MovieRecord>?> GetMoviesAsync();
        Task<MovieRecord?> GetMovieAsync(string id);
        Task UpdateIfExistsOrCreate(Movie[]? movies);
        Task<List<MovieRecord>?> GetMoviesAsync(SearchModel model, int? page);
        Task<List<MovieRecord>?> FindMoviesAsync(SearchModel model, int? page);
        Task<int> GetMoviesCountAsync(SearchModel model);
    }
}
