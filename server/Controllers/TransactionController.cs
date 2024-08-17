using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace server.Controllers {
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TransactionController : ControllerBase {
        private readonly ITransactionService _transactionService;
        private readonly IUserService _userService;
        private readonly IBookService _bookService;

        public TransactionController(ITransactionService transactionService, IUserService userService, IBookService bookService) {
            _transactionService = transactionService;
            _userService = userService;
            _bookService = bookService;
        }

        // GET: api/Transaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions() {

            var transactions = await _transactionService.GetAllAsync();
            return Ok(transactions);
        }

        // GET: api/Transaction/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(Guid id) {
            Transaction transaction = await _transactionService.GetByIdAsync(id);

            if (transaction is null) {
                return NotFound();
            }

            return Ok(transaction);
        }

        // PUT: api/Transaction/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchTransaction(Guid id, UpdateTransactionDTO model) {
            Log.Information("Update transaction {id}", id);

            // check for model has value
            if (!model.DueDate.HasValue && !model.ReturnDate.HasValue && !model.Fine.HasValue) {
                return BadRequest("Body is null");
            }

            if (!TransactionExists(id)) {
                return BadRequest();
            }
            Transaction transaction = await _transactionService.GetByIdAsync(id);

            transaction.DueDate = model.DueDate ?? transaction.DueDate;
            bool isReturn = model.ReturnDate.HasValue;
            if (isReturn) {
                Log.Debug("Return book {bookId}", transaction.BookId);
                transaction.ReturnDate = model.ReturnDate;
                if (model.ReturnDate > transaction.DueDate) {
                    int daysLate = model.ReturnDate.Value.DayNumber - transaction.DueDate.DayNumber;
                    transaction.Fine = Math.Max(0, daysLate) * 20; // Ensure fine is non-negative
                    Log.Debug("Fine calculated {fine}", transaction.Fine);
                }
            }
            transaction.Fine = model.Fine ?? transaction.Fine;


            try {
                await _transactionService.UpdateAsync(transaction);
                // if isReturn then update book available status
                if (isReturn) {
                    Log.Debug("Update book availability {bookId}", transaction.BookId);
                    Book book = await _bookService.GetByIdAsync(transaction.BookId.Value);
                    book.Available = true;
                    await _bookService.UpdateAsync(book);
                }
                Log.Information("Transaction {id} updated", id);
            } catch (DbUpdateConcurrencyException) {
                Log.Warning("Transaction {id} not found", id);
                if (!TransactionExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return Ok(new { isSuccess = true, transaction });
        }

        // POST: api/Transaction
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ServiceFilter(typeof(UserInfoAttribute))]
        public async Task<ActionResult<Transaction>> PostTransaction(CreateTransactionDTO model) {
            User admin = (User) HttpContext.Items["User"];
            User user = await _userService.GetByIdAsync(model.UserId);
            Book book = await _bookService.GetByIdAsync(model.BookId);

            if (user is null) {
                return BadRequest("User not found");
            }

            if (book is null) {
                return BadRequest("Book not found");
            }

            if (book.Available == false) {
                return BadRequest("Book is not available");
            }

            if (model.BorrowDate > model.DueDate) {
                return BadRequest("Borrow date must be less than due date");
            }

            Transaction transaction = new() {
                BookId = model.BookId,
                UserId = model.UserId,
                AdminId = admin.UserId,
                BorrowDate = model.BorrowDate,
                DueDate = model.DueDate,
                CreatedByUserId = admin.UserId,
            };

            await _transactionService.CreateAsync(transaction);

            // update book available status
            book.Available = false;
            await _bookService.UpdateAsync(book);

            return CreatedAtAction("GetTransaction", new { id = transaction.TransactionId }, transaction);
        }

        // DELETE: api/Transaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id) {
            Transaction transaction = await _transactionService.GetByIdAsync(id);
            if (transaction is null) {
                return NotFound();
            }

            await _transactionService.DeleteAsync(transaction);

            return Ok(new { isSuccess = true, message = $"Transaction id ${transaction.TransactionId} Deleted" });
        }

        private bool TransactionExists(Guid id) {
            return _transactionService.GetAllAsync().Result.Any(e => e.TransactionId == id);
        }
    }
}
