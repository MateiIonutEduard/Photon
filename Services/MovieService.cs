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
            movie.Info.image_url = await GetMovieProfileAsync(movie.Id);
            return movie;
        }

        public async Task<List<Movie>?> GetMoviesAsync(SearchModel model, int? page)
        {
            int index = page != null ? page.Value : 1;

            if (model.title != null)
            {
                var title = model.title.ToLower();

                if (model.genres != null)
                {
                    return (from m in await moviesCollection.AsQueryable<Movie>().ToListAsync()
                              let filter = string.Join(' ', model!.genres)
                              where m!.Title.ToLower().Contains(title) && filter.Contains(string.Join(' ', m!.Info!.genres))
                              select m).ToList().Skip(8 * (index - 1))
                                .Take(8).ToList();
                }

                return (await moviesCollection.Find(m => m.Title.ToLower().Contains(title)).ToListAsync())
                    .Skip(8 * (index - 1)).Take(8).ToList();
            }
            else
            {
                if (model.genres != null)
                {
                    var filter = string.Join(' ', model.genres);

                    return moviesCollection.AsQueryable<Movie>().ToList()
                    .Where(m =>
                    {
                        if (m!.Info!.genres != null)
                        {
                            var newFilter = string.Join(' ', m!.Info!.genres);
                            return newFilter.Contains(filter);
                        }

                        return false;
                    }).Skip(8 * (index - 1)).Take(8).ToList();
                }
            }

            return null;
        }

        public async Task<List<Movie>?> FindMoviesAsync(SearchModel model, int? page)
        {
            var list = await GetMoviesAsync(model, page);
            if (list == null) list = new List<Movie>();

            foreach(var movie in list)
            {
                var image_url = await GetMovieProfileAsync(movie.Id);
                movie.Info.image_url = image_url;
            }

            return list;
        }

        public async Task<int> GetMoviesCountAsync(SearchModel model)
        {
            int count = 0;
            int pages = 0;

            if (model.title != null)
            {
                var title = model.title.ToLower();

                if (model.genres != null)
                {
                    count = (from m in await moviesCollection.AsQueryable<Movie>().ToListAsync()
                             let filter = string.Join(' ', model!.genres)
                             where m!.Title.ToLower().Contains(title) && filter.Contains(string.Join(' ', m!.Info!.genres))
                            select m).Count();
                }
                else
                {
                    count = (await moviesCollection.Find(m => m.Title.ToLower().Contains(title))
                        .ToListAsync()).Count();
                }
            }
            else
            {
                if (model.genres != null)
                {
                    var filter = string.Join(' ', model.genres);

                    count = moviesCollection.AsQueryable<Movie>().ToList()
                    .Where(m =>
                    {
                        if (m!.Info!.genres != null)
                        {
                            var newFilter = string.Join(' ', m!.Info!.genres);
                            return newFilter.Contains(filter);
                        }

                        return false;
                    }).Count();
                }
            }

            pages = count >> 3;
            if ((count & 0x7) != 0) pages++;
            return pages;
        }

        public async Task<List<Movie>?> GetMoviesAsync()
        {
            var movies = await moviesCollection.Find(_ => true).
                SortByDescending(m => m.Year).
                Limit(4)
                .ToListAsync();

            foreach (var movie in movies)
                movie.Info.image_url = await GetMovieProfileAsync(movie.Id);

            return movies;
        }

        public async Task<string> GetMovieProfileAsync(string id)
        {
            var movie = await moviesCollection.Find(m => m.Id == id)
                .FirstOrDefaultAsync();

            if(movie != null)
            {
                var img = movie.Info.image_url;

                if(!string.IsNullOrEmpty(img))
                {
                    var client = new HttpClient();
                    var res = await client.GetAsync(movie.Info.image_url);

                    if(res.IsSuccessStatusCode)
                        return movie.Info.image_url;
                }
            }

            return null;
        }

        public async Task DeleteMoviesAsync() =>
            await moviesCollection.DeleteManyAsync(_ => true);
        public async Task CreateMoviesAsync(Movie[]? movies) => 
            await moviesCollection.InsertManyAsync(movies);
    }
}
