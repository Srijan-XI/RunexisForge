# C# Installation and Usage Guide

## Install .NET SDK
- Download .NET 6+ from https://dotnet.microsoft.com/en-us/download
- Verify: `dotnet --version`

## Create and Run a Console App
```bash
dotnet new console -n HelloCs
cd HelloCs
dotnet run
```

## Minimal Program
```csharp
Console.WriteLine("Hello, C#");
```

## Simple API with ASP.NET Core
```bash
dotnet new webapi -n TodoApi
cd TodoApi
dotnet run
```
- Default endpoint: https://localhost:5001/swagger

## Packages
```bash
dotnet add package Newtonsoft.Json
```

## Build and Test
```bash
dotnet build
dotnet test
```

## Project Layout (SDK-style)
```
MyApp/
├── Program.cs
├── MyApp.csproj
└── Properties/
```

## Next Steps
- Explore async/await and LINQ
- Use records and pattern matching for concise models
- Configure `appsettings.json` for environment-specific settings
