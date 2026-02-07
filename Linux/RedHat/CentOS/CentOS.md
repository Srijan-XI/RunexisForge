# CentOS and CentOS Stream

## Introduction

CentOS (Community Enterprise Operating System) has undergone a significant transformation in recent years. Originally a free rebuild of Red Hat Enterprise Linux (RHEL), CentOS shifted in 2020 to become CentOS Stream - a rolling-release distribution that sits between Fedora and RHEL in the development pipeline. This change led to the creation of alternative RHEL clones like Rocky Linux and AlmaLinux.

### The CentOS Transformation

```
Old Model (Pre-2020):
Fedora → RHEL → CentOS (downstream rebuild)

New Model (2020+):
Fedora → CentOS Stream → RHEL
           ↓
    Rocky/Alma (RHEL rebuilds)
```

### CentOS Linux (Legacy, EOL)

```
Status: End of Life
- CentOS Linux 8: EOL December 31, 2021
- CentOS Linux 7: EOL June 30, 2024

Replacement Options:
- CentOS Stream (upstream of RHEL)
- Rocky Linux (RHEL clone)
- AlmaLinux (RHEL clone)
- Oracle Linux (RHEL-compatible)
- RHEL with free subscription (up to 16 systems)
```

### CentOS Stream (Current)

```
Purpose: Continuous delivery preview of next RHEL minor release
Release Model: Rolling
Target Audience:
- RHEL contributors
- Developers testing RHEL features
- Organizations comfortable with rolling releases
- Edge cases and non-production workloads

Support Timeline:
- CentOS Stream 8: Until May 2024 (ended)
- CentOS Stream 9: Until ~2027 (6 months after RHEL 9 EOL)
- CentOS Stream 10: TBD
```

### Key Characteristics (CentOS Stream)

- **Base**: Upstream for RHEL
- **Package Manager**: DNF
- **Release Model**: Rolling (continuous updates)
- **Init System**: systemd
- **Security**: SELinux enforcing
- **Updates**: More frequent than RHEL, less than Fedora
- **Kernel**: Newer than RHEL stable
- **Stability**: Between Fedora and RHEL

## Resources

### Official Resources

- **Website**: <https://www.centos.org>
- **CentOS Stream**: <https://centos.org/centos-stream>
- **Wiki**: <https://wiki.centos.org>
- **Forums**: <https://forums.centos.org>
- **Mailing Lists**: <https://lists.centos.org>
- **Blog**: <https://blog.centos.org>
- **Bugs**: <https://bugs.centos.org>

### Migration Resources

- **Migration Guide**: <https://centos.org/centos-linux-eol/>
- **Convert2Rocky**: <https://github.com/rocky-linux/rocky-tools>
- **AlmaLinux Migration**: <https://almalinux.org/migrate/>
- **RHEL Conversion**: <https://access.redhat.com/articles/2360841>

---

## CentOS Stream 9

### What is CentOS Stream?

CentOS Stream is a continuously delivered distribution that tracks just ahead of RHEL development. It serves as the upstream development platform for the next minor RHEL release.

```
Relationship to RHEL:
- Features appear in Stream first
- After testing, features move to RHEL
- Stream receives updates continuously
- More current than RHEL stable
- Less stable than RHEL
```

### When to Use CentOS Stream

```
✅ Good For:
- Development environments
- Testing RHEL features early
- Contributing to RHEL development
- Non-production workloads
- Continuous integration/testing
- Homelab and learning

❌ Not Recommended For:
- Production servers
- Mission-critical applications
- Long-term stable deployments
- Environments requiring frozen packages
```

### Stream vs Traditional CentOS

| Feature | CentOS Linux (EOL) | CentOS Stream |
|---------|-------------------|---------------|
| **Model** | Point release | Rolling |
| **Updates** | After RHEL | Before RHEL |
| **Stability** | Very high | Medium-high |
| **Purpose** | RHEL clone | RHEL preview |
| **Production** | Yes | Questionable |
| **Support** | 10 years | ~5-6 years |
| **Status** | Discontinued | Active |

