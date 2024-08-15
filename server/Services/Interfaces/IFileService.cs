namespace Server.Services.Interfaces {
    public interface IFileService {
        Task<string> SaveFileAsync(IFormFile file);
        Task<byte[]> GetFileAsync(string filename);

        bool DeleteFile(string filename);

    }
}
