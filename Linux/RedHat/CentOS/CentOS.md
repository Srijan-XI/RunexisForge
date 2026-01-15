# CentOS

## Introduction

CentOS Stream is a rolling preview of the next minor release of RHEL, suitable for development and testing aligned with enterprise ecosystems.

- Base: RHEL ecosystem
- Package manager: dnf/yum
- Traits: Continuous updates between Fedora and RHEL

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

## Install CentOS Stream

- Download ISO: <https://www.centos.org/download/>
- Create bootable USB, boot installer
- Rolling preview of RHEL; good for dev/testing
- More: [../INSTALL.md](../INSTALL.md)

## Repos

- Manage in `/etc/yum.repos.d/`; `dnf repolist`.

