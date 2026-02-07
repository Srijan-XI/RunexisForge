# Slackware Linux

## Introduction

Slackware Linux is the oldest actively maintained Linux distribution, first released in 1993 by Patrick Volkerding. Known for its adherence to Unix philosophy and KISS (Keep It Simple, Stupid) principle, Slackware provides a pure, unadulterated Linux experience with minimal modifications to upstream software.

### Philosophy and Design Principles

- **Simplicity**: No complex abstraction layers or automated configuration
- **Stability**: Conservative package updates, thoroughly tested releases
- **Unix-like**: Traditional Unix directory structure and conventions
- **No Dependencies**: Package manager doesn't handle dependencies automatically
- **Vanilla Packages**: Software compiled with minimal patches
- **User Control**: Complete control over system configuration
- **KISS Principle**: Simple, straightforward design over feature bloat

### Key Characteristics

- **Package Management**: pkgtools (installpkg, removepkg, upgradepkg) and slackpkg
- **Init System**: BSD-style rc scripts (no systemd by default)
- **Configuration**: Manual text file editing, no automated tools
- **Release Cycle**: When it's ready (typically 1-2 years)
- **Stability Focus**: Proven, stable software over bleeding edge
- **Full Source Code**: Complete sources available for all packages
- **Documentation**: Comprehensive documentation and handbook

### Use Cases

- Learning Linux fundamentals and system administration
- Server deployments requiring stability
- Custom-built systems with specific requirements
- Educational environments teaching Unix/Linux concepts
- Experienced users who prefer manual control
- Systems requiring long-term stability
- Minimal, lightweight installations

### Target Audience

- Advanced Linux users and system administrators
- Users who want complete control over their system
- Those learning system administration and Linux internals
- Server administrators valuing stability
- Users who prefer simplicity over automation
- People who enjoy hands-on configuration

## History and Legacy

### Origins

- **Created**: July 16, 1993 by Patrick Volkerding
- **Based On**: Softlanding Linux System (SLS)
- **Inspiration**: Fixing issues in SLS distribution
- **Name Origin**: Inspired by the Church of the SubGenius and "slack"

### Major Milestones

- **1993**: First public release (version 1.00)
- **1999**: Slackware 4.0 with KDE desktop
- **2004**: Slackware 10.0, major version jump
- **2012**: Slackware 14.0 with modern toolchain
- **2016**: Slackware 14.2, refined stability
- **2022**: Slackware 15.0 after 5+ years of development
- **Present**: Slackware-current (development branch)

### Influence on Linux Ecosystem

- Inspired numerous derivative distributions
- Established standards for package management
- Influenced BSD-style init systems
- Training ground for many Linux administrators
- Reference for traditional Unix-like design

## Resources

### Official Resources

- **Website**: <http://www.slackware.com>
- **FTP Mirror**: <ftp://ftp.slackware.com/pub/slackware/>
- **Documentation**: <http://docs.slackware.com>
- **ChangeLog**: <http://www.slackware.com/changelog/>
- **Book**: Slackware Linux Essentials
- **Security**: <http://www.slackware.com/security/>

### Community Resources

- **SlackBuilds**: <https://slackbuilds.org> (third-party packages)
- **LinuxQuestions**: <https://www.linuxquestions.org/questions/slackware-14/>
- **Slackware Forums**: Various community forums
- **IRC**: #slackware on Libera.Chat
- **Reddit**: r/slackware
- **Wiki**: <https://docs.slackware.com>

### Learning Resources

