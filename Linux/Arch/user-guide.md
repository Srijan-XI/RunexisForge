# Arch Family User Guide

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
