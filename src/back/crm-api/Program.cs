using DotNetEnv;
using Microsoft.EntityFrameworkCore;

Env.Load(@"E:\env\.env");

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddDbContext<CrmDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("CrmConnection")));

builder.Services.AddControllers();

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.Run();