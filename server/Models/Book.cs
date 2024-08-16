using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

public partial class Book : BaseEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid BookId { get; set; }

    public string Title { get; set; } = null!;

    public string Author { get; set; } = null!;

    public string Description { get; set; }

    public string CoverFilename { get; set; }

    public bool Available { get; set; } = true;

    public virtual ICollection<Transaction> Transactions { get; set; } = null;
}
