using Newtonsoft.Json;
using Photon.Services;
using System.IO;

namespace Photon.Data
{
    public class DataFlow
    {
        public static async Task Init(IServiceProvider serviceProvider)
        {
            var buffer = File.ReadAllText("moviedata.json");
            var movies = JsonConvert.DeserializeObject<Movie[]?>(buffer);
            var db = serviceProvider.GetRequiredService<IMovieService>();
            await db.UpdateIfExistsOrCreate(movies);
        }
    }
}
