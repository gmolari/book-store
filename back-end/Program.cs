using CupStore.src.AppDatabaseContext;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDatabaseContext>(opt => opt.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8, 0, 0))));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var dbContext = services.GetRequiredService<AppDatabaseContext>();
        dbContext.Database.Migrate();
    }
    catch (Exception ex)
    {
        // Lide com exceções, como registro ou notificação
        Console.WriteLine($"Ocorreu um erro ao migrar o banco de dados: {ex.Message}.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.DocumentTitle = "CupStoreAPI";
    });
}

app.UseAuthorization();

app.MapControllers();

app.Run();
