# RHEL User Guide

## Register System
```
sudo subscription-manager register
sudo subscription-manager attach --auto
```

## Update & Install
```
sudo dnf upgrade --refresh
sudo dnf install <pkg>
```

## Install RHEL
- Download ISO from: https://access.redhat.com/ (subscription required)
- Create bootable USB, boot installer
- Stable, long-term support; enterprise-ready
- More: [../INSTALL.md](../INSTALL.md)

## Services
```
systemctl status <service>
sudo systemctl enable --now <service>
```
