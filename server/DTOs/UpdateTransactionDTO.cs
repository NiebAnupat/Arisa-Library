namespace Server.DTOs {
    public class UpdateTransactionDTO {
        public DateOnly? DueDate { get; set; }
        public DateOnly? ReturnDate { get; set; }
        public decimal? Fine { get; set; }
    }
}
