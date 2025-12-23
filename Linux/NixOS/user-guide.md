# NixOS User Guide

## Install
- Download ISO: https://nixos.org/download.html
- Boot live media, connect network (`nmtui`), partition disks
- Run `nixos-install` after editing `/mnt/etc/nixos/configuration.nix`
- Set root password and reboot; keep the generated hardware config

## System Configuration
- Main file: `/etc/nixos/configuration.nix`
- Apply changes: `sudo nixos-rebuild switch`
- Rollback: choose a previous generation in the boot menu or `sudo nixos-rebuild switch --rollback`

## Packages
```bash
# add package to user profile
nix-env -iA nixpkgs.htop
# search
nix search nixpkgs ripgrep
```
Prefer declarative installs by adding to `environment.systemPackages`.

## Flakes (optional)
Enable flakes in config and use pinned inputs:
```bash
nixos-rebuild switch --flake .#hostname
```

## Services
- Enable in config: `services.sshd.enable = true;`
- Manage at runtime: `systemctl status sshd`

## Channels/Updates
- Update channel: `sudo nix-channel --update`
- Rebuild after channel update: `sudo nixos-rebuild switch`

## Tips
- Keep configs in version control
- Use `nix-collect-garbage -d` to prune old generations
