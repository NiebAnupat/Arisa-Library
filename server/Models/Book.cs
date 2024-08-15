
namespace Server.Models;

public partial class Book : BaseEntity {
    public int BookId { get; set; }

    public string Title { get; set; } = null!;

    public string Author { get; set; } = null!;

    public string Description { get; set; }

    public string CoverFilename { get; set; }

    public bool Available { get; set; } = true;

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
