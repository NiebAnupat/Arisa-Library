using Microsoft.EntityFrameworkCore;
using server.Models.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

#region Database
builder.Services.AddDbContext<ArisaLibraryContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
#endregion

#region Configuration
// Add the JWT and AppSettings to the configuration
JWT jwt = new();
AppSettings appSettings = new();
builder.Configuration.GetSection(ConfigKey.JWT.ToString()).Bind(jwt);
builder.Configuration.GetSection(ConfigKey.AppSettings.ToString()).Bind(appSettings);

// Validate the JWT and set the secret key
Validator.ValidateObject(jwt, new ValidationContext(jwt), true);
Validator.ValidateObject(appSettings, new ValidationContext(appSettings), true);
#endregion

#region Services Registration
// Register the services here
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.MapControllers();

app.MapGet("/api/health", () => "Healthy!");

app.Run();

