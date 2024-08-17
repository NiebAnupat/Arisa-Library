namespace Server.DTOs {
    public class CreateBookDTO {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public IFormFile CoverFile { get; set; }
    }
}
