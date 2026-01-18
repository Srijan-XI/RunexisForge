# Amethyst

> [!WARNING]
> **Project Status: Archived / Inactive**
> The Amethyst engine project is no longer actively maintained. The developers have largely moved on to other projects or engines (like Bevy). This documentation is provided for historical context or legacy projects. For new Rust projects, **Bevy** is the recommended successor.

## Introduction

### What is Amethyst?
Amethyst is a data-driven game engine written in Rust. It was one of the first major Rust game engines to adopt a pure Entity Component System (ECS) architecture (using the `specs` crate). It focuses on parallel execution and data parallelism.

## Prerequisites
- **Rust Knowledge**: Advanced Rust.
- **Cargo**: Rust package manager.
- **System Dependencies**: Alsa, Udev, Wayland/X11 libs (on Linux).

## Installation

Add to `Cargo.toml`:

```toml
[dependencies]
amethyst = "0.15" # Last major version
```

## Concepts

### ECS (Specs)
Amethyst uses `specs` for its ECS.
- **World**: Stores all resources and components.
- **Dispatcher**: Orchestrates system execution.

### State
Game execution is controlled by a generic `State` trait.

```rust
struct MyState;

impl SimpleState for MyState {
    fn on_start(&mut self, data: StateData<'_, GameData>) {
        println!("Game started!");
    }
}
```

## Basic Application Structure

```rust
use amethyst::{
    prelude::*,
    renderer::{
        plugins::{RenderFlat2D, RenderToWindow},
        types::DefaultBackend,
        RenderingBundle,
    },
    utils::application_root_dir,
};

fn main() -> amethyst::Result<()> {
    amethyst::start_logger(Default::default());

    let app_root = application_root_dir()?;
    let display_config_path = app_root.join("config").join("display.ron");

    let game_data = GameDataBuilder::default()
        .with_bundle(
            RenderingBundle::<DefaultBackend>::new()
                .with_plugin(
                    RenderToWindow::from_config_path(display_config_path)?
                        .with_clear([0.0, 0.0, 0.0, 1.0]),
                )
                .with_plugin(RenderFlat2D::default()),
        )?;

    let assets_dir = app_root.join("assets");
    let mut game = Application::new(assets_dir, MyState, game_data)?;
    game.run();

    Ok(())
}
```

## Configuration (RON)
Amethyst heavily uses RON (Rusty Object Notation) for configuration files.

`display.ron`:
```ron
(
  title: "Amethyst Game",
  dimensions: Some((800, 600)),
)
```

## Systems
Systems define logic.

```rust
use amethyst::ecs::{System, Read, WriteStorage};

struct MovementSystem;

impl<'s> System<'s> for MovementSystem {
    type SystemData = (
        WriteStorage<'s, Transform>,
        Read<'s, Time>,
    );

    fn run(&mut self, (mut transforms, time): Self::SystemData) {
        for transform in (&mut transforms).join() {
            transform.prepend_translation_x(10.0 * time.delta_seconds());
        }
    }
}
```

## Rendering
Amethyst uses `rendy` (in later versions) for a low-level graphics backend abstraction over Vulkan, Metal, DX12, etc.

## Resources
- [Amethyst Website (Archived)](https://amethyst.rs/)
- [Amethyst Book](https://book.amethyst.rs/stable/)
- [Specs Book](https://specs.amethyst.rs/)

## Alternatives
Since Amethyst is archived, consider:
- **Bevy**: The current standard for ECS in Rust.
- **Fyrox** (formerly rg3d): A feature-rich editor-based Rust engine.
- **Macroquad**: Simple and fast library.
