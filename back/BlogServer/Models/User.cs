using System.ComponentModel.DataAnnotations;
namespace BlogServer.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? FirstName { get; set; }
        [Required]
        public string? Password { get; set; }
        public string? PasswordHash { get; set; }

    }
}
