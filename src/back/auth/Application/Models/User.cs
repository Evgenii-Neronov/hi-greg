using System.ComponentModel.DataAnnotations;

namespace Application.Models
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string PasswordHash { get; set; }

        public string RefreshToken { get; set; }
    }
}