---

## Installation

### System Requirements

**Minimum**:
- **RAM**: 2 GB
- **Disk**: 20 GB
- **Processor**: 1 GHz

**Recommended**:
- **RAM**: 4+ GB
- **Disk**: 50+ GB
- **Processor**: 2+ GHz multi-core

### Installation Process

```bash
# Download CentOS Stream 9
https://www.centos.org/download/

# Verify checksum
sha256sum CentOS-Stream-9-latest-x86_64-dvd1.iso

# Create bootable USB
sudo dd if=CentOS-Stream-9-*.iso of=/dev/sdX bs=4M status=progress && sync

# Installation Steps (Anaconda):
1. Boot from USB
2. Select language
3. Installation Summary:
   - Keyboard
   - Time & Date
   - Installation Destination
   - Network & Hostname
   - Software Selection
4. Begin Installation
5. Set root password
6. Create user account
7. Reboot
```

### Post-Installation

```bash
# Update system
sudo dnf upgrade --refresh

# Install EPEL (Extra Packages for Enterprise Linux)
sudo dnf install epel-release

# Install development tools
sudo dnf groupinstall "Development Tools"

# Enable CodeReady Builder (CRB) repository
sudo dnf config-manager --set-enabled crb

# Install additional repositories (if needed)
sudo dnf install epel-next-release
```

---

## Package Management

### DNF Commands

```bash
# Update system
sudo dnf upgrade --refresh
sudo dnf update  # Alias

# Search packages
dnf search package-name

# Install packages
sudo dnf install package-name
sudo dnf install package1 package2

# Remove packages
sudo dnf remove package-name
sudo dnf autoremove

# List repositories
dnf repolist
dnf repolist all

# Package groups
dnf group list
sudo dnf group install "Server with GUI"

# Package information
dnf info package-name

# History
dnf history
sudo dnf history undo last
```

### EPEL Repository

```bash
# Install EPEL
sudo dnf install epel-release

# EPEL provides additional packages not in base repos
# Examples:
- htop
- nginx (in some versions)
- certbot
- fail2ban
- Many Python/Ruby/Node packages

# EPEL Next (Stream-specific)
sudo dnf install epel-next-release
```

---

## Migration from CentOS Linux

### Migration Options

#### Option 1: Migrate to CentOS Stream

```bash
# CentOS Linux 8 to CentOS Stream 8 (Stream 8 now EOL)
sudo dnf install centos-release-stream
sudo dnf swap centos-linux-repos centos-stream-repos
sudo dnf distro-sync

# Note: CentOS Stream 8 reached EOL May 2024
# Better to migrate to Stream 9, Rocky, or Alma
```

#### Option 2: Migrate to Rocky Linux

```bash
# Using migrate2rocky script
curl -O https://raw.githubusercontent.com/rocky-linux/rocky-tools/main/migrate2rocky/migrate2rocky.sh
sudo bash migrate2rocky.sh -r

# Verify
cat /etc/os-release
```

#### Option 3: Migrate to AlmaLinux

```bash
# Using almalinux-deploy
curl -O https://raw.githubusercontent.com/AlmaLinux/almalinux-deploy/master/almalinux-deploy.sh
sudo bash almalinux-deploy.sh

# Reboot
sudo reboot
```

#### Option 4: Convert to RHEL

```bash
# Using Convert2RHEL
sudo dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm
sudo dnf install convert2rhel

# Register for free RHEL subscription (up to 16 systems)
https://developers.redhat.com

# Run conversion
sudo convert2rhel
```

---

## System Administration

### Service Management

```bash
# systemd service control
sudo systemctl start httpd
sudo systemctl stop httpd
sudo systemctl restart httpd
sudo systemctl status httpd
sudo systemctl enable httpd
sudo systemctl enable --now httpd

# List services
systemctl list-units --type=service
systemctl list-unit-files --type=service

# View logs
journalctl -u httpd
journalctl -u httpd -f
journalctl --since today
```

