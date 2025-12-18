# Gentoo User Guide

## Sync & Update World
```
sudo emaint sync --auto
sudo emerge --ask --update --deep --newuse @world
```

## Search & Install
```
emerge --search <name>
sudo emerge --ask <cat/pkg>
```

## USE Flags
- Set in `/etc/portage/make.conf` and package.use; then rebuild affected packages.

## Install Gentoo
- Download minimal ISO: https://www.gentoo.org/downloads/
- Boot, follow Gentoo Handbook for detailed install (stage3, chroot, kernel, grub)
- Expert-focused; allocate time for compilation
- More: [Linux/INSTALL.md](../INSTALL.md)

## Kernel & Services
- Kernel via `genkernel` or manual config; services with `systemd` or OpenRC depending on setup.
