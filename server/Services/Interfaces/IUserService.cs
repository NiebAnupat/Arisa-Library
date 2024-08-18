namespace Server.Services.Interfaces {
    public interface IUserService : IBaseService<User> {
        Task<User> GetByEmailAsync(string email);
        Task<bool> ValidateUserAsync(string email, string password);
        string GenerateJwtToken(string email, Role role);
    }
}
