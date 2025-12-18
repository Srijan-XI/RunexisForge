# CentOS Stream User Guide

## Update & Upgrade
```
sudo dnf upgrade --refresh
```

## Install Software
```
sudo dnf install <pkg>
```

## Install CentOS Stream
- Download ISO: https://www.centos.org/download/
- Create bootable USB, boot installer
- Rolling preview of RHEL; good for dev/testing
- More: [../INSTALL.md](../INSTALL.md)

## Repos
- Manage in `/etc/yum.repos.d/`; `dnf repolist`.
