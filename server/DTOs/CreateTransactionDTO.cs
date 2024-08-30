namespace Server.DTOs {
    public class CreateTransactionDTO {

        [Required]
        public Guid BookId { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string UserEmail { get; set; }

        public DateOnly BorrowDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);

        public DateOnly DueDate { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(14));


    }
}
