# Slackware

## Introduction

Slackware is a classic, minimalist distribution emphasizing simplicity and Unix-like design.

- Package tools: `pkgtools` (`installpkg`, `removepkg`), `slackpkg` for repo management
- Init: BSD-style rc scripts
- Traits: Stable, manual configuration

---

## User Guide

## Update & Upgrade

```bash
sudo slackpkg update
sudo slackpkg upgrade-all
```bash

## Install/Remove Packages

```bash
sudo slackpkg install <pkg>
sudo removepkg <pkg>
```bash

## Install Slackware

- Download ISO: <http://www.slackware.com/getslack/>
- Create bootable USB, boot, run `setup` installer
- Minimalist; manual config expected
- More: [Linux/INSTALL.md](../INSTALL.md)

## Services

- Managed via rc scripts in `/etc/rc.d/`:

```bash
sudo /etc/rc.d/rc.<service> start
```bash

