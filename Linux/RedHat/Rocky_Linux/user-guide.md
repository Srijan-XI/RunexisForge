# Rocky Linux User Guide

## Install
- Download ISO from https://rockylinux.org/download
- Create bootable USB (Rufus/Etcher) and boot installer
- Choose installation destination, set network/hostname, create user

## Package Management (dnf)
```bash
sudo dnf update
sudo dnf install <pkg>
sudo dnf remove <pkg>
```
- Extra repos: EPEL (`sudo dnf install epel-release`)

## Services and Firewall
```bash
sudo systemctl status firewalld
sudo systemctl enable --now firewalld
sudo firewall-cmd --list-all
```
SELinux: enforcing by default; config in `/etc/selinux/config`

## Users and SSH
```bash
sudo useradd -m dev
sudo passwd dev
sudo usermod -aG wheel dev
```
Enable SSH:
```bash
sudo systemctl enable --now sshd
```

## Updates and Reboots
- Regularly `sudo dnf update`
- Reboot after kernel/security updates: `sudo reboot`

## Troubleshooting
- Logs: `journalctl -xe`
- Network: `nmcli device status`
