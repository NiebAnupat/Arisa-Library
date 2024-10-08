﻿

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using server.Models.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services {
    public class UserService : BaseService<User>, IUserService {

        private readonly ArisaLibraryContext _context;
        private readonly JWT _jwtOptions;

        public UserService(ArisaLibraryContext context, IOptions<JWT> options) : base(context) {
            _context = context;
            _jwtOptions = options.Value;
        }
        public Task<User> GetByEmailAsync(string email) {
            return _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.IsActive == true);
        }



        async Task<bool> IUserService.ValidateUserAsync(string email, string password) {
            Log.Information("Validating user {email}", email);
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.IsActive == true);
            if (user is null) {
                Log.Warning("User {email} not found", email);
                return false;
            }

            Log.Debug("Comparing password for {email}", email);
            Log.Information("User {email} validated", email);
            return BCrypt.Net.BCrypt.EnhancedVerify(password, user.Password);
        }
        string IUserService.GenerateJwtToken(string email, Role role) {
            Log.Debug("Generating JWT token for {email}", email);

            List<Claim> claims = new() {
                 new Claim(JwtRegisteredClaimNames.Email, email),
                 new Claim(ClaimTypes.Role, role.ToString()),
                 new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_jwtOptions.Secret));
            SigningCredentials creds = new(key, SecurityAlgorithms.HmacSha256);
            JwtSecurityTokenHandler jwtSecurityTokenHandler = new();
            SecurityTokenDescriptor tokenDescriptor = new() {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMonths(12),
                Audience = _jwtOptions.Audience,
                Issuer = _jwtOptions.Issuer,
                SigningCredentials = creds
            };

            SecurityToken token = jwtSecurityTokenHandler.CreateToken(tokenDescriptor);
            string jwtToken = jwtSecurityTokenHandler.WriteToken(token);
            Log.Debug("Generated access token: {jwtToken}", jwtToken);

            return jwtToken;
        }

    }
}
