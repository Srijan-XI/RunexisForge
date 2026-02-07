# Gentoo Linux

## Introduction

Gentoo Linux is a highly flexible, source-based Linux distribution that allows users to compile and optimize every package specifically for their hardware and use cases. Built around the powerful Portage package management system, Gentoo provides unparalleled customization through USE flags, giving users complete control over what features are compiled into their software.

### Philosophy and Design Principles

- **Choice**: Freedom to choose every aspect of the system
- **Flexibility**: Customize software features via USE flags
- **Performance**: Compile optimizations for specific hardware
- **Transparency**: Source-based approach shows exactly what's installed
- **Documentation**: Comprehensive Gentoo Handbook guides users
- **Community-Driven**: Strong community support and contribution
- **Learning**: Deep understanding of Linux through hands-on experience

### Key Characteristics

- **Package Manager**: Portage (emerge) - source-based with binary option
- **USE Flags**: Compile-time feature selection system
- **Compilation**: Build software optimized for your hardware
- **Init Systems**: OpenRC (default) or systemd available
- **Rolling Release**: Continuous updates without version upgrades
- **Profiles**: Pre-configured system settings for different use cases
- **Overlays**: Third-party package repositories (like Gentoo's AUR)
- **Flexibility**: Support for multiple architectures and configurations

### Use Cases

- Performance-critical workstations and servers
- Learning Linux internals and system administration
- Customized systems with specific requirements
- Embedded systems and specialized hardware
- Security-focused installations with hardened profiles
- Server environments requiring optimization
- Development workstations for power users
- Research and academic environments

### Target Audience

- Advanced Linux users who want full control
- System administrators requiring customization
- Performance enthusiasts and overclockers
- Security professionals using hardened systems
- Developers wanting optimized build environments
- Linux enthusiasts who enjoy tinkering
- Users with specific hardware or software requirements

## History and Philosophy

### Origins

- **Created**: 2000 by Daniel Robbins
- **Inspiration**: FreeBSD's Ports collection
- **Original Name**: Enoch Linux
- **Philosophy**: Meta-distribution (build your own)
- **Name Origin**: Gentoo penguin (fastest underwater swimming penguin)

### Major Milestones

- **2000**: Initial release as Enoch Linux
- **2002**: Renamed to Gentoo Linux
- **2004**: Gentoo Foundation established
- **2008**: Introduction of Git for Portage tree
- **2010**: Hardened Gentoo project gains prominence
- **2015**: OpenRC becomes default init system
- **2016**: systemd support fully integrated
- **Present**: Active development with modern tooling

### Gentoo Philosophy

The Gentoo Philosophy emphasizes:
- **Source-based**: Compile everything from source
- **Optimization**: Tailored to specific hardware
- **Choice**: Multiple options for every component
- **Documentation**: Teach users, don't hide complexity
- **Community**: Collaborative development model

## Resources

### Official Resources

- **Website**: <https://www.gentoo.org>
- **Handbook**: <https://wiki.gentoo.org/wiki/Handbook:Main_Page>
- **Wiki**: <https://wiki.gentoo.org>
- **Forums**: <https://forums.gentoo.org>
- **Packages**: <https://packages.gentoo.org>
- **Overlays**: <https://overlays.gentoo.org>
- **Bugzilla**: <https://bugs.gentoo.org>
- **Git Repository**: <https://gitweb.gentoo.org>

### Community Resources

- **IRC**: #gentoo on Libera.Chat
- **Reddit**: r/Gentoo
- **Gentoo Discord**: Community servers
- **Mailing Lists**: <https://www.gentoo.org/get-involved/mailing-lists/>
- **Planet Gentoo**: <https://planet.gentoo.org> (Blog aggregator)
- **Gentoo News**: <https://www.gentoo.org/news/>

### Learning Resources

- [Gentoo Handbook](https://wiki.gentoo.org/wiki/Handbook:Main_Page) - Comprehensive installation and configuration guide
- [Gentoo Wiki](https://wiki.gentoo.org) - Extensive documentation
- [Portage Manual](https://wiki.gentoo.org/wiki/Portage) - Package management guide
- [USE Flag Index](https://www.gentoo.org/support/use-flags/) - Complete USE flag reference

---

## Installation

Gentoo installation is a detailed process that teaches you about Linux system components. The Gentoo Handbook is the authoritative guide.

### System Requirements

- **Minimum RAM**: 256 MB (2 GB+ recommended for compilation)
- **Minimum Disk**: 2.5 GB (20+ GB recommended)
- **Processor**: x86, x86_64, ARM, ARM64, PPC, SPARC, etc.
- **Internet**: Required for downloading sources
- **Time**: 4-8 hours for first installation

### Installation Media

#### Downloading Gentoo

```bash
# Official download page
# https://www.gentoo.org/downloads/

# Minimal Installation CD (recommended)
# - LiveCD with basic tools
# - ~400 MB download
# - Network required for installation

# LiveGUI (optional)
# - Full graphical environment
# - Easier for beginners
# - ~2 GB download

# Download from mirror:
wget https://bouncer.gentoo.org/fetch/root/all/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal-*.iso

# Verify download
wget https://bouncer.gentoo.org/fetch/root/all/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal-*.iso.DIGESTS
sha512sum install-amd64-minimal-*.iso
# Compare with DIGESTS file
```

#### Creating Installation Media

```bash
# Linux
dd if=install-amd64-minimal-*.iso of=/dev/sdX bs=4M status=progress && sync

# Windows - use Rufus, balenaEtcher, or similar

# Verify written media
dd if=/dev/sdX bs=4M | sha512sum
```

### Installation Overview

The Gentoo installation process follows these stages:

1. **Prepare disks** - Partition and format storage
2. **Install stage tarball** - Minimal base system
3. **Configure Portage** - Package manager settings
4. **Chroot** - Enter the new environment
5. **Configure system** - Locale, timezone, kernel
6. **Install kernel** - Compile or use distribution kernel
7. **Configure bootloader** - GRUB, LILO, etc.
8. **System configuration** - Network, users, services
9. **Install tools** - System utilities
10. **Reboot** - Into your new Gentoo system

### Stage 1: Preparing Disks

```bash
# Boot from installation media
# Login as root (no password)

# Check disk devices
lsblk
fdisk -l

# Partition disk (UEFI example)
parted -a optimal /dev/sda

(parted) mklabel gpt
(parted) unit mib

# Create partitions
(parted) mkpart primary 1 3        # BIOS boot (for GPT on BIOS)
(parted) mkpart primary fat32 3 515  # EFI System Partition
(parted) mkpart primary 515 4611   # Boot partition
(parted) mkpart primary 4611 8707  # Swap (4GB)
(parted) mkpart primary 8707 -1    # Root partition

(parted) name 1 grub
(parted) name 2 efi
(parted) name 3 boot
(parted) name 4 swap
(parted) name 5 rootfs

(parted) set 1 bios_grub on
(parted) set 2 esp on
(parted) quit

# Create filesystems
mkfs.fat -F32 /dev/sda2    # EFI partition
mkfs.ext4 /dev/sda3        # Boot partition
mkfs.ext4 /dev/sda5        # Root partition
mkswap /dev/sda4           # Swap
swapon /dev/sda4

# Mount filesystems
mount /dev/sda5 /mnt/gentoo
mkdir -p /mnt/gentoo/boot
mount /dev/sda3 /mnt/gentoo/boot
mkdir -p /mnt/gentoo/boot/efi
mount /dev/sda2 /mnt/gentoo/boot/efi
```

### Stage 2: Installing Base System

```bash
# Navigate to mount point
cd /mnt/gentoo

# Set date and time (important for SSL)
date MMDDhhmmYYYY
# Example: date 120114302024 (Dec 1, 14:30, 2024)

# Download stage3 tarball
# Check https://www.gentoo.org/downloads/ for latest

# Download using links browser (if needed)
links https://www.gentoo.org/downloads/mirrors/

# Or use wget directly:
wget https://bouncer.gentoo.org/fetch/root/all/releases/amd64/autobuilds/current-stage3-amd64-openrc/stage3-amd64-openrc-*.tar.xz

# Verify tarball
wget https://bouncer.gentoo.org/fetch/root/all/releases/amd64/autobuilds/current-stage3-amd64-openrc/stage3-amd64-openrc-*.tar.xz.DIGESTS
sha512sum stage3-*.tar.xz
# Compare with DIGESTS file

# Extract stage3
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner

# Clean up
rm stage3-*.tar.xz*
```

### Stage 3: Configuring Portage

```bash
# Configure compile options
nano -w /mnt/gentoo/etc/portage/make.conf

# Example configuration:
# COMMON_FLAGS: Compiler optimization flags
# MAKEOPTS: Number of parallel make jobs (-j = CPU cores + 1)
# USE: Global USE flags
# ACCEPT_LICENSE: Which licenses to accept

# Sample make.conf:
COMMON_FLAGS="-O2 -pipe -march=native"
CFLAGS="${COMMON_FLAGS}"
CXXFLAGS="${COMMON_FLAGS}"
FCFLAGS="${COMMON_FLAGS}"
FFLAGS="${COMMON_FLAGS}"
MAKEOPTS="-j5"  # For 4-core CPU
ACCEPT_LICENSE="*"
GENTOO_MIRRORS="https://mirror.us.leaseweb.net/gentoo/"
USE="bindist"

# Select mirrors
mirrorselect -i -o >> /mnt/gentoo/etc/portage/make.conf

# Copy DNS info
cp --dereference /etc/resolv.conf /mnt/gentoo/etc/

# Mount necessary filesystems
mount --types proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --make-rslave /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
mount --make-rslave /mnt/gentoo/dev
mount --bind /run /mnt/gentoo/run
mount --make-slave /mnt/gentoo/run
```

### Stage 4: Entering the New Environment

```bash
# Chroot into new system
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) ${PS1}"

# Sync Portage tree
emerge-webrsync
# Or for latest (slower):
emerge --sync

# Read news items
eselect news list
eselect news read
```

### Stage 5: Choosing Profile

```bash
# List available profiles
eselect profile list

# Example output shows profiles like:
# [1]   default/linux/amd64/17.1 (stable)
# [2]   default/linux/amd64/17.1/desktop (stable)
# [3]   default/linux/amd64/17.1/desktop/gnome (stable)
# [4]   default/linux/amd64/17.1/desktop/kde (stable)
# [5]   default/linux/amd64/17.1/desktop/plasma (stable)

# Select appropriate profile
eselect profile set 2  # Desktop profile

# Update @world set
emerge --ask --verbose --update --deep --newuse @world
```

### Stage 6: Configure Timezone and Locale

```bash
# Set timezone
echo "America/New_York" > /etc/timezone
emerge --config sys-libs/timezone-data

# Configure locales
nano -w /etc/locale.gen

# Uncomment desired locales:
en_US ISO-8859-1
en_US.UTF-8 UTF-8

# Generate locales
locale-gen

# Set system locale
eselect locale list
eselect locale set 4  # en_US.utf8 (example)

# Reload environment
env-update && source /etc/profile && export PS1="(chroot) ${PS1}"
```

### Stage 7: Kernel Installation

Gentoo offers multiple kernel options:

#### Option 1: Distribution Kernel (Easiest)

```bash
# Install distribution kernel (precompiled)
emerge --ask sys-kernel/gentoo-kernel-bin

# This is the easiest option for beginners
# Kernel is automatically configured and updated
```

#### Option 2: Distribution Kernel (Source)

```bash
# Install kernel sources and automatic build
emerge --ask sys-kernel/gentoo-kernel

# Kernel is built automatically with sensible defaults
# Can be customized via /etc/kernel/config.d/
```

#### Option 3: Manual Kernel Configuration

```bash
# Install kernel sources
emerge --ask sys-kernel/gentoo-sources

# Install firmware (for hardware support)
emerge --ask sys-kernel/linux-firmware

# Enter source directory
cd /usr/src/linux

# Configure kernel
make menuconfig
# Or use existing config:
# make defconfig
# make localmodconfig (uses currently loaded modules)

# Compile kernel
make -j5  # Adjust -j to CPU cores

# Install modules
make modules_install

# Install kernel
make install

# Install genkernel (for initramfs)
emerge --ask sys-kernel/genkernel
genkernel --install --kernel-config=/usr/src/linux/.config initramfs
```

### Stage 8: System Configuration

```bash
# Configure fstab
nano -w /etc/fstab

# Example fstab:
/dev/sda2   /boot/efi   vfat    defaults,noatime    0 2
/dev/sda3   /boot       ext4    defaults,noatime    0 2
/dev/sda5   /           ext4    defaults,noatime    0 1
/dev/sda4   none        swap    sw                  0 0

# Set hostname
nano -w /etc/conf.d/hostname
hostname="gentoo"

# Configure network
# For DHCP:
emerge --ask net-misc/dhcpcd
rc-update add dhcpcd default

# For static IP:
nano -w /etc/conf.d/net
config_eth0="192.168.1.100 netmask 255.255.255.0"
routes_eth0="default via 192.168.1.1"

cd /etc/init.d
ln -s net.lo net.eth0
rc-update add net.eth0 default

# Set root password
passwd

# Configure hosts file
nano -w /etc/hosts
127.0.0.1   gentoo.localdomain gentoo localhost
```

### Stage 9: Install System Tools

```bash
# System logger
emerge --ask app-admin/sysklogd
rc-update add sysklogd default

# Cron daemon
emerge --ask sys-process/cronie
rc-update add cronie default

# File indexing (optional)
emerge --ask sys-apps/mlocate

# Time synchronization
emerge --ask net-misc/chrony
rc-update add chronyd default

# Filesystem tools
emerge --ask sys-fs/e2fsprogs  # ext4
emerge --ask sys-fs/dosfstools # FAT/VFAT

# Networking tools
emerge --ask net-misc/dhcpcd
emerge --ask net-wireless/wpa_supplicant  # For WiFi
```

### Stage 10: Bootloader Installation

#### GRUB2 (Recommended)

```bash
# Install GRUB
emerge --ask sys-boot/grub

# For UEFI systems:
grub-install --target=x86_64-efi --efi-directory=/boot/efi
grub-mkconfig -o /boot/grub/grub.cfg

# For BIOS systems:
grub-install /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```

### Stage 11: Finalize and Reboot

```bash
# Exit chroot
exit

# Unmount all
cd
umount -l /mnt/gentoo/dev{/shm,/pts,}
umount -R /mnt/gentoo

# Reboot
reboot

# Remove installation media
# Login as root with password set earlier
```

### Post-Installation

```bash
# Create regular user
useradd -m -G users,wheel,audio,video,usb,cdrom,portage -s /bin/bash username
passwd username

# Install sudo
emerge --ask app-admin/sudo
visudo
# Uncomment: %wheel ALL=(ALL) ALL

# Update system
emerge --sync
emerge --ask --verbose --update --deep --newuse @world
```

---

## Package Management with Portage

### Understanding Portage

Portage is Gentoo's package management system, featuring:
- Source-based compilation with optimization
- USE flags for feature control
- Dependency resolution
- Binary package support (optional)
- Slotting (multiple versions simultaneously)
- Overlays for third-party packages

### Emerge Command Basics

```bash
# Sync Portage tree
emerge --sync
# Or faster initial sync:
emerge-webrsync

# Search for packages
emerge --search keyword
emerge --searchdesc keyword  # Search descriptions too
eix keyword  # Faster (requires: emerge eix)

# Get package information
emerge --info category/package
eix -v category/package

# Install packages
emerge --ask category/package
emerge -av category/package  # Short form

# Install by name (searches available categories)
emerge --ask package-name

# Remove packages
emerge --ask --depclean category/package
emerge -ac category/package  # Short form

# Update all packages
emerge --ask --update --deep --newuse @world
emerge -avuDN @world  # Short form

# Upgrade only specified packages
emerge --ask --update category/package
```

### Advanced Emerge Usage

```bash
# Pretend (show what would be done)
emerge --pretend category/package
emerge -p category/package

# Fetch only (don't install)
emerge --fetchonly category/package
emerge -f category/package

# Resume interrupted installation
emerge --resume

# Skip first package in resume list
emerge --resume --skipfirst

# Clean up orphaned dependencies
emerge --ask --depclean
emerge -ac

# Rebuild dependencies
emerge --ask @preserved-rebuild

# Check for security updates
glsa-check -l affected
glsa-check -f affected
```

### USE Flags

USE flags control what features are compiled into packages.

#### Global USE Flags

```bash
# Edit global USE flags
nano -w /etc/portage/make.conf

# Example USE flags:
USE="X gtk qt5 alsa pulseaudio bluetooth wifi \
     -gnome -kde systemd dbus udev \
     bindist threads unicode nls"

# Common USE flags:
# X          - X Window System support
# gtk        - GTK+ toolkit support
# qt5        - Qt5 toolkit support
# alsa       - ALSA sound support
# pulseaudio - PulseAudio support
# systemd    - systemd init support
# -flag      - Disable flag (minus prefix)
```

#### Per-Package USE Flags

```bash
# Create package.use directory (if doesn't exist)
mkdir -p /etc/portage/package.use

# Set USE flags for specific package
echo "www-client/firefox -bindist custom-cflags" >> /etc/portage/package.use/firefox

# Or create file per package:
nano -w /etc/portage/package.use/vlc
media-video/vlc dvd bluray ffmpeg mp3 aac
```

#### Querying USE Flags

```bash
# List all USE flags
emerge --info | grep ^USE

# Show USE flags for package
emerge --pretend --verbose category/package

# List all available USE flags
less /var/db/repos/gentoo/profiles/use.desc

# Show USE flag descriptions
euse -i flag-name

# Find packages using specific USE flag
equery hasuse use-flag

# Show installed packages with USE flags
qlist -IUv
```

### Package Masking and Keywords

#### Accepting Unstable Packages

```bash
# Accept ~amd64 (testing) for specific package
echo "category/package ~amd64" >> /etc/portage/package.accept_keywords

# Example:
echo "app-editors/vim ~amd64" >> /etc/portage/package.accept_keywords/vim

# Accept for all packages (not recommended)
echo "ACCEPT_KEYWORDS=\"~amd64\"" >> /etc/portage/make.conf
```

#### Masking/Unmasking Packages

```bash
# Unmask package
echo "category/package" >> /etc/portage/package.unmask

# Mask package (prevent installation)
echo "category/package" >> /etc/portage/package.mask

# Mask specific version
echo ">=category/package-2.0" >> /etc/portage/package.mask
```

### Binary Packages

Gentoo supports binary packages to speed up installation:

```bash
# Enable binary packages
nano -w /etc/portage/make.conf
FEATURES="buildpkg"
PORTAGE_BINHOST="https://gentoo.osuosl.org/experimental/amd64/binpkg/default/linux/17.1/x86-64/"

# Install binary package (if available)
emerge --ask --getbinpkg category/package

# Build binary package without installing
quickpkg category/package

# Install from local binary
emerge --ask --usepkg category/package
```

### Portage Maintenance

```bash
# Check for configuration file updates
etc-update
# Or use dispatch-conf (more features)
dispatch-conf

# Clean source files
eclean distfiles
# Or keep only installed packages:
eclean-dist --deep

# Clean binary packages
eclean packages
eclean-pkg --deep

# Fix broken dependencies
revdep-rebuild

# Verify installed packages
emerge --ask @preserved-rebuild
```

---

## USE Flags Deep Dive

### Understanding USE Flags

USE flags are Gentoo's killer feature, allowing fine-grained control over package features.

### Common USE Flag Categories

#### Graphical Toolkits
```bash
X          # X Window System
gtk        # GTK+ (GNOME toolkit)
qt5, qt6   # Qt toolkit (KDE)
wayland    # Wayland display server
```

#### Audio/Video
```bash
alsa       # ALSA sound
pulseaudio # PulseAudio sound server
jack       # JACK audio connection kit
ffmpeg     # FFmpeg multimedia framework
libav      # Alternative to ffmpeg
gstreamer  # GStreamer multimedia
```

#### Networking
```bash
wifi       # Wireless support
bluetooth  # Bluetooth support
networkmanager # NetworkManager
```

#### System
```bash
systemd    # systemd init system
openrc     # OpenRC init system (default)
pam        # PAM authentication
acl        # Access Control Lists
selinux    # SELinux support
```

#### Hardware
```bash
nvidia     # NVIDIA graphics
amd        # AMD graphics
cuda       # CUDA support
opencl     # OpenCL support
```

### USE Flag Strategies

```bash
# Minimal system (small, fast)
USE="-* X gtk -gnome -kde alsa"

# Full-featured desktop
USE="X gtk qt5 alsa pulseaudio bluetooth wifi \
     dbus udev systemd bindist unicode threads"

# Server (no GUI)
USE="-X -gtk -qt5 -alsa bindist"

# Multimedia workstation
USE="X gtk qt5 alsa pulseaudio jack ffmpeg cuda opencl \
     bluetooth wifi v4l theora vorbis mp3 aac"
```

---

## Profiles and System Configuration

### Portage Profiles

Profiles define default settings for your system.

```bash
# List available profiles
eselect profile list

# Common profiles:
# default/linux/amd64/17.1                  - Minimal
# default/linux/amd64/17.1/desktop          - Desktop base
# default/linux/amd64/17.1/desktop/gnome    - GNOME desktop
# default/linux/amd64/17.1/desktop/kde      - KDE desktop
# default/linux/amd64/17.1/desktop/plasma   - KDE Plasma
# default/linux/amd64/17.1/systemd          - systemd init
# default/linux/amd64/17.1/hardened         - Security hardened
# default/linux/amd64/17.1/no-multilib      - 64-bit only

# Select profile
eselect profile set <number>

# After changing profile, update system
emerge --ask --update --deep --newuse @world
```

### make.conf Optimization

```bash
# Comprehensive make.conf example
nano -w /etc/portage/make.conf
```

```bash
# Compiler flags
COMMON_FLAGS="-O2 -pipe -march=native -mtune=native"
CFLAGS="${COMMON_FLAGS}"
CXXFLAGS="${COMMON_FLAGS}"
FCFLAGS="${COMMON_FLAGS}"
FFLAGS="${COMMON_FLAGS}"

# CPU flags (auto-detect)
CPU_FLAGS_X86="aes avx avx2 f16c fma3 mmx mmxext pclmul popcnt sse sse2 sse3 sse4_1 sse4_2 ssse3"

# Parallel compilation
MAKEOPTS="-j9 -l8"  # For 8-core CPU
EMERGE_DEFAULT_OPTS="--jobs=4 --load-average=8"

# Portage features
FEATURES="parallel-fetch candy ccache"
CCACHE_SIZE="10G"

# USE flags
USE="X gtk qt5 alsa pulseaudio bluetooth wifi systemd \
     dbus udev bindist threads unicode nls \
     -gnome -kde networkmanager"

# Licenses
ACCEPT_LICENSE="* -@EULA"

# Video cards
VIDEO_CARDS="nvidia intel"  # Adjust for your hardware

# Input devices
INPUT_DEVICES="libinput"

# Mirrors
GENTOO_MIRRORS="https://mirror.us.leaseweb.net/gentoo/ \
                https://gentoo.osuosl.org/"

# Language
L10N="en en-US"
LINGUAS="en en_US"

# Portage directories
PORTDIR="/var/db/repos/gentoo"
DISTDIR="/var/cache/distfiles"
PKGDIR="/var/cache/binpkgs"
```

---

## Desktop Environments

### KDE Plasma

```bash
# Select KDE Plasma profile
eselect profile set default/linux/amd64/17.1/desktop/plasma

# Update system for profile
emerge --ask --update --deep --newuse @world

# Install KDE Plasma
emerge --ask kde-plasma/plasma-meta

# Install KDE applications
emerge --ask kde-apps/kde-apps-meta

# Display manager
emerge --ask x11-misc/sddm
rc-update add sddm default

# Start SDDM
rc-service sddm start
```

### GNOME

```bash
# Select GNOME profile
eselect profile set default/linux/amd64/17.1/desktop/gnome

# Update system
emerge --ask --update --deep --newuse @world

# Install GNOME
emerge --ask gnome-base/gnome

# Display manager
rc-update add gdm default
rc-service gdm start
```

### Xfce

```bash
# Install Xfce
emerge --ask xfce-base/xfce4-meta
emerge --ask xfce-extra/xfce4-goodies  # Optional extras

# Display manager (LightDM)
emerge --ask x11-misc/lightdm
rc-update add lightdm default

# Or start manually
echo "exec startxfce4" > ~/.xinitrc
startx
```

### i3 Window Manager

```bash
# Install i3
emerge --ask x11-wm/i3
emerge --ask x11-misc/i3status x11-misc/i3lock

# Terminal emulator
emerge --ask x11-terms/rxvt-unicode

# Application launcher
emerge --ask x11-misc/dmenu

# Start i3
echo "exec i3" > ~/.xinitrc
startx
```

---

## Gentoo-Based Distributions

### Calculate Linux

**Purpose**: User-friendly Gentoo-based distribution

**Features**:
- Based on Gentoo Linux
- Binary package support for faster installation
- Multiple desktop variants (KDE, Xfce, MATE, Cinnamon)
- Pre-configured for ease of use
- Rolling release model
- Compatible with Gentoo packages

```bash
# Website: https://www.calculate-linux.org/
# Variants:
# - CLD (Desktop)
# - CLS (Server)
# - CLDM (MATE desktop)
# - CLDX (Xfce desktop)
# - CLSK (KDE Plasma desktop)

# Installation:
# Download ISO from website
# GUI installer available
# Can be converted to pure Gentoo if desired
```

**Resources**:
- Download: <https://www.calculate-linux.org/main/en/download>
- Documentation: <https://wiki.calculate-linux.org/>
- Forum: <https://forums.calculate-linux.org/>

### Funtoo Linux

**Purpose**: Gentoo variant with enhanced features

**Features**:
- Created by Daniel Robbins (Gentoo founder)
- Git-based Portage tree
- Enhanced profiles (kits system)
- Automated kernel building (debian-sources)
- Better defaults for desktop use
- Metro build tool for customization

```bash
# Website: https://www.funtoo.org/
# Key Differences from Gentoo:
# - Kits system (separate repos for different components)
# - Metro build framework
# - Enhanced ego tool (Funtoo's eselect)
# - Automated stage3 building

# Installation similar to Gentoo:
# Download stage3 from Funtoo
# Follow Funtoo install guide
# https://www.funtoo.org/Install
```

**Resources**:
- Website: <https://www.funtoo.org>
- Wiki: <https://www.funtoo.org/Welcome>
- Forums: <https://forums.funtoo.org/>

### Redcore Linux

**Purpose**: Pre-configured Gentoo for desktop use

**Features**:
- Based on Gentoo with hardened kernel
- Binary packages for quick installation
- LXQt desktop environment
- Pre-configured and ready to use
- Sisyphus package manager (wrapper for Portage)
- Rolling release

```bash
# Website: https://redcorelinux.org/
# Focus: Easy-to-use Gentoo-based desktop
# Package Manager: Sisyphus (GUI) + Portage

# Sisyphus usage:
sisyphus search package
sisyphus install package
sisyphus update
sisyphus upgrade
```

**Resources**:
- Website: <https://redcorelinux.org>
- Wiki: <https://wiki.redcorelinux.org/>
- Forum: <https://forum.redcorelinux.org/>

### Sabayon Linux (Discontinued)

**Purpose**: Binary-based Gentoo derivative

**Historical Significance**:
- User-friendly Gentoo alternative
- Binary package repositories (Entropy)
- Live DVD with installation option
- Compatible with Portage
- Discontinued in 2021

### Container Linux (CoreOS)

**Purpose**: Container-focused minimal OS

**Features**:
- Originally Gentoo-based (now uses different base)
- Immutable infrastructure
- Automatic updates
- Container-optimized
- Now part of Fedora CoreOS project

### Pentoo

**Purpose**: Security-focused live distribution

**Features**:
- Based on Gentoo
- Penetration testing tools
- Hardened kernel
- Can be installed or run live
- Regular security tool updates

```bash
# Website: https://www.pentoo.ch/
# Use Case: Security testing, penetration testing
# Installation: Live USB or full install

# Tools included:
# - Network analysis
# - Wireless testing
# - Exploit frameworks
# - Forensics tools
```

### Chromium OS (Gentoo-based)

**Purpose**: Open-source base for Chrome OS

**Features**:
- Google Chrome OS is built on Gentoo
- Uses Portage for package management
- Chromium OS is the open-source version
- Can be built from source

```bash
# Chrome OS uses Gentoo:
# - Portage package manager
# - Gentoo toolchain
# - Custom Gentoo build system
# - Optimized for Chromebooks
```

---

## System Administration

### Service Management (OpenRC)

```bash
# Start service
rc-service servicename start

# Stop service
rc-service servicename stop

# Restart service
rc-service servicename restart

# Check status
rc-service servicename status

# Add to runlevel
rc-update add servicename default

# Remove from runlevel
rc-update del servicename default

# List all services
rc-status --all

# Show current runlevel
rc-status

# Common runlevels:
# boot    - System boot
# default - Normal operation
# shutdown - System shutdown
```

### Service Management (systemd)

```bash
# For systemd profile users
systemctl start servicename
systemctl stop servicename
systemctl restart servicename
systemctl status servicename
systemctl enable servicename
systemctl disable servicename
systemctl list-units
```

### Network Configuration

#### OpenRC with netifrc

```bash
# Configure interface
nano -w /etc/conf.d/net

# DHCP:
config_eth0="dhcp"

# Static IP:
config_eth0="192.168.1.100/24"
routes_eth0="default via 192.168.1.1"
dns_servers_eth0="8.8.8.8 8.8.4.4"

# Create symlink
cd /etc/init.d
ln -s net.lo net.eth0

# Start and enable
rc-service net.eth0 start
rc-update add net.eth0 default
```

#### NetworkManager

```bash
# Install NetworkManager
emerge --ask net-misc/networkmanager

# Enable and start
rc-update add NetworkManager default
rc-service NetworkManager start

# Command-line control
nmcli device status
nmcli connection show
nmcli device wifi list
nmcli device wifi connect SSID password PASSWORD
```

#### Wireless with wpa_supplicant

```bash
# Install wpa_supplicant
emerge --ask net-wireless/wpa_supplicant

# Generate config
wpa_passphrase "SSID" "password" > /etc/wpa_supplicant/wpa_supplicant.conf

# Configure interface
nano -w /etc/conf.d/net
modules_wlan0="wpa_supplicant"
config_wlan0="dhcp"

# Enable
ln -s /etc/init.d/net.lo /etc/init.d/net.wlan0
rc-update add net.wlan0 default
```

---

## Kernel Management

### Distribution Kernels

```bash
# Binary kernel (fastest, easiest)
emerge --ask sys-kernel/gentoo-kernel-bin

# Source kernel with automatic config
emerge --ask sys-kernel/gentoo-kernel

# Update kernels
emerge --ask --update @world
# Kernels are automatically updated
```

### Manual Kernel Compilation

```bash
# Install kernel sources
emerge --ask sys-kernel/gentoo-sources

# List installed kernels
eselect kernel list

# Select kernel
eselect kernel set 1

# Navigate to kernel source
cd /usr/src/linux

# Configure kernel
make menuconfig  # Full menu
make nconfig     # Alternative interface
make xconfig     # Qt-based (requires Qt)
make gconfig     # GTK-based (requires GTK)

# Or start from current config:
zcat /proc/config.gz > .config
make oldconfig

# Compile
make -j$(nproc)

# Install modules
make modules_install

# Install kernel
make install

# Generate initramfs (if needed)
emerge --ask sys-kernel/dracut
dracut --kver $(make kernelversion)

# Update bootloader
grub-mkconfig -o /boot/grub/grub.cfg
```

### Kernel Management Tools

```bash
# eclean-kernel: Remove old kernels
emerge --ask app-admin/eclean-kernel
eclean-kernel -n 3  # Keep 3 newest

# kernel-cleaner: Another option
emerge --ask app-admin/kernel-cleaner
kernel-cleaner -p  # Pretend
kernel-cleaner -d  # Delete old
```

---

## Overlays and Third-Party Repositories

### Understanding Overlays

Overlays are third-party Gentoo package repositories, similar to Arch AUR.

```bash
# Install eselect-repository
emerge --ask app-eselect/eselect-repository

# List available overlays
eselect repository list

# Enable overlay
eselect repository enable overlay-name

# Sync overlay
emaint sync -r overlay-name

# Or sync all
emerge --sync
```

### Popular Overlays

```bash
# GURU - Official community overlay
eselect repository enable guru
emaint sync -r guru

# gentoo-zh - Chinese community overlay
eselect repository enable gentoo-zh

# science - Scientific packages
eselect repository enable science

# steam-overlay - Steam and games
eselect repository enable steam-overlay
```

### Manual Overlay Management (layman - legacy)

```bash
# Install layman (older method)
emerge --ask app-portage/layman

# Add overlay
layman -a overlay-name

# List overlays
layman -L

# Sync all overlays
layman -S

# Remove overlay
layman -d overlay-name
```

### Creating Custom Overlay

```bash
# Create overlay directory
mkdir -p /var/db/repos/local/{metadata,profiles}

# Create layout.conf
cat > /var/db/repos/local/metadata/layout.conf << EOF
masters = gentoo
auto-sync = false
EOF

# Create repo_name
echo "local" > /var/db/repos/local/profiles/repo_name

# Add to repos.conf
cat > /etc/portage/repos.conf/local.conf << EOF
[local]
location = /var/db/repos/local
EOF

# Create ebuild directory structure
mkdir -p /var/db/repos/local/category/package

# Now you can add custom ebuilds
```

---

## Optimization and Performance

### Compiler Optimizations

```bash
# Safe, general optimizations
COMMON_FLAGS="-O2 -pipe -march=native"

# Aggressive (may be unstable)
COMMON_FLAGS="-O3 -pipe -march=native -mtune=native -fomit-frame-pointer"

# Size optimization (embedded systems)
COMMON_FLAGS="-Os -pipe -march=native"

# Debug builds
COMMON_FLAGS="-O0 -g -pipe"
```

### Parallel Compilation

```bash
# MAKEOPTS for parallel make
# Rule of thumb: CPU cores + 1
MAKEOPTS="-j9"  # For 8-core system

# Emerge parallel jobs
EMERGE_DEFAULT_OPTS="--jobs=4 --load-average=8"

# Or specify per-emerge:
emerge --ask --jobs=4 --load-average=8 package
```

### ccache (Compiler Cache)

```bash
# Install ccache
emerge --ask dev-util/ccache

# Enable in make.conf
FEATURES="ccache"
CCACHE_SIZE="10G"
CCACHE_DIR="/var/cache/ccache"

# Check ccache stats
ccache -s

# Clear ccache
ccache -C
```

### tmpfs for Compilation

```bash
# Use RAM for compilation (speeds up builds)
# Edit /etc/fstab:
tmpfs  /var/tmp/portage  tmpfs  size=16G,uid=portage,gid=portage,mode=775,noatime  0 0

# Mount
mount /var/tmp/portage

# Caution: Ensure enough RAM
# Large packages (LibreOffice, Firefox) need 8-16 GB
```

### Binary Package Cache

```bash
# Enable binary package building
FEATURES="buildpkg"

# Use binary packages when available
emerge --ask --getbinpkg package

# Gentoo binary host (experimental)
PORTAGE_BINHOST="https://gentoo.osuosl.org/experimental/amd64/binpkg/default/linux/17.1/x86-64/"

# Update with binaries
emerge --ask --getbinpkg --update --deep --newuse @world
```

---

## Security and Hardening

### Hardened Gentoo

```bash
# Use hardened profile
eselect profile set default/linux/amd64/17.1/hardened

# Hardened features:
# - PaX/Grsecurity patches
# - PIE (Position Independent Executables)
# - SSP (Stack Smashing Protection)
# - RELRO (Relocation Read-Only)
# - BIND NOW

# Update system for hardened
emerge --ask --update --deep --newuse @world
```

### SELinux

```bash
# SELinux support in Gentoo
# Select SELinux profile
eselect profile set default/linux/amd64/17.1/selinux

# Install SELinux utilities
emerge --ask sys-apps/selinux-base

# Set SELinux mode
# Edit /etc/selinux/config
SELINUX=enforcing
SELINUXTYPE=strict

# Relabel filesystem
rlpkg -a -r
```

### Firewall (iptables/nftables)

```bash
# Install iptables
emerge --ask net-firewall/iptables

# Basic firewall script
nano -w /etc/local.d/firewall.start

#!/bin/bash
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

chmod +x /etc/local.d/firewall.start

# Or use firewalld
emerge --ask net-firewall/firewalld
rc-update add firewalld default
```

### Security Advisories

```bash
# Check for GLSA (Gentoo Linux Security Advisories)
emerge --ask app-portage/gentoolkit
glsa-check -l affected
glsa-check -f all  # Fix all affected packages
```

---

## Troubleshooting

### Common Issues

#### Blocked Packages

```bash
# Error: packages are blocking each other
# Solution: Read the error message carefully
emerge --ask --autounmask-write package
etc-update  # Or dispatch-conf
emerge --ask package
```

#### Missing Dependencies

```bash
# Rebuild dependencies
emerge --ask @preserved-rebuild

# Fix broken reverse dependencies
revdeb-rebuild

# Emerge with dependencies
emerge --ask --with-bdeps=y package
```

#### Circular Dependencies

```bash
# Usually requires manual intervention
# Example solution:
emerge --ask --oneshot dependency
emerge --ask main-package
```

#### Configuration File Updates

```bash
# Use dispatch-conf (recommended)
dispatch-conf

# Or etc-update (simpler)
etc-update

# Automated (use with caution)
etc-update --automode -5
```

### Rescue and Recovery

```bash
# Boot from Gentoo LiveCD/USB
# Mount system
mount /dev/sda5 /mnt/gentoo
mount /dev/sda3 /mnt/gentoo/boot
mount /dev/sda2 /mnt/gentoo/boot/efi

# Mount proc, sys, dev
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --make-rslave /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
mount --make-rslave /mnt/gentoo/dev

# Chroot
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"

# Fix issues
# Reinstall kernel, bootloader, etc.

# Exit and reboot
exit
umount -R /mnt/gentoo
reboot
```

---

## Real-World Use Cases

### Case Study 1: High-Performance Computing Cluster

**Scenario**: Scientific computing cluster

**Implementation**:
```bash
# Optimized compilation for specific CPU architecture
COMMON_FLAGS="-O3 -march=znver2 -mtune=znver2"
# Scientific packages compiled with optimizations
# MPI support for parallel computing
# Custom kernel for HPC workload

# Benefits:
# - 10-30% performance improvement over generic binaries
# - Fine-tuned for specific hardware
# - Reduced memory footprint
# - Optimized for compute-intensive tasks
```

### Case Study 2: Embedded System Development

**Scenario**: Custom embedded Linux device

**Implementation**:
```bash
# Minimal system with crossdev
# Cross-compilation for ARM target
# Size-optimized packages (-Os)
# Custom kernel with only required drivers
# Total footprint < 100 MB

# Benefits:
# - Full control over every component
# - Minimal system size
# - Optimized for embedded hardware
# - Custom kernel with exact features needed
```

### Case Study 3: Security-Focused Workstation

**Scenario**: Security researcher workstation

**Implementation**:
```bash
# Hardened profile with PaX/Grsecurity
# SELinux enabled
# All packages compiled with security flags
# Regular GLSA monitoring
# Minimal attack surface

# Benefits:
# - Maximum security hardening
# - Source-level security auditing possible
# - Kernel-level protections (PaX)
# - Controlled package versions
```

### Case Study 4: Gaming Workstation

**Scenario**: High-performance gaming system

**Implementation**:
```bash
# Desktop profile with optimizations
# NVIDIA drivers with custom USE flags
# Wine with staging patches
# Steam overlay packages
# CPU optimizations for gaming

# Benefits:
# - Maximum gaming performance
# - Latest graphics drivers
# - Custom Wine configurations
# - Optimized for specific games
```

### Case Study 5: Development Server

**Scenario**: Multi-language development environment

**Implementation**:
```bash
# Multiple Python versions via eselect
# Multiple Ruby versions via rbenv
# Node.js, Go, Rust toolchains
# Containers (Docker, Podman)
# All compiled with debug symbols

# Benefits:
# - Consistent development environment
# - Multiple language versions simultaneously
# - Optimized compilation for development
# - Full debugging capabilities
```

---

## Tips and Best Practices

### Installation Tips

1. **Read the Handbook**: Most comprehensive Linux documentation
2. **Start Simple**: Use distribution kernel initially
3. **Take Notes**: Document your configuration decisions
4. **Backup Configs**: Keep your make.conf and package.* files
5. **Be Patient**: Compilation takes time, especially first build

### Maintenance Best Practices

```bash
# Regular maintenance routine
# Weekly:
emerge --sync
emerge --ask --update --deep --newuse @world
etc-update

# Monthly:
emerge --ask --depclean
revdep-rebuild
eclean distfiles
glsa-check -f all

# After major updates:
emerge --ask @preserved-rebuild
```

### Performance Tips

1. **Use ccache**: Speeds up recompilation
2. **Parallel jobs**: Utilize all CPU cores
3. **tmpfs**: Compile in RAM if enough memory
4. **Binary packages**: For frequently reinstalled packages
5. **Optimize CFLAGS**: But don't over-optimize (-O2 is usually best)

### Learning Resources

- Start with the Gentoo Handbook
- Join #gentoo IRC channel
- Read the forums before asking questions
- Contribute to the wiki
- Help others once you're experienced

---

## Conclusion

Gentoo Linux offers unparalleled customization and optimization capabilities at the cost of increased complexity and installation time. It's an excellent choice for users who want complete control over their system, need maximum performance, or wish to deeply understand Linux internals.

The source-based approach, combined with USE flags and profiles, allows you to build exactly the system you need—nothing more, nothing less. While the learning curve is steep, the knowledge gained and system control achieved make Gentoo a rewarding distribution for advanced users.

Whether you're building a high-performance workstation, an embedded system, or simply want to learn Linux deeply, Gentoo provides the tools and flexibility to accomplish your goals.

