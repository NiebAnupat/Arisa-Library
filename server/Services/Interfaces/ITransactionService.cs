namespace Server.Services.Interfaces {
    public interface ITransactionService : IBaseService<Transaction> {
        new Task<IEnumerable<Transaction>> GetAllAsync();

        new Task<Transaction> GetByIdAsync (Guid id);

        Task<IEnumerable<Transaction>> GetNotReturnedTransactions ();
    }
}
