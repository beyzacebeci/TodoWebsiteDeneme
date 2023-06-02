using System.Text.Json.Serialization;

namespace TodoWebsite.Models.EntityModels
{
    public class TodosEntity
    {
       
        public string id { get; set; } = string.Empty;

        public string topic { get; set; } = null!;

        public string description { get; set; } = string.Empty;
        public bool isChecked { get; set; } = false;
        public DateTime creationTime { get; set; } = DateTime.Now;
        public DateTime lastModifiedTime { get; set; } = DateTime.Now;


    }
}
