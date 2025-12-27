# C# Installation and Usage Guide

## Install .NET SDK

- Download .NET 6+ from <https://dotnet.microsoft.com/en-us/download>
- Verify: `dotnet --version`

## Create and Run a Console App

```bash
dotnet new console -n HelloCs
cd HelloCs
dotnet run
```bash

## Minimal Program

```csharp
Console.WriteLine("Hello, C#");
```bash

## Simple API with ASP.NET Core

```bash
dotnet new webapi -n TodoApi
cd TodoApi
dotnet run
```bash

- Default endpoint: <https://localhost:5001/swagger>

## Packages

```bash
dotnet add package Newtonsoft.Json
```bash

## Build and Test

```bash
dotnet build
dotnet test
```bash

## Project Layout (SDK-style)

```bash
MyApp/
├── Program.cs
├── MyApp.csproj
└── Properties/
```bash

## Next Steps

- Explore async/await and LINQ
- Use records and pattern matching for concise models
- Configure `appsettings.json` for environment-specific settings
