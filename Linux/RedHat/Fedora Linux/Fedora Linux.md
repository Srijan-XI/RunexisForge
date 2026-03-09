# Fedora Linux

## Introduction

Fedora Linux is a cutting-edge, community-driven Linux distribution sponsored by Red Hat. It serves as the upstream source for Red Hat Enterprise Linux (RHEL) and showcases the latest innovations in free and open-source software. Known for its "First" philosophy, Fedora is where new technologies are pioneered before making their way into enterprise distributions.

### Philosophy and Vision

- **First**: First to implement new features and technologies
- **Freedom**: 100% free and open-source software
- **Friends**: Global community collaboration
- **Features**: Innovation and cutting-edge development
- **Upstream First**: Contribute improvements upstream
- **Excellence**: High-quality software and user experience

### Key Characteristics

- **Base**: Independent (upstream for RHEL)
- **Package Manager**: DNF (Dandified YUM)
- **Package Format**: RPM
- **Init System**: systemd
- **Desktop**: GNOME (default), KDE, Xfce, others available
- **Display Server**: Wayland (default), X11 available
- **Security**: SELinux enforcing by default
- **Release Cycle**: Every 6 months (~April, ~October)
- **Support**: ~13 months per release
- **Default Filesystem**: Btrfs (Workstation), XFS (Server)

### Target Audience

- **Software Developers**: Latest development tools and environments
- **System Administrators**: Testing new enterprise features
- **Open Source Contributors**: Upstream development
- **Technology Enthusiasts**: Early adopters of new tech
- **Students and Educators**: Learning modern Linux
- **IoT Developers**: Fedora IoT edition
- **Desktop Users**: Polished GNOME experience

### Use Cases

- Software development and testing
- Learning newest Linux technologies
- Desktop workstation for developers
- Server environments (non-production)
- Container and cloud development
- IoT and edge computing
- Contributing to open source
- Testing ground for RHEL features

## Resources

### Official Resources

- **Website**: <https://getfedora.org>
- **Documentation**: <https://docs.fedoraproject.org>
- **Wiki**: <https://fedoraproject.org/wiki>
- **Magazine**: <https://fedoramagazine.org>
- **Packages**: <https://packages.fedoraproject.org>
- **Bugzilla**: <https://bugzilla.redhat.com>
- **Bodhi**: <https://bodhi.fedoraproject.org> (Updates)

### Community Resources

- **Discussion**: <https://discussion.fedoraproject.org>
- **Ask Fedora**: <https://ask.fedoraproject.org>
- **Reddit**: r/Fedora
- **Matrix**: #fedora:fedoraproject.org
- **IRC**: #fedora on Libera.Chat
- **Mailing Lists**: <https://lists.fedoraproject.org>

### Learning Resources

