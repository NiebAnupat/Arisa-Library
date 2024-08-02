namespace Server.Models;

public partial class Transaction
{
    public int TransactionId { get; set; }

    public int? BookId { get; set; }

    public int? UserId { get; set; }

    public int? AdminId { get; set; }

    public DateOnly BorrowDate { get; set; }

    public DateOnly? ReturnDate { get; set; }

    public DateOnly DueDate { get; set; }

    public decimal? Fine { get; set; }

    public virtual User Admin { get; set; }

    public virtual Book Book { get; set; }

    public virtual User User { get; set; }
}
