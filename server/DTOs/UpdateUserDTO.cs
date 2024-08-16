using System.Runtime.Serialization;

namespace server.DTOs {
    public class UpdateUserDTO {
        [StrongPassword]
        public string? Password { get; set; }
    }
}
