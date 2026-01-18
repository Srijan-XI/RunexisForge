# Raylib

## Introduction

### What is Raylib?
Raylib is a simple and easy-to-use library to enjoy videogames programming. Unlike "engines" like Unity or Godot, Raylib is a *library*—giving you fine-grained control over your code. It is written in C but has bindings for over 50 programming languages (C++, C#, Python, Lua, Go, Rust, etc.).

### Why Raylib?
- **No GUI / Visual Editor**: Pure coding experience.
- **Tiny**: Small footprint, no bloat.
- **Multi-platform**: Windows, Linux, macOS, RPi, Android, HTML5.
- **Education Focused**: Great for learning graphics programming concepts.
- **OpenGL**: Abstraction layer over OpenGL 1.1, 2.1, 3.3, 4.3 or ES 2.0.

## Prerequisites
- **C/C++ Knowledge**: Basic understanding of pointers, structs, and memory management (if using C).
- **Compiler**: GCC, Clang, or MSVC.
- **Make/CMake**: For building projects.

## Installation

### Windows (Installer)
1. Download the installer from [raylib.com](https://www.raylib.com/).
2. This installs **w64devkit** (MinGW + Tools) and preconfigured Notepad++.
3. Great for beginners to start coding immediately.

### Installation via vcpkg (C++)
```bash
vcpkg install raylib
```

### macOS (Homebrew)
```bash
brew install raylib
```

### Linux (Debian/Ubuntu)
```bash
sudo apt install libraylib-dev
```

## Basic Structure (C)

A minimal Raylib program looks like this:

```c
#include "raylib.h"

int main(void)
{
    // Initialization
    const int screenWidth = 800;
    const int screenHeight = 450;

    InitWindow(screenWidth, screenHeight, "raylib [core] example - basic window");

    SetTargetFPS(60);               // Set our game to run at 60 frames-per-second

    // Main game loop
    while (!WindowShouldClose())    // Detect window close button or ESC key
    {
        // Update
        // TODO: Update your variables here

        // Draw
        BeginDrawing();

            ClearBackground(RAYWHITE);

            DrawText("Congrats! You created your first window!", 190, 200, 20, LIGHTGRAY);

        EndDrawing();
    }

    // De-Initialization
    CloseWindow();        // Close window and OpenGL context

    return 0;
}
```

## Core Modules

### Graphics (2D)
Raylib makes drawing shapes and textures incredibly easy.

```c
// Loading a texture
Texture2D scarfy = LoadTexture("resources/scarfy.png");

// Drawing
DrawTexture(scarfy, x, y, WHITE);
DrawRectangle(10, 10, 50, 50, RED);
DrawCircle(100, 100, 30, BLUE);
DrawLine(0, 0, 800, 450, BLACK);
```

### Graphics (3D)
Raylib is excellent for quick 3D prototyping.

```c
Camera3D camera = { 0 };
camera.position = (Vector3){ 0.0f, 10.0f, 10.0f };
camera.target = (Vector3){ 0.0f, 0.0f, 0.0f };
camera.up = (Vector3){ 0.0f, 1.0f, 0.0f };
camera.fovy = 45.0f;
camera.projection = CAMERA_PERSPECTIVE;

BeginMode3D(camera);
    DrawCube((Vector3){0, 0, 0}, 2.0f, 2.0f, 2.0f, RED);
    DrawGrid(10, 1.0f);
EndMode3D();
```

### Input
Input is polled every frame.

```c
if (IsKeyDown(KEY_RIGHT)) x += 2.0f;
if (IsKeyPressed(KEY_SPACE)) Jump();

if (IsMouseButtonPressed(MOUSE_BUTTON_LEFT)) Shoot();

Vector2 mousePosition = GetMousePosition();
```

### Audio
Simple audio system (raudio).

```c
InitAudioDevice();      // Initialize audio device

Sound fxWav = LoadSound("resources/weird.wav");
Music music = LoadMusicStream("resources/guitar.ogg");

PlayMusicStream(music);

// In loop
UpdateMusicStream(music);
if (IsKeyPressed(KEY_SPACE)) PlaySound(fxWav);

CloseAudioDevice();     // Close audio device
```

## Cheatsheet
Raylib has a famous [Cheatsheet](https://www.raylib.com/cheatsheet/cheatsheet.html) that shows every single function available in the library on one page. It is an invaluable resource.

- `InitWindow(w, h, title)`
- `BeginDrawing()` / `EndDrawing()`
- `LoadTexture(file)`
- `DrawTexture(tex, x, y, tint)`
- `LoadSound(file)` / `PlaySound(snd)`
- `CheckCollisionRecs(rec1, rec2)`

## Raylib Utilities
Raylib comes with several standalone tools (some paid, some free):
- **rTexViewer**: Texture viewer and optimizer.
- **rGuiLayout**: GUI layout editor.
- **rfxGen**: Sound generation.

## Raygui
An immediate-mode GUI module for Raylib. Useful for creating tools.

```c
#define RAYGUI_IMPLEMENTATION
#include "raygui.h"

// In loop
if (GuiButton((Rectangle){ 24, 24, 120, 30 }, "#191#Show Message")) {
    showMessage = true;
}
```

## Resources
- [Official Website](https://www.raylib.com/)
- [Examples](https://www.raylib.com/examples.html) - Hundreds of runnable web examples.
- [Discord](https://discord.gg/raylib)
- [raylib-games](https://github.com/raylib-technologies/raylib-games) - List of games made with Raylib.

## Next Steps
1. Explore the `examples` folder in the Raylib repository.
2. Try porting a classic like Pong or Breakout.
3. Experiment with 3D cameras and logic.
4. Join the Discord to share your progress.
