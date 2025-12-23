# WSL — Introduction

## What is WSL?

**Windows Subsystem for Linux (WSL)** lets you run a real Linux environment on Windows without a traditional virtual machine. You can use Linux shells, package managers, and developer tools alongside Windows apps.

## Why use WSL?

- Run Linux tooling (bash, ssh, git, gcc, python, node) on Windows
- Use Linux package managers (`apt`, `dnf`, etc.)
- Great for web/devops workflows that assume Linux
- Interop with Windows files and apps

## WSL 1 vs WSL 2 (quick)

- **WSL 1**: lightweight translation layer; faster access to Windows filesystem.
- **WSL 2**: real Linux kernel in a VM; better compatibility (Docker, kernel features), generally recommended.

## Typical use cases

- Local development with Linux toolchains
- Running Docker Desktop with WSL 2 backend
- SSH, scripting, CI-like workflows

## Learning Path

1. Install WSL and a distro (Ubuntu is common).
2. Learn where files live (`/home/...` vs `C:\Users\...`).
3. Install packages and dev tools inside WSL.
4. Learn interop: calling Windows from Linux and vice-versa.
