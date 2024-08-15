using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers {
    [Route("api/[controller]")]
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
        public async Task<ActionResult<Book>> GetBook(int id) {
            var book = await _bookService.GetByIdAsync(id);

            if (book == null) {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Book/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, [FromBody] UpdateBookDTO model) {

            Book book = await _bookService.GetByIdAsync(id);
            if (book is null) {
                return BadRequest();
            }

            //_context.Entry(book).State = EntityState.Modified;
            // update only the fields that are not null
            if (model.Title != null) {
                book.Title = model.Title;
            }
            if (model.Author != null) {
                book.Author = model.Author;
            }
            if (model.Description != null) {
                book.Description = model.Description;
            }



            try {
                await _bookService.UpdateAsync(book);
            } catch (DbUpdateConcurrencyException) {
                if (!BookExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Book
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook([FromForm] CreateBookDTO model) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var fileName = await _fileService.SaveFileAsync(model.CoverFile);

            Book book = new() {
                Title = model.Title,
                Author = model.Author,
                Description = model.Description,
                CoverFilename = fileName,
                Available = true
            };
            await _bookService.CreateAsync(book);

            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id) {
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

        private bool BookExists(int id) {
            return _bookService.GetAllAsync().Result.Any(e => e.BookId == id);
        }
    }
}
