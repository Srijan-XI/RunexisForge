# ASP.NET Core Installation and Usage Guide

## Installation

### Prerequisites

- .NET SDK 6.0 or higher
- Visual Studio, VS Code, or Rider
- C# extension for VS Code

### Install .NET SDK

Visit <https://dotnet.microsoft.com/download> to download and install the latest .NET SDK.

### Verify Installation

```bash
dotnet --version
```bash

## Create a New Project

### Create ASP.NET Core MVC Project

```bash
dotnet new mvc -n MyApp
cd MyApp
dotnet run
```bash

### Create ASP.NET Core Web API Project

```bash
dotnet new webapi -n MyApi
cd MyApi
dotnet run
```bash

### Create Blazor Project

```bash
dotnet new blazorserver -n MyBlazorApp
cd MyBlazorApp
dotnet run
```bash

## Project Structure

```bash
MyApp/
├── Controllers/
│   └── HomeController.cs
├── Views/
│   ├── Home/
│   └── Shared/
├── Models/
│   └── (your models)
├── wwwroot/
│   ├── css/
│   ├── js/
│   └── lib/
├── appsettings.json
├── Program.cs
├── Startup.cs
└── MyApp.csproj
```bash

## Basic Controller

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;

    public UsersController(ILogger<UsersController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "Hello from API" });
    }

    [HttpPost]
    public IActionResult Create([FromBody] UserDto userDto)
    {
        return CreatedAtAction(nameof(Get), new { id = 1 }, userDto);
    }
}
```text

## Program.cs (Startup Configuration)

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddDbContext<AppDbContext>();

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
```bash

## Dependency Injection

```csharp
// Register services in Program.cs
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddSingleton<IConfiguration>(configuration);
builder.Services.AddTransient<IEmailService, EmailService>();

// Inject in controllers
public class MyController : ControllerBase
{
    private readonly IUserService _userService;

    public MyController(IUserService userService)
    {
        _userService = userService;
    }
}
```bash

## Entity Framework Core

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```bash

### DbContext Example

```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
}
```bash

### Migrations

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```bash

## View (Razor Template)

```html
@{
    ViewData["Title"] = "Home";
}

<h1>Welcome</h1>
<p>@Model.Message</p>

@if (Model.IsAdmin)
{
    <p>Admin Panel</p>
}

<ul>
    @foreach(var item in Model.Items)
    {
        <li>@item.Name</li>
    }
</ul>
```bash

## Common Commands

```bash
dotnet run                  # Run the application
dotnet build                # Build the project
dotnet test                 # Run tests
dotnet add package Package  # Add NuGet package
dotnet ef migrations add    # Add migration
dotnet ef database update   # Apply migrations
dotnet publish              # Publish for production
```bash

## Configuration

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=mydb;User=sa;Password=password"
  }
}
```bash

## Authentication

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
        };
    });
```bash

## Best Practices

1. Follow SOLID principles
2. Use dependency injection
3. Implement proper exception handling
4. Validate input data
5. Use async/await for I/O operations
6. Implement proper logging
7. Use Entity Framework Core for data access
8. Separate concerns (Controllers, Services, Data Access)
9. Write unit tests
10. Use configuration for environment-specific settings

## Testing

```bash
dotnet new xunit -n MyApp.Tests
dotnet add reference ../MyApp/MyApp.csproj
```bash

## Debugging

- Visual Studio built-in debugger
- VS Code with C# extension
- Application Insights for production monitoring
