namespace TodoWebsite.Models.EntityModels
{
    public class NoteEntity
    {

        public string? id { get; set; }

        public string? topic { get; set; }

        public string? content { get; set; }
        public DateTime? creationTime { get; set; }
        public DateTime? lastModifiedTime { get; set; } = DateTime.Now;
    }
}