- [Slackware Linux Essentials](http://www.slackware.com/book/) - Official handbook
- [The Revised Slackware Book Project](http://www.slackbook.org/)
- [Slackware Documentation Project](https://docs.slackware.com/)
- Community tutorials and guides

---

## Installation

### System Requirements

- **Minimum RAM**: 64 MB (512 MB recommended for GUI)
- **Minimum Disk**: 5 GB (20+ GB recommended)
- **Processor**: i486 or better (x86_64 for 64-bit)
- **Architecture**: x86 (32-bit) and x86_64 (64-bit)

### Installation Media

#### Downloading Slackware

```bash
# Official download page
# http://www.slackware.com/getslack/

# Current stable release (15.0)
# Slackware64 - 64-bit version
# Slackware - 32-bit version (legacy)

# Download options:
# - Full ISO (DVD image, ~2.5 GB)
# - Network install ISO (minimal, ~80 MB)
# - USB installer image

# Recommended mirrors:
# US: ftp://slackware.osuosl.org/pub/slackware/
# Europe: ftp://ftp.slackware.org.uk/slackware/
# Asia: ftp://ftp.jaist.ac.jp/pub/Linux/Slackware/
```

#### Creating Installation Media

```bash
# Create bootable USB on Linux
dd if=slackware64-15.0-install-dvd.iso of=/dev/sdX bs=4M status=progress
sync

# Create bootable USB on Windows
# Use Rufus or similar tool

# Verify ISO checksum
md5sum slackware64-15.0-install-dvd.iso
# Compare with official checksums
```

### Installation Process

#### Step 1: Boot Installation Media

```bash
# Boot from USB/DVD
# At boot prompt, press Enter or specify boot parameters

# Common boot options:
# huge.s - Default kernel (most hardware support)
# hugesmp.s - SMP kernel for multi-core systems
# speakup.s - Accessibility with speech synthesis

# For special cases:
# boot: huge.s vga=normal  # Force standard VGA
# boot: huge.s nomodeset   # Disable kernel mode setting
```

#### Step 2: Login and Partition

```bash
# Login as root (no password required)
root

# Partition the disk
cfdisk /dev/sda  # For BIOS/MBR
cgdisk /dev/sda  # For UEFI/GPT

# Recommended partition scheme (BIOS):
# /dev/sda1 - 1 GB   - /boot (Linux)
# /dev/sda2 - 20 GB  - /     (Linux)
# /dev/sda3 - 4 GB   - swap  (Linux swap)
# /dev/sda4 - Rest   - /home (Linux)

# Recommended partition scheme (UEFI):
# /dev/sda1 - 512 MB - /boot/efi (EFI System)
# /dev/sda2 - 1 GB   - /boot     (Linux)
# /dev/sda3 - 20 GB  - /         (Linux)
# /dev/sda4 - 4 GB   - swap      (Linux swap)
# /dev/sda5 - Rest   - /home     (Linux)

# Create filesystems
mkfs.ext4 /dev/sda2      # Root partition
mkfs.ext4 /dev/sda4      # Home partition
mkswap /dev/sda3         # Swap partition
swapon /dev/sda3         # Activate swap

# For UEFI:
mkfs.fat -F32 /dev/sda1  # EFI partition
```

#### Step 3: Run Setup

```bash
# Start the installation
setup

# The setup program will guide you through:
```

**1. ADDSWAP**: Configure swap partition
- Select swap partition
- Choose to format (recommended)

**2. TARGET**: Select target partition for installation
- Choose root partition (/dev/sda2)
- Select filesystem format (ext4 recommended)
- Choose to format

**3. SOURCE**: Select installation source
- CD/DVD (most common)
- Network/FTP
- Pre-mounted directory

**4. SELECT**: Choose package series to install

Package Series:
- **A**: Base system (required)
- **AP**: Applications (recommended)
- **D**: Development tools (gcc, make, etc.)
- **E**: Emacs editor
- **F**: FAQ and documentation
- **K**: Linux kernel source
- **KDE**: KDE Plasma desktop
- **KDEI**: KDE internationalization
- **L**: Libraries (required for most software)
- **N**: Networking tools
- **T**: TeX typesetting system
- **TCL**: Tcl/Tk scripting
- **X**: X Window System
- **XFCE**: Xfce desktop environment
- **XAP**: X applications
- **Y**: Games

```bash
# Installation modes:
# full - Install everything (easiest, ~9 GB)
# terse - Standard installation without prompts
# menu - Choose individual packages
# expert - Like menu but more control
# custom - Script-based installation
# tagpath - Install based on tagfiles

# Recommended for beginners: full or menu
```

**5. INSTALL**: Begin package installation
- Packages will be installed based on your selections
- This may take 10-30 minutes depending on selections

**6. CONFIGURE**: System configuration

```bash
# Create bootable USB installer
# Choose Yes to create USB installer (optional)

# Install LILO (LInux LOader) or ELILO (for UEFI)
# Simple - Let setup configure automatically
# Expert - Manual configuration
# Skip - Don't install bootloader (advanced)

# For LILO configuration:
# - Choose boot device (usually /dev/sda)
# - Select boot resolution (1024x768 recommended)
# - Choose whether to use framebuffer console
# - UTF-8 support (recommended)

# Network configuration:
# - Set hostname (e.g., slackbox)
# - Configure network interfaces (dhcp or static)
# - Set domain name (optional)

# Services to start at boot:
# - rc.cups - Printing service
# - rc.sshd - SSH server
# - rc.httpd - Apache web server (if installed)
# etc.
```

**7. EXIT**: Exit setup and reboot

```bash
# Remove installation media
# Reboot the system
reboot
```

### Post-Installation Configuration

#### First Boot Setup

```bash
# Login as root
# Set root password if not done during installation
passwd

# Create a regular user
adduser username
# Follow prompts to set password and user info

# Add user to wheel group for su access
usermod -aG wheel username

# Configure sudo (optional)
# Uncomment wheel group in /etc/sudoers
visudo
# Uncomment: %wheel ALL=(ALL) ALL
```

#### Configure Network

```bash
# Edit network configuration
vi /etc/rc.d/rc.inet1.conf

# For DHCP (most common):
USE_DHCP[0]="yes"

# For static IP:
IPADDR[0]="192.168.1.100"
NETMASK[0]="255.255.255.0"
GATEWAY="192.168.1.1"
USE_DHCP[0]="no"

# Set DNS servers
vi /etc/resolv.conf
nameserver 8.8.8.8
nameserver 8.8.4.4

# Restart networking
/etc/rc.d/rc.inet1 restart
```

#### Update System

```bash
# Configure slackpkg
vi /etc/slackpkg/mirrors
# Uncomment a mirror close to you

# Update package database
slackpkg update

# Upgrade all packages
slackpkg upgrade-all

# Install security updates
slackpkg update
slackpkg install-new
slackpkg upgrade-all
```

---

## Package Management

### PKGTools (Low-Level Tools)

Slackware's core package management tools are simple, low-level utilities that don't handle dependencies.

#### installpkg

```bash
# Install a package
installpkg package-version-arch-build.txz

# Install from specific directory
installpkg /path/to/package.txz

# Install multiple packages
installpkg *.txz

# Install with different root
installpkg --root /mnt package.txz

# Verbose output
installpkg -v package.txz

# Dry run (show what would be done)
installpkg --warn package.txz

# Common usage:
installpkg /path/to/downloaded/package.txz
```

#### removepkg

```bash
# Remove a package
removepkg packagename

# Remove with verbose output
removepkg -v packagename

# Preserve important files
removepkg -preserve packagename

# Dry run
removepkg -warn packagename

# Remove multiple packages
removepkg package1 package2 package3

# Example:
removepkg firefox
```

#### upgradepkg

```bash
# Upgrade a package
upgradepkg package-version-arch-build.txz

# Upgrade and install if not present
upgradepkg --install-new package.txz

# Reinstall (same version)
upgradepkg --reinstall package.txz

# Verbose mode
upgradepkg -v package.txz

# Upgrade all packages in directory
upgradepkg *.txz

# Example:
upgradepkg --install-new firefox-*.txz
```

#### pkgtool

```bash
# Menu-driven package management
pkgtool

# Options:
# - Current: Install packages from current directory
# - Other: Install from other directory
# - Floppy: Install from floppy (legacy)
# - Remove: Remove installed packages
# - View: View installed packages
# - Setup: Run setup scripts
```

#### Package Information Tools

```bash
# List installed packages
ls /var/log/packages/

# Get package info
less /var/log/packages/packagename-version

# Search for installed package
ls /var/log/packages/ | grep searchterm

# Find which package owns a file
find /var/log/packages -type f -exec grep -l "/path/to/file" {} \;

# Or use helper script:
cat > /usr/local/bin/whichpkg << 'EOF'
#!/bin/bash
grep -r "$1" /var/log/packages/
EOF
chmod +x /usr/local/bin/whichpkg

# Usage:
whichpkg /usr/bin/firefox
```

### Slackpkg (High-Level Package Manager)

Slackpkg is the official tool for managing packages from Slackware repositories.

#### Configuration

```bash
# Configure mirrors
vi /etc/slackpkg/mirrors

# Uncomment ONE mirror (closest to you)
# Example:
# http://slackware.osuosl.org/slackware64-15.0/

# For slackware-current (development):
# http://slackware.osuosl.org/slackware64-current/

# Configure slackpkg options
vi /etc/slackpkg/slackpkg.conf

# Important settings:
ARCH=x86_64                    # Your architecture
PKGMAIN=/var/log/packages     # Package database
PRIORITY=( patches %PKGMAIN )  # Update priority
POSTINST=on                   # Run post-install scripts
ONLY_NEW_DOTNEW=on            # Only new .new files
ONOFF=on                      # Download priorities
```

#### Basic Commands

```bash
# Update package lists
slackpkg update

# Update GPG key (first time or when changed)
slackpkg update gpg

# Search for packages
slackpkg search packagename
slackpkg search firefox

# Get package info
slackpkg info packagename

# Install packages
slackpkg install packagename
slackpkg install firefox

# Remove packages
slackpkg remove packagename

# Upgrade packages
slackpkg upgrade packagename

# Upgrade all packages
slackpkg upgrade-all

# Install new packages (from updates)
slackpkg install-new

# Reinstall package
slackpkg reinstall packagename

# Clean downloaded files
slackpkg clean-system
```

#### Advanced Usage

```bash
# Check for package updates
slackpkg check-updates

# Show what would be upgraded (dry run)
slackpkg upgrade-all --dry-run

# Upgrade excluding certain packages
# Add to /etc/slackpkg/blacklist:
echo "kernel-*" >> /etc/slackpkg/blacklist

# Search by file
slackpkg file-search /usr/bin/firefox

# Generate package template
slackpkg generate-template mytemplate
slackpkg install-template mytemplate

# Automatic updates (cron job)
cat > /etc/cron.daily/slackpkg-update << 'EOF'
#!/bin/bash
slackpkg -batch=on -default_answer=y update
slackpkg -batch=on -default_answer=y install-new
slackpkg -batch=on -default_answer=y upgrade-all
EOF
chmod +x /etc/cron.daily/slackpkg-update
```

### SlackBuilds.org (SBo)

SlackBuilds.org provides build scripts for software not in official repositories.

#### Using SlackBuilds

```bash
# Download the SlackBuild archive
# From https://slackbuilds.org/

# Example: Installing ffmpeg
# 1. Download SlackBuild
wget https://slackbuilds.org/slackbuilds/15.0/multimedia/ffmpeg.tar.gz

# 2. Extract
tar xvf ffmpeg.tar.gz
cd ffmpeg

# 3. Download source code (link in .info file)
wget https://ffmpeg.org/releases/ffmpeg-5.1.tar.xz

# 4. Make script executable
chmod +x ffmpeg.SlackBuild

# 5. Run as root
su -
./ffmpeg.SlackBuild

# 6. Install generated package
installpkg /tmp/ffmpeg-*.txz
```

#### Sbopkg (SlackBuilds Manager)

```bash
# Install sbopkg
wget https://github.com/sbopkg/sbopkg/releases/download/0.38.2/sbopkg-0.38.2-noarch-1_wsr.tgz
installpkg sbopkg-*.tgz

# Run sbopkg
sbopkg

# Or command-line:
# Sync repository
sbopkg -r

# Search for package
sbopkg -s packagename

# Build and install package
sbopkg -i packagename

# Upgrade all SBo packages
sbopkg -B -k
```

#### Sbotools

```bash
# Alternative SlackBuilds manager
# Download from: https://pink-mist.github.io/sbotools/

# Install sbotools
installpkg sbotools-*.txz

# Sync repository
sbosnap fetch

# Search
sbocheck

# Install with dependencies
sboinstall packagename

# Upgrade
sboupgrade packagename
```

### Creating Custom Packages

#### SlackBuild Script Template

```bash
#!/bin/bash
# SlackBuild script template

PRGNAM=myapp
VERSION=${VERSION:-1.0}
BUILD=${BUILD:-1}
TAG=${TAG:-_SBo}

CWD=$(pwd)
TMP=${TMP:-/tmp/SBo}
PKG=$TMP/package-$PRGNAM
OUTPUT=${OUTPUT:-/tmp}

if [ -z "$ARCH" ]; then
  case "$( uname -m )" in
    i?86) ARCH=i586 ;;
    arm*) ARCH=arm ;;
       *) ARCH=$( uname -m ) ;;
  esac
fi

set -e

rm -rf $PKG
mkdir -p $TMP $PKG $OUTPUT
cd $TMP
rm -rf $PRGNAM-$VERSION
tar xvf $CWD/$PRGNAM-$VERSION.tar.gz
cd $PRGNAM-$VERSION
chown -R root:root .

./configure \
  --prefix=/usr \
  --sysconfdir=/etc \
  --localstatedir=/var

make
make install DESTDIR=$PKG

find $PKG -print0 | xargs -0 file | grep -e "executable" -e "shared object" | \
  grep ELF | cut -f 1 -d : | xargs strip --strip-unneeded 2> /dev/null || true

mkdir -p $PKG/usr/doc/$PRGNAM-$VERSION
cp -a README COPYING $PKG/usr/doc/$PRGNAM-$VERSION

mkdir -p $PKG/install
cat $CWD/slack-desc > $PKG/install/slack-desc

cd $PKG
/sbin/makepkg -l y -c n $OUTPUT/$PRGNAM-$VERSION-$ARCH-$BUILD$TAG.${PKGTYPE:-txz}
```

#### Package Description (slack-desc)

```bash
# Create slack-desc file
cat > slack-desc << 'EOF'
        |-----handy-ruler------------------------------------------------------|
myapp: myapp (short description)
myapp:
myapp: Long description of the application goes here.
myapp: It can span multiple lines like this.
myapp:
myapp: Homepage: https://example.com
myapp:
myapp:
myapp:
myapp:
myapp:
EOF
```

---

## System Configuration

### Init System (BSD-Style RC Scripts)

Slackware uses traditional BSD-style init scripts located in `/etc/rc.d/`.

#### RC Scripts Overview

```bash
# Main init scripts:
/etc/rc.d/rc.0         # Halt script
/etc/rc.d/rc.4         # X11 (graphical login)
/etc/rc.d/rc.6         # Reboot script
/etc/rc.d/rc.K         # Kill processes (runlevel change)
/etc/rc.d/rc.M         # Multi-user mode (main startup)
/etc/rc.d/rc.S         # System initialization
/etc/rc.d/rc.local     # Local customizations

# Service scripts:
/etc/rc.d/rc.inet1     # Network initialization
/etc/rc.d/rc.inet2     # Network services (inetd, etc.)
/etc/rc.d/rc.sshd      # SSH daemon
/etc/rc.d/rc.httpd     # Apache web server
/etc/rc.d/rc.mysqld    # MySQL database
# ... and many more
```

#### Managing Services

```bash
# Start a service
/etc/rc.d/rc.sshd start

# Stop a service
/etc/rc.d/rc.sshd stop

# Restart a service
/etc/rc.d/rc.sshd restart

# Check service status
/etc/rc.d/rc.sshd status

# Enable service at boot (make executable)
chmod +x /etc/rc.d/rc.sshd

# Disable service at boot (remove execute permission)
chmod -x /etc/rc.d/rc.sshd

# Check if service is enabled
ls -l /etc/rc.d/rc.sshd

# List all services
ls -l /etc/rc.d/rc.*
```

#### Custom Service Script

```bash
# Create custom service script
cat > /etc/rc.d/rc.myservice << 'EOF'
#!/bin/bash
# Start/stop/restart myservice

case "$1" in
  start)
    echo "Starting myservice..."
    /usr/local/bin/myservice &
    ;;
  stop)
    echo "Stopping myservice..."
    killall myservice
    ;;
  restart)
    $0 stop
    sleep 1
    $0 start
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
    exit 1
esac
EOF

chmod +x /etc/rc.d/rc.myservice

# Start at boot by adding to rc.local
echo "/etc/rc.d/rc.myservice start" >> /etc/rc.d/rc.local
```

#### Runlevels

```bash
# Slackware runlevels:
# 0 - Halt
# 1 - Single user mode
# 3 - Multi-user mode (text console) - default
# 4 - X11 with graphical login (KDM/XDM/GDM)
# 6 - Reboot

# Set default runlevel
vi /etc/inittab
# Change line:
id:3:initdefault:        # For console
# or
id:4:initdefault:        # For graphical login

# Change runlevel
telinit 3   # Switch to console
telinit 4   # Switch to graphical
```

### Networking Configuration

#### Basic Network Setup

```bash
# Configure network interfaces
vi /etc/rc.d/rc.inet1.conf

# Interface 0 (usually eth0/enp0s3):
IPADDR[0]="192.168.1.100"
NETMASK[0]="255.255.255.0"
USE_DHCP[0]="no"
DHCP_HOSTNAME[0]=""
GATEWAY="192.168.1.1"

# For DHCP:
USE_DHCP[0]="yes"

# For multiple interfaces:
# eth1 (interface 1)
IPADDR[1]="10.0.0.1"
NETMASK[1]="255.255.255.0"
USE_DHCP[1]="no"

# Apply changes
/etc/rc.d/rc.inet1 restart
```

#### Network Services

```bash
# Configure hostname
vi /etc/HOSTNAME
slackbox.example.com

# Configure hosts file
vi /etc/hosts
127.0.0.1       localhost
192.168.1.100   slackbox.example.com slackbox

# Configure DNS
vi /etc/resolv.conf
nameserver 8.8.8.8
nameserver 8.8.4.4
search example.com

# Network daemons configuration
vi /etc/rc.d/rc.inet2

# Enable/disable services:
# Uncomment to start:
# /usr/sbin/inetd
# /usr/sbin/sshd
```

#### Wireless Networking

```bash
# Install wireless tools (usually included)
slackpkg install wireless-tools

# Scan for networks
iwlist wlan0 scan

# Configure wireless in rc.inet1.conf
vi /etc/rc.d/rc.inet1.conf

# Add wireless settings:
WLAN_ESSID[0]="YourNetworkName"
WLAN_MODE[0]="Managed"
WLAN_KEY[0]="YourWPAPassword"
WLAN_IWPRIV[0]=""
USE_DHCP[0]="yes"

# For WPA2:
# Install wpa_supplicant
slackpkg install wpa_supplicant

# Create wpa_supplicant.conf
wpa_passphrase "YourSSID" "YourPassword" > /etc/wpa_supplicant.conf

# Start manually:
wpa_supplicant -B -i wlan0 -c /etc/wpa_supplicant.conf
dhcpcd wlan0
```

### User and Group Management

```bash
# Add user
adduser
# Or
useradd -m -G users,wheel,audio,video,cdrom username
passwd username

# Add user to group
gpasswd -a username groupname
# Or
usermod -aG groupname username

# Remove user from group
gpasswd -d username groupname

# Delete user
userdel username
userdel -r username  # Remove home directory too

# Create group
groupadd groupname

# Delete group
groupdel groupname

# List user's groups
groups username

# Modify user
usermod -c "Full Name" username    # Change comment
usermod -d /new/home username      # Change home directory
usermod -s /bin/bash username      # Change shell
usermod -L username                # Lock account
usermod -U username                # Unlock account
```

### System Time and Locale

```bash
# Set timezone
ln -sf /usr/share/zoneinfo/America/New_York /etc/localtime

# Or use timeconfig
timeconfig

# Set hardware clock
# To system time:
hwclock --systohc
# From system time:
hwclock --hctosys

# Configure locale
vi /etc/profile.d/lang.sh
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Generate locales (if needed)
localedef -i en_US -f UTF-8 en_US.UTF-8
```

---

## Desktop Environment

### X Window System

```bash
# Install X.org
slackpkg install x

# Configure X
xorgsetup
# Or manually:
X -configure
cp /root/xorg.conf.new /etc/X11/xorg.conf

# Test X configuration
X -config /etc/X11/xorg.conf

# Start X manually
startx

# Enable graphical login
# Edit /etc/inittab and change:
id:4:initdefault:
```

### Display Managers

#### XDM (Default)

```bash
# Configure XDM
vi /etc/rc.d/rc.4

# XDM is started automatically in runlevel 4
# Customize look:
vi /etc/X11/xdm/Xresources

# Switch to XDM
telinit 4
```

#### KDM (KDE Display Manager)

```bash
# Install KDE
slackpkg install kde

# Configure to use KDM
vi /etc/rc.d/rc.4
# Change xdm to kdm in the script

# Reboot to graphical mode
telinit 4
```

### KDE Plasma

```bash
# Install KDE (usually during system installation)
slackpkg install kde kdei

# Set KDE as default desktop
echo "exec startkde" > ~/.xinitrc

# Or for all users:
cp /etc/X11/xinit/xinitrc.kde /etc/X11/xinit/xinitrc

# Start KDE
startx
```

### Xfce

```bash
# Install Xfce
slackpkg install xfce

# Set as default desktop
echo "exec startxfce4" > ~/.xinitrc

# Start Xfce
startx

# Configure Xfce
xfce4-settings-manager
```

### Fluxbox/Blackbox

```bash
# Install from SlackBuilds.org or use included
# Minimal window manager

# Set as default
echo "exec startfluxbox" > ~/.xinitrc

# Start
startx
```

---

## Slackware-Based Distributions

### Salix OS

**Purpose**: User-friendly Slackware derivative with dependency resolution

**Features**:
- Full Slackware compatibility
- slapt-get package manager with dependency handling
- One application per task philosophy
- Optimized for desktop use
- Xfce as primary desktop

```bash
# Website: https://www.salixos.org/
# Based on: Slackware (fully compatible)
# Package Manager: slapt-get, gslapt (GUI)

# Install packages with dependencies
slapt-get --install packagename

# Search packages
slapt-get --search keyword

# Update system
slapt-get --update
slapt-get --upgrade
```

**Resources**:
- Download: <https://www.salixos.org/download.html>
- Documentation: <https://docs.salixos.org/>
- Forums: <https://www.salixos.org/forum/>

### Slackel

**Purpose**: Greek-based Slackware derivative with modern tools

**Features**:
- Based on Slackware-current
- slapt-get with dependency resolution
- Modern software versions
- Multiple desktop environments

```bash
# Website: https://www.slackel.gr/
# Package Manager: slapt-get, slackpkg
# Desktop: KDE, Xfce, Openbox, Fluxbox
```

### Vector Linux

**Purpose**: Lightweight Slackware-based distribution (discontinued)

**Historical Significance**:
- Popular lightweight alternative
- Focused on older hardware
- SOHO (Small Office/Home Office) edition
- Discontinued in 2015

### Absolute Linux

**Purpose**: Lightweight, preconfigured Slackware

**Features**:
- Based on Slackware
- IceWM window manager
- Preconfigured for immediate use
- Includes common applications

```bash
# Website: http://www.absolutelinux.org/
# Focus: Lightweight desktop
# Window Manager: IceWM
```

### Zenwalk

**Purpose**: Slim, fast desktop distribution

**Features**:
- Formerly "Minislack"
- One application per task
- Optimized and updated software
- Netpkg package manager

```bash
# Website: http://www.zenwalk.org/
# Focus: Speed and modern software
# Package Manager: netpkg
```

### Slax

**Purpose**: Portable, modular live distribution

**Features**:
- Live CD/USB distribution
- Modular architecture
- Debian-based since 2018 (was Slackware-based)
- Portability focus

```bash
# Historical note: Originally Slackware-based
# Now uses Debian
# Website: https://www.slax.org/
```

### Puppy Linux (Some variants)

**Purpose**: Lightweight distribution for old computers

**Features**:
- Multiple base options (including Slackware)
- Runs entirely in RAM
- Very small footprint (< 300 MB)
- Focus on older hardware

```bash
# Slacko Puppy - Slackware-based variant
# Website: http://puppylinux.com/
```

---

## Server Applications

### Web Servers

#### Apache HTTP Server

```bash
# Install Apache (httpd)
slackpkg install httpd

# Configure Apache
vi /etc/httpd/httpd.conf

# Key settings:
ServerName slackbox.example.com:80
DocumentRoot "/srv/httpd/htdocs"
DirectoryIndex index.html

# Enable and start
chmod +x /etc/rc.d/rc.httpd
/etc/rc.d/rc.httpd start

# Test configuration
apachectl configtest

# Create test page
echo "<h1>It works!</h1>" > /srv/httpd/htdocs/index.html

# Access: http://localhost/
```

#### Nginx (from SlackBuilds)

```bash
# Download and build Nginx SlackBuild
# From https://slackbuilds.org/

# Create rc.nginx script
cat > /etc/rc.d/rc.nginx << 'EOF'
#!/bin/bash
case "$1" in
  start)
    /usr/sbin/nginx
    ;;
  stop)
    /usr/sbin/nginx -s stop
    ;;
  restart)
    $0 stop
    sleep 1
    $0 start
    ;;
  reload)
    /usr/sbin/nginx -s reload
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|reload}"
    ;;
esac
EOF

chmod +x /etc/rc.d/rc.nginx
/etc/rc.d/rc.nginx start
```

### Database Servers

#### MariaDB/MySQL

```bash
# Install MariaDB
slackpkg install mariadb

# Initialize database
mysql_install_db --user=mysql

# Set permissions
chown -R mysql:mysql /var/lib/mysql

# Enable and start
chmod +x /etc/rc.d/rc.mysqld
/etc/rc.d/rc.mysqld start

# Secure installation
mysql_secure_installation

# Create database and user
mysql -u root -p
CREATE DATABASE mydb;
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;
```

#### PostgreSQL

```bash
# Install PostgreSQL
slackpkg install postgresql

# Initialize database cluster
su - postgres
initdb -D /var/lib/pgsql/data

# Configure PostgreSQL
vi /var/lib/pgsql/data/postgresql.conf
vi /var/lib/pgsql/data/pg_hba.conf

# Enable and start
chmod +x /etc/rc.d/rc.postgresql
/etc/rc.d/rc.postgresql start

# Create database
su - postgres
createdb mydb
createuser myuser
psql
ALTER USER myuser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

### Mail Servers

#### Postfix

```bash
# Install Postfix (if not installed)
slackpkg install postfix

# Configure Postfix
vi /etc/postfix/main.cf

# Basic settings:
myhostname = mail.example.com
mydomain = example.com
myorigin = $mydomain
inet_interfaces = all
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain

# Enable and start
chmod +x /etc/rc.d/rc.postfix
/etc/rc.d/rc.postfix start

# Test
echo "Test" | mail -s "Test Email" user@example.com
```

### FTP Server

#### vsftpd

```bash
# Install vsftpd
slackpkg install vsftpd

# Configure
vi /etc/vsftpd.conf

# Important settings:
anonymous_enable=NO
local_enable=YES
write_enable=YES
chroot_local_user=YES

# Enable and start
chmod +x /etc/rc.d/rc.vsftpd
/etc/rc.d/rc.vsftpd start
```

### SSH Server

```bash
# SSH is usually installed by default
# Configure SSH
vi /etc/ssh/sshd_config

# Recommended security settings:
PermitRootLogin no
PasswordAuthentication yes  # Or no if using keys
PubkeyAuthentication yes
Port 22  # Change for added security

# Enable and start
chmod +x /etc/rc.d/rc.sshd
/etc/rc.d/rc.sshd start

# Generate SSH keys (client)
ssh-keygen -t ed25519

# Copy key to server
ssh-copy-id user@server
```

---

## Development Environment

### Build Tools

```bash
# Install development tools (usually installed)
slackpkg install d

# This includes:
# - gcc, g++
# - make, cmake
# - autoconf, automake
# - pkg-config
# - binutils
# - etc.

# Additional tools
slackpkg install git subversion mercurial
```

### Compilers and Languages

#### C/C++

```bash
# Already included in 'd' series
gcc --version
g++ --version

# Example compilation
gcc -o hello hello.c
g++ -o hello hello.cpp

# With debugging
gcc -g -o hello hello.c

# With optimization
gcc -O2 -o hello hello.c
```

#### Python

```bash
# Python is included in standard installation
python --version   # Python 2.x (legacy)
python3 --version  # Python 3.x

# Install pip
# Download get-pip.py
wget https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py

# Install packages
pip3 install package_name

# Virtual environments
python3 -m venv myenv
source myenv/bin/activate
```

#### Perl

```bash
# Perl is included
perl --version

# Install CPAN modules
cpan Module::Name

# Or
perl -MCPAN -e shell
install Module::Name
```

#### Java

```bash
# Install OpenJDK
slackpkg install openjdk

# Set JAVA_HOME
export JAVA_HOME=/usr/lib64/java
export PATH=$JAVA_HOME/bin:$PATH

# Add to /etc/profile:
echo 'export JAVA_HOME=/usr/lib64/java' >> /etc/profile
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> /etc/profile
```

#### Ruby

```bash
# Install Ruby (from SlackBuilds)
# Or use version manager like rbenv/rvm

# Install from source:
wget https://cache.ruby-lang.org/pub/ruby/3.2/ruby-3.2.0.tar.gz
tar xvf ruby-3.2.0.tar.gz
cd ruby-3.2.0
./configure
make
make install

# Install bundler
gem install bundler
```

---

## Security and Hardening

### System Security

#### Firewall (iptables)

```bash
# Basic firewall script
cat > /etc/rc.d/rc.firewall << 'EOF'
#!/bin/bash
# Basic firewall configuration

IPT=/usr/sbin/iptables

# Flush existing rules
$IPT -F
$IPT -X
$IPT -Z

# Default policies
$IPT -P INPUT DROP
$IPT -P FORWARD DROP
$IPT -P OUTPUT ACCEPT

# Allow loopback
$IPT -A INPUT -i lo -j ACCEPT
$IPT -A OUTPUT -o lo -j ACCEPT

# Allow established connections
$IPT -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH
$IPT -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP/HTTPS
$IPT -A INPUT -p tcp --dport 80 -j ACCEPT
$IPT -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow ping
$IPT -A INPUT -p icmp --icmp-type echo-request -j ACCEPT

# Log dropped packets
$IPT -A INPUT -j LOG --log-prefix "iptables INPUT DROP: "
$IPT -A FORWARD -j LOG --log-prefix "iptables FORWARD DROP: "
EOF

chmod +x /etc/rc.d/rc.firewall

# Start firewall
/etc/rc.d/rc.firewall

# Save rules (for restoration on boot)
iptables-save > /etc/iptables.rules

# Restore on boot (add to rc.local)
echo "iptables-restore < /etc/iptables.rules" >> /etc/rc.d/rc.local
```

#### SSH Hardening

```bash
# Configure SSH securely
vi /etc/ssh/sshd_config

# Recommended settings:
Port 2222                              # Non-standard port
Protocol 2                              # SSH2 only
PermitRootLogin no                     # Disable root login
PasswordAuthentication no              # Key-based only
PubkeyAuthentication yes               # Enable keys
AllowUsers user1 user2                 # Specific users only
MaxAuthTries 3                         # Limit attempts
ClientAliveInterval 300                # Timeout idle
ClientAliveCountMax 0                  # No keepalive
X11Forwarding no                       # Disable if not needed
UsePAM yes                             # Use PAM
Banner /etc/issue.net                  # Warning banner

# Restart SSH
/etc/rc.d/rc.sshd restart

# Install fail2ban (from SlackBuilds)
# To prevent brute force attacks
```

#### AppArmor/SELinux

```bash
# Slackware doesn't include AppArmor/SELinux by default
# Can be compiled from source if needed

# Alternative: Use traditional Unix permissions
chmod 755 /path/to/directory
chmod 600 /path/to/sensitive/file
chown user:group /path/to/file
```

### Security Updates

```bash
# Subscribe to Slackware security mailing list
# http://www.slackware.com/lists/

# Check for security updates
slackpkg update
slackpkg install-new
slackpkg upgrade-all

# Monitor changelog
wget -q http://www.slackware.com/security/list.php?l=slackware-security -O - | grep -i "upgraded"

# Automated security updates (use with caution)
cat > /etc/cron.daily/slackware-security << 'EOF'
#!/bin/bash
/usr/sbin/slackpkg -batch=on -default_answer=y update
/usr/sbin/slackpkg -batch=on -default_answer=y upgrade-all
EOF
chmod +x /etc/cron.daily/slackware-security
```

### Audit and Monitoring

```bash
# Install aide (file integrity checker) from SlackBuilds
# Initialize database
aide --init
mv /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz

# Check for changes
aide --check

# Install logwatch for log monitoring
# From SlackBuilds.org

# Review logs regularly
tail -f /var/log/messages
tail -f /var/log/secure
tail -f /var/log/httpd/access_log
```

---

## Real-World Use Cases

### Case Study 1: Web Hosting Server

**Scenario**: Small business web hosting

**Implementation**:
```bash
# Stable, reliable web server
# Apache + PHP + MariaDB stack
# Minimal attack surface
# Long-term stability

# Services installed:
# - Apache HTTP Server
# - PHP
# - MariaDB
# - vsftpd
# - SSH

# Benefits:
# - Stability: No forced upgrades
# - Security: Conservative updates
# - Simplicity: Easy to troubleshoot
# - Performance: No unnecessary services
```

### Case Study 2: Development Workstation

**Scenario**: C/C++ developer workstation

**Implementation**:
```bash
# Full development environment
# Xfce desktop for lightweight GUI
# Complete compiler toolchain
# Version control systems

# Installed packages:
# - GCC/G++ toolchain
# - Make, CMake, Autotools
# - Git, SVN
# - Vim/Emacs
# - Debugging tools (GDB, Valgrind)

# Benefits:
# - Stable development environment
# - No surprise package updates breaking builds
# - Complete control over toolchain versions
# - Traditional Unix environment
```

### Case Study 3: Educational Server

**Scenario**: University computer lab server

**Implementation**:
```bash
# Multi-user server for CS students
# SSH access for remote work
# Compiler and interpreter suites
# Long uptime requirements

# Configuration:
# - User quotas
# - Resource limits
# - Automated backups
# - Monitoring tools

# Benefits:
# - Educational value (teaches Linux fundamentals)
# - Stability (minimal maintenance)
# - Security (hardened configuration)
# - Long support cycle
```

### Case Study 4: Network Appliance

**Scenario**: Router/Firewall appliance

**Implementation**:
```bash
# Minimal installation
# iptables firewall
# DHCP/DNS server
# No GUI overhead

# Services:
# - iptables/netfilter
# - dnsmasq (DNS/DHCP)
# - Squid (proxy)
# - OpenVPN (VPN)

# Benefits:
# - Minimal resource usage
# - High reliability
# - Easy to audit (simple configuration)
# - Long-term stability
```

### Case Study 5: Legacy Application Server

**Scenario**: Running legacy enterprise application

**Implementation**:
```bash
# Old Java application requiring specific versions
# Stability over features
# Long-term support needed

# Key advantages:
# - No forced updates breaking compatibility
# - Ability to keep old library versions
# - Stable ABI (Application Binary Interface)
# - Conservative update policy

# Result:
# - 5+ years continuous operation
# - Minimal maintenance required
# - Application stability maintained
```

---

## Performance Tuning

### Boot Optimization

```bash
# Disable unnecessary services
# Check /etc/rc.d/rc.* scripts
ls -l /etc/rc.d/rc.*

# Disable unwanted services
chmod -x /etc/rc.d/rc.cups      # Printing (if not needed)
chmod -x /etc/rc.d/rc.bluetooth # Bluetooth
chmod -x /etc/rc.d/rc.networkmanager

# Optimize boot scripts
# Remove delays in rc.M and rc.S if applicable
```

### Memory Optimization

```bash
# Monitor memory usage
free -h
vmstat 1

# Tune swappiness
echo "vm.swappiness=10" >> /etc/sysctl.conf
sysctl -p

# Use zram for swap on low-memory systems
# Install from SlackBuilds

# Disable unnecessary daemons
```

### Disk I/O

```bash
# Optimize filesystem mounts
vi /etc/fstab
# Add noatime option:
/dev/sda2  /  ext4  defaults,noatime  1  1

# Use deadline scheduler for SSDs
echo deadline > /sys/block/sda/queue/scheduler

# Add to rc.local for persistence:
echo 'echo deadline > /sys/block/sda/queue/scheduler' >> /etc/rc.d/rc.local
```

### Network Tuning

```bash
# Network performance tuning
cat > /etc/sysctl.d/network.conf << 'EOF'
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.tcp_congestion_control = bbr
net.core.netdev_max_backlog = 5000
EOF

sysctl -p /etc/sysctl.d/network.conf
```

---

## Troubleshooting

### Common Issues

#### Package Dependency Problems

```bash
# Slackware doesn't resolve dependencies automatically
# Check dependencies manually:
# - Read README or INSTALL files
# - Check SlackBuilds.org .info files
# - Use ldd to check library dependencies

ldd /usr/bin/program
# Look for "not found" libraries

# Find package providing library
find /var/log/packages -type f -exec grep -l "libname.so" {} \;
```

#### Boot Problems

```bash
# Boot to single-user mode
# At LILO prompt: huge.s single

# Check boot messages
dmesg | less

# Common fixes:
# - Rebuild initrd: mkinitrd
# - Reinstall LILO: liloconfig
# - Check fstab: cat /etc/fstab
```

#### Network Issues

```bash
# Check interface status
ifconfig -a
ip addr show

# Check routing
route -n
ip route show

# Test connectivity
ping 8.8.8.8
ping google.com

# Restart networking
/etc/rc.d/rc.inet1 restart

# Check rc.inet1.conf
cat /etc/rc.d/rc.inet1.conf
```

#### Service Won't Start

```bash
# Check if script is executable
ls -l /etc/rc.d/rc.servicename

# Make executable
chmod +x /etc/rc.d/rc.servicename

# Run manually for errors
bash -x /etc/rc.d/rc.servicename start

# Check logs
tail -f /var/log/messages
```

### Log Analysis

```bash
# System logs
/var/log/messages      # Main system log
/var/log/syslog        # System messages
/var/log/secure        # Authentication
/var/log/maillog       # Mail server
/var/log/httpd/        # Apache logs

# View logs
tail -f /var/log/messages
less /var/log/messages
grep -i error /var/log/messages

# Log rotation
# Configured in /etc/logrotate.conf
```

### Recovery Mode

```bash
# Boot from installation media
# Mount system partitions
mount /dev/sda2 /mnt
mount /dev/sda1 /mnt/boot  # If separate

# Chroot into system
mount --bind /dev /mnt/dev
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys
chroot /mnt

# Fix problems
# - Reinstall bootloader
# - Fix configuration
# - Repair filesystem

# Exit and reboot
exit
umount /mnt/dev /mnt/proc /mnt/sys
umount /mnt
reboot
```

---

## Community and Support

### Getting Help

- **Official Documentation**: <http://docs.slackware.com>
- **Slackware Book**: Essential reading for beginners
- **LinuxQuestions**: Very active Slackware forum
- **IRC**: #slackware on Libera.Chat
- **Mailing Lists**: <http://www.slackware.com/lists/>

### Contributing

- Report bugs through community channels
- Submit SlackBuilds to SlackBuilds.org
- Help in forums and IRC
- Write documentation and tutorials
- Donate to support development

### Philosophy

Slackware follows the **Unix Philosophy**:
- Write programs that do one thing well
- Keep it simple, stupid (KISS)
- Provide mechanisms, not policy
- Everything is a file (when possible)
- Small, sharp tools over monolithic applications

---

## Comparison with Other Distributions

### Slackware vs Debian

| Feature | Slackware | Debian |
|---------|-----------|--------|
| Package Management | No auto-dependencies | APT with dependencies |
| Init System | BSD rc scripts | systemd (default) |
| Philosophy | Simplicity | Universal OS |
| Configuration | Manual | Debconf + manual |
| Release Cycle | When ready | ~2 years |
| Package Count | ~1000 base | 50,000+ |

### Slackware vs Arch

| Feature | Slackware | Arch |
|---------|-----------|------|
| Philosophy | Stability + simplicity | Simplicity + cutting edge |
| Packages | Conservative | Rolling release |
| Configuration | Manual | Manual |
| Documentation | Good | Excellent (Wiki) |
| Target Users | Stability-focused | Power users |

---

## Conclusion

Slackware Linux represents a unique approach in the Linux world, emphasizing simplicity, stability, and user control. While it requires more manual configuration than modern distributions, this hands-on approach provides deep system understanding and complete control. Perfect for those who value stability over features and prefer the traditional Unix way of doing things.

