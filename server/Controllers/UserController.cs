using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase {
    private readonly IUserService _userService;

    public UserController(IUserService userService) {
        _userService = userService;
    }

    // GET: api/User
    [HttpGet]
    [Authorize(Roles ="Admin")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers() {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

    // GET: api/User/5
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(Guid id) {
        var user = await _userService.GetByIdAsync(id);

        if (user == null) {
            return NotFound();
        }

        return Ok(user);
    }

    // PUT: api/User/5
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchUser(Guid id, UpdateUserDTO model) {

        User user = await _userService.GetByIdAsync(id);
        if (user is null) {
            return NotFound();
        }

        if (model.Password != null) {
            // check password is not changed
            if (BCrypt.Net.BCrypt.EnhancedVerify(model.Password, user.Password)) {
                return BadRequest("Password must be not same with old password ");
            }

            user.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(model.Password, 13);
            user.UpdatedUTC = DateTime.UtcNow;
        }

        var result = await _userService.UpdateAsync(user);
        if (result is null) {
            return NotFound();
        }

        return NoContent();
    }

    // POST: api/User
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(CreateUserDTO model) {

        User isExit = await _userService.GetByEmailAsync(model.Email);
        if (isExit is not null) {
            return BadRequest("Email is already taken.");
        }

        User user = new() {
            Email = model.Email,
            Password = BCrypt.Net.BCrypt.EnhancedHashPassword(model.Password, 13),
            Role = model.Role
        };
        var createdUser = await _userService.CreateAsync(user);
        if (createdUser is null) {
            return BadRequest();
        }
        return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
    }

    // DELETE: api/User/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id) {
        var user = await _userService.GetByIdAsync(id);
        var result = await _userService.DeleteAsync(user);
        if (result is null) {
            return NotFound();
        }

        return NoContent();
    }
}
