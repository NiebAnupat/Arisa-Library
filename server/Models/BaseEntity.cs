namespace Server.Models
{
    public class BaseEntity
    {
        public DateTime CreatedUTC { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedUTC { get; set; } = DateTime.UtcNow;
        public DateTime? DeletedUTC { get; set; } = null;
        public Guid? CreatedByUserId { get; set; } = null;
        public bool IsActive { get; set; } = true;

        public virtual User CreatedByUser { get; set; }
    }
}
