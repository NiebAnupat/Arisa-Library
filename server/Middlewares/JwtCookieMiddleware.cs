namespace Server.Middlewares {
    public class JwtCookieMiddleware {
        private readonly RequestDelegate _next;
        public JwtCookieMiddleware(RequestDelegate next) {
            _next = next;
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
