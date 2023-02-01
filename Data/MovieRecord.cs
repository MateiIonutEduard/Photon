using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace Photon.Data
{
    public class MovieRecord : Movie
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? FuzzyHash { get; set; }

        [BsonElement("CreatedAt"), JsonPropertyName("CreatedAt"), JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? CreatedAt { get; set; }

        [BsonElement("UpdatedAt"), JsonPropertyName("UpdatedAt"), JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? UpdatedAt { get; set; }
    }
}
