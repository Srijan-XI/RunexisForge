# MX Linux User Guide

## Install
- Download ISO from https://mxlinux.org/download-links/
- Create bootable USB with MX Live USB Maker or Etcher
- Boot and run installer; set partitions and user

## Updates and Packages
```bash
sudo apt update
sudo apt upgrade
sudo apt install <pkg>
```
MX Updater provides GUI updates.

## MX Tools
- Snapshot: create live ISO of your system
- Boot Repair: fix GRUB issues
- Drivers: NVIDIA installer if needed

## Lightweight Usage
- Xfce panel and Whisker menu by default
- Use MX Tweak for compositor and window tweaks

## Troubleshooting
- Logs: `journalctl -xe`
- Check MX forums for hardware-specific tips
