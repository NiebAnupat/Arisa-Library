namespace server.DTOs {
    public class CreateUserDTO {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }
        [Required]
        [StrongPassword]
        public string Password { get; set; }
        [Required]
        public Role Role { get; set; }
    }
}
