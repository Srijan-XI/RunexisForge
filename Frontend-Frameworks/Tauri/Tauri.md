# Tauri — Introduction

## What is Tauri?

Tauri is a framework for building small, fast desktop applications using web UI (HTML/CSS/JS) with a Rust backend. It’s an alternative to Electron with a strong focus on lightweight binaries.

## Why Tauri?

- Smaller app size than many Electron apps
- Rust backend for performance and safety
- Cross-platform desktop apps

## Learning Path

1. Install prerequisites (Rust + Node).
2. Create a Tauri app.
3. Learn how frontend talks to Rust commands.
4. Package and ship.

---

# Tauri User Guide

## Prerequisites

- Rust toolchain (`rustc`, `cargo`)
- Node.js + npm

## Create a Tauri app

```bash
npm create tauri-app@latest
cd your-app
npm install
npm run tauri dev
```bash

## Frontend ↔ Rust commands

Tauri lets you expose Rust functions as commands and call them from JS.

See `Tauri/questions/q01_add_command.md` for a practice task.
