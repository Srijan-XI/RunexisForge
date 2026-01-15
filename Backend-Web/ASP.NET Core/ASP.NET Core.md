# ASP.NET Core

## Introduction

## Overview

ASP.NET Core is a modern, cross-platform web framework built by Microsoft for developing robust, scalable, and high-performance web applications. It's the latest evolution of the ASP.NET framework with significant improvements.

## Key Features

- **Cross-Platform**: Runs on Windows, Linux, and macOS
- **High Performance**: Ranked among the fastest web frameworks
- **Modern Architecture**: Built with dependency injection and middleware pattern
- **Unified Framework**: Combines MVC, Web API, and SignalR
- **Async/Await Support**: Native asynchronous programming
- **Entity Framework Core**: Powerful ORM for data access
- **Built-in Dependency Injection**: DI container included
- **Configuration Management**: Flexible configuration system
- **Logging**: Built-in logging framework

## Core Components

1. **MVC Pattern**: Model-View-Controller architecture
2. **Controllers**: Handle HTTP requests
3. **Views**: Render HTML responses
4. **Models**: Represent application data
5. **Services**: Business logic layer
6. **Middleware**: Request processing pipeline
7. **Routing**: URL mapping to controller actions

## Project Types

- **ASP.NET Core MVC**: Full-stack web applications
- **ASP.NET Core Web API**: RESTful APIs
- **ASP.NET Core Blazor**: Full-stack web apps with C#
- **ASP.NET Core gRPC**: High-performance RPC framework
- **ASP.NET Core SignalR**: Real-time communication

## Prerequisites

- C# programming knowledge
- Understanding of web fundamentals
- HTTP/REST concepts
- Basic database knowledge

## Advantages

- Excellent performance
- Type-safe language (C#)
- Comprehensive framework
- Strong industry adoption
- Excellent documentation
- Enterprise-ready
- Modern development practices

## Technology Stack

- **Language**: C#
- **Runtime**: .NET 6, 7, 8, or higher
- **Database**: SQL Server, PostgreSQL, MySQL, SQLite
- **Frontend**: Razor Pages, Blazor, or JavaScript frameworks
- **ORM**: Entity Framework Core

## Resources

- Official Documentation: <https://docs.microsoft.com/en-us/aspnet/core>
- Microsoft Learn: <https://learn.microsoft.com>
- .NET Foundation: <https://dotnetfoundation.org>
- Entity Framework Core: <https://docs.microsoft.com/ef/core>

## User Guide

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

