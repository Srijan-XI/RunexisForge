# Debian GNU/Linux

## Introduction

Debian is one of the oldest and most influential Linux distributions, first released in 1993 by Ian Murdock. Known for its commitment to free software principles, rock-solid stability, and extensive package repository, Debian serves as the foundation for hundreds of derivative distributions including Ubuntu, Linux Mint, Kali Linux, and Parrot OS.

### Philosophy and Principles

- **Debian Social Contract**: Commitment to free software community
- **Debian Free Software Guidelines (DFSG)**: Defines what constitutes "free software"
- **Universal Operating System**: Runs on numerous architectures
- **Stability Over Features**: Thoroughly tested software
- **Community-Driven**: Volunteer developer community
- **Three Rs**: Rock solid, Reliable, and Robust

### Key Characteristics

- **Package Management**: APT (Advanced Package Tool) and dpkg
- **Release Branches**: Stable, Testing, Unstable (Sid)
- **Init System**: systemd (default since Debian 8)
- **Architectures**: Supports 9+ CPU architectures
- **Package Count**: 59,000+ software packages
- **Long Release Cycle**: ~2 years between stable releases
- **Security**: Dedicated security team with prompt updates

### Use Cases

- **Servers**: Web servers, database servers, mail servers
- **Desktops**: Stable workstation environment
- **Development**: Software development platform
- **Base for Derivatives**: Foundation for other distributions
- **Educational**: Learning Linux systems administration
- **Enterprise**: Mission-critical systems
- **Embedded Systems**: IoT and embedded devices

### Target Audience

- System administrators requiring stability
- Users prioritizing free software
- Server deployment scenarios
- Developers wanting stable development environment
- Organizations needing long-term support
- Users learning Linux fundamentals

## History and Influence

### Origins and Evolution

- **1993**: Ian Murdock founds Debian (Debian = Debra + Ian)
- **1996**: Debian 1.1 "Buzz" released
- **1997**: Debian Social Contract established
- **2000**: Debian 2.2 "Potato" - major milestone
- **2005**: Ubuntu launches based on Debian
- **2015**: Debian 8 "Jessie" - systemd default
- **2019**: Debian 10 "Buster"
- **2021**: Debian 11 "Bullseye"
- **2023**: Debian 12 "Bookworm" (current stable)

### Impact on Linux Ecosystem

- Parent of Ubuntu and hundreds of derivatives
- APT package management adopted widely
- Debian Policy Manual as packaging standard
- .deb package format industry standard
- Influenced packaging systems across Linux

## Release Branches

### Stable

**Current**: Debian 12 "Bookworm"

```bash
Characteristics:
- Rock-solid stability
- Well-tested packages
- Security updates only
- Long support cycle (~5 years)
- Conservative package versions
- Production-ready

Use Cases:
- Servers and production systems
- Mission-critical applications
- Users prioritizing stability
- Long-term deployments

Update Frequency:
- Security updates: Immediate
- Point releases: Every 2-4 months
- Major releases: ~2 years
```

### Testing

**Current**: Debian 13 "Trixie" (testing)

```bash
Characteristics:
- More recent packages
- Rolling release model
- Packages from unstable after 10 days
- Reasonably stable
- Security updates delayed
- Bug fixes included

Use Cases:
- Desktop systems
- Users wanting newer software
- Testing before stable release
- Development machines

Caveats:
- Occasional breakage possible
- Less security support than stable
- Not recommended for servers
```

### Unstable (Sid)

**Name**: Always "Sid" (from Toy Story - the kid who breaks toys)

```bash
Characteristics:
- Cutting-edge packages
- Latest upstream versions
- Development branch
- Can break frequently
- No security team support
- Basis for testing

Use Cases:
- Debian developers
- Advanced users
- Testing new software
- Contributing to Debian

Warnings:
- Expect breakage
- Not for production
- Requires expert knowledge
- Daily changes
```

### Experimental

```bash
Purpose:
- Extremely new/experimental packages
- Major transitions
- Not a full distribution
- Requires unstable as base

Use: Very specialized testing only
```

## Resources

### Official Resources

- **Website**: <https://www.debian.org>
- **Documentation**: <https://www.debian.org/doc/>
- **Wiki**: <https://wiki.debian.org>
- **Package Search**: <https://packages.debian.org>
- **Bug Tracker**: <https://bugs.debian.org>
- **Security**: <https://www.debian.org/security/>
- **Release Info**: <https://www.debian.org/releases/>

