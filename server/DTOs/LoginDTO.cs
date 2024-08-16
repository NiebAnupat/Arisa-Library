
public class LoginDTO
{
    [Required]
    public string Email { get; set; } = null!;
    [Required]
    [StrongPassword]
    public string Password { get; set; } = null!;
}