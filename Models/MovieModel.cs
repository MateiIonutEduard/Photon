using Photon.Data;
using System.Text.Json.Serialization;
#pragma warning disable

namespace Photon.Models
{
    public class MovieModel
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public int? pages { get; set; }
        public Movie[]? movies { get; set; }
    }
}
