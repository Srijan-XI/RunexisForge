# Linux: Kernel and Distributions

Linux is a kernel — the core of an operating system that manages hardware, processes, memory, and devices. The Linux kernel, started by Linus Torvalds in 1991 and licensed under GPLv2, is combined with userland tools (often from the GNU project) and other software to form complete operating systems known as Linux distributions (distros). In everyday use, people say “Linux” to refer to these distros, but it’s important to remember that Linux itself is the kernel.

## What Is a Distribution?
A distribution bundles the Linux kernel with:
- A base userland (shells, core utilities, libraries)
- A package manager and repositories
- An installer and configuration tools
- Optional desktop environments, server roles, and tooling

Different distros make different choices here, which leads to distinct experiences and ecosystems.

## Major Distro Families
Below are widely used families, their package tools, and notable traits:

### Debian Family
- Examples: Debian, Ubuntu, Linux Mint, Pop!_OS
- Package tools: `apt` with `dpkg` (packages: `.deb`)
- Traits: Stability-first (Debian), regular LTS releases (Ubuntu), beginner-friendly variants (Mint, Pop!_OS)

### Red Hat Family
- Examples: RHEL, CentOS Stream, Fedora
- Package tools: `dnf`/`yum` with `rpm` (packages: `.rpm`)
- Traits: Enterprise focus (RHEL), upstream innovation (Fedora), rolling preview of RHEL (CentOS Stream)

### SUSE Family
- Examples: openSUSE Leap/Tumbleweed, SUSE Linux Enterprise (SLE)
- Package tools: `zypper` with `rpm`
- Traits: Strong admin tooling (YaST), choice of stable (Leap) or rolling (Tumbleweed)

### Arch Family
- Examples: Arch Linux, Manjaro, EndeavourOS
- Package tools: `pacman` and the Arch User Repository (AUR) (packages: `.pkg.tar.zst`)
- Traits: Rolling release, do-it-yourself philosophy (Arch), more guided installers (Manjaro/EndeavourOS)

### Source-Based and Minimalist Distros
- Gentoo (Portage `emerge`): Highly customizable, compile-from-source approach
- Slackware: Classic Unix-like simplicity
- Alpine (`apk`): Lightweight, musl + busybox; popular in containers
- Void (runit): Minimal, independent, non-systemd
- NixOS (`nix`): Declarative, reproducible system configuration

## Common Concepts Across Distros
- Filesystems: ext4 (default on many), XFS, Btrfs, ZFS
- Init/system management: `systemd` (most mainstream distros), OpenRC, runit
- Desktop environments: GNOME, KDE Plasma, Xfce, Cinnamon, MATE, LXQt
- Release models: Fixed releases with LTS (Ubuntu, Debian stable, RHEL/SLE) vs rolling (Arch, openSUSE Tumbleweed)
- Containers: `ubuntu`, `debian`, and especially `alpine` are common base images; Fedora CoreOS targets immutable, container-centric deployments

## Where Linux Is Used
- Servers and cloud: Web, databases, microservices; major distributions provide LTS and enterprise support
- Desktops and laptops: Developer workstations, general-purpose computing
- Embedded and mobile: Routers, IoT devices, automotive; Android uses the Linux kernel
- Chromebooks: ChromeOS is built on the Linux kernel

## Choosing a Distro
Pick based on your priorities:
- Beginner-friendly and well-supported: Ubuntu, Linux Mint, Pop!_OS
- Developer workstation with fresh packages: Fedora, openSUSE Tumbleweed
- Rolling/DIY: Arch (or Manjaro/EndeavourOS to ease onboarding)
- Servers/enterprise: Debian stable, Ubuntu LTS, RHEL/SLE
- Containers/minimal: Alpine, Ubuntu Minimal, Debian Slim

## Quick Terminology Reminder
- Linux: The kernel (not a full OS by itself)
- GNU/Linux: A common way to refer to distros that combine GNU userland with the Linux kernel
- Distro: A complete OS built around the Linux kernel, packaging and tooling choices

This intro aims to clarify that Linux is a kernel and to map the landscape of distro families so you can choose the right fit for your use case.

## Quick Links
- Arch family: [Overview](Arch/intro.md) • [User Guide](Arch/user-guide.md)
	- Distros: [BlackArch](Arch/BlackArch/intro.md) • [Garuda Linux](Arch/GarudaLinux/intro.md) • [RedArch](Arch/RedArch/intro.md)
- Debian family: [Overview](Debian/intro.md) • [User Guide](Debian/user-guide.md)
	- Distros: [Kali Linux](Debian/KaliLinux/intro.md) • [Linux Mint](Debian/MintLinux/intro.md) • [Parrot OS](Debian/ParrotSec/intro.md) • [Ubuntu](Debian/Ubuntu/intro.md)
- Red Hat family: [Overview](RedHat/intro.md) • [User Guide](RedHat/user-guide.md)
	- Distros: [CentOS Stream](RedHat/CentOS/intro.md) • [Fedora Linux](RedHat/Fedora%20Linux/intro.md) • [Oracle Linux](RedHat/OracleLinux/intro.md) • [RHEL](RedHat/RedHatEnterpriseLinux/intro.md)
- Gentoo: [Overview](Gentoo/intro.md) • [User Guide](Gentoo/user-guide.md)
- Slackware: [Overview](Slackware/intro.md) • [User Guide](Slackware/user-guide.md)

## Getting Started
- Installation guide: [Linux/INSTALL.md](INSTALL.md)

