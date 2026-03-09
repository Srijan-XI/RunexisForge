# Q1: Add a Rust command

Goal:

- Create a new Tauri app.
- Add a Rust command `greet(name: String) -> String`.
- Call it from the frontend and display the result.

Checklist:

- Add the command in the Tauri Rust backend.
- Register it in the Tauri builder.
- Call it from JS/TS using `invoke`.
