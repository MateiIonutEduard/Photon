using Photon.Models;

namespace Photon.Services
{
    public interface IGenreService
    {
        Task<List<GenreModel>> AllGenres();
    }
}
