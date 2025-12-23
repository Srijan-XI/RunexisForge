# Zorin OS User Guide

## Install
- Download ISO: https://zorin.com/os/download
- Create bootable USB with Etcher/Rufus
- Boot and choose Install Zorin OS; select partitions and user account

## Package Management
```bash
sudo apt update
sudo apt upgrade
sudo apt install <pkg>
```
Flatpak support:
```bash
flatpak install flathub <app>
```

## Desktop
- Use Zorin Appearance to switch layouts
- Zorin Connect pairs with Android for notifications/files

## Updates
- Software Updater GUI or `sudo apt upgrade`

## Troubleshooting
- Check logs: `journalctl -xe`
- Drivers: `software-properties-gtk --open-tab=4` for additional drivers
