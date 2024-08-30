namespace Server.DTOs {
    public class TransactionDto {
        public Guid TransactionId { get; set; }
        public BookDto Book { get; set; }
        public UserDto User { get; set; }
        public DateOnly BorrowDate { get; set; }
        public DateOnly? ReturnDate { get; set; }
        public DateOnly DueDate { get; set; }
        public decimal? Fine { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedUTC { get; set; }
        public DateTime UpdatedUTC { get; set; }
    }
}
