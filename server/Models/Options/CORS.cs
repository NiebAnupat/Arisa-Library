namespace Server.Models.Options {
    public class CORS {
        [Required]

        public string[] AllowedOrigins { get; set; }

        public string AllowedOriginsString {
            set {
                AllowedOrigins = value?.Split(';', StringSplitOptions.RemoveEmptyEntries);
            }
        }
    }
}
