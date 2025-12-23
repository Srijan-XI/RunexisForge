# Pop!_OS User Guide

## Install
- Download ISO (AMD/Intel or NVIDIA) from https://pop.system76.com
- Flash with Etcher/Rufus; boot and run installer
- Choose full-disk encryption if desired

## Updates and Packages
```bash
sudo apt update && sudo apt upgrade
sudo apt install <pkg>
```
Pop Shop provides GUI updates and Flatpak apps.

## Tiling
- Toggle auto-tiling: Super + Y
- Move focus: Super + Arrow keys
- Workspaces: Super + Up/Down

## NVIDIA
- Verify driver: `nvidia-smi`
- Switch graphics (hybrid) via Power menu on laptops

## Troubleshooting
- Logs: `journalctl -xe`
- Firmware updates: `sudo fwupdmgr update`
