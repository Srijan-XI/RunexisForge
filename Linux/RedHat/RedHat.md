# Red Hat Linux Ecosystem

## Introduction

The Red Hat ecosystem represents one of the most influential and widely-deployed families of enterprise Linux distributions. Built around the RPM package format and DNF/YUM package managers, Red Hat-based distributions power millions of servers worldwide, from Fortune 500 enterprises to cloud infrastructure providers.

### Philosophy and Vision

- **Enterprise Focus**: Stability, security, and long-term support
- **Open Source Leadership**: Major contributor to Linux kernel and projects
- **Innovation Pipeline**: Fedora → CentOS Stream → RHEL workflow
- **Commercial Support**: Professional enterprise support available
- **Community & Commercial**: Balance of community innovation and enterprise stability
- **Ecosystem Integration**: Comprehensive tooling and certification programs

### Key Characteristics

- **Package Format**: RPM (Red Hat Package Manager)
- **Package Managers**: DNF (Dandified YUM), YUM (legacy)
- **Init System**: systemd
- **Security**: SELinux (Security-Enhanced Linux) mandatory access control
- **Configuration**: /etc/yum.repos.d/ for repository management
- **Admin Tools**: Cockpit web-based administration
- **File System**: XFS (default), ext4, Btrfs supported

### The Red Hat Family Tree

```
Fedora (Cutting Edge)
    ↓
CentOS Stream (Rolling Preview)
    ↓
RHEL (Enterprise Stable)
    ↓ ↓ ↓
Rocky Linux | AlmaLinux | Oracle Linux
(Free RHEL clones/derivatives)
```

### Distribution Overview

#### [Fedora Linux](Fedora%20Linux/Fedora%20Linux.md)
- **Purpose**: Innovation and latest features
- **Target**: Developers, enthusiasts, early adopters
- **Release**: Every 6 months
- **Support**: ~13 months per release
- **Philosophy**: "First" - latest software, features, technologies

#### [Red Hat Enterprise Linux (RHEL)](RedHatEnterpriseLinux/RedHatEnterpriseLinux.md)
- **Purpose**: Enterprise production workloads
- **Target**: Businesses, enterprises, mission-critical systems
- **Release**: Every 3-4 years (major), 6 months (minor)
- **Support**: 10+ years with Extended Life Cycle Support
- **Philosophy**: Stability, security, certification, support

#### [CentOS Stream](CentOS/CentOS.md)
- **Purpose**: Continuous preview of next RHEL minor release
- **Target**: Developers, RHEL contributors, early testing
- **Release**: Rolling
- **Support**: Until next major RHEL + 6 months
- **Philosophy**: Bridge between Fedora and RHEL

#### [Rocky Linux](Rocky_Linux/Rocky_Linux.md)
- **Purpose**: Free RHEL replacement (post-CentOS shift)
- **Target**: Enterprises wanting free RHEL clone
- **Release**: Following RHEL releases
- **Support**: 10 years
- **Philosophy**: Community-driven CentOS successor

#### [AlmaLinux](https://almalinux.org)
- **Purpose**: Free, community-owned RHEL fork
- **Target**: Enterprises, hosting providers
- **Release**: Following RHEL releases
- **Support**: 10 years
- **Philosophy**: Forever-free alternative to RHEL

#### [Oracle Linux](OracleLinux/OracleLinux.md)
- **Purpose**: RHEL-compatible with Oracle optimizations
- **Target**: Oracle workloads, enterprises
- **Release**: Following RHEL releases
- **Support**: Premier support available
- **Philosophy**: RHEL compatibility + Oracle enhancements

## Resources

### Official Resources

- **Red Hat**: <https://www.redhat.com>
- **Fedora Project**: <https://getfedora.org>
- **CentOS**: <https://www.centos.org>
- **Rocky Linux**: <https://rockylinux.org>
- **AlmaLinux**: <https://almalinux.org>
- **Oracle Linux**: <https://www.oracle.com/linux>

### Documentation

- **RHEL Docs**: <https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/>
- **Fedora Docs**: <https://docs.fedoraproject.org>
- **RPM Packaging Guide**: <https://rpm-packaging-guide.github.io>
- **DNF Documentation**: <https://dnf.readthedocs.io>

### Community Resources

- **Fedora Discussion**: <https://discussion.fedoraproject.org>
- **Rocky Linux Forums**: <https://forums.rockylinux.org>
- **Reddit**: r/Fedora, r/RedHat, r/RockyLinux
- **IRC/Matrix**: Various channels per distribution

---

## Package Management

### DNF (Dandified YUM)

DNF is the modern package manager for Red Hat-based distributions, replacing YUM.

