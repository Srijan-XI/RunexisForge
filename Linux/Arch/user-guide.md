# Arch Family User Guide

## Update & Upgrade
- Sync package databases and upgrade:
```
pacman -Syu
```

## Search & Install
- Search packages:
```
pacman -Ss <name>
```
- Install package:
```
pacman -S <pkg>
```

## Remove
```
pacman -Rns <pkg>
```

## AUR Helpers (example: yay)
- Install from AUR:
```
yay -S <aur-pkg>
```
- Upgrade all (incl. AUR):
```
yay -Syu
```

## Install Arch
- Download ISO: https://archlinux.org/download/
- Create bootable USB with Rufus or Etcher
- Boot, run `archinstall` for guided setup or manual `pacstrap` install
- More: [Linux/INSTALL.md](../INSTALL.md)

## Services
```
systemctl status <service>
systemctl enable --now <service>
```
