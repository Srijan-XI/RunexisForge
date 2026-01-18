# Defold

## Introduction

## What is Defold?

Defold is a free, open-source game engine built for creating 2D and 3D games for mobile, web, desktop, and console platforms. Developed and maintained by King (creators of Candy Crush), Defold uses Lua scripting and provides a complete editor, powerful tools, and a visual workflow for game development with a focus on performance and small build sizes.

## Why Defold?

- Completely free and open-source
- Tiny build sizes (< 5 MB)
- Lua scripting language
- Cross-platform deployment
- Visual editor
- Built-in physics (2D and 3D)
- Powerful collection and factory system
- Native extensions
- Live updates
- Excellent performance
- Strong community support

## Prerequisites

- Basic programming knowledge
- Lua fundamentals (easy to learn)
- Understanding of game development concepts
- Windows, macOS, or Linux computer

## Installation

### Download Defold Editor

1. Visit [defold.com](https://defold.com/download/)
2. Download editor for your platform
3. Extract and run

### Create New Project

```
1. Open Defold Editor
2. File → New Project
3. Choose template (Empty, Platformer, etc.)
4. Select location
5. Click Create
```

## Project Structure

```
myproject/
├── main/
│   ├── main.collection        # Main scene
│   ├── main.script            # Main script
│   └── assets/                # Game assets
├── input/
│   └── game.input_binding     # Input configuration
├── game.project               # Project settings
└── .defignore                 # Ignore files
```

## Basic Concepts

### Game Objects

```lua
-- Create game object via editor or code
go.property("speed", 100)

function init(self)
    -- Initialize game object
    print("Game object created!")
end

function update(self, dt)
    -- Called every frame
    local pos = go.get_position()
    pos.x = pos.x + self.speed * dt
    go.set_position(pos)
end
```

### Components

- **Sprite**: 2D graphics
- **Model**: 3D graphics
- **Script**: Game logic (Lua)
- **Collision Object**: Physics/collision
- **Sound**: Audio
- **Particle FX**: Particle effects
- **GUI**: User interface
- **Label**: Text rendering

## Lua Scripting

### Basic Script

```lua
-- player.script

-- Properties (exposed in editor)
go.property("speed", 100)
go.property("jump_power", 500)

function init(self)
    -- Initialization
    msg.post(".", "acquire_input_focus")
    self.velocity = vmath.vector3()
end

function final(self)
    -- Cleanup
end

function update(self, dt)
    -- Game loop (60 FPS default)
    local pos = go.get_position()
    pos = pos + self.velocity * dt
    go.set_position(pos)
end

function on_input(self, action_id, action)
    -- Handle input
    if action_id == hash("jump") and action.pressed then
        self.velocity.y = self.jump_power
    end
end

function on_message(self, message_id, message, sender)
    -- Handle messages
    if message_id == hash("collision_response") then
        -- Handle collision
    end
end
```

## Sprites and Animation

### Sprite Component

```lua
-- Set sprite animation
sprite.play_flipbook("#sprite", "walk")

-- Stop animation
sprite.stop("#sprite")

-- Set frame
sprite.set_hflip("#sprite", true)
sprite.set_vflip("#sprite", false)

-- Tint
sprite.set_constant("#sprite", "tint", vmath.vector4(1, 0, 0, 1))
```

### Atlas and Animations

```
1. Right-click → New → Atlas
2. Add images
3. Right-click → New → Animation
4. Set animation groups
```

## Physics and Collision

### Collision Objects

```lua
-- Add collision object component in editor
-- Types: dynamic, kinematic, static, trigger

-- In script:
function on_message(self, message_id, message, sender)
    if message_id == hash("collision_response") then
        -- Collision detected
        local other_group = message.other_group
        local normal = message.normal
        
        if other_group == hash("enemy") then
            -- Take damage
        end
    end
    
    if message_id == hash("trigger_response") then
        -- Entered trigger zone
        if message.enter then
            print("Entered trigger!")
        end
    end
end
```

### Physics Properties

```lua
-- Set velocity
physics.set_velocity("#collisionobject", vmath.vector3(100, 0, 0))

-- Apply force
physics.apply_force("#collisionobject", vmath.vector3(0, 1000, 0))

-- Ray cast
local from = vmath.vector3(0, 0, 0)
local to = vmath.vector3(100, 0, 0)
local result = physics.raycast(from, to, { hash("player") })

if result then
    print("Hit:", result.position)
end
```

## Input Handling

### Input Bindings

```
1. Open input/game.input_binding
2. Add key triggers
3. Add mouse/touch triggers
4. Add gamepad triggers
```

### Processing Input

```lua
function on_input(self, action_id, action)
    if action_id == hash("left") then
        if action.pressed then
            self.moving_left = true
        elseif action.released then
            self.moving_left = false
        end
    end
    
    if action_id == hash("touch") then
        if action.pressed then
            local touch_pos = vmath.vector3(action.x, action.y, 0)
            print("Touch at:", touch_pos)
        end
    end
end
```

## Sound and Music

### Playing Audio

```lua
-- Play sound
sound.play("#sound", { delay = 0, gain = 1.0 })

-- Stop sound
sound.stop("#sound")

-- Play music (looping)
sound.play("#music", { delay = 0, gain = 0.5 })

-- Set volume
sound.set_gain("#music", 0.8)
```

## GUI

### GUI Script

```lua
-- gui_script.gui_script

function init(self)
    self.score = 0
end

function update(self, dt)
    -- Update GUI
end

function on_input(self, action_id, action)
    if action_id == hash("touch") and action.pressed then
        local button_node = gui.get_node("start_button")
        
        if gui.pick_node(button_node, action.x, action.y) then
            -- Button clicked
            print("Start clicked!")
        end
    end
end

function on_message(self, message_id, message, sender)
    if message_id == hash("update_score") then
        self.score = message.score
        local score_node = gui.get_node("score_text")
        gui.set_text(score_node, "Score: " .. self.score)
    end
end
```

### GUI Operations

```lua
-- Set text
local node = gui.get_node("text")
gui.set_text(node, "Hello World")

-- Set color
gui.set_color(node, vmath.vector4(1, 0, 0, 1))

-- Position
gui.set_position(node, vmath.vector3(100, 200, 0))

-- Scale
gui.set_scale(node, vmath.vector3(2, 2, 1))

-- Animate
gui.animate(node, "position.y", 500, gui.EASING_INOUTSINE, 1, 0, nil, gui.PLAYBACK_LOOP_PINGPONG)
```

## Messaging System

### Sending Messages

```lua
-- Send to specific game object
msg.post("player#script", "take_damage", { amount = 10 })

-- Send to self
msg.post(".", "reload")

-- Send to URL
msg.post(url("/level", "enemy", "script"), "spawn")

-- Broadcast
msg.post("/level#level_controller", "level_complete")
```

### Message Types

```lua
function on_message(self, message_id, message, sender)
    if message_id == hash("take_damage") then
        self.health = self.health - message.amount
    elseif message_id == hash("spawn") then
        factory.create("#enemy_factory")
    end
end
```

## Collections and Factories

### Collections

```
Collections are reusable groups of game objects

1. Right-click → New → Collection
2. Add game objects
3. Use as template
```

### Factory Component

```lua
-- Spawn from factory
local props = { speed = 150 }
local id = factory.create("#enemy_factory", nil, nil, props)

-- Destroy
go.delete(id)

-- With callback
factory.create("#bullet_factory", go.get_position(), nil, {}, function(url, id)
    print("Spawned:", id)
end)
```

## Particle Effects

```lua
-- Play particle effect
particlefx.play("#explosion")

-- Stop
particlefx.stop("#explosion")

-- Set constant
particlefx.set_constant("#explosion", "emitter", "tint", vmath.vector4(1, 0, 0, 1))
```

## Camera

```lua
-- Follow player
function update(self, dt)
    local player_pos = go.get_position("player")
    local camera_pos = go.get_position()
    
    -- Smooth follow
    camera_pos.x = camera_pos.x + (player_pos.x - camera_pos.x) * 0.1
    camera_pos.y = camera_pos.y + (player_pos.y - camera_pos.y) * 0.1
    
    go.set_position(camera_pos)
end
```

## Tilemaps

### Creating Tilemap

```
1. Right-click → New → Tile Source
2. Add tileset image
3. Right-click → New → Tile Map
4. Paint tiles
```

### Tilemap Operations

```lua
-- Get tile
local tile = tilemap.get_tile("#tilemap", "layer1", 10, 10)

-- Set tile
tilemap.set_tile("#tilemap", "layer1", 10, 10, 5)

-- Get world position
local pos = tilemap.get_tile_position("#tilemap", "layer1", 10, 10)
```

## Native Extensions

### Creating Extension

```bash
# Add extension dependency to game.project
[library]
include_dirs = myextension/include
```

```c
// C/C++ code
#include <dmsdk/sdk.h>

static int MyFunction(lua_State* L) {
    // Native code
    return 0;
}

static const luaL_reg Module_methods[] = {
    {"myFunction", MyFunction},
    {0, 0}
};

dmExtension::Result AppInitializeExtension(dmExtension::AppParams* params) {
    return dmExtension::RESULT_OK;
}

DM_DECLARE_EXTENSION(MyExtension, "MyExtension", AppInitializeExtension, 0, 0, 0)
```

## Building and Deployment

### Build Settings

```
Project → Build Settings
- Target Platform (iOS, Android, Web, etc.)
- Architectures
- Bundle Resources
- Custom Resources
```

### Publishing

```
Project → Bundle → Platform
- Creates executable
- Ready for distribution
```

## Live Update

```lua
-- Download content update
http.request("https://example.com/update.zip", "GET", function(self, id, response)
    if response.status == 200 then
        resource.store_resource(resource.load("/updates.zip"))
    end
end)
```

## Debugging

```lua
-- Print to console
print("Debug message")
pprint(table)  -- Pretty print table

-- Assert
assert(value ~= nil, "Value is nil!")

-- Profiling
profiler.enable_ui()
```

## Best Practices

### Performance

```lua
-- Object pooling
local pool = {}

function spawn_bullet()
    local bullet
    if #pool > 0 then
        bullet = table.remove(pool)
        go.set_position(bullet_pos, bullet)
    else
        bullet = factory.create("#bullet_factory", bullet_pos)
    end
    return bullet
end

function despawn_bullet(bullet)
    go.set_position(vmath.vector3(0, -1000, 0), bullet)
    table.insert(pool, bullet)
end
```

### Memory Management

```lua
-- Clean up resources
function final(self)
    -- Release resources
    self.large_table = nil
end
```

## Common Patterns

### State Machine

```lua
local states = {
    idle = function(self, dt)
        -- Idle logic
    end,
    running = function(self, dt)
        -- Running logic
    end,
    jumping = function(self, dt)
        -- Jumping logic
    end
}

function init(self)
    self.state = "idle"
end

function update(self, dt)
    states[self.state](self, dt)
end
```

## Mobile Development

### Touch Input

```lua
function on_input(self, action_id, action)
    if action_id == hash("touch") then
        if action.pressed then
            self.touch_start = vmath.vector3(action.x, action.y, 0)
        elseif action.released then
            local touch_end = vmath.vector3(action.x, action.y, 0)
            local swipe = touch_end - self.touch_start
            
            if swipe.x > 50 then
                -- Swipe right
            end
        end
    end
end
```

## Web Deployment

```
1. Project → Bundle → HTML5
2. Upload to web server
3. Access via browser
```

## Resources

- [Defold Website](https://defold.com/)
- [Documentation](https://defold.com/learn/)
- [API Reference](https://defold.com/ref/)
- [Forum](https://forum.defold.com/)
- [Asset Portal](https://defold.com/assets/)
- [Examples](https://defold.com/examples/)

## Next Steps

- Complete tutorials
- Build sample games
- Learn Lua in depth
- Explore extensions
- Join community
- Publish games
- Contribute to Defold
