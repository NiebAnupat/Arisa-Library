namespace Server.Services.Interfaces {
    public interface IFileService {
        Task<string> SaveFileAsync(IFormFile file);

        string MapFile(string filename);

        bool DeleteFile(string filename);

    }
}
