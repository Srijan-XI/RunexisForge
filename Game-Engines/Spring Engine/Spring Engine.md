# Spring Engine

## Introduction

## What is Spring RTS?

**Spring RTS Engine** (formerly known as **TA Spring**) is an open-source Real-Time Strategy (RTS) game engine originally designed as a Total Annihilation engine. It's powerful, moddable, and has been used to create numerous RTS games and mods.

---

## Why Choose Spring RTS?

- **🆓 Open Source**: Free and open-source (GPL)
- **🎮 RTS Focused**: Specifically designed for real-time strategy games
- **🔧 Highly Moddable**: Extensive Lua scripting support
- **⚔️ Battle Proven**: Used in many successful RTS mods/games
- **🌐 Multiplayer**: Built-in networking and lobby system
- **💪 Performance**: Handles large-scale battles efficiently
- **👥 Active Community**: Dedicated RTS community

---

## Key Features

### Engine Features

- **Advanced Physics**: Projectile physics, terrain deformation
- **Large Scale Battles**: Supports thousands of units
- **Terrain System**: Heightmap-based with deformable terrain
- **Lua Scripting**: Extensive modding capabilities
- **Shader Support**: GLSL shaders for custom effects
- **Pathfinding**: Advanced unit pathfinding
- **AI Support**: Lua and C++ AI interfaces

### Multiplayer

- **Built-in Lobby**: Spring Lobby for matchmaking
- **Network Play**: UDP-based networking
- **Replays**: Record and watch replays
- **Spectator Mode**: Watch live games

---

## Popular Games/Mods

1. **Beyond All Reason (BAR)** - Modern Total Annihilation remake
2. **Zero-K** - Fast-paced RTS with unique mechanics
3. **Evolution RTS** - Sci-fi RTS with economic focus
4. **Balanced Annihilation** - Classic TA-style gameplay
5. **Metal Factions** - Futuristic RTS

---

## Programming/Scripting

**Lua Scripting**:

```lua
-- Unit script example
local base = piece "base"
local turret = piece "turret"

function script.Create()
    -- Initialization
    StartThread(SmokeUnit)
end

function script.AimWeapon(weaponNum, heading, pitch)
    Turn(turret, y_axis, heading, math.rad(90))
    Turn(turret, x_axis, -pitch, math.rad(90))
    WaitForTurn(turret, y_axis)
    WaitForTurn(turret, x_axis)
    return true
end

function script.FireWeapon(weaponNum)
    EmitSfx(barrel, 1024)
end
```java

---

## System Requirements

### Minimum

- **OS**: Windows 7+, Linux, macOS
- **CPU**: Dual-core 2.0 GHz
- **RAM**: 2 GB
- **GPU**: OpenGL 2.1 compatible
- **Storage**: 500 MB

### Recommended

- **OS**: Windows 10+, Modern Linux
- **CPU**: Quad-core 3.0+ GHz
- **RAM**: 4+ GB
- **GPU**: OpenGL 4.0+ compatible with 1+ GB VRAM
- **Storage**: 2+ GB

---

## Supported Platforms

- Windows
- Linux
- macOS

---

## Best For

- RTS game development
- Total Annihilation-style games
- Large-scale warfare games
- Modders and RTS enthusiasts
- Open-source projects

---

## Learning Resources

### Official

- [Spring RTS Website](https://springrts.com/)
- [Spring Wiki](https://springrts.com/wiki/)
- [GitHub Repository](https://github.com/spring/spring)

### Community

- [Spring RTS Forums](https://springrts.com/phpbb/)
- [Discord Community](https://discord.gg/7aAQTGp)

---

Jump to the **User Guide** section below to get started.

**Build epic RTS battles! ⚔️🎮**

---

## User Guide

## Installation

### Windows

```bash
1. Download from springrts.com
2. Run installer
3. Install Spring Lobby (recommended)
```bash

### Linux

```bash
# Ubuntu/Debian
sudo apt-get install spring

# Or build from source
git clone https://github.com/spring/spring.git
cd spring
cmake .
make
sudo make install
```bash

---

## Getting Started

### Play Existing Games

```bash
1. Install Spring Lobby
2. Browse games (BAR, Zero-K, etc.)
3. Download game/maps
4. Join or host match
```bash

---

## Creating a Mod

### Basic Structure

```bash
MyMod/
├── modinfo.lua          # Mod metadata
├── gamedata/
│   ├── modrules.lua     # Game rules
│   └── explosions.lua   # Explosion definitions
├── units/               # Unit definitions
├── features/            # Feature definitions
├── weapons/             # Weapon definitions
├── scripts/             # Lua unit scripts
├── luarules/            # Game logic
└── luaui/              # UI customization
```bash

### modinfo.lua

```lua
return {
    name = "My RTS Game",
    shortName = "MYRTS",
    version = "1.0",
    game = "My RTS Game",
    shortGame = "MYRTS",
    mutator = "Official",
    description = "My awesome RTS game",
    modtype = 1,
}
```bash

---

## Unit Definition

### units/myunit.lua

```lua
return {
    myunit = {
        name = "My Unit",
        description = "Basic combat unit",
        objectName = "myunit.s3o",
        script = "myunit.lua",
        
        -- Stats
        maxDamage = 500,
        mass = 100,
        
        -- Movement
        maxVelocity = 2.5,
        acceleration = 0.5,
        brakeRate = 0.3,
        turnRate = 500,
        
        -- Weapons
        weapons = {
            {
                def = "MACHINEGUN",
            },
        },
        
        -- Economy
        buildCostMetal = 50,
        buildCostEnergy = 0,
        buildTime = 10,
    },
}
```bash

---

## Weapon Definition

### weapons/machinegun.lua

```lua
return {
    MACHINEGUN = {
        name = "Machine Gun",
        weaponType = "Cannon",
        
        damage = {
            default = 10,
        },
        
        areaOfEffect = 8,
        reloadtime = 0.1,
        range = 400,
        soundStart = "sounds/machinegun.wav",
        
        -- Ballistics
        weaponVelocity = 500,
        turret = true,
        avoidFriendly = true,
    },
}
```bash

---

## Resources

- [Spring Wiki](https://springrts.com/wiki/)
- [Modding Guide](https://springrts.com/wiki/Gamedev)
- [Lua API](https://springrts.com/wiki/Lua)

**Create your RTS! ⚔️**

