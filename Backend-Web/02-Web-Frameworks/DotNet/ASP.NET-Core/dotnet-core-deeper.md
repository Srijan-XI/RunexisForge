# .NET Core / ASP.NET Core — Deeper Guide (Beyond the Basics)

This guide goes beyond the introductory ASP.NET Core material and focuses on **core .NET hosting**, **dependency injection**, **configuration**, **logging**, **HTTP client patterns**, **background services**, **health checks**, **observability**, and **testing**.

> Target runtime: .NET 8+ (most patterns work for .NET 6/7 too).

---

## Table of Contents

- [Mental Model](#mental-model)
- [The Generic Host](#the-generic-host)
- [Dependency Injection (DI) Deep Dive](#dependency-injection-di-deep-dive)
- [Configuration & Options Pattern](#configuration--options-pattern)
- [Logging (Structured)](#logging-structured)
- [Minimal APIs vs Controllers](#minimal-apis-vs-controllers)
- [HttpClientFactory + Resilience](#httpclientfactory--resilience)
- [Authentication & Authorization Patterns](#authentication--authorization-patterns)
- [Background Services & Queues](#background-services--queues)
- [Health Checks](#health-checks)
- [OpenTelemetry (Tracing + Metrics + Logs)](#opentelemetry-tracing--metrics--logs)
- [Testing (Unit + Integration)](#testing-unit--integration)
- [Production Hardening Checklist](#production-hardening-checklist)
- [Useful Commands](#useful-commands)

---

## Mental Model

Think in layers:

1. **Host**: starts your process; owns configuration + logging + DI container.
2. **Services**: long-lived objects registered into DI.
3. **Middleware pipeline**: HTTP request pipeline.
4. **Endpoints**: minimal APIs or controller actions.

Most “advanced” ASP.NET Core work is about tuning these layers.

---

## The Generic Host

Most modern ASP.NET Core apps use:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.Run();
```

Under the hood, this uses the **Generic Host**.

### Customize host defaults

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureAppConfiguration((ctx, config) =>
{
    // Add extra config sources here
    // config.AddJsonFile("appsettings.local.json", optional: true);
});

builder.Host.ConfigureLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});

var app = builder.Build();
app.Run();
```

### Environment

ASP.NET Core reads `ASPNETCORE_ENVIRONMENT` (and `DOTNET_ENVIRONMENT`).

Common values:
- `Development`
- `Staging`
- `Production`

---

## Dependency Injection (DI) Deep Dive

### Lifetimes

- **Singleton**: one instance for app lifetime
- **Scoped**: one instance per request scope
- **Transient**: new instance each resolution

Guideline:
- `DbContext` → Scoped
- Pure stateless services → Singleton or Transient
- Anything that touches request state → Scoped

### Service registration examples

```csharp
builder.Services.AddSingleton<ITimeProvider, SystemTimeProvider>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();
```

### Avoid the Service Locator

Prefer constructor injection:

```csharp
public sealed class UsersService
{
    private readonly IUserRepository _repo;

    public UsersService(IUserRepository repo)
    {
        _repo = repo;
    }
}
```

### Validate DI at startup

```csharp
builder.Host.UseDefaultServiceProvider(options =>
{
    options.ValidateScopes = builder.Environment.IsDevelopment();
    options.ValidateOnBuild = true;
});
```

---

## Configuration & Options Pattern

### Add strongly typed settings

`appsettings.json`:

```json
{
  "ExternalApi": {
    "BaseUrl": "https://api.example.com",
    "TimeoutSeconds": 10
  }
}
```

Settings type:

```csharp
public sealed class ExternalApiOptions
{
    public const string SectionName = "ExternalApi";

    public string BaseUrl { get; set; } = "";
    public int TimeoutSeconds { get; set; } = 10;
}
```

Register + bind:

```csharp
builder.Services
    .AddOptions<ExternalApiOptions>()
    .Bind(builder.Configuration.GetSection(ExternalApiOptions.SectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();
```

Consume via `IOptions<T>`:

```csharp
using Microsoft.Extensions.Options;

public sealed class ExternalApiClient
{
    private readonly ExternalApiOptions _options;

    public ExternalApiClient(IOptions<ExternalApiOptions> options)
    {
        _options = options.Value;
    }
}
```

Use `IOptionsMonitor<T>` when settings can change at runtime.

---

## Logging (Structured)

Use `ILogger<T>` and log with templates:

```csharp
public sealed class UsersController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;

    public UsersController(ILogger<UsersController> logger)
    {
        _logger = logger;
    }

    [HttpGet("/users/{id}")]
    public IActionResult GetById(string id)
    {
        _logger.LogInformation("Fetching user {UserId}", id);
        return Ok(new { id });
    }
}
```

Guidelines:
- Prefer templates over string interpolation.
- Log at the correct level (`Information`, `Warning`, `Error`).
- Avoid logging secrets.

---

## Minimal APIs vs Controllers

### Minimal API example

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { ok = true }));

app.MapPost("/users", (CreateUserRequest req) =>
{
    if (string.IsNullOrWhiteSpace(req.Email))
        return Results.BadRequest(new { error = "Email is required" });

    return Results.Created($"/users/1", new { id = 1, req.Email });
});

app.Run();

public sealed record CreateUserRequest(string Email);
```

### Controllers shine when you need

- Complex filters
- Model binding + validation attributes
- API versioning patterns
- Larger teams / conventional organization

Minimal APIs shine when you want:

- Small APIs
- Fast iteration
- Simple deployment targets

---

## HttpClientFactory + Resilience

Avoid creating `new HttpClient()` per request. Use `IHttpClientFactory`.

### Register a named client

```csharp
builder.Services.AddHttpClient("external", client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
    client.Timeout = TimeSpan.FromSeconds(10);
});
```

Consume:

```csharp
public sealed class ExternalService
{
    private readonly IHttpClientFactory _factory;

    public ExternalService(IHttpClientFactory factory)
    {
        _factory = factory;
    }

    public async Task<string> GetStatusAsync(CancellationToken ct)
    {
        var client = _factory.CreateClient("external");
        var res = await client.GetAsync("/status", ct);
        res.EnsureSuccessStatusCode();
        return await res.Content.ReadAsStringAsync(ct);
    }
}
```

### Add resilience (recommended)

In .NET 8, prefer the built-in resilience pipeline:

```csharp
// Requires: Microsoft.Extensions.Http.Resilience
builder.Services
    .AddHttpClient("external")
    .AddStandardResilienceHandler();
```

---

## Authentication & Authorization Patterns

### AuthN vs AuthZ

- **Authentication**: who you are
- **Authorization**: what you can do

### Policy-based authorization

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminsOnly", policy =>
        policy.RequireClaim("role", "admin"));
});

app.MapGet("/admin", () => Results.Ok("secret"))
   .RequireAuthorization("AdminsOnly");
```

### Common production advice

- Use short-lived access tokens + refresh tokens
- Store secrets in managed secret stores (Azure Key Vault, etc.)
- Don’t implement crypto yourself

---

## Background Services & Queues

Background services are ideal for:

- polling jobs
- email sending
- scheduled cleanup
- queue consumers

### BackgroundService example

```csharp
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public sealed class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;

    public Worker(ILogger<Worker> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Worker tick at {Time}", DateTimeOffset.UtcNow);
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }
    }
}
```

Register:

```csharp
builder.Services.AddHostedService<Worker>();
```

### In-process queue pattern

For lightweight apps, use a `Channel<T>`:

```csharp
using System.Threading.Channels;

builder.Services.AddSingleton(Channel.CreateUnbounded<Func<CancellationToken, Task>>());
```

Producer enqueues work; a hosted service drains the channel.

For real production workloads, prefer an external queue (RabbitMQ, Service Bus, SQS).

---

## Health Checks

```csharp
builder.Services.AddHealthChecks()
    .AddCheck("self", () => Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult.Healthy());

var app = builder.Build();

app.MapHealthChecks("/health");
```

Add DB checks, downstream checks, etc.

---

## OpenTelemetry (Tracing + Metrics + Logs)

OpenTelemetry gives you vendor-neutral observability.

High-level approach:

1. Add tracing for ASP.NET Core + HttpClient
2. Export to OTLP (collector) or a vendor backend

Example (conceptual):

```csharp
// Packages vary by exporter and version
// OpenTelemetry.Extensions.Hosting
// OpenTelemetry.Instrumentation.AspNetCore
// OpenTelemetry.Instrumentation.Http

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing.AddAspNetCoreInstrumentation();
        tracing.AddHttpClientInstrumentation();
        // tracing.AddOtlpExporter();
    })
    .WithMetrics(metrics =>
    {
        metrics.AddAspNetCoreInstrumentation();
        metrics.AddHttpClientInstrumentation();
        // metrics.AddOtlpExporter();
    });
```

---

## Testing (Unit + Integration)

### Unit tests

- Keep business logic in services that don’t depend on HTTP
- Mock interfaces

### Integration tests with WebApplicationFactory

```csharp
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

public sealed class ApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public ApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Health_returns_ok()
    {
        var res = await _client.GetAsync("/health");
        res.EnsureSuccessStatusCode();
    }
}
```

---

## Production Hardening Checklist

- Enforce HTTPS (`UseHttpsRedirection`, correct proxy headers)
- Centralize exception handling (`UseExceptionHandler`)
- Add request logging + correlation IDs
- Add health checks and readiness/liveness endpoints
- Add timeouts + retries for downstream calls
- Use `IHttpClientFactory`
- Avoid blocking calls in async flows
- Validate configuration on start
- Store secrets outside appsettings

---

## Useful Commands

```bash
# create
dotnet new webapi -n MyApi

# run
dotnet run

# watch (hot reload)
dotnet watch

# test
dotnet test

# publish
dotnet publish -c Release
```
