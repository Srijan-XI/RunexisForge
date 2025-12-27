# RHEL User Guide

## Register System

```bash
sudo subscription-manager register
sudo subscription-manager attach --auto
```bash

## Update & Install

```bash
sudo dnf upgrade --refresh
sudo dnf install <pkg>
```bash

## Install RHEL

- Download ISO from: <https://access.redhat.com/> (subscription required)
- Create bootable USB, boot installer
- Stable, long-term support; enterprise-ready
- More: [../INSTALL.md](../INSTALL.md)

## Services

```bash
systemctl status <service>
sudo systemctl enable --now <service>
```bash