#### Basic DNF Commands

```bash
# Update repository metadata
sudo dnf check-update
sudo dnf makecache

# Upgrade packages
sudo dnf upgrade           # Upgrade all packages
sudo dnf upgrade --refresh # Refresh metadata first
sudo dnf update            # Alias for upgrade

# Search for packages
dnf search keyword
dnf search --all keyword   # Search in name and description

# Show package information
dnf info package-name
dnf list package-name

# Install packages
sudo dnf install package-name
sudo dnf install package1 package2 package3
sudo dnf install package-version  # Specific version

# Reinstall package
sudo dnf reinstall package-name

# Downgrade package
sudo dnf downgrade package-name

# Remove packages
sudo dnf remove package-name
sudo dnf autoremove        # Remove unused dependencies

# Clean cache
sudo dnf clean all
sudo dnf clean packages
sudo dnf clean metadata

# List packages
dnf list installed
dnf list available
dnf list updates
dnf list recent

# History
dnf history
dnf history info <id>
dnf history undo <id>
dnf history redo <id>

# Group operations
dnf group list
dnf group info "Development Tools"
sudo dnf group install "Development Tools"
sudo dnf group remove "Development Tools"
```

#### Advanced DNF Usage

```bash
# Download package without installing
dnf download package-name

# Show package dependencies
dnf repoquery --requires package-name
dnf repoquery --whatrequires package-name

# Find which package provides a file
dnf provides /usr/bin/git
dnf whatprovides */semanage

# Enable/disable repositories
sudo dnf config-manager --set-enabled repo-name
sudo dnf config-manager --set-disabled repo-name

# Add repository
sudo dnf config-manager --add-repo http://example.com/repo.repo

# Install from specific repository
sudo dnf install --enablerepo=repo-name package-name

# Exclude packages from updates
# /etc/dnf/dnf.conf
# exclude=kernel* php*

# Version lock packages
sudo dnf install python3-dnf-plugin-versionlock
sudo dnf versionlock add package-name
sudo dnf versionlock list
sudo dnf versionlock delete package-name

# Distro sync (align with repositories)
sudo dnf distro-sync

# System upgrade (major version)
sudo dnf system-upgrade download --releasever=39
sudo dnf system-upgrade reboot
```

### RPM (Red Hat Package Manager)

```bash
# Install .rpm file
sudo rpm -ivh package.rpm
sudo dnf install ./package.rpm  # Preferred, resolves deps

# Upgrade package
sudo rpm -Uvh package.rpm

# Remove package
sudo rpm -e package-name

# Query installed packages
rpm -qa                    # List all
rpm -qa | grep keyword     # Search
rpm -qi package-name       # Package info
rpm -ql package-name       # List files in package
rpm -qc package-name       # List config files
rpm -qd package-name       # List documentation

# Query .rpm file (not installed)
rpm -qip package.rpm       # Package info
rpm -qlp package.rpm       # List files

# Verify package
rpm -V package-name
rpm -Va                    # Verify all

# Find which package owns a file
rpm -qf /path/to/file

# Rebuild RPM database
sudo rpm --rebuilddb

# Import GPG keys
sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-*
```

### Repository Management

```bash
# Repository configuration location
/etc/yum.repos.d/

# List enabled repositories
dnf repolist
dnf repolist all  # Include disabled

# Repository file example
# /etc/yum.repos.d/example.repo
[example]
name=Example Repository
baseurl=https://example.com/repo/
enabled=1
gpgcheck=1
gpgkey=https://example.com/RPM-GPG-KEY

# Popular third-party repositories

# EPEL (Extra Packages for Enterprise Linux)
# RHEL/Rocky/Alma/CentOS
sudo dnf install epel-release

# RPM Fusion (Fedora)
sudo dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
sudo dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

# Priority and cost
# In .repo file:
priority=10  # Lower number = higher priority
cost=100     # Higher cost = lower priority
```

---

## System Administration

### systemd Service Management

```bash
# Service operations
sudo systemctl start service-name
sudo systemctl stop service-name
sudo systemctl restart service-name
sudo systemctl reload service-name
sudo systemctl status service-name

# Enable/disable at boot
sudo systemctl enable service-name
sudo systemctl disable service-name
sudo systemctl enable --now service-name  # Enable and start

# List services
systemctl list-units --type=service
systemctl list-units --type=service --state=running
systemctl list-unit-files --type=service

# Check if service is enabled
systemctl is-enabled service-name
systemctl is-active service-name

# View logs
journalctl -u service-name
journalctl -u service-name -f           # Follow
journalctl -u service-name --since today
journalctl -u service-name -n 50        # Last 50 lines

# Mask/unmask service (prevent start)
sudo systemctl mask service-name
sudo systemctl unmask service-name

# System targets (runlevels)
systemctl get-default
sudo systemctl set-default multi-user.target
sudo systemctl set-default graphical.target

# System control
sudo systemctl reboot
sudo systemctl poweroff
sudo systemctl suspend
sudo systemctl hibernate
```