- [Fedora Quick Docs](https://docs.fedoraproject.org/en-US/quick-docs/)
- [Fedora Magazine](https://fedoramagazine.org)
- [Fedora Developer Portal](https://developer.fedoraproject.org)

---

## Fedora Editions

### Fedora Workstation

```
Purpose: Desktop/laptop for developers and creators
Desktop: GNOME (Wayland)
Target: Software developers, designers, general desktop users
Size: ~2 GB ISO

Features:
- Polished GNOME experience
- Flatpak support built-in
- Developer tools pre-installed
- Toolbox for containerized development
- Wayland by default
- Excellent laptop support

Default Software:
- GNOME Terminal
- Files (Nautilus)
- Firefox
- LibreOffice
- Rhythmbox
- GNOME Photos

Use Case: Primary workstation for development
```

### Fedora Server

```
Purpose: Server deployments and cloud
Interface: Minimal (no GUI), Cockpit web admin
Target: System administrators, DevOps
Size: ~2 GB ISO

Features:
- Minimal installation
- Cockpit web interface
- Server-specific modules
- Role-based deployment
- Container-ready

Modular Roles:
- Domain Controller (FreeIPA)
- Database server
- Web server

Use Case: Development/testing servers, homelab
```

### Fedora IoT

```
Purpose: Internet of Things and edge computing
Interface: Minimal
Target: IoT developers, edge deployments
Size: ~500 MB

Features:
- rpm-ostree (atomic updates)
- Greenboot (health checking)
- Container-focused
- Edge gateway ready
- ARM support

Supported Platforms:
- Raspberry Pi 3/4
- x86_64
- aarch64

Use Case: Edge devices, IoT gateways
```

### Fedora CoreOS

```
Purpose: Container-focused OS for clusters
Interface: Minimal (no package manager)
Target: Kubernetes, OpenShift deployments
Update: Automatic atomic updates

Features:
- Immutable infrastructure
- Ignition configuration
- Podman/Docker native
- Self-updating
- Minimal attack surface

Use Case: Kubernetes nodes, container hosts
```

---

## Fedora Spins (Alternative Desktops)

### KDE Plasma Desktop

```bash
Characteristics:
- Desktop: KDE Plasma
- Customization: Extremely high
- Resource: Medium
- Look: Modern, feature-rich

Install on existing Fedora:
sudo dnf install @kde-desktop-environment

Download: https://spins.fedoraproject.org/kde/
```

### Xfce Desktop

```bash
Characteristics:
- Desktop: Xfce
- Resource: Light
- Customization: High
- Look: Traditional, clean

Install:
sudo dnf install @xfce-desktop-environment

Download: https://spins.fedoraproject.org/xfce/
```

### LXQt Desktop

```bash
Characteristics:
- Desktop: LXQt
- Resource: Very light
- Target: Older hardware

Install:
sudo dnf install @lxqt-desktop-environment
```

### MATE-Compiz

```bash
Characteristics:
- Desktop: MATE (GNOME 2 fork)
- Effects: Compiz window manager
- Look: Classic with modern effects

Download: https://spins.fedoraproject.org/mate-compiz/
```

### Cinnamon

```bash
Characteristics:
- Desktop: Cinnamon
- Look: Windows-like, elegant
- Resource: Medium

Install:
sudo dnf install @cinnamon-desktop-environment
```

---

## Installation

### System Requirements

**Minimum (Workstation)**:
- **RAM**: 2 GB
- **Disk**: 20 GB
- **Processor**: 2 GHz dual-core

**Recommended**:
- **RAM**: 4+ GB
- **Disk**: 50+ GB SSD
- **Processor**: 2+ GHz quad-core
- **Graphics**: Modern GPU

### Installation Process

#### Download Fedora

```bash
# Fedora Workstation
https://getfedora.org/workstation/

# Fedora Server
https://getfedora.org/server/

# Fedora Spins
https://spins.fedoraproject.org/

# Verify download
gpg --verify Fedora-*.iso.sig
sha256sum Fedora-*.iso
```

#### Create Bootable USB

```bash
# Fedora Media Writer (recommended)
sudo dnf install mediawriter

# Or dd command
sudo dd if=Fedora-*.iso of=/dev/sdX bs=4M status=progress && sync

# Windows: Use Fedora Media Writer or Rufus
```

#### Installation Steps

```
1. Boot from USB
   - Press F12/F2/Del (varies by manufacturer)
   - Select USB device

2. Anaconda Installer Welcome
   - Select language
   - Click "Install to Hard Drive"

3. Installation Summary Screen
   - Keyboard
   - Time & Date
   - Installation Destination
   - Network & Hostname
   - Software Selection (if Server)

4. Installation Destination
   - Automatic partitioning (recommended)
   - Custom partitioning (advanced)
   - Encryption option available

5. Begin Installation
   - Set root password (optional, not recommended for Workstation)
   - Create user account
   - Wait for installation (~10-20 minutes)

6. Reboot
   - Remove USB
   - Boot into Fedora

7. Initial Setup (Workstation)
   - Privacy settings
   - Online accounts
   - Enable Third-Party Repositories
```

### Post-Installation

```bash
# Update system
sudo dnf upgrade --refresh

# Enable RPM Fusion (for additional software)
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# Install multimedia codecs
sudo dnf install gstreamer1-plugins-{bad-\*,good-\*,base} gstreamer1-plugin-openh264 gstreamer1-libav --exclude=gstreamer1-plugins-bad-free-devel
sudo dnf install lame\* --exclude=lame-devel
sudo dnf group upgrade --with-optional Multimedia

# Install essential tools
sudo dnf install vim git curl wget htop

# Install development tools
sudo dnf groupinstall "Development Tools" "Development Libraries"

# Enable Flathub
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

---

## Package Management

### DNF Commands

```bash
# Update system
sudo dnf upgrade --refresh
sudo dnf update  # Alias

# Search packages
dnf search keyword

# Install
sudo dnf install package-name

# Remove
sudo dnf remove package-name
sudo dnf autoremove

# Groups
dnf group list
sudo dnf group install "GNOME Desktop Environment"

# History
dnf history
sudo dnf history undo last

# Clean cache
sudo dnf clean all
```

### Toolbox (Container Development)

```bash
# Toolbox provides containerized development environments
# Pre-installed on Fedora Workstation

# Create toolbox
toolbox create
toolbox create fedora-toolbox-39  # Specific version

# Enter toolbox
toolbox enter

# List toolboxes
toolbox list

# Install in toolbox without affecting host
# Inside toolbox:
sudo dnf install package-name

# Multiple toolboxes for different projects
toolbox create project-python
toolbox create project-nodejs
toolbox enter project-python

# Remove toolbox
toolbox rm toolbox-name

# Benefits:
- Isolated development environments
- No pollution of host system
- Easy to reset/recreate
- Different Fedora versions
- GUI apps work from container
```

### Flatpak (Universal Packages)

```bash
# Pre-installed on Fedora Workstation

# Search Flathub
flatpak search app-name

# Install from Flathub
flatpak install flathub com.spotify.Client
flatpak install flathub org.gimp.GIMP

# List installed
flatpak list

# Update
flatpak update

# Run
flatpak run com.spotify.Client

# Uninstall
flatpak uninstall com.spotify.Client

# Popular Flatpaks:
- Visual Studio Code: com.visualstudio.code
- Slack: com.slack.Slack
- Discord: com.discordapp.Discord
- VLC: org.videolan.VLC
```

---

## Development Environment

### Programming Languages

```bash
# Python
sudo dnf install python3 python3-pip python3-devel
python3 -m venv myenv
source myenv/bin/activate

# Node.js
sudo dnf install nodejs npm
# Or use nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts

# Java
sudo dnf install java-latest-openjdk-devel
# Or specific version:
sudo dnf install java-11-openjdk-devel

# Go
sudo dnf install golang

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Ruby
sudo dnf install ruby ruby-devel

# PHP
sudo dnf install php php-cli php-fpm

# C/C++
sudo dnf groupinstall "Development Tools"
```

### IDEs and Editors

```bash
# Visual Studio Code (Flatpak)
flatpak install flathub com.visualstudio.code

# Or from Microsoft repo
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code

# JetBrains Toolbox
# Download from jetbrains.com/toolbox

# Eclipse
sudo dnf install eclipse-platform

# Vim/Neovim
sudo dnf install vim neovim

# Emacs
sudo dnf install emacs
```

### Container Development

```bash
# Podman (Docker alternative, rootless)
sudo dnf install podman

# Podman commands (Docker-compatible)
podman run -it fedora:latest /bin/bash
podman ps
podman images
podman build -t myapp .

# Buildah (advanced container building)
sudo dnf install buildah

# Docker (if needed)
sudo dnf install docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# Kubernetes development
sudo dnf install kubernetes kubectl
```

---

## System Administration

### Updates and Upgrades

```bash
# Check for updates
sudo dnf check-update

# Update all packages
sudo dnf upgrade --refresh

# Automatic updates
sudo dnf install dnf-automatic
sudo systemctl enable --now dnf-automatic.timer

# Configure /etc/dnf/automatic.conf
[commands]
apply_updates = yes

# Upgrade to next Fedora version
sudo dnf upgrade --refresh
sudo dnf install dnf-plugin-system-upgrade
sudo dnf system-upgrade download --releasever=39
sudo dnf system-upgrade reboot
```

### SELinux Management

```bash
# Check status
getenforce
sestatus

# Fedora enforces SELinux by default
# Recommended: Keep enforcing

# Temporarily permissive (troubleshooting)
sudo setenforce 0

# View contexts
ls -Z
ps auxZ

# Troubleshooting denials
sudo ausearch -m avc -ts recent
sudo sealert -a /var/log/audit/audit.log

# Install troubleshooting tools
sudo dnf install setroubleshoot-server
```

### Firewall

```bash
# firewalld is default and active
sudo firewall-cmd --state

# Allow service
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload

# Allow port
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload

# List configuration
sudo firewall-cmd --list-all
```

---

## Fedora Innovations

### Technologies Pioneered in Fedora

```
- systemd (init system)
- Wayland (display server)
- PipeWire (audio/video)
- Btrfs (filesystem, Workstation default)
- Flatpak (universal packages)
- rpm-ostree (atomic updates)
- Toolbox (containerized dev)
- Podman (rootless containers)
- D-Bus Broker
- Wireguard VPN integration
```

### PipeWire (Modern Audio/Video)

```bash
# PipeWire replaces PulseAudio and JACK
# Default since Fedora 34

# Check status
systemctl --user status pipewire

# Benefits:
- Lower latency
- Better Bluetooth support
- Pro audio capabilities
- Video routing
- Wayland screen sharing
```

---

## Troubleshooting

### Common Issues

```bash
# RPM Fusion not working
# Re-enable:
sudo dnf install rpmfusion-free-release rpmfusion-nonfree-release

# Multimedia codecs
sudo dnf swap ffmpeg-free ffmpeg --allowerasing

# NVIDIA drivers
sudo dnf install akmod-nvidia
sudo dnf install xorg-x11-drv-nvidia-cuda

# Boot issues
# At GRUB, edit kernel line
# Add: systemd.unit=rescue.target

# Broken packages
sudo dnf distro-sync
```

---

## Best Practices

```bash
# Use Toolbox for development
# Keep host system clean

# Regular updates
sudo dnf upgrade --refresh

# Enable automatic updates
sudo systemctl enable --now dnf-automatic.timer

# Use Flatpak for GUI apps
# Sandboxed and isolated

# Backup before major upgrade
sudo dnf system-upgrade download --releasever=39

# Monitor changelogs
https://fedoramagazine.org
```

---

## Real-World Use Cases

### Case Study 1: Software Development Workstation

```
Setup: Fedora Workstation 39
Stack: Python, Docker, VSCode, Git
Hardware: Lenovo ThinkPad X1 Carbon

Benefits:
- Latest development tools
- Toolbox for isolated environments
- Excellent laptop support
- Wayland smooth on HiDPI
- Updates every 6 months

Experience:
- Stable daily driver
- Great hardware compatibility
- Fast and responsive
```

### Case Study 2: Container Development Platform

```
Setup: Fedora Server 39
Stack: Podman, Kubernetes, GitLab Runner
Deployment: Development cluster

Benefits:
- Rootless containers (Podman)
- Latest Kubernetes versions
- SELinux container isolation
- Easy upgrade path to RHEL

Outcome:
- Reliable dev environment
- Testing ground for production
```

---

## Conclusion

Fedora Linux stands as the innovation engine of the Red Hat ecosystem, providing cutting-edge technology while maintaining stability and usability. Its "First" philosophy makes it the perfect choice for developers, enthusiasts, and organizations wanting to stay ahead of the technology curve while benefiting from a polished, well-supported Linux distribution.

With strong community backing, excellent documentation, and direct upstream influence on RHEL, Fedora offers a compelling platform for both desktop users seeking the latest features and system administrators testing future enterprise technologies.

