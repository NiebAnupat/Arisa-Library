
using Newtonsoft.Json;

namespace Server.Middlewares {
    public class JwtCookieMiddleware {
        private readonly RequestDelegate _next;
        private readonly ILogger<JwtCookieMiddleware> _logger;
        public JwtCookieMiddleware(RequestDelegate next, ILogger<JwtCookieMiddleware> logger) {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context) {
            if (context.Request.Cookies.ContainsKey("access_token")) {
                var token = context.Request.Cookies["access_token"];
                context.Request.Headers.Append("Authorization", $"Bearer {token}");
            }

            await _next(context);
        }
    }

}
