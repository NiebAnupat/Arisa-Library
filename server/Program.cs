using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using server.Models.Options;
using System.Text;
using System.Text.Json.Serialization;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

try {
    Log.Information("Starting web application");
    var builder = WebApplication.CreateBuilder(args);



    builder.Host.UseSerilog((context, loggerConfiguration) => {
        loggerConfiguration.WriteTo.Console();
        loggerConfiguration.ReadFrom.Configuration(context.Configuration);
    });
    // Add services to the container.
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddHttpContextAccessor();


    builder.Services.AddSwaggerGen(option => {
        option.SwaggerDoc("v1", new() { Title = "Arisa Library API", Version = "v1" });
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer"
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
    });

    builder.Services.AddControllers().AddJsonOptions(options => {
        options.JsonSerializerOptions.MaxDepth = 128;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
    });


    #region Database
    builder.Services.AddDbContext<ArisaLibraryContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
    #endregion

    #region Configuration
    // Add Options to the configuration
    JWT jwt = new();
    AppSettings appSettings = new();
    CORS cors = new();
    builder.Services.Configure<JWT>(builder.Configuration.GetSection(ConfigKey.JWT.ToString()));
    builder.Services.Configure<AppSettings>(builder.Configuration.GetSection(ConfigKey.AppSettings.ToString()));
    builder.Services.Configure<CORS>(builder.Configuration.GetSection(ConfigKey.CORS.ToString()));

    // Validate the JWT and set the secret key
    builder.Configuration.GetSection(ConfigKey.JWT.ToString()).Bind(jwt);
    builder.Configuration.GetSection(ConfigKey.AppSettings.ToString()).Bind(appSettings);
    builder.Configuration.GetSection(ConfigKey.CORS.ToString()).Bind(cors);
    Validator.ValidateObject(jwt, new ValidationContext(jwt), true);
    Validator.ValidateObject(appSettings, new ValidationContext(appSettings), true);
    Validator.ValidateObject(cors, new ValidationContext(cors), true);
    #endregion

    #region Services Registration
    // Register the services here
    builder.Services.AddScoped<IFileService, FileService>();
    builder.Services.AddScoped<IBookService, BookService>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<ITransactionService, TransactionService>();

    // Register the attribute
    builder.Services.AddScoped<UserInfoAttribute>();
    #endregion

    #region Authentification(JWT)
    //Log.Information($"{JsonConvert.SerializeObject(jwt)}");
    builder.Services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options => {
        options.Events = new JwtBearerEvents {
            OnAuthenticationFailed = context => {
                Log.Error("Authentication failed: {Message}", context.Exception.Message);
                return Task.CompletedTask;
            },
            OnTokenValidated = context => {
                Log.Information("Token validated successfully");
                return Task.CompletedTask;
            }
        };

        options.TokenValidationParameters = new TokenValidationParameters {
            LogValidationExceptions = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = jwt.Issuer,
            ValidAudience = jwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Secret)),
            ValidateLifetime = false, //Production have to be true,
            ValidateIssuerSigningKey = true
        };
    });

    builder.Services.AddAuthorization();
    #endregion

    #region CORS
    builder.Services.AddCors(options => {
        options.AddPolicy("CorsPolicy", builder => {
            builder.WithOrigins(cors.AllowedOrigins)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
    });
    #endregion

    var app = builder.Build();
    app.UseSerilogRequestLogging();
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment()) {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseStaticFiles();

    // Use authentication and authorization middlewares
    app.UseMiddleware<JwtCookieMiddleware>();
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.MapGet("/api/health", () => "Healthy!");

    app.Run();

} catch (Exception ex) {
    Log.Error(ex, "An error occurred");
} finally {
    Log.CloseAndFlush();
}
