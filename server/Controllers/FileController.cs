using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Net.Mime;

namespace Server.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase {

        private readonly IFileService _fileService;
        public FileController(IFileService fileService) {
            _fileService = fileService;
        }

        [HttpGet("{filename}")]
        public ActionResult GetFileAsync(string filename) {
            Log.Information("Getting file {filename}", filename);
            string path = _fileService.MapFile(filename);
            if (path == null || !System.IO.File.Exists(path)) {
                return NotFound();
            }

            var fileExtension = Path.GetExtension(path).Substring(1);
            var contentType = $"image/{fileExtension}";

            var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);

            var contentDisposition = new ContentDisposition {
                DispositionType = DispositionTypeNames.Inline, // Or Attachment as needed
                FileName = filename
            };
            Response.Headers.Append("Content-Disposition", contentDisposition.ToString());

            return File(fileStream, contentType);
        }



    }
}
