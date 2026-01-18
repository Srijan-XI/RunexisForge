# FNA

## Introduction

### What is FNA?
FNA is a reimplementation of the Microsoft XNA 4.0 Refresh libraries. It is developed by Ethan Lee and focused on **accuracy** and **preservation** of the XNA spec. Unlike MonoGame, which extends XNA with new features, FNA aims to be an exact drop-in replacement that runs on modern platforms (desktop only).

### Why FNA?
- **Accuracy**: Extremely faithful to the original XNA behavior.
- **Stability**: Minimal changes, rock-solid stability.
- **Portability**: Runs on Windows, Linux, and macOS.
- **No Installation**: Shipped as libraries/dlls, no SDK installer required.
- **Independent**: Does not depend on .NET implementations other than the runtime.

## MonoGame vs FNA
- **MonoGame**: Broad platform support (Consoles, Mobile), Modern .NET features, Content Pipeline tool included.
- **FNA**: Desktop (Win/Mac/Lin) focus, Focus on preservation, extremely lightweight, preferred by many indie porters.

## Installation

FNA is usually installed by creating a project and dropping the libraries in, or using a template.

### Using `dotnet new` (Unofficial Templates)
Often the easiest way for new users.
```bash
dotnet new install FontStashSharp.FNA.Templates
dotnet new fna -n MyFNAGame
```

### Manual Setup
1. Download a pre-packaged FNA engine repository or submodule [FNA](https://github.com/FNA-XNA/FNA).
2. You need the native libraries (fnalibs) for SDL2, FAudio, and Theorafile.
   - Download `fnalibs.tar.gz` from the FNA website.

## Project Structure
Similar to MonoGame/XNA.

```
MyGame/
├── fnalibs/             # Native dependencies (SDL2.dll etc)
├── Content/             # Content
├── Game1.cs             # Main Game Class
└── MyGame.csproj        # Project file
```

## Usage
The code is almost **identical** to XNA 4.0 and MonoGame.

```csharp
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

public class Game1 : Game
{
    private GraphicsDeviceManager _graphics;
    private SpriteBatch _spriteBatch;

    public Game1()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
    }

    // ... Initialize, LoadContent, Update, Draw
    // Identical to MonoGame see MonoGame.md
}
```

## Content Management
FNA does **not** have a built-in content compiler like MonoGame's MGCB.
You have two options:
1. **Runtime Content**: Load .png, .wav directly (recommended for many).
2. **XNB Content**: Compile XNBs using XNA or MonoGame's builder and load them in FNA.

### Loading Raw Files (FNA specific helper commonly added)

```csharp
// Using FileStream for raw textures
using (var stream = File.OpenRead("Content/image.png"))
{
    texture = Texture2D.FromStream(GraphicsDevice, stream);
}
```

## Resources
- [FNA Website](https://fna-xna.github.io/)
- [GitHub w/ Wiki](https://github.com/FNA-XNA/FNA/wiki)
- [fnalibs](https://fna-xna.github.io/) - Required native libraries.

## Next Steps
1. Clone the `FNA` repo.
2. Download `fnalibs`.
3. Build the `FNAPlatformer` example to verify your setup.
