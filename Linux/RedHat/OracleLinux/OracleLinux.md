# OracleLinux

## Introduction

Oracle Linux is a free, RHEL-compatible distribution with support options and the Unbreakable Enterprise Kernel (UEK).

- Package manager: dnf/yum
- Traits: Enterprise-ready, compatible with RHEL

---

## User Guide

## Update & Upgrade

```bash
sudo dnf upgrade --refresh
```bash

## Install Software

```bash
sudo dnf install <pkg>
```bash

## Install Oracle Linux

- Download ISO: <https://www.oracle.com/linux/>
- Create bootable USB, boot installer
- Free, RHEL-compatible, with optional UEK kernel
- More: [../INSTALL.md](../INSTALL.md)

## Repos & UEK

- Enable/disable repos via `/etc/yum.repos.d/`.
- UEK kernels managed via `dnf` as normal packages.

