# Debian Family User Guide

## Update & Upgrade
```
sudo apt update
sudo apt upgrade
```

## Search & Install
```
apt search <name>
sudo apt install <pkg>
```

## Remove
```
sudo apt remove <pkg>
sudo apt purge <pkg>
```

## Install Debian/Ubuntu
- Download ISO: https://www.debian.org/download/ or https://ubuntu.com/download/desktop
- Create bootable USB, boot, and run installer
- Choose LTS for stability or latest for updates
- More: [Linux/INSTALL.md](../INSTALL.md)

## Services
```
systemctl status <service>
sudo systemctl enable --now <service>
```
