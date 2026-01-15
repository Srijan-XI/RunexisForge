# KaliLinux

## Introduction

Kali Linux is a Debian-based distribution tailored for penetration testing and security auditing, maintained by Offensive Security.

- Base: Debian
- Package manager: APT
- Focus: Offensive security toolset

---

## User Guide

## Update & Upgrade

```bash
sudo apt update
sudo apt full-upgrade
```bash

## Install Tools

- Metapackages group tools by category:

```bash
sudo apt install kali-tools-top10
sudo apt install kali-linux-everything  # large
```bash

## Install Kali Linux

- Download ISO: <https://www.kali.org/get-kali/>
- Create bootable USB, boot, and run installer
- Debian-based; includes pentesting tools pre-installed
- More: [../INSTALL.md](../INSTALL.md)

## Notes

- Use in lab environments; many tools need root or capabilities.

