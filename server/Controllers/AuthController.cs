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
        if (!await _userService.ValidateUserAsync(model.Email, model.Password)) {
            return Unauthorized();
        }

        string accessToken = _userService.GenerateJwtToken(model.Email);

        // Log token for debugging (be careful with sensitive information)
        Log.Debug("Generated access token: {accessToken}", accessToken);

        // Set cookie
        Response.Cookies.Append("access_token", accessToken, new CookieOptions {
            HttpOnly = true,
            SameSite = SameSiteMode.Strict,
            Secure = true
        });

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

