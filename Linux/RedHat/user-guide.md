# Red Hat Family User Guide

## Update & Upgrade
```
sudo dnf upgrade --refresh
```

## Search & Install
```
dnf search <name>
sudo dnf install <pkg>
```

## Remove
```
sudo dnf remove <pkg>
```

## Services
```
systemctl status <service>
sudo systemctl enable --now <service>
```

## Repositories
- Manage `.repo` files in `/etc/yum.repos.d/`.
