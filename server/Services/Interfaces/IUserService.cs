namespace Server.Services.Interfaces {
    public interface IUserService :IBaseService<User> {
        Task<User> GetByEmailAsync(string email);
    }
}
