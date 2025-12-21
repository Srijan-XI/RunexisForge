# WSL User Guide

## Install WSL (Windows 11 / recent Windows 10)

Open **PowerShell as Administrator**:

```pwsh
wsl --install
```

Reboot if prompted.

Install a distro (example: Ubuntu):

```pwsh
wsl --list --online
wsl --install -d Ubuntu
```

Check status:
```pwsh
wsl --status
wsl --list --verbose
```

## First-time setup

- Launch your distro from Start Menu
- Create a Linux username/password

Update packages (inside WSL):
```bash
sudo apt update && sudo apt upgrade -y
```

## Filesystem basics

- Linux home: `/home/<user>/`
- Windows drives are mounted under `/mnt/`:
  - `C:` → `/mnt/c/`

Tip: keep project code in the Linux filesystem (e.g. `~/projects`) for best performance on WSL 2.

## Useful interop commands

From Windows → open your WSL home in Explorer:
```bash
explorer.exe .
```

From WSL → run a Windows command:
```bash
notepad.exe README.md
```

## Common dev setup

Inside WSL (Ubuntu):
```bash
sudo apt install -y git curl build-essential
```

## Troubleshooting

- If `wsl` commands fail, ensure **Virtual Machine Platform** is enabled.
- If networking feels broken, try:
  - `wsl --shutdown` (from PowerShell) then reopen the distro.

See `WSL/examples/wsl_commands.md` for a quick command reference.
