namespace Server.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateOnly? JoinDate { get; set; }

    public string Role { get; set; } = null!;

    public virtual ICollection<Transaction> TransactionAdmins { get; set; } = new List<Transaction>();

    public virtual ICollection<Transaction> TransactionUsers { get; set; } = new List<Transaction>();
}
