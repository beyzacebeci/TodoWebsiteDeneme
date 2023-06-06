namespace TodoWebsite.Models.EntityModels
{
    public class UserEntity
    {
        public string Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}
