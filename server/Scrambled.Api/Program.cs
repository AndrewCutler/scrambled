using Scrambled.Api.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

builder.Services.AddCors(o =>
{
    o.AddPolicy(
        "Scrambled",
        policy =>
        {
            policy
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:3000")
                .AllowCredentials();
        }
    );
});


builder.Services.AddSingleton<IGameService, GameService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("Scrambled");

app.MapHub<GameHub>("/game");

app.Run();
