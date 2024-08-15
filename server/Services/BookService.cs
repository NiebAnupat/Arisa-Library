
namespace Server.Services
{
    public class BookService(ArisaLibraryContext context) :BaseService<Book>(context) , IBookService {
    }
}
