using System.IO;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Newtonsoft.Json;
using Photon.Data;
using Photon.Models;
using Microsoft.Extensions.Options;
#pragma warning disable

namespace Photon.Services
{
    public class MovieService : IMovieService
    {
        private readonly IMongoCollection<Movie> moviesCollection;

        public MovieService(IOptions<MovieSettings> movieSettings)
        {
            var mongoClient = new MongoClient(movieSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(movieSettings.Value.DatabaseName);

            moviesCollection = mongoDatabase.GetCollection<Movie>(
                movieSettings.Value.MoviesCollectionName);
        }

        public async Task<Movie?> GetMovieAsync(string id) 
        {
            var movie = await moviesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return movie;
        }

        public async Task<List<Movie>?> GetMoviesAsync(SearchModel model)
        {
            if(model.title != null)
            {
                if(model.genres != null)
                {
                    var movies = (from m in await moviesCollection.AsQueryable<Movie>().ToListAsync()
                                  let filter = string.Join(' ', model!.genres)
                                  where m!.Title == model!.title && filter.Contains(string.Join(' ', m!.Info!.genres))
                                  select m).ToList();

                    return movies;
                }

                var all = await moviesCollection.Find(m => m.Title == model!.title).ToListAsync();
                return all;
            }
            else
            {
                if(model.genres != null)
                {
                    var filter = string.Join(' ', model.genres);

                    var list = moviesCollection.AsQueryable<Movie>().ToList()
                        .Where(m =>
                        {
                            if (m!.Info!.genres != null)
                            {
                                var newFilter = string.Join(' ', m!.Info!.genres);
                                return newFilter.Contains(filter);
                            }

                            return false;
                        }).ToList();

                    return list;
                }

                return null;
            }
        }

        public async Task<List<Movie>?> GetMoviesAsync()
        {
            var movies = await moviesCollection.Find(_ => true).
                SortByDescending(m => m.Year).
                Limit(4)
                .ToListAsync();

            return movies;
        }

        public async Task DeleteMoviesAsync() =>
            await moviesCollection.DeleteManyAsync(_ => true);
        public async Task CreateMoviesAsync(Movie[]? movies) => 
            await moviesCollection.InsertManyAsync(movies);
    }
}
