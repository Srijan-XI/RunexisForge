# Oracle Linux User Guide

## Update & Upgrade
```
sudo dnf upgrade --refresh
```

## Install Software
```
sudo dnf install <pkg>
```

## Install Oracle Linux
- Download ISO: https://www.oracle.com/linux/
- Create bootable USB, boot installer
- Free, RHEL-compatible, with optional UEK kernel
- More: [../INSTALL.md](../INSTALL.md)

## Repos & UEK
- Enable/disable repos via `/etc/yum.repos.d/`.
- UEK kernels managed via `dnf` as normal packages.
