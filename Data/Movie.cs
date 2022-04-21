using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Photon.Data
{
    public class Movie
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("year"), JsonPropertyName("year")]
        public int Year { get; set; }
        [BsonElement("title"), JsonPropertyName("title"), JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Title { get; set; }
        [BsonElement("info"), JsonPropertyName("info"), JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public MovieInfo? Info { get; set; }
    }
}
