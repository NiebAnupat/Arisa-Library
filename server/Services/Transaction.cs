
namespace Server.Services
{
    public class TransactionService(ArisaLibraryContext context) :BaseService<Transaction>(context), ITransactionService {
    }
}
