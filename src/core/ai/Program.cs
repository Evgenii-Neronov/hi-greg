using ai.Services;
using ChatGpt.Application;
using DotNetEnv;
using NLog.Web;

Env.Load(@"E:\env\.env");

var builder = WebApplication.CreateBuilder();
builder.Host
    .ConfigureLogging(logging =>
    {
        logging.ClearProviders();
        logging.SetMinimumLevel(LogLevel.Trace);
    })
    .UseNLog();

builder.Services.AddGrpc();
builder.Services.AddScoped<IGPT3Service, GPT3Service>();

var app = builder.Build();

app.MapGrpcService<GreeterService>();
app.MapGrpcService<CatService>();

app.MapGet("/",
    () =>
        "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();