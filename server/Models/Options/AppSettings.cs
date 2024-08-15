
namespace Server.Models.Options
{
    public class AppSettings
    {
        [Required]
        public string Greeting { get; set; }

        [Required]
        public string Environment { get; set; }
    }
}