### Community Resources

- **Forums**: <https://forums.debian.net>
- **Mailing Lists**: <https://lists.debian.org>
- **IRC**: #debian on OFTC
- **Reddit**: r/debian
- **Planet Debian**: <https://planet.debian.org> (Blog aggregator)
- **Debian Mentors**: <https://mentors.debian.net>

### Learning Resources

- [Debian Administrator's Handbook](https://debian-handbook.info/) - Comprehensive guide
- [Debian Reference](https://www.debian.org/doc/manuals/debian-reference/) - Quick reference
- [Debian Policy Manual](https://www.debian.org/doc/debian-policy/) - Packaging standards
- [Debian Wiki](https://wiki.debian.org) - Community documentation

---

## Installation

### System Requirements

**Minimum Requirements**:
- **RAM**: 512 MB (1 GB recommended for desktop)
- **Disk**: 2 GB (10+ GB recommended)
- **Processor**: 1 GHz
- **Architecture**: i386, amd64, ARM, ARM64, MIPS, PowerPC, S390x, RISC-V

**Recommended for Desktop**:
- **RAM**: 4+ GB
- **Disk**: 20+ GB
- **Processor**: 2+ GHz multi-core
- **Graphics**: Modern GPU with driver support

### Installation Media

#### Download Options

```bash
# Net install (recommended, ~300 MB)
https://www.debian.org/CD/netinst/

# Full DVD images (complete offline installation)
https://www.debian.org/CD/

# Live images (try before install)
https://www.debian.org/CD/live/

# Cloud images
https://cloud.debian.org/images/cloud/

# Verify downloads
sha256sum debian-12.x.x-amd64-netinst.iso
# Compare with official checksums
```

#### Desktop Environments Available

- **GNOME** (default)
- **KDE Plasma**
- **Xfce**
- **LXDE/LXQt**
- **MATE**
- **Cinnamon**

### Installation Process

#### Step 1: Boot Installation Media

```
1. Boot from USB/DVD
2. Select installation method:
   - Graphical Install (recommended)
   - Install
   - Advanced options
   - Rescue mode
```

#### Step 2: Language and Location

```
- Select language
- Choose location (affects timezone and mirrors)
- Configure keyboard layout
```

#### Step 3: Network Configuration

```
# Automatic (DHCP)
- Detected automatically
- Configure hostname

# Manual
- Set IP address
- Netmask
- Gateway
- DNS servers
```

#### Step 4: User Setup

```
# Root password
- Set strong root password
- Or skip to use sudo only

# Regular user
- Username
- Full name
- Password
```

#### Step 5: Disk Partitioning

```bash
# Guided Partitioning (Recommended for beginners)
- Use entire disk
- Separate /home partition
- Separate /home, /var, and /tmp
- Manual partitioning

# Recommended Manual Scheme:
/boot    - 512 MB - ext4
/        - 20 GB  - ext4
/home    - Rest   - ext4
swap     - 2x RAM (or 4 GB max for modern systems)

# With encryption:
- LVM with encryption recommended
- Protects data at rest
```

#### Step 6: Package Manager Configuration

```
# Debian archive mirror
- Choose nearby mirror
- http.us.debian.org (example)

# Enable:
☑ security updates
☑ release updates
☐ backports (optional)
☐ non-free firmware (if needed)
```

#### Step 7: Software Selection

```bash
Desktop environments:
☑ Debian desktop environment
  ☑ GNOME (or choose others)
  ☐ Xfce
  ☐ KDE Plasma
  ☐ Cinnamon
  ☐ MATE
  ☐ LXDE

Standard system utilities:
☑ standard system utilities

Servers:
☐ web server
☐ SSH server (check if remote access needed)
☐ print server
```

#### Step 8: Bootloader Installation

```
# Install GRUB
- Install to MBR: /dev/sda
- Configure boot options
- Multi-boot detection
```

#### Step 9: First Boot

```
# After installation:
1. Remove installation media
2. Reboot
3. Login with created user
4. Update system:
   sudo apt update
   sudo apt upgrade
```

### Post-Installation

```bash
# Update system
sudo apt update
sudo apt full-upgrade

# Install additional firmware (if needed)
sudo apt install firmware-linux firmware-linux-nonfree

# Install useful tools
sudo apt install curl wget git vim build-essential

# Configure sudo (if not configured)
su -
usermod -aG sudo username
# Logout and login for changes to take effect
```

---

## Package Management

### APT (Advanced Package Tool)

APT is Debian's high-level package management system, providing an easy interface to dpkg.

#### Basic APT Commands

```bash
# Update package lists
sudo apt update

# Upgrade all packages
sudo apt upgrade          # Safe upgrade
sudo apt full-upgrade     # Handles dependency changes
sudo apt dist-upgrade     # Old name for full-upgrade

# Search for packages
apt search keyword
apt search --names-only keyword

# Show package information
apt show package-name
apt policy package-name   # Show version info

# Install packages
sudo apt install package-name
sudo apt install package1 package2 package3
sudo apt install package=version  # Specific version

# Reinstall package
sudo apt reinstall package-name

# Remove packages
sudo apt remove package-name           # Remove but keep config
sudo apt purge package-name            # Remove including config
sudo apt autoremove                    # Remove unused dependencies

# Clean up
sudo apt clean            # Delete downloaded packages
sudo apt autoclean        # Delete old/obsolete packages
sudo apt autoremove       # Remove orphaned packages

# List packages
apt list --installed              # All installed
apt list --upgradable             # Packages with updates
apt list --all-versions package   # All available versions

# Check for broken dependencies
sudo apt check

# Fix broken dependencies
sudo apt --fix-broken install
```

#### Advanced APT Usage

```bash
# Hold package at current version
sudo apt-mark hold package-name
sudo apt-mark unhold package-name
sudo apt-mark showhold           # List held packages

# Download package without installing
apt download package-name

# Source package
apt source package-name

# Build dependencies
sudo apt build-dep package-name

# Simulate actions (dry run)
apt install -s package-name
apt upgrade -s

# Change between releases
# Edit /etc/apt/sources.list
# Replace 'bookworm' with 'trixie' (or desired release)
sudo apt update
sudo apt full-upgrade

# Pin package priority
# /etc/apt/preferences.d/mypin
Package: firefox
Pin: release a=bookworm-backports
Pin-Priority: 900
```

### dpkg (Debian Package Manager)

```bash
# Install .deb file
sudo dpkg -i package.deb
sudo apt install -f  # Fix dependencies after dpkg install

# Remove package
sudo dpkg -r package-name      # Remove
sudo dpkg -P package-name      # Purge

# List installed packages
dpkg -l
dpkg -l | grep keyword

# List files in package
dpkg -L package-name

# Find which package owns a file
dpkg -S /path/to/file

# Show package info
dpkg -s package-name

# List contents of .deb file
dpkg -c package.deb

# Extract .deb without installing
dpkg -x package.deb /path/to/extract

# Reconfigure package
sudo dpkg-reconfigure package-name
sudo dpkg-reconfigure -a  # Reconfigure all
```

### Sources Configuration

```bash
# Main sources file
sudo nano /etc/apt/sources.list

# Debian 12 "Bookworm" example:
deb http://deb.debian.org/debian bookworm main contrib non-free non-free-firmware
deb http://deb.debian.org/debian bookworm-updates main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware

# Backports (optional)
deb http://deb.debian.org/debian bookworm-backports main contrib non-free non-free-firmware

# Additional sources in separate files
# /etc/apt/sources.list.d/custom.list

# Components:
# main      - DFSG-compliant free software
# contrib   - Free but depends on non-free
# non-free  - Non-DFSG software
# non-free-firmware - Non-free firmware packages
```

### Backports

```bash
# Backports provide newer versions for stable

# Install from backports
sudo apt install -t bookworm-backports package-name

# Show backports versions
apt policy package-name

# Example: Install newer kernel
sudo apt install -t bookworm-backports linux-image-amd64
```

---

## System Configuration

### systemd Service Management

```bash
# Service management
sudo systemctl start service-name
sudo systemctl stop service-name
sudo systemctl restart service-name
sudo systemctl reload service-name
sudo systemctl status service-name

# Enable/disable services
sudo systemctl enable service-name      # Start at boot
sudo systemctl disable service-name     # Don't start at boot
sudo systemctl enable --now service-name  # Enable and start

# List services
systemctl list-units --type=service
systemctl list-units --type=service --state=running
systemctl list-unit-files --type=service

# View logs
journalctl -u service-name
journalctl -u service-name -f          # Follow logs
journalctl -u service-name --since today

# System state
systemctl reboot
systemctl poweroff
systemctl suspend
systemctl hibernate
```

### Network Configuration

#### NetworkManager (Desktop)

```bash
# Command-line tool
nmcli device status
nmcli connection show
nmcli device wifi list
nmcli device wifi connect SSID password PASSWORD

# GUI tools
nm-connection-editor    # GNOME
plasma-nm               # KDE
```

#### Traditional /etc/network/interfaces

```bash
# Edit configuration
sudo nano /etc/network/interfaces

# DHCP example
auto eth0
iface eth0 inet dhcp

# Static IP example
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4

# Bring interface up/down
sudo ifup eth0
sudo ifdown eth0

# Restart networking
sudo systemctl restart networking
```

### Firewall (iptables/nftables)

```bash
# UFW (Uncomplicated Firewall) - Recommended for beginners
sudo apt install ufw

# Enable UFW
sudo ufw enable
sudo ufw status

# Allow services
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Deny specific IP
sudo ufw deny from 192.168.1.100

# Delete rule
sudo ufw delete allow 80/tcp

# iptables (traditional)
sudo apt install iptables

# Basic rules
sudo iptables -A INPUT -i lo -j ACCEPT
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -P INPUT DROP

# Save rules
sudo iptables-save > /etc/iptables/rules.v4
```

---

## Debian Derivatives

Debian serves as the foundation for hundreds of derivative distributions, each tailored for specific use cases.

### Major Derivatives

#### [Ubuntu](Ubuntu/Ubuntu.md)
- Most popular Debian derivative
- 6-month releases + LTS every 2 years
- User-friendly focus
- Commercial support available
- Snap package format
- Base for many other distributions

#### [Linux Mint](MintLinux/MintLinux.md)
- Based on Ubuntu (and Debian edition)
- Cinnamon desktop environment
- Very beginner-friendly
- Excellent out-of-box experience
- Strong multimedia support
- Traditional desktop paradigm

#### [Kali Linux](KaliLinux/KaliLinux.md)
- Penetration testing and security auditing
- 600+ security tools pre-installed
- Maintained by Offensive Security
- Regular tool updates
- ARM support
- Professional security toolkit

#### [Parrot OS](ParrotSec/ParrotSec.md)
- Security, privacy, and development
- Lightweight MATE desktop
- Privacy-focused with AnonSurf
- Developer tools included
- Cloud pentesting features
- Multiple editions

#### [Pop!_OS](Pop_OS/Pop_OS.md)
- Developed by System76
- Developer and creator focus
- Tiling window manager (Pop Shell)
- Excellent NVIDIA support
- Clean, modern interface
- Gaming-ready

#### [Tails](Tails/Tails.md)
- Privacy and anonymity focus
- All traffic through Tor
- Live system (leaves no trace)
- Encryption tools included
- Journalist and activist tool
- Amnesic (forgets everything)

#### [MX Linux](MX_Linux/MX_Linux.md)
- Xfce-based
- Excellent for older hardware
- MX Tools for system management
- Live USB with persistence
- Very popular on DistroWatch

---

## Desktop Environments

### Installing Desktop Environments

```bash
# GNOME (default)
sudo apt install task-gnome-desktop

# KDE Plasma
sudo apt install task-kde-desktop

# Xfce
sudo apt install task-xfce-desktop

# MATE
sudo apt install task-mate-desktop

# Cinnamon
sudo apt install task-cinnamon-desktop

# LXDE
sudo apt install task-lxde-desktop

# LXQt
sudo apt install task-lxqt-desktop

# Switch between desktop environments
# At login screen, select desired environment
```

### Minimal Installation + Desktop

```bash
# Install minimal system, then add desktop
sudo apt install xorg
sudo apt install lightdm  # Display manager

# Then install preferred desktop
sudo apt install gnome-core
# or
sudo apt install kde-standard
# or
sudo apt install xfce4
```

---

## Development Environment

### Build Tools

```bash
# Essential build tools
sudo apt install build-essential

# Includes:
# - gcc, g++ (compilers)
# - make
# - libc-dev

# Additional development tools
sudo apt install autoconf automake cmake
sudo apt install git subversion mercurial
sudo apt install gdb valgrind
```

### Programming Languages

```bash
# Python
sudo apt install python3 python3-pip python3-venv

# Java
sudo apt install default-jdk

# Node.js
sudo apt install nodejs npm

# Ruby
sudo apt install ruby-full

# Go
sudo apt install golang

# Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# PHP
sudo apt install php php-cli php-fpm
```

---

## Server Applications

### Web Servers

```bash
# Apache
sudo apt install apache2
sudo systemctl enable --now apache2

# Nginx
sudo apt install nginx
sudo systemctl enable --now nginx

# Configure
# Apache: /etc/apache2/
# Nginx: /etc/nginx/
```

### Databases

```bash
# PostgreSQL
sudo apt install postgresql postgresql-contrib
sudo systemctl enable --now postgresql

# MySQL/MariaDB
sudo apt install mariadb-server
sudo systemctl enable --now mariadb
sudo mysql_secure_installation

# MongoDB
# Add MongoDB repository first
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/

# Redis
sudo apt install redis-server
sudo systemctl enable --now redis-server
```

### Container Technology

```bash
# Docker
sudo apt install docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# Or use official Docker repository for latest version
# https://docs.docker.com/engine/install/debian/

# Podman (Docker alternative)
sudo apt install podman

# LXC/LXD
sudo apt install lxc lxd
```

---

## Security

### Security Updates

```bash
# Debian Security Team provides timely updates
# Enabled by default in sources.list:
deb http://security.debian.org/debian-security bookworm-security main

# Apply security updates
sudo apt update
sudo apt upgrade

# Automatic security updates (unattended-upgrades)
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Security Tools

```bash
# Firewall
sudo apt install ufw
sudo ufw enable

# Intrusion detection
sudo apt install fail2ban
sudo systemctl enable --now fail2ban

# Security scanner
sudo apt install lynis
sudo lynis audit system

# Rootkit detection
sudo apt install rkhunter chkrootkit
```

### SELinux/AppArmor

```bash
# AppArmor (included by default)
sudo apt install apparmor apparmor-utils
sudo systemctl status apparmor

# SELinux (alternative)
sudo apt install selinux-basics selinux-policy-default
sudo selinux-activate
sudo reboot
```

---

## Troubleshooting

### Common Issues

```bash
# Broken packages
sudo apt --fix-broken install
sudo dpkg --configure -a

# Clear package cache
sudo apt clean
sudo apt autoclean

# Reconfigure package
sudo dpkg-reconfigure package-name

# Check disk space
df -h
sudo apt autoremove
sudo apt clean

# Dependencies issues
sudo apt install -f
```

### Log Files

```bash
# System logs
/var/log/syslog          # General system
/var/log/auth.log        # Authentication
/var/log/kern.log        # Kernel messages
/var/log/apt/            # Package management

# View logs
sudo tail -f /var/log/syslog
sudo journalctl -xe
sudo journalctl --since today
```

---

## Best Practices

### System Maintenance

```bash
# Regular updates
sudo apt update && sudo apt upgrade

# Weekly full upgrade
sudo apt full-upgrade

# Monthly cleanup
sudo apt autoremove
sudo apt autoclean

# Check for security updates
sudo apt list --upgradable
```

### Backup Strategy

```bash
# System configuration
/etc/
~/.config/
/var/www/ (if web server)
/home/

# Backup tools
# rsync
rsync -av /source/ /backup/

# Timeshift (system snapshots)
sudo apt install timeshift

# Déjà Dup (user data)
sudo apt install deja-dup
```

---

## Real-World Use Cases

### Case Study 1: Web Hosting Server

```bash
Scenario: LAMP stack web server
Implementation:
- Debian Stable for reliability
- Apache + MariaDB + PHP
- Automated security updates
- Regular backups with rsync
- Uptime: 99.9% over 3 years

Benefits:
- Rock-solid stability
- Predictable update schedule
- Extensive documentation
- Long support cycle
```

### Case Study 2: Development Workstation

```bash
Scenario: Full-stack developer machine
Implementation:
- Debian Testing for newer packages
- Multiple language runtimes
- Docker for containerized dev
- VSCode, JetBrains IDEs
- Git workflows

Benefits:
- Stable yet current packages
- Excellent development tools
- Good hardware support
- Free and open source
```

---

## Conclusion

Debian GNU/Linux stands as one of the most important and influential Linux distributions, valued for its stability, commitment to free software, and extensive package repository. Whether running servers, desktops, or serving as the base for derivative distributions, Debian's "Universal Operating System" philosophy and community-driven development make it an excellent choice for a wide range of use cases.

The combination of multiple release branches (stable, testing, unstable) allows users to choose their preferred balance between stability and current software, while the vast ecosystem of derivatives demonstrates Debian's versatility as a foundation for specialized distributions.

