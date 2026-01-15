# Alpine

## Introduction

Alpine Linux is a security-oriented, lightweight distribution built around musl libc and BusyBox.

## Highlights

- Small footprint; great for containers
- Uses apk package manager
- Hardened defaults with PaX/stack-smashing protections

## Resources

- Website: <https://alpinelinux.org>
- Docs: <https://wiki.alpinelinux.org>

---

## User Guide

## Install (bare metal)

- Boot ISO from <https://alpinelinux.org/downloads/>
- Login as `root` (no password) and run `setup-alpine`
- Choose mirror, disk layout, and create user

## Package Management

```bash
apk update
apk add <pkg>
apk del <pkg>
```bash

## Services

- OpenRC init

```bash
rc-service <svc> start
rc-update add <svc> default
```bash

## Networking

- Configure `/etc/network/interfaces` or use `setup-interfaces`

## Containers

- Alpine is popular as a minimal base image: `FROM alpine:3.19`
- Add packages: `apk add --no-cache curl ca-certificates`

## Troubleshooting

- Logs: `/var/log/messages`
- Rebuild initramfs: `mkinitfs`

