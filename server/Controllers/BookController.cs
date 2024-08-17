using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace server.Controllers {
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BookController : ControllerBase {
        private readonly IBookService _bookService;
        private readonly IFileService _fileService;

        public BookController(IBookService bookService, IFileService fileService) {
            _bookService = bookService;
            _fileService = fileService;
        }

        // GET: api/Book
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks() {
            return Ok(await _bookService.GetAllAsync());
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(Guid id) {
            var book = await _bookService.GetByIdAsync(id);

            if (book == null) {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Book/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPatch("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PatchBook(Guid id, [FromBody] UpdateBookDTO model) {
            // Retrieve the book from the service
            var book = await _bookService.GetByIdAsync(id);
            if (book == null) {
                return NotFound(); // Return NotFound if the book does not exist
            }

            // Update only the fields that are not null in the model
            book.Title = model.Title ?? book.Title;
            book.Author = model.Author ?? book.Author;
            book.Description = model.Description ?? book.Description;
            book.Available = model.Available ?? book.Available;

            book.UpdatedUTC = DateTime.UtcNow;

            try {
                // Update the book using the service
                await _bookService.UpdateAsync(book);
            } catch (DbUpdateConcurrencyException) {
                if (!BookExists(id)) {
                    return NotFound(); // Return NotFound if the book no longer exists
                } else {
                    throw; // Rethrow if there's a different concurrency issue
                }
            }

            return Ok(new { isSuccess = true, book });
        }


        // POST: api/Book
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ServiceFilter(typeof(UserInfoAttribute))]

        public async Task<ActionResult<Book>> PostBook([FromForm] CreateBookDTO model) {
            Log.Information("Creating book {title}", model.Title);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            User user = (User) HttpContext.Items["User"];

            Log.Debug("Saving file {filename}", model.CoverFile.FileName);
            var fileName = await _fileService.SaveFileAsync(model.CoverFile);

            Book book = new() {
                Title = model.Title,
                Author = model.Author,
                Description = model.Description,
                CoverFilename = fileName,
                Available = true,
                CreatedByUserId = user.UserId,
            };
            await _bookService.CreateAsync(book);

            Log.Information("Book {title} created", book.Title);
            return Ok(new { isSuccess = true, message = $"Book id ${book.BookId} Created" });
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBook(Guid id) {
            try {
                var book = await _bookService.GetByIdAsync(id);
                if (book == null) {
                    return NotFound();
                }
                //_fileService.DeleteFile(book.CoverFilename);
                await _bookService.DeleteAsync(book);

                return NoContent();
            } catch (Exception e) {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }

        }

        private bool BookExists(Guid id) {
            return _bookService.GetAllAsync().Result.Any(e => e.BookId == id);
        }
    }
}
