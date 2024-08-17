
using Microsoft.EntityFrameworkCore;

namespace Server.Services {
    public class BookService : BaseService<Book>, IBookService {

        private readonly ArisaLibraryContext _context;

        public BookService(ArisaLibraryContext context) : base(context) {
            _context = context;
        }

        public override Task<Book> GetByIdAsync(Guid id) => _context.Books.Where(b => b.BookId == id).Include(b => b.CreatedByUser).AsSplitQuery().FirstOrDefaultAsync();

    }
}
