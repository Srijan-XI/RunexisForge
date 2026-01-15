# CSharp

## Introduction

## Overview

C# is a modern, object-oriented language in the .NET ecosystem for building web, desktop, mobile, cloud, and game applications.

## Key Features

- Strong typing with generics and async/await
- Rich standard library on .NET
- Cross-platform via .NET 6+ runtime
- LINQ for expressive data queries
- First-class tooling in Visual Studio and VS Code

## Common Use Cases

- ASP.NET Core web APIs and MVC
- Cross-platform apps with .NET MAUI
- Game development with Unity
- Cloud-native microservices
- Windows services and desktop apps

## Essentials

- Managed runtime with garbage collection
- Projects defined by .csproj; restored via `dotnet restore`
- NuGet for package management
- Supports functional patterns (records, pattern matching)

## Resources

- Official docs: <https://learn.microsoft.com/dotnet/csharp/>
- .NET SDK: <https://dotnet.microsoft.com/en-us/download>
- NuGet: <https://www.nuget.org>

---

## User Guide

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

