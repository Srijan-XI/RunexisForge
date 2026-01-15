# Unity

## Introduction

## Overview

Unity is a real-time 3D (and 2D) game engine used to build games, simulations, AR/VR experiences, and interactive applications. Most Unity gameplay logic is written in **C#** and attached to GameObjects as scripts.

## Why Unity?

- Great for **2D/3D** projects and fast prototyping
- Huge ecosystem (Asset Store, packages, community)
- Cross-platform builds (Windows, macOS, Linux, mobile, console)
- Strong tooling (Editor, Profiler, Timeline, Shader Graph)

## Core Concepts

- **Scene**: A level or collection of objects
- **GameObject**: Entity in a scene
- **Component**: Behavior/data attached to a GameObject
- **MonoBehaviour**: Base class for most scripts
- **Prefab**: Reusable GameObject template
- **Update loop**: `Update()`, `FixedUpdate()`, `LateUpdate()`

## Typical Use Cases

- Indie games (2D platformers, 3D action)
- AR/VR training apps
- Interactive product demos

## Resources

- Docs: <https://docs.unity.com/>
- Learn: <https://learn.unity.com/>

---

## User Guide

## 1) Install (Windows)

- Install **Unity Hub** (manages editor versions and projects).
- In Unity Hub, install a Unity Editor version (LTS recommended).

## 2) Create a Project

1. Open Unity Hub → **New project**
2. Choose a template (2D / 3D)
3. Create project

## 3) Your First Script

Create a C# script and attach it to a GameObject.

Example script: `Unity/examples/HelloUnity.cs`

## 4) Common Patterns

- Use `Start()` for initialization
- Use `Update()` for per-frame logic
- Use `FixedUpdate()` for physics-related updates

## Examples & Practice

- Examples: `Unity/examples/`
- Practice: `Unity/questions/`

