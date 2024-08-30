
using Microsoft.EntityFrameworkCore;

namespace Server.Services {
    public class TransactionService : BaseService<Transaction>, ITransactionService {

        private readonly ArisaLibraryContext _context;
        public TransactionService(ArisaLibraryContext context) : base(context) {
            _context = context;
        }

        public new async Task<IEnumerable<Transaction>> GetAllAsync() {
            return await _context.Transactions.Include(t => t.Book).Include(t => t.User).AsSplitQuery().ToListAsync();
        }

        public new async Task<Transaction> GetByIdAsync(Guid id) {
            return await _context.Transactions.Include(t => t.Book).Include(t => t.User).AsSplitQuery().FirstOrDefaultAsync(t => t.TransactionId == id);
        }
    }

}
