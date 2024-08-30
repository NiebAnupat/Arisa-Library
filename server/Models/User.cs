using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models;

public partial class User : BaseEntity {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid UserId { get; set; }

    public string Email { get; set; }

    public string Password { get; set; } = null;

    public DateOnly? JoinDate { get; set; }

    [EnumDataType(typeof(Role))]
    public Role Role { get; set; }

    //public virtual ICollection<Book> Books { get; set; } = new List<Book>();

    //public virtual ICollection<User> CreatedUser { get; set; } = new List<User>();

    public virtual ICollection<Transaction> TransactionAdmins { get; set; } = null;

    public virtual ICollection<Transaction> TransactionUsers { get; set; } = null;
}
