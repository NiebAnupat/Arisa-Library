using Microsoft.EntityFrameworkCore;

namespace Server.Data;

public partial class ArisaLibraryContext : DbContext {


    public ArisaLibraryContext(DbContextOptions<ArisaLibraryContext> options)
        : base(options) { }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        =>
        optionsBuilder.UseNpgsql(
            "Host=postgres;Database=arisa_library;Username=root;Password=123456"
        );

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Book>(entity => {
            entity.HasKey(e => e.BookId).HasName("books_pkey");

            entity.ToTable("books");

            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.Author).HasMaxLength(255).HasColumnName("author");
            entity.Property(e => e.Available).HasDefaultValue(true).HasColumnName("available");
            entity.Property(e => e.CoverFilename).HasMaxLength(255).HasColumnName("cover_filename");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Title).HasMaxLength(255).HasColumnName("title");
        });

        modelBuilder.Entity<Transaction>(entity => {
            entity.HasKey(e => e.TransactionId).HasName("transactions_pkey");

            entity.ToTable("transactions");

            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");
            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.BorrowDate).HasColumnName("borrow_date");
            entity.Property(e => e.DueDate).HasColumnName("due_date");
            entity.Property(e => e.Fine).HasDefaultValueSql("0").HasColumnName("fine");
            entity.Property(e => e.ReturnDate).HasColumnName("return_date");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity
                .HasOne(d => d.Admin)
                .WithMany(p => p.TransactionAdmins)
                .HasForeignKey(d => d.AdminId)
                .HasConstraintName("transactions_admin_id_fkey");

            entity
                .HasOne(d => d.Book)
                .WithMany(p => p.Transactions)
                .HasForeignKey(d => d.BookId)
                .HasConstraintName("transactions_book_id_fkey");

            entity
                .HasOne(d => d.User)
                .WithMany(p => p.TransactionUsers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("transactions_user_id_fkey");
        });

        modelBuilder.Entity<User>(entity => {
            entity.HasKey(e => e.UserId).HasName("users_pkey");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "users_email_key").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity
                .Property(e => e.JoinDate)
                .HasDefaultValueSql("CURRENT_DATE")
                .HasColumnName("join_date");
            entity.Property(e => e.Password).HasMaxLength(255).HasColumnName("password");
            entity
                .Property(e => e.Role)
                .HasMaxLength(50)
                .HasColumnName("role")
                .HasConversion(v => v.ToString(), v => (Role) Enum.Parse(typeof(Role), v));
            entity.Property(e => e.Email).HasMaxLength(255).HasColumnName("Email");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
