# Bevy

## Introduction

### What is Bevy?
Bevy is a disturbingly simple data-driven game engine built in Rust. It is free and open-source forever! Bevy is arguably the most popular Rust game engine currently, known for its ECS (Entity Component System) architecture which is ergonomic and fast.

### Why Bevy?
- **Data Driven**: Built from the ground up using ECS.
- **Fast**: Parallel-pipelined rendering system.
- **Simple**: Clean and ergonomic API (for Rust).
- **Hot Reloading**: Fast compile times (relative to Rust) and dynamic asset reloading.
- **Modular**: Plugins for everything. Use only what you need.

## Prerequisites
- **Rust Knowledge**: Intermediate Rust (ownership, borrowing, traits, lifetimes).
- **Cargo**: Rust package manager.
- **Limb**: Bevy works best with the nightly compiler for fast compiles, but works on stable.

## Installation

Add `bevy` to your `Cargo.toml`:

```toml
[dependencies]
bevy = "0.12" # Check for latest version
```

Or enable dynamic linking for faster development builds:

```toml
[dependencies]
bevy = { version = "0.12", features = ["dynamic_linking"] }
```

## Basic Structure

A minimal Bevy app involves building an `App`, adding plugins, and running it.

```rust
use bevy::prelude::*;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_systems(Startup, setup)
        .add_systems(Update, greet_people)
        .run();
}

fn setup(mut commands: Commands) {
    commands.spawn(Person { name: "Elvina".to_string() });
    commands.spawn(Person { name: "Ren".to_string() });
}

fn greet_people(query: Query<&Person, With<Name>>) {
    for person in &query {
        println!("Hello {}!", person.name);
    }
}

#[derive(Component)]
struct Person {
    name: String,
}

#[derive(Component)]
struct Name;
```

## ECS Conccepts

Bevy is all about ECS:
- **Entities**: Unique IDs (things in your world).
- **Components**: Data structs attached to entities (`Structs` and `Enums`).
- **Systems**: Functions that run logic on entities with specific components.

### Resources
Global unique data.

```rust
#[derive(Resource)]
struct GameTimer(Timer);

fn main() {
    App::new()
        .insert_resource(GameTimer(Timer::from_seconds(2.0, TimerMode::Repeating)))
        // ...
}
```

### Queries
How systems access data.

```rust
fn movement_system(time: Res<Time>, mut query: Query<(&mut Transform, &Velocity)>) {
    for (mut transform, velocity) in &mut query {
        transform.translation += velocity.value * time.delta_seconds();
    }
}
```

## Graphics (2D)

### Setting up a Camera
```rust
fn setup(mut commands: Commands) {
    commands.spawn(Camera2dBundle::default());
}
```

### Loading Sprites
```rust
fn setup(mut commands: Commands, asset_server: Res<AssetServer>) {
    commands.spawn(SpriteBundle {
        texture: asset_server.load("branding/icon.png"),
        transform: Transform::from_xyz(100.0, 0.0, 0.0),
        ..default()
    });
}
```

## Graphics (3D)

### 3D Scene Setup
```rust
fn setup(
    mut commands: Commands,
    mut meshes: Res<Assets<Mesh>>,
    mut materials: Res<Assets<StandardMaterial>>,
) {
    // Plane
    commands.spawn(PbrBundle {
        mesh: meshes.add(shape::Plane::from_size(5.0).into()),
        material: materials.add(Color::rgb(0.3, 0.5, 0.3).into()),
        ..default()
    });
    
    // Cube
    commands.spawn(PbrBundle {
        mesh: meshes.add(Mesh::from(shape::Cube { size: 1.0 })),
        material: materials.add(Color::rgb(0.8, 0.7, 0.6).into()),
        transform: Transform::from_xyz(0.0, 0.5, 0.0),
        ..default()
    });
    
    // Light
    commands.spawn(PointLightBundle {
        point_light: PointLight {
            intensity: 1500.0,
            shadows_enabled: true,
            ..default()
        },
        transform: Transform::from_xyz(4.0, 8.0, 4.0),
        ..default()
    });
    
    // Camera
    commands.spawn(Camera3dBundle {
        transform: Transform::from_xyz(-2.0, 2.5, 5.0).looking_at(Vec3::ZERO, Vec3::Y),
        ..default()
    });
}
```

## Input Handling

Reading keyboard input in a system:

```rust
fn keyboard_input(
    keys: Res<Input<KeyCode>>,
    mut query: Query<&mut Transform, With<Player>>,
    time: Res<Time>
) {
    let mut direction = Vec3::ZERO;
    if keys.pressed(KeyCode::W) { direction += Vec3::Y; }
    if keys.pressed(KeyCode::S) { direction -= Vec3::Y; }
    
    for mut transform in &mut query {
        transform.translation += direction * time.delta_seconds() * 100.0;
    }
}
```

## UI System
Bevy has a built-in Flexbox-based UI system.

```rust
fn setup_ui(mut commands: Commands, asset_server: Res<AssetServer>) {
    commands.spawn(NodeBundle {
        style: Style {
            width: Val::Percent(100.0),
            height: Val::Percent(100.0),
            justify_content: JustifyContent::Center,
            align_items: AlignItems::Center,
            ..default()
        },
        ..default()
    }).with_children(|parent| {
        parent.spawn(TextBundle::from_section(
            "Hello Bevy!",
            TextStyle {
                font: asset_server.load("fonts/FiraSans-Bold.ttf"),
                font_size: 40.0,
                color: Color::WHITE,
            },
        ));
    });
}
```

## Plugins
Bevy is built on plugins. You can create your own.

```rust
pub struct HelloPlugin;

impl Plugin for HelloPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, hello_world);
    }
}

// In main
app.add_plugins(HelloPlugin);
```

## Resources
- [Bevy Engine Website](https://bevyengine.org/)
- [Bevy Cheat Sheet](https://bevy-cheatbook.github.io/) - Essential reading.
- [Unofficial Bevy Cheat Book](https://bevy-cheatbook.github.io/) - The "book" for Bevy.
- [Bevy Assets](https://bevyengine.org/assets/) - Community crates and assets.
- [Discord](https://discord.gg/bevy) - Extremely active community.

## Next Steps
1. Read the **Bevy Book**.
2. Clone the `bevy` repo and run examples (`cargo run --example <name>`).
3. Join the Discord.
4. Build a simple Breakout clone.
