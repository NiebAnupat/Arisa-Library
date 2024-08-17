namespace server.Models.Options {
    public class JWT {
        [Required]
        public string Secret { get; set; }

        [Required]
        public string Issuer { get; set; }
        [Required]

        public string Audience { get; set; }
    }
}
