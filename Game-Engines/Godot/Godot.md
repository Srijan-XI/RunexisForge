# 🎮 Godot Engine

> *"Godot: The Free, Open-Source Game Engine That Puts You in Control"*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [What is Godot Used For?](#what-is-godot-used-for)
4. [Advantages](#advantages)
5. [Disadvantages](#disadvantages)
6. [Godot vs Unity vs Unreal](#godot-vs-unity-vs-unreal)
7. [Who Should Use Godot?](#who-should-use-godot)
8. [Learning Resources](#learning-resources)
9. [User Guide](#user-guide)
    - [Installation](#installation)
    - [Editor Overview](#editor-overview)
    - [Scene & Node System](#scene--node-system)
    - [GDScript Basics](#gdscript-basics)
    - [Signals](#signals)
    - [Physics & Collision](#physics--collision)
    - [Input Handling](#input-handling)
    - [UI & Canvas](#ui--canvas)
    - [Audio](#audio)
    - [Saving & Loading Data](#saving--loading-data)
    - [Exporting Your Game](#exporting-your-game)
    - [Best Practices](#best-practices)

---

## Introduction

**Godot** is a free, open-source, cross-platform game engine for building 2D and 3D games. It was founded by Juan Linietsky and Ariel Manzur in Argentina, released publicly in 2014, and has since grown into one of the most popular independent game engines in the world — fully community-driven with no royalties or licensing fees.

With Godot 4 (released 2023), the engine received a massive overhaul: a new rendering architecture (Vulkan/GLES3), GDScript 2.0, improved 3D capabilities, and a more powerful physics engine.

### History & Context

| Attribute | Detail |
|-----------|--------|
| **Created by** | Juan Linietsky & Ariel Manzur |
| **First Public Release** | January 2014 |
| **Current Version** | Godot 4.x (Godot 3.x LTS still maintained) |
| **License** | MIT (completely free, no royalties) |
| **Scripting Languages** | GDScript, C#, C++ (GDExtension) |
| **Platforms** | Windows, macOS, Linux, iOS, Android, HTML5, Consoles (via exporter) |

### Why Godot Stands Out

- **Truly free** — MIT license, no engine fee, no revenue share, ever
- **Self-contained** — the editor is a single executable (~100 MB), no installer needed
- **Node/Scene architecture** — clean, composable, and beginner-friendly
- **GDScript** — Python-like scripting designed specifically for games, fast to write

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Scene System** | Everything is a reusable Scene; scenes can contain other scenes |
| **Node Architecture** | Composable node tree — add behaviors by adding nodes |
| **GDScript** | Built-in Python-like language optimized for game dev |
| **C# Support** | Full .NET C# support (Godot 4 uses .NET 6+) |
| **GDExtension** | High-performance C/C++ extensions |
| **2D Engine** | Dedicated 2D pipeline with pixel-perfect rendering |
| **3D Engine** | Vulkan renderer with GlobalIllumination, VoxelGI, SDFGI |
| **Signals** | Built-in observer pattern for decoupled communication |
| **Animation Player** | Keyframe-based animation for any property |
| **ShaderLang** | Custom GLSL-like shader language built into the editor |
| **No Black Box** | Full source code available — you can fix engine bugs yourself |
| **Export Templates** | Single-click export to Windows, macOS, Linux, mobile, web |

---

## What is Godot Used For?

### 🕹️ 2D Games (Godot Excels Here)
- **Platformers** — pixel art, physics-based
- **Top-down RPGs** — Zelda-like games
- **Puzzle games** — match-3, physics puzzles
- **Visual novels** — dialogue systems, branching stories
- **Strategy / Tower Defense**

### 🌐 3D Games (Greatly Improved in Godot 4)
- Indie 3D platformers
- First-person exploration games
- 3D puzzle games
- Prototyping and game jams

### 🎓 Education & Rapid Prototyping
- Learning game development (excellent documentation)
- Game jams (Ludum Dare, Global Game Jam)
- Quick prototype demos

### 📱 Mobile Games
- Android and iOS export with one click
- Lightweight engine suitable for mobile hardware

---

## Advantages

| ✅ Advantage | Details |
|------------|---------|
| **Completely Free** | MIT license — no royalties, no usage fees, ever |
| **Lightweight** | ~100 MB editor, fast startup, low memory use |
| **Best-in-Class 2D** | Dedicated 2D rendering pipeline, pixel-perfect |
| **Beginner Friendly** | GDScript is easy; clean documentation |
| **Open Source** | Fix engine bugs yourself; no black box |
| **Scene Composition** | Reusable scenes make complex games modular |
| **No Unity-Style Controversies** | Community-owned; no sudden runtime fee changes |
| **Cross-Platform** | Editor runs on Windows, macOS, Linux |
| **Fast Iteration** | Hot reload, integrated debugger, profiler |
| **Active Community** | Regular releases, active Discord, forums |

---

## Disadvantages

| ❌ Disadvantage | Details |
|---------------|---------|
| **3D Less Mature** | Not as feature-rich as Unreal or Unity for AAA 3D |
| **Smaller Asset Store** | No equivalent to Unity Asset Store (Godot Asset Library is smaller) |
| **GDScript Niche** | GDScript is only used in Godot — not a transferable skill |
| **Console Export** | Console publishing requires third-party (W4 Games) or self-porting |
| **C# in Godot 4** | Still maturing; some features lag behind GDScript |
| **Godot 3 vs 4 Split** | Migration from Godot 3 to 4 is significant — not backward compatible |

---

## Godot vs Unity vs Unreal

| Feature | Godot | Unity | Unreal Engine |
|---------|-------|-------|--------------|
| **Price** | ✅ Free (MIT) | ⚠️ Free tier + Personal; paid plans | ⚠️ Free until revenue threshold |
| **2D** | ⚡ Best-in-class | ✅ Good | ⚠️ Not primary focus |
| **3D** | ✅ Good (Godot 4) | ✅ Very good | ⚡ Industry-leading |
| **Scripting** | GDScript / C# | C# | C++ / Blueprints |
| **Learning Curve** | ✅ Gentle | ✅ Moderate | ❌ Steep |
| **File Size** | ✅ ~100 MB | ❌ ~5-15 GB | ❌ 20-60+ GB |
| **Open Source** | ✅ Yes (MIT) | ❌ No | ❌ Source-available |
| **Asset Store** | ⚠️ Small | ✅ Huge | ✅ Good |
| **AAA Ready** | ❌ Not yet | ✅ Yes | ✅ Yes |
| **Indie / Solo** | ⚡ Ideal | ✅ Good | ⚠️ Heavy for solo |

---

## Who Should Use Godot?

### ✅ Perfect For:
- **Beginners** learning game development from scratch
- **Indie developers** building 2D games on a budget
- **Solo devs** who want full creative and technical control
- **Open-source advocates** who dislike black-box engines
- **Hobbyists** doing game jams (Ludum Dare, GMTK)

### 💡 Consider Unity Instead If:
- You need a massive asset store ecosystem
- Your team already knows C# game development
- You're targeting console platforms with existing tooling

### 💡 Consider Unreal Instead If:
- You need ultra-high-fidelity 3D visuals
- You're developing for AAA production pipelines
- You need Nanite/Lumen-level rendering

---

## Learning Resources

| Resource | Link |
|----------|------|
| **Official Docs** | [docs.godotengine.org](https://docs.godotengine.org/) |
| **Official Tutorials** | Included in the docs — "Your First 2D Game" walkthrough |
| **GDScript Reference** | [docs.godotengine.org/en/stable/tutorials/scripting/gdscript/](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/) |
| **Godot Asset Library** | [godotengine.org/asset-library](https://godotengine.org/asset-library/asset) |
| **Community** | [reddit.com/r/godot](https://www.reddit.com/r/godot/) |
| **YouTube** | GDQuest, Brackeys (Godot series), KidsCanCode |

---

## User Guide

---

### Installation

#### Windows / macOS / Linux

1. Go to [godotengine.org/download](https://godotengine.org/download)
2. Download **Godot 4 — Standard** (includes GDScript + C#)
3. **Extract the zip** — there is no installer; the `.exe` (or binary) IS the editor
4. Run `Godot_v4.x-stable_win64.exe` — no installation required

> 💡 The Godot editor is fully self-contained in a single ~100 MB executable.

#### Linux via Flatpak

```bash
flatpak install flathub org.godotengine.Godot
flatpak run org.godotengine.Godot
```

#### For C# Support

Download the **.NET version** of Godot 4 from the downloads page, then install [.NET 6 SDK](https://dotnet.microsoft.com/download).

---

### Editor Overview

When you open Godot, the **Project Manager** appears. From there:

1. **New Project** → Choose a folder → Select a renderer:
   - **Forward+** (Vulkan): Best for 3D, high-end
   - **Mobile** (Vulkan Mobile): Middle ground
   - **Compatibility** (OpenGL3): Best for 2D, web, low-end

2. The main editor has these panels:
   - **Scene** panel (top-left) — your node tree
   - **FileSystem** panel (bottom-left) — your project files
   - **Inspector** (right) — properties of selected node
   - **Viewport** (center) — see and edit your game world
   - **Script Editor** — write GDScript / C#
   - **Output / Debugger** (bottom) — logs and runtime info

3. Press **F5** (or the Play button ▶) to run your game.

---

### Scene & Node System

In Godot, **everything is a Scene**, and every scene is a tree of **Nodes**.

#### Key Node Types

| Category | Nodes | Purpose |
|----------|-------|---------|
| **2D** | `Node2D`, `Sprite2D`, `AnimatedSprite2D` | 2D objects |
| **Physics 2D** | `CharacterBody2D`, `RigidBody2D`, `StaticBody2D` | 2D physics |
| **Collision** | `CollisionShape2D`, `Area2D` | Hit detection |
| **3D** | `Node3D`, `MeshInstance3D`, `Camera3D` | 3D objects |
| **Physics 3D** | `CharacterBody3D`, `RigidBody3D` | 3D physics |
| **UI** | `Control`, `Label`, `Button`, `TextureRect` | Interface |
| **Audio** | `AudioStreamPlayer`, `AudioStreamPlayer2D` | Sound |
| **Utility** | `Timer`, `Tween`, `AnimationPlayer` | Logic helpers |

#### Creating a Scene

1. `Scene` panel → **+ (Add Child Node)** or `Ctrl+A`
2. Search for a node type (e.g., `Node2D`)
3. Click **Create**
4. Save the scene: `Ctrl+S` → name it (e.g., `Player.tscn`)

#### Instancing Scenes (Prefabs equivalent)

Any saved `.tscn` file can be **instanced** into another scene:
- Drag a `.tscn` from FileSystem into the Scene tree, or
- In code: `var player = preload("res://Player.tscn").instantiate()`

---

### GDScript Basics

GDScript is Godot's built-in scripting language. It is Python-like, statically typed (optionally), and runs inside Godot — no external interpreter needed.

#### Hello World

```gdscript
extends Node

func _ready():
    print("Hello, Godot!")
```

#### Variables & Types

```gdscript
# Untyped (dynamic)
var score = 0
var player_name = "Alice"
var active = true

# Typed (recommended — catches bugs at edit time)
var health: int = 100
var speed: float = 250.0
var message: String = "Game Over"
var items: Array[String] = ["sword", "shield"]
var position: Vector2 = Vector2(100, 200)

# Constants
const MAX_HEALTH: int = 100
const GRAVITY: float = 980.0

# Exported variables (editable in the Inspector)
@export var jump_force: float = 400.0
@export var player_name: String = "Player"
```

#### Functions

```gdscript
extends Node2D

# Called once when the node enters the scene tree
func _ready() -> void:
    print("Node is ready!")

# Called every frame; delta = time since last frame (seconds)
func _process(delta: float) -> void:
    pass

# Called every physics frame (fixed timestep)
func _physics_process(delta: float) -> void:
    pass

# Custom function
func add(a: int, b: int) -> int:
    return a + b
```

#### Control Flow

```gdscript
var score := 85

# If / elif / else
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")

# Match (like switch)
match score / 10:
    9, 10:
        print("Excellent")
    8:
        print("Good")
    _:
        print("Keep trying")

# For loop
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for item in ["sword", "shield", "potion"]:
    print(item)

# While loop
var count := 0
while count < 3:
    print(count)
    count += 1
```

#### Arrays & Dictionaries

```gdscript
# Arrays
var fruits: Array[String] = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.remove_at(0)
print(fruits.size())        # 3
print(fruits[0])            # "banana"

# Iterating
for fruit in fruits:
    print(fruit)

# Dictionaries
var player := {
    "name": "Alice",
    "health": 100,
    "level": 5
}

print(player["name"])       # Alice
player["score"] = 500       # Add new key
player.erase("level")       # Remove key

# Check key existence
if "health" in player:
    print(player.health)
```

---

### Signals

Signals are Godot's built-in **event system** (observer pattern). They decouple nodes — a node can emit a signal without knowing who is listening.

#### Built-in Signals

```gdscript
# Connect a built-in signal via the editor:
# Select a Button → Inspector → Node tab → signals → pressed → Connect

# Or in code:
func _ready() -> void:
    $Button.pressed.connect(_on_button_pressed)

func _on_button_pressed() -> void:
    print("Button was pressed!")
```

#### Custom Signals

```gdscript
extends Node

# Declare a custom signal
signal health_changed(new_health: int)
signal player_died

var health: int = 100

func take_damage(amount: int) -> void:
    health -= amount
    emit_signal("health_changed", health)   # Godot 3 style
    health_changed.emit(health)             # Godot 4 style (preferred)

    if health <= 0:
        player_died.emit()

# Elsewhere, connect to the signal:
func _ready() -> void:
    $Player.health_changed.connect(_on_health_changed)
    $Player.player_died.connect(_on_player_died)

func _on_health_changed(new_health: int) -> void:
    $HealthBar.value = new_health

func _on_player_died() -> void:
    get_tree().change_scene_to_file("res://GameOver.tscn")
```

---

### Physics & Collision

#### CharacterBody2D (Player Movement)

```gdscript
extends CharacterBody2D

const SPEED := 200.0
const JUMP_VELOCITY := -400.0
const GRAVITY := 980.0

func _physics_process(delta: float) -> void:
    # Apply gravity when not on floor
    if not is_on_floor():
        velocity.y += GRAVITY * delta

    # Jump
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # Horizontal movement
    var direction := Input.get_axis("ui_left", "ui_right")
    velocity.x = direction * SPEED

    # Move and handle collisions
    move_and_slide()
```

#### Area2D (Overlap Detection)

```gdscript
extends Area2D

func _ready() -> void:
    body_entered.connect(_on_body_entered)
    body_exited.connect(_on_body_exited)

func _on_body_entered(body: Node2D) -> void:
    if body.is_in_group("enemy"):
        print("Enemy entered the zone!")

func _on_body_exited(body: Node2D) -> void:
    print("Body left the zone.")
```

---

### Input Handling

#### Input Actions (Project Settings → Input Map)

Define custom actions in **Project → Project Settings → Input Map**:
- Add action: `move_left`, `move_right`, `jump`, `attack`
- Assign keys/buttons to each action

```gdscript
func _process(delta: float) -> void:
    # Check if action is currently held
    if Input.is_action_pressed("move_right"):
        position.x += 200 * delta

    # Check for single press (fires once per press)
    if Input.is_action_just_pressed("jump"):
        jump()

    # Check for release
    if Input.is_action_just_released("attack"):
        end_attack()

# _unhandled_input runs if no UI consumed the event
func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventMouseButton:
        if event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
            shoot(event.position)
```

---

### UI & Canvas

#### Common UI Nodes

| Node | Purpose |
|------|---------|
| `CanvasLayer` | Renders UI above the game world |
| `Control` | Base for all UI elements |
| `Label` | Display text |
| `Button` | Clickable button |
| `TextureRect` | Display an image |
| `ProgressBar` | Health/loading bars |
| `LineEdit` | Single-line text input |
| `VBoxContainer` / `HBoxContainer` | Auto-layout containers |

#### HUD Example

```gdscript
extends CanvasLayer

@onready var health_bar: ProgressBar = $HealthBar
@onready var score_label: Label = $ScoreLabel

var score: int = 0

func update_health(value: int) -> void:
    health_bar.value = value

func add_score(points: int) -> void:
    score += points
    score_label.text = "Score: " + str(score)
```

---

### Audio

```gdscript
extends Node

# Add an AudioStreamPlayer node in the editor
# Drag a .wav or .ogg file into its Stream property

@onready var music: AudioStreamPlayer = $BackgroundMusic
@onready var sfx: AudioStreamPlayer   = $SoundEffects

func _ready() -> void:
    music.play()

func play_jump_sound() -> void:
    sfx.stream = preload("res://sounds/jump.wav")
    sfx.play()

func toggle_music() -> void:
    if music.playing:
        music.stop()
    else:
        music.play()
```

---

### Saving & Loading Data

```gdscript
# save_system.gd
const SAVE_PATH := "user://savegame.json"

func save_game(data: Dictionary) -> void:
    var file := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
    file.store_string(JSON.stringify(data))
    file.close()
    print("Game saved.")

func load_game() -> Dictionary:
    if not FileAccess.file_exists(SAVE_PATH):
        return {}

    var file := FileAccess.open(SAVE_PATH, FileAccess.READ)
    var raw  := file.get_as_text()
    file.close()

    var result := JSON.parse_string(raw)
    return result if result else {}

# Usage
var save_data := {
    "player_level": 5,
    "gold": 1200,
    "position": {"x": 100, "y": 200}
}
save_game(save_data)

var loaded := load_game()
print(loaded["player_level"])  # 5
```

---

### Exporting Your Game

1. Go to **Project → Export**
2. Click **Add…** and select a platform (Windows Desktop, Android, Web, etc.)
3. For each platform, download the **Export Template** when prompted
4. Configure settings (app name, icon, etc.)
5. Click **Export Project** → choose output path

#### Platform Requirements

| Platform | Extra Requirements |
|----------|--------------------|
| **Windows** | None (works on Windows host) |
| **macOS** | Codesigning certificate (for distribution) |
| **Android** | Android SDK, JDK, debug keystore |
| **iOS** | macOS + Xcode required |
| **HTML5/Web** | Hosted on a server with HTTPS for full features |

---

### Best Practices

#### 1. Follow the Scene Composition Principle

```
# Each scene should be self-contained and reusable
Player.tscn
├── CharacterBody2D
├── Sprite2D
├── CollisionShape2D
└── Camera2D        # player-following camera

# Main.tscn instances Player
Main.tscn
├── Node2D
├── TileMap
└── Player (instance of Player.tscn)
```

#### 2. Use `@export` to Tune Values in the Inspector

```gdscript
# Expose tunable values without changing code
@export var speed: float = 200.0
@export var jump_force: float = 400.0
@export var max_health: int = 100
```

#### 3. Use Groups to Tag Nodes

```gdscript
# In editor: Node tab → Groups → Add "enemy"
# In code:
func _on_body_entered(body: Node) -> void:
    if body.is_in_group("enemy"):
        take_damage(10)
```

#### 4. Use Autoloads for Global Singletons

Create a script that needs to be globally accessible:
1. **Project → Project Settings → Autoload**
2. Add your script (e.g., `GameManager.gd`) with name `GameManager`
3. Access anywhere: `GameManager.score += 10`

#### 5. Prefer Signals Over Direct References

```gdscript
# BAD: tight coupling
get_parent().get_node("HUD").update_health(health)

# GOOD: emit a signal; HUD connects to it
health_changed.emit(health)
```

#### 6. Use `_physics_process` for Physics, `_process` for Visual Updates

```gdscript
func _process(delta: float) -> void:
    # Animations, UI updates, non-physics visuals

func _physics_process(delta: float) -> void:
    # Movement, collision detection, force application
    move_and_slide()
```

---

## Summary

| Use Godot When | Consider Alternatives When |
|----------------|---------------------------|
| Building 2D games (any genre) | AAA 3D visuals needed → **Unreal Engine** |
| Solo or small indie team | Large team with C# expertise → **Unity** |
| Tight budget (zero engine cost) | Massive Asset Store needed → **Unity** |
| Open-source / no black box | Console publishing pipeline → **Unity / Unreal** |
| Lightweight, fast iteration | Existing Unreal production pipeline → **Unreal** |

---

## Next Steps

1. **"Your First 2D Game"** — [docs.godotengine.org](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html)
2. **"Your First 3D Game"** — official Godot 4 3D tutorial
3. **[Unity](../Unity/Unity.md)** — Compare with Unity's approach
4. **GDQuest** — YouTube channel with high-quality Godot tutorials

---

*Last Updated: February 20, 2026*
