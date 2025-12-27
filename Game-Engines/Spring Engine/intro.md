# Introduction to Spring RTS Engine

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

Check the [User Guide](user-guide.md) to get started!

**Build epic RTS battles! ⚔️🎮**