### SELinux (Security-Enhanced Linux)

```bash
# Check SELinux status
getenforce
sestatus

# SELinux modes:
# - Enforcing: SELinux policy enforced
# - Permissive: Logs violations but doesn't enforce
# - Disabled: SELinux disabled

# Temporarily change mode
sudo setenforce 0  # Permissive
sudo setenforce 1  # Enforcing

# Permanently change mode
# /etc/selinux/config
SELINUX=enforcing   # or permissive or disabled
# Reboot required

# View SELinux contexts
ls -Z
ps auxZ
id -Z

# Change file context
sudo chcon -t httpd_sys_content_t /var/www/html/file
sudo restorecon -Rv /var/www/html  # Restore default

# SELinux booleans
getsebool -a
getsebool httpd_can_network_connect
sudo setsebool httpd_can_network_connect on
sudo setsebool -P httpd_can_network_connect on  # Permanent

# Troubleshooting SELinux
sudo ausearch -m avc -ts recent
sudo ausearch -m avc -ts today
sudo grep "SELinux" /var/log/audit/audit.log

# Generate policy module from denials
sudo grep httpd /var/log/audit/audit.log | audit2allow -M mypol
sudo semodule -i mypol.pp

# List SELinux modules
semodule -l

# SELinux management tools
sudo dnf install policycoreutils-python-utils
sudo dnf install setroubleshoot-server
```

### Firewall (firewalld)

```bash
# firewalld is the default firewall management tool

# Check status
sudo firewall-cmd --state
sudo systemctl status firewalld

# Enable firewalld
sudo systemctl enable --now firewalld

# Zones
firewall-cmd --get-default-zone
firewall-cmd --get-active-zones
firewall-cmd --list-all-zones

# Set default zone
sudo firewall-cmd --set-default-zone=public

# List allowed services/ports
sudo firewall-cmd --list-all
sudo firewall-cmd --list-services
sudo firewall-cmd --list-ports

# Allow service
sudo firewall-cmd --add-service=http
sudo firewall-cmd --add-service=https
sudo firewall-cmd --permanent --add-service=http  # Permanent

# Allow port
sudo firewall-cmd --add-port=8080/tcp
sudo firewall-cmd --permanent --add-port=8080/tcp

# Remove service/port
sudo firewall-cmd --remove-service=http
sudo firewall-cmd --remove-port=8080/tcp

# Reload configuration
sudo firewall-cmd --reload

# Rich rules
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.0/24" accept'
sudo firewall-cmd --add-rich-rule='rule service name="ssh" accept'

# Block IP
sudo firewall-cmd --add-rich-rule='rule family="ipv4" source address="1.2.3.4" reject'

# Port forwarding
sudo firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8080
```

### Cockpit (Web-based Administration)

```bash
# Install Cockpit
sudo dnf install cockpit

# Enable and start
sudo systemctl enable --now cockpit.socket

# Access Cockpit
# https://localhost:9090
# or
# https://server-ip:9090

# Features:
- System overview
- Storage management
- Networking
- Accounts
- Services
- Terminal
- Software updates
- Logs
- Containers (with podman)
- Virtual machines

# Allow through firewall
sudo firewall-cmd --permanent --add-service=cockpit
sudo firewall-cmd --reload
```

---

## Common Use Cases

### Web Server Setup

```bash
# Install Apache
sudo dnf install httpd

# Start and enable
sudo systemctl enable --now httpd

# Configure firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# SELinux context for web content
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/html(/.*)?"
sudo restorecon -Rv /var/www/html

# Enable network connections for Apache
sudo setsebool -P httpd_can_network_connect on
```

### Database Server

```bash
# Install PostgreSQL
sudo dnf install postgresql-server postgresql-contrib

# Initialize database
sudo postgresql-setup --initdb

# Start and enable
sudo systemctl enable --now postgresql

# Install MySQL/MariaDB
sudo dnf install mariadb-server mariadb

# Start and enable
sudo systemctl enable --now mariadb

# Secure installation
sudo mysql_secure_installation
```

### Development Environment

```bash
# Development Tools group
sudo dnf group install "Development Tools"

# Includes:
# - gcc, g++, make
# - git
# - autotools
# - rpm-build

# Specific languages
sudo dnf install python3 python3-pip
sudo dnf install java-11-openjdk-devel
sudo dnf install nodejs npm
sudo dnf install golang
sudo dnf install rust cargo

# Container development
sudo dnf install podman buildah
sudo systemctl enable --now podman.socket
```

