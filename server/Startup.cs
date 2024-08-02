using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Models;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // add your services here
        services.AddDbContext<ArisaLibraryContext>(options =>
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

        services.AddIdentity<IdentityUser, IdentityRole>()
           .AddEntityFrameworkStores<ArisaLibraryContext>()
           .AddDefaultTokenProviders();


        services.AddAuthorizationBuilder()
            .AddPolicy("AdminPolicy", policy =>
                policy.RequireRole("Admin"))
            .AddPolicy("UserPolicy", policy =>
                policy.RequireRole("User"));

        // add jwt authentication
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                // ValidateIssuer = true,
                // ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                // ValidIssuer = Configuration["Jwt:Issuer"],
                // ValidAudience = Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Secret"]))
            };
        });

        // services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        //     .AddCookie(options =>
        //     {
        //         options.LoginPath = "/auth/Login";
        //         options.LogoutPath = "/auth/Logout";
        //         options.AccessDeniedPath = "/auth/AccessDenied";
        //     });


    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        //add configuration/middleware here

    }

}