# Love 2D

## Introduction

### What is LÖVE?
LÖVE (Love 2D) is an *awesome* framework you can use to make 2D games in Lua. It's free, open-source, and works on Windows, macOS, Linux, Android, and iOS. LÖVE provides a simple yet powerful API that handles the heavy lifting of game development, allowing you to focus on your game logic.

### Why LÖVE?
- **Lua-based**: Lua is a lightweight, easy-to-learn scripting language.
- **Cross-Platform**: Write code once, run it everywhere.
- **Fast Development**: Changes can be tested instantly.
- **Massive Community**: Extensive wiki, forums, and libraries.
- **Minimalist**: You get what you need, nothing you don't.

## Prerequisites
- **Lua Knowledge**: Basic understanding of Lua syntax (tables, functions, loops).
- **Text Editor**: VS Code, Sublime Text, or strictly for Lua: ZeroBrane Studio.
- **LÖVE Installed**: The runtime executable.

## Installation

### Windows
1. Go to the [official website](https://love2d.org/).
2. Download the installer for your architecture (64-bit).
3. Run the installer.

### macOS
1. Download the `.zip` from the website.
2. Drag `love.app` to your Applications folder.

### Linux
Ubuntu/Debian:
```bash
sudo add-apt-repository ppa:bartbes/love-stable
sudo apt-get update
sudo apt-get install love
```

## Project Structure
A LÖVE game is just a folder (or a `.love` zip file) containing a `main.lua` file.

```
MyGame/
├── main.lua        # Entry point (Required)
├── conf.lua        # Configuration (Optional)
└── assets/         # Images, sounds, fonts
    ├── player.png
    └── jump.wav
```

## Basic Game Structure

The `main.lua` file uses three main callbacks:

```lua
-- main.lua

-- Called once at startup
function love.load()
    x = 100
    y = 100
    speed = 200
end

-- Called every frame (dt is delta time in seconds)
function love.update(dt)
    if love.keyboard.isDown("right") then
        x = x + speed * dt
    elseif love.keyboard.isDown("left") then
        x = x - speed * dt
    end

    if love.keyboard.isDown("down") then
        y = y + speed * dt
    elseif love.keyboard.isDown("up") then
        y = y - speed * dt
    end
end

-- Called every frame to draw on screen
function love.draw()
    love.graphics.print("Hello LÖVE!", 400, 300)
    love.graphics.circle("fill", x, y, 50)
end
```

## Configuration (`conf.lua`)
This file allows you to set window properties before the game starts.

```lua
-- conf.lua
function love.conf(t)
    t.window.title = "My Awesome Game"
    t.window.width = 800
    t.window.height = 600
    t.window.resizable = false
    t.console = true -- Attach a console (Windows only)
end
```

## Graphics

### Drawing Images
```lua
function love.load()
    playerImg = love.graphics.newImage("assets/player.png")
end

function love.draw()
    -- Draw image at x, y
    love.graphics.draw(playerImg, 100, 100)
end
```

### Colors
LÖVE uses 0-1 range for RGBA.
```lua
love.graphics.setColor(1, 0, 0) -- Red
love.graphics.rectangle("fill", 10, 10, 50, 50)
love.graphics.setColor(1, 1, 1) -- Reset to white/normal
```

## Input Handling

### Keyboard
Checking entry within `love.update`:
```lua
if love.keyboard.isDown("space") then
    fireLaser()
end
```

Single key press event:
```lua
function love.keypressed(key)
    if key == "escape" then
        love.event.quit()
    end
end
```

### Mouse
```lua
function love.mousepressed(x, y, button, istouch)
    if button == 1 then -- Left click
        print("Clicked at: " .. x .. ", " .. y)
    end
end
```

## Audio

### Sound Effects (Static)
Load completely into memory. Great for short sounds.
```lua
function love.load()
    sfx = love.audio.newSource("assets/jump.wav", "static")
end

function love.keypressed(key)
    if key == "space" then
        sfx:play()
    end
end
```

### Music (Stream)
Streamed from disk. Great for background music.
```lua
function love.load()
    music = love.audio.newSource("assets/bgm.mp3", "stream")
    music:setLooping(true)
    music:play()
end
```

## Physics
LÖVE includes a wrapper around Box2D.

```lua
function love.load()
    -- Create world with gravity (x=0, y=9.81*64)
    -- LÖVE uses meters, so we scale inputs (1 meter = 64 pixels usually)
    world = love.physics.newWorld(0, 9.81 * 64, true)

    -- Create a body
    objects = {}
    objects.body = love.physics.newBody(world, 400, 200, "dynamic")
    objects.shape = love.physics.newCircleShape(20)
    objects.fixture = love.physics.newFixture(objects.body, objects.shape, 1)
end

function love.update(dt)
    world:update(dt)
end

function love.draw()
    love.graphics.circle("line", objects.body:getX(), objects.body:getY(), objects.shape:getRadius())
end
```

## Libraries
LÖVE has a "do it yourself" philosophy, but many libraries exist to fill gaps:
- **Classic**: Class system for Lua.
- **Push**: Resolution handling.
- **Windfield**: Simplified physics.
- **STI**: Tiled map loader.
- **Suits**: Immediate mode UI.

To use a library:
1. Download `library.lua`.
2. `require` it in `main.lua`.

```lua
Class = require 'classic'
player = Class()
```

## Packaging / Distribution

### Windows
1. Zip your game contents (select files inside folder -> Send to Zip). Rename to `game.love`.
2. Combine with `love.exe`:
   `copy /b love.exe+game.love game.exe`
3. Distribute `game.exe` along with `love.dll`, `lua51.dll`, etc.

## Resources
- [Wiki](https://love2d.org/wiki/) - The Bible of LÖVE development.
- [Forums](https://love2d.org/forums/) - Very active community.
- [Awesome LÖVE](https://github.com/love2d-community/awesome-love2d) - List of libraries.
- [CS50 Introduction to Game Development](https://cs50.harvard.edu/games/) - Uses LÖVE for the first half of the course.
