namespace Server.Models.Options {
    public class CORS {
        [Required]
        public string[] AllowedOrigins { get; set; }

    }
}
