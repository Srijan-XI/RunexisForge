# GameMaker Studio User Guide

## Installation

1. Visit [gamemaker.io](https://gamemaker.io/)
2. Download GameMaker
3. Install and create account
4. Log in to activate

---

## Creating Your First Project

### New Project

```bash
1. File → New → Project
2. Choose blank project or template
3. Set project name and location
4. Click Create
```bash

---

## Interface Overview

### Main Components

- **Resource Tree**: Project assets (left)
- **Workspace**: Main editing area (center)
- **Inspector**: Properties (right)
- **Output**: Debug/compile messages (bottom)

---

## Creating a Sprite

```bash
1. Right-click "Sprites" → Create Sprite
2. Name it (e.g., "spr_player")
3. Import image or Edit Image
4. Set origin point (center/top-left)
5. Configure collision mask
```bash

---

## Creating an Object

```bash
1. Right-click "Objects" → Create Object
2. Name it (e.g., "obj_player")
3. Assign sprite
4. Add Events:
   - Create Event
   - Step Event  
   - Draw Event
   - Collision Events
```bash

---

## GML Code Examples

### Movement (Step Event)

```gml
// Keyboard movement
if (keyboard_check(ord("W"))) {
    y -= 4;
}
if (keyboard_check(ord("S"))) {
    y += 4;
}
if (keyboard_check(ord("A"))) {
    x -= 4;
}
if (keyboard_check(ord("D"))) {
    x += 4;
}
```bash

### Shooting (Mouse Event)

```gml
// Left Mouse Pressed
if (mouse_check_button_pressed(mb_left)) {
    var bullet = instance_create_layer(x, y, "Instances", obj_bullet);
    bullet.direction = point_direction(x, y, mouse_x, mouse_y);
    bullet.speed = 10;
}
```bash

### Collision (Collision Event with obj_enemy)

```gml
// Destroy both objects
instance_destroy(other);
instance_destroy();
```bash

### Score System (Create Event)

```gml
// Initialize
global.score = 0;
```bash

```gml
// When collecting coin (Collision Event)
global.score += 10;
instance_destroy(other);
```bash

### Draw Score (Draw GUI Event)

```gml
draw_text(10, 10, "Score: " + string(global.score));
```bash

---

## Creating a Room (Level)

```bash
1. Right-click "Rooms" → Create Room
2. Room Editor opens
3. Layers panel (left):
   - Background layer
   - Instances layer
   - Tiles layer
4. Drag objects from Resources to room
5. Set room size in Room Properties
6. Set room order (which room is first)
```bash

---

## Working with Tiles

```bash
1. Create Tile Set:
   - Right-click "Tile Sets" → Create
   - Import tile sheet
   - Set tile size (e.g., 32x32)
2. In Room Editor:
   - Select Tiles layer
   - Choose tile set
   - Paint tiles in room
```bash

---

## Audio

### Adding Sound

```bash
1. Right-click "Sounds" → Create Sound
2. Import audio file (.wav, .ogg, .mp3)
3. Set properties (loop, volume)
```bash

### Playing Sound (GML)

```gml
// Play sound once
audio_play_sound(snd_shoot, 1, false);

// Play looping music
audio_play_sound(snd_music, 1, true);

// Stop sound
audio_stop_sound(snd_music);
```bash

---

## Particles

### Simple Particle System

```gml
// Create Event
particle_system = part_system_create();
particle_type = part_type_create();

part_type_shape(particle_type, pt_shape_flare);
part_type_size(particle_type, 0.1, 0.5, 0, 0);
part_type_color1(particle_type, c_yellow);
part_type_alpha2(particle_type, 1, 0);
part_type_speed(particle_type, 1, 3, 0, 0);
part_type_direction(particle_type, 0, 360, 0, 0);
part_type_life(particle_type, 20, 40);

// Step Event
part_particles_create(particle_system, x, y, particle_type, 1);

// Clean Up Event
part_type_destroy(particle_type);
part_system_destroy(particle_system);
```bash

---

## Physics

### Enable Physics (Object Properties)

```bash
1. Select object
2. Check "Uses Physics"
3. Set Physics properties:
   - Density: 0.5
   - Restitution: 0.1 (bounce)
   - Friction: 0.2
```bash

### Apply Force (GML)

```gml
// Apply impulse
physics_apply_impulse(x, y, 0, -100);

// Apply force
physics_apply_force(x, y, force_x, force_y);
```bash

---

## Debugging

### Debug Mode

```bash
F5 - Run game
F6 - Run with debugger
F7 - Compile
```bash

### Debug Output

```gml
// Print to output
show_debug_message("Player position: " + string(x) + ", " + string(y));

// Display on screen
draw_text(10, 30, "FPS: " + string(fps));
```text

---

## Building Your Game

### Create Executable

```text
1. Build → Create Executable
2. Choose platform (Windows, macOS, etc.)
3. Set options:
   - Icon
   - Version info
   - Installer
4. Click "Create"
```bash

### Export Settings

```bash
Game Options → Platform:
- Graphics settings
- Audio settings
- Window size
- Fullscreen mode
```bash

---

## Best Practices

1. **Naming**: Use prefixes (spr_, obj_, snd_)
2. **Organization**: Group related resources
3. **Comments**: Document your code
4. **Clean Code**: Use functions for reusable code
5. **Test Often**: Run game frequently
6. **Version Control**: Use Git
7. **Optimize**: Profile performance

---

## Common Functions

```gml
// Instance
instance_create_layer(x, y, layer, obj)
instance_destroy()
instance_exists(obj)

// Movement
move_towards_point(x, y, speed)
x += lengthdir_x(speed, direction)
y += lengthdir_y(speed, direction)

// Collision
place_meeting(x, y, obj)
collision_point(x, y, obj, prec, notme)

// Drawing
draw_sprite(sprite, subimg, x, y)
draw_text(x, y, text)
draw_rectangle(x1, y1, x2, y2, outline)
draw_circle(x, y, r, outline)

// Random
random(x)
random_range(min, max)
irandom(x)
choose(val1, val2, val3, ...)

// Math
abs(x)
sign(x)
round(x)
clamp(value, min, max)
lerp(a, b, amount)
point_distance(x1, y1, x2, y2)
point_direction(x1, y1, x2, y2)

// Game
game_end()
room_goto(room)
room_restart()
```bash

---

## Resources

- [GameMaker Manual](https://manual.yoyogames.com/)
- [Official Tutorials](https://gamemaker.io/en/tutorials)
- [Shaun Spalding YouTube](https://www.youtube.com/c/ShaunSpalding)
- [r/gamemaker](https://www.reddit.com/r/gamemaker/)

**Happy game making! 🎮**
