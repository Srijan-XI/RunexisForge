# Arch

## Introduction

The Arch Linux family is known for simplicity, rolling releases, and user control. Arch provides a minimal base you build yourself, while derivatives like Manjaro and EndeavourOS offer guided installers and defaults.

- Philosophy: Keep it simple, DIY configuration
- Release model: Rolling (continuous updates)
- Package manager: pacman; community packages via AUR
- Notable: Extensive wiki, power-user friendly

---

## User Guide

## Update & Upgrade

- Sync package databases and upgrade:

```bash
pacman -Syu
```bash

## Search & Install

- Search packages:

```bash
pacman -Ss <name>
```bash

- Install package:

```bash
pacman -S <pkg>
```bash

## Remove

```bash
pacman -Rns <pkg>
```bash

## AUR Helpers (example: yay)

- Install from AUR:

```bash
yay -S <aur-pkg>
```bash

- Upgrade all (incl. AUR):

```bash
yay -Syu
```bash

## Install Arch

- Download ISO: <https://archlinux.org/download/>
- Create bootable USB with Rufus or Etcher
- Boot, run `archinstall` for guided setup or manual `pacstrap` install
- More: [Linux/INSTALL.md](../INSTALL.md)

## Services

```bash
systemctl status <service>
systemctl enable --now <service>
```bash

