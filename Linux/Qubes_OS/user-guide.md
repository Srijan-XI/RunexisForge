# Qubes OS User Guide

## Install
- Verify hardware virtualization (VT-x/AMD-V) and VT-d/AMD-Vi for IOMMU
- Download ISO from https://www.qubes-os.org/downloads/
- Flash USB, boot, and follow installer; allocate storage for `dom0` and VMs

## Qube Types
- AppVMs for daily apps
- TemplateVMs for sharing root filesystem across qubes (Fedora/Debian templates)
- DisposableVMs for one-time tasks
- ServiceVMs (sys-net, sys-firewall, sys-usb) for networking and devices

## Updates
- Update templates; AppVMs inherit updates
- Use Qubes Update tool or `sudo dnf update` / `sudo apt update && sudo apt upgrade` inside TemplateVMs

## Copy/Move Between Qubes
- `qvm-copy-to-vm <target>` or GUI context menu
- Use disposable VMs for handling untrusted files

## Security Tips
- Keep `dom0` offline except for updates
- Prefer disposables for browsing risky sites
- Limit USB access through `sys-usb`
