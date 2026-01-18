# MonoGame

## Introduction

### What is MonoGame?
MonoGame is an open-source implementation of the Microsoft XNA 4 Framework. It is a "bring your own tools" framework that allows you to build games for Windows, macOS, Linux, Android, iOS, PlayStation, Xbox, and Nintendo Switch using C# and .NET.

### Why MonoGame?
- **XNA Heritage**: Based on the battle-tested XNA framework.
- **Cross-Platform**: Write once, deploy everywhere (console support requires native SDKs).
- **Proven Track Record**: Used for *Stardew Valley*, *Celeste*, *Bastion*, *Terraria*.
- **Flexible**: Low-level enough to be performant, high-level enough to be productive.
- **Content Pipeline**: Powerful asset processing tool (MGCB).

## Prerequisites
- **C# Knowledge**: Classes, Inheritance, Interfaces.
- **.NET SDK**: .NET 6.0 or later.
- **IDE**: Visual Studio 2022 (recommended) or VS Code.

## Installation

### Visual Studio 2022
1. Install the "MonoGame Extension" from the Marketplace.
2. File -> New Project -> MonoGame Cross-Platform Desktop app.

### CLI (VS Code / Terminal)
1. Install templates:
   ```bash
   dotnet new install MonoGame.Templates.CSharp
   ```
2. Create project:
   ```bash
   dotnet new mgdesktopgl -n MyGame
   ```

## Project Structure

```
MyGame/
├── Content/
│   ├── Content.mgcb        # Content pipeline configuration
│   └── bin/                # Compiled assets
├── Game1.cs               # Main game logic
├── Program.cs             # Entry point
└── MyGame.csproj          # Project file
```

## Basic Game Loop (`Game1.cs`)

Inherits from `Game`.

```csharp
public class Game1 : Game
{
    private GraphicsDeviceManager _graphics;
    private SpriteBatch _spriteBatch;

    public Game1()
    {
        _graphics = new GraphicsDeviceManager(this);
        Content.RootDirectory = "Content";
        IsMouseVisible = true;
    }

    protected override void Initialize()
    {
        // Add initialization logic here
        base.Initialize();
    }

    protected override void LoadContent()
    {
        _spriteBatch = new SpriteBatch(GraphicsDevice);
        // Load textures settings here
    }

    protected override void Update(GameTime gameTime)
    {
        if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed || Keyboard.GetState().IsKeyDown(Keys.Escape))
            Exit();

        // Update logic
        base.Update(gameTime);
    }

    protected override void Draw(GameTime gameTime)
    {
        GraphicsDevice.Clear(Color.CornflowerBlue);

        // Drawing code
        base.Draw(gameTime);
    }
}
```

## Content Pipeline (MGCB)
MonoGame uses a special content build pipeline to optimize assets.
- **Images** -> .xnb
- **Audio** -> .xnb / .wma / .mp3

Use the **MGCB Editor** (GUI tool) to add assets to `Content.mgcb`.

```csharp
// LoadContent
private Texture2D _playerTexture;

protected override void LoadContent()
{
    _spriteBatch = new SpriteBatch(GraphicsDevice);
    _playerTexture = Content.Load<Texture2D>("player"); // Matches filename
}
```

## Graphics (SpriteBatch)

```csharp
protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.Black);

    _spriteBatch.Begin();
    
    // Draw simple
    _spriteBatch.Draw(_playerTexture, new Vector2(100, 100), Color.White);

    // Draw Source Rectangle (Spritesheet)
    _spriteBatch.Draw(_playerTexture, new Vector2(200, 200), new Rectangle(0, 0, 32, 32), Color.White);

    _spriteBatch.End();

    base.Draw(gameTime);
}
```

## Input Handling

MonoGame uses polling for input.

```csharp
protected override void Update(GameTime gameTime)
{
    var kstate = Keyboard.GetState();
    var mstate = Mouse.GetState();

    if (kstate.IsKeyDown(Keys.Right))
        playerPosition.X += speed * (float)gameTime.ElapsedGameTime.TotalSeconds;

    if (mstate.LeftButton == ButtonState.Pressed)
    {
        // Mouse click logic
    }

    base.Update(gameTime);
}
```

## Audio

```csharp
// Load
SoundEffect _jumpSound;
Song _bgm;

_jumpSound = Content.Load<SoundEffect>("jump");
_bgm = Content.Load<Song>("background_music");

// Play
_jumpSound.Play();

MediaPlayer.Play(_bgm);
MediaPlayer.IsRepeating = true;
```

## Resources
- [MonoGame Website](https://www.monogame.net/)
- [Documentation](https://docs.monogame.net/)
- [Community Forums](https://community.monogame.net/)
- [Discord](https://discord.gg/monogame)

## Next Steps
1. Create a "Hello World" sprite movement.
2. Learn to use the **MGCB Editor**.
3. Implement a simple game loop (Update/Draw).
4. Explore 3rd party libraries like **MonoGame.Extended**.
