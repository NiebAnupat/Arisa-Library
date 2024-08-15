
namespace Server.Services {
    public class FileService :IFileService {

        private readonly IWebHostEnvironment _environment;

        public FileService(IWebHostEnvironment environment) {
            _environment = environment;
        }


        Task<byte[]> IFileService.GetFileAsync(string filename) {
            throw new NotImplementedException();
        }

        async Task<string> IFileService.SaveFileAsync(IFormFile file) {

            var fileExtension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(_environment.WebRootPath, "uploads", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create)) {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        public bool DeleteFile(string filename) {

            try {
                var filePath = Path.Combine(_environment.WebRootPath, "uploads", filename);
                if (File.Exists(filePath)) {
                    File.Delete(filePath);
                }

                return true;
            } catch (Exception) {
                throw;
            }

        }

    }
}
