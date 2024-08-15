namespace Server.Models {
    public class BaseEntity {
        public DateTime CreatedUTC { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedUTC { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

    }
}
