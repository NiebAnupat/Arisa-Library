using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

public partial class Transaction : BaseEntity {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid TransactionId { get; set; }

    public Guid? BookId { get; set; }

    public Guid? UserId { get; set; }

    public Guid? AdminId { get; set; }

    public DateOnly BorrowDate { get; set; }

    public DateOnly? ReturnDate { get; set; }

    public DateOnly DueDate { get; set; }

    public decimal? Fine { get; set; }

    public virtual User Admin { get; set; }

    public virtual Book Book { get; set; }

    public virtual User User { get; set; }
}
