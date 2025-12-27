# Spring RTS Engine User Guide

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
