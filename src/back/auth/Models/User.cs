using System.ComponentModel.DataAnnotations;

namespace auth.Models;

public class User
{
    [Key] public Guid UserId { get; set; }

    public string Forename { get; set; }
    public string Surname { get; set; }

    [Required] [EmailAddress] public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string PasswordHash { get; set; }

    public string RefreshToken { get; set; }
}