using System.Text.Json.Serialization;

namespace TodoWebsite.Models.EntityModels
{
    public class ListeEntity
    {
        public string? listId { get; set; }

        public List<TodosEntity> todos { get; set; } = new List<TodosEntity>();

        public string listName { get; set; } = "Bos baslık";
    }
}
