using System.ComponentModel.DataAnnotations;

namespace server.Models.Options
{
    public class JWT
    {
        [Required]
        public string Secret { get; set; }
    }
}
