
namespace Server.Services {
    public class UserService(ArisaLibraryContext context) :BaseService<User>(context), IUserService {
    }
}
