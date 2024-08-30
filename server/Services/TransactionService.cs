
using Microsoft.EntityFrameworkCore;
using server.DTOs;

namespace Server.Services {
    public class TransactionService : BaseService<Transaction>, ITransactionService {

        private readonly ArisaLibraryContext _context;
        public TransactionService(ArisaLibraryContext context) : base(context) {
            _context = context;
        }

        public new async Task<IEnumerable<Transaction>> GetAllAsync() {
            return await _context.Transactions.Include(t => t.Book).Include(t => t.User).Select(_ => new Transaction {
                TransactionId = _.TransactionId,
                BookId = _.BookId,
                Book = new Book { Title = _.Book.Title, Available = _.Book.Available },
                User = new User { Email = _.User.Email },
                BorrowDate = _.BorrowDate,
                ReturnDate = _.ReturnDate,
                DueDate = _.DueDate,
                Fine = _.Fine,
                IsActive = _.IsActive,
                CreatedUTC = _.CreatedUTC,
                UpdatedUTC = _.UpdatedUTC,
                UserId = _.UserId,
                AdminId = _.AdminId

            }).AsSplitQuery().ToListAsync();
        }

        public new async Task<Transaction> GetByIdAsync(Guid id) {
            return await _context.Transactions.Include(t => t.Book).Include(t => t.User).Select(_ => new Transaction {
                TransactionId = _.TransactionId,
                BookId = _.BookId,
                Book = new Book { Title = _.Book.Title, Available = _.Book.Available },
                User = new User { Email = _.User.Email },
                BorrowDate = _.BorrowDate,
                ReturnDate = _.ReturnDate,
                DueDate = _.DueDate,
                Fine = _.Fine,
                IsActive = _.IsActive,
                CreatedUTC = _.CreatedUTC,
                UpdatedUTC = _.UpdatedUTC,
                UserId = _.UserId,
                AdminId = _.AdminId

            }).Where(t => t.TransactionId == id && t.IsActive).AsSplitQuery().FirstOrDefaultAsync();
        }
    }

}
