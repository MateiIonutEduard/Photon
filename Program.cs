using Photon.Data;
using Photon.Models;
using Photon.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<MovieSettings>(
    builder.Configuration.GetSection("MovieDB"));

builder.Services.AddSingleton<IMovieService, MovieService>();
builder.Services.AddSingleton<IGenreService, GenreService>();
builder.Services.AddControllersWithViews();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await DataFlow.Init(services);
}

    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
