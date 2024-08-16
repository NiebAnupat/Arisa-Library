using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using Serilog;
using System.Security.Claims;
using System.Text;

namespace Server.Attributes {
    public class UserInfoAttribute(IUserService userService) : ActionFilterAttribute {
        private readonly IUserService _userService = userService;

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next) {
            Log.Debug("Getting user info from claims");
            ClaimsPrincipal authenticatedUser = context.HttpContext.User;
            Log.Debug("Email : {email}", authenticatedUser.FindFirst(ClaimTypes.Email).Value);
            string email = authenticatedUser.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email)) {
                Log.Warning("Email claim not found.");
                await UnauthorizedResponse(context);
                return;
            }

            User user = await _userService.GetByEmailAsync(email);
            if (user == null) {
                Log.Warning("User {email} not found", email);
                await UnauthorizedResponse(context);
                return;
            }

            Log.Information("Attaching user : '{UserId}' to context", user.UserId);
            context.HttpContext.Items.Add("User", user);

            // Call the next delegate/middleware in the pipeline
            await next();
        }

        private static Task UnauthorizedResponse(ActionExecutingContext context) {
            context.HttpContext.Response.Cookies.Delete("access_token");
            context.HttpContext.Response.StatusCode = 401;
            return context.HttpContext.Response.WriteAsync("Unauthorized", Encoding.UTF8);
        }
    }
}
