# Debian Family User Guide

## Update & Upgrade

```bash
sudo apt update
sudo apt upgrade
```bash

## Search & Install

```bash
apt search <name>
sudo apt install <pkg>
```bash

## Remove

```bash
sudo apt remove <pkg>
sudo apt purge <pkg>
```bash

## Install Debian/Ubuntu

- Download ISO: <https://www.debian.org/download/> or <https://ubuntu.com/download/desktop>
- Create bootable USB, boot, and run installer
- Choose LTS for stability or latest for updates
- More: [Linux/INSTALL.md](../INSTALL.md)

## Services

```bash
systemctl status <service>
sudo systemctl enable --now <service>
```bash
