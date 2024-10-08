﻿
using Microsoft.EntityFrameworkCore;
using Serilog;
using server.DTOs;

namespace Server.Services {
    public class TransactionService : BaseService<Transaction>, ITransactionService {

        private readonly ArisaLibraryContext _context;
        public TransactionService(ArisaLibraryContext context) : base(context) {
            _context = context;
        }

        public new async Task<IEnumerable<Transaction>> GetAllAsync() {
            return await _context.Transactions.Include(t => t.Book).Include(t => t.User).Where(_ => _.IsActive).AsSplitQuery().ToListAsync();
        }

        public new async Task<Transaction> GetByIdAsync(Guid id) {
            return await _context.Transactions.Include(t => t.Book).Include(t => t.User).Where(t => t.TransactionId == id && t.IsActive).AsSplitQuery().FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Transaction>> GetNotReturnedTransactions()
        {
            Log.Information("{Service} Get not returned transactions", nameof(TransactionService));
            return await _context.Transactions.Include(t => t.Book).Include(t => t.User).Where(t => t.IsActive && t.ReturnDate == null).AsSplitQuery().ToListAsync();
        }
    }

}
