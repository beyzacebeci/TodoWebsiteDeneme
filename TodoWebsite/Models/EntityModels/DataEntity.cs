using System.Text.Json.Serialization;

namespace TodoWebsite.Models.EntityModels
{
    public class DataEntity
    {
        //public string id { get; set; } = string.Empty;

   
        public List<ListeEntity> liste { get; set; } = new List<ListeEntity>();
    }
}
