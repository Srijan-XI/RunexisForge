# Slackware User Guide

## Update & Upgrade
```
sudo slackpkg update
sudo slackpkg upgrade-all
```

## Install/Remove Packages
```
sudo slackpkg install <pkg>
sudo removepkg <pkg>
```

## Install Slackware
- Download ISO: http://www.slackware.com/getslack/
- Create bootable USB, boot, run `setup` installer
- Minimalist; manual config expected
- More: [Linux/INSTALL.md](../INSTALL.md)

## Services
- Managed via rc scripts in `/etc/rc.d/`:
```
sudo /etc/rc.d/rc.<service> start
```