---

## Version Comparison

### Enterprise Linux Versions

| Version | Released | Kernel | systemd | Python | PHP | EOL |
|---------|----------|--------|---------|--------|-----|-----|
| **RHEL 7** | 2014 | 3.10 | 219 | 2.7 | 5.4 | June 2024 (ELS: 2028) |
| **RHEL 8** | 2019 | 4.18 | 239 | 3.6/3.9 | 7.2+ | May 2029 (ELS: 2032) |
| **RHEL 9** | 2022 | 5.14 | 250 | 3.9 | 8.0 | May 2032 (ELS: 2035) |

### Migration Paths

```
RHEL 7 → RHEL 8 (leapp tool)
RHEL 8 → RHEL 9 (leapp tool)

CentOS 8 → Rocky Linux 8 / AlmaLinux 8
CentOS Stream 8 → Rocky Linux 8 / AlmaLinux 8
```

---

## Best Practices

### System Maintenance

```bash
# Regular updates (weekly/monthly)
sudo dnf upgrade --refresh

# Clean old packages
sudo dnf autoremove
sudo dnf clean all

# Check for security updates
sudo dnf updateinfo list security
sudo dnf upgrade --security

# Review logs
sudo journalctl --since yesterday --priority=err
sudo journalctl --vacuum-time=2weeks

# Disk space monitoring
df -h
du -sh /var/log
du -sh /var/cache
```

### Security Hardening

```bash
# Keep SELinux enforcing
sudo setenforce 1

# Enable firewall
sudo systemctl enable --now firewalld

# Automatic security updates (RHEL/CentOS/Rocky/Alma)
sudo dnf install dnf-automatic
sudo systemctl enable --now dnf-automatic.timer

# Configure /etc/dnf/automatic.conf
[commands]
upgrade_type = security
apply_updates = yes

# SSH hardening
# /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no  # Use keys
Port 2222  # Non-standard port

# Install security tools
sudo dnf install aide         # File integrity
sudo dnf install fail2ban     # Intrusion prevention
```

### Backup and Recovery

```bash
# System backup
sudo tar -czpvf /backup/system-$(date +%F).tar.gz \
  --exclude=/backup \
  --exclude=/proc \
  --exclude=/sys \
  --exclude=/dev \
  --exclude=/run \
  --exclude=/tmp \
  /

# Database backup
sudo -u postgres pg_dumpall > /backup/postgres-$(date +%F).sql

# Configuration backup
sudo tar -czf /backup/etc-$(date +%F).tar.gz /etc

# Home directories
sudo tar -czf /backup/home-$(date +%F).tar.gz /home
```

---

## Troubleshooting

### Package Management Issues

```bash
# Clean DNF cache
sudo dnf clean all
sudo dnf makecache

# Fix broken dependencies
sudo dnf distro-sync

# Rebuild RPM database
sudo rpm --rebuilddb

# Check for duplicate packages
sudo dnf repoquery --duplicates

# Reset repository metadata
sudo rm -rf /var/cache/dnf
sudo dnf makecache
```

### Boot Issues

```bash
# Boot into rescue mode
# At GRUB menu, press 'e'
# Add 'systemd.unit=rescue.target' to linux line
# Ctrl+X to boot

# Or emergency mode
# Add 'systemd.unit=emergency.target'

# Reset root password
# At GRUB, add 'rd.break' to linux line
# mount -o remount,rw /sysroot
# chroot /sysroot
# passwd root
# touch /.autorelabel
# exit; exit
```

### SELinux Troubleshooting

```bash
# Temporarily disable to test
sudo setenforce 0
# Test if issue resolves
# If yes, fix contexts/booleans
sudo setenforce 1

# View denials
sudo ausearch -m avc -ts recent

# Use setroubleshoot
sudo sealert -a /var/log/audit/audit.log
```

---

## Conclusion

The Red Hat Linux ecosystem provides a comprehensive range of distributions suitable for diverse use cases, from bleeding-edge innovation in Fedora to enterprise-grade stability in RHEL and its free alternatives (Rocky Linux, AlmaLinux). The consistent RPM/DNF package management, robust SELinux security, and professional tooling make Red Hat-based distributions the preferred choice for enterprise deployments, critical infrastructure, and production environments worldwide.

Whether choosing community-driven Fedora for development, enterprise-supported RHEL for mission-critical workloads, or free alternatives like Rocky Linux for production servers, the Red Hat ecosystem offers proven reliability, extensive documentation, and strong commercial and community support.

