

using Microsoft.EntityFrameworkCore;

namespace Server.Services {
    public class UserService : BaseService<User>, IUserService {

        private readonly ArisaLibraryContext _context;

        public UserService(ArisaLibraryContext context) : base(context) {
            _context = context;
        }
        public Task<User> GetByEmailAsync(string email) {
            return _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
