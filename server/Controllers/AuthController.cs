using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly IUserService _userService;
    public AuthController(IUserService userService) {
        _userService = userService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO model) {
        Log.Information("Login attempt for {email}", model.Email);
        if (!await _userService.ValidateUserAsync(model.Email, model.Password)) {
            return Unauthorized();
        }

        User user = await _userService.GetByEmailAsync(model.Email);

        string accessToken = _userService.GenerateJwtToken(user.Email, user.Role);


        Log.Debug($"Setting cookie for connection id : {Request.HttpContext.Connection.Id}");
        // Set cookie
        Response.Cookies.Append("access_token", accessToken, new CookieOptions {
            HttpOnly = true,
            SameSite = SameSiteMode.Strict,
            Secure = true
        });

        Log.Information("User {email} logged in", user.Email);
        return Ok(new { message = "Login successful", isSuccess = true });
    }


    [HttpPost("logout")]
    public IActionResult Logout() {

        // check if cookie exists
        if (Request.Cookies["access_token"] == null) {
            return BadRequest(new { message = "No cookie found", isSuccess = false });
        }

        Response.Cookies.Delete("access_token");
        return Ok(new { message = "Logout successful", isSuccess = true });
    }

}

