using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Photon.Data;
using Photon.Models;
#pragma warning disable

namespace Photon.Services
{
    public class GenreService : IGenreService
    {
        private readonly IMongoCollection<Movie> moviesCollection;
        public GenreService(IOptions<MovieSettings> movieSettings)
        {
            var mongoClient = new MongoClient(movieSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(movieSettings.Value.DatabaseName);

            moviesCollection = mongoDatabase.GetCollection<Movie>(
                movieSettings.Value.MoviesCollectionName);
        }
        public async Task<List<GenreModel>> AllGenres()
        {
            var hash = new HashSet<string>();
            var list = new List<GenreModel>();

            var movies = await moviesCollection.Find(_ => true)
                .ToListAsync();

            foreach(var movie in movies)
            {
                if (movie.Info.genres == null) continue;

                foreach(var genre in movie.Info.genres)
                {
                    if(!hash.Contains(genre))
                    {
                        var type = new GenreModel();
                        type.name = genre;
                        list.Add(type);
                        hash.Add(genre);
                    }
                }
            }

            return list;
        }
    }
}
