# Ubuntu

## Introduction

Ubuntu is a popular Debian-based distribution offering regular releases and Long Term Support (LTS), with broad hardware and cloud support.

- Base: Debian
- Package manager: APT; Snap for store apps
- Flavors: Ubuntu (GNOME), Kubuntu, Xubuntu, etc.

---

## User Guide

## Update & Upgrade

```bash
sudo apt update
sudo apt upgrade
```bash

## Install Software

```bash
sudo apt install <pkg>
```bash

## Snap (Optional)

```bash
sudo snap install <app>
```bash

## Install Ubuntu

- Download ISO: <https://ubuntu.com/download/desktop>
- Create bootable USB, boot installer
- Choose LTS for stability (5 years) or latest (9 months)
- More: [../INSTALL.md](../INSTALL.md)

## Services

```bash
systemctl status <service>
sudo systemctl enable --now <service>
```bash

