# WSL

## Introduction

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

---

## User Guide

## Install WSL (Windows 11 / recent Windows 10)

Open **PowerShell as Administrator**:

```pwsh
wsl --install
```bash

Reboot if prompted.

Install a distro (example: Ubuntu):

```pwsh
wsl --list --online
wsl --install -d Ubuntu
```bash

Check status:

```pwsh
wsl --status
wsl --list --verbose
```bash

## First-time setup

- Launch your distro from Start Menu
- Create a Linux username/password

Update packages (inside WSL):

```bash
sudo apt update && sudo apt upgrade -y
```bash

## Filesystem basics

- Linux home: `/home/<user>/`
- Windows drives are mounted under `/mnt/`:
  - `C:` → `/mnt/c/`

Tip: keep project code in the Linux filesystem (e.g. `~/projects`) for best performance on WSL 2.

## Useful interop commands

From Windows → open your WSL home in Explorer:

```bash
explorer.exe .
```bash

From WSL → run a Windows command:

```bash
notepad.exe README.md
```bash

## Common dev setup

Inside WSL (Ubuntu):

```bash
sudo apt install -y git curl build-essential
```bash

## Troubleshooting

- If `wsl` commands fail, ensure **Virtual Machine Platform** is enabled.
- If networking feels broken, try:
  - `wsl --shutdown` (from PowerShell) then reopen the distro.

See `WSL/examples/wsl_commands.md` for a quick command reference.