### Firewall (firewalld)

```bash
# Check status
sudo firewall-cmd --state

# List configuration
sudo firewall-cmd --list-all

# Allow services
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Allow ports
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload

# Remove service
sudo firewall-cmd --permanent --remove-service=http
sudo firewall-cmd --reload
```

### SELinux

```bash
# Check status
getenforce
sestatus

# Temporarily change mode
sudo setenforce 0  # Permissive
sudo setenforce 1  # Enforcing

# Permanently change
# /etc/selinux/config
SELINUX=enforcing

# Troubleshooting
sudo ausearch -m avc -ts recent
sudo sealert -a /var/log/audit/audit.log

# Install troubleshooting tools
sudo dnf install setroubleshoot-server
```

---

## Server Setup Examples

### Web Server (Apache)

```bash
# Install Apache
sudo dnf install httpd

# Start and enable
sudo systemctl enable --now httpd

# Configure firewall
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# SELinux context
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/html(/.*)?"
sudo restorecon -Rv /var/www/html

# Test
http://localhost
```

### Database Server (PostgreSQL)

```bash
# Install PostgreSQL
sudo dnf install postgresql-server postgresql-contrib

# Initialize database
sudo postgresql-setup --initdb

# Start and enable
sudo systemctl enable --now postgresql

# Access PostgreSQL
sudo -u postgres psql
```

### Container Platform

```bash
# Install Podman
sudo dnf install podman

# Run container
podman run -d -p 8080:80 nginx

# List containers
podman ps

# Systemd integration
podman generate systemd --new --files --name nginx
sudo mv container-nginx.service /etc/systemd/system/
sudo systemctl enable --now container-nginx
```

---

## Differences from RHEL

### What CentOS Stream Has That RHEL Doesn't

```
✅ Newer packages (slightly)
✅ Earlier access to features
✅ No subscription required
✅ Free for unlimited systems
✅ Community involvement in development
```

### What RHEL Has That CentOS Stream Doesn't

```
❌ Professional support
❌ Longer support lifecycle
❌ Stricter stability guarantees
❌ Certification programs
❌ Extended Update Support
❌ Point releases (CentOS is rolling)
```

---

## Best Practices

### For CentOS Stream Users

```bash
# Regular updates critical (rolling release)
sudo dnf upgrade --refresh

# Monitor changes
Subscribe to centos-announce mailing list

# Test before deploying
Use Stream for dev/test
Use RHEL/Rocky/Alma for production

# Snapshot before updates
Use VM snapshots or LVM snapshots

# Automated updates (optional)
sudo dnf install dnf-automatic
sudo systemctl enable --now dnf-automatic.timer
```

---

## Troubleshooting

### Common Issues

```bash
# Repository issues
sudo dnf clean all
sudo dnf makecache

# Broken packages
sudo dnf distro-sync

# Kernel issues
# Boot to previous kernel from GRUB menu

# SELinux denials
sudo ausearch -m avc -ts recent
sudo sealert -a /var/log/audit/audit.log
```

---

## Conclusion

CentOS Stream represents a new direction for the CentOS project, serving as the upstream development platform for RHEL rather than a downstream rebuild. While this change initially caused controversy in the community, CentOS Stream fills an important role in the Enterprise Linux ecosystem as a testing ground for RHEL features.

For production workloads requiring maximum stability, users should consider Rocky Linux, AlmaLinux, or RHEL itself. However, for development environments, testing RHEL features early, or contributing to RHEL development, CentOS Stream provides a valuable platform that bridges the gap between Fedora's rapid innovation and RHEL's enterprise stability.

**Migration Recommendations**:
- **Production servers**: Migrate to Rocky Linux, AlmaLinux, or RHEL
- **Development/Testing**: CentOS Stream is suitable
- **Learning**: CentOS Stream or Rocky/Alma both good options
- **Contributing to RHEL**: CentOS Stream ideal

