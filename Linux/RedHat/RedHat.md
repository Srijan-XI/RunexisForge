# RedHat

## Introduction

Enterprise-focused RPM-based distros including RHEL, CentOS Stream, Fedora, and Oracle Linux.

- Package manager: `dnf`/`yum` with RPM
- Traits: Stability (RHEL), innovation (Fedora), RHEL preview (CentOS Stream)
- Ecosystem: SELinux, systemd, Cockpit admin GUI

---

## User Guide

## Update & Upgrade

```bash
sudo dnf upgrade --refresh
```bash

## Search & Install

```bash
dnf search <name>
sudo dnf install <pkg>
```bash

## Remove

```bash
sudo dnf remove <pkg>
```bash

## Services

```bash
systemctl status <service>
sudo systemctl enable --now <service>
```bash

## Repositories

- Manage `.repo` files in `/etc/yum.repos.d/`.

