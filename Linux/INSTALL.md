# Linux Installation Guide

This shared guide helps you install or try Linux safely on a PC or in a virtual machine.

## 1) Choose a Distro
- Beginner-friendly: Ubuntu, Linux Mint
- Developer workstation: Fedora Workstation, openSUSE Tumbleweed
- Lightweight/containers: Alpine
- Rolling/DIY: Arch (Manjaro/EndeavourOS for easier setup)

## 2) Download ISO (Official Sites)
- Verify you are on the official website (ubuntu.com, linuxmint.com, fedoraproject.org, etc.)
- Download the latest release or LTS variant (for stability)

## 3) Verify ISO Checksum (Optional but Recommended)
- Compare the ISO’s published SHA256 with your local file
- On Windows (PowerShell):
```powershell
Get-FileHash "C:\path\to\distro.iso" -Algorithm SHA256
```
- Match the output with the checksum listed on the distro website

## 4) Create a Bootable USB (Windows)
- Use Rufus (rufus.ie) or Balena Etcher
- Insert a 8GB+ USB drive (data will be erased)
- Select the ISO
- Partition scheme: GPT (UEFI) or MBR (Legacy) depending on your firmware
- Start and wait until complete

## 5) Boot and Install (Bare Metal)
- Reboot and enter boot menu (keys vary: F12, Esc, F9, etc.)
- Select the USB drive
- Try the live environment to test hardware
- Run the installer
- For dual-boot: shrink Windows partition first, install Linux alongside, mind bootloader (GRUB) placement

## 6) Virtual Machine Option (No Repartitioning)
- Install VirtualBox or VMware Workstation Player
- Create VM: 2–4 CPU cores, 4–8GB RAM, 20–40GB disk
- Attach ISO to the VM and install normally
- Pros: Safe, reversible; Cons: Less hardware acceleration

## 7) Post-Install Essentials
- Update packages:
  - Debian/Ubuntu:
```bash
sudo apt update && sudo apt upgrade
```
  - Fedora/RHEL:
```bash
sudo dnf upgrade --refresh
```
  - Arch:
```bash
sudo pacman -Syu
```
- Enable codecs, set timezone/keyboard, add users, install GPU drivers (if needed)

## 8) WSL (Windows Subsystem for Linux) Alternative
- For Linux tools without dual-boot:
```powershell
wsl --install
wsl --list --online
wsl --install Ubuntu
```
- Good for dev tooling; not a full desktop environment

## Tips
- Back up important data before partitioning
- Prefer LTS releases for stability
- Keep install media handy for rescue
- Read distro-specific notes in their `intro.md` and `user-guide.md`

## Links
- Ubuntu: https://ubuntu.com/download
- Linux Mint: https://linuxmint.com/download.php
- Fedora: https://getfedora.org
- Arch: https://archlinux.org/download/
- openSUSE: https://www.opensuse.org/#download
