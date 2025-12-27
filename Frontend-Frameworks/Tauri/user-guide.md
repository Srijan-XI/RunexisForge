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